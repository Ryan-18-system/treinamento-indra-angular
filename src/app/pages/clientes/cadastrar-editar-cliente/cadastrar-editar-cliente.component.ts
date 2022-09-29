import {Component, OnInit} from '@angular/core';
import {ClientesService} from "../../../services/clientes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ICliente} from "../../../interfaces/cliente";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MensagemAlertService} from "../../../services/mensagem-alert.service";

@Component({
  selector: 'app-cadastrar-editar-cliente',
  templateUrl: './cadastrar-editar-cliente.component.html',
  styleUrls: ['./cadastrar-editar-cliente.component.css']
})
export class CadastrarEditarClienteComponent implements OnInit {

  emptyCliente: ICliente = {
    nome: '',
    cpf: '',
    id: 0,
    email: '',
    observacoes: '',
    ativo: true
  }
  operacaoCadastro = true;

  formGroup: FormGroup = this.preencheFormGroup(this.emptyCliente);

  constructor(private clienteService: ClientesService,
              private router: Router, private rotaAtual: ActivatedRoute,
              private mensagemService: MensagemAlertService) {

    if (this.rotaAtual.snapshot.paramMap.has('id')) {
      this.operacaoCadastro = false;
      this.mensagemService.mensagemDeAlerta("Mantenha a atenção ao editar o cliente")
      const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
      this.clienteService.buscarClientePorId(idParaEdicao || '').subscribe({
        next: newCliente => {
          this.emptyCliente = newCliente
          this.formGroup = this.preencheFormGroup(this.emptyCliente)
        },
        error: err => this.mensagemService.mensagemDeError(err.message)
      })
    }
  }

  ngOnInit(): void {
  }

  preencheFormGroup(cliente: ICliente): FormGroup {
    const regexCpf = /^([0-9]{11})$/
    return new FormGroup({
      id: new FormControl(cliente.id ? cliente.id : null),
      nome: new FormControl(cliente.nome, Validators.required),
      cpf: new FormControl(cliente.cpf, [Validators.required, Validators.pattern(regexCpf)]),
      email: new FormControl(cliente.email, [
        Validators.required,
        Validators.email,
      ]),
      observacoes: new FormControl(cliente.observacoes),
      ativo: new FormControl(cliente.ativo),
    });
  }

  editCliente() {
    const clienteEdit: ICliente = this.formGroup.value
    this.clienteService.editarCliente(clienteEdit.id || 0, clienteEdit).subscribe({
      next: () => {
        this.router.navigate(['/clientes']);
        this.mensagemService.mensagemDeSucesso("Cliente Editado com êxito ")
      },
      error: err => this.mensagemService.mensagemDeError(err.message)
    })

  }

  cadastrarNewCliente() {
    const newCliente: ICliente = this.formGroup.value
    this.clienteService.cadastrarCliente(newCliente).subscribe({
      next: () => {
        this.router.navigate(['/clientes'])
        this.mensagemService.mensagemDeSucesso("Cliente cadastrado com Sucesso")
      },
      error: err => this.mensagemService.mensagemDeError(err.message)
    })

  }

}
