import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TransaksiDetailPage } from '../transaksi-detail/transaksi-detail';

/**
 * Generated class for the TransaksiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-transaksi',
  templateUrl: 'transaksi.html',
})
export class TransaksiPage {

  items: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http
  ) {
    var id_pelanggan = localStorage.getItem('key_id_pel');
    this.ambilDataTransaksi(id_pelanggan);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransaksiPage');
  }

  ambilDataTransaksi(id_pelanggan){
    this.http.get('http://dagangkita.com/api/lihat_transaksi.php?id_pelanggan='+id_pelanggan).map(res => res.json()).subscribe(
        data => {
            this.items = data.field;
            console.log(this.items);
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

  keHalTransaksiDetail(
    id_transaksi,
    timestamp,
    status,
    total_bayar
  ){
    this.navCtrl.push(TransaksiDetailPage, {
      pid_transaksi: id_transaksi,
      ptimestamp: timestamp,
      pstatus: status,
      ptotal_bayar: total_bayar
    });
  }

  bukaBuktiUpload(file_bukti){
    window.open(file_bukti);
  }
}
