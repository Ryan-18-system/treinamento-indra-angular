import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensagemAlertService {
  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  constructor() { }

  mensagemDeSucesso(mensagem:string):void{
    this.toast.fire({title:mensagem,icon:"success"})
  }
  mensagemDeError(mensagem: string):void{
    this.toast.fire({title:mensagem,icon:"error"})

  }
  mensagemDeInfo(mensagem :string):void{
    this.toast.fire({title:mensagem,icon:"info"})
  }
  mensagemDeAlerta(mensagem:string):void{
    this.toast.fire({title:mensagem,icon:"warning"})
  }

}
