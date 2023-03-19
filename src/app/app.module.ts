import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { InMemoryDataService } from './services/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    /* Это перехватчик запросов по сети */
    /* В делэй передается задержка для ответа */
    /* В apiBase передается рутовый адрес */
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: '/', delay: 1000})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
