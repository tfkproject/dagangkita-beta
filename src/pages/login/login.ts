import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: any;
  password: any;
  items: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  keHalRegister(){
    this.navCtrl.push(RegisterPage);
  }

  prosesLogin(){
    var param = JSON.stringify({
      email: this.email,
      password: this.password
    });
 
    this.http.post('http://dagangkita.com/api/login_pelanggan.php', param).map(res => res.json()).subscribe(
        data => {
            this.items = data.field;
            try {
              this.items.forEach(element => {
                var id_pel = element.id_pelanggan;
                if(this.items != null){
                  //create session disini
                  localStorage.setItem('key_id_pel', id_pel);
                  this.navCtrl.push(HomePage);
                }
              });
            } catch (error) {
              var alert = this.alertCtrl.create({
                title: 'Failed',
                subTitle: 'Maaf, login anda salah',
                buttons: ['Tutup']
              });
              alert.present();
            }
        },
        err => {
            console.log("Oops!");
        }
    );
  }


}
