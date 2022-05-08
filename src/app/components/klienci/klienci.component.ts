import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar';

export class Klient {
  constructor(
      public nazwa_klienta:any,
      public nip_klienta:any,
      public miejscowosc_klienta:any
  ){}
}

@Component({
  selector: 'app-klienci',
  templateUrl: './klienci.component.html',
  styleUrls: ['./klienci.component.css']
})
export class KlienciComponent implements OnInit {

  link = 'http://127.0.0.1:8000/api/klienciAll'
  postLink = 'http://127.0.0.1:8000/api/klienciPost'
  data: any;
  displayedColumns: string[] = ['id', 'nazwa', 'nip', 'miejsc'];

  constructor(private http:HttpClient, private _snackBar: MatSnackBar) { }


  modele = new Klient('','','')

  ngOnInit() {
    
    this.http.get<any[]>(this.link).subscribe(
      (res) => {
        this.data = res;
      })

      
  }

  postData() {
     return this.http.post(this.postLink, this.modele).toPromise().then(data =>{
       console.log(data)
       this._snackBar.open('Udało ci się utworzyć klienta', 'Ok');
     })
  }
 
}


