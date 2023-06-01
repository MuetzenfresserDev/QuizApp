import { ComponentType } from "@angular/cdk/portal";

export interface DialogData<T>{
    component: ComponentType<T>;
    data: any;
    kind?: string | number;
    parseHeight?: string;
    parseWidth?: string
}