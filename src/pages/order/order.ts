import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { KeranjangPage } from '../keranjang/keranjang';
import { Http } from '@angular/http';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  counter = 1;
  id_produks: any;
  tharga: any;
  gmbr_pdk1: any;
  harga2: any;
  harga1: any;
  nama_pdk: any;
  nama_ukm: any;
  catatan: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http
  ) {
    this.id_produks = navParams.get('pid_produks');
    this.gmbr_pdk1 = navParams.get('pgmbr_pdk1');
    this.nama_pdk = navParams.get('pnama_pdk');
    this.harga1 = navParams.get('pharga1');
    this.harga2 = navParams.get('pharga2');
    this.nama_ukm = navParams.get('pnama_ukm');

    this.tharga = this.harga1 * this.counter;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  jumTambah(){
    this.counter++;
    this.tharga = this.harga1 * this.counter;
  }

  jumKurang(){
    this.counter--;
    if(this.counter <= 0){
      this.counter = 1;
      this.tharga = this.harga1 * this.counter;
    }
    else{
      this.tharga = this.harga1 * this.counter;
    }
  }

  prosesTambahKeKeranjang(){
    var id_pelanggan = localStorage.getItem('key_id_pel');
    var param = JSON.stringify({
      id_produks: this.id_produks,
      id_pelanggan: id_pelanggan,
      jumlah: this.counter,
      harga: this.tharga,
      catatan: this.catatan
    });
 
    this.http.post('http://dagangkita.com/api/tambah_ke_keranjang.php', param).map(res => res.json()).subscribe(
        data => {
            let scs = data.success;
            let psn = data.message;
            if(scs == 1){
              this.promptBerhasil(psn);
            }else{
              this.promptGagal(psn);
            }
        },
        err => {
            console.log("Oops!");
        }
    );
  }

  promptBerhasil(psn){
    let alert = this.alertCtrl.create({
        title: 'Lihat keranjang anda?',
        subTitle: psn,
        buttons: [
            {
                text: 'Ya',
                handler: () => {
                    this.navCtrl.push(KeranjangPage);
                }
            }, {
                text: 'Nanti',
                handler: () => {
                    alert.dismiss(false);
                    return false;
                }
            }
        ]
    });
    alert.present();
  }

  promptGagal(psn){
    let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: psn,
        buttons: [
            {
                text: 'Tutup',
                handler: () => {
                  alert.dismiss(false);
                  return false;
                }
            }
        ]
    });
    alert.present();
  }
}
