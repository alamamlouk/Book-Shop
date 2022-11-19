import { Component, OnInit } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { KidModel } from './kids.model';
import { FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {
  showAdd !: Boolean;
  showUpdate !:Boolean;
  formValue !:FormGroup;
  kidModelObj:KidModel=new KidModel();
  KidData !:any[];
  Data !:any[];
  user:any="";
  constructor(private formbuilder:FormBuilder,private api:ApiService) {
    
   }

 
   ngOnInit(): void {
    this.user=sessionStorage.getItem("name")
    this.formValue=this.formbuilder.group(
    {
      kidbookname:[''],
      Writer:[''],
      nb:[''],
      img:[''],
      qt:[''],
      price:[''],
      new:['']
    }
  )
  this.getAllKid();
  }
  verif(book:any):boolean{
    let x:boolean=false;
    if(book.book=='kids')
      {x=true;}
    return x;
  }
  clickAddKid(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postKidDetails()
  {
    this.kidModelObj.new=this.formValue.value.new;
    this.kidModelObj.kidbookname = this.formValue.value.kidbookname;
    this.kidModelObj.Writer = this.formValue.value.Writer;
    this.kidModelObj.price=this.formValue.value.price; 
    this.kidModelObj.nb = this.formValue.value.nb;
    this.kidModelObj.img = this.formValue.value.img;
    this.kidModelObj.qt = this.formValue.value.qt;
    this.api.postBook(this.kidModelObj).subscribe(res=>{
     console.log(res);
     alert("Kid's Book added Successfully")
     let ref =document.getElementById('cancel')
     ref?.click();
      this.formValue.reset();
      this.getAllKid();  
    },
    err=>{
      alert("Something went wrong")
    }
    )
  }
  viewKid(kid:any)
  {this.showAdd=false;
    this.showUpdate=true;
    this.formValue.controls['new'].setValue(kid.new);
    this.formValue.controls['kidbookname'].setValue(kid.kidbookname);
    this.formValue.controls['price'].setValue(kid.price);
    this.formValue.controls['Writer'].setValue(kid.Writer);
    this.formValue.controls['nb'].setValue(kid.nb);
    this.formValue.controls['img'].setValue(kid.img);
    this.formValue.controls['qt'].setValue(kid.qt);
  }
  getAllKid(){
    this.api.getBook().subscribe(res=>{
      this.Data=res;
      let j=0;
      this.KidData=[];
      for(let i=0;i<this.Data.length;i++)
      {
        if(this.Data[i].book=='kids')
        {
          this.KidData[j]=this.Data[i];
          j++; 
        }
      }
      
      
    })
  }
  deleteKid(kid:any)
   {
     this.api.deleteBook(kid.id)
     .subscribe(res=>{
       alert("kid's book delete");
       this.getAllKid();
     })
   }
   onEdit(kid:any)
   { this.showAdd=false;
     this.showUpdate=true;
     this.kidModelObj.id=kid.id; 
     this.formValue.controls['new'].setValue(kid.new);
     this.formValue.controls['kidbookname'].setValue(kid.kidbookname);
     this.formValue.controls['Writer'].setValue(kid.Writer);
     this.formValue.controls['nb'].setValue(kid.nb);
     this.formValue.controls['img'].setValue(kid.img);
     this.formValue.controls['qt'].setValue(kid.qt);
     this.formValue.controls['price'].setValue(kid.price);
   }
   updateKid()
   {this.kidModelObj.new=this.formValue.value.new;
    this.kidModelObj.kidbookname = this.formValue.value.kidbookname;
    this.kidModelObj.price=this.formValue.value.price;
    this.kidModelObj.Writer = this.formValue.value.Writer;
    this.kidModelObj.nb = this.formValue.value.nb;
    this.kidModelObj.img = this.formValue.value.img;
    this.kidModelObj.qt = this.formValue.value.qt;
    this.api.updateBook(this.kidModelObj,this.kidModelObj.id)
    .subscribe(res=>{
      alert("update done");
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllKid();
    })
  }

}
