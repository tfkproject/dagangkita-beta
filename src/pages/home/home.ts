import { Component } from '@angular/core';
import { NavController, Platform, ViewController } from 'ionic-angular';
import { PopoverController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailUmkmPage } from '../detail-umkm/detail-umkm';
import { PencarianPage } from '../pencarian/pencarian';
import { DetailProdukPage } from '../detail-produk/detail-produk';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { TentangPage } from '../tentang/tentang';
import { MenuController } from 'ionic-angular';
import { ProdukPage } from '../produk/produk';
import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';
import { KeranjangPage } from '../keranjang/keranjang';
import { TransaksiPage } from '../transaksi/transaksi';


//popup menu
@Component({
    template: `
    <ion-list class="popover-page">
        <ion-item (click)="cekLogin()">
        <ion-label>Akun Saya</ion-label>
        </ion-item>
        <ion-item (click)="tentangApp()">
        <ion-label>Tentang Aplikasi</ion-label>
        </ion-item>
        <ion-item (click)="keluarApp()">
        <ion-label>Keluar</ion-label>
        </ion-item>
    </ion-list>
    `
  })
  export class PopoverItem {
    contentEle: any;
  
    constructor(
        private platform : Platform,
        private navParams: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public popoverCtrl: PopoverController) {
  
    }
  
    ngOnInit() {
      if (this.navParams.data) {
        this.contentEle = this.navParams.data.contentEle;  
      }
    }

    tentangApp() {
        this.navCtrl.push(TentangPage);
        this.viewCtrl.dismiss();
    }
  
    keluarApp(){
        this.platform.exitApp();
    }

    keHalLogin(){
        this.navCtrl.push(LoginPage);
    }

    keHalUser(id_pelanggan){
        this.navCtrl.push(UserPage, {
            pid_pel: id_pelanggan
        });
    }

    cekLogin(){
        if(localStorage.getItem('key_id_pel') != null){
            var id_pelanggan = localStorage.getItem('key_id_pel');
            //masuk ke biodata user
            this.keHalUser(id_pelanggan);
        }else{
            //masuk ke form login
            this.keHalLogin();
        }
    }
}

//popup subkategori
@Component({
    template: `
    <ion-list class="popover-page">
        <ion-item *ngFor="let item of items_subkat" (click)="bukaProduk(
            item.ID_Sub_Jenis,
            item.Sub_Jenis
        )">
        <ion-label>{{item.Sub_Jenis}}</ion-label>
        </ion-item>
    </ion-list>
    `
  })
  export class PopoverSubKategori {
    contentEle: any;
    items_subkat: any;
    items_produk: any;
  
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: Http
    ) {
        let id_jenis = this.navParams.get('pid_jenis');
        this.ambilSubKategori(id_jenis);

    }
  
    ngOnInit() {
      if (this.navParams.data) {
        this.contentEle = this.navParams.data.contentEle;  
      }
    }
  
    ambilSubKategori(id_jenis){
        this.http.get('http://dagangkita.com/api/subkat.php?id_jenis='+id_jenis).map(res => res.json()).subscribe(
            data => {
                this.items_subkat = data.field;
            },
            err => {
                console.log("Oops!");
            }
        );
    }

    bukaProduk(
        id_sub_jenis,
        sub_jenis
    ){
        this.navCtrl.push(ProdukPage, {
            pid_sub_jenis: id_sub_jenis,
            psub_jenis: sub_jenis
        });
      }
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  items_slider: any;
  items_ukm: any;
  items_produk: any;
  items_spnsr: any;
  items_kat: any;

  constructor(
      public navCtrl: NavController,
      public platform : Platform,
      public http: Http,
      public locationTracker: LocationTrackerProvider,
      public popoverCtrl: PopoverController,
      public menuCtrl: MenuController
    ) {
    
        this.menuCtrl.enable(true);
        this.ambilSlider();
        this.ambilUkmUnggulan();
        this.ambilProdukUnggulan();
        this.ambilSponsor();
        this.ambilKategori();
  }

  ionViewDidLoad() {
    this.locationTracker.startTracking();
  }

  ambilSlider(){
    this.http.get('http://dagangkita.com/api/slider.php').map(res => res.json()).subscribe(
        data => {
            this.items_slider = data.field;
        },
        err => {
            console.log("Oops!");
        }
    );
  }

  ambilUkmUnggulan(){
      this.http.get('http://dagangkita.com/api/umkm_unggulan.php').map(res => res.json()).subscribe(
        data => {
            this.items_ukm = data.field;
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

  ambilProdukUnggulan(){
        this.http.get('http://dagangkita.com/api/produk_unggulan.php').map(res => res.json()).subscribe(
        data => {
            this.items_produk = data.field;
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

    ambilSponsor(){
        this.http.get('http://dagangkita.com/api/sponsor.php').map(res => res.json()).subscribe(
        data => {
            this.items_spnsr = data.field;
            /*this.field.forEach(element => {
                var id_ukm = element.ID_Partn;
                console.log(id_ukm);
            });*/
        },
        err => {
            console.log("Oops!");
        }
        );

        
    }

    ambilKategori(){
        this.http.get('http://dagangkita.com/api/kategori.php').map(res => res.json()).subscribe(
        data => {
            this.items_kat = data.field;
            /*this.field.forEach(element => {
                var id_ukm = element.ID_Partn;
                console.log(id_ukm);
            });*/
        },
        err => {
            console.log("Oops!");
        }
        );

        
    }

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

      keHalDetailPdk(
        id_produks,
        Nama_Produk, 
        Nama_UKM, 
        No_HP, 
        Harga1,
        Harga2,
        Stok,
        Gambar_1, 
        Gambar_2, 
        Gambar_3, 
        Gambar_4, 
        Bahan_Produk,
        Alamat_UKM,
        lat,
        lon,
        link_share
    ){
        this.navCtrl.push(DetailProdukPage, {
            pid_produks: id_produks,
            pnama_pdk: Nama_Produk,
            pnama_ukm: Nama_UKM, 
            pno_hp: No_HP, 
            pharga1: Harga1,
            pharga2: Harga2,
            pstok: Stok,
            pgambar1: Gambar_1, 
            pgambar2: Gambar_2, 
            pgambar3: Gambar_3, 
            pgambar4: Gambar_4, 
            pbahan_produk: Bahan_Produk,
            plamat_ukm: Alamat_UKM,
            plat: lat,
            plon: lon,
            pshare: link_share
        });
      }
  
    keHalLogin(){
        this.navCtrl.push(LoginPage);
    }

    keHalPencarian(){
        this.navCtrl.push(PencarianPage);
    }

    presentPopover() {
        let popover = this.popoverCtrl.create(PopoverItem);
        popover.present();
    }  
    
    bukaSubkategori(id_jenis){
        let popover = this.popoverCtrl.create(PopoverSubKategori, {pid_jenis: id_jenis});
        popover.present();
    }

    keHalKeranjang(){
        this.navCtrl.push(KeranjangPage);
    }

    keHalTransaksi(){
        this.navCtrl.push(TransaksiPage);
    }

    cekKeranjang(){
        if(localStorage.getItem('key_id_pel') != null){
          this.keHalKeranjang();
        }else{
            //masuk ke form login
            this.keHalLogin();
        }
    }

    cekTransaksi(){
        if(localStorage.getItem('key_id_pel') != null){
          this.keHalTransaksi();
        }else{
            //masuk ke form login
            this.keHalLogin();
        }
    }
}
