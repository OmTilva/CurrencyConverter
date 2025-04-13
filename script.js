const BASE_URL = "https://latest.currency-api.pages.dev/v1";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromCur = document.querySelector(".from select");
let toCur = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
const updateExchnageRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/currencies/${fromCur.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCur.value.toLowerCase()][toCur.value.toLowerCase()];
  //   console.log(rate);
  let finalAmount = (amtVal * rate).toFixed(4);
  msg.innerText = `${amtVal} ${fromCur.value} = ${finalAmount} ${toCur.value}`;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchnageRate();
});
window.addEventListener("load", () => {
  updateExchnageRate();
});
