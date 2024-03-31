import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'boolean',
    standalone: true
})
export class BooleanPipe implements PipeTransform {
    transform<T>(value: T, ...args: any[]) {
        if(value){
            return value
        }

        return
    }
}