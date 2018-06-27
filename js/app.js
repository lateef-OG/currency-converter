let selectFrom = document.getElementById('select-from');
let selectTo = document.getElementById('select-to');
let input = document.getElementById('input-amount');
let output =  document.getElementById('output');

fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(
   response => response.json()
).then(jsonData => {
    const currencies = jsonData.results;
    for (currency in currencies){
        const currencyId = currencies[currency].id;
        const currencyName = currencies[currency].currencyName;
        const option = document.createElement("option");
        option.setAttribute("value", currencyId);
        option.text = `${currencyId} (${currencyName})`;
        selectFrom.appendChild(option);
    }
    for (currency in currencies){
        const currencyId = currencies[currency].id;
        const currencyName = currencies[currency].currencyName;
        const option = document.createElement("option");
        option.setAttribute("value", currencyId);
        option.text = `${currencyId} (${currencyName})`;
        selectTo.appendChild(option);
	}
});

function convertCurrency(){
    var cId1 = selectFrom.options[selectFrom.selectedIndex].value;
    var cId2 = selectTo.options[selectTo.selectedIndex].value;
    let query = `${cId1}_${cId2}`;
    let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`

    // fetch(url).then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error('Something went wrong');
    //     }
    //   })

    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
    }).then(jsonData => {
        var conversionRate = jsonData[query];
        var result = conversionRate * input.value;
        result = Math.round(result * 100) / 100;
        output.innerHTML = result;
        console.log(result);
    }).catch((error) => {
        console.log(error)
    });
}