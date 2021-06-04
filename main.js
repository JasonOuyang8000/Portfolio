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

const smooth_scroll_to = function(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);

    if (duration < 0) {
        return Promise.reject("bad duration");
    }
    if (duration === 0) {
        element.scrollY = target;
        return Promise.resolve();
    }

    let start_time = Date.now();
    let end_time = start_time + duration;

    let start_top = element.scrollY;
    let distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    let smooth_step = function(start, end, point) {
        if(point <= start) { return 0; }
        if(point >= end) { return 1; }
        let x = (point - start) / (end - start); // interpolation
        return x*x*(3 - 2*x);
    }

    return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollY is
        // supposed to be, based on what we're doing
        let previous_top = element.scrollY;
        // This is like a think function from a game loop
        let scroll_frame = function() {
            if(element.scrollY != previous_top) {
                reject("interrupted");
                return;
            }

            // set the scrollY for this frame
            let now = Date.now();
            let point = smooth_step(start_time, end_time, now);
            let frameTop = Math.round(start_top + (distance * point));
            setTimeout(element.scrollTo(element.scrollY,frameTop),100);
   
            // check if we're done!
            if(now >= end_time) {
                resolve();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            if(element.scrollY === previous_top
                && element.scrollY !== frameTop) {
                resolve();
                return;
            }
            previous_top = element.scrollY;

            // schedule next frame for execution
            setTimeout(scroll_frame, 0);
        }

        // boostrap the animation process
        setTimeout(scroll_frame, 0);
    });
}

navLinks.forEach(link => link.addEventListener('click',(e) => {
    // navLinks.forEach(l => l.classList.remove('strike-through'));
    // e.target.classList.add('strike-through');
   const id = e.target.getAttribute('data-id');
   const targetedElement = document.getElementById(id);

    const location = targetedElement.getBoundingClientRect().top;


   smooth_scroll_to(window,location + window.scrollY,800);

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
     
        
        smooth_scroll_to(window,location + window.scrollY,800);
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

    smooth_scroll_to(window,location + window.scrollY,800);
})