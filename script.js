const API_KEY = "a7d1093c6b7241e883306fb01a9ef7e9";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
    fetchNews("India");
});

//after clicking on logo we will come on home page
function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data);
}

function bindData(articles){
    const cardContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
    searchText.value = null; //after again clicking on nav items the input text will get empty
    navLinks.classList.toggle("active");
    searchBar.classList.toggle("active")
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
    navLinks.classList.toggle("active");
    searchBar.classList.toggle("active")
})

// hamburger click

const toggleButton = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const searchBar = document.getElementById("search-bar");

toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    searchBar.classList.toggle("active")
})














