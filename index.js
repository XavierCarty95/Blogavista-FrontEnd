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
 

   

   blogResp.comments.forEach((resp) => {
    let li = document.createElement("li")
    li.innerText = resp.comment
    ul.append(li)
    

   })
   
   let hr = document.createElement("hr")
   hr


   div.append(image , h2 , h5 ,datePost, p , span , form ,h6 , ul ,hr )
   container.append(div)
   console.log(blogResp.author.id)

  
    
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
            
            blogResp.comments.push(response)
            //toy.likes = updatedToy.likes
    
            let li = document.createElement("li")
            li.innerText = response.comment
            ul.append(li)


        })



   })

   

 
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



