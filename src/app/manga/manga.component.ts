import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MangaModel } from '../manga/manga.model';
import { FormGroup,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit {
  showAdd !: Boolean;
  showUpdate !:Boolean;
  formValue !:FormGroup;
  mangaModelObj:MangaModel=new MangaModel();
  mangaData !:any[];
  Data !:any[];
  user:any='';
  constructor(private http:HttpClient, private formbuilder:FormBuilder,private api:ApiService) {
    
   }

  ngOnInit(): void {
    this.user=sessionStorage.getItem("name"),
    this.formValue=this.formbuilder.group(
    { 
      
      manganame:[''],
      Writer:[''],
      nb:[''],
      img:[''],
      qt:[''],
      type:[''],
      price:[''],
      new:['']
      
    }
  )
  this.getAllManga();
  
  }
  

  clickAddManga(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postMangaDetails()
  { this.mangaModelObj.new=this.formValue.value.new;
    this.mangaModelObj.type=this.formValue.value.type;
    this.mangaModelObj.manganame = this.formValue.value.manganame;
    this.mangaModelObj.Writer = this.formValue.value.Writer;
    this.mangaModelObj.nb = this.formValue.value.nb;
    this.mangaModelObj.img = this.formValue.value.img;
    this.mangaModelObj.qt = this.formValue.value.qt;
    this.mangaModelObj.price=this.formValue.value.price;
    this.api.postBook(this.mangaModelObj).subscribe(res=>{
     console.log(res);
     alert("manga added Successfully")
     let ref =document.getElementById('cancel')
     ref?.click();
      this.formValue.reset();
      this.getAllManga();  
    },
    err=>{
      alert("Something went wrong")
    }
    )
  }
  viewManga(manga:any)
  { this.showAdd=false;
    this.showUpdate=true;
    
    this.formValue.controls['type'].setValue(manga.type);
    this.formValue.controls['price'].setValue(manga.price);
    this.formValue.controls['manganame'].setValue(manga.manganame);
    this.formValue.controls['Writer'].setValue(manga.Writer);
    this.formValue.controls['nb'].setValue(manga.nb);
    this.formValue.controls['img'].setValue(manga.img);
    this.formValue.controls['qt'].setValue(manga.qt);
  }
  getAllManga(){
    this.api.getBook().subscribe(res=>{
         this.Data=res;
         let j=0;
         this.mangaData=[];
         for(let i=0;i<this.Data.length;i++)
         {
           if(this.Data[i].book=='manga')
           {
             this.mangaData[j]=this.Data[i];
             j++;
             console.log(this.mangaData[j]); 
           }
         }
         
         console.log(this.mangaData);
         
    });
  }
  deleteManga(manga:any)
   {
     this.api.deleteBook(manga.id)
     .subscribe(res=>{
       alert("manga delete");
       this.getAllManga();
     })
   }
   onEdit(manga:any)
   { this.showAdd=false;
     this.showUpdate=true;
     this.mangaModelObj.id=manga.id;
     this.formValue.controls['new'].setValue(manga.new);
     this.formValue.controls['manganame'].setValue(manga.manganame);
     this.formValue.controls['Writer'].setValue(manga.Writer);
     this.formValue.controls['nb'].setValue(manga.nb);
     this.formValue.controls['img'].setValue(manga.img);
     this.formValue.controls['qt'].setValue(manga.qt);
     this.formValue.controls['tpye'].setValue(manga.tpye);
     this.formValue.controls['price'].setValue(manga.price);
   }
   updateManga()
   {this.mangaModelObj.price=this.formValue.value.price;
    this.mangaModelObj.new=this.formValue.value.new;
    this.mangaModelObj.type=this.formValue.value.type;
    this.mangaModelObj.manganame = this.formValue.value.manganame;
    this.mangaModelObj.Writer = this.formValue.value.Writer;
    this.mangaModelObj.nb = this.formValue.value.nb;
    this.mangaModelObj.img = this.formValue.value.img;
    this.mangaModelObj.qt = this.formValue.value.qt;
    this.api.updateBook(this.mangaModelObj,this.mangaModelObj.id)
    .subscribe(res=>{
      alert("update done");
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllManga();
    })
  }
}
