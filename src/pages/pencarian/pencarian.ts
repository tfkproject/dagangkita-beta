import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailUmkmPage } from '../detail-umkm/detail-umkm';

declare var google; 
var markers =  [];
var marker;
var infowindow;
var contentString;

var id_ukm;
var judul;
var alamat;
var link_gambar;
var deskripsi;
var nm_pemilik;
var hp;
var email;
var latitude;
var longitude;

/**
 * Generated class for the PencarianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pencarian',
  templateUrl: 'pencarian.html',
})

export class PencarianPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  items: any;
  keyword: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    public toastCtrl: ToastController
  ) {
    this.navCtrl = navCtrl;
    
  }

  ionViewDidLoad() {
    this.displayGoogleMap();
    
    console.log('ionViewDidLoad PencarianPage');
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(1.4754998, 102.1146862);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  getItems(ev) {
    // set val to the value of the ev target
    this.keyword = ev.target.value;

    // if the value is an empty string don't filter the items
    if (this.keyword && this.keyword.trim() != '') {      
      return this.keyword;
    }
  }

  showMarker(){
    this.http.get('http://dagangkita.com/api/pencarian_produk.php?q='+this.keyword)
        .map(res => res.json())
        .subscribe(
          data => {
            this.items = data.field;
            console.log("Data: "+this.items);

            /*for(let marker of this.items) {
              var position = new google.maps.LatLng(marker.latitude, marker.longitude);
              var dogwalkMarker = new google.maps.Marker({position: position, title: marker.nm_ukm});
              dogwalkMarker.setMap(this.map);
              console.log("lat: "+marker.latitude+"Long: "+marker.longitude);
            }*/
            
            this.items.forEach(element => {
              id_ukm = element.ID_Pemilik;
              judul = element.Nama_UKM;
              alamat = element.Alamat_UKM;
              link_gambar = element.Logo_UKM;
              deskripsi = element.Deskripsi_UKM;
              nm_pemilik = element.Nama_Pemilik;
              hp = element.No_HP;
              email = element.Email_UKM;
              latitude = element.lat;
              longitude = element.lon;

              var position = new google.maps.LatLng(latitude, longitude);

              contentString = '<div id="tombol">'+
                                    '<center>'+
                                      '<p><b>'+judul+'</b></p>'+
                                      '<p>'+alamat+'</p>'+
                                      '<img src="'+link_gambar+'" width="80px">'+
                                    '</center>'+
                                  '</div>';

              infowindow = new google.maps.InfoWindow({
                content: contentString
              });

              marker = new google.maps.Marker({
                position: position, 
                title: judul
              });

              marker.addListener('click', function() {
                infowindow.open(this.map, marker);
              });
              
              marker.setMap(this.map);
              console.log("lat: "+latitude+"Long: "+longitude);

            }, err => {
              /*let toast = this.toastCtrl.create({
                message: "Tidak ada data ditemukan",
                showCloseButton: true,
                closeButtonText: 'Tutup'
              });
              toast.present();*/
              // ^ ntah ngp belum mau baca 
            });

            markers.push(marker);
            
            google.maps.event.addListener(infowindow, 'domready', () => {
              //now my elements are ready for dom manipulation
              var myButton = document.getElementById('tombol');
              myButton.addEventListener('click', () => {
                this.keHalDetailUKM(
                  id_ukm, 
                  judul, 
                  nm_pemilik, 
                  alamat, 
                  hp, 
                  email, 
                  link_gambar, 
                  deskripsi, 
                  latitude, 
                  longitude);
              });
            });
            
          },
          err => {
              console.log("Oops!");
          });
  }

  clearMarker(){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  /*keHalRuteMap() {
    this.navCtrl.push(RuteMapPage, {
      plat: 1.540808,
      plon: 102.036509,
    });
  }*/

  keHalDetailUKM(
    id_pemilik, 
    nama_ukm,
    nama_pemilik, 
    alamat_ukm, 
    no_hp, 
    email,
    logo_ukm,
    deskripsi, 
    lat, 
    lon){
    this.navCtrl.push(DetailUmkmPage, {
        pid: id_pemilik, 
        pnama_ukm: nama_ukm,
        pnama_pemilik: nama_pemilik, 
        palamat: alamat_ukm, 
        pno_hp: no_hp, 
        pemail: email,
        plogo: logo_ukm,
        pdeskripsi: deskripsi,
        plat: lat,
        plon: lon
    });
  }

}
