import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ARView } from './ar-view';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    {
      path: '',
      component: ARView,
    }
  ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ARView]
})
export class ARViewModule {}
