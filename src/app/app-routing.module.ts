import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import {ContasComponent} from "./pages/contas/contas.component";
import {CadastrarEditarClienteComponent} from "./pages/clientes/cadastrar-editar-cliente/cadastrar-editar-cliente.component";
import {CadastrarContaComponent} from "./pages/contas/cadastrar-conta/cadastrar-conta.component";
import {OperacaoComponent} from "./pages/contas/operacao/operacao.component";
import {TransferenciaComponent} from "./pages/contas/transferencia/transferencia.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'clientes', component: ClientesComponent
  },
  {
    path:'contas', component: ContasComponent
  },
  {
    path:'contas/:cpf', component: ContasComponent
  },
  {
    path:'cadastrar-cliente', component: CadastrarEditarClienteComponent
  },
  {
    path:'cadastrar-cliente/:id', component: CadastrarEditarClienteComponent
  },{
    path:'cadastrar-conta/:id', component: CadastrarContaComponent
  },{
    path:'operacao/:agencia/:numero/:tipoOperacacao', component: OperacaoComponent
  },{
    path: 'transferir', component: TransferenciaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
