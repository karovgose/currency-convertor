const selectCurrFrom = document.querySelector(".currency__select-from");
const selectCurrTo = document.querySelector(".currency__select-to");
const inputAmount = document.querySelector(".input-amount");
const swapBtn = document.querySelector(".btn__swap");
const result = document.querySelector(".input-result");
const resetBtn = document.querySelector(".btn__reset");

selectCurrFrom.addEventListener("change", fetchCurrency);
selectCurrTo.addEventListener("change", fetchCurrency);
inputAmount.addEventListener("input", fetchCurrency);
swapBtn.addEventListener("click", swap);
resetBtn.addEventListener("click", reset);

function reset() {
  inputAmount.value = "";
  result.value = "";
  selectCurrFrom.value = "";
  selectCurrTo.value = "";
}

function swap() {
  const selectedCurrencyFrom = selectCurrFrom.value;
  const selectedCurrencyTo = selectCurrTo.value;
  selectCurrFrom.value = selectedCurrencyTo;
  selectCurrTo.value = selectedCurrencyFrom;
  inputAmount.value = "";
  result.value = "";
}

function fetchCurrency() {
  const selectedCurrencyFrom = selectCurrFrom.value;
  const selectedCurrencyTo = selectCurrTo.value;
  const url = `https://v6.exchangerate-api.com/v6/0370c9cde9c0ae5fd42c2a82/latest/${selectedCurrencyFrom}`;
  const amount = parseFloat(inputAmount.value);

  if (isNaN(amount)) {
    result.value = "";
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRateFrom = data.conversion_rates[selectedCurrencyFrom];
      const exchangeRateTo = data.conversion_rates[selectedCurrencyTo];
      const convertedAmount = (amount * exchangeRateTo) / exchangeRateFrom;
      console.log(data);
      console.log(convertedAmount.toFixed(3));
      result.value = convertedAmount.toFixed(3);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      result.value = "Error fetching data";
    });
}
