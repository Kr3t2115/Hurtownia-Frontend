import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KlienciComponent } from './components/klienci/klienci.component';
import { ZamowieniaComponent } from './components/zamowienia/zamowienia.component';
import { ProduktyComponent } from './components/produkty/produkty.component';

const routes: Routes = [
  { path: 'klienci', component: KlienciComponent },
  { path: 'zamowienia', component: ZamowieniaComponent },
  { path: 'produkty', component: ProduktyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const allComponents = [KlienciComponent,ZamowieniaComponent,ProduktyComponent]
