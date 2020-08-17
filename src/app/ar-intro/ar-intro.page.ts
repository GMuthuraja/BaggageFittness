import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ar-intro',
  templateUrl: './ar-intro.page.html',
  styleUrls: ['./ar-intro.page.scss'],
})
export class ArIntroPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  gotoArView(){
    this.navController.navigateForward('arview');
  }

}
