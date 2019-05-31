import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
  })
export class ToastService {
    toastStatus = ToastStatus;
    constructor(private toastr: ToastrService) {
    }

    showToast(status, message: string, heading?: string) {
        switch(status){
          case ToastStatus.Success:
            this.toastr.success(message, heading);
            break;
          case ToastStatus.Error:
            this.toastr.error(message, heading);
            break;
          case ToastStatus.Warning:
            this.toastr.warning(message, heading);
            break;
          case ToastStatus.Show:
            this.toastr.show(message, heading);
            break;
          case ToastStatus.Info:
            this.toastr.info(message, heading);
            break;
        }
      }
}

enum ToastStatus {
    Show = 'Show',
    Success = 'Success',
    Error= 'Error',
    Info = 'Info',
    Warning = 'Warning'
  }
