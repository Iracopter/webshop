async function get_Information() {
    const url = 'https://voodoo-sandbox.myshopify.com/products.json';
    const response = await fetch(url);
    const data = await response.json();
    return data.products;
}

export const dani= await get_Information();


let chosenID=[];


async function showPage(pageNumber, itemsPerPage) {
    const data = await get_Information();

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = data.slice(startIndex, endIndex);
    console.log(itemsToShow);

    // Виведення дані на сторінці 
    const container = document.getElementById('products-container');
    container.innerHTML ='';

    itemsToShow.forEach(product => {

        const element = document.createElement('div');
        let price = document.createElement('p');
        let newParagraph = document.createElement('h6');
        element.className = 'w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/4 mb-4 bg-gray-400 gap-2';
        /*element.textContent = `${product.title}`; // Тут може бути ваш HTML для кожного продукту*/
        newParagraph.textContent= product.title;
        price.textContent =  product.variants[0].price;
        const button = document.createElement('button');
        button.textContent = 'ADD TO CART';
        button.id=product.id;

        const myPopupElement = document.createElement('my-popup');

        // Наприклад, якщо дані для виведення у вікні це `product.title`, ви можете передати їх через атрибут `data`
        myPopupElement.setAttribute('data', product.title);

        // Додаємо елемент `myPopupElement` до блоку `element`
        element.appendChild(myPopupElement);

        if (product.images && product.images.length > 0) {
            let picture = document.createElement('img');
            picture.src = product.images[0].src;
            element.appendChild(picture);
        } else {
            // Якщо images[0] відсутня або не має елементів, вивести порожній рядок
            let emptyImage = document.createElement('img');
            emptyImage.src = ''; // або можна встановити плейсхолдер для порожньої картинки
            element.appendChild(emptyImage);
        }

        container.appendChild(element);
        element.appendChild(newParagraph);
        element.appendChild(price);
        element.appendChild(button);


        button.addEventListener('click', () => {
            alert(button.id);
            chosenID.push(button.id);
            console.log(chosenID);
        });
        const cartLink = document.querySelector('#cart-link'); // Змініть селектор, якщо потрібно
            cartLink.addEventListener('click', () => {
            // Передаємо chosenID в cart.js, використовуючи URL параметр
            const queryString = new URLSearchParams({ chosenID }).toString();
            window.location.href = `./cart.html?${queryString}`;
});
          
    });
    return chosenID;
}




const pageNumber = 1;
const itemsPerPage = 24; // Встановіть бажану кількість елементів на сторінці

async function createPagination() {
    const data = await get_Information();
    // Функція для відображення іншої сторінки при кліку на пагінацію
    function goToPage(pageNumber) {
        showPage(pageNumber, itemsPerPage);
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.textContent = i;
    pageLink.href = '#'; // Або встановіть посилання на потрібний розділ, де буде показуватися сторінка
    pageLink.onclick = () => goToPage(i);
    paginationContainer.appendChild(pageLink);
    }
}

async function init() {
    showPage(pageNumber, itemsPerPage);
    await createPagination(); // Очікуємо, поки створиться пагінація
}


init();


class MyPopup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    
        const popupDiv = document.createElement('div');
        popupDiv.className = 'popup';
        popupDiv.textContent = 'Дані вікна';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Закрити вікно';
        closeButton.style.display = 'none'; // Початково ховаємо кнопку закриття
        closeButton.className = 'close-button'; // Додаємо клас close-button

        closeButton.addEventListener('click', () => {
            this.closePopup();
        });

        const openButton = document.createElement('button');
        openButton.textContent = 'USED';
        openButton.className = 'open-button'; // Додаємо клас open-button
        openButton.addEventListener('click', () => {
            this.showPopupWithData();
            closeButton.style.display = 'block'; // При відкритті вікна з'являємо кнопку закриття
        });
    
        this.shadowRoot.appendChild(popupDiv);
        this.shadowRoot.appendChild(openButton);
        this.shadowRoot.appendChild(closeButton); // Додаємо кнопку закриття в тіньовий DOM
    }
  
    showPopupWithData() {
        // Отримуємо дані, які потрібно вивести у вікні (наприклад, дані з атрибутів)
        const data = dani;
        dani.forEach(product => {
            const popupDiv = this.shadowRoot.querySelector('.popup');
            popupDiv.textContent = `${product.product_type} - ${product.vendor}`;
        });
    }

    closePopup() {
        const popupDiv = this.shadowRoot.querySelector('.popup');
        popupDiv.textContent = 'Дані вікна'; // Очистити вміст вікна при закритті
        const closeButton = this.shadowRoot.querySelector('.close-button'); // Змінили селектор
        closeButton.style.display = 'none'; // Ховаємо кнопку закриття після закриття вікна
    }
}
  
customElements.define('my-popup', MyPopup);



  
