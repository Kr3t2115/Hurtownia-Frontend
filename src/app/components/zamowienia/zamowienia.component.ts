import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

export class Zamowienie {
  constructor(
      public id_klienta:any,
      public id_produktu:any,
      public ilosc:any
  ){}
}


@Component({
  selector: 'app-zamowienia',
  templateUrl: './zamowienia.component.html',
  styleUrls: ['./zamowienia.component.css']
})
export class ZamowieniaComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  link = 'http://127.0.0.1:8000/api/faktura'
  Kliencilink = 'http://127.0.0.1:8000/api/klienciAll'
  Produktylink = 'http://127.0.0.1:8000/api/produktyAll'
  PostLink = 'http://127.0.0.1:8000/api/zamowieniaPost'

  data: any;
  Kliencidata: any;
  Produktydata: any;
  displayedColumns: string[] = ['id', 'nazwa_klienta', 'nip', 'miejscowosc' ,'nazwa_produktu', 'cena _netto_sztuka' , 'cena_netto' , 'podatek_vat' , 'cena_brutto', 'pobierzPDF' ];


  modele = new Zamowienie('','','')

  constructor(private http:HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.http.get<any[]>(this.link).subscribe(
      (res) => {
        this.data = res;
      })
      
    this.http.get<any[]>(this.Kliencilink).subscribe(
        (res) => {
          this.Kliencidata = res;
      })

    this.http.get<any[]>(this.Produktylink).subscribe(
        (res) => {
          this.Produktydata = res;
      })
  
      
  }
  postData() {
    return this.http.post(this.PostLink, this.modele).toPromise().then(data =>{
      console.log(data)
      this._snackBar.open('Udało ci się dodać zamowienie', 'Ok'); 
    })
 }
 getFaktura(id: any,nazwa_klienta: any,nip_klienta:any,miejscowosc_klienta:any,nazwa_produktu:any,cena_netto_za_sztuke:any,cena_netto:any,podatek_vat:any,cena_brutto:any) {

  var doc = new jsPDF()
  doc.text('Odbiorca',10, 10)
  doc.text(nazwa_klienta.toString(), 10, 20)
  doc.text(nip_klienta.toString(), 10, 30)
  doc.text(miejscowosc_klienta.toString(), 10, 40)

  doc.text('Nadawca',100, 10)
  doc.text('HURTOWNIA U KRETA', 100, 20)
  doc.text('4204204201', 100, 30)
  doc.text('Kluki', 100, 40)

  const glowa = [['nazwa_produktu','cena_netto_za_sztuke','cena_netto','podatek_vat','cena_brutto']]
  const arr = [[nazwa_produktu,cena_netto_za_sztuke,cena_netto,podatek_vat,cena_brutto]]


  autoTable(doc, {head:glowa,body:arr,startY:50})


  doc.save('a4.pdf')  
 }

}
