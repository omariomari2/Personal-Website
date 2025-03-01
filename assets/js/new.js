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

    // Project Description Toggle
    const projectDescriptions = document.querySelectorAll('.project-detail-info');
    
    projectDescriptions.forEach(projectInfo => {
        // Get the project description (text between h3 and the first div)
        const title = projectInfo.querySelector('h3');
        if (!title) return;
        
        // Get all text nodes between h3 and the skills div
        let descriptionText = '';
        let currentNode = title.nextSibling;
        const skillsDiv = projectInfo.querySelector('.project-skills');
        
        while (currentNode && currentNode !== skillsDiv) {
            if (currentNode.nodeType === Node.TEXT_NODE) {
                descriptionText += currentNode.textContent;
            } else if (currentNode.tagName === 'BR') {
                descriptionText += ' ';
            }
            currentNode = currentNode.nextSibling;
        }
        
        // Clean up the description text
        descriptionText = descriptionText.trim();
        
        // If description is long enough to truncate
        if (descriptionText.length > 100) {
            // Create short and full versions
            const shortDescription = descriptionText.substring(0, 100) + '...';
            const fullDescription = descriptionText;
            
            // Remove existing text nodes
            currentNode = title.nextSibling;
            while (currentNode && currentNode !== skillsDiv) {
                const nextNode = currentNode.nextSibling;
                if (currentNode.nodeType === Node.TEXT_NODE || currentNode.tagName === 'BR') {
                    projectInfo.removeChild(currentNode);
                }
                currentNode = nextNode;
            }
            
            // Create container for the description
            const descriptionContainer = document.createElement('div');
            descriptionContainer.className = 'project-description';
            descriptionContainer.style.fontSize = '1.2em'; // Match the CSS font size
            
            // Add short description
            const shortDescriptionElement = document.createElement('span');
            shortDescriptionElement.className = 'short-description';
            shortDescriptionElement.textContent = shortDescription;
            descriptionContainer.appendChild(shortDescriptionElement);
            
            // Add full description (hidden initially)
            const fullDescriptionElement = document.createElement('span');
            fullDescriptionElement.className = 'full-description';
            fullDescriptionElement.style.display = 'none';
            fullDescriptionElement.textContent = fullDescription;
            descriptionContainer.appendChild(fullDescriptionElement);
            
            // Add toggle button
            const toggleButton = document.createElement('button');
            toggleButton.className = 'description-toggle';
            toggleButton.textContent = 'Read More';
            toggleButton.style.background = 'none';
            toggleButton.style.border = 'none';
            toggleButton.style.color = '#64ffda';
            toggleButton.style.cursor = 'pointer';
            toggleButton.style.fontWeight = 'bold';
            toggleButton.style.marginLeft = '5px';
            toggleButton.style.padding = '0';
            toggleButton.style.fontSize = '1em'; // Slightly smaller than description text
            
            // Toggle functionality
            toggleButton.addEventListener('click', () => {
                const shortDesc = descriptionContainer.querySelector('.short-description');
                const fullDesc = descriptionContainer.querySelector('.full-description');
                
                if (fullDesc.style.display === 'none') {
                    shortDesc.style.display = 'none';
                    fullDesc.style.display = 'inline';
                    toggleButton.textContent = 'Read Less';
                } else {
                    shortDesc.style.display = 'inline';
                    fullDesc.style.display = 'none';
                    toggleButton.textContent = 'Read More';
                }
            });
            
            // Insert the new elements after the title
            projectInfo.insertBefore(descriptionContainer, skillsDiv);
            projectInfo.insertBefore(toggleButton, skillsDiv);
        }
    });
});
