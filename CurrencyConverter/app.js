// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for(let code in countryList){
//     console.log(code, countryList[code]);
// }

for(let select of dropdowns){
    for(let CurrCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = CurrCode;
        newOption.value = CurrCode;
        if(select.name === "from" && CurrCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && CurrCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}
const updateFlag = (element) =>{
    // console.log(element);
    let CurrCode = element.value;
    // console.log(CurrCode);
    let countryCode = countryList[CurrCode];
    // console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal === "" || amtVal<1){
        amtVal = 1;
        amount.value = "1";
    }
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    // console.log(fromCurr.value.toLowerCase(),toCurr.value.toLowerCase());
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    // let rate = data[toCurr.value.toLowerCase()];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = amtVal*rate;
    // console.log(finalAmount);
    // msg.innerText = `1USD = 80INR`;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

});