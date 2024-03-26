import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServicesExpenseService } from '../../services/services-expense.service';
import { IExpense } from '../../models/iExpense';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {

  expenses:IExpense[]=[];

  constructor(private expenseServise : ServicesExpenseService , private router :Router){}
  ngOnInit(): void {
    this.getAllExpenses();
  }
  getAllExpenses(){
    this.expenseServise.getAllExpenses().snapshotChanges().subscribe({
      next :(data)=>{
        this.expenses=[];

        data.forEach((item)=>{
          let expense = item.payload.toJSON() as IExpense;

          this.expenses.push({
            key:item.key || "",
            name:expense.name,
            price:expense.price,
            description:expense.description
          })
        })
      }
    })
  }

  editExpense(key:string){
    this.router.navigate(['/expense-form/'+key])
  }

  removeExpense(key:string){
    if(window.confirm("Are You Sure To Delet ?")){
      this.expenseServise.deleteExpense(key);
    }
    
  }
}
