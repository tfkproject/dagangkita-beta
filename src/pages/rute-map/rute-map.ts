import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams/*, Platform */} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { Geolocation } from '@ionic-native/geolocation';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

declare var google;
/**
 * Generated class for the RuteMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rute-map', 
  templateUrl: 'rute-map.html',
})
export class RuteMapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start: any;
  end: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  distanceService = new google.maps.DistanceMatrixService;

  latitude: number;
  longitude: number;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    //private platform: Platform,
    //private geolocation: Geolocation,
    public locationTracker: LocationTrackerProvider
  ) {
    if(this.locationTracker.lat == 0 || this.locationTracker.lng == 0){
      window.alert('Gagal melakukan render tujuan! Lokasi anda tidak ditemukan. Mohon periksa konektivitas GPS anda');
    }

    let lokasiku = new google.maps.LatLng(this.locationTracker.lat, this.locationTracker.lng);
    //let lokasiku = new google.maps.LatLng(1.458990, 102.150112);
    this.start = lokasiku;

    let tujuanku = new google.maps.LatLng(navParams.get('plat'),navParams.get('plon'));
    //let tujuanku = new google.maps.LatLng(1.462379, 102.135992);
    this.end = tujuanku;

  }

  ionViewDidLoad() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: this.locationTracker.lat, lng: this.locationTracker.lng}
    });

    this.directionsDisplay.setMap(this.map);

    this.calculateAndDisplayRoute();
  }

  /*startTrack(){
    this.locationTracker.startTracking();
  }*/
 
  /*stopTrack(){
    this.locationTracker.stopTracking();
  }*/

  calculateAndDisplayRoute() {
    this.directionsService.route({
        origin: this.start,
        destination: this.end,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          this.getDistance();
        }/* else {
          window.alert('Gagal melakukan render tujuan! Failed: ' + status);
        }*/
      });
  }

  getDistance(){
    this.distanceService.getDistanceMatrix({
      origins: [this.start],
      destinations: [this.end],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.MATRIC,
      avoidHighways: false,
      avoidTolls: false
    }, (response, status) => {
        if (status === 'OK') {
          let toast = this.toastCtrl.create({
            message: "Jarak: "+response.rows[0].elements[0].distance.text+", dengan estimasi waktu: "+response.rows[0].elements[0].duration.text,
            showCloseButton: true,
            closeButtonText: 'Tutup'
          });
          toast.present();
        } else {
          window.alert('Gagal melakukan render tujuan! Failed: ' + status);
        }
    });
  }
}
