// ==============================
// TAX MONITOR
// ==============================


// ==============================
// OPEN BUSINESS PROFILE PANEL
// ==============================

function openPanel(){

    document
        .getElementById("profilePanel")
        .classList.add("show");

}


// ==============================
// CLOSE BUSINESS PROFILE PANEL
// ==============================

function closePanel(){

    document
        .getElementById("profilePanel")
        .classList.remove("show");

}


// ==============================
// ACCORDION
// ==============================

function toggleAccordion(id){

    const content =
        document.getElementById(id);

    if(content.style.display === "block"){

        content.style.display = "none";

    }
    else{

        content.style.display = "block";

    }

}


// ==============================
// LOAD BUSINESS INFORMATION
// ==============================

function loadBusinessInfo(){

    const businessInfo =
        JSON.parse(
            localStorage.getItem("businessInfo")
        );

    if(!businessInfo){
        return;
    }

    document.getElementById("panelBusinessName")
        .textContent =
        businessInfo.businessName || "-";

    document.getElementById("panelBusinessType")
        .textContent =
        businessInfo.businessType || "-";

    document.getElementById("panelBusinessSize")
        .textContent =
        businessInfo.businessSize || "-";

    document.getElementById("panelRegistrationDate")
        .textContent =
        businessInfo.registrationDate || "-";

}


// ==============================
// LOAD SALES & EXPENSES
// ==============================

function loadSalesExpenses(){

    document.getElementById("panelSales")
        .textContent =
        localStorage.getItem("quarterlySales") || "-";

    document.getElementById("panelCOGS")
        .textContent =
        localStorage.getItem("cogs") || "-";

    document.getElementById("panelRent")
        .textContent =
        localStorage.getItem("rentExpense") || "-";

    document.getElementById("panelMisc")
        .textContent =
        localStorage.getItem("miscExpense") || "-";

}


// ==============================
// GET NUMERIC VALUE
// ==============================

function getAmount(key){

    const value =
        localStorage.getItem(key) || "0";

    return parseFloat(
        value.replace(/[^0-9.-]+/g, "")
    ) || 0;

}


// ==============================
// COMPUTE TAXABLE INCOME
// ==============================

function calculateTaxableIncome(){

    const annualSales =
        getAmount("annualSales");

    const cogs =
        getAmount("cogs");

    const rent =
        getAmount("rentExpense");

    const utilities =
        getAmount("utilitiesExpense");

    const miscellaneous =
        getAmount("miscExpense");

    const taxLicenses =
        getAmount("taxLicenses");

    const otherExpenses =
        getAmount("otherExpense");


    const totalExpenses =
        cogs +
        rent +
        utilities +
        miscellaneous +
        taxLicenses +
        otherExpenses;


    let taxableIncome =
        annualSales -
        totalExpenses;


    if(taxableIncome < 0){

        taxableIncome = 0;

    }


    return taxableIncome;

}


// ==============================
// COMPUTE INCOME TAX
// ==============================

function calculateIncomeTax(){

    const businessInfo =
        JSON.parse(
            localStorage.getItem("businessInfo")
        ) || {};


    const taxableIncome =
        calculateTaxableIncome();


    const taxpayerType =
        businessInfo.taxpayerType;


    const taxOption =
        businessInfo.taxOption;


    let incomeTaxDue = 0;


    // ==========================
    // INDIVIDUAL
    // ==========================

    if(taxpayerType === "Individual"){

        // 8% INCOME TAX

        if(taxOption === "8%"){

            incomeTaxDue =
                taxableIncome * 0.08;

        }


        // GRADUATED RATES

        else if(taxOption === "Graduated"){

            incomeTaxDue =
                calculateGraduatedTax(
                    taxableIncome
                );

        }

    }


    // ==========================
    // PARTNERSHIP
    // ==========================

    else if(taxpayerType === "Partnership"){

        /*
            Partnership computation
            will use the applicable
            graduated/corporate treatment
            defined by TaxTrack.
        */

        incomeTaxDue =
            calculatePartnershipTax(
                taxableIncome,
                businessInfo.partnershipType
            );

    }


    return incomeTaxDue;

}


// ==============================
// GRADUATED TAX
// ==============================

