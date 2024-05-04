document.querySelectorAll('.illus').forEach(illus => {
    const imgExp = illus.querySelector('.img-exp');
    const skills = illus.querySelector('.skills');

    illus.addEventListener('mouseover', () => {
        imgExp.style.opacity = '0';
        imgExp.style.transition = 'opacity 0.5s ease';
        skills.style.opacity = '1';
        skills.style.transition = 'opacity 0.5s ease';
    });

    illus.addEventListener('mouseout', () => {
        imgExp.style.opacity = '1';
        skills.style.opacity = '0';
    });
});