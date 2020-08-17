/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { Platform } from ‘@ionic/angular’;
//import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TabsPage } from '../pages/tabs/tabs';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.html'
// })
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class MyApp {
  // rootPage: any = TabsPage;



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    console.log("test");
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      
      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */
      WikitudePlugin._sdkKey = "3V/15cON/JWhEA46T79ANHxui9x5sTbe96BG3yQ+m8NRS28oWPXQ++UVN107gmy9+gm1YKWpxT8yhLGJACygnpfWP0Kac+o5Cd2rlOoyx4HiDPpcfa8aotD6+nC+Jm6H6BKeH4MZKQlX5D34cIt8S63EpXnUiUC5stpN5tiYdltTYWx0ZWRfXy4+VtsUhFVJDlo5eDpzgkjhGYrsP9zw0fok6NwAlTCMBROPHYXRHTZKQzmolZOKMpIA/71ThOWM1Dy8ek1NNM/9YwMpgeBN3GM1L6R/7DAZg+6age/7Rs6ns3WveFiwM/MzNyt9EyHd/eKjuJXwQvu/Qi7goJii5yuPlKnePQvGQpVD1aPjO3Ho74/6Z83a2JRZ8SFWA90xPpBp6Nw2QdEumrbwiUtmmjjDlCK7Z/JzmQKH8H9XOGnvU+gWz4msd8xnq2rdGrEI8Ss1RWi4hzPe8ZxA9VriT5Fx/a14CjioeJHMqX3tM66KBJ81OBip/gEyofSxRWFDcvugmuMfSECYx7ZjXMibLANLLgFCfYsonfxbH2llbdXFWyvW36s34m0NoM+Le+A/+JXexxRbG98MZG5KluT9zSbA2pQ72HFqzfAm0efRRdGoBq2eJvMaAyOG1zLGmug/ZaR6HUPFPhPJuZHtsi3HQWTBT0oO0GM1pMmCmsZKRQAtQxHVxYyHWNFyZunAUJRVhkdlpXVCIMv1s98O9i5U6B7f7HDYB8cOAuiMHav1UNkZFchVp1B8BXUDgw9aa8lwZ4MCt5ohKq0pg077mN7de+avXW3IIhB1NrYinhzQwAgpQkmgiCR8Ub5YfGBJ2IETij8ouhxxBpH3LrG/sQFHz8tYNYbBlcqKHHhpsvZGiEY=";
      console.log("WikitudePlugin",WikitudePlugin);
      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
        function (success) {
          console.log("Your platform supports AR/Wikitude. Have fun developing!!");
        },
        function (fail) {
          console.log("Your platform failed to run AR/Wikitude: " + fail);
        },
        [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic app see the captureScreen example in 
       * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function (url) {

        console.log("setOnUrlInvokeCallback ...");

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
          WikitudePlugin.captureScreen(
            (absoluteFilePath) => {
              console.log("snapshot stored at:\n" + absoluteFilePath);

              // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
              WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath + "');");
            },
            (errorMessage) => {
              console.log(errorMessage);
            },
            true, null
          );
        } else {
          alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function () {
        console.log("Things went ok.");
      }

      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function () {
        console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
