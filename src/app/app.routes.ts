import { Routes } from '@angular/router';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';

export const routes: Routes = [
    {
        path: "",
        component:LogInPageComponent
    },
    {
        path:"sing-up",
        component:SignInPageComponent
    },
    {
        path:"home",
        component:HomePageComponent
    }
];
