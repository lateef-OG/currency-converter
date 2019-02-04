let selectFrom = document.getElementById('select-from');
let selectTo = document.getElementById('select-to');
let input = document.getElementById('input-amount');
let output =  document.getElementById('output');

fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(
   response => response.json()
).then(jsonData => {
    const currencies = jsonData.results;
    // currencies.sort();
    console.log(currencies);
    for (currency in currencies){
        console.log(currencies[currency])
        const currencyId = currencies[currency].id;
        const currencyName = currencies[currency].currencyName;
        const option = document.createElement("option");
        option.setAttribute("value", currencyId);
        option.text = `${currencyName} (${currencyId})`;
        selectFrom.appendChild(option);
    }
    for (currency in currencies){
        const currencyId = currencies[currency].id;
        const currencyName = currencies[currency].currencyName;
        const option = document.createElement("option");
        option.setAttribute("value", currencyId);
        option.text = `${currencyName} (${currencyId})`;
        selectTo.appendChild(option);
	}
});

function convertCurrency(rate){
    if(input.value == "" || input == null){
        alert('Please enter a value');
    }else{
        let result = rate * input.value;
        result = Math.round(result * 100) / 100;
        output.innerHTML = result;
    }
}

function handleClick(){
    const cId1 = selectFrom.options[selectFrom.selectedIndex].value;
    const cId2 = selectTo.options[selectTo.selectedIndex].value;
    let query = `${cId1}_${cId2}`;
    let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`
    
    const dbPromise = idb.open('converter', 1, upgradeDb => {
        const store = upgradeDb.createObjectStore('rates', {keyPath: 'query'});
        store.createIndex('id', 'query')
    });

    fetch(url).then(
        response => response.json()
    ).then(jsonData => {
        dbPromise.then(db => {
            const tx = db.transaction('rates', 'readwrite');
            const store = tx.objectStore('rates');
            store.put({
                query,
                rates: jsonData[query]
            });
            return tx.complete;
        });
        
        const conversionRate = jsonData[query];
        convertCurrency(conversionRate);

    }).catch((error) => {
        dbPromise.then(db => {
            let tx = db.transaction('rates');
            let store = tx.objectStore('rates');
            return store.getAll(query);
        }).then(rates => {
            if(rates.length === 0){
                alert('Something went wrong, please try again later');
            }else{
                for (rate in rates){
                    const conversionRate = rates[rate].rates;
                    convertCurrency(conversionRate);
                }
            }
        })
    });
}