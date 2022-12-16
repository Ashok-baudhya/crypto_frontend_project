const form = document.querySelector('#S_form');
const res = document.querySelector('#tableResult');
var update;


form.addEventListener('submit',(e)=>{


    e.preventDefault();
    if(update)
    {
        clearTimeout(update);
    }

    const ctype = form.elements.coin_type.value;

    fetchPrice(ctype);

});

var check = 'bitcoin';
const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}`);

    const price = r.data.coin.price;
    const name = r.data.coin.name;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1h;
    const rank = r.data.coin.rank;
    const curr = 'USD';
    var col ="green";
    if(change<0)
    {
        col = "red";
    }

    // innerHtml used for insert value in html page
    //    res.innerHTML = `${price}`;

    res.innerHTML=`<tr style="background-color:blue ; color:white;  font-weight:700">
    <td style="border: 1px solid ";>property</td>
    <td style="border: 1px solid";>value</td>
</tr>
<tr>
    <td style="border: 1px solid";>${name}</td>
    <td style="color:${col};">${price} ${curr}</td>
</tr>
<tr>
    <td style="border: 1px solid";>Volume (24hrs)</td>
    <td style="border: 1px solid";>${volume}</td>
</tr>
<tr>
    <td style="border: 1px solid";>Change (1hrs)</td>
    <td style="color:${col};">${change} ${curr}</td>
</tr>
<tr>
    <td style="border: 1px solid";>Rank</td>
    <td style="border: 1px solid";>${rank}</td>
</tr>`
 
    update = setTimeout(()=>fetchPrice(ctype),10000);

}
