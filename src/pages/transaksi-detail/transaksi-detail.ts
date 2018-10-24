import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the TransaksiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-transaksi-detail',
  templateUrl: 'transaksi-detail.html',
})
export class TransaksiDetailPage {

  id_transaksi: any;
  timestamp: any;
  status: any;
  total_bayar: any;

  imgSrc: any;
  imgData: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    public alertCtrl: AlertController,
    public http: Http
  ) {
    this.id_transaksi = this.navParams.get('pid_transaksi');
    this.timestamp = this.navParams.get('ptimestamp');
    this.status = this.navParams.get('pstatus');
    this.total_bayar = this.navParams.get('ptotal_bayar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransaksiDetailPage');
  }

  takePhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgSrc = base64Image;
      this.imgData = imageData;
    }, (err) => {
      // Handle error
    });
  }

  uploadBuktiBayar(){
    var param = JSON.stringify({
      id_transaksi: this.id_transaksi,
      image: this.imgData
    });
 
    this.http.post('http://dagangkita.com/api/update_transaksi.php', param).map(res => res.json()).subscribe(
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
        title: 'Terimakasih!',
        subTitle: psn,
        buttons: [
            {
                text: 'Tutup',
                handler: () => {
                  this.navCtrl.pop();
                  this.navCtrl.push(HomePage);
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
