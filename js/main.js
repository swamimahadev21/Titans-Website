// // --- DATA ---
// const eventsData = [
//     {
//         title: 'Freshers Party',
//         date: 'July 04, 2025',
//         description: 'A vibrant welcome event for first-year students...',
//         images: ['assets/F1.jpg', 'assets/F2.jpg']
//     },
//     {
//         title: 'Wall Painting Activity',
//         date: 'July 03, 2025',
//         description: 'A creative initiative to beautify the campus walls...',
//         images: ['assets/W1.jpg', 'assets/W2.jpg', 'assets/W3.jpg', 'assets/W4.jpg', 'assets/W5.jpg', 'assets/W6.jpg', 'assets/W7.jpg', 'assets/W8.jpg']
//     },
//     {
//         title: 'Debate Competition for Second Year Students',
//         date: 'July 02, 2025',
//         description: 'An engaging debate competition designed for second-year students...',
//         images: ['assets/D1.jpg', 'assets/D2.jpg', 'assets/D3.jpg', 'assets/D4.jpg', 'assets/D5.jpg', 'assets/D6.jpg']
//     }
// ];

// // --- CORE FUNCTIONS ---

// async function loadContent(filePath, containerId) {
//     try {
//         const response = await fetch(filePath);
//         if (!response.ok) throw new Error(`Could not load ${filePath}: ${response.statusText}`);
//         const text = await response.text();
//         document.getElementById(containerId).innerHTML = text;
//     } catch (error) {
//         console.error('Failed to load content:', error);
//         document.getElementById(containerId).innerHTML = `<p class="text-center text-red-500">Error: Could not load content.</p>`;
//     }
// }

// async function showPage(pageName) {
//     const pageContainer = document.getElementById('page-container');
//     pageContainer.innerHTML = ''; // Clear previous content

//     await loadContent(`pages/${pageName}.html`, 'page-container');
//     initializePageScripts(pageName);

//     // Update active nav button
//     document.querySelectorAll('.nav-button').forEach(btn => {
//         btn.classList.toggle('active', btn.dataset.page === pageName);
//     });
// }

// // --- INITIALIZATION FUNCTIONS ---

// function initializePageScripts(pageName) {
//     const elementsToAnimate = document.querySelectorAll('#page-container [class*="animate-"]');
//     elementsToAnimate.forEach(el => {
//         const animationClasses = Array.from(el.classList).filter(cls => cls.startsWith('animate-'));
//         el.classList.remove(...animationClasses);
//         setTimeout(() => el.classList.add(...animationClasses), 10);
//     });

//     if (pageName === 'home') {
//         initializeHomepageSlider();
//     }
//     if (pageName === 'about') {
//         initializeAboutSubTabs();
//     }
//     if (pageName === 'events') {
//         initializeEventsPage();
//     }
//     if (pageName === 'students_corner') {
//         initializeStudentsCorner();
//     }
//     if (pageName === 'alumni') {
//         const alumniItems = document.querySelectorAll('#alumni-items .alumni-item');
//         alumniItems.forEach((item, index) => {
//             item.style.animationDelay = `${index * 70}ms`;
//         });
//     }
// }

// /**
//  * Initializes the automated image slider on the home page with manual navigation controls.
//  */
// function initializeHomepageSlider() {
//     const slides = document.getElementsByClassName("slide");
//     const prevBtn = document.querySelector(".prev-arrow");
//     const nextBtn = document.querySelector(".next-arrow");

//     // Safety Check: Only run if slides and buttons exist
//     if (slides.length > 0 && prevBtn && nextBtn) {
//         let slideIndex = 1; // Start at 1 for easier math
//         const slideInterval = 4000; // 4 seconds
//         let autoplayInterval = null;

//         // Core function to display a specific slide
//         function showSlide(n) {
//             // Handle wrapping around the slides
//             if (n > slides.length) { slideIndex = 1; }
//             if (n < 1) { slideIndex = slides.length; }

