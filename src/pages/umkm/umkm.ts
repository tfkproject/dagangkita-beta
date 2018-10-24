import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailUmkmPage } from '../detail-umkm/detail-umkm';

@Component({
  selector: 'page-umkm',
  templateUrl: 'umkm.html'
})
export class UmkmPage {

  items: any;

  constructor(public navCtrl: NavController, public http: Http) {
    this.http.get('http://dagangkita.com/api/pelaku_usaha.php').map(res => res.json()).subscribe(
        data => {
            this.items = data.field;
            /*this.field.forEach(element => {
              var id_ukm = element.ID_Pemilik;
              console.log(id_ukm);
            });*/
        },
        err => {
            console.log("Oops!");
        }
    );
    
  }

  keHalDetailUKM(
    id_pemilik, 
    nama_ukm, 
    nama_pemilik, 
    alamat_ukm, 
    no_hp, 
    email,
    logo_ukm, 
    deskripsi,
    lat, 
    lon){
    this.navCtrl.push(DetailUmkmPage, {
        pid: id_pemilik, 
        pnama_ukm: nama_ukm, 
        pnama_pemilik: nama_pemilik, 
        palamat: alamat_ukm, 
        pno_hp: no_hp, 
        pemail: email,
        plogo: logo_ukm,
        pdeskripsi: deskripsi,
        plat: lat,
        plon: lon
    });
  }

}
