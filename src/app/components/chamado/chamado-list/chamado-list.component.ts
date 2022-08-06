import {Component, OnInit, ViewChild} from '@angular/core';
import {Chamado} from "../../../models/chamado";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-chamado-list',
    templateUrl: './chamado-list.component.html',
    styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

    ELEMENT_DATA: Chamado[] = [{
        id: 1,
        dataAbertura: "21/07/2022",
        dataFechamento: "21/07/2022",
        prioridade: "Alta",
        status: "Andamento",
        titulo: "Teste chamado 1",
        descricao: "apenas um teste",
        tecnico: 1,
        cliente: 1,
        nomeCliente: "Pedro eugenio",
        nomeTecnico: "albert einstein"
    }];

    displayedColumns: string[] = ['id', 'titulo', 'cliente',"tecnico", 'dataAbertura', 'status', "prioridade", "acoes",];
    dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {
    }

    ngOnInit(): void {
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
