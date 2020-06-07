import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
// import { MobileLandingComponent } from './components/mobile-landing/mobile-landing.component';

@Injectable()
export class DesktopGuard implements CanActivate {
  constructor() { }
  canActivate(): boolean {
    const isDesktop = window.innerWidth > 768;
    return isDesktop;
  }
}

@Injectable()
export class MobileGuard implements CanActivate {
  constructor() { }
  canActivate(): boolean {
    const isMobile = window.innerWidth <= 768;
    return isMobile;
  }
}

const routes: Routes = [

  //desktop routes
  { path: '', component: HomePageComponent, canActivate: [DesktopGuard] },
  // { path: 'inn-team', component: TeamComponent, canActivate: [DesktopGuard] },
  // { path: 'privacy', component: PrivacyPolicyComponent },

  //mobile routes
  // {
  //   path: 'mobile', component: MobileLandingComponent, canActivate: [MobileGuard],
  // },
  // {
  //   path: 'mobile/privacy', redirectTo: 'privacy',
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [DesktopGuard, MobileGuard]
})
export class AppRoutingModule { }