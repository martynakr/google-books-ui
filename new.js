// const bookContainer = document.querySelector(".books-grid__card")

const searchContainer = document.querySelector('.container__search-form');
const input = document.querySelector(".book-finder__input")
const button = document.querySelector("#btn");

const againBtn = document.querySelector(".btn-again")
const errorPara = document.querySelector(".error-para")


const renderError = (msg) => {
    const errorPara = document.createElement("p")
    errorPara.className= "error-para"
    const errorText = `${msg}`;
    const errorTextNode = document.createTextNode(errorText);
    errorPara.appendChild(errorTextNode);

    const againBtn = document.createElement("btn")
    againBtn.className = "btn-again"
    const btnText = `Try again`
    const btnTextNode = document.createTextNode(btnText);
    againBtn.appendChild(btnTextNode);
    

    searchContainer.appendChild(errorPara)
    errorPara.appendChild(againBtn)
    input.classList.add("invisible")
    button.classList.add("invisible")

    againBtn.addEventListener("click", () => {
        input.classList.remove("invisible")
        button.classList.remove("invisible")
        input.value = ""
        againBtn.style.display = "none"
        errorPara.style.display= "none"

    })
  };




const getBookData = async function(keyword){
    try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
       
        const data = await response.json();
        if(data.totalItems === 0) throw new Error ("Nothing matches your search criteria.  ")
 return data.items  
 }  catch (err) {
    renderError(`${err.message}`);}}



      const getInfo = async (data) => {
        const info = await getBookData(data)
        // console.log(info)

      
        const infoArr = info.map(n => {
     const bookObject = {
                title: n.volumeInfo?.title ?? "Title Unknown",
                author: n.volumeInfo?.authors ?? "Author unknown",
                description: n.volumeInfo?.description ?? "Sorry, this book does not have a description.",
                img: n.volumeInfo.imageLinks?.thumbnail ?? "./img/default_book_cover_2.png",
                categories: n.volumeInfo?.categories ?? "No caregories provided",
                pageCount: n.volumeInfo?.pageCount ?? "Number of pages unknown",
                publishedDate: n.volumeInfo?.publishedDate ?? "Published date unknown" } 
                
                if(n.volumeInfo.authors && n.volumeInfo.authors.length > 1) {
                    bookObject.author = n.volumeInfo?.authors.join(", ") 
                }   
                if( n.volumeInfo.description !== undefined && n.volumeInfo.description.length > 400) {

                    console.log(n.volumeInfo.description.length )
                    const lastDot = n.volumeInfo.description.indexOf(".", 400)
                    console.log(lastDot)
                    bookObject.description = n.volumeInfo.description.slice(0, lastDot) + "."
                } 
                 
 
                return   bookObject 
                
           
           })
        return infoArr
          }


    


button.addEventListener("click", async (event) => {
    // get the keyword from dom

    const input = document.querySelector(".book-finder__input");
    const keyword = input.value;
    if (!keyword) {
        alert("Please enter a vaild keyword");
        return;
    }


    // get books, Array<Object>
    const books = await getInfo(keyword);
    console.log(books);
    const bookItems = books.map((book) => {
const bookDiv = document.createElement("div")
bookDiv.className = "modal-trigger"

const modalDiv = document.createElement("div")
modalDiv.className = "modal"

const modalContDiv = document.createElement("div")
modalContDiv.className = "modal-content"



        const imgElement = document.createElement("img");
        imgElement.src = `${book.img}`;

        const titleElement = document.createElement("h4");
        const titleText = `${book.title}`;
        const textNode = document.createTextNode(titleText);

        const titleElementModal = document.createElement("h4");
        const titleTextModal = `${book.title}`;
        const textNodeModal = document.createTextNode(titleTextModal);

        const authorElement = document.createElement("p");
        authorElement.className = "author" 
        const authorText = `${book.author}`;
        const textNodeAuthor = document.createTextNode(authorText);

        const descElement = document.createElement("p");
        descElement.className = "description" 
        const descText = `${book.description}`;
        const textNodeDesc = document.createTextNode(descText);


        const categoriesElement = document.createElement("p");
        const categoriesText = `CATEGORY: ${book.categories}`;
        const textNodeCateg = document.createTextNode(categoriesText);

        const pageElement = document.createElement("p");
        const pageText = `PAGE COUNT: ${book.pageCount}`;
        const textNodePage = document.createTextNode(pageText);

        const publishedElement = document.createElement("p");
        const publishedText = `PUBLISHED DATE: ${book.publishedDate}`;
        const textNodePublished = document.createTextNode(publishedText);

        const closeSpan = document.createElement("button")
        closeSpan.className = "close"
        const closeText = `close X`;
        const closeNodeCateg = document.createTextNode(closeText);
       
       


        titleElement.appendChild(textNode);
        authorElement.appendChild(textNodeAuthor);
        descElement.appendChild(textNodeDesc);
        modalDiv.appendChild(modalContDiv)

        titleElementModal.appendChild(textNodeModal)
        modalContDiv.appendChild(titleElementModal)
        categoriesElement.appendChild(textNodeCateg)
        modalContDiv.appendChild(categoriesElement)
        pageElement.appendChild(textNodePage)
        modalContDiv.appendChild(pageElement)
        publishedElement.appendChild(textNodePublished)
        modalContDiv.appendChild(publishedElement)
        closeSpan.appendChild(closeNodeCateg)
        modalContDiv.appendChild(closeSpan)
        

        bookDiv.appendChild(imgElement)
        bookDiv.appendChild(titleElement)
        bookDiv.appendChild(authorElement)
        bookDiv.appendChild(descElement)
        bookDiv.appendChild(modalDiv)
      

        return bookDiv;
    });


    const bookContainer = document.querySelector(".container__books-grid")
    const append = (parent) => (child) => parent.appendChild(child);
    bookItems.forEach(append(bookContainer));

    input.value = ""

    const modalTrigger = document.querySelectorAll(".modal-trigger")
    const modal = document.querySelectorAll(".modal")
    const span = document.querySelectorAll(".close")

modalTrigger.forEach(modalTrigger => modalTrigger.addEventListener("click", () => {
modal.forEach(n => n.style.display = "block")
}))


});

