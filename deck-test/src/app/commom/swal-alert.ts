import { Injectable } from '@angular/core'
import { AlertEnum } from '@app/enums/enum-alert'
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalAlert {
  subject: any;
  
  constructor() { }

  async showAlert (type: AlertEnum, message: string, shortMessage: any = '') {
    switch(type) {
      case AlertEnum.error:
        Swal.fire({
          title: message,
          text: message,
          icon: 'error',
          confirmButtonColor: '#2E8942',
        })
        break

      case AlertEnum.warning:
        Swal.fire({
          title: message,
          text: shortMessage,
          icon: 'warning',
          confirmButtonColor: '#2E8942',
        })
        break

      case AlertEnum.success:
        Swal.fire({
          title: message,
          text: shortMessage,
          icon: 'success',
          confirmButtonColor: '#2E8942',
        })
        break

      case AlertEnum.info:
        Swal.fire({
          title: '',
          text: message,
          icon: 'info',
          confirmButtonColor: '#2E8942',
        })
        break
    } 
  }
}