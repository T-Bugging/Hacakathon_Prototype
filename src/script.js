// Configuration - Replace this URL with your actual API endpoint
const API_ENDPOINT = 'https://your-api-endpoint.com/verify';

// Sample news data
const newsData = [
    {
        id: 1,
        title: "Renewable Energy Investments Reach Record High",
        description: "Global investment in renewable energy technologies has surpassed previous records, signaling a major shift towards sustainable power sources.",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop",
        source: "Energy Weekly",
        time: "3 hours ago",
        trustScore: 85
    },
    {
        id: 2,
        title: "New Archaeological Discovery Rewrites History",
        description: "Scientists uncover ancient artifacts that provide new insights into early human civilization and migration patterns.",
        image: "https://images.unsplash.com/photo-1594736797933-d0bd22e7953b?w=400&h=250&fit=crop",
        source: "Archaeological Journal",
        time: "5 hours ago",
        trustScore: 92
    },
    {
        id: 3,
        title: "Tech Giants Announce AI Safety Initiative",
        description: "Major technology companies collaborate on establishing new standards for artificial intelligence development and deployment.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
        source: "Tech Today",
        time: "8 hours ago",
        trustScore: 78
    },
    {
        id: 4,
        title: "Ocean Cleanup Project Shows Promising Results",
        description: "Innovative technology successfully removes significant amounts of plastic waste from marine environments.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
        source: "Environmental Science",
        time: "12 hours ago",
        trustScore: 89
    },
    {
        id: 5,
        title: "Space Mission Discovers Water on Distant Planet",
        description: "NASA's latest probe detects signs of liquid water on an exoplanet, raising possibilities for extraterrestrial life.",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop",
        source: "Space News",
        time: "1 day ago",
        trustScore: 94
    },
    {
        id: 6,
        title: "Medical Breakthrough in Cancer Treatment",
        description: "Researchers develop new immunotherapy approach showing remarkable success rates in clinical trials.",
        image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=250&fit=crop",
        source: "Medical Journal",
        time: "1 day ago",
        trustScore: 91
    }
];

// DOM Elements
const newsGrid = document.getElementById('newsGrid');
const verifyModal = document.getElementById('verifyModal');
const newsTextarea = document.getElementById('newsText');
const charCount = document.getElementById('charCount');
const verifyBtn = document.getElementById('verifyBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const loadingSpinner = document.getElementById('loadingSpinner');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderNewsGrid();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Character counter for textarea
    newsTextarea.addEventListener('input', function() {
        charCount.textContent = this.value.length;
        updateVerifyButton();
    });

    // Close modal when clicking outside
    verifyModal.addEventListener('click', function(e) {
        if (e.target === verifyModal) {
            closeVerifyModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && verifyModal.classList.contains('show')) {
            closeVerifyModal();
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterNews(searchTerm);
    });
}

// Render news grid
function renderNewsGrid() {
    if (!newsGrid) return;

    newsGrid.innerHTML = newsData.map(article => createNewsCard(article)).join('');
}

// Create news card HTML
function createNewsCard(article) {
    const trustClass = getTrustClass(article.trustScore);
    
    return `
        <article class="news-card" onclick="openNewsDetail(${article.id})">
            <img src="${article.image}" alt="${article.title}" class="news-image" loading="lazy">
            <div class="news-content">
                <div class="trust-score ${trustClass}">
                    <span class="trust-number">${article.trustScore}</span>
                    <span class="trust-label">Trust Score</span>
                </div>
                <h3 class="news-title">${article.title}</h3>
                <p class="news-description">${article.description}</p>
                <div class="article-meta">
                    <span class="source">${article.source}</span>
                    <span class="time">${article.time}</span>
                </div>
            </div>
        </article>
    `;
}

// Get trust score class
function getTrustClass(score) {
    if (score >= 80) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
}

// Filter news based on search term
function filterNews(searchTerm) {
    const filteredNews = newsData.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm) ||
        article.source.toLowerCase().includes(searchTerm)
    );
    
    newsGrid.innerHTML = filteredNews.map(article => createNewsCard(article)).join('');
}

// Modal functions
function openVerifyModal() {
    verifyModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    newsTextarea.focus();
}

function closeVerifyModal() {
    verifyModal.classList.remove('show');
    document.body.style.overflow = '';
    resetModalState();
}

function resetModalState() {
    newsTextarea.value = '';
    charCount.textContent = '0';
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    updateVerifyButton();
}

function updateVerifyButton() {
    const hasText = newsTextarea.value.trim().length > 0;
    verifyBtn.disabled = !hasText;
}

// Verify content function
async function verifyContent() {
    const text = newsTextarea.value.trim();
    
    if (!text) {
        showError('Please enter some content to verify');
        return;
    }

    // Reset status messages
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    // Show loading state
    setLoadingState(true);

    try {
        // Make API call to verify content
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                timestamp: new Date().toISOString(),
                source: 'TrustNews Verification Tool'
            })
        });

        if (response.ok) {
            showSuccess();
            // Clear the form after successful submission
            setTimeout(() => {
                closeVerifyModal();
            }, 2000);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Verification error:', error);
        showError('Failed to verify content. Please try again.');
    } finally {
        setLoadingState(false);
    }
}

function setLoadingState(isLoading) {
    if (isLoading) {
        verifyBtn.disabled = true;
        verifyBtn.innerHTML = `
            <div class="spinner-circle" style="width: 16px; height: 16px; border-width: 2px; margin: 0;"></div>
            Verifying...
        `;
        loadingSpinner.classList.remove('hidden');
    } else {
        updateVerifyButton();
        verifyBtn.innerHTML = `
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"></path>
                <circle cx="12" cy="12" r="9"></circle>
            </svg>
            Verify Content
        `;
        loadingSpinner.classList.add('hidden');
    }
}

function showSuccess() {
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
}

// News detail function (placeholder)
function openNewsDetail(articleId) {
    const article = newsData.find(item => item.id === articleId);
    if (article) {
        // In a real application, this would navigate to a detailed view
        console.log('Opening article:', article);
        alert(`Opening article: ${article.title}\n\nThis would navigate to a detailed view in a real application.`);
    }
}

// Handle image loading errors
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop';
    }
}, true);

// Responsive navigation toggle (for mobile menu)
function toggleMobileMenu() {
    // Placeholder for mobile menu functionality
    console.log('Mobile menu toggle');
}

// Utility function to format time
function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
        return 'Just now';
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
}

// Add smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle form submission with Enter key
newsTextarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (!verifyBtn.disabled) {
            verifyContent();
        }
    }
});

// Initialize tooltips and accessibility features
function initializeAccessibility() {
    // Add ARIA labels and roles for better accessibility
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            const icon = button.querySelector('svg');
            if (icon) {
                button.setAttribute('aria-label', 'Button');
            }
        }
    });
}

// Call accessibility initialization
initializeAccessibility();

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}