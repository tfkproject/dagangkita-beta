import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  items: any;
  id_pel: any;
  nm_pel: any;
  eml_pel: any;
  pas_pel: any;
  almt_pel: any;
  nohp_pel: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http
  ) {
    let id_pel = navParams.get('pid_pel');
    this.ambilDataUser(id_pel);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ambilDataUser(id_pelanggan){
    this.http.get('http://dagangkita.com/api/data_pelanggan.php?id_pelanggan='+id_pelanggan).map(res => res.json()).subscribe(
        data => {
            this.items = data.field;
            this.items.forEach(element => {
              this.id_pel = element.id_pelanggan;
              this.nm_pel = element.nama_pelanggan;
              this.eml_pel = element.email_pelanggan;
              this.pas_pel = element.password_pelanggan;
              this.almt_pel = element.alamat_pelanggan;
              this.nohp_pel = element.no_hp_pelanggan;
            });
        },
        err => {
            console.log("Oops!");
        }
    );
  }

  prosesUpdate(){
    let alert = this.alertCtrl.create({
        title: 'Update data?',
        subTitle: 'Setelah ini anda diwajibkan untuk login ulang',
        buttons: [
            {
                text: 'Ya',
                handler: () => {
                    this.updateData();
                }
            }, {
                text: 'Tidak',
                handler: () => {
                    alert.dismiss(false);
                    return false;
                }
            }
        ]
    });
    alert.present();
  }

  updateData(){
    var param = JSON.stringify({
      id_pel: this.id_pel,
      nama: this.nm_pel,
      email: this.eml_pel,
      password: this.pas_pel,
      alamat: this.almt_pel,
      nohp: this.nohp_pel
    });
 
    this.http.post('http://dagangkita.com/api/update_data_pelanggan.php', param).map(res => res.json()).subscribe(
        data => {
            localStorage.clear();
            this.keHalUtama();
        },
        err => {
            console.log("Oops!");
        }
    );
  }

  prosesLogout(){
    let alert = this.alertCtrl.create({
        title: 'Logout',
        subTitle: 'Yakin ingin logout?',
        buttons: [
            {
                text: 'Ya',
                handler: () => {
                    localStorage.clear();
                    this.keHalUtama();
                }
            }, {
                text: 'Tidak',
                handler: () => {
                    alert.dismiss(false);
                    return false;
                }
            }
        ]
    });
    alert.present();
  }

  prosesHapusAkun(){
    let alert = this.alertCtrl.create({
        title: 'Hapus Akun?',
        subTitle: 'Jika anda menghapus akun, akun anda akan dihapus secara permanen dan anda diharuskan untuk mendaftar kembali agar dapat berinteraksi didalam aplikasi ini',
        buttons: [
            {
                text: 'Hapus',
                handler: () => {
                    this.hapusAkun(this.id_pel);
                }
            }, {
                text: 'Tidak',
                handler: () => {
                    alert.dismiss(false);
                    return false;
                }
            }
        ]
    });
    alert.present();
  }

  keHalUtama(){
    this.navCtrl.push(HomePage);
  }

  hapusAkun(id_pel){
    this.http.get('http://dagangkita.com/api/hapus_pelanggan.php?id_pelanggan='+id_pel).map(res => res.json()).subscribe(
        data => {
            localStorage.clear();
            this.keHalUtama();
        },
        err => {
            console.log("Oops!");
        }
    );
  }
}