function calculateGraduatedTax(
    taxableIncome
){

    let tax = 0;


    if(taxableIncome <= 250000){

        tax = 0;

    }

    else if(taxableIncome <= 400000){

        tax =
            (taxableIncome - 250000)
            * 0.15;

    }

    else if(taxableIncome <= 800000){

        tax =
            22500 +
            (taxableIncome - 400000)
            * 0.20;

    }

    else if(taxableIncome <= 2000000){

        tax =
            102500 +
            (taxableIncome - 800000)
            * 0.25;

    }

    else if(taxableIncome <= 8000000){

        tax =
            402500 +
            (taxableIncome - 2000000)
            * 0.30;

    }

    else{

        tax =
            2202500 +
            (taxableIncome - 8000000)
            * 0.35;

    }


    return tax;

}


// ==============================
// PARTNERSHIP TAX
// ==============================

function calculatePartnershipTax(
    taxableIncome,
    partnershipType
){

    /*
        Temporary TaxTrack computation.

        Partnership is currently restricted
        to Graduated Rates in the Business
        Registration setup.

        Professional Partnership will be
        refined separately.
    */


    if(partnershipType === "Professional Partnership"){

        return calculateGraduatedTax(
            taxableIncome
        );

    }


    if(partnershipType === "General Partnership"){

        return calculateGraduatedTax(
            taxableIncome
        );

    }


    return 0;

}


// ==============================
// DISPLAY TAX VALUES
// ==============================

function displayTaxComputation(){

    const taxableIncome =
        calculateTaxableIncome();

    const incomeTaxDue =
        calculateIncomeTax();


    const taxableFormatted =
        "₱ " +
        taxableIncome.toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    const taxFormatted =
        "₱ " +
        incomeTaxDue.toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );


    document.getElementById(
        "taxableIncome"
    ).dataset.value =
        taxableFormatted;

    document.getElementById(
        "incomeTaxDue"
    ).dataset.value =
        taxFormatted;


    document.getElementById(
        "taxableIncome"
    ).textContent =
        "₱ ******.00";

    document.getElementById(
        "incomeTaxDue"
    ).textContent =
        "₱ ******.00";

}

// ==============================
// TAX REQUIREMENTS
// ==============================

