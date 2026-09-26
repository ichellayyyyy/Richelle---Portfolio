/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICK
===================================================== */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 1200;

            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;

                const progress = Math.min(elapsed / duration, 1);

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                current = Math.floor(
                    easedProgress * target
                );

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }

            }

            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        });

    },
    {
        threshold: 0.6
    }
);


counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =====================================================
   DYNAMIC BAR ANIMATION
===================================================== */

const bars = document.querySelectorAll(".bars i");

setInterval(() => {

    bars.forEach(bar => {

        const randomHeight =
            Math.floor(Math.random() * 60) + 40;

        bar.style.setProperty(
            "--height",
            `${randomHeight}%`
        );

    });

}, 2500);


/* =====================================================
   IMAGE ERROR CHECK
===================================================== */

const profileImage = document.querySelector(".profile-image");

profileImage.addEventListener("error", () => {

    console.error(
        "Profile image could not be loaded. Check that assets/profile.jpg exists."
    );

});


/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElement = document.querySelector("footer span");

if (yearElement) {

    yearElement.innerHTML =
        `© ${new Date().getFullYear()} Ma. Richelle J. Retania`;

}

/* =========================================
   ANALYTICS TOOLKIT SLIDER
========================================= */

const toolkitSlides = document.querySelectorAll(".toolkit-slide");
const toolkitDots = document.querySelectorAll(".toolkit-dot");
const toolkitPrev = document.getElementById("toolkitPrev");
const toolkitNext = document.getElementById("toolkitNext");
const toolkitCounter = document.getElementById("toolkitCounter");

let currentToolkitSlide = 0;


/* SHOW SLIDE */

function showToolkitSlide(index) {

    if (index < 0) {
        index = toolkitSlides.length - 1;
    }

    if (index >= toolkitSlides.length) {
        index = 0;
    }

    currentToolkitSlide = index;


    /* Hide all slides */

    toolkitSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentToolkitSlide);
    });


    /* Update dots */

    toolkitDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentToolkitSlide);
    });


    /* Update counter */

    toolkitCounter.textContent =
        String(currentToolkitSlide + 1).padStart(2, "0")
        + " / "
        + String(toolkitSlides.length).padStart(2, "0");
}


/* NEXT */

if (toolkitNext) {
    toolkitNext.addEventListener("click", () => {
        showToolkitSlide(currentToolkitSlide + 1);
    });
}


/* PREVIOUS */

if (toolkitPrev) {
    toolkitPrev.addEventListener("click", () => {
        showToolkitSlide(currentToolkitSlide - 1);
    });
}


/* DOT NAVIGATION */

toolkitDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
        showToolkitSlide(index);
    });

});


/* KEYBOARD NAVIGATION */

document.addEventListener("keydown", (event) => {

    const toolkitSection = document.getElementById("skills");

    if (!toolkitSection) return;

    const rect = toolkitSection.getBoundingClientRect();

    const sectionIsVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0;

    if (!sectionIsVisible) return;


    if (event.key === "ArrowRight") {
        showToolkitSlide(currentToolkitSlide + 1);
    }

    if (event.key === "ArrowLeft") {
        showToolkitSlide(currentToolkitSlide - 1);
    }

});

