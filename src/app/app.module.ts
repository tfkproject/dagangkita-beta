import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//bawaan
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//page
import { UmkmPage } from '../pages/umkm/umkm';
import { HomePage, PopoverItem, PopoverSubKategori } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RuteMapPage } from '../pages/rute-map/rute-map'
import { PencarianPage } from '../pages/pencarian/pencarian';
import { DetailProdukPage } from '../pages/detail-produk/detail-produk';
import { DetailUmkmPage } from '../pages/detail-umkm/detail-umkm';
import { TentangPage } from '../pages/tentang/tentang';
//http
import { HttpModule } from '@angular/http';
//telepon
import { CallNumber } from '@ionic-native/call-number';
//GPS
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
//location
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { ProdukPage } from '../pages/produk/produk';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { OrderPage } from '../pages/order/order';
import { KeranjangPage } from '../pages/keranjang/keranjang';
import { TransaksiPage } from '../pages/transaksi/transaksi';
import { PembayaranPage } from '../pages/pembayaran/pembayaran';
import { TransaksiDetailPage } from '../pages/transaksi-detail/transaksi-detail';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    UmkmPage,
    HomePage,
    TabsPage,
    RuteMapPage,
    PencarianPage,
    DetailUmkmPage,
    DetailProdukPage,
    PopoverItem,
    PopoverSubKategori,
    TentangPage,
    ProdukPage,
    LoginPage,
    RegisterPage,
    UserPage,
    OrderPage,
    KeranjangPage,
    TransaksiPage,
    PembayaranPage,
    TransaksiDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UmkmPage,
    HomePage,
    TabsPage,
    RuteMapPage,
    PencarianPage,
    DetailUmkmPage,
    DetailProdukPage,
    PopoverItem,
    PopoverSubKategori,
    TentangPage,
    ProdukPage,
    LoginPage,
    RegisterPage,
    UserPage,
    OrderPage,
    KeranjangPage,
    TransaksiPage,
    PembayaranPage,
    TransaksiDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    LocationTrackerProvider,
    BackgroundGeolocation,
    Camera
  ]
})
export class AppModule {}
