import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailProdukPage } from '../detail-produk/detail-produk';

/**
 * Generated class for the ProdukPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-produk',
  templateUrl: 'produk.html',
})
export class ProdukPage {
  id_sub_jenis: any;
  sub_jenis: any;
  items_produk: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http
  ) {
    this.id_sub_jenis = navParams.get('pid_sub_jenis');
    this.sub_jenis = navParams.get('psub_jenis');
    this.ambilProduk();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdukPage');
  }

  ambilProduk(){
    this.http.get('http://dagangkita.com/api/produk.php?id_sub_jenis='+this.id_sub_jenis).map(res => res.json()).subscribe(
      data => {
          this.items_produk = data.field;
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

  keHalDetailPdk(
    ID_Produks,
    Nama_Produk, 
    Nama_UKM, 
    No_HP, 
    Harga1,
    Harga2,
    Stok,
    Gambar_1, 
    Gambar_2, 
    Gambar_3, 
    Gambar_4, 
    Bahan_Produk,
    Alamat_UKM,
    lat,
    lon,
    link_share
  ){
    this.navCtrl.push(DetailProdukPage, {
        pid_produks: ID_Produks,
        pnama_pdk: Nama_Produk,
        pnama_ukm: Nama_UKM, 
        pno_hp: No_HP, 
        pharga1: Harga1,
        pharga2: Harga2,
        pstok: Stok,
        pgambar1: Gambar_1, 
        pgambar2: Gambar_2, 
        pgambar3: Gambar_3, 
        pgambar4: Gambar_4, 
        pbahan_produk: Bahan_Produk,
        plamat_ukm: Alamat_UKM,
        plat: lat,
        plon: lon,
        pshare: link_share
    });
  }

}
