import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Tecnico} from "../../../models/tecnico";
import {TecnicoService} from "../../../services/tecnico.service";

@Component({
    selector: 'app-tecnico-list',
    templateUrl: './tecnico-list.component.html',
    styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {
    ELEMENT_DATA: Tecnico[] = [];
    s
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
    dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private service: TecnicoService) {
    }

    ngOnInit(): void {
        this.findAll();
    }

    findAll() {
        this.service.findAll().subscribe(resposta => {
            this.ELEMENT_DATA = resposta;
            this.dataSource = new MatTableDataSource<Tecnico>(resposta);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
