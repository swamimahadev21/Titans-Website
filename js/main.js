// --- DATA ---
// Event data remains here as it's small. For a larger site, this could also be a separate JSON file.
const eventsData = [
    {
        title: 'Freshers Party',
        date: 'July 04, 2025',
        description: 'A vibrant welcome event for first-year students...',
        images: ['assets/F1.jpg', 'assets/F2.jpg']
    },
    {
        title: 'Wall Painting Activity',
        date: 'July 03, 2025',
        description: 'A creative initiative to beautify the campus walls...',
        images: ['assets/W1.jpg', 'assets/W2.jpg', 'assets/W3.jpg', 'assets/W4.jpg', 'assets/W5.jpg', 'assets/W6.jpg', 'assets/W7.jpg', 'assets/W8.jpg']
    },
    {
        title: 'Debate Competition for Second Year Students',
        date: 'July 02, 2025',
        description: 'An engaging debate competition designed for second-year students...',
        images: ['assets/D1.jpg', 'assets/D2.jpg', 'assets/D3.jpg', 'assets/D4.jpg', 'assets/D5.jpg', 'assets/D6.jpg']
    }
];

// --- CORE FUNCTIONS ---

/**
 * Fetches HTML content from a file and inserts it into a container.
 * @param {string} filePath - The path to the HTML file to fetch.
 * @param {string} containerId - The ID of the element to insert the content into.
 * @returns {Promise<void>}
 */
async function loadContent(filePath, containerId) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Could not load ${filePath}: ${response.statusText}`);
        }
        const text = await response.text();
        document.getElementById(containerId).innerHTML = text;
    } catch (error) {
        console.error('Failed to load content:', error);
        document.getElementById(containerId).innerHTML = `<p class="text-center text-red-500">Error: Could not load content.</p>`;
    }
}

/**
 * Fetches and displays a page module.
 * @param {string} pageName - The name of the page (e.g., 'home', 'about').
 */
async function showPage(pageName) {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML = '<p class="text-center">Loading...</p>'; // Show loading indicator
    await loadContent(`pages/${pageName}.html`, 'page-container');
    // After loading, initialize any scripts specific to that page
    initializePageScripts(pageName);
}

// --- INITIALIZATION FUNCTIONS (These run after content is loaded) ---

/**
 * This function adds event listeners to elements that are dynamically loaded.
 * It needs to be called every time a new page is loaded.
 * @param {string} pageName - The name of the currently loaded page.
 */
function initializePageScripts(pageName) {
    // Re-run animations for the new content
    const elementsToAnimate = document.querySelectorAll('#page-container [class*="animate-"]');
    elementsToAnimate.forEach(el => {
        const animationClasses = Array.from(el.classList).filter(cls => cls.startsWith('animate-'));
        el.classList.remove(...animationClasses);
        setTimeout(() => el.classList.add(...animationClasses), 10);
    });

    // Add page-specific listeners
    if (pageName === 'about') {
        initializeAboutSubTabs();
    }
    if (pageName === 'events') {
        initializeEventsPage();
    }
    if (pageName === 'students_corner') {
        initializeStudentsCorner();
    }
    if (pageName === 'alumni') {
        // Staggered animation for alumni cards
        const alumniItems = document.querySelectorAll('#alumni-items .alumni-item');
        alumniItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 70}ms`;
        });
    }
}

function initializeEventsPage() {
    // Show list view by default
    document.getElementById('event-list-view').style.display = 'block';
    document.getElementById('event-detail-view').style.display = 'none';

    // Click listener for event items
    document.querySelectorAll('#past-events-list li').forEach(item => {
        item.addEventListener('click', (event) => {
            const listItem = event.currentTarget;
            if (listItem && listItem.dataset.eventIndex) {
                showEventDetails(parseInt(listItem.dataset.eventIndex));
            }
        });
    });

    // Click listener for "Back" button
    document.getElementById('back-to-events-btn').addEventListener('click', () => {
        document.getElementById('event-detail-view').style.display = 'none';
        document.getElementById('event-list-view').style.display = 'block';
    });
}

