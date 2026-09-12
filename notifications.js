function loadNotifications(){

    const container =
        document.getElementById(
            "notificationsList"
        );

    const taxEvents =
        generateTaxEvents();

    const currentYear =
        new Date().getFullYear();

    const today =
        new Date();

    container.innerHTML = "";

    for(
        const dateKey in taxEvents
    ){

        const parts =
            dateKey.split("-");

        const dueDate =
            new Date(
                currentYear,
                parseInt(parts[0]) - 1,
                parseInt(parts[1])
            );

        const diffDays =
            Math.ceil(
                (dueDate - today) /
                (1000*60*60*24)
            );

        if(diffDays < 0){
            continue;
        }

        const card =
            document.createElement(
                "div"
            );

        card.classList.add(
            "notification-card"
        );

        let status = "";

        if(diffDays === 0){

            card.classList.add(
                "due-today"
            );

            status =
                "🔴 Due Today";
        }

        else if(diffDays <= 7){

            card.classList.add(
                "due-soon"
            );

            status =
                "🟠 Due Within 7 Days";
        }

        else{

            card.classList.add(
                "upcoming"
            );

            status =
                "🟢 Upcoming";
        }

        card.innerHTML =
        `
        <h3>${status}</h3>

        <p>
            ${taxEvents[dateKey]}
        </p>

        <p>
            Due:
            ${dueDate.toLocaleDateString()}
        </p>
        `;

        container.appendChild(
            card
        );
    }

    if(
        container.innerHTML === ""
    ){

        container.innerHTML =
        `
        <div class="notification-card">
            🎉 No upcoming deadlines.
        </div>
        `;
    }
}

window.onload =
    loadNotifications;