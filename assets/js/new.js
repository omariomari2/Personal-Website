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

    // Project navigation functionality
    const projectGrid = document.querySelector('.project-grid');
    const projects = document.querySelectorAll('.project');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentIndex = 0;

    function updateProjects(index) {
        projectGrid.scrollTo({
            left: projects[index].offsetLeft,
            behavior: 'smooth'
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : projects.length - 1;
        updateProjects(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < projects.length - 1) ? currentIndex + 1 : 0;
        updateProjects(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateProjects(currentIndex);
        });
    });

    updateProjects(currentIndex);

    // Enable scrolling with arrow keys
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : projects.length - 1;
            updateProjects(currentIndex);
        } else if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex < projects.length - 1) ? currentIndex + 1 : 0;
            updateProjects(currentIndex);
        }
    });
});
