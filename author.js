let authorsList = document.getElementById("authors")
let authorsClass = document.querySelector(".authors-list")
let container = document.querySelector(".container")
let listTitle = document.querySelector(".all")


fetch("http://localhost:3000/authors")
.then(r => r.json())
.then(response => {
    
     response.forEach(element => {
          renderHTML(element)

     });


})


function renderHTML(authors) {

let div = document.createElement("div")
div.classList.add("list-contain")

 let li = document.createElement("li")
 li.innerText = authors.name
 li.classList.add("list")

 let p = document.createElement("p")
 p.id = "post-text"
 p.innerText = `${authors.posts.length} post`

 div.append(li , p)
 authorsList.append(div )
 


 let authorsClick = div.querySelector("li")
  
  authorsClick.addEventListener("click" , function(evt){
      evt.preventDefault()
       authorsPost(authors , container)
      


  })

}


function authorsPost(authors ,container){
   authorsList.remove()
   console.log("hello")
   listTitle.innerText = `${authors.name} Post's`
   let p = document.createElement("p")
   let h2 = document.createElement("h2")
   h2.classList.add("center-align")
   let ul = document.createElement("ul")
   ul.classList.add("li-display")
   
   authors.posts.forEach(element => {
       h2.innerText = `Title:  ${element.title}`
       p.innerText =  element.bio
       element.comments.forEach(com => {
           console.log(com.comment)
           ul.innerHTML += `<li> ${com.comment} </li>`
       })

   })
    
   container.append(h2 , p , ul)
        
         




    
    


}