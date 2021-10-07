// const request = fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms')

// console.log(request)

const bookContainer = document.querySelectorAll(".container__books-grid")


const getTitle = function(data) {
  const bookTitle = data.items[0].volumeInfo.title
  console.log(bookTitle)
  console.log(data.items.length)
  return bookTitle
}


// const getTitle = function(data) {
//   for(let i=0; i < data.items.length; i++) {
// bookTitle += data.items[i].volumeInfo.title
// console.log(bookTitle)
//   } return bookTitle
// }

const getAuthor = function(data) {
  const bookAuthors = data.items[0].volumeInfo.authors
  if(bookAuthors.length > 1) {
    const allAuthors = bookAuthors.join(", ")
    console.log(allAuthors)

    return allAuthors
  } return bookAuthors
}

// const getAuthor = function(data) {
//   for(let i=0; i < data.items.length; i++) {
// bookAuthor += data.items[i].volumeInfo.authors
// // if(bookAuthors.length > 1) {
// //   const allAuthors = bookAuthors.join(", ")
// //   console.log(allAuthors)

//   }return bookAuthor
// }

  const getDesc = function(data) {
    const bookDesc = data.items[0].volumeInfo.description
    console.log(bookDesc)
    return bookDesc
  }

  // const getDesc = function(data) {
  //   const bookDesc = data.items[0].searchInfo.textSnippet
  //   console.log(bookDesc)
  //   return bookDesc
  // }



  // const getDesc = function(data) {
  //   for(let i=0; i < data.items.length; i++) {
  // bookDesc += data.items[i].volumeInfo.description
  // console.log(bookDesc)
  //   }return bookDesc
  // }

  const getImg = function(data) {
    const bookImg = data.items[0].volumeInfo.imageLinks.thumbnail
    console.log(bookImg)
    return bookImg
  }

  // const getImg = function(data) {
  //   for(let i=0; i < data.items.length; i++) {
  // bookImg += data.items[i].volumeInfo.imageLinks.thumbnail
  // console.log(bookImg)
  // 
  //   }return bookImg
  // }


  


  // do I need to add forEach here
const renderBook = function (data) {

  const html = `
 <div class="books-grid__card">
<div class="books-grid__img">
    <img src="${getImg(data)}" alt="">
</div>
<div class="books-grid__decs">
    <h4>${getTitle(data)}</h4>
    <p class ="author">${ getAuthor(data)}</p>
    <p>${getDesc(data)}</p>
</div>
<div class="books-grid__card--overlay">
    <a href="">Find out more</a>
</div>
</div>
  `;
  bookContainer.forEach(bookContainer => bookContainer.insertAdjacentHTML('beforeend', html));
//  bookContainer.insertAdjacentHTML('beforeend', html);

};
   

 




const getBookData = async function(keyword){
   const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
      
       const data = await response.json();
     
    
       
       console.log(data)
       renderBook(data)
      // getTitle(data)
    
return data
        //  console.log(`The book's author is ${data.items[0].volumeInfo.authors}`)
        //  console.log(`The book's description is ${data.items[0].volumeInfo.description}`)
  
}

console.log(getBookData("Harry Potter"))
// console.log(getBookData("Stanislaw Lem"))
// console.log(getBookData("Crime and Punishment"))
// console.log(getBookData("Franz Kafka"))
// console.log(getBookData("javascript"))




