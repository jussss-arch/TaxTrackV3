function loadBusinessName() {

    const businessInfo =
        JSON.parse(
            localStorage.getItem("businessInfo")
        );

    if (!businessInfo) {
        return;
    }

    document.getElementById("welcomeMessage")
        .textContent =
        "Welcome Back, " +
        businessInfo.businessName +
        "!";

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

function openPanel(){

    document
        .getElementById("profilePanel")
        .classList.add("show");
}

function closePanel(){

    document
        .getElementById("profilePanel")
        .classList.remove("show");
}

function toggleAccordion(id){

    const content =
        document.getElementById(id);

    if(content.style.display === "block"){

        content.style.display = "none";
    }
    else{

        content.style.display = "block";
    }

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

function updatePendingFilings(){

    const filings =
        JSON.parse(
            localStorage.getItem(
                "taxFilings"
            )
        ) || {};

    const container =
        document.getElementById(
            "pendingFilingsContainer"
        );

    if(!container){
        return;
    }

    container.innerHTML = "";

    let pendingCount = 0;

    for(
        const filingName
        in filings
    ){

        if(!filings[filingName]){

            container.innerHTML += `
                <p class="pending-item">
                    ${filingName}
                </p>
            `;

            pendingCount++;

        }

    }

    if(pendingCount === 0){

        container.innerHTML = `
            <p class="pending-item">
                No Pending Filings 🎉
            </p>
        `;

    }

}
  
function updateComplianceScore(){

    const savedFilings =
        JSON.parse(
            localStorage.getItem("taxFilings")
        ) || {};

   const totalRequirements =
    Object.keys(savedFilings).length;

const completedRequirements =
    Object.values(savedFilings)
        .filter(value => value === true)
        .length;

    let score = 0;

    if(totalRequirements > 0){

        score = Math.round(
            (
                completedRequirements /
                totalRequirements
            ) * 100
        );

    }

    document.getElementById(
        "scoreValue"
    ).textContent =
        score + "%";

    const circle =
        document.querySelector(
            ".progress-circle"
        );

    if(circle){

        const circumference = 565;

        circle.style.strokeDasharray =
            circumference;

        circle.style.strokeDashoffset =
            circumference -
            (score / 100) * circumference;

        if(score >= 90){

            circle.style.stroke = "#2fd13f";

        }
        else if(score >= 75){

            circle.style.stroke = "#7ed957";

        }
        else if(score >= 60){

            circle.style.stroke = "#ffd93d";

        }
        else if(score >= 40){

            circle.style.stroke = "#ff9f43";

        }
        else{

            circle.style.stroke = "#ff4d4d";

        }

    }

    let label = "";

    if(score >= 90){

        label = "EXCELLENT";

    }
    else if(score >= 75){

        label = "VERY GOOD";

    }
    else if(score >= 60){

        label = "GOOD";

    }
    else if(score >= 40){

        label = "FAIR";

    }
    else{

        label = "POOR";

    }

    document.getElementById(
        "scoreLabel"
    ).textContent =
        label;

}
window.onload = function(){
    loadBusinessName();

    updatePendingFilings();

    updateComplianceScore();

    loadUpcomingDeadlines();

};

window.addEventListener("focus", function(){

    updatePendingFilings();

    updateComplianceScore();

    loadUpcomingDeadlines();
});

function loadUpcomingDeadlines(){

    const container =
        document.getElementById(
            "upcomingDeadlines"
        );

    if(!container) return;

    const taxEvents =
        generateTaxEvents();

    const currentYear =
        new Date().getFullYear();

    const deadlines = [];

    for(
        const dateKey in taxEvents
    ){

        const parts =
            dateKey.split("-");

        const month =
            parseInt(parts[0]);

        const day =
            parseInt(parts[1]);

        const dueDate =
            new Date(
                currentYear,
                month - 1,
                day
            );

        deadlines.push({

            date: dueDate,

            title:
                taxEvents[dateKey]
        });
    }

   const today = new Date();

const upcoming =
    deadlines.filter(
        deadline =>
        deadline.date >= today
    );

upcoming.sort(
    (a,b) =>
    a.date - b.date
);

container.innerHTML = "";

upcoming.slice(0,5)
.forEach(deadline => {

    const item =
        document.createElement("p");

    item.textContent =
        `${deadline.date.toLocaleDateString(
            "en-US",
            {
                month:"short",
                day:"numeric"
            }
        )} - ${deadline.title}`;

    container.appendChild(item);
});
}

const dashboardSearch =
    document.getElementById(
        "dashboardSearch"
    );

if(dashboardSearch){

    dashboardSearch.addEventListener(
        "input",
        function(){

            const search =
                this.value.toLowerCase();

            document
                .querySelectorAll(
                    ".pending-item, #upcomingDeadlines p"
                )
                .forEach(item => {

                    item.style.display =
                        item.textContent
                            .toLowerCase()
                            .includes(search)
                        ? ""
                        : "none";

                });

        }
    );

}