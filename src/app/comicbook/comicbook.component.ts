import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { ComicbookModel } from './comicbook.model';
import { FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-comicbook',
  templateUrl: './comicbook.component.html',
  styleUrls: ['./comicbook.component.css']
})
export class ComicbookComponent implements OnInit {
  showAdd !: Boolean;
  showUpdate !:Boolean;
  formValue !:FormGroup;
  comicModelObj:ComicbookModel=new ComicbookModel();
  comicData !:any[];
  Data !:any[];
  user:any="";
  constructor(private formbuilder:FormBuilder,private api:ApiService) {
    
   }

  ngOnInit(): void {
    this.user=sessionStorage.getItem("name")
    this.formValue=this.formbuilder.group(
    {
      comicBookname:[''],
      Writer:[''],
      nb:[''],
      img:[''],
      qt:[''],
      newz:[''],
      unviverse:[''],
    }
  )
  this.getAllcomicBook();
  }
  verif(book:any):boolean{
    let x:boolean=false;
    if(book.book=='comicBook')
      {x=true;}
    return x;
  }
  clickAddcomicBook(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postcomicBookDetails()
  {
    this.comicModelObj.comicBookname = this.formValue.value.comicBookname;
    this.comicModelObj.Writer = this.formValue.value.Writer;
    this.comicModelObj.nb = this.formValue.value.nb;
    this.comicModelObj.img = this.formValue.value.img;
    this.comicModelObj.qt = this.formValue.value.qt;
    this.api.postBook(this.comicModelObj).subscribe(res=>{
     console.log(res);
     alert("comicBook added Successfully")
     let ref =document.getElementById('cancel')
     ref?.click();
      this.formValue.reset();
      this.getAllcomicBook();  
    },
    err=>{
      alert("Something went wrong")
    }
    )
  }
  viewcomicBook(comic:any)
  {this.showAdd=false;
    this.showUpdate=true;
    this.formValue.controls['comicBookname'].setValue(comic.comicBookname);
    this.formValue.controls['Writer'].setValue(comic.Writer);
    this.formValue.controls['nb'].setValue(comic.nb);
    this.formValue.controls['img'].setValue(comic.img);
    this.formValue.controls['qt'].setValue(comic.qt);
    this.formValue.controls['new'].setValue(comic.new);
    this.formValue.controls['unviverse'].setValue(comic.unviverse);
  }
  getAllcomicBook()
  {
    this.api.getBook().subscribe(res=>{
      this.Data=res;
      let j=0;
      this.comicData=[];
      for(let i=0;i<this.Data.length;i++)
      {
        if(this.Data[i].book=='comicBook')
        {
          this.comicData[j]=this.Data[i];
          j++;
          console.log(this.comicData[j]); 
        }
      }
      
      console.log(this.comicData);
      
       
    }
    )
  }
  deletecomicBook(comic:any)
   {
     this.api.deleteBook(comic.id)
     .subscribe(res=>{
       alert("comicBook delete");
       this.getAllcomicBook();
     })
   }
   onEdit(comic:any)
   { this.showAdd=false;
     this.showUpdate=true;
     this.comicModelObj.id=comic.id; 
     this.formValue.controls['comicBookname'].setValue(comic.comicBookname);
     this.formValue.controls['Writer'].setValue(comic.Writer);
     this.formValue.controls['nb'].setValue(comic.nb);
     this.formValue.controls['img'].setValue(comic.img);
     this.formValue.controls['qt'].setValue(comic.qt);
     this.formValue.controls['new'].setValue(comic.new);
   }
   updatecomicBook()
   {
    this.comicModelObj.comicBookname = this.formValue.value.comicBookname;
    this.comicModelObj.Writer = this.formValue.value.Writer;
    this.comicModelObj.nb = this.formValue.value.nb;
    this.comicModelObj.img = this.formValue.value.img;
    this.comicModelObj.qt = this.formValue.value.qt;
    this.api.updateBook(this.comicModelObj,this.comicModelObj.id)
    .subscribe(res=>{
      alert("update done");
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllcomicBook();
    })
  }
}
