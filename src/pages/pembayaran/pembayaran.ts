import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the PembayaranPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pembayaran',
  templateUrl: 'pembayaran.html',
})
export class PembayaranPage {

  items_umkm: any;
  items_produk: any;

  id_ukm: any;
  id_keranjang: any;
  id_pelanggan: any;
  ttl_bayar: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http
  ) {
    this.id_keranjang = navParams.get('pid_keranjang');
    this.id_pelanggan = navParams.get('pid_pelanggan');
    this.id_ukm = navParams.get('pid_ukm');
    this.ttl_bayar = navParams.get('ptotal_bayar');

    this.ambilData(this.id_pelanggan, this.id_ukm);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PembayaranPage');
  }

  ambilData(
    id_pelanggan,
    id_ukm
  ){
    this.http.get('http://dagangkita.com/api/review_pembayaran.php?id_pelanggan='+id_pelanggan+'&id_ukm='+id_ukm).map(res => res.json()).subscribe(
        data => {
          console.log(data);
          try {
            this.items_umkm = data.umkm;
            this.items_umkm.forEach(element => {
              //this.id_ukm = element.ID_Pemilik;
              //this.nama_ukm = element.Nama_UKM;
              this.items_produk = element.produk;
              this.items_produk.forEach(element => {
                //this.id_produks = element.ID_Produks;
                //this.nama_produk = element.Nama_Produk;
                //this.jumlah = element.jumlah;
                //this.harga = element.harga;
                //this.catatan = element.catatan;
              });
            });
          } catch (error) {
            //...
          }
        },
        err => {
            console.log("Oops!");
        }
    );
  }

  buatInvoice(){
    var param = JSON.stringify({
      id_keranjang: this.id_keranjang,
      id_pelanggan: this.id_pelanggan,
      id_ukm: this.id_ukm,
      total_bayar: this.ttl_bayar
    });
 
    this.http.post('http://dagangkita.com/api/buat_invoice.php', param).map(res => res.json()).subscribe(
        data => {
            let scs = data.success;
            let psn = data.message;
            if(scs == 1){
              //tutup halaman ini
              this.navCtrl.pop();
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
        title: 'Info',
        subTitle: psn + ' Silakan buka menu transaksi dan upload bukti pembayaran anda.',
        buttons: [
            {
                text: 'Ok',
                handler: () => {
                    this.navCtrl.push(HomePage);
                }
            }, {
                text: 'Batal',
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
