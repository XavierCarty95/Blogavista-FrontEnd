
let container = document.querySelector("#index-create")
fetch("http://localhost:3000/posts")
.then(r => r.json())
.then(response => {
    response.forEach(element =>{

        renderBlog(element)
    })
})




function renderBlog(blogResp){

    console.log(container)


  let div = document.createElement("div")
  div.classList.add("card-contain")

   let image = document.createElement("img")
   image.classList.add("img")
   image.src = blogResp.author.image_url

   let h2 = document.createElement("h2")
   h2.innerText = "Title: " + blogResp.title

   let datePost = document.createElement("p")
   datePost.innerText = `Posted: ${blogResp.post_date}`

   let h5 = document.createElement("h5")
   h5.innerText = "Author: " +  blogResp.author.name

  let span = document.createElement("span")
  span.innerText = `❤️ ${blogResp.likes}`  

   let p = document.createElement("p")
   p.innerText = blogResp.bio

   let form = document.createElement("form")
   form.classList.add("form-comment")
   let input = document.createElement("input")
   input.name = "comment"
   input.type = "text"
   input.placeholder = "Post Comment Here"
   
   
   let button = document.createElement("button")
   button.innerText = "Post Comment"
   
   form.append(input , button)

   let h6 = document.createElement("h6")
   h6.innerText = "Comment Section"
   
   let ul = document.createElement("ul")
   ul.className = "comments"
   

   let hr = document.createElement("hr")
   hr


   div.append(image , h2 , h5 ,datePost, p , span , form ,h6 , ul ,hr )
   container.append(div)
   console.log(blogResp.author.id)
   
    
   
   blogResp.comments.forEach((resp) => {
    
    let li = document.createElement("li")
    li.innerText = resp.comment
    let button = document.createElement("button")
    button.innerText = 'x'
    button.classList.add("that-btn")
    li.append(button)
    ul.append(li)
    let buttons = li.querySelector(".that-btn")
    blogResp.comments.forEach((resp) => {
        buttons.addEventListener("click" , function(evt){
        console.log(evt.target)
        console.log(resp.id)
        fetch(`http://localhost:3000/comments/${resp.id}`, {

             method: "DELETE"


        })
        .then(r => r.json())
        .then((response) => {

            li.remove()
           console.log(response)

        })


     })

    })
   
})
   
   let formContain = div.querySelector(".form-comment")

 
   formContain.addEventListener("submit" , (e) => {
        
        e.preventDefault()
        let commentResponse = e.target["comment"].value
        console.log(commentResponse)
        formContain.reset()
        fetch("http://localhost:3000/comments",{
             
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                author_id: blogResp.author.id,
                post_id: blogResp.id,
                comment: commentResponse
            })
        })
        .then(r => r.json())
        .then(response => {
            
            console.log(response)
            blogResp.comments.push(response)

    
            let li = document.createElement("li")
            li.innerText = response.comment
            let button = document.createElement("button")
            button.classList.add("that-btn")
            button.innerText = 'x'
            li.append(button)
            ul.append(li)
            let buttons = li.querySelector(".that-btn")
      
        
        blogResp.comments.forEach((resp) => {
        buttons.addEventListener("click" , function(evt){
        console.log(evt.target)
        console.log(resp.id)
        fetch(`http://localhost:3000/comments/${resp.id}`, {

             method: "DELETE"


        })
        .then(r => r.json())
        .then((response) => {

            li.remove()
           console.log(response)

        })


     })

    })

 })

    })

   
   
    

    // let buttons = li.querySelector(".that-btn")
      
    //  buttons.addEventListener("click" , function(evt){
    //     console.log(evt.target)
    //     console.log(resp.id)
    //     fetch(`http://localhost:3000/comments/${resp.id}`, {

    //          method: "DELETE"


    //     })
    //     .then(r => r.json())
    //     .then((response) => {

    //         li.remove()
    //        console.log(response)

    //     })


    //  })

   

  
   
let clickLikes = div.querySelector("span")

   clickLikes.addEventListener("click" , (e) => {
          renderLikes(blogResp ,clickLikes)
   })
  



}


function renderLikes(blogResp , clickLikes)
{


      let newLikes = blogResp.likes + 1
      fetch(`http://localhost:3000/posts/${blogResp.id}`, {
       
       
       method: "PATCH",
       headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
       },
       body: JSON.stringify({
 
          likes: newLikes
       })
       
      })
      .then(r => r.json())
      .then(response => {
          blogResp.likes = response.likes
       clickLikes.innerText =  "❤️ " + blogResp.likes
          
      })
   

 }



