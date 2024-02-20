import { Injectable } from '@angular/core';
import { Marks } from './marksDTO';

@Injectable({
  providedIn: 'root'
})
export class MarksService {
  marksList:Marks[]=[];
  private id:number=101;
  getAllMarks(): Marks[] {
    return this.marksList;
  }
  addMarks(marks: Marks) {
    throw new Error('Method not implemented.');
  }
  

  constructor() { }
}
