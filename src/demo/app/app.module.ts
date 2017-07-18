import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgxSlackModule } from 'ngx-slack';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    NgxSlackModule.initializeApp('https://hooks.slack.com/services/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'),
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
