import { Component, OnInit } from '@angular/core';
import { Manga } from '../classes/manga';
import { Comicbook } from '../classes/comicbook';
import { Kids } from '../classes/kids';
import { ApiService } from '../shared/api.service';
import { MangaModel } from '../manga/manga.model';
import { FormGroup,FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [
    { path: '../assets/iconiccovers-blogroll-1525195679546_160w.jpg' ,alt:"manga"},
    { path: '../assets/manga-plus.png' },
    { path: '../assets/StackOverflow-KidsComics-1280x720.jpg' },
   
  ]; 
  id:string="";
  constructor(private formbuilder:FormBuilder,private api:ApiService, private authService: AuthService, private router :Router) {}
  Data !:any[];
  ngOnInit(): void {
    this.getAllManga();
  this.getAllKid();
this.getAllcomicBook();}
  formValue !:FormGroup;
  mangaData !:any;
  comicBookData !:any;
  kidsData !:any;
  mangaModelObj:MangaModel=new MangaModel();
  getAllManga(){
    this.api.getBook().subscribe(res=>{
      this.Data=res;
      let j=0;
      this.mangaData=[];
      for(let i=0;i<this.Data.length;i++)
      {
        if(this.Data[i].book=='manga' && this.Data[i].new =='new')
        {
          this.mangaData[j]=this.Data[i];
          j++;
          console.log(this.mangaData[j]); 
        }
      }
 
    })
  }
  getAllcomicBook(){
    this.api.getBook().subscribe(res=>{
      this.Data=res;
      let j=0;
      this.comicBookData=[];
      for(let i=0;i<this.Data.length;i++)
      {
        if(this.Data[i].book=='comicBook' && this.Data[i].new =='new')
        {
          this.comicBookData[j]=this.Data[i];
          j++;
              }
      }
 
    })
  }
  
  getAllKid(){
    this.api.getBook().subscribe(res=>{
      this.Data=res;
      let j=0;
      this.kidsData=[];
      for(let i=0;i<this.Data.length;i++)
      {
        if(this.Data[i].book=='kids' && this.Data[i].new =='new')
        {
          this.kidsData[j]=this.Data[i];
          j++; 
        }
      }
 
    })
  }
  
  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  } 

}
