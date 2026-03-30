# Descripción.
ApiEduca es un API REST que expone las entidades que se gestionan en la herramienta para la Gestión Académica y Administrativa de los centros educativos (Pincel Ekade). No obstante, de forma temporal, también se han incluido entidades externas como, por ejemplo, algunas de las gestionadas en el Directorio de Centros o el Plan de Estudios de Canarias.

# Seguridad.
Esta ApiRest tiene carácter interno y su consumo solo puede realizarse a través de la Intranet Corporativa. 

Hemos seguido el modelo de autenticación más extendido en este tipo de APIs y que está basado en tokens. En concreto, autenticación "Bearer". Es un formato ampliamente asumido que nos permite la autorización en conjunto con la autenticación de usuario. Básicamente, se requiere que en todas las peticiones se añada un token en cabecera que identifica al consumidor y, opcionalmente, contendrá información adicional requerida para el proceso de autenticación/autorización.

Para la obtención de un token se requiere pasar por un proceso de autenticación que, como mínimo, requerirá una "apikey" que, en la actualidad, es gestionada por el equipo de desarrollo del SI04.

Existen varios endpoints orientados a la obtención de un token de acceso. Ver [Anexo I](#AnexoI). El más sencillo solo requerirá aportar la apikey suministrada que, básicamente, representa a la aplicación consumidora. Existen otros endpoints que requerirán más información como, por ejemplo, credenciales de usuarios. Como podemos imaginar, estos últimos aportarán un mayor nivel de privilegios a la hora del consumo de endpoints.

# Estructura de los endpoints.

Podemos distinguir tres unidades de información en el _path_ que representa a los endpoints: servidor, sistema de información y segmentos propios del endpoint.

* Disponemos de dos entornos: preproducción y producción. El segmento inicial correspondiente a los endpoints en cada entorno serán: https://wwwpre.educacion.org/educacion/bussed/apieduca y https://www.gobiernodecanarias.org/educacion/bussed/apieduca.
* Los endpoints se encontrarán en el contexto de un _sistema de información_ que será identificado por el segmento que precede al servidor. 
* Finalmente, tenemos los segmentos del Path que identifican al propio endpoint.

Veamos algunos ejemplos:

Ejemplo 1: https://www.gobiernodecanarias.org/educacion/bussed/apieduca/directorio-centros/zonas-inspeccion: endpoint que devuelve las diferentes zonas de inspección que se han establecido en materia de educación en la Comunidad Canaria. Es una gestión correspondiente al Directorio de Centros y, por tanto, el "sistema de información" es "directorio-centros". En este caso, atendiendo al comienzo de la uri, podemos ver que se trata de un endpoint del entorno de producción.
Ejemplo 2: https://wwwpre.educacion.org/educacion/bussed/apieduca/gestionacadcentros/matriculas: endpoint de que devuelve una colección de matrículas del entorno de preproducción. Se trata de información proveniente de Pincel Ekade. La sección del endpoint "sistema de información" que representa a todas las entidades provenientes de Pincel Ekade es  "gestionacadcentros" (Gestión académica y administrativa de centros).

## Estructura de las respuestas.
Las respuestas a las peticiones a cualquier petición de ApiEduca siempre tiene la misma estructrura JSON. Se trata de un objeto que actúa como envoltura (wrap) ante cualquier petición. Este objeto unificado de respuesta tiene 3 campos: datos, mensajes y metadatos.

### Datos.
Este campo devuelve los datos solicitados (generalmente, ante peticiones GET). Distinguiremos entre colecciones (devolución de un array) y entregas simples (devolución de un objeto). En el desarrollo de ApiEduca hemos creado un catálogo de DTO's (Data Tranfer Object) que representa la interfaz al exterior de las entidades que gestionamos y cuyo objetivo es dar legibilidad, desacoplar las respuestas a las estructuras internas y ocultar aspectos irrelevantes a los consumidores.
En el apartado "colecciones" veremos como, en ocasiones, disponemos de representaciones polimórficas de estas entidades a través de la definición de múltiples DTO's, permitiéndonos equilibrar la necesidad de información con el rendimiento de las respuestas y también con niveles de seguridad en base al contenido expuesto.

### Mensajes.
Este campo devuelve una colección de mensajes (potencialmente vacío). En muchas ocasiones es necesario acompañar las respuestas con mensajes que aporten información adicional a los consumidores, los cuales pueden ir desde meros avisos hasta notificaciones de errores. Por ejemplo, el sistema, ante una petición incorrectamente formada, notificará este hecho al peticionario como un mensaje dentro de esta colección. También es el mecanismo habitual cuando se realiza una petición que incumple reglas de negocio establecidas (Ej. "La fecha de finalización de una matrícula no puede ser anterior a la fecha de matrícula").

### Metadatos.
Este campo es, precisamente, el que nos ha llevado a optar por el uso de envolvente a las respuestas. Se trata de un objeto que nos permite aportar información sobre la propia petición. A nivel básico, aporta, entre otros datos, la fecha/hora de la petición, usuario autenticado, url de la solicitud, etc. En determinadas ocaciones estos medadatos se enriquecen con informacióin adicional. Tal es el caso de las respuestas de peticiones que devuelven colecciones. En estos casos se aporta información adicional como, por ejemplo, datos de paginación, filtro y orden.

## Códigos de respuesta.
En función de la naturaleza de las peticiones o del resultado obtenido al procesar una petición nos podemos encontrar con múltiples casuísticas. Hemos intentado ajustarnos a la semántica establecida en el protocolo HTTP en lo relativo a los códigos de respuestas. Con carácter general se devuelve un subconjunto de códigos que intentamos describir a continuación.

- **200** (_OK_): las respuestas acompañadas con esté código responden a dos casos bien diferenciados, aunque ambos tienen en común que reflejan peticiones que han podido ser procesadas de forma satisfactoria:
    - Se devuelve al usuario el contenido solicitado.
    - Lo solicitado por el usuario ha sido satisfactoriamente procesado pero la lógica de la aplicación establece que no debe aportarse la información requerida.
Es importante destacar que la intención primera de codificación del segundo caso era un código de respuesta 204 (No content). Sin embargo esto no es posible puesto que el protocolo no permite que se envíe contenido en el "body" de la respuesta y, en el caso de usar envolventes, siempre vamos a requerir devolver contenido.
- **201** (_Created_): es el código de respuesta ante una petición en la que se solicita la creación de un recurso y ha sido satisfactoria.
- **203** (_Non-Authoritative Information_): es el código de respuesta que damos ante una petición habilitada para un cliente que ha podido ser atendida pero la lógica de la aplicación establece que no debe aportarse la información requerida. Un ejemplo de respuesta con este código podría ser la solicitud de sesiones de evaluación no publicadas para ciertas aplicaciones.
- **400** (_Bad Request_): es el código de respuesta ante una petición que no puede ser atendida por estar mal formada, por no seguir las directrices de la especificación de los parámetros query, etc. En resumen, estamos ante peticiones que no pueden ser resueltas de forma satisfactoria.
- **401** (_Unauthorized_): como indica su descripción se da esta respuesta cuando el cliente no está autorizado a consumir el endpoint. Puede deberse a que el usuario no ha hecho uso de un token o que la información del token establece que el cliente no es apto para el consumo del endpoint.
- **403** (_Forbidden_): este código de respuesta solo se devuelve cuando se hace uso de endpoints dirigidos a la autenticación y, fruto del procesado de la petición, se dictamina que la autenticación es insatisfactoria. Por ejemplo, no se obtiene un token debido a credenciales no válidas.
- **409** (_Conflict_): se devuelve cuando se ejecuta un endpoint de manipulación de un recurso (métodos POST, PUT, DELETE, PATCH ) y hay una o varias reglas de negocio que impiden la ejecución de la acción solicitada. Se devolverá en el nodo "mensajes" la colección de reglas que se incumplen.
- **500** (_Internal Server Error_): no se establece ningún desglose. Aparece este error ante excepciones internas de la aplicación.

## Colecciones.

### Parámetros de carácter general.
Los endpoints de tipo GET que devuelven colecciones de datos conforman el conjunto más representativo de endpoints de ApiEduca y, probablemente, el más demandado. Es muy importante, por tanto, aportarle la suficiente flexibilidad para que cubra las necesidades de la mayoría de los consumidores, aunque evitando dar respuestas sobreajustadas que provoquen un exceso de configuraciones que compliquen su uso e implementación. Como respuesta a la flexibilidad hemos uniformado los parámetros que establecen especificaciones de carácter general, tanto en lo referente a la información devuelta como en la oferta de parámetros. Son los siguientes:

- **Nivel de detalle**: muchos de los endpoints que devuelven colecciones de objetos nos permite establecer el nivel de información devuelta en estos objetos. Es decir, nos permiten establecer la estructura de los objetos devueltos. El parámetro es "nivelDetalle" y sus valores potenciales son "r"(reducido), "m"(medio) y "e"(extendido), aunque puede que algunos endpoints no ofrezcan todos los niveles. Es obvio que el uso del nivel reducido redundará en una mejora del rendimiento. En general, se aconseja usar siempre el nivel mínimo que aporte la información requerida.
En este punto hay otro aspecto a destacar relacionado con la seguridad. Puede que a determinados usuarios solo se les permita hacer uso de niveles reducidos de contenido debido a que los extendidos exponen información a la que dichos usuarios no están autorizados a acceder.

- **Opcion**: en algunos de los endpoints que devuelven colecciones se permite aplicar filtros de diferentes formas. Cada una de esas formas es lo que denominamos "opción". En la descripción de cada endpoint de especifica los parámetros que conforman cada una de las opciones.

- **Paginación**: posicionInicial y tamanyoBloque: como es obvio, debemos establecer un sistema de paginación ante endpoints que devuelven colecciones de entidades. Hemos definido dos parámetros para establecer la página requerida en la respuesta a través de la posición inicial del paquete solicitado y el número de datos requerido. Por ejemplo, si indicamos en el parámetro "posicionInicial" el valor 4 y al parámetro "tamanyoBloque" el valor 70, el sistema devolverá la cuarta página de un sistema de bloques de 70 registros.
En caso de omisión de estos parámetros se devolverá la primera página de una paginación de bloques de tamaño 100. (posicionInicial=1 y tamanyoBloque=100). No obstante, se podrá solicitar la información sin paginar haciendo uso del parámetro "paginar" ( Ej: paginar=false).

- **Orden**: con carácter general, los endpoints que devuelven colecciones dispondrán de un campo "orden" en el que podemos establecer la ordenación de la colección devuelta a partir de múltiples propiedades del DTO devuelto. Por defecto, para cada campo que conforma el parámetro "orden" se establecerá, por defecto, un orden ascendente, pero es posible invertir el orden sin más que añadir a su derecha el signo "-". Por ejemplo consideremos la ejecución del endpoint que devuelve una colección de matriculas del centro 38010773 y curso escolar 2023. Queremos que los datos se devuelvan ordenados por fecha de matrícula en orden descendente, seguido de apellidos y nombre en orden ascendente. La sintaxis sería: "https://wwwpre.educacion.org/educacion/bussed/apieduca/gestionacadcentros/matriculas?opcion=1&cursoEscolar=2023&codigoCentro=38010773&orden=-fechaMatricula,primerApellido,segundoApellido,nombre".

### Formato de los parámetros query.

- **Fechas:**  aaaa-mm-dd ( Ej. 2024-04-12)
- **Fecha/hora:**  aaaa-mm-ssThh:mm:ssZ ( Ej. 2024-04-12T13:12:15T)
- **Guid:**  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", a puede tomar los valores [0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f] ( Ej. 92b6505b99a946fcb107c47f2acf5734    )
- **Booleano:** true/false.

# Otros aspectos de carácter general.

## Contenidos de documentos devueltos por endpoints.

Existen múltiples endpoints que devuelven el contenido de ficheros como, por ejemplo, el endpoint que devuelve los documentos asociados a una NEAE.
Este contenido siempre se devolverá como un array de byte codificado en base64.


# Anexo I{#AnexoI}

La autenticación en ApiEduca, como la mayoría de Apis de tipo ApiREST, está basada en tokens. En concreto, en el modelo JWT Bearer. Por tanto, como paso previo a cualquier invocación de endpoints necesitamos obtener un token váldio.

Para la obtención del token disponemos de varias opciones (endpoints). Estos endpoint son los siguientes:

* /seguridad/autenticacion-por-aplicacion
* /seguridad/autenticacion-por-guidsesion
* /seguridad/autenticacion-por-usuario

Los tres endpoints tienen en común que requieren como parámetro la ApiKey que representa a la aplicación consumidora.  El primero de ellos (por aplicación) no requiere ningún otro parámetro y, por tanto, no se le traslada información relativa a ningún usuario. Obviamente, haciendo uso de este endpoint para generar el token de autenticación vamos a tener restricciones en el consumo de determinados endpoints: aquellos que requieren de un usuario para su consumo.

Los otros dos endpoint ( por guidsesion y usuario ) requerirán información de un usuario. 

El primero hará uso de un guissesion proveniente del sistema de Autenticación SUA. Es interesante cuando el consumo de los endpoints se realice a través de una aplicación que ya ha requerido la autenticación SUA y dispone, por tanto, de un guidsesion, evitando pasar por un nuevo proceso de autenticación para el consumo de ApiEduca. 

En cuanto al segundo endpoint vamos a tener que suministrarle las credenciales SUA como parámetros adicionales del endpoint y será el endpoint quien realice la autenticación a través del Sistema SUA.









