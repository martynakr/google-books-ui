// const bookContainer = document.querySelector(".books-grid__card")

const getBookData = async function(keyword){
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
       
        const data = await response.json();
 return data.items  
 }



      const getInfo = async (data) => {
        const info = await getBookData(data)
        console.log(info)
        const infoArr = info.map(n => {
     const bookObject = {
                title: n.volumeInfo?.title ?? "Title Unknown",
                author: n.volumeInfo?.authors ?? "Author unknown",
                description: n.volumeInfo?.description ?? "Sorry, this book does not have a description.",
                img: n.volumeInfo.imageLinks?.thumbnail ?? "./img/default_book_cover_2.png"} 
                
                if(n.volumeInfo.authors.length > 1) {
                    bookObject.author = n.volumeInfo?.authors.join(", ") 
                }   
                if( n.volumeInfo.description && n.volumeInfo.description.length > 400) {

                    console.log(n.volumeInfo.description.length )
                    const lastDot = n.volumeInfo.description.indexOf(".", 400)
                    console.log(lastDot)
                    bookObject.description = n.volumeInfo.description.slice(0, lastDot) + "."
                } 
                 
 
                return   bookObject 
                
           
           })
        return infoArr
          }
    

const button = document.querySelector("#btn");
button.addEventListener("click", async (event) => {
    // get the keyword from dom

    const input = document.querySelector(".book-finder__input");
    const keyword = input.value;
    if (!keyword) {
        alert("Please enter a vaild keyword");
        return;
    }
    // pass number into getBreeds,
    // getBreeds to return the right page

    // get books, Array<Object>
    const books = await getInfo(keyword);
    console.log(books);
    // create li elements for each breed
    const bookItems = books.map((book) => {
const bookDiv = document.createElement("div")

const imgElement = document.createElement("img");
imgElement.src = `${book.img}`;

        const titleElement = document.createElement("h4");
        const titleText = `${book.title}`;
        const textNode = document.createTextNode(titleText);

        const authorElement = document.createElement("p");
        // authorElement.className = ".author" fix this
        const authorText = `${book.author}`;
        const textNodeAuthor = document.createTextNode(authorText);

        const descElement = document.createElement("p");
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

    // attach those li elements to my ul

    const bookContainer = document.querySelector(".container__books-grid")
    const append = (parent) => (child) => parent.appendChild(child);
    bookItems.forEach(append(bookContainer));
});

