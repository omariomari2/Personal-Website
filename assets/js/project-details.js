function changeProject(direction = 'next') {
    console.log("Changing project:", direction);
}

document.getElementById('next-btn')?.addEventListener('click', () => {
    changeProject('next');
});

document.getElementById('prev-btn')?.addEventListener('click', () => {
    changeProject('prev');
});
