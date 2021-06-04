document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    const navLinks = document.querySelectorAll('.navbar a');
const navBar = document.querySelector('.navbar');
const sections = document.querySelectorAll('body > .section');
const projectSections = document.querySelectorAll('.project-section');
const backToTop = document.querySelector('#back-to-top');
const backToMenu= document.querySelector('#back-to-menu');
const pInfo = document.querySelectorAll('.p-info');
const pName= document.getElementById('p-name');
const projectPositions = [...projectSections].map(pos => {
    const elemRect = pos.getBoundingClientRect();

    return [elemRect.top + window.scrollY,elemRect.bottom + window.scrollY,pos]
});




const positions = [...sections].map(pos =>{
    const elemRect = pos.getBoundingClientRect();

    return [elemRect.top + window.scrollY,elemRect.bottom + window.scrollY,pos]
});
const moreInfoButton = document.querySelectorAll('.more-info');


const getCurrentElement = () => {
    const [current] = positions.filter(pos => {
     
        return window.scrollY  + 300 >= pos[0] && window.scrollY + 300 <= pos[1]
    });


    
    return current[2];

}

document.querySelector('#hide').addEventListener('click', e => {
    document.querySelector('.btn-info').classList.add('hidden');
    document.querySelector('#show').classList.remove('hidden');
    document.querySelector('#hide').classList.add('hidden');
});

document.querySelector('#show').addEventListener('click', e => {
    document.querySelector('.btn-info').classList.remove('hidden');
    document.querySelector('#show').classList.add('hidden');
    document.querySelector('#hide').classList.remove('hidden');
});

const currentProjSection = () => {
    const [current] = projectPositions.filter(pos => {
     
        return window.scrollY  + 300 >= pos[0] && window.scrollY + 300 <= pos[1]
    });
    return current[2];
}



navLinks.forEach(link => link.addEventListener('click',(e) => {
    // navLinks.forEach(l => l.classList.remove('strike-through'));
    // e.target.classList.add('strike-through');
   const id = e.target.getAttribute('data-id');
   const targetedElement = document.getElementById(id);

    const location = targetedElement.getBoundingClientRect().top;

    window.scroll({
        top: location + window.scrollY, 
        left: 0, 
        behavior: 'smooth' 
    });
      

}));


window.addEventListener('scroll',((e) => {
   
 

    const currentElement = getCurrentElement();
   
    navLinks.forEach(l => l.classList.remove('strike-through'));
    document.querySelector(`.navbar a[data-id='${currentElement.id}']`).classList.add('strike-through');

  
    // if (currentElement.id !== 'section-start') {
    //     backToTop.classList.remove('hidden');
    // }
    // else {
    //     backToTop.classList.add('hidden');
    // }

    if (currentElement.id !== 'section-start') {
        pName.classList.add('nav-color')
    }
    else {
        pName.classList.remove('nav-color')
    }

    if (currentElement.id === 'section-about') {
        document.querySelector('#last').classList.remove('hidden');
    }
    else {
        document.querySelector('#last').classList.add('hidden');
    }
    if (window.scrollY >= projectPositions[0][0]) {
        document.querySelector('.project-section-nav').classList.remove('hidden');
        const currentLocation = currentProjSection();
        pInfo.forEach(l => l.classList.remove('active'));
        document.querySelector(`.project-section-nav button[data-target='${currentLocation.id}']`).classList.add('active');

    }

    else {
        document.querySelector('.project-section-nav').classList.add('hidden');

    }
   

}
));





moreInfoButton.forEach(button => {
    button.addEventListener('click', e => {
        const id = e.target.getAttribute('data-target');
     
        const targetedElement = document.getElementById(id);
    
        const location = targetedElement.getBoundingClientRect().top;
     
        window.scroll({
            top: location + window.scrollY, 
            left: 0, 
            behavior: 'smooth' 
        });
        
    
    })
})

// backToTop.addEventListener('click', (e) => {
  
//     const location = document.getElementById('section-start').getBoundingClientRect().top;

//     smooth_scroll_to(window,location + window.scrollY,800);
// })

backToMenu.addEventListener('click', (e) => {
    console.log('test');
    console.log(document.getElementById('projects-menu'));
    const location = document.getElementById('projects-menu').getBoundingClientRect().top;
    
    window.scroll({
        top: location + window.scrollY, 
        left: 0, 
        behavior: 'smooth' 
    });

})
});

