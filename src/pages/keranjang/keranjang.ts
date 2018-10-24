import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { PembayaranPage } from '../pembayaran/pembayaran';

/**
 * Generated class for the KeranjangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-keranjang',
  templateUrl: 'keranjang.html',
})
export class KeranjangPage {

  id_pelanggan: any;
  items_umkm: any;
  id_ukm: any;
  nama_ukm: any;

  items_produk: any;
  id_produks: any;
  nama_produk: any;
  jumlah: any;
  harga: any;
  catatan: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController
  ) {
    var id_pelanggan = localStorage.getItem('key_id_pel');
    this.ambilDataKeranjang(id_pelanggan);
    this.id_pelanggan = id_pelanggan;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeranjangPage');
  }

  ambilDataKeranjang(id_pelanggan){
    this.http.get('http://dagangkita.com/api/lihat_keranjang.php?id_pelanggan='+id_pelanggan).map(res => res.json()).subscribe(
        data => {
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
              var alert = this.alertCtrl.create({
                title: 'Info',
                subTitle: 'Tidak ada data dikeranjang belanja anda',
                buttons: ['Tutup']
              });
              alert.present();
              this.navCtrl.pop();
            }
        },
        err => {
            console.log("Oops!");
        }
    );
  }

  hapusItem(id_item_beli){
    this.http.get('http://dagangkita.com/api/hapus_item_keranjang.php?id_item_beli='+id_item_beli).map(res => res.json()).subscribe(
        data => {
          var id_pelanggan = localStorage.getItem('key_id_pel');
          this.ambilDataKeranjang(id_pelanggan);
        },
        err => {
            console.log("Oops!");
        }
    );
  }

  keHalBayar(
    id_keranjang,
    id_pelanggan,
    id_ukm,
    total_bayar
  ){
    this.navCtrl.push(PembayaranPage, {
      pid_keranjang: id_keranjang,
      pid_pelanggan: id_pelanggan,
      pid_ukm: id_ukm,
      ptotal_bayar: total_bayar
    });
  }
}
