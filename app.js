const BaseUrl=  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button")
const fromcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")

for(let select of dropdowns){
    for (currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag= (element)=>{
        let currcode=element.value;
        let countrycode=countryList[currcode];
        let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    }

const updateExchangeRate = async()=>{
    let amount=document.querySelector(".amount input")
    let amtvalue=amount.value
    if(amtvalue==="" || amtvalue<1){
        amtvalue=1
        amount.value="1"
    }

    const URL=`${BaseUrl}/${fromcurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let f=fromcurr.value.toLowerCase();
    let t=tocurr.value.toLowerCase();
    let data =await response.json()
    let rate=data[f][t];
    
    let finalamt= amtvalue*rate;
    msg.innerText=`${amtvalue} ${fromcurr.value} = ${finalamt} ${tocurr.value}`
}    

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
}) 

window.addEventListener("load", () => {
  updateExchangeRate();
});