function loadTaxRequirements(){

    const businessInfo =
        JSON.parse(
            localStorage.getItem("businessInfo")
        );

    const container =
        document.getElementById(
            "requirementsContainer"
        );

    if(!container){
        return;
    }

    container.innerHTML = "";


    if(!businessInfo){

        container.innerHTML = `
            <div class="requirement-card">

                <h3>
                    Business Profile Required
                </h3>

                <p>
                    Complete your Business Profile
                    to view your tax requirements.
                </p>

            </div>
        `;

        return;

    }


    const taxpayerType =
        businessInfo.taxpayerType;

    const taxOption =
        businessInfo.taxOption;


    // ==========================
    // INDIVIDUAL
    // ==========================

    if(taxpayerType === "Individual"){

        addRequirement(
            container,
            "BIR Form 1701",
            "Annual Income Tax Return for Individual Taxpayers."
        );


        if(taxOption === "8%"){

            addRequirement(
                container,
                "8% Income Tax",
                "Applicable income tax option selected in your Business Profile."
            );

        }

        else if(taxOption === "Graduated"){

            addRequirement(
                container,
                "Graduated Income Tax",
                "Income tax is computed using the applicable graduated income tax rates."
            );

        }

        // ==========================
// VAT REGISTERED
// ==========================

if(businessInfo.vatRegistered){

    addRequirement(
        container,
        "BIR Form 2550Q",
        "Quarterly Value Added Tax Return."
    );

}


// ==========================
// NON-VAT
// ==========================

else{

    addRequirement(
        container,
        "BIR Form 2551Q",
        "Quarterly Percentage Tax Return."
    );

}


// ==========================
// WITHHOLDING TAX
// ==========================

if(businessInfo.withholdingCompensation){

    addRequirement(
        container,
        "BIR Form 1601-C",
        "Monthly Remittance Return of Income Taxes Withheld on Compensation."
    );

}


if(businessInfo.withholdingExpanded){

    addRequirement(
        container,
        "BIR Form 1601-EQ",
        "Quarterly Remittance Return of Creditable Income Taxes Withheld."
    );

}


if(businessInfo.withholdingFinal){

    addRequirement(
        container,
        "Final Withholding Tax",
        "Business is subject to Final Withholding Tax compliance requirements."
    );

}


// ==========================
// DST
// ==========================

if(businessInfo.hasDSTTransactions){

    addRequirement(
        container,
        "Documentary Stamp Tax",
        "Business has transactions subject to Documentary Stamp Tax."
    );

}


// ==========================
// EXCISE TAX
// ==========================

if(businessInfo.hasExciseTax){

    addRequirement(
        container,
        "Excise Tax",
        "Business engages in activities subject to Excise Tax."
    );

}


// ==========================
// DIGITAL TRANSACTIONS
// ==========================

if(businessInfo.hasDigitalTransactions){

    addRequirement(
        container,
        "Digital / Nonresident Transactions",
        "Business has transactions involving digital or nonresident service providers."
    );

}

    }


    // ==========================
    // PARTNERSHIP
    // ==========================

 else if(taxpayerType === "Partnership"){

    addRequirement(
        container,
        "BIR Form 1702",
        "Annual Income Tax Return for Partnerships."
    );

    if(!businessInfo.partnershipType){

    addRequirement(
        container,
        "Partnership Type Required",
        "Please select General Partnership or Professional Partnership in Business Profile."
    );

    return;
}
   
    // PARTNERSHIP TYPE

    if(
        businessInfo.partnershipType ===
        "General Partnership"
    ){

        addRequirement(
            container,
            "General Partnership",
            "Business partnership engaged in commercial activities."
        );

    }

    else if(
        businessInfo.partnershipType ===
        "Professional Partnership"
    ){

        addRequirement(
            container,
            "Professional Partnership",
            "Partnership formed for the practice of a profession."
        );

    }


    // VAT

    if(businessInfo.vatRegistered){

        addRequirement(
            container,
            "BIR Form 2550Q",
            "Quarterly VAT Return."
        );

    }
    else{

        addRequirement(
            container,
            "BIR Form 2551Q",
            "Quarterly Percentage Tax Return."
        );

    }


    // WITHHOLDING TAX

    if(businessInfo.withholdingCompensation){

        addRequirement(
            container,
            "BIR Form 1601C",
            "Withholding Tax on Compensation."
        );

    }


    if(businessInfo.withholdingExpanded){

        addRequirement(
            container,
            "BIR Form 0619E",
            "Monthly Remittance of Expanded Withholding Tax."
        );

        addRequirement(
            container,
            "BIR Form 1601EQ",
            "Quarterly Expanded Withholding Tax Return."
        );

    }


    if(businessInfo.withholdingFinal){

        addRequirement(
            container,
            "BIR Form 0619F",
            "Monthly Remittance of Final Withholding Tax."
        );

        addRequirement(
            container,
            "BIR Form 1601FQ",
            "Quarterly Final Withholding Tax Return."
        );

    }


    // DST

    if(businessInfo.hasDSTTransactions){

        addRequirement(
            container,
            "BIR Form 2000",
            "Documentary Stamp Tax Return."
        );

    }


    // EXCISE

    if(businessInfo.hasExciseTax){

        addRequirement(
            container,
            "Excise Tax Return",
            "Applicable excise tax requirements."
        );

    }


    // DIGITAL TRANSACTIONS

    if(businessInfo.hasDigitalTransactions){

        addRequirement(
            container,
            "Digital / Nonresident Transactions",
            "Additional compliance requirements may apply."
        );

    }

}

    // ==========================
    // NO TAXPAYER TYPE
    // ==========================

    else{

        container.innerHTML = `
            <div class="requirement-card">

                <h3>
                    Complete Your Tax Profile
                </h3>

                <p>
                    Select your Taxpayer Type
                    in Business Profile to view
                    your tax requirements.
                </p>

            </div>
        `;

    }
const checkboxes =
    document.querySelectorAll(
        ".filing-check"
    );

checkboxes.forEach(function(box){

    const filingName =
        box.dataset.filing;

    const savedFilings =
        JSON.parse(
            localStorage.getItem(
                "taxFilings"
            )
        ) || {};

    box.checked =
        savedFilings[filingName] || false;

    box.addEventListener(
        "change",
        function(){

            const filings =
                JSON.parse(
                    localStorage.getItem(
                        "taxFilings"
                    )
                ) || {};

            filings[filingName] =
                box.checked;

            localStorage.setItem(
                "taxFilings",
                JSON.stringify(filings)
            );

            updatePendingFilings();
            updateComplianceScore();

        }
    );

});

const oldFilings =
    JSON.parse(
        localStorage.getItem("taxFilings")
    ) || {};

const filings = {};

checkboxes.forEach(function(box){

    const filingName =
        box.dataset.filing;

    filings[filingName] =
        oldFilings[filingName] || false;

});

localStorage.setItem(
    "taxFilings",
    JSON.stringify(filings)
);
    updatePendingFilings();
    updateComplianceScore();

}

