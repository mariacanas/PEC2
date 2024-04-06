/**
 * @class View
 *
 * Visual representation of the model.
 */
class ExpenseView {
    constructor() {
      this.app = this.getElement("#root");
      this.form = this.createElement("form");
      this.input = this.createElement("input");
      this.input.type = "text";
      this.input.placeholder = "Add expense";
      this.input.name = "expense";
      this.submitButton = this.createElement("button");
      this.submitButton.textContent = "Submit";
      this.form.append(this.input, this.submitButton);
      this.title = this.createElement("h1");
      this.title.textContent = "Expenses";
      this.expenseList = this.createElement("ul", "expense-list");
      this.app.append(this.title, this.form, this.expenseList);
  
      this._temporaryExpenseText = "";
      this._initLocalListeners();
    }
  
    get _ExpenseText() {
      return this.input.value;
    }
  
    _resetInput() {
      this.input.value = "";
    }
  
    createElement(tag, className) {
      const element = document.createElement(tag);
  
      if (className) element.classList.add(className);
  
      return element;
    }
  
    getElement(selector) {
      const element = document.querySelector(selector);
  
      return element;
    }
  
    displayExpenses(expenses) {
      // Delete all nodes
      while (this.expenseList.firstChild) {
        this.expenseList.removeChild(this.expenseList.firstChild);
      }
  
      // Show default message
      if (expenses.length === 0) {
        const p = this.createElement("p");
        p.textContent = "Nothing to do! Add a task?";
        this.expenseList.append(p);
      } else {
        // Create nodes
        expenses.forEach(expense => {
          const li = this.createElement("li");
          li.id = expense.id;
  
          const checkbox = this.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = expense.complete;
  
          const span = this.createElement("span");
          span.contentEditable = true;
          span.classList.add("editable");
  
          if (expense.complete) {
            const strike = this.createElement("s");
            strike.textContent = expense.text;
            span.append(strike);
          } else {
            span.textContent = expense.text;
          }
  
          const deleteButton = this.createElement("button", "delete");
          deleteButton.textContent = "Delete";
          li.append(checkbox, span, deleteButton);
  
          // Append nodes
          this.expenseList.append(li);
        });
      }
  
      // Debugging
      console.log(expenses);
    }
  
    _initLocalListeners() {
      this.expenseList.addEventListener("input", event => {
        if (event.target.className === "editable") {
          this._temporaryExpenseText = event.target.innerText;
        }
      });
    }
  
    bindAddExpense(handler) {
      this.form.addEventListener("submit", event => {
        event.preventDefault();
  
        if (this._expenseText) {
          handler(this._expenseText);
          this._resetInput();
        }
      });
    }
  
    bindDeleteExpense(handler) {
      this.expenseList.addEventListener("click", event => {
        if (event.target.className === "delete") {
          const id = event.target.parentElement.id;
  
          handler(id);
        }
      });
    }
  
    bindEditExpense(handler) {
      this.expenseList.addEventListener("focusout", event => {
        if (this._temporaryExpenseText) {
          const id = event.target.parentElement.id;
  
          handler(id, this._temporaryExpenseText);
          this._temporaryExpenseText = "";
        }
      });
    }
  
    bindToggleExpense(handler) {
      this.expenseList.addEventListener("change", event => {
        if (event.target.type === "checkbox") {
          const id = event.target.parentElement.id;
  
          handler(id);
        }
      });
    }


    //Apartado g donde se pide la actualización de un gasto concreto
    bindUpdateExpense(handler) {
      this.expenseList.addEventListener("focusout",e =>{
        if(e.target.classList ==="editable"){
          const id = e.target.parentElement.id;
          const newText = e.target.innerText.trim();
          if(newText) handler(id,newText);
        }
      });
    }

  }
  