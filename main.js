import {getInfo} from "./js-modules/data.js";
import  { button} from "./js-modules/render-error.js";
import  createBookCard from "./js-modules/create-book-card.js";

button.addEventListener("click", async (event) => {
    const input = document.querySelector(".book-finder__input");
    const keyword = input.value;
    if (!keyword) {
        alert("Please enter a vaild keyword");
        return;
    }
    const books = await getInfo(keyword);
    console.log(books);
    const bookItems = books.map((book) => createBookCard(book));

    const bookContainer = document.querySelector(".container__books-grid");
    const append = (parent) => (child) => parent.appendChild(child);
    bookItems.forEach(append(bookContainer));

    input.value = "";
});


console.log('Its working')