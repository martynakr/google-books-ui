const searchContainer = document.querySelector('.container__search-form');
const input = document.querySelector(".book-finder__input")
const button = document.querySelector("#btn");

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
    searchContainer.appendChild(againBtn)
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

  export default searchContainer;
  export {renderError, input, button}