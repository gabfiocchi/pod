import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'contact-profile/:username',
    loadChildren: () => import('./pages/contact-profile/contact-profile.module').then(m => m.ContactProfilePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'active-pod',
    loadChildren: () => import('./pages/active-pod/active-pod.module').then(m => m.ActivePodPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'scan-pod',
    loadChildren: () => import('./pages/active-pod/active-pod.module').then(m => m.ActivePodPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'verification-account',
    loadChildren: () => import('./pages/verification-account/verification-account.module').then(m => m.VerificationAccountPageModule),
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
