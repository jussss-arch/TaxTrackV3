const accordions =
    document.querySelectorAll(
        ".accordion"
    );

accordions.forEach(
    accordion => {

        const button =
            accordion.querySelector(
                ".accordion-btn"
            );

        const content =
            accordion.querySelector(
                ".accordion-content"
            );

        button.addEventListener(
            "click",
            () => {

                const isOpen =
                    accordion.classList.contains(
                        "active"
                    );

                accordions.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                        item.querySelector(
                            ".accordion-content"
                        ).style.maxHeight =
                            null;

                    }
                );

                if(!isOpen){

                    accordion.classList.add(
                        "active"
                    );

                    content.style.maxHeight =
                        content.scrollHeight +
                        "px";

                }

            }
        );

    }
);