const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")
const amount = document.querySelector(".amount input")
const btn = document.querySelector(".Exchange")

for (let select of dropdowns) {
    for (currencycode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencycode;
        newOption.value = currencycode;
        if (select.name === "from" && currencycode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "To" && currencycode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateExchangeRate = async () => {
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1"
    }
    const api_url = `https://v6.exchangerate-api.com/v6/bb08d43a5e91fac6e4985172/latest/${fromCurr.value}`
    try {
        const response = await fetch(api_url);

        if (!response.ok) {
            throw new Error('API Key Quota Exceeded');
        }

        const result = await response.json();
        let exchange_rate = result.conversion_rates[toCurr.value];
        let totalExchangeRate = (amtVal * exchange_rate).toFixed(6);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;

    } catch (error) {
        msg.innerText = `Error: ${error.message}`;
    }
};

const updateFlag = (element) => {
    let currencycode = element.value;
    let countryCode = countryList[currencycode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

window.addEventListener("load", () => {
    updateExchangeRate();
})

toCurr.addEventListener("click", () => {
    updateExchangeRate();
})

fromCurr.addEventListener("click", () => {
    updateExchangeRate();
})

amount.addEventListener("input", () => {
    updateExchangeRate();
})

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
})
