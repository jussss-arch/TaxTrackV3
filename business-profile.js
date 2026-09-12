document.addEventListener("DOMContentLoaded", function(){

    loadBusinessProfile();

    document
        .getElementById("taxpayerType")
        .addEventListener(
            "change",
            updateTaxpayerFields
        );

});


function loadBusinessProfile(){

    const businessInfo =
        JSON.parse(
            localStorage.getItem("businessInfo")
        ) || {};


    document.getElementById("businessName").value =
        businessInfo.businessName || "";


    document.getElementById("tradeName").value =
        businessInfo.tradeName || "";


    document.getElementById("businessType").value =
        businessInfo.businessType || "";


    document.getElementById("businessSize").value =
        businessInfo.businessSize || "";


    document.getElementById("registrationDate").value =
        businessInfo.registrationDate || "";


    document.getElementById("natureOfBusiness").value =
        businessInfo.natureOfBusiness || "";


    document.getElementById("businessAddress").value =
        businessInfo.businessAddress || "";


    document.getElementById("region").value =
        businessInfo.region || "";


    document.getElementById("city").value =
        businessInfo.city || "";


    document.getElementById("contactNumber").value =
        businessInfo.contactNumber || "";


    document.getElementById("emailAddress").value =
        businessInfo.emailAddress || "";


    document.getElementById("tin").value =
        businessInfo.tin || "";


    document.getElementById("rdoCode").value =
        businessInfo.rdoCode || "";


    document.getElementById("vatRegistrationDate").value =
        businessInfo.vatRegistrationDate || "";


    document.getElementById("numberOfEmployees").value =
        businessInfo.numberOfEmployees || "";


    document.getElementById("hasBranches").value =
        businessInfo.hasBranches || "";


    document.getElementById("onlineSelling").value =
        businessInfo.onlineSelling || "";


    document.getElementById("importExport").value =
        businessInfo.importExport || "";


    document.getElementById("vat").checked =
        businessInfo.vatRegistered || false;


    document.getElementById("hasDSTTransactions").checked =
        businessInfo.hasDSTTransactions || false;


    document.getElementById("hasExciseTax").checked =
        businessInfo.hasExciseTax || false;


    document.getElementById("hasDigitalTransactions").checked =
        businessInfo.hasDigitalTransactions || false;

    document.getElementById("withholdingCompensation").checked =
    businessInfo.withholdingCompensation || false;

    document.getElementById("withholdingExpanded").checked =
    businessInfo.withholdingExpanded || false;

    document.getElementById("withholdingFinal").checked =
    businessInfo.withholdingFinal || false;

    document.getElementById("taxpayerType").value =
    businessInfo.taxpayerType || "";

    document.getElementById("individualType").value =
    businessInfo.individualType || "";

document.getElementById("partnershipType").value =
    businessInfo.partnershipType || "";

updateTaxpayerFields();

document.getElementById("taxOption").value =
        businessInfo.taxOption || "8%";


}


function saveBusinessProfile(){

    const businessInfo =
        JSON.parse(
            localStorage.getItem("businessInfo")
        ) || {};


    businessInfo.businessName =
        document.getElementById("businessName").value;


    businessInfo.tradeName =
        document.getElementById("tradeName").value;


    businessInfo.businessType =
        document.getElementById("businessType").value;


    businessInfo.businessSize =
        document.getElementById("businessSize").value;


    businessInfo.registrationDate =
        document.getElementById("registrationDate").value;


    businessInfo.natureOfBusiness =
        document.getElementById("natureOfBusiness").value;


    businessInfo.businessAddress =
        document.getElementById("businessAddress").value;


    businessInfo.region =
        document.getElementById("region").value;


    businessInfo.city =
        document.getElementById("city").value;


    businessInfo.contactNumber =
        document.getElementById("contactNumber").value;


    businessInfo.emailAddress =
        document.getElementById("emailAddress").value;


    businessInfo.tin =
        document.getElementById("tin").value;


    businessInfo.rdoCode =
        document.getElementById("rdoCode").value;


    businessInfo.taxOption =
        document.getElementById("taxOption").value;


    businessInfo.vatRegistrationDate =
        document.getElementById("vatRegistrationDate").value;


    businessInfo.numberOfEmployees =
        document.getElementById("numberOfEmployees").value;


    businessInfo.hasBranches =
        document.getElementById("hasBranches").value;


    businessInfo.onlineSelling =
        document.getElementById("onlineSelling").value;


    businessInfo.importExport =
        document.getElementById("importExport").value;


    businessInfo.vatRegistered =
        document.getElementById("vat").checked;

    businessInfo.hasDSTTransactions =
        document.getElementById("hasDSTTransactions").checked;


    businessInfo.hasExciseTax =
        document.getElementById("hasExciseTax").checked;


   businessInfo.hasDigitalTransactions =
    document.getElementById("hasDigitalTransactions").checked;


businessInfo.withholdingCompensation =
    document.getElementById("withholdingCompensation").checked;


businessInfo.withholdingExpanded =
    document.getElementById("withholdingExpanded").checked;


businessInfo.withholdingFinal =
    document.getElementById("withholdingFinal").checked;

businessInfo.taxpayerType =
    document.getElementById("taxpayerType").value;

    businessInfo.individualType =
    document.getElementById("individualType").value;

businessInfo.partnershipType =
    document.getElementById("partnershipType").value;

localStorage.setItem(
    "businessInfo",
    JSON.stringify(businessInfo)
    
);

alert("Business profile updated successfully!");

}

function updateTaxpayerFields(){

    const taxpayerType =
        document.getElementById("taxpayerType").value;

    const individualField =
        document.getElementById("individualField");

    const partnershipField =
        document.getElementById("partnershipField");

    const taxOption =
        document.getElementById("taxOption");


    if(taxpayerType === "Individual"){

        individualField.style.display = "block";

        partnershipField.style.display = "none";


        taxOption.innerHTML = `

            <option value="8%">
                8% Income Tax
            </option>

            <option value="Graduated">
                Graduated Rates
            </option>

        `;


        document.getElementById("partnershipType").value = "";

    }


    else if(taxpayerType === "Partnership"){

        individualField.style.display = "none";

        partnershipField.style.display = "block";


        taxOption.innerHTML = `

            <option value="Graduated">
                Graduated Rates
            </option>

        `;

        taxOption.value = "Graduated";


        document.getElementById("individualType").value = "";

    }


    else{

        individualField.style.display = "none";

        partnershipField.style.display = "none";


        taxOption.innerHTML = `

            <option value="8%">
                8% Income Tax
            </option>

            <option value="Graduated">
                Graduated Rates
            </option>

        `;

    }

}
