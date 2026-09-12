function saveBusinessInfo() {

    const businessData = {
        businessName: document.getElementById("businessName").value,
        businessType: document.getElementById("businessType").value,
        businessSize: document.getElementById("businessSize").value,
        registrationDate: document.getElementById("registrationDate").value,
        region: document.getElementById("region").value,
        city: document.getElementById("city").value,
        taxpayerType: document.getElementById("taxpayerType").value,
        taxOption: document.getElementById("taxOption").value,
        individualType: document.getElementById("individualType").value,
        partnershipType: document.getElementById("partnershipType").value
    };

    localStorage.setItem(
        "businessInfo",
        JSON.stringify(businessData)
    );

    window.location.href = "dashboard.html";
}


function updateTaxpayerFields() {

    const taxpayerType =
        document.getElementById("taxpayerType").value;

    const individualField =
        document.getElementById("individualField");

    const partnershipField =
        document.getElementById("partnershipField");

    const taxOption =
        document.getElementById("taxOption");


    if (taxpayerType === "Individual") {

        // Show Individual options
        individualField.style.display = "block";
        partnershipField.style.display = "none";

        // Restore Individual Tax Options
        taxOption.innerHTML = `
            <option value="8%">8% Income Tax</option>
            <option value="Graduated">Graduated Rates</option>
        `;

        // Clear Partnership selection
        document.getElementById("partnershipType").value = "";


    } else if (taxpayerType === "Partnership") {

        // Hide Individual options
        individualField.style.display = "none";
        partnershipField.style.display = "block";

        // Partnership uses Graduated Rates
        taxOption.innerHTML = `
            <option value="Graduated">Graduated Rates</option>
        `;

        taxOption.value = "Graduated";

        // Clear Individual selection
        document.getElementById("individualType").value = "";


    } else {

        // Hide both additional sections
        individualField.style.display = "none";
        partnershipField.style.display = "none";

        // Default Tax Options
        taxOption.innerHTML = `
            <option value="8%">8% Income Tax</option>
            <option value="Graduated">Graduated Rates</option>
        `;

        document.getElementById("individualType").value = "";
        document.getElementById("partnershipType").value = "";
    }
}


function loadBusinessInfo() {

    const savedData =
        JSON.parse(
            localStorage.getItem("businessInfo")
        );

    if (!savedData) {
        updateTaxpayerFields();
        return;
    }

    document.getElementById("businessName").value =
        savedData.businessName || "";

    document.getElementById("businessType").value =
        savedData.businessType || "";

    document.getElementById("businessSize").value =
        savedData.businessSize || "";

    document.getElementById("registrationDate").value =
        savedData.registrationDate || "";

    document.getElementById("region").value =
        savedData.region || "";

    document.getElementById("city").value =
        savedData.city || "";

    document.getElementById("taxpayerType").value =
        savedData.taxpayerType || "";

    document.getElementById("individualType").value =
        savedData.individualType || "";

    document.getElementById("partnershipType").value =
        savedData.partnershipType || "";

    updateTaxpayerFields();

    // Restore saved tax option for Individual
    if (savedData.taxpayerType === "Individual") {
        document.getElementById("taxOption").value =
            savedData.taxOption || "8%";
    }
}


window.onload = function () {

    loadBusinessInfo();

    document
        .getElementById("taxpayerType")
        .addEventListener(
            "change",
            updateTaxpayerFields
        );
};