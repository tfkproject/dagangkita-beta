import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular'; 
import { RuteMapPage } from '../rute-map/rute-map';
import { CallNumber } from '@ionic-native/call-number';
import { OrderPage } from '../order/order';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DetailProdukPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-produk',
  templateUrl: 'detail-produk.html',
})
export class DetailProdukPage {

  bahan_produk: any;
  stok: any;
  harga2: any;
  harga1: any;
  id_produks: any;
  nama_pdk: any;
  nama_ukm: any;
  almt: any;
  nohp: any;
  gmbr_pdk1: any;
  gmbr_pdk2: any;
  gmbr_pdk3: any;
  gmbr_pdk4: any;
  lat: any;
  lon: any;
  link_share: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    private callNumber: CallNumber
  ) {
    this.id_produks = navParams.get('pid_produks');
    this.nama_pdk = navParams.get('pnama_pdk');
    this.nama_ukm = navParams.get('pnama_ukm');
    this.almt = navParams.get('plamat_ukm');
    this.nohp = navParams.get('pno_hp');
    this.harga1 = navParams.get('pharga1');
    this.harga2 = navParams.get('pharga2');
    this.stok = navParams.get('pstok');
    this.gmbr_pdk1 = navParams.get('pgambar1');
    this.gmbr_pdk2 = navParams.get('pgambar2');
    this.gmbr_pdk3 = navParams.get('pgambar3');
    this.gmbr_pdk4 = navParams.get('pgambar4');
    this.bahan_produk = navParams.get('pbahan_produk');
    this.lat = navParams.get('plat');
    this.lon = navParams.get('plon');
    this.link_share = navParams.get('pshare');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProdukPage');
  }

  telpon(){
    this.callNumber.callNumber(this.nohp, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  shareWA(){
    window.open("https://wa.me/?text="+this.nama_pdk+" - "+this.link_share+"",'_system', 'location=yes');
  }

  shareFb(){
    window.open("http://www.facebook.com/sharer.php?u="+this.link_share+"",'_system', 'location=yes');
  }

  shareTw(){
    window.open("http://twitter.com/home?status="+this.nama_pdk+" - "+this.link_share+"",'_system', 'location=yes');
  }

  keHalRuteMap(){
    this.navCtrl.push(RuteMapPage, {
      plat: this.lat,
      plon: this.lon
    });
  }

  tampilkanToast() {
    let toast = this.toastCtrl.create({
      message: 'Anda akan order',
      duration: 3000
    });
    toast.present();
  }

  keHalOrder(
    id_produks,
    gmbr_pdk1,
    nama_pdk,
    harga1,
    harga2,
    nama_ukm){
    this.navCtrl.push(OrderPage, {
      pid_produks: id_produks,
      pgmbr_pdk1: gmbr_pdk1,
      pnama_pdk: nama_pdk,
      pharga1: harga1,
      pharga2: harga2,
      pnama_ukm: nama_ukm
    });
  }

  keHalLogin(){
    this.navCtrl.push(LoginPage);
  }

  cekLogin(){
    if(localStorage.getItem('key_id_pel') != null){
      this.keHalOrder(this.id_produks,
        this.gmbr_pdk1,
        this.nama_pdk,
        this.harga1,
        this.harga2,
        this.nama_ukm);
    }else{
        //masuk ke form login
        this.keHalLogin();
    }
  }
}
