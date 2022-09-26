import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ContasComponent } from './pages/contas/contas.component';
import { CadastrarContaComponent } from './pages/contas/cadastrar-conta/cadastrar-conta.component';
import { CadastrarEditarClienteComponent } from './pages/clientes/cadastrar-editar-cliente/cadastrar-editar-cliente.component';
import { PipeCpfPipe } from './pipes/pipe-cpf.pipe';
import { OperacaoComponent } from './pages/contas/operacao/operacao.component';
import { TransferenciaComponent } from './pages/contas/transferencia/transferencia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HomeComponent,
    HeaderComponent,
    ContasComponent,
    CadastrarContaComponent,
    CadastrarEditarClienteComponent,
    PipeCpfPipe,
    OperacaoComponent,
    TransferenciaComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
