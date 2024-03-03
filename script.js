let data = [];

const tbody = document.getElementById('tbody');
const sortMktBtn = document.getElementById('SortByMktCap');
const sortPerBtn = document.getElementById('SortBypercent');
const searchBar = document.getElementById('seach');

async function fetchData(){
    try{
        const response = await fetch(' https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        data = await response.json();
        // console.log(data);
        renderingTable(data);
    }catch(e){
        console.log(e);
    }
}
fetchData();

function renderingTable(arr){
    tbody.innerHTML = '';
    arr.forEach( data => {
        let row = tbody.insertRow();
        let sign = data.price_change_percentage_24h <=0 ? 'negative':'positive';
        row.innerHTML = `
        <td><img src="${data.image}" alt="..." width='22'>  ${data.id}</td>
        <td>${data.symbol}</td>
        <td>${data.current_price}</td>
        <td>${data.total_volume}</td>
        <td class="${sign}">${data.price_change_percentage_24h}</td>
        <td>Mkt Cap: ${data.market_cap}</td>
        `;
    });
}
sortMktBtn.addEventListener('click' , () =>{
    const sortedArr = data.sort( (a,b) => a.market_cap -b.market_cap );
    renderingTable(sortedArr);
});
sortPerBtn.addEventListener('click' , () =>{
    const sortedArr = data.sort((a,b) => a.price_change_percentage_24h -b.price_change_percentage_24h );
    renderingTable(sortedArr);
});
searchBar.addEventListener('keyup', ()=>{
    const seach = searchBar.value.toLowerCase();
    const filterArr = data.filter(item => {
        const itemName = item.name.toLowerCase();
        const itemSymbol = item.symbol.toLowerCase();
        return itemName.includes(seach) || itemSymbol.includes(seach);
    });
    renderingTable(filterArr);
});