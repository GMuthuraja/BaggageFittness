import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'arview', 
  loadChildren: () => import('../pages/ar-view/ar-view.module').then(m => m.ARViewModule) },
  {
    path: 'ar-intro',
    loadChildren: () => import('./ar-intro/ar-intro.module').then( m => m.ArIntroPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
