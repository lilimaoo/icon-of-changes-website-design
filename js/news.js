// API Configuration
const API_BASE_URL = 'http://localhost:5000';

// Global news data
const newsData = {
    featured: {
        title: "Breaking Barriers: Women in Tech Leadership",
        category: "Technology",
        date: "March 15, 2024",
        image: "../images/news/featured-news.jpg",
        excerpt: "A groundbreaking study reveals the increasing presence of women in technology leadership roles and their impact on innovation.",
        link: "news-detail.html?id=featured"
    },
    categories: [
        "Technology",
        "Education",
        "Leadership",
        "Innovation",
        "Community"
    ],
    news: [
        {
            id: 1,
            title: "The Future of Remote Work",
            category: "Technology",
            date: "March 10, 2024",
            image: "../images/news/news-1.jpg",
            excerpt: "How remote work is reshaping the workplace and creating new opportunities for women in tech.",
            link: "news-detail.html?id=1"
        },
        {
            id: 2,
            title: "Empowering Women in STEM",
            category: "Education",
            date: "March 8, 2024",
            image: "../images/news/news-2.jpg",
            excerpt: "New initiatives to encourage more women to pursue careers in science, technology, engineering, and mathematics.",
            link: "news-detail.html?id=2"
        },
        {
            id: 3,
            title: "Leadership Development Program",
            category: "Leadership",
            date: "March 5, 2024",
            image: "../images/news/news-3.jpg",
            excerpt: "Launching a comprehensive program to develop the next generation of women leaders in technology.",
            link: "news-detail.html?id=3"
        }
    ]
};

