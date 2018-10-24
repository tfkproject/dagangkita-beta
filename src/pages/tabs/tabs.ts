import { Component } from '@angular/core';
import { UmkmPage } from '../umkm/umkm';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UmkmPage;

  constructor() {

  }
}
