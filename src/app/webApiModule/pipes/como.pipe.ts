import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'como', pure: true })
export class ComoPipe implements PipeTransform {
  transform<T>(input: unknown, baseItem: T | undefined): T {
    return (input as unknown) as T;
  }
}