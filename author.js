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
console.log(authors)
let div = document.createElement("div")
div.classList.add("list-contain")

let image = document.createElement("img")
image.classList.add("authors-img")
   image.src = authors.image_url

 let li = document.createElement("li")
 li.innerText = authors.name
 li.classList.add("list")



 let p = document.createElement("p")
 p.id = "post-text"

 if(authors.posts.length == 1){
 p.innerText = `${authors.posts.length} post`
 } else {
    p.innerText = `${authors.posts.length} posts`
 }
 div.append(image , li , p)
 authorsList.append(div )
 


 let authorsClick = div.querySelector("li")
  
  authorsClick.addEventListener("click" , function(evt){
      evt.preventDefault()
       authorsPost(authors , container)
      


  })

}


function authorsPost(authors ,container){
   authorsList.remove()
   
//    let image = document.createElement("img")
//    image.classList.add("main-img")
//    image.src = authors.image_url
   console.log("hello")
   listTitle.innerText = `${authors.name} Post's`
   
   authors.posts.forEach(element => {
    let image = document.createElement("img")
    let p = document.createElement("p")
   let h2 = document.createElement("h2")
   h2.classList.add("center-align")
   let ul = document.createElement("ul")
   ul.classList.add("li-display")
   let h3 = document.createElement("h3")
   h3.innerText = "Comments"
    image.classList.add("main-img")
    image.src = authors.image_url
       h2.innerText = `Title:  ${element.title}`
       p.innerText =  element.bio
       let span = document.createElement("span")
       span.innerText = `${element.likes} likes`
       span.style.color = "grey"
       span.style.fontStyle = "italic"
       
       element.comments.forEach(com => {
           console.log(com.comment)
           ul.innerHTML += `<li> ${com.comment} </li>`
       })
       container.append(image ,h2 , p , span, h3 , ul)
        
   })
    
   
        
         




    
    


}