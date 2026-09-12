function enableEdit() {

    const inputs =
        document.querySelectorAll("input");

    inputs.forEach(input => {

        input.removeAttribute("readonly");

    });
}

function saveSalesExpenses() {

    localStorage.setItem(
        "annualSales",
        document.getElementById("annualSales").value
    );

    localStorage.setItem(
        "quarterlySales",
        document.getElementById("quarterlySales").value
    );

    localStorage.setItem(
        "cogs",
        document.getElementById("cogs").value
    );

    localStorage.setItem(
        "rentExpense",
        document.getElementById("rentExpense").value
    );

    localStorage.setItem(
        "utilitiesExpense",
        document.getElementById("utilitiesExpense").value
    );

    localStorage.setItem(
        "miscExpense",
        document.getElementById("miscExpense").value
    );

    localStorage.setItem(
        "taxLicenses",
        document.getElementById("taxLicenses").value
    );

    localStorage.setItem(
        "otherExpense",
        document.getElementById("otherExpense").value
    );

    alert("Sales and Expenses Saved!");

    const inputs =
        document.querySelectorAll("input");

    inputs.forEach(input => {

        input.setAttribute("readonly", true);

    });
}

function loadSalesExpenses() {

    document.getElementById("annualSales").value =
        localStorage.getItem("annualSales") || "";

    document.getElementById("quarterlySales").value =
        localStorage.getItem("quarterlySales") || "";

    document.getElementById("cogs").value =
        localStorage.getItem("cogs") || "";

    document.getElementById("rentExpense").value =
        localStorage.getItem("rentExpense") || "";

    document.getElementById("utilitiesExpense").value =
        localStorage.getItem("utilitiesExpense") || "";

    document.getElementById("miscExpense").value =
        localStorage.getItem("miscExpense") || "";

    document.getElementById("taxLicenses").value =
        localStorage.getItem("taxLicenses") || "";

    document.getElementById("otherExpense").value =
        localStorage.getItem("otherExpense") || "";
}

loadSalesExpenses();