//             // Hide all slides
//             for (let i = 0; i < slides.length; i++) {
//                 slides[i].style.display = "none";
//             }

//             // Show the target slide
//             slides[slideIndex - 1].style.display = "block";
//         }

//         // Function for next/prev button clicks
//         function plusSlides(n) {
//             showSlide(slideIndex += n);
//         }

//         // Functions to control autoplay
//         function stopAutoplay() {
//             clearInterval(autoplayInterval);
//         }
//         function startAutoplay() {
//             stopAutoplay(); // Ensure no multiple timers are running
//             autoplayInterval = setInterval(() => {
//                 plusSlides(1); // Advance to the next slide
//             }, slideInterval);
//         }

//         // Add click listeners to the arrow buttons
//         prevBtn.addEventListener('click', () => {
//             stopAutoplay(); // Stop autoplay when user takes control
//             plusSlides(-1);
//         });

//         nextBtn.addEventListener('click', () => {
//             stopAutoplay(); // Stop autoplay when user takes control
//             plusSlides(1);
//         });

//         // Initialize the slider
//         showSlide(slideIndex); // Show the first slide immediately
//         startAutoplay(); // Start the automatic slideshow
//     }
// }

// function initializeEventsPage() {
//     document.getElementById('event-list-view').style.display = 'block';
//     document.getElementById('event-detail-view').style.display = 'none';

//     document.querySelectorAll('#past-events-list li').forEach(item => {
//         item.addEventListener('click', (event) => {
//             const listItem = event.currentTarget;
//             if (listItem && listItem.dataset.eventIndex) {
//                 showEventDetails(parseInt(listItem.dataset.eventIndex));
//             }
//         });
//     });

//     document.getElementById('back-to-events-btn').addEventListener('click', () => {
//         document.getElementById('event-detail-view').style.display = 'none';
//         document.getElementById('event-list-view').style.display = 'block';
//     });
// }

// function showEventDetails(eventIndex) {
//     const event = eventsData[eventIndex];
//     if (!event) return;

//     document.getElementById('event-list-view').style.display = 'none';
//     const detailView = document.getElementById('event-detail-view');

//     detailView.style.display = 'block';
//     detailView.querySelector('#event-detail-title').textContent = event.title;
//     detailView.querySelector('#event-detail-date').textContent = `Date: ${event.date}`;
//     detailView.querySelector('#event-detail-description').textContent = event.description;

//     const imagesContainer = detailView.querySelector('#event-detail-images');
//     imagesContainer.innerHTML = '';
//     event.images.forEach((imgSrc, index) => {
//         const imgDiv = document.createElement('div');
//         imgDiv.className = 'bg-red-100 rounded-lg overflow-hidden shadow-md animate-scale-in';
//         imgDiv.style.animationDelay = `${index * 70}ms`;
//         imgDiv.innerHTML = `<img src="${imgSrc}" alt="${event.title} Image" class="w-full h-auto object-contain rounded-lg" onerror="this.onerror=null; this.src='https://placehold.co/400x300/A60000/FFFFFF?text=Image+Error';">`;
//         imagesContainer.appendChild(imgDiv);
//     });
// }

// function initializeAboutSubTabs() {
//     // Logic for about page sub-tabs
// }

// function initializeStudentsCorner() {
//     // Logic for students corner page
// }

// function initializeEnquiryForm() {
//     // Logic for the enquiry form
// }

// // --- MAIN EXECUTION ---
// document.addEventListener('DOMContentLoaded', async () => {
//     const loader = document.getElementById('loading-screen');

//     await loadContent('partials/navbar.html', 'navbar-container');
//     await loadContent('partials/enquiry.html', 'enquiry-container');
//     await loadContent('partials/footer.html', 'footer-container');

//     document.querySelectorAll('.nav-button').forEach(button => {
//         button.addEventListener('click', () => showPage(button.dataset.page));
//     });

