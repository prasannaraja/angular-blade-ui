import { HttpErrorResponse } from '@angular/common/http'
import {ErrorHandler, Injectable, NgZone } from '@angular/core'

Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor() {

    }

    handleError(error)
    {
        if(error instanceof HttpErrorResponse)
        {
            console.log(error);
            debugger;
        }
        else {
            try{
                const errorObj: any = error;
                console.log(errorObj);
                debugger;
            }
            catch(err) {
                console.log(error);
                debugger;
            }
        }
    }
}