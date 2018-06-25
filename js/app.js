let select1 = document.getElementById('select1');
let select2 = document.getElementById('select2');

fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(
   function(response){
     return response.json();
    }
).then(function(jsonData){
    const currencies = jsonData.results;
    for (currency in currencies){
        const currencyId = currencies[currency].id;
        const option = document.createElement("option");
        option.setAttribute("value", currencyId);
        option.text = currencyId;
        select1.appendChild(option);
    }
    for (currency in currencies){
        const currencyId = currencies[currency].id;
        const option = document.createElement("option");
        option.setAttribute("value", currencyId);
        option.text = currencyId;
        select2.appendChild(option);
	}
});