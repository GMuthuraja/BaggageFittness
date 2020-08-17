import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArIntroPageRoutingModule } from './ar-intro-routing.module';

import { ArIntroPage } from './ar-intro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArIntroPageRoutingModule
  ],
  declarations: [ArIntroPage]
})
export class ArIntroPageModule {}
