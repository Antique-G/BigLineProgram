
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { ChooseGalleryComponent } from './layouts/choose-gallery/choose-gallery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SpinnerComponent } from './shared/spinner.component';
import { Interceptor } from '../http-interceptors/interceptor';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    ChooseGalleryComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    NgxQRCodeModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },     //拦截器
    MenuItems,
    { provide: NZ_ICONS, useValue: icons } 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