function showEventDetails(eventIndex) {
    const event = eventsData[eventIndex];
    if (!event) return;

    document.getElementById('event-list-view').style.display = 'none';
    const detailView = document.getElementById('event-detail-view');
    detailView.style.display = 'block';

    detailView.querySelector('#event-detail-title').textContent = event.title;
    detailView.querySelector('#event-detail-date').textContent = `Date: ${event.date}`;
    detailView.querySelector('#event-detail-description').textContent = event.description;

    const imagesContainer = detailView.querySelector('#event-detail-images');
    imagesContainer.innerHTML = '';
    event.images.forEach((imgSrc, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'bg-red-100 rounded-lg overflow-hidden shadow-md animate-scale-in';
        imgDiv.style.animationDelay = `${index * 70}ms`;
        imgDiv.innerHTML = `<img src="${imgSrc}" alt="${event.title} Image" class="w-full h-auto object-contain rounded-lg" onerror="this.onerror=null; this.src='https://placehold.co/400x300/A60000/FFFFFF?text=Image+Error';">`;
        imagesContainer.appendChild(imgDiv);
    });
}

function initializeAboutSubTabs() {
    const subNavButtons = document.querySelectorAll('.about-sub-nav-item');
    const subContents = document.querySelectorAll('.about-sub-content');

    function switchTab(targetId) {
        subContents.forEach(content => content.style.display = 'none');
        subNavButtons.forEach(btn => btn.classList.remove('active'));

        document.getElementById(targetId).style.display = 'block';
        const activeButton = document.querySelector(`.about-sub-nav-item[data-target="${targetId}"]`);
        if (activeButton) activeButton.classList.add('active');
    }

    subNavButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.target));
    });
    // Show the first tab by default
    if (subNavButtons.length > 0) {
        switchTab(subNavButtons[0].dataset.target);
    }
}

function initializeStudentsCorner() {
    const mainSubNav = document.querySelectorAll('.students-corner-sub-nav-item');
    const mainSubContent = document.querySelectorAll('.students-corner-sub-content');
    const yearSubNav = document.querySelectorAll('.committee-year-sub-nav-item');
    const yearSubContent = document.querySelectorAll('.committee-year-content');

    function switchMainTab(targetId) {
        mainSubContent.forEach(content => content.style.display = 'none');
        mainSubNav.forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(targetId).style.display = 'block';
        const activeButton = document.querySelector(`.students-corner-sub-nav-item[data-target="${targetId}"]`);
        if (activeButton) activeButton.classList.add('active');
        
        if (targetId === 'students-committee-sub-container' && yearSubNav.length > 0) {
            switchYearTab(yearSubNav[0].dataset.target);
        }
    }

    function switchYearTab(targetId) {
        yearSubContent.forEach(content => content.style.display = 'none');
        yearSubNav.forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(targetId).style.display = 'block';
        const activeButton = document.querySelector(`.committee-year-sub-nav-item[data-target="${targetId}"]`);
        if (activeButton) activeButton.classList.add('active');
    }

    mainSubNav.forEach(button => {
        button.addEventListener('click', () => switchMainTab(button.dataset.target));
    });

    yearSubNav.forEach(button => {
        button.addEventListener('click', () => switchYearTab(button.dataset.target));
    });

    // Show the first main tab by default
    if (mainSubNav.length > 0) {
        switchMainTab(mainSubNav[0].dataset.target);
    }
}

function initializeEnquiryForm() {
    const enquirySubmitBtn = document.getElementById('enquiry-submit-btn');
    if (!enquirySubmitBtn) return;

    enquirySubmitBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('enquiry-name');
        const emailInput = document.getElementById('enquiry-email');
        const mobileInput = document.getElementById('enquiry-mobile');

        if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || mobileInput.value.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        console.log('Enquiry Submitted:', { name: nameInput.value, email: emailInput.value, mobile: mobileInput.value });
        nameInput.value = '';
        emailInput.value = '';
        mobileInput.value = '';

        const successPopup = document.getElementById('success-popup');
        successPopup.style.display = 'block';
        setTimeout(() => { successPopup.style.display = 'none'; }, 3000);
    });
}


// --- MAIN EXECUTION ---
// This runs once when the page first loads.
document.addEventListener('DOMContentLoaded', async () => {
    // Load reusable partials
    await loadContent('partials/navbar.html', 'navbar-container');
    await loadContent('partials/enquiry.html', 'enquiry-container');
    await loadContent('partials/footer.html', 'footer-container');
    
    // Set up listeners for static content (navbar, enquiry, footer)
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            showPage(button.dataset.page);
        });
    });
    
    initializeEnquiryForm();
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Load the home page by default
    await showPage('home');
});