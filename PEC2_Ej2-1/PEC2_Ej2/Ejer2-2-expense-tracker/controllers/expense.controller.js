
/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class ExpenseController {
    constructor(service, view) {
      this.service = service;
      this.view = view;
  
      // Explicit this binding
      this.service.bindExpenseListChanged(this.onExpenseListChanged);
      this.view.bindAddExpense(this.handleAddExpense);
      this.view.bindEditExpense(this.handleEditExpense);
      this.view.bindDeleteExpense(this.handleDeleteExpense);
      this.view.bindToggleExpense(this.handleToggleExpense);
      this.view.bindUpdateExpense(this.handleUpdateExpense);
  
      // Display initial Expenses
      this.onExpenseListChanged(this.service.expenses);
    }
  
    onExpenseListChanged = expenses => {
      this.view.displayExpense(expenses);
    };
  
    handleAddExpense = expenseText => {
      this.service.addExpense(expenseText);
    };
  
    handleEditExpense = (id, expenseText) => {
      this.service.editExpense(id, expenseText);
    };
  
    handleDeleteExpense = id => {
      this.service.deleteExpense(id);
    };
  
    handleToggleExpense = id => {
      this.service.toggleExpense(id);
    };

    //Apartado g donde se pide la actualización de un gasto concreto
    handleUpdateExpense = (id, expenseText) =>{
      this.service.updateExpense(id, expenseText);
    }
  }
  