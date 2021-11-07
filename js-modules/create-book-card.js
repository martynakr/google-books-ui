const createBookCard = (bookItem) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "modal-trigger";

    const imgElement = document.createElement("img");
    imgElement.src = `${bookItem.img}`;

    const titleElement = document.createElement("h4");
    const titleText = `${bookItem.title}`;
    const textNode = document.createTextNode(titleText);

    const authorElement = document.createElement("p");
    authorElement.className = "author";
    const authorText = `${bookItem.author}`;
    const textNodeAuthor = document.createTextNode(authorText);

    const descElement = document.createElement("p");
    descElement.className = "description";
    const descText = `${bookItem.description}`;
    const textNodeDesc = document.createTextNode(descText);

    titleElement.appendChild(textNode);
    authorElement.appendChild(textNodeAuthor);
    descElement.appendChild(textNodeDesc);

    bookDiv.appendChild(imgElement);
    bookDiv.appendChild(titleElement);
    bookDiv.appendChild(authorElement);
    bookDiv.appendChild(descElement);

    return bookDiv;
};

export default createBookCard;