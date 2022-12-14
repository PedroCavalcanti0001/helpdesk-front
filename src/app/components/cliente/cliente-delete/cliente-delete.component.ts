import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {FormControl, Validators} from "@angular/forms";
import {ClienteService} from "../../../services/cliente.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    perfils: [],
    dataCriacao: ''
  }

  constructor(private service: ClienteService,
              private toast: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfils = [];
      this.cliente = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(resposta => {
          this.toast.success("Cliente atualizado com sucesso!", "Update");
          this.router.navigate(["clientes"]);
        },
        ex => {
          console.log(ex);
          if (ex.error.errors) {
            ex.error.errors.forEach(element => {
              this.toast.error(element.message);
            });
          } else {
            this.toast.error(ex.error.message);
          }
        }
    );
  }

}
