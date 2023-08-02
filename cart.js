import { dani } from "./index.js";
console.log(dani);


/*
// Отримуємо дані з URL параметрів
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const chosenID = urlParams.get('chosenID');

// Якщо дані були передані, можемо їх використовувати
if (chosenID) {
  console.log('Отримано дані з index.js:');
  console.log(chosenID);
} else {
  console.log('Дані не були передані з index.js');
  console.log(urlParams);
*/


async function showPage(pageNumber, itemsPerPage) {
    const data = dani;

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = data.slice(startIndex, endIndex);
    console.log(itemsToShow);

    //////////////////////////////////////////////////////////////////
    var TOTAL=0;

    // Виводимо дані на сторінці (наприклад, додаємо їх в <div id="products-container">)
    const container = document.getElementById('products');
    container.innerHTML ='';
    let totall=document.createElement('h5');
    

    itemsToShow.forEach(product => {
        const element = document.createElement('div');
        const block = document.createElement('div');


        let price = document.createElement('p');
        let newParagraph = document.createElement('h6');
        let Count = document.createElement('h6');

        element.className = 'w-2 sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/4 mb-4 bg-gray-400 w-1/3 px-2';
        /*element.textContent = `${product.title}`; // Тут може бути ваш HTML для кожного продукту*/


        newParagraph.textContent= product.title;
        Count.textContent=1;
        
        price.textContent =  product.variants[0].price;
        TOTAL+=Number(price.textContent);
        const button1 = document.createElement('button');
        button1.textContent = '-';
        const button2 = document.createElement('button');
        button2.textContent = '+';

        if (product.images && product.images.length > 0) {
            let picture = document.createElement('img');
            picture.src = product.images[0].src;
            element.appendChild(picture);
            picture.className='w-24';
        } else {
            // Якщо images[0] відсутня або не має елементів, вивести порожній рядок
            let emptyImage = document.createElement('img');
            emptyImage.src = ''; // або можна встановити плейсхолдер для порожньої картинки
            element.appendChild(emptyImage);
        }

        container.appendChild(element);
        element.appendChild(block);
        block.appendChild(newParagraph);
        block.appendChild(price);
        block.appendChild(button1);
        block.appendChild(Count);
        block.appendChild(button2);


        button1.addEventListener('click', () => {
            const n=Number(Count.textContent);
            const pr=Number(price.textContent);
            price.textContent=pr-Number(product.variants[0].price);
            Count.textContent=n-1;
            TOTAL-=Number(product.variants[0].price);
            updateTotalAndDisplay(TOTAL);
        });

        button2.addEventListener('click', () => {
            const n=Number(Count.textContent);
            const pr=Number(price.textContent);
            price.textContent=pr+Number(product.variants[0].price);
            Count.textContent=n+1;
            TOTAL+=Number(product.variants[0].price);
            updateTotalAndDisplay(TOTAL);
        });
    });
    
    totall.textContent=TOTAL;
    container.appendChild(totall);

    /////функція для оновлення повної суми покупки
    async function updateTotalAndDisplay(TOTAL) {
        totall.textContent = TOTAL; // Оновлюємо текст в елементі зі значенням TOTAL
        container.appendChild(totall);
    }
      
}
const pageNumber = 1;
const itemsPerPage = 24;
showPage(pageNumber,itemsPerPage);