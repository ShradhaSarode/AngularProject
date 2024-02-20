import { Component, OnInit, inject } from '@angular/core';
import { BookService } from './book.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterOutlet],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class Book implements OnInit {
  bookService:BookService=inject(BookService);
  bookList:any=[];
  authorList:any=[];
  bookForm!:FormGroup;
  isUpdatebtn!:boolean;
 
  constructor(private fb:FormBuilder){}
  
  
  ngOnInit(): void {
    this.getAuthors();
      this.getBooks();
     

      this.bookForm=this.fb.group({
         id:[,Validators.required],
         name:['',Validators.required],
         price:[,Validators.required],
         authorid:[,Validators.required]
      });
  
  
      this.isUpdatebtn=false;
  }
  
  
  get id(){
    return this.bookForm.get('id');
  }
  get name(){
    return this.bookForm.get('name');
  }
  get price(){
    return this.bookForm.get('price');
  }
  get authorid()
  {
    return this.bookForm.get('authorid');
  }
  getBooks(){
    this.bookService.getBooks().subscribe(result=>{
    
      this.bookList=result;
      for(let i=0;i<this.bookList.length;i++)
      {
        for(let j=0;j<this.authorList.length;j++)
        {
          if(this.bookList[i].authorid==this.authorList[j].authorid)
          {
            this.bookList[i].authorname=this.authorList[j].authorname;
          }
        }
      }
      console.log(this.bookList);
    })
  }
  
  getAuthors(){
    this.bookService.getAuthors().subscribe(result=>{
      this.authorList=result;
      console.log(this.authorList);
    })
  }
  
  // save & update product
  saveBook(){
    let book=this.bookForm.value;
    if(!this.isUpdatebtn){
      this.bookService.saveBooks(book).subscribe(result=>{
      });
    }
    else{
      let id= parseInt(this.bookForm.value.id);
      this.bookService.updateBook(id,book).subscribe(result=>{
      });
    }
    this.getBooks();
    this.bookForm.reset();
    this.isUpdatebtn=false;
  }
  
  
  editBook(book:any){
    this.isUpdatebtn=true;
  
  
    this.bookForm.setValue({
      id:book.id,
      name:book.name,
      price:book.price,
      authorid:book.authorid
    });
  }
  deleteBook(id:any){
    let response=confirm('Do you want to delete '+id +' ?');
    if(response==true){
      this.bookService.deleteBook(id).subscribe(result=>{
        this.getBooks();
      })
    }
  }
  

}
