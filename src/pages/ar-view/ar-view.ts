/// <reference path="../../app/WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'page-ar-view',
  templateUrl: 'ar-view.html'
})
export class ARView {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('Hello ARView Page');
  }

  ionViewDidEnter() {

    var startupConfiguration: any = { "camera_position": "back" };

    WikitudePlugin.loadARchitectWorld(
      function (success) {
        console.log("ARchitect World loaded successfully.");
      },
      function (fail) {
        console.log("Failed to load ARchitect World!");
      },
      "www/assets/CabinFitment/index.html",  
      ["instant_tracking"],  

      <JSON>startupConfiguration
    );
  }

}
