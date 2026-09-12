const API_KEY =
    "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";

    console.log(API_KEY);
async function sendMessage(){

    const input =
        document.getElementById(
            "userInput"
        );

    const userMessage =
        input.value.trim();

    if(!userMessage){
        return;
    }
document
    .getElementById("welcomeScreen")
    .style.display = "none";
    addMessage(
        userMessage,
        "user"
    );

    input.value = "";

    const businessInfo =
    JSON.parse(
        localStorage.getItem(
            "businessInfo"
        )
    ) || {};

const sales =
    localStorage.getItem(
        "quarterlySales"
    ) || 0;
    const profileContext =

`Business Profile:

Business Name:
${businessInfo.businessName || "Not Set"}

Taxpayer Type:
${businessInfo.taxpayerType || "Not Set"}

Tax Option:
${businessInfo.taxOption || "Not Set"}

VAT Registered:
${businessInfo.vatRegistered ? "Yes" : "No"}

Business Type:
${businessInfo.businessType || "Not Set"}

Business Size:
${businessInfo.businessSize || "Not Set"}

Quarterly Sales:
₱${sales}
`;

    try{

        const response =
    await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "Authorization":
                `Bearer ${API_KEY}`
            },

            body:JSON.stringify({

                model:
"openai/gpt-oss-20b",

                messages:[

                    {
                        role:"system",

                        content:
`You are TaxTrack AI Assistant.

You help Philippine Micro and Small Enterprises understand taxes.
Your primary purpose is to help users with:
- Philippine taxes
- BIR forms
- Tax compliance
- Business registration
- Bookkeeping basics

If a question is unrelated to taxation or business, politely answer briefly and encourage the user to return to tax-related topics.
Use the business profile below when answering.

${profileContext}

Rules:
- Never use markdown tables
- Use short paragraphs
- Use bullet points when listing information
- Keep answers under 120 words
- Be professional and easy to understand
- Focus only on Philippine taxation
- When discussing forms or deadlines, use bullet points
- Avoid long walls of text`
                    },

                    {
                        role:"user",
                        content:userMessage
                    }

                ]
            })
        }
    );

            console.log(response.status);
const data =
    await response.json();

if(!response.ok){

    addMessage(
        `API Error: ${
            data.error?.message ||
            "Unknown Error"
        }`,
        "bot"
    );

    return;
}

const reply =
    data.choices?.[0]
    ?.message?.content
    ||
    "No response generated.";

        addMessage(
            reply,
            "bot"
        );

    }
    catch(error){

        addMessage(
            "Connection error.",
            "bot"
        );

        console.error(error);
    }
}

function addMessage(
    text,
    sender
){

    const chat =
        document.getElementById(
            "chatMessages"
        );

    const message =
        document.createElement(
            "div"
        );

    message.className =
        sender + "-message";

message.innerHTML =
    text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");

    chat.appendChild(
        message
    );

    chat.scrollTop =
        chat.scrollHeight;
}

function openPanel(){

    document
        .getElementById("sidePanel")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");
}

function closePanel(){

    document
        .getElementById("sidePanel")
        .classList.remove("active");

    document
        .getElementById("overlay")
        .classList.remove("active");
}

function askSuggestion(text){

    document
        .getElementById("userInput")
        .value = text;

    sendMessage();
}