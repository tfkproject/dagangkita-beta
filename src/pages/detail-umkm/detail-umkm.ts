import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular'; 
import { RuteMapPage } from '../rute-map/rute-map';
import { CallNumber } from '@ionic-native/call-number';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailProdukPage } from '../detail-produk/detail-produk';
/**
 * Generated class for the DetailUmkmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-umkm',
  templateUrl: 'detail-umkm.html',
})
export class DetailUmkmPage {

  email: any;
  deskripsi_ukm: any;
  nama_pemilik: any;
  nama_ukm: any;
  id: any;
  almt: any;
  nohp: any;
  logo: any;
  lat: any;
  lon: any;

  items_produk: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    public http: Http,
    private callNumber: CallNumber
  ) {
    this.id = navParams.get('pid'); 
    this.nama_ukm = navParams.get('pnama_ukm');
    this.nama_pemilik = navParams.get('pnama_pemilik');
    this.deskripsi_ukm = navParams.get('pdeskripsi');
    this.almt = navParams.get('palamat');
    this.nohp = navParams.get('pno_hp');
    this.email = navParams.get('pemail');
    this.logo = navParams.get('plogo');
    this.lat = navParams.get('plat');
    this.lon = navParams.get('plon'); 

    this.ambilProdukUmkm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailUmkmPage');
  }

  telpon(){
    this.callNumber.callNumber(this.nohp, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  /*tampilkanToast() {
    let toast = this.toastCtrl.create({
      message: 'Lat: '+this.lat+', Lon: '+this.lon,
      duration: 3000
    });
    toast.present();
  }*/

  keHalRuteMap(){
    this.navCtrl.push(RuteMapPage, {
      plat: this.lat,
      plon: this.lon
    });
  }

  ambilProdukUmkm(){
        this.http.get('http://dagangkita.com/api/produk_umkm.php?pid='+this.id).map(res => res.json()).subscribe(
        data => {
            console.log(data);
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
