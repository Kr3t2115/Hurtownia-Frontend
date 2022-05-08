import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';


export class Produkt {
  constructor(
      public nazwa_produktu:any,
      public cena_netto_za_sztuke:any,
  ){}
}


@Component({
  selector: 'app-produkty',
  templateUrl: './produkty.component.html',
  styleUrls: ['./produkty.component.css']
})
export class ProduktyComponent implements OnInit{
  
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  link = 'http://127.0.0.1:8000/api/produktyAll'
  postLink = 'http://127.0.0.1:8000/api/produktyPost'
  data: any;
  displayedColumns: string[] = ['id', 'nazwa', 'cena'];

  modele = new Produkt('','')


  constructor(private http:HttpClient,  private _snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.http.get<any[]>(this.link).subscribe(
      (res) => {
        this.data = res;
      })
  }
  postData() {
     return this.http.post(this.postLink, this.modele).toPromise().then(data =>{
      console.log(data)
      this._snackBar.open('Udało ci się utworzyć produkt', 'Ok');
    })
 }


}
