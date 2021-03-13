// UI VARIABLES

const currencyFirstEl = document.getElementById('currency_one');
const currencyFirstAmount = document.getElementById('amount_one');
const currencySecondEl = document.getElementById('currency_two');
const currencySecondAmount = document.getElementById('amount_two');

const rateEl = document.getElementById('rate');
const convert = document.getElementById('convert');




// fetch exchange rate and update the dom

const calculate = async() => {

  const currencyOne = currencyFirstEl.value
  const currencyTwo = currencySecondEl.value;

  // console.log(currencyOne,currencyTwo);
try {
  
  await fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`)
  .then(res=>res.json())
  .then(resData => {
    console.log(resData)
    
    const rate = resData.rates[currencyTwo];
    // console.log(rate);
    
    // console.log(resData);
    rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
    
    
    currencySecondAmount.value = (currencyFirstAmount.value * rate).toFixed(2);
    
  })
  
  
  
} catch (error) {
  alert('something went wrong')
  
}
}

const convertFunction =  () => {
  const temp = currencyFirstEl.value;
  currencyFirstEl.value = currencySecondEl.value;
  currencySecondEl.value = temp;
  calculate()
}

//Event listeners

currencyFirstEl.addEventListener('change', calculate);
currencyFirstAmount.addEventListener('input', calculate);
currencySecondEl.addEventListener('change', calculate);
currencySecondAmount.addEventListener('input', calculate);
convert.addEventListener('click',convertFunction)


calculate();