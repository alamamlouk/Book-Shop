import { Component,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MangaComponent } from './manga/manga.component';
import { ComicbookComponent } from './comicbook/comicbook.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { KidsComponent } from './kids/kids.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FooterComponent } from './footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard'; 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MangaComponent,
    ComicbookComponent,
    LoginComponent,
    SingupComponent,
    KidsComponent,
    FooterComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
