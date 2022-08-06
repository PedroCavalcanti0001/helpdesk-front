import { Component, OnInit } from '@angular/core';
import {Tecnico} from "../../../models/tecnico";
import {FormControl, Validators} from "@angular/forms";
import {TecnicoService} from "../../../services/tecnico.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    perfils: [],
    dataCriacao: ''
  }

  constructor(private service: TecnicoService,
              private toast: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfils = [];
      this.tecnico = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(resposta => {
          this.toast.success("Técnico atualizado com sucesso!", "Update");
          this.router.navigate(["tecnicos"]);
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
