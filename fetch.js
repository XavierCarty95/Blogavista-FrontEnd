let formCreate = document.querySelector("#create-form")

formCreate.addEventListener("submit" , function(evt){
   evt.preventDefault()
   let author = evt.target["author"].value
   let image = evt.target["image"].value
   let newTitle = evt.target["title"].value
   let description = evt.target["description"].value
   let postBio =  evt.target["bio"].value
    formCreate.reset()
     
    fetch("http://localhost:3000/authors",{

       method: "POST",
       headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
       },
       body: JSON.stringify({
 
         name: author, 
         image_url: image,
       })
       
       })
       .then(r => r.json())
       .then(response => {
           console.log(response)
        fetch("http://localhost:3000/posts",{

               method: "POST",
               headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
               },
               body: JSON.stringify({
         
                 title : newTitle,
                 description: description,
                 bio: postBio,
                 likes: 0,
                 author_id: response.id
               })
            
             })
             .then(r => r.json())
             .then(response => {
                 console.log(response)
                 let newArray  = []
                 newArray.push(response.author.posts , response)
                 fetch(`http://localhost:3000/authors/${response.author.id}`,{

                   method: "PATCH",
                   headers: {
                   "Content-Type": "application/json",
                   "Accept": "application/json"
                   },
                   body: JSON.stringify({
             
                     posts:  newArray
                   })
                   

                  })
                   .then(r => r.json())
                   .then(response => {
                     
                   posts = response.posts
                   console.log(response)
                     
                 
             })
         })
       })

    })  

  