const apiKey = "114ae2b50fe64a738e221444242410";

let city = document.getElementById("search-bar");  
let results = document.getElementById("results");

city.addEventListener("keydown", (event) => {
    let Url;
    if (event.key === "Enter"){
        Url=`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.value}`;
        console.log(Url);
        fetch(Url)
        // fetch will promise me that when he recives teh respone he will return the json AKA body
        .then((mewo)=>{
            return mewo.json();
        }
        ).then((data) => {
            results.innerHTML = ``;
            let img = document.createElement("img");
            img.src = data.current.condition.icon;
            img.alt = "Weather condition";
            results.appendChild(img);
            let h4 = document.createElement("h4");
            h4.innerText = `${data.current.condition.text} with a Tempereture of ${data.current.temp_c} C`;
            results.appendChild(h4);
        })

}})




console.log("outside promise")


// unlike XHR where it includes all opreations within the object such as XHR.readystate, XHR.responsetext fetch returns a promise that includes a response when fulfillled and use then to work with the response or error when its not fullfiled and use catch to see why its not fullfilled 
