import {ErrorHandler} from '@angular/core';

export class AppErrorHandler extends ErrorHandler {
    constructor(){
        super();
    }

    public handleError(error: any): void {
        // Add your logic here.
        console.log('Error handler');
        super.handleError(error);
    }
}
