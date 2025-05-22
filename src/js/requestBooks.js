//requestBooks.js

import { displayBooks, booksList } from "./displayBooks.js";

const myKey = "AIzaSyDu0KEdd-oYXw211GDcukjh-oYahKmtGIc";
const categories = Array.from(document.querySelectorAll(".books__category"));
const loadBtn = document.querySelector(".books__load-btn");

const requestBooks = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    const items = data.items;
    let books = [];

    items.forEach(item => {
      const volumeInfo = item.volumeInfo;
      const saleInfo = item.saleInfo;
      let bookInfo = {};
      bookInfo.id = item.id;
      bookInfo.title = volumeInfo.title;
      bookInfo.authors = volumeInfo.authors;

      if (!volumeInfo.imageLinks) {
        bookInfo.coverUrl = "./img/no-image.png";
      } else {
        bookInfo.coverUrl = volumeInfo.imageLinks.thumbnail;
      }

      bookInfo.description = volumeInfo.description;
      bookInfo.rating = volumeInfo.averageRating;
      bookInfo.reviews = volumeInfo.ratingsCount;

      if (saleInfo.saleability === "FREE" || (saleInfo.saleability === "FOR_SALE" && saleInfo.listPrice.amount === 0)) {
        bookInfo.price = "free";
        bookInfo.currency = "";
      } else if (saleInfo.saleability === "FOR_SALE") {
        bookInfo.price = saleInfo.listPrice.amount;
        bookInfo.currency = saleInfo.listPrice.currencyCode;
      } else if (saleInfo.saleability === "NOT_FOR_SALE") {
        bookInfo.price = "not for sale";
        bookInfo.currency = "";
      }

      books.push(bookInfo);
    });

    displayBooks(books);
  } catch (error) {
    console.error("Error fetching books:", error.message);
  }
};

const loadMore = (bookCategory) => {
  const bookCards = Array.from(document.querySelectorAll(".books__card"));
  const currentBooksAmount = bookCards.length;
  let currentUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${bookCategory}"&key=${myKey}&printType=books&startIndex=${currentBooksAmount}&maxResults=6&langRestrict=en`;
  requestBooks(currentUrl);
};

window.addEventListener("DOMContentLoaded", () => {
  let currentCategory = categories[0].innerHTML;
  const defaultUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${currentCategory}"&key=${myKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
  requestBooks(defaultUrl);
  
  categories.forEach(category => {
    const categoryName = category.innerHTML;
    let currentUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${categoryName}"&key=${myKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
    category.addEventListener("click", () => {
      currentCategory = category.innerHTML;
      categories.forEach(item => {
        item.classList.remove("active");
      });
      category.classList.add("active");
      booksList.innerHTML = " ";
      requestBooks(currentUrl);
    });
  });
  loadBtn.addEventListener("click", () => {
    loadMore(currentCategory);
  });
});

export {requestBooks};