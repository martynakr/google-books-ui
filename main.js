import {getInfo} from "./non-dom.js";
import  { button} from "./dom.js";

button.addEventListener("click", async (event) => {
    const input = document.querySelector(".book-finder__input");
    const keyword = input.value;
    if (!keyword) {
        alert("Please enter a vaild keyword");
        return;
    }
    const books = await getInfo(keyword);
    console.log(books);
    const bookItems = books.map((book) => {
    const bookDiv = document.createElement("div")
    bookDiv.className = "modal-trigger"

        const imgElement = document.createElement("img");
        imgElement.src = `${book.img}`;

        const titleElement = document.createElement("h4");
        const titleText = `${book.title}`;
        const textNode = document.createTextNode(titleText);


        const authorElement = document.createElement("p");
        authorElement.className = "author" 
        const authorText = `${book.author}`;
        const textNodeAuthor = document.createTextNode(authorText);

        const descElement = document.createElement("p");
        descElement.className = "description" 
        const descText = `${book.description}`;
        const textNodeDesc = document.createTextNode(descText);

        titleElement.appendChild(textNode);
        authorElement.appendChild(textNodeAuthor);
        descElement.appendChild(textNodeDesc);


        bookDiv.appendChild(imgElement)
        bookDiv.appendChild(titleElement)
        bookDiv.appendChild(authorElement)
        bookDiv.appendChild(descElement)
 
        return bookDiv;
    });


    const bookContainer = document.querySelector(".container__books-grid")
    const append = (parent) => (child) => parent.appendChild(child);
    bookItems.forEach(append(bookContainer));

   
    input.value = ""


    // const modalTrigger = document.querySelectorAll(".modal-trigger")
    // modalTrigger.forEach(modalTrigger => modalTrigger.addEventListener("click",async (e) => {

    //     const modalDiv = document.createElement("div")
    //     modalDiv.className = "modal"
    //     const modalContDiv = document.createElement("div")
    //     modalContDiv.className = "modal-content"
       
       
    //     const books = await getInfo(keyword);
    //     console.log(books);
    //     const bookItems = books.map((book) => {
         
       
    //     const pageElement = document.createElement("p");
    //     const pageText = `PAGE COUNT: ${book.pageCount}`;
    //     const textNodePage = document.createTextNode(pageText);
    //     pageElement.appendChild(textNodePage)
    //     modalContDiv.appendChild(pageElement)
       
    //     // const publishedElement = document.createElement("p");
    //     // const publishedText = `PUBLISHED DATE: ${book.publishedDate}`;
    //     // const textNodePublished = document.createTextNode(publishedText);
    //     })
       
    //     const closeEl = document.createElement("button")
    //     closeEl.className = "close"
    //     const closeText = `x`;
    //     const closeNodeCateg = document.createTextNode(closeText);
       
        
    //     //     // elements inside the modal
    //         closeEl.appendChild(closeNodeCateg)
    //     //     titleElementModal.appendChild(textNodeModal)
    //     //     categoriesElement.appendChild(textNodeCateg)
    //     //     publishedElement.appendChild(textNodePublished)
        
       
    //     bookContainer.appendChild(modalDiv)
    //     modalDiv.appendChild(modalContDiv)
    //     // modalContDiv.appendChild(publishedElement)
       
    //     modalContDiv.appendChild(closeEl)
       
    //     // modalContDiv.appendChild(titleElementModal)
    //     // modalContDiv.appendChild(categoriesElement)
       
    //     const modal = document.querySelector(".modal")
    //     const close = document.querySelector(".close")
    //     modal.style.display = "block";
    //     close.addEventListener("click", () => {
    //         modal.remove()
    //     })
    //     window.onclick = function(event) {
    //         if (event.target == modal) {
    //             modal.remove()
    //         }
    //       }
       
    //    }))

});





 

