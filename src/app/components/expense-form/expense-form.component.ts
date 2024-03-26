import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesExpenseService } from '../../services/services-expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IExpense } from '../../models/iExpense';


@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {

  expressForm! :FormGroup;
  expenseId ='';
 
  constructor(
    private fb:FormBuilder ,
    private expenseService:ServicesExpenseService ,
    private router :Router,
    private activatedRoute :ActivatedRoute
    ){
    this.expressForm= this.fb.group({
      name:new FormControl("",[Validators.required]),
      price:new FormControl("",[Validators.required]),
      description:new FormControl(""),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next:(params)=>{
        this.expenseId = params['id'];
      }
    })
  }

  onSubmit(){
    if(this.expressForm.valid){
      if(this.expenseId != '' ){
        this.expenseService.updateExpense(this.expenseId,this.expressForm.value);
      }else{
        this.expenseService.addExpense(this.expressForm.value);
      }
      this.router.navigate(['/']);
    }else {
      this.expressForm.markAllAsTouched();
    }
  }

  getExpense(key:string){
    this.expenseService.getExpense(key).snapshotChanges().subscribe({
      next:(data)=>{
        let expense = data.payload.toJSON() as IExpense
        this.expressForm.setValue(expense)
      }
    })
  }
}
