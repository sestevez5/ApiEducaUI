import { IPropertyAux } from './../models/modelosAuxiliares';
import { IComponentObject, IOpenApiObject3, ISchemaObjectWithKey, IProperty, IPathObject, IOperationObject, IParameterObject, IResponseObject, ICodeWithResponseObject, IMediaTypeObject, IServerObject, IRequestBody, OrigenDatosOpenApi3 } from './../models/documentoOpenApi3';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class OpenApi3Service {

  //---------------------------------------
  // ORÍGENES DE DATOS
  //---------------------------------------

  
  // Ruta del fichero que contiene todas las rutas de los docuementos OpenApi.
  origenDatosOpenApiOnline: string = '../assets/datas/origenesDatosOpenApi.json';

  // Observable que emite la colección de rutas.
  rutasPreestablecidasDocumentosOpenApi3$: BehaviorSubject<OrigenDatosOpenApi3[]> = new BehaviorSubject<OrigenDatosOpenApi3[]>([]);

  
  // Contiene la ruta actual del documento para poder ser leido. Su valor se actualiza a partir del observable rutaDocumentoOpenApiActual$
  rutaDocumentoOpenApiActual: string ='';
  rutaDocumentoOpenApiActual$: BehaviorSubject<string>= new BehaviorSubject<string>(this.rutaDocumentoOpenApiActual);
  

  // Contiene el objeto global que representa al documento openApi3
  OpenApiObject3Actual: IOpenApiObject3;
  OpenApiObject3Actual$: BehaviorSubject<IOpenApiObject3|undefined> = new BehaviorSubject<IOpenApiObject3|undefined>(undefined);

  auxDocumentoActual: any;

  erroresCargaDocumentoOpenApi$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  cargandoDocumento$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 
  //---------------------------------------
  //SERVERS
  //---------------------------------------
  // Observable que emite actualizaciones de colecciones de servidores (servers).
  servers$: BehaviorSubject<IServerObject[]> = new BehaviorSubject<IServerObject[]>([]);
  serversActuales: IServerObject[];  // mantiene los últimos servers cargados.

  // Observable que emite actualizaciones de colecciones de servidores (servers).
  serverActual$: BehaviorSubject<IServerObject | undefined> = new BehaviorSubject<IServerObject>(undefined);
  serverActual: IServerObject | undefined;  // mantiene los últimos servers cargados.



  //---------------------------------------
  // OPERATIONS
  //---------------------------------------

  // Observable que emite actualizaciones de colecciones de Paths (endpoints).
  operations$: BehaviorSubject<IOperationObject[]> = new BehaviorSubject<IOperationObject[]>([]);
  operationsActuales: IOperationObject[];  // mantiene los últimos dtos cargados.

  //---------------------------------------
  // SCHEMAS
  //---------------------------------------
  // Observable que emite actualizaciones de colecciones de Schemas.
  schemas$: BehaviorSubject<Array<ISchemaObjectWithKey>> = new BehaviorSubject<Array<ISchemaObjectWithKey>>([]);
  schemasActuales: Array<ISchemaObjectWithKey>;  // mantiene los últimos schemas cargados.

  //---------------------------------------
  // PROPERTIES
  //---------------------------------------
  // Observable que emite actualizaciones de colecciones de Propiedades.
  propertiesAux$: BehaviorSubject<Array<IPropertyAux>> = new BehaviorSubject<Array<IPropertyAux>>([]);
  propertiesAuxActuales: Array<IPropertyAux>;  // mantiene los últimos schemas cargados.


  //---------------------------------------
  // TOKEN
  //---------------------------------------
  tokenActual$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  tokenActual: string;



  constructor(private http: HttpClient) {
   

    this.rutaDocumentoOpenApiActual$
      .subscribe(
        nuevoDocumentoOpenApi3 => {
      
          this.rutaDocumentoOpenApiActual = nuevoDocumentoOpenApi3;
          this.rutaDocumentoOpenApiActual?this.actualizarOpenApiObject3Actual():null;
       
        }
      )

    // Cada vez que se emite una nueva colección de esquemas se almacena en la variable schemasActuales
    this.schemas$.subscribe(
      schemas => {
        this.schemasActuales=schemas;
        this.propertiesAux$.next(this.generarProperties(schemas)) 
      }
    );

    // Cada vez que se emite una nueva colección de esquemas se almacena en la variable schemasActuales
    this.propertiesAux$.subscribe( propertyAux => 
      {
        this.propertiesAuxActuales=propertyAux;
        
      });

    // Cada vez que se emite una nueva colección de operations (endpoints) se almacena en la variable operationsActuales
    this.operations$.subscribe(
      operation => this.operationsActuales = operation
    );

    // Cada vez que se emite una nueva colección de servidores (servers) se almacena en la variable serversActuales
    this.servers$.subscribe(
      servers => {
        this.serversActuales = servers;
      } 
    );

    // Cada vez que se emite una nueva colección de servidores (servers) se almacena en la variable serversActuales
    this.serverActual$.subscribe(
      serverActual => {
    
        this.serverActual = serverActual;
        
      } 
  );

    this.http.get(this.origenDatosOpenApiOnline)
    .subscribe(
      contenidoDocumentoActual => {
    
        const coleccionRutas: OrigenDatosOpenApi3[]=[]
        for(const [key, value] of Object.entries(contenidoDocumentoActual["rutas"])){
  
          coleccionRutas.push(<OrigenDatosOpenApi3>value);
        
        } // Fin for

        this.rutasPreestablecidasDocumentosOpenApi3$.next(coleccionRutas);
        
      }

    )

   

    this.tokenActual$.subscribe(
      nuevoToken => {
        this.tokenActual = nuevoToken;
      }
    )

    const token=localStorage.getItem('token');
    token?this.tokenActual$.next(token):null;

   }


  // Método que devuelve el observable con la colección de rutas.
  obtenerRutasPreestablecidasDocumentosOpenApi3(): BehaviorSubject<any[]> {
    return this.rutasPreestablecidasDocumentosOpenApi3$;
  }

  obtenerServidores(): BehaviorSubject<IServerObject[] | undefined> {
    return this.servers$
  }

    // Se establece un nuevo documento openApi. Desencadenará la regeneración de todo el documento.
  cambiarDocumento(nuevaUrl: string) {

      this.rutaDocumentoOpenApiActual$.next(nuevaUrl);
      
      const urlLocalStore=localStorage.getItem('urlDocumentoEspecificacionOpenApi');

      if (urlLocalStore !== nuevaUrl) {
        localStorage.setItem('urlDocumentoEspecificacionOpenApi',nuevaUrl);
        this.eliminarToken();
      }

      

  }

  cambiarServidor(nuevoServidor: IServerObject) {
    this.serverActual$.next(nuevoServidor);
  }
  

  // Actualización del objeto global cuando cambia la referencia del fichero "json"
  actualizarOpenApiObject3Actual() {


    this.cargandoDocumento$.next(true);
    this.http.get(this.rutaDocumentoOpenApiActual)
      .subscribe(
        contenidoDocumentoActual => {

          
        this.cargandoDocumento$.next(false);

            
      

          this.auxDocumentoActual=contenidoDocumentoActual;
          const cda: any = contenidoDocumentoActual

          // OBTENER NODO INFO

   
          // OBTENER NODO SERVERS
          let serversObject: Array<IServerObject>;
          cda.servers?serversObject=this.obtenerServersObject(cda.servers):serversObject=[];
          serversObject?this.servers$.next(serversObject):this.servers$.next(undefined);

          // OBTENER NODO PATHS
          let pathsObject: Array<IPathObject> | undefined;
          let operationObjects: Array<IOperationObject>;
          cda.paths?pathsObject=this.obtenerPathsObject(cda.paths):pathsObject=undefined;
          pathsObject?operationObjects = this.obtenerOperationsObjects(pathsObject): operationObjects=[];
          operationObjects?this.operations$.next(operationObjects):null

          
          // OBTENER NODO COMPONENTS
          let componentsObject: IComponentObject | undefined;
          cda.components?componentsObject=this.obtenerComponentsObject(cda.components):componentsObject=undefined;
          componentsObject? this.schemas$.next(componentsObject.schemas):null

          // OBTENER NODO SECURITY

          // OBTENER NODO TAGS

          // OBTENER NODO EXTERNALDOCS
          

        },
        error => {
          this.erroresCargaDocumentoOpenApi$.next("No se ha podido cargar el documento");
          this.cargandoDocumento$.next(false);
        }

      )

  }

  obtenerOperationsFiltrados(cadenaFiltro:string, pagina: number, tamanyoPagina:number, esOperationAuth: boolean, mostrarMetodosGET: boolean, mostrarMetodosPOST: boolean, mostrarMetodosPUT: boolean, mostrarMetodosDELETE: boolean, mostrarAgrupados: boolean): {datos:IOperationObject[], numeroElementos:number} {
   
    // Paso 1: Aplicamos el filtro en base a la cadena de búsqueda
    let operations:IOperationObject[] = cadenaFiltro?this.operationsActuales.filter(operation => operation.path.toLowerCase().includes(cadenaFiltro.toLowerCase())):this.operationsActuales;

    // Paso 2: Aplicaciones el filtro en base al parámetro esOperationAuth
    esOperationAuth?operations = operations.filter ( op => op.path.includes("/seguridad/")):operations =operations.filter ( op => !op.path.includes("/Autenticacion/"));

    // Llegados a este punto tenemos localizados todos los endpoints que cumplan el filtro pasado por cadena. 
    // en función de la opción serían los de autenticación o no

    // Establecimiento del orden.
    if ( mostrarAgrupados) {
      operations = operations.sort(
        (a,b) => { 

          const cadenaA:string=''+a.tags[0]?a.tags[0]:''+a.tags[1]?a.tags[1]:''+a.path;
          const cadenaB:string=''+b.tags[0]?b.tags[0]:''+b.tags[1]?b.tags[1]:''+b.path;

          if (cadenaA<cadenaB) return -1
          else return 1
        }
     
        )
    } else{

      operations  = operations .sort(
        (a,b) => { if (a.path<b.path) return -1
        else return 1}
        )

    }



    !mostrarMetodosGET? operations = operations.filter ( op => !(op.metodo === 'get')):null;
    !mostrarMetodosPOST? operations = operations.filter ( op => !(op.metodo === 'post')):null;
    !mostrarMetodosPUT? operations = operations.filter ( op => !(op.metodo === 'put')):null;
    !mostrarMetodosDELETE? operations = operations.filter ( op => !(op.metodo === 'delete')):null;

  
    const numeroElementos = operations.length;

    let datos: IOperationObject[] = operations.slice(pagina*tamanyoPagina,pagina*tamanyoPagina+tamanyoPagina);

    return { 
      datos: operations.slice(pagina*tamanyoPagina,pagina*tamanyoPagina+tamanyoPagina), 
      numeroElementos:numeroElementos
    }
  }

  // Se devuelve un subconjunto de dtos a partir de los datos pasados como parámetros.
  obtenerSchemasFiltrados(cadenaFiltro:string, pagina: number, tamanyoPagina:number, soloDtos?: boolean): {datos:Array<ISchemaObjectWithKey>, numeroElementos:number} {
    let schemas = cadenaFiltro?this.schemasActuales.filter(schema => schema.key.toLowerCase().includes(cadenaFiltro.toLowerCase())):this.schemasActuales;
    schemas = soloDtos?schemas.filter(schema => schema.key.endsWith('DTO')):null;
    schemas = schemas.sort(
      (a,b) => { if (a.key<b.key) return -1
      else return 1}
      )


    const numeroElementos = schemas.length;
    
    return { 
      datos: schemas.slice(pagina*tamanyoPagina,pagina*tamanyoPagina+tamanyoPagina), 
      numeroElementos:numeroElementos
    }
    
  }

  obtenerPropertiesFiltradas(cadenaFiltro:string, pagina: number, tamanyoPagina:number): {datos:Array<IPropertyAux>, numeroElementos:number} {

    let properties = cadenaFiltro?
      this.propertiesAuxActuales.filter(property => 
        property.nombre.toLowerCase().includes(cadenaFiltro.toLowerCase())
        ||
        property.tipoSchemaPadre.toLowerCase().includes(cadenaFiltro.toLowerCase())
        ||
        property.tipoSchemaHijo.toLowerCase().includes(cadenaFiltro.toLowerCase())
        
        ):this.propertiesAuxActuales;
    properties = properties.filter(property =>property.tipoSchemaPadre.endsWith('DTO'));
    properties = properties.sort(
      (a,b) => { if (a.nombre<b.nombre) return -1
      else return 1}
      )


    const numeroElementos = properties.length;
    
    return { 
      datos: properties.slice(pagina*tamanyoPagina,pagina*tamanyoPagina+tamanyoPagina), 
      numeroElementos:numeroElementos
    }
    
  }

  establecerToken(nuevotoken:string) {
     this.tokenActual$.next(nuevotoken);
     localStorage.setItem('token',nuevotoken);
  }

  eliminarToken() {
      this.tokenActual$.next('');
      localStorage.removeItem('token');   
  }

  //---------------------------------------------------------------------------
  // MÉTODOS PRIVADOS
  //---------------------------------------------------------------------------

  //---------------------------------------------------------------------------
  // Métodos relacionados con el nodo COMPONENTS
  //---------------------------------------------------------------------------
  private obtenerServersObject(servers: any): Array<IServerObject> {
   
    const auxServerObjects: Array<IServerObject> = [];
    if (Array.isArray(servers)) {
      const serversObject=<Array<any>>servers;
      serversObject.forEach(serverData => {
        let server: IServerObject = {
          url: serverData.url,
          description: serverData.description
        }
        auxServerObjects.push(server);
      });
    }
    return auxServerObjects;
  }
  //---------------------------------------------------------------------------
  // Métodos relacionados con el nodo COMPONENTS
  //---------------------------------------------------------------------------
  private obtenerComponentsObject(components: any): IComponentObject {

    let schemas: Array<ISchemaObjectWithKey> | undefined;

    components.schemas?schemas=this.obtenerSchemasObject(components.schemas):schemas=undefined

    return {
      schemas: schemas
    }
   

  }

  //---------------------------------------------------------------------------
  // Métodos relacionados con el nodo SCHEMAS
  //---------------------------------------------------------------------------
  private obtenerSchemasObject(schemas: any): Array<ISchemaObjectWithKey>|undefined {

    let keySchema: string;
    let valueSchemaWithKey: ISchemaObjectWithKey;
    const schemasObjectWithKey:Array<ISchemaObjectWithKey> = [];

    for (const key in schemas) {

      keySchema=this.nombreSimpleSchema(key);

      
      if ( schemas[key].$ref ) {  // Nos encontramos con una referencia, no con un schema.
        valueSchemaWithKey = this.obtenerSchemaAPartirDeReferencia(schemas[key].$ref)
      
      } else {  // Nos encontramos con un schema
        valueSchemaWithKey =  this.obtenerSchemaObject(schemas[key]);
      }
      valueSchemaWithKey.key= keySchema;
      
      schemasObjectWithKey.push(valueSchemaWithKey); // Incorporamos el valor al Map creado.   
      
    }
    
    return schemasObjectWithKey;

  }

  private obtenerPropertiesObject(properties: any): Array<IProperty>|undefined {

    let nombreProperty: string;

    let schemaObjectWithKey: ISchemaObjectWithKey;
    const schemasObjectWithKey:Array<IProperty> = [];

    for (const key in properties) {

      nombreProperty=key;
      
      if ( properties[key].$ref ) {  // Nos encontramos con una referencia, no con un schema.
        schemaObjectWithKey = this.obtenerSchemaAPartirDeReferencia(properties[key].$ref)
      
      } else {  // Nos encontramos con un schema
        schemaObjectWithKey =  this.obtenerSchemaObject(properties[key]);
      }
      const property: IProperty = {name:nombreProperty, value:schemaObjectWithKey}

      
      schemasObjectWithKey.push(property); // Incorporamos el valor al Map creado.   

    }

  return schemasObjectWithKey;
  }
  
  private obtenerSchemaObject(schema:any): ISchemaObjectWithKey| undefined {

    if( schema && schema.$ref) {
      return this.obtenerSchemaAPartirDeReferencia(schema.$ref)
    }
    else 
    {
      let schemaObjectWithkey: ISchemaObjectWithKey = {
      type: schema.type?schema.type:null,
      properties: schema.properties?this.obtenerPropertiesObject(schema.properties):null,
      format: schema.format?schema.format:null,
      nullable: schema.nullable?schema.nullable:null,
      enum:schema.enum?schema.enum:null,
      description: schema.description?schema.description:null,
      items: schema.items?this.obtenerSchemaObject(schema.items):null
      }
      return schemaObjectWithkey;
    } // Fin else
  }

  private obtenerSchemaAPartirDeReferencia(referencia:string): ISchemaObjectWithKey {
    const key = this.nombreCompletoSchema(referencia);
    const value = this.auxDocumentoActual.components.schemas[key];
    return {...this.obtenerSchemaObject(value), ...{key: this.nombreSimpleSchema(referencia)}}
  }

  private nombreSimpleSchema(referencia:string): string {

    //Si es un objeto de tipo parametricado
    // ejemplo responses.responseSimple<algo1.algo2.algo3>
    // en este caso devolveríamos
    // responseSimple<algo3>
    if (referencia.endsWith('>')) {
      const arraySeccionesReferencia=referencia.split('<');
      const arrayParte1 = arraySeccionesReferencia[0].split('.');
      const parte1 = arrayParte1[arrayParte1.length-1];
      const arrayParte2 = arraySeccionesReferencia[1].split('.');
      const parte2 = arrayParte2[arrayParte2.length-1];

      return  parte1 + '<' + parte2;


    }
    else {
      const arraySeccionesReferencia=referencia.split('.');
      return arraySeccionesReferencia[arraySeccionesReferencia.length-1]

    }

    




  }

  private nombreCompletoSchema(referencia:string): string {
    const arraySeccionesReferencia=referencia.split('/');
    return arraySeccionesReferencia[arraySeccionesReferencia.length-1]

  }



  //---------------------------------------------------------------------------
  // Métodos relacionados con el nodo PATHS
  //---------------------------------------------------------------------------
  private obtenerPathsObject(paths: any): Array<IPathObject> | undefined
  {
    const pathsObject: Array<IPathObject> = [];


    for ( const path in paths) {
      pathsObject.push(this.obtenerPathObject(path, paths[path]));
    }
  
    return pathsObject;
  }

  private obtenerPathObject(path:string, definitionPath: any): IPathObject | undefined
  {


    let pathObject: IPathObject = {
      path: path,
      get: definitionPath['get']?this.obtenerOperationObjects(path,'get',definitionPath['get']):undefined,
      post: definitionPath['post']?this.obtenerOperationObjects(path,'post',definitionPath['post']):undefined,
      put: definitionPath['put']?this.obtenerOperationObjects(path,'put',definitionPath['put']):undefined,
      delete: definitionPath['delete']?this.obtenerOperationObjects(path,'delete',definitionPath['delete']):undefined,
      parameters: undefined,
    };


    return pathObject;
  }

  private obtenerOperationObjects(path: string, metodo:string, definitionOperation:any): IOperationObject | undefined
  {

    let operation: IOperationObject  = {

    path: path,
    metodo: metodo,
    tags: definitionOperation['tags'],
    summary: definitionOperation['summary'],
    operationId: definitionOperation['operationId'],
    parameters: this.obtenerParametersObject(definitionOperation['parameters']),
    responses: this.obtenerResponsesWithCodeObject(definitionOperation['responses']),
    requestBody: definitionOperation['requestBody']?this.obtenerRequestBody(definitionOperation['requestBody']):null
    }

   
   
 

    return operation;
  }

  private obtenerOperationsObjects(pathsObject: Array<IPathObject>): Array<IOperationObject> | undefined
  {
    const operationsObjects: Array<IOperationObject> = [];

    pathsObject.forEach(pathObject => {

      pathObject.get?operationsObjects.push(pathObject.get):null;
      pathObject.post?operationsObjects.push(pathObject.post):null;
      pathObject.put?operationsObjects.push(pathObject.put):null;
      pathObject.delete?operationsObjects.push(pathObject.delete):null;
      
    });
    return operationsObjects;
  }

  private obtenerParametersObject(parameters: any): Array<IParameterObject> | undefined {

    if (Array.isArray(parameters)) {
      const parametersArray=<Array<any>>parameters;

      const auxParameters: Array<IParameterObject> = [];
      
      parametersArray.forEach(parameterData => {

        let parameter: IParameterObject = {
          name: parameterData.name,
          in: parameterData.in,
          description: parameterData.description,
          required: parameterData.required,
          deprecated: parameterData.deprecated,
          allowEmptyValue: parameterData.allowEmptyValue,
          schema: this.obtenerSchemaObject(parameterData.schema),

        }

        auxParameters.push(parameter);

        
      });

      return auxParameters;

    }

    return undefined
  }

  private obtenerResponsesWithCodeObject(responses: any): Array<ICodeWithResponseObject> | undefined {

    const codeWithResponseObjects: Array<ICodeWithResponseObject> = []
    for (const codHttp in responses) {

      let codeWithResponseObject: ICodeWithResponseObject = {
        codigoHttpOrDefault: codHttp,
        response: this.obtenerResponseObject(responses[codHttp])

      };

      codeWithResponseObjects.push(codeWithResponseObject);
    }
   
    return codeWithResponseObjects;
  }

  private obtenerResponseObject(response: any): IResponseObject | undefined {

    let responseObject: IResponseObject = {
      description: response.description,
      content: this.obtenerMediaTypeObject(response.content)
    }
    return responseObject;
  }

  private obtenerRequestBody(request: any): IRequestBody | undefined {


    const requestObject: IRequestBody = {
      description:request.description,
      content: this.obtenerMediaTypeObject(request.content),
      required: request.required
    }
    
    return requestObject;

  }

  private obtenerMediaTypeObject( mediaTypeResponse: any): Array<IMediaTypeObject> | undefined
  {
    
    const mediaTypeResponseObjects: Array<IMediaTypeObject> = []

    for (const mediaType in mediaTypeResponse) {

      if (mediaType === "application/json" ) {
        let mediaTypeResponseObject: IMediaTypeObject = {
          mediaType: mediaType,
          schema: this.obtenerSchemaObject(mediaTypeResponse[mediaType].schema)
        };
  
        mediaTypeResponseObjects.push(mediaTypeResponseObject);

      }

     

    }

    return mediaTypeResponseObjects;
  }
  

  //---------------------------------------------------------------------------
  // Métodos relacionados con las propiedades
  //---------------------------------------------------------------------------

  generarProperties(schemas: Array<ISchemaObjectWithKey>):Array<IPropertyAux>{

    const propertiesAux: Array<IPropertyAux>=[]; 
    schemas.filter(schema => schema.properties)
    .forEach(schema=> {

      const propertiesActuales = schema.properties;
      propertiesActuales.forEach(
        propertyActual => {

          const schemaPadre = schema;
          const tipoSchemaPadre = this.calcularTipoProperties(schema)

          const nombre = propertyActual.name;
          const tipoSchemaHijo = this.calcularTipoProperties(propertyActual.value);
          const schemaHijo = propertyActual.value
          propertiesAux.push({schemaPadre, tipoSchemaPadre, nombre,tipoSchemaHijo, schemaHijo});

        }
      );
    }
    )

    return propertiesAux;
    


  }

  calcularTipoProperties(schema: ISchemaObjectWithKey){
    let tipo: string;

    switch (schema.type) {
      case 'array': tipo = 'Colección de &lt;' + this.calcularTipoProperties(schema.items)+'&gt;'
        
        break;

        case 'object': tipo = schema.key
        
        break;
    
      default:

      tipo = schema.type
        break;
    }

    return tipo;
  }




}