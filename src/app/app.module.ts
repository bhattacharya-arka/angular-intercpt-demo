import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AcInterceptor } from './interceptors/ac.interceptor';
import { DcInterceptor } from './interceptors/dc.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    // Register both interceptors with multi: true
    { provide: HTTP_INTERCEPTORS, useClass: AcInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: DcInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
