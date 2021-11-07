import {renderError} from "./render-error.js";

const getInfo = async (data) => {
    const info = await getBookData(data) 
    if(info === undefined) throw new Error ("Nothing matches your search criteria.  ")  
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


const getBookData = async function(keyword){
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
                       
        const data = await response.json();
        if(data.totalItems === 0) throw new Error ("Nothing matches your search criteria.  ")
            return data.items  
    }  catch (err) {
        renderError(`${err.message}`);}}
                

export default getBookData;
export {getInfo}