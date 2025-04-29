const BASE_URL = "https://v6.exchangerate-api.com/v6/cb2cd5152d58e9ee65222fd0/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button"); 
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        UpdateFlag(evt.target);
    });
}

const updateExchangeValue = async () => {
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
    }

    // Fetch rates from API
    const URL = BASE_URL; 
    let response = await fetch(URL);
    let data = await response.json();

    // Get rates for the selected currencies
    let fromRate = data.conversion_rates[fromCurr.value];
    let toRate = data.conversion_rates[toCurr.value];
    let rate = toRate / fromRate;

    // Calculate the final amount
    let finalAmount = amtvalue * rate;
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

const UpdateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeValue();
});

window.addEventListener("load", () => {
    let amount = document.querySelector(".amount input");
    amount.value = "1"; 
    updateExchangeValue();
});

