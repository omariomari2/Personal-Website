document.addEventListener('DOMContentLoaded', function() {
    const diveText = document.getElementById('dive-text');
    diveText.classList.add('fade-in');
    
    // Typewriter effect
    const text = diveText.textContent;
    diveText.textContent = '';
    let index = 0;
    const speed = 100; // typing speed in milliseconds

    function typeWriter() {
        if (index < text.length) {
            diveText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            diveText.classList.add('cursor'); // Add cursor class at the end
        }
    }

    typeWriter();

    // Project Details Navigation
    const projectDetails = document.querySelectorAll('.project-detail');
    const detailDots = document.querySelectorAll('.detail-dot');
    const detailPrevButton = document.querySelector('.detail-prev-button');
    const detailNextButton = document.querySelector('.detail-next-button');
    let detailCurrentIndex = 0;

    // Initialize first project detail as active
    if (projectDetails.length > 0) {
        projectDetails[0].classList.add('active');
        detailDots[0].classList.add('active');
    }

    function updateActiveProjectDetail(newIndex) {
        // Remove active classes from current project
        projectDetails[detailCurrentIndex].classList.remove('active');
        detailDots[detailCurrentIndex].classList.remove('active');

        // Update index
        detailCurrentIndex = newIndex;

        // Add active classes to new project
        projectDetails[detailCurrentIndex].classList.add('active');
        detailDots[detailCurrentIndex].classList.add('active');
    }

    // Previous button click handler for project details
    if (detailPrevButton) {
        detailPrevButton.addEventListener('click', () => {
            const newIndex = detailCurrentIndex === 0 ? projectDetails.length - 1 : detailCurrentIndex - 1;
            updateActiveProjectDetail(newIndex);
        });
    }

    // Next button click handler for project details
    if (detailNextButton) {
        detailNextButton.addEventListener('click', () => {
            const newIndex = detailCurrentIndex === projectDetails.length - 1 ? 0 : detailCurrentIndex + 1;
            updateActiveProjectDetail(newIndex);
        });
    }

    // Dot click handlers for project details
    detailDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== detailCurrentIndex) {
                updateActiveProjectDetail(index);
            }
        });
    });

    // Auto-advance project details slides every 5 seconds
    // let detailSlideInterval = setInterval(() => {
    //     if (projectDetails.length > 0) {
    //         const newIndex = detailCurrentIndex === projectDetails.length - 1 ? 0 : detailCurrentIndex + 1;
    //         updateActiveProjectDetail(newIndex);
    //     }
    // }, 5000);

    // Pause auto-advance on hover for project details
    const projectDetailsSection = document.querySelector('#project-details');
    if (projectDetailsSection) {
        projectDetailsSection.addEventListener('mouseenter', () => {
            clearInterval(detailSlideInterval);
        });

        // Resume auto-advance when mouse leaves
        projectDetailsSection.addEventListener('mouseleave', () => {
            // detailSlideInterval = setInterval(() => {
            //     if (projectDetails.length > 0) {
            //         const newIndex = detailCurrentIndex === projectDetails.length - 1 ? 0 : detailCurrentIndex + 1;
            //         updateActiveProjectDetail(newIndex);
            //     }
            // }, 5000);
        });
    }

    // Project Grid Navigation (Original Projects Section)
    const projectGrid = document.querySelector('.project-grid');
    const projectGridDots = document.querySelectorAll('.project-grid + .project-indicators .dot');
    const gridPrevButton = document.querySelector('.project-grid + .project-indicators + .project-navigation .prev-button');
    const gridNextButton = document.querySelector('.project-grid + .project-indicators + .project-navigation .next-button');
    let gridCurrentIndex = 0;

    if (projectGridDots.length > 0) {
        projectGridDots[0].classList.add('active');
    }

    function updateActiveGridDot(index) {
        projectGridDots.forEach(dot => dot.classList.remove('active'));
        projectGridDots[index].classList.add('active');
    }

    function scrollToGridProject(index) {
        if (projectGrid) {
            const projectWidth = projectGrid.offsetWidth;
            projectGrid.scrollTo({
                left: projectWidth * index,
                behavior: 'smooth'
            });
            updateActiveGridDot(index);
            gridCurrentIndex = index;
        }
    }

    if (gridPrevButton) {
        gridPrevButton.addEventListener('click', () => {
            gridCurrentIndex = gridCurrentIndex === 0 ? projectGridDots.length - 1 : gridCurrentIndex - 1;
            scrollToGridProject(gridCurrentIndex);
        });
    }

    if (gridNextButton) {
        gridNextButton.addEventListener('click', () => {
            gridCurrentIndex = gridCurrentIndex === projectGridDots.length - 1 ? 0 : gridCurrentIndex + 1;
            scrollToGridProject(gridCurrentIndex);
        });
    }

    projectGridDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToGridProject(index);
        });
    });

    // Keyboard navigation for both sections
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            // Project Details
            if (document.activeElement.closest('#project-details')) {
                detailPrevButton.click();
            }
            // Project Grid
            else if (document.activeElement.closest('.project-grid')) {
                gridPrevButton.click();
            }
        } else if (event.key === 'ArrowRight') {
            // Project Details
            if (document.activeElement.closest('#project-details')) {
                detailNextButton.click();
            }
            // Project Grid
            else if (document.activeElement.closest('.project-grid')) {
                gridNextButton.click();
            }
        }
    });

    // Intersection Observer for animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.5
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Handle rocket click animation
    const rocket = document.querySelector('.rocket-animate');
    if (rocket) {
        rocket.addEventListener('click', () => {
            rocket.style.animation = 'none';
            rocket.offsetHeight;
            rocket.style.animation = null;
            rocket.classList.add('move');

            setTimeout(() => {
                rocket.classList.remove('move');
            }, 1000);
        }, { once: true });
    }
});