function updatePendingFilings(){

    const requirements =
        document.querySelectorAll(
            "#requirementsContainer .requirement-card h3"
        );

    const container =
        document.getElementById(
            "pendingFilingsContainer"
        );

    if(!container){
        return;
    }

    container.innerHTML = "";

    requirements.forEach(function(item){

        const filing =
            document.createElement("p");

        filing.className =
            "pending-item";

        filing.textContent =
            item.textContent;

        container.appendChild(filing);

    });

}

function updateComplianceScore(){

    const savedFilings =
        JSON.parse(
            localStorage.getItem("taxFilings")
        ) || {};

    const checkboxes =
        document.querySelectorAll(
            ".filing-check"
        );

    const totalRequirements =
        checkboxes.length;

    let completedRequirements = 0;

    checkboxes.forEach(function(box){

        const filingName =
            box.dataset.filing;

        if(savedFilings[filingName]){

            completedRequirements++;

        }

    });

    let score = 0;

    if(totalRequirements > 0){

        score =
            Math.round(
                (
                    completedRequirements /
                    totalRequirements
                ) * 100
            );

    }

    const scoreElement =
        document.getElementById(
            "complianceScore"
        );

    if(scoreElement){

        scoreElement.textContent =
            score + "%";

    }

}

// ==============================
// ADD REQUIREMENT
// ==============================

function addRequirement(
    container,
    title,
    description
){

    const card =
        document.createElement("div");

    card.className =
        "requirement-card";

    card.innerHTML = `

    <label class="requirement-check">

        <input
            type="checkbox"
            class="filing-check"
            data-filing="${title}"
        >

        <h3>${title}</h3>

    </label>

    <p>${description}</p>

    <a
        href="https://www.bir.gov.ph/bir-forms"
        target="_blank"
        class="bir-link"
    >
        Open BIR Forms
    </a>

`;

    container.appendChild(card);

}


// ==============================
// MENU
// ==============================

function openMenu(){

    document
        .getElementById("menuPanel")
        .classList.add("show");

}


function closeMenu(){

    document
        .getElementById("menuPanel")
        .classList.remove("show");

}


// ==============================
// INITIALIZE
// ==============================

window.addEventListener("focus", function(){

    loadBusinessInfo();
    loadTaxRequirements();
    displayTaxComputation();

});

window.onload = function(){

    loadBusinessInfo();

    loadSalesExpenses();

    displayTaxComputation();

    loadTaxRequirements();

};

let taxableVisible = false;
let taxDueVisible = false;


function toggleTaxableIncome(){

    const amount =
        document.getElementById("taxableIncome");

    if(taxableVisible){

        amount.textContent =
            "₱ ******.00";

        taxableVisible = false;
    }
    else{

        amount.textContent =
            amount.dataset.value;

        taxableVisible = true;
    }

}


function toggleIncomeTax(){

    const amount =
        document.getElementById("incomeTaxDue");

    if(taxDueVisible){

        amount.textContent =
            "₱ ******.00";

        taxDueVisible = false;
    }
    else{

        amount.textContent =
            amount.dataset.value;

        taxDueVisible = true;
    }

}

window.addEventListener("storage", function(event){

    if(event.key === "businessInfo"){

        loadBusinessInfo();

        loadTaxRequirements();

        displayTaxComputation();

    }

});

const taxMonitorSearch =
    document.getElementById(
        "taxMonitorSearch"
    );

if(taxMonitorSearch){

    taxMonitorSearch.addEventListener(
        "input",
        function(){

            const search =
                this.value.toLowerCase();

            document
                .querySelectorAll(
                    ".requirement-card"
                )
                .forEach(card => {

                    card.style.display =
                        card.textContent
                            .toLowerCase()
                            .includes(search)
                        ? ""
                        : "none";

                });

        }
    );

}