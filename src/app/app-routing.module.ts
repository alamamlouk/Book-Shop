import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { MangaComponent } from './manga/manga.component';
import { ComicbookComponent } from './comicbook/comicbook.component';
import { KidsComponent } from './kids/kids.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'manga',component:MangaComponent,canActivate : [AuthGuard]},
  {path:'home',component:HomeComponent},
  {path:'kids',component:KidsComponent},
  {path:'comicbook',component:ComicbookComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SingupComponent},
  {path:'footer',component:FooterComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
