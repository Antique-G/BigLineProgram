import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';
import { AdminSetNewPasswordComponent } from './admin-forgot-password/admin-set-new-password/admin-set-new-password.component';
import { AdminSetPassswordSuccessComponent } from './admin-forgot-password/admin-set-passsword-success/admin-set-passsword-success.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },

        ]
    },
    {
        path: 'forgotPassword',
        component: AdminForgotPasswordComponent
    },
    {
        path: 'forgotPassword/setNew',
        component: AdminSetNewPasswordComponent
    },
    {
        path: 'newPasswordSuccess',
        component: AdminSetPassswordSuccessComponent
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
