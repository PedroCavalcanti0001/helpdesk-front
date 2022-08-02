import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Tecnico} from "../../../models/tecnico";

@Component({
    selector: 'app-tecnico-list',
    templateUrl: './tecnico-list.component.html',
    styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {
    ELEMENT_DATA: Tecnico[] = [
        {
            id: 1,
            nome: "Pedro Eugenio",
            cpf: "123",
            email: "pedro@gmail.com",
            senha: "1234",
            perfis: ['0'],
            dataCriacao: "27/05/2005"
        }
    ];
s
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
    dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
