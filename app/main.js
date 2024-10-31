import Text from "./components/text";

const placeholder = document.querySelector(".container__items");
const loadMoreButton = document.querySelector(".button--show-more");
const loader = document.querySelector(".loader");

let allItems = [];
let currentIndex = 0;
const limit = 4;

const fetchData = async () => {
  try {
    loader.classList.remove("loader--hidden");

    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    allItems = data;
    displayProducts();
  } catch (err) {
    console.error("Error:", err);
  } finally {
    loader.classList.add("loader--hidden");
  }
};

const createCard = (item) => {
  const card = document.createElement("div");
  card.className = "item-card";

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = "product image";
  image.className = "item-card__image";

  const title = Text({
    content: item.title,
    tag: "h1",
    classname: "title",
    fontSize: "18px",
    fontWeight: "bold",
  });

  const description = Text({
    content: item.description,
    color: "gray",
    classname: "description",
  });

  const price = Text({
    content: Math.floor(item.price) + "$",
    tag: "h1",
    classname: "price",
  });

  const tag = document.createElement("div");
  tag.className = "tag";
  const tagContent = Text({
    content: item.category,
    color: "#fff",
    fontSize: "14px",
  });
  tag.appendChild(tagContent);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Удалить";
  deleteButton.className = "button button--delete";
  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  card.appendChild(tag);
  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(deleteButton);

  return card;
};

const displayProducts = () => {
  const products = allItems.slice(currentIndex, currentIndex + limit);

  products.forEach((item) => {
    const card = createCard(item);
    placeholder.appendChild(card);
  });

  currentIndex += limit;

  if (currentIndex >= allItems.length) {
    loadMoreButton.classList.add("button--hidden");
  } else {
    loadMoreButton.classList.remove("button--hidden");
  }
};

fetchData();

loadMoreButton.addEventListener("click", displayProducts);
