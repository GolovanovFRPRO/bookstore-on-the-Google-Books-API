//displayBooks.js
import starGray from '../img/starGray.svg';
import starGold from '../img/StarGold.svg';
const booksList = document.querySelector(".books__cards");


const displayBooks = (booksArray) => {
  booksArray.forEach(book => {
    let author;
    if (!book.authors) {
      author = "Unknown Author";
    } else if (book.authors.length == 1) {
      author = book.authors[0];
    } else if (book.authors.length > 1) {
      author = book.authors.join(", ");
    }

    let reviews;
    if (book.reviews) {
      reviews = book.reviews;
    } else {
      reviews = 0;
    }

    let description;
    const maxLength = 70;

    if (!book.description) {
      description = "";
    } else {
      if (book.description.length <= maxLength) {
        description = book.description.trim();
      } else {
        description = book.description.slice(0, maxLength).trim() + "...";
      }
    }
    
    const bookCard = `
      <li class="books__card" id="${book.id}">
        <img src="${book.coverUrl}" alt="${book.title} book cover" class="books__card-img">
        <div class="books__info-box">
          <p class="books__author">${author}</p>
          <p class="books__title">${book.title}</p>
          <span class="books__reviews">
            <div class="review-stars">
              <img src="${starGray}" class="review-star">
              <img src="${starGray}" class="review-star">
              <img src="${starGray}" class="review-star">
              <img src="${starGray}" class="review-star">
              <img src="${starGray}" class="review-star">
            </div>
            ${reviews} reviews
          </span>
          <p class="books__about">${description}</p>
          <p class="books__price">${book.currency} ${book.price}</p>
          <button id="${book.id}" class="books__btn btn">buy now</button>
        </div>
      </li>
    `;
    booksList.insertAdjacentHTML("beforeend", bookCard);

    const currentBook = document.getElementById(book.id);
    let stars = Array.from(currentBook.querySelectorAll(".review-star"));
    if (book.rating && book.reviews) {
      if (!Number.isInteger(book.rating)) {
        book.rating = Math.floor(book.rating);
      }
      switch (book.rating) {
        case 1:
          stars[0].src = starGold;
          break;
        case 2:
          stars[0].src = starGold;
          stars[1].src = starGold;
          break;
        case 3:
          stars[0].src = starGold;
          stars[1].src = starGold;
          stars[2].src = starGold;
          break;
        case 4:
          stars[0].src = starGold;
          stars[1].src = starGold;
          stars[2].src = starGold;
          stars[3].src = starGold;
          break;
        case 5:
          stars[0].src = starGold;
          stars[1].src = starGold;
          stars[2].src = starGold;
          stars[3].src = starGold;
          stars[4].src = starGold;
          break;
        default:
          console.log("default");
      }
    }
    stars = [];
  });

    const btns = Array.from(document.querySelectorAll(".books__btn"));
  const container = document.querySelector(".shop-bag .items-number");
  
  btns.forEach(btn => {
    // начальная установка по сохраненным элементам
    if (Object.prototype.hasOwnProperty.call(localStorage, btn.id)) {
        btn.classList.add("pressed");
        btn.innerHTML = "in the cart";
    }

    // обновляем счетчик
    const updateCartCount = () => {
        const itemsCount = Object.keys(localStorage).length;
        container.innerHTML = itemsCount > 0 ? itemsCount : "";
        container.style.display = itemsCount > 0 ? "flex" : "none";
    };

    btn.addEventListener("click", () => {
        const idName = btn.id;
        if (!btn.classList.contains("pressed")) {
            btn.innerHTML = "in the cart";
            btn.classList.add("pressed");
            localStorage.setItem(idName, btn.id);
        } else if (btn.classList.contains("pressed")) {
            btn.innerHTML = "buy now";
            btn.classList.remove("pressed");
            localStorage.removeItem(idName, btn.id);
        }
        updateCartCount(); // Обновляем счетчик при каждом изменении
    });

    updateCartCount(); // Начальная установка счетчика
  });
};

export { booksList, displayBooks};