//     initializeEnquiryForm();
//     document.getElementById('current-year').textContent = new Date().getFullYear();

//     await showPage('home');

//     // Hide the loader after everything is loaded
//     if(loader) {
//         loader.classList.add('hidden');
//     }
// });
// --- DATA ---
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

async function showPage(pageName) {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML = '<p class="text-center">Loading...</p>';
    await loadContent(`pages/${pageName}.html`, 'page-container');
    initializePageScripts(pageName);
}

// --- INITIALIZATION FUNCTIONS (These run after content is loaded) ---

function initializePageScripts(pageName) {
    const elementsToAnimate = document.querySelectorAll('#page-container [class*="animate-"]');
    elementsToAnimate.forEach(el => {
        const animationClasses = Array.from(el.classList).filter(cls => cls.startsWith('animate-'));
        el.classList.remove(...animationClasses);
        setTimeout(() => el.classList.add(...animationClasses), 10);
    });

    if (pageName === 'home') {
        // Any home-specific scripts can be called here if needed in the future
    }
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
        const alumniItems = document.querySelectorAll('#alumni-items .alumni-item');
        alumniItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 70}ms`;
        });
    }
}

// --- NEW REUSABLE TAB FUNCTION ---
/**
 * Initializes any tab system on the page.
 * @param {string} containerSelector - The selector for the element that contains BOTH the nav and content.
 * @param {string} navItemSelector - The selector for the clickable navigation buttons.
 * @param {string} contentSelector - The selector for the content panels to be toggled.
 */
function initializeTabSystem(containerSelector, navItemSelector, contentSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const navButtons = container.querySelectorAll(navItemSelector);
    const contentPanels = container.querySelectorAll(contentSelector);

    if (navButtons.length === 0) return;

    const showTab = (tabButton) => {
        const targetId = tabButton.dataset.target;
        const targetPanel = document.getElementById(targetId);

        navButtons.forEach(btn => btn.classList.remove('active'));
        contentPanels.forEach(panel => panel.style.display = 'none');

        if (targetPanel) {
            tabButton.classList.add('active');
            targetPanel.style.display = 'block';
        }
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => showTab(button));
    });

    const initiallyActiveButton = container.querySelector(`${navItemSelector}.active`);
    if (initiallyActiveButton) {
        showTab(initiallyActiveButton);
    } else {
        showTab(navButtons[0]);
    }
}


function initializeEventsPage() {
    document.getElementById('event-list-view').style.display = 'block';
    document.getElementById('event-detail-view').style.display = 'none';

    document.querySelectorAll('#past-events-list li').forEach(item => {
        item.addEventListener('click', (event) => {
            const listItem = event.currentTarget;
            if (listItem && listItem.dataset.eventIndex) {
                showEventDetails(parseInt(listItem.dataset.eventIndex));
            }
        });
    });

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


// --- REWRITTEN FUNCTIONS USING THE NEW TAB SYSTEM ---

function initializeAboutSubTabs() {
    initializeTabSystem('#page-container', '.about-sub-nav-item', '.about-sub-content');
}

function initializeStudentsCorner() {
    // Initialize the main level of tabs ("STUDENTS COMMITTEE")
    initializeTabSystem('#students-corner', '.students-corner-sub-nav-item', '.students-corner-sub-content');
    
    // Initialize the nested level of tabs ("2024-25", "2025-26")
    initializeTabSystem('#students-committee-sub-container', '.committee-year-sub-nav-item', '.committee-year-content');
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

document.addEventListener('DOMContentLoaded', async () => {
    await loadContent('partials/navbar.html', 'navbar-container');
    await loadContent('partials/enquiry.html', 'enquiry-container');
    await loadContent('partials/footer.html', 'footer-container');
    
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            showPage(button.dataset.page);
        });
    });
    
    initializeEnquiryForm();
    document.getElementById('current-year').textContent = new Date().getFullYear();

    await showPage('home');
});
