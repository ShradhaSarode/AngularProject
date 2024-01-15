import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { StudentListComponent } from './student-list/student-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HighlightDirective } from './highlight.directive';
import { MyMathPipe } from './my-math.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,EmployeelistComponent,StudentListComponent,
    EmployeeComponent,RegistrationComponent,LoginComponent,HighlightDirective,MyMathPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FirstAngularDemo';
  message:string="This is first angular application";
  city:string="pune";
  isDisable:boolean=true;

  displayMsg()
{
  let res=confirm('do you want to pay');
  if(res==true)
  {
    alert('payment done');
  }
  else{
    alert('payment cancle');
  }
}
info:string="Hi, From Parent";
childMsg:string='';
   readMessage(msg:string){
     this.childMsg=msg;
   }
   studinfo:string="Hi from student parent";

   childMsg1:string='';
   readMsg(msg1:string)
   {
    this.childMsg1=msg1;
   }

   isDisplay:boolean=true;

   color:string="red";

   applyColor()
   {
    let colors={
       'background-color':'blue',
       'color':'white',
       'font-size':'22px'
    };
    return colors;
   }

   message1:string='';
   isSuccess:boolean=false;
   isError:boolean=false;
   isWarning:boolean=false;

   Success()
   {
    this.isSuccess=true;
    this.isError=false;
    this.isWarning=false;
    this.message1 = 'Success Clicked!';

   }
   Error() {
    this.isError = true;
    this.isSuccess = false;
    this.isWarning = false;
    this.message1 = 'Danger Clicked!!';
}

Warning() {
    this.isWarning = true;
    this.isError = false;
    this.isSuccess = false;
    this.message1 = 'Warning Clicked!!';
}
text:string='Hello to All';
  currentDate=new Date();

}


