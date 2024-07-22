let expenses = [];
let totalamount = 0;

const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const info = infoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert("please select category");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("please enter valid amount");
        return;
    }
    if (info === '') {
        alert("please enter valid amount info");
        return;
    }
    if (date === '') {
        alert("please select a date");
        return;
    }

    const expense = { category, amount, info, date };
    expenses.push(expense);

    if (category === 'income') {
        totalamount += amount;
    }
    if (category === 'expense') {
        totalamount -= amount;
    }
    totalAmountCell.textContent = totalamount;

    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', function() {
        const index = expenses.indexOf(expense);
        if (index !== -1) {
            expenses.splice(index, 1);
            if (expense.category === 'income') {
                totalamount -= expense.amount;
            }
            if (expense.category === 'expense') {
                totalamount += expense.amount;
            }
            totalAmountCell.textContent = totalamount;
            expenseTableBody.removeChild(newRow);
        }
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    infoCell.textContent = expense.info;
    deleteCell.appendChild(deleteBtn);
});

