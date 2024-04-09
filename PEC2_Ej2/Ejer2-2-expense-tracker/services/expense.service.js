
/**
 * @class Service
 *
 * Manages the data of the application.
 */
class ExpenseService {
    constructor() {
      this.expenses = (JSON.parse(localStorage.getItem("expenses")) || []).map(
        expense => new expense(expense)
      );
    }
  
    bindExpenseListChanged(callback) {
      this.onExpenseListChanged = callback;
    }
  
    _commit(expenses) {
      this.onExpenseListChanged(expenses);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  
    addExpense(text) {
      this.expenses.push(new Expense({ text }));
  
      this._commit(this.expenses);
    }
  
    editExpense(id, updatedText) {
      this.expenses = this.expenses.map(expense =>
        expense.id === id
          ? new Expense({
              ...expense,
              text: updatedText
            })
          : expense
      );
  
      this._commit(this.expenses);
    }
  
    deleteExpense(_id) {
      this.expenses = this.expenses.filter(({ id }) => id !== _id);
  
      this._commit(this.expenses);
    }
  
    toggleExpense(_id) {
      this.expenses = this.expenses.map(expense =>
        expense.id === _id ? new Expense({ ...expense, complete: !expense.complete }) : expense
      );
  
      this._commit(this.expenses);
    }

    //Apartado g donde se pide la actualización de un gasto concreto
    updateExpense(id,newText){
      const update = this.expenses.find(expense => expense.id === id);
      if(update) update.text = newText;
      this.onExpenseListChanged(this.expenses);

      this._commit(this.expenses);
    }

  }
  