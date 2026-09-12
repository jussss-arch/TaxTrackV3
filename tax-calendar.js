const businessInfo =
    JSON.parse(
        localStorage.getItem(
            "businessInfo"
        )
    ) || {};

const monthYear =
    document.getElementById(
        "monthYear"
    );

const calendarGrid =
    document.getElementById(
        "calendarGrid"
    );

let currentDate =
    new Date();

/* =========================
   TAX EVENTS GENERATOR
========================= */

const taxEvents =
    generateTaxEvents();

/* =========================
   RENDER CALENDAR
========================= */

function renderCalendar(){

    calendarGrid.innerHTML = "";

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const firstDay =
        new Date(
            year,
            month,
            1
        );

    const startDay =
        firstDay.getDay();

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();

    monthYear.textContent =
        firstDay.toLocaleString(
            "en-US",
            {
                month:"long",
                year:"numeric"
            }
        );

    /* Empty cells */

    for(
        let i = 0;
        i < startDay;
        i++
    ){

        const empty =
            document.createElement(
                "div"
            );

        empty.classList.add(
            "day",
            "empty"
        );

        calendarGrid.appendChild(
            empty
        );
    }

    /* Days */

    for(
        let day = 1;
        day <= daysInMonth;
        day++
    ){

        const cell =
            document.createElement(
                "div"
            );

        cell.classList.add(
            "day"
        );

        const dayOfWeek =
            new Date(
                year,
                month,
                day
            ).getDay();

        if(
            dayOfWeek === 0
        ){
            cell.classList.add(
                "sunday"
            );
        }

        const dateKey =
            `${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

        cell.innerHTML =
        `
        <div class="day-number">
            ${day}
        </div>
        `;

        if(
            taxEvents[dateKey]
        ){

            const event =
                document.createElement(
                    "div"
                );

            event.classList.add(
                "event"
            );

            event.textContent =
                taxEvents[
                    dateKey
                ];

            cell.appendChild(
                event
            );
        }

        calendarGrid.appendChild(
            cell
        );
    }
}

/* =========================
   BUTTONS
========================= */

document
.getElementById(
    "prevBtn"
)
.addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );

        renderCalendar();
    }
);

document
.getElementById(
    "nextBtn"
)
.addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );

        renderCalendar();
    }
);

/* =========================
   INITIAL LOAD
========================= */

renderCalendar();