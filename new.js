// const bookContainer = document.querySelector(".books-grid__card")

const getBookData = async function(keyword){
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
       
        const data = await response.json();
 return data.items  
 }

//  console.log(getBookData("lem"))


const getInfo = async (data) => {
    const info = await getBookData(data)
    console.log(info)
    const infoArr = info.map(n => {


        if(n.volumeInfo.imageLinks === undefined) {
            const bookObject = {
                title: n.volumeInfo.title,
                author: n.volumeInfo.authors,
                description:n.volumeInfo.description,
                img: "https://cdn.pixabay.com/photo/2015/07/23/14/58/child-857021_960_720.jpg"}  
                console.log(`This is book object${bookObject}`)
                return bookObject //why doesn't this work
            
        }

        const bookObject = {
            title: n.volumeInfo.title,
            author: n.volumeInfo.authors,
            description: n.volumeInfo.description,
            img: n.volumeInfo.imageLinks.thumbnail}
            // console.log(`This is img link ${bookObject.image}`)

        
    if(n.volumeInfo.authors.length > 1) {
        const bookObject = {
            title: n.volumeInfo.title,
            author: n.volumeInfo.authors.join(", "),
            description: n.volumeInfo.description,
            img: n.volumeInfo.imageLinks.thumbnail
        }  
            return bookObject
    }

    if(n.volumeInfo.description === undefined || n.volumeInfo.description === "") {
        const bookObject = {
            title: n.volumeInfo.title,
            author: n.volumeInfo.authors,
            description: `Sorry, this book does not have a description`,
            img: n.volumeInfo.imageLinks.thumbnail
        }  
            return bookObject
    }

  
    if(n.volumeInfo.description.length > 1000) {
        const lastSpace = n.volumeInfo.description.indexOf(" ", 1000);
        console.log(lastSpace)
        const bookObject = {
            title: n.volumeInfo.title,
            author: n.volumeInfo.authors,
            description: n.volumeInfo.description.slice(0, lastSpace + "..."),
            img: n.volumeInfo.imageLinks.thumbnail
         } 
     console.log(bookObject.description)
            return bookObject 
    }



return   bookObject})


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

