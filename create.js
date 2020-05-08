
let div = document.querySelector(".quote")



fetch("https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=10", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "andruxnet-random-famous-quotes.p.rapidapi.com",
		"x-rapidapi-key": "e2a6a5a7a5msh205f51dc28acb98p1ae29ajsn7662dae6283c"
	}
})
.then(r => r.json())
.then(response => {
    console.log(response)
    renderQuote(response)
})
.catch(err => {
	console.log(err);
});


function renderQuote(quoteResp){
    let randNumber = Math.floor(Math.random() * 10) + 1
   let quoteApi =  document.createElement("blockquote")
   quoteApi.innerText = `${quoteResp[randNumber].quote} - `
   let span = document.createElement("span")
   span.classList.add("span-tag")
    span.innerText =  quoteResp[randNumber].author
    quoteApi.append(span) 
   div.append(quoteApi)






}


