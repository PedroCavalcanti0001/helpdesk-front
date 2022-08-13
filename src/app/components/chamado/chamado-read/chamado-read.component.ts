import { Component, OnInit } from '@angular/core';
import {Chamado} from "../../../models/chamado";
import {Cliente} from "../../../models/cliente";
import {Tecnico} from "../../../models/tecnico";
import {FormControl, Validators} from "@angular/forms";
import {ChamadoService} from "../../../services/chamado.service";
import {ClienteService} from "../../../services/cliente.service";
import {TecnicoService} from "../../../services/tecnico.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  constructor(
      private chamadoService: ChamadoService,
      private clienteService: ClienteService,
      private tecnicoService: TecnicoService,
      private toastService: ToastrService,
      private route:ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id")
    this.findById();
  }

  findById():void{
    this.chamadoService.findById(this.chamado.id).subscribe(resposta =>{
      this.chamado = resposta;
    }, ex =>{
      this.toastService.error(ex.error.error);
    });
  }

  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return "ENCERRADO"
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else {
      return "ALTA"
    }
  }

}
