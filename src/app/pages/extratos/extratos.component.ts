import {Component, OnInit} from '@angular/core';
import {ExtratoServiceService} from "../../services/extrato.service";
import {ActivatedRoute} from "@angular/router";
import {IExtrato} from "../../interfaces/Extrato";
import {MensagemAlertService} from "../../services/mensagem-alert.service";

@Component({
  selector: 'app-extratos',
  templateUrl: './extratos.component.html',
  styleUrls: ['./extratos.component.css']
})
export class ExtratosComponent implements OnInit {
  agencia: string | null = '';
  numeroConta: string | null = '';
  arrayExtratos: IExtrato[] = [];

  constructor(private extratoService: ExtratoServiceService, private rotaAtual: ActivatedRoute, private mensagemService: MensagemAlertService) {


  }

  ngOnInit(): void {
    this.numeroConta = this.rotaAtual.snapshot.paramMap.get('numero')
    this.agencia = this.rotaAtual.snapshot.paramMap.get('agencia')
    this.listarTodosOsExtratos()
  }

  listarTodosOsExtratos() {
    this.extratoService.listarTodosOsExtratos(this.numeroConta || '', this.agencia || '').subscribe({
      next: extratos => {
        this.arrayExtratos = extratos
        console.log(this.arrayExtratos)
      },
      error: err => this.mensagemService.mensagemDeError(err.message)
    })
  }
}
