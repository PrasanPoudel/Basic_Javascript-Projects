const API_KEY = 'b6b0e340c6de4f339ee18cd875f4d03e';

let currentPage = 1;
let currentCategory = 'general'; // Default to 'General' category
let currentKeyword = null; // Used for searching
let isLoading = false;
let totalArticles = 0;
const articlesPerPage = 10;

function fetchNews() {
    let url;
    if (currentKeyword) {
        // Search mode
        url = `https://newsapi.org/v2/everything?q=${currentKeyword}&apiKey=${API_KEY}&pageSize=${articlesPerPage}&page=${currentPage}`;
    } else {
        // Category mode
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${currentCategory}&apiKey=${API_KEY}&pageSize=${articlesPerPage}&page=${currentPage}`;
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
        totalArticles = data.totalResults;
        const newsContainer = document.getElementById('newsContainer');
        
        // Clear the news container for each new page
        newsContainer.innerHTML = '';
        
        const articlesWithImage = data.articles.filter(article => article.urlToImage);
        
        articlesWithImage.forEach(article => {
            const newsItem = `
            <div class="newsItem">
            <div class="newsImage">
            <img src="${article.urlToImage}" alt="${article.title}">
            </div>
            <div class="newsContent">
            <div class="info">
            <h5>${article.source.name}</h5>
            <span>|</span>
            <h5>${new Date(article.publishedAt).toLocaleDateString()}</h5>
            </div>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
            </div>
            </div>
            `;
            newsContainer.innerHTML += newsItem;
            document.getElementById('pagination').style.display="flex";
        });
        
        updatePagination();
    })
        .catch(error => {
            console.error("There was an error fetching the news:", error);
        });
}

function updatePagination() {
    const pageInfo = document.getElementById('pageInfo');
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage >= totalPages;
}

window.onload = function () {
    fetchNews();
     // Fetch news for the default category 'General' on load
}

document.getElementById('searchKeyword').addEventListener('input', function () {
    currentPage = 1; // Reset to the first page on new search
    currentCategory = null; // Clear the selected category
    currentKeyword = this.value;
    fetchNews();
});

document.getElementById('category').addEventListener('change', function () {
    currentPage = 1; // Reset to the first page on category change
    currentKeyword = null; // Clear the search keyword
    currentCategory = this.value;
    fetchNews();
});

document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        fetchNews();
    }
});

document.getElementById('nextPage').addEventListener('click', function () {
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        fetchNews();
    }
});
