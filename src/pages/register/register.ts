import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

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
    public http: Http,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  prosesRegistrasi(){
    var param = JSON.stringify({
      nama: this.nm_pel,
      email: this.eml_pel,
      password: this.pas_pel,
      alamat: this.almt_pel,
      nohp: this.nohp_pel
    });
 
    this.http.post('http://dagangkita.com/api/regis_pelanggan.php', param).map(res => res.json()).subscribe(
        data => {
          console.log(data);
          var id_pel = data.id_pelanggan;
          if(id_pel != null){
            //create session disini
            localStorage.setItem('key_id_pel', id_pel);
            this.navCtrl.push(HomePage);
          }else{
            var alert = this.alertCtrl.create({
              title: 'Failed',
              subTitle: 'Maaf, gagal melakukan registrasi',
              buttons: ['Tutup']
            });
            alert.present();
          }
        },
        err => {
            console.log("Oops!");
            var alert = this.alertCtrl.create({
              title: 'Failed',
              subTitle: 'Maaf, gagal melakukan registrasi',
              buttons: ['Tutup']
            });
            alert.present();
        }
    );
  }

}
