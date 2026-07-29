document.addEventListener("DOMContentLoaded", () => {

    //  GSAP REGISTER PLUGIN
    gsap.registerPlugin(ScrollTrigger);

    // BANNER IMAGE section 
    const webDesigningImages = [
        "img/img-home-01.jpg",
        "img/image-home-1.jpg",
        "img/about-img-02.jpg"
    ];

    const stripCount = 20;
    let currentIdx = 0;
    let isAnimating = false;

    const curtainOverlay = document.getElementById("webDesigningCurtainOverlay");
    const viewport = document.getElementById("webDesigningViewport");
    const baseImg = document.getElementById("webDesigningBaseImg");
    const thumbs = document.querySelectorAll(".web-designing-image-wrapper");

    function initStrips() {
        if (!curtainOverlay || !viewport) return;
        curtainOverlay.innerHTML = "";
        const viewportWidth = viewport.getBoundingClientRect().width;

        for (let i = 0; i < stripCount; i++) {
            const strip = document.createElement("div");
            strip.className = "web-designing-strip";

            const img = document.createElement("img");
            img.src = webDesigningImages[currentIdx];
            img.style.width = viewportWidth + "px";
            img.style.left = -(i * (viewportWidth / stripCount)) + "px";

            strip.appendChild(img);
            curtainOverlay.appendChild(strip);
        }
    }

    function triggerCurtain(targetIdx) {
        if (targetIdx === currentIdx) return;
        
        if (isAnimating) {
            isAnimating = false; 
        }

        isAnimating = true;
        const strips = document.querySelectorAll(".web-designing-strip");
        const nextImg = webDesigningImages[targetIdx];

        thumbs.forEach(item => item.classList.remove("active"));
        if(thumbs[targetIdx]) {
            thumbs[targetIdx].classList.add("active");
        }

        strips.forEach(strip => {
            const imgEl = strip.querySelector("img");
            if(imgEl) imgEl.src = nextImg;
        });

        gsap.fromTo(
            strips,
            { clipPath: "polygon(0 0,100% 0,100% 0,0 0)" },
            {
                clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
                duration: 0.5,
                ease: "power2.inOut",
                stagger: { each: 0.015, from: "start" },
                onComplete: () => {
                    if(baseImg) baseImg.src = nextImg;
                    gsap.set(strips, { clipPath: "polygon(0 0,100% 0,100% 0,0 0)" });
                    currentIdx = targetIdx;
                    isAnimating = false;
                }
            }
        );
    }

    thumbs.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const idx = Number(item.dataset.index);
            triggerCurtain(idx);
        });
    });

    initStrips();
    window.addEventListener("resize", initStrips);
    // banner section End


    // HERO INTRO ANIMATION
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(".web-designing-hero", {
        opacity: 0,
        duration: 0.4
    })
    .from("#webDesigningViewport", {
        opacity: 0,
        scale: 1.08,
        y: 60,
        duration: 1.2,
        ease: "power3.out"
    }, "-=0.2")
    .from(".web-designing-text span", {
        y: 140,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power4.out"
    }, "-=0.9")
    .from(".web-designing-image-wrapper", {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.45,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "opacity,transform"
    }, "-=0.45");


    // REUSABLE SCROLL ANIMATION FUNCTION
    function initScrollAnimation(triggerEl, elementsToAnimate, options = {}) {
        const defaultOptions = {
            start: "top 75%",
            toggleActions: "play none none reverse",
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            ...options
        };

        elementsToAnimate.forEach((item) => {
            gsap.from(item.target, {
                scrollTrigger: {
                    trigger: triggerEl,
                    start: defaultOptions.start,
                    toggleActions: defaultOptions.toggleActions,
                },
                opacity: item.opacity !== undefined ? item.opacity : 0,
                x: item.x || 0,
                y: item.y || 0,
                scale: item.scale || 1,
                duration: item.duration || defaultOptions.duration,
                stagger: item.stagger || defaultOptions.stagger,
                ease: defaultOptions.ease,
                clearProps: "opacity,transform" // Animation ke baad clean rakhne ke liye
            });
        });
    }


    // About Us Section Animation
    initScrollAnimation(".about-section-advanced", [
        { target: ".about-small-image-wrapper", x: -50, opacity: 0 },
        { target: ".about-text-content", x: 50, opacity: 0 },
        { target: ".about-large-image-wrapper", x: 50, opacity: 0 }
    ]);

    // Showcase Section Animation
    initScrollAnimation(".showcase-section", [
        { target: "#imageWrapper", x: -60, opacity: 0 },
        { target: "#contentWrapper > *", x: 60, opacity: 0, stagger: 0.12 }
    ]);


// service section / process section animation
    initScrollAnimation(".service-home-container", [
        { target: ".service-home-box", y: 40, opacity: 0, stagger: 0.15 }
    ]);
});