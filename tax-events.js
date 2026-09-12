function generateTaxEvents(){

    const businessInfo =
        JSON.parse(
            localStorage.getItem(
                "businessInfo"
            )
        ) || {};

    const events = {};

    /* Income Tax Returns */

    events["04-15"] =
        "Annual Income Tax Return";

    events["05-15"] =
        "1st Quarter Income Tax Return";

    events["08-15"] =
        "2nd Quarter Income Tax Return";

    events["11-15"] =
        "3rd Quarter Income Tax Return";

    /* Percentage Tax */

    if(
        businessInfo.taxOption ===
        "Graduated"
    ){

        events["01-25"] =
            "Quarterly Percentage Tax Return";

        events["04-25"] =
            "Quarterly Percentage Tax Return";

        events["07-25"] =
            "Quarterly Percentage Tax Return";

        events["10-25"] =
            "Quarterly Percentage Tax Return";
    }

    return events;
}