// Function to fetch news from the backend
async function fetchNews() {
    try {
        console.log('Attempting to fetch news from backend...');
        const response = await fetch(`${API_BASE_URL}/news`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.status}`);
        }
        
        const news = await response.json();
        console.log('Fetched news data:', news);
        
        // Update the news grid with the fetched data
        updateNewsGrid(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        showError('Unable to connect to the server. Please make sure the backend server is running.');
    }
}

// Function to update the news grid with fetched data
function updateNewsGrid(news) {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    // Clear existing content
    newsGrid.innerHTML = '';

    // Group news by category
    const newsByCategory = {
        news: [],
        stories: [],
        awards: []
    };

    // Sort news by date (newest first)
    news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Group news items
    news.forEach(article => {
        const category = article.category.toLowerCase();
        if (newsByCategory[category]) {
            newsByCategory[category].push(article);
        } else {
            // If category doesn't exist, add to 'news' category
            newsByCategory.news.push(article);
        }
    });

    // Create pages for each category
    Object.entries(newsByCategory).forEach(([category, articles]) => {
        if (articles.length === 0) return; // Skip empty categories

        const page = document.createElement('div');
        page.className = 'page';
        page.id = `page${category}`;

        articles.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.className = `news-card ${article.category.toLowerCase()}`;
            newsCard.dataset.category = article.category.toLowerCase();
            
            // Handle image path
            const imagePath = article.image.startsWith('http') ? article.image : 
                            article.image.startsWith('/') ? `${API_BASE_URL}${article.image}` : 
                            article.image;

            newsCard.innerHTML = `
                <div class="news-image">
                    <img src="${imagePath}" alt="${article.title}">
                </div>
                <div class="news-details">
                    <div class="news-meta">
                        <span class="news-category">${article.category}</span>
                        <span class="news-date"><i class="far fa-calendar-alt"></i> ${new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3><a href="news-detail.html?id=${article._id}" class="title-link">${article.title}</a></h3>
                    <p>${article.excerpt}</p>
                    <a href="news-detail.html?id=${article._id}" class="text-link">Read More</a>
                </div>
            `;
            page.appendChild(newsCard);
        });

        newsGrid.appendChild(page);
    });

    // Show first page by default
    showPage(1);
}

// Function to show a specific page
function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// Function to show error message
function showError(message) {
    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
        newsGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

// News page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeNewsPage();
    setupSearch();
    
    // Fetch news from backend
    fetchNews();

    // Function to initialize the news page
    function initializeNewsPage() {
        loadFeaturedNews();
        setupCategoryFilters();
        setupSidebar();
    }

    // Setup search functionality
    function setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            // Add input event listener for real-time search
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase().trim();
                searchNews(searchTerm);
            });

            // Add form submit handler
            const searchForm = searchInput.closest('form');
            if (searchForm) {
                searchForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const searchTerm = searchInput.value.toLowerCase().trim();
                    searchNews(searchTerm);
                });
            }
        }
    }

    // Search news function
    function searchNews(searchTerm) {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        const newsItems = newsGrid.querySelectorAll('.news-card');
        let hasVisibleItems = false;

        newsItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const excerpt = item.querySelector('p').textContent.toLowerCase();
            const category = item.querySelector('.news-category').textContent.toLowerCase();
            const date = item.querySelector('.news-date').textContent.toLowerCase();

            // Check if search term matches any of the content
            const matches = title.includes(searchTerm) || 
                          excerpt.includes(searchTerm) || 
                          category.includes(searchTerm) || 
                          date.includes(searchTerm);

            if (matches) {
                item.style.display = 'block';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide no results message
        let noResultsMessage = document.querySelector('.no-results-message');
        if (!hasVisibleItems) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.innerHTML = `
                    <h3>No results found</h3>
                    <p>Try adjusting your search terms or browse all news.</p>
                `;
                newsGrid.parentNode.insertBefore(noResultsMessage, newsGrid);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // Load featured news
    function loadFeaturedNews() {
        const featuredSection = document.querySelector('.featured-news');
        if (featuredSection) {
            const featuredHTML = `
                <div class="featured-card">
                    <div class="featured-image">
                        <img src="${newsData.featured.image}" alt="${newsData.featured.title}">
                    </div>
                    <div class="featured-details">
                        <div class="news-meta">
                            <span class="news-category">${newsData.featured.category}</span>
                            <span class="news-date">
                                <i class="far fa-calendar"></i> ${newsData.featured.date}
                            </span>
                        </div>
                        <h2>${newsData.featured.title}</h2>
                        <p>${newsData.featured.excerpt}</p>
                        <a href="${newsData.featured.link}" class="btn">Read More</a>
                    </div>
                </div>
            `;
            featuredSection.innerHTML = featuredHTML;
        }
    }

    // Setup category filters
    function setupCategoryFilters() {
        const filterContainer = document.querySelector('.category-filter');
        if (filterContainer) {
            const filterHTML = `
                <button class="filter-btn active" data-category="all">All</button>
                ${newsData.categories.map(category => `
                    <button class="filter-btn" data-category="${category.toLowerCase()}">${category}</button>
                `).join('')}
            `;
            filterContainer.innerHTML = filterHTML;

            // Add click event listeners to filter buttons
            const filterButtons = filterContainer.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    // Filter news items
                    filterNews(button.dataset.category);
                });
            });
        }
    }

    // Filter news items based on category
    function filterNews(category) {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        const newsItems = newsGrid.querySelectorAll('.news-card');
        newsItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Setup sidebar
    function setupSidebar() {
        // Categories section
        const categoriesList = document.querySelector('.categories-list');
        if (categoriesList) {
            const categoriesHTML = newsData.categories.map(category => `
                <li>
                    <a href="#" data-category="${category.toLowerCase()}">
                        ${category}
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </li>
            `).join('');
            categoriesList.innerHTML = categoriesHTML;

            // Add click event listeners to category links
            const categoryLinks = categoriesList.querySelectorAll('a');
            categoryLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const category = link.dataset.category;
                    // Update active filter button
                    const filterButtons = document.querySelectorAll('.filter-btn');
                    filterButtons.forEach(btn => {
                        if (btn.dataset.category === category) {
                            btn.click();
                        }
                    });
                });
            });
        }

        // Recent posts section
        const recentPosts = document.querySelector('.recent-posts');
        if (recentPosts) {
            const recentHTML = newsData.news.slice(0, 5).map(item => `
                <li>
                    <a href="${item.link}">
                        ${item.title}
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </li>
            `).join('');
            recentPosts.innerHTML = recentHTML;
        }
    }
});