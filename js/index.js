// nab bar section start 


  // Navbar Scroll Effect
  window.addEventListener("scroll", function() {
    const navbar = document.getElementById("proNavbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const mobileMenu = document.getElementById("proMobileMenu");
  const navLinks = document.getElementById("proNavLinks");

  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Mobile Dropdown Click Support
  const dropdownParent = document.querySelector(".pro-dropdown > a");
  dropdownParent.addEventListener("click", (e) => {
    if (window.innerWidth <= 968) {
      e.preventDefault();
      dropdownParent.parentElement.classList.toggle("active");
    }
  });



// bottom to top button start

document.addEventListener("DOMContentLoaded", () => {
    const fabContainer = document.getElementById("fabContainer");
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // GSAP ScrollTrigger setup (Yeh waise hi kaam karega)
    ScrollTrigger.create({
        start: "top -300px",
        onEnter: () => fabContainer.classList.add("show"),
        onLeaveBack: () => fabContainer.classList.remove("show")
    });

    // Native Smooth Scroll (Bina kisi extra plugin ke)
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// bottom to top button End



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






// product section start home page 


document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".dinco-products-section");

    if (!section) return;


   // first Element 

    const heading = section.querySelector(".dinco-products-heading");

    const products = section.querySelectorAll(".dinco-product");

    const center = section.querySelector(".dinco-center");

    const footer = section.querySelector(".dinco-products-footer");

    const tagline = section.querySelector(".dinco-products-tagline");

    const rings = section.querySelectorAll(".center-ring");


    /* =====================================================
       2. ADD REVEAL CLASSES
    ===================================================== */

    if (heading) {
        heading.classList.add("dinco-reveal");
    }

    products.forEach((product, index) => {

        product.classList.add("dinco-reveal-product");

        /*
            Each product gets a small delay
            01 → 02 → 03 → 04 → 05 → 06
        */

        product.style.setProperty(
            "--dinco-delay",
            `${index * 120}ms`
        );

    });


    if (center) {
        center.classList.add("dinco-reveal-center");
    }

    if (footer) {
        footer.classList.add("dinco-reveal-footer");
    }

    if (tagline) {
        tagline.classList.add("dinco-reveal-footer");
    }


    /* =====================================================
       3. SCROLL REVEAL
    ===================================================== */

    const revealElements = section.querySelectorAll(
        ".dinco-reveal, " +
        ".dinco-reveal-product, " +
        ".dinco-reveal-center, " +
        ".dinco-reveal-footer"
    );


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });



    /* =====================================================
       4. CENTER RINGS ANIMATION
    ===================================================== */

    if (center) {

        const ringObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        center.classList.add("rings-active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.4
            }
        );

        ringObserver.observe(center);
    }



    /* =====================================================
       5. PRODUCT 3D TILT
    ===================================================== */

    const isMobile = window.matchMedia(
        "(max-width: 767px)"
    ).matches;


    if (!isMobile) {

        products.forEach(product => {

            product.addEventListener("mousemove", (event) => {

                const rect = product.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) / centerX) * 2.5;

                const rotateX =
                    ((centerY - y) / centerY) * 2.5;


                product.style.transform = `
                    translateY(-9px)
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;

            });


            product.addEventListener("mouseleave", () => {

                product.style.transform = "";

            });

        });

    }



    /* =====================================================
       6. PRODUCT IMAGE MOUSE MOVEMENT
    ===================================================== */

    if (!isMobile) {

        products.forEach(product => {

            const image = product.querySelector(
                ".product-image img"
            );

            if (!image) return;


            product.addEventListener("mousemove", (event) => {

                const rect = product.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;


                const moveX =
                    (x - 0.5) * 10;

                const moveY =
                    (y - 0.5) * 8;


                image.style.marginLeft =
                    `${moveX}px`;

                image.style.marginTop =
                    `${moveY}px`;

            });


            product.addEventListener("mouseleave", () => {

                image.style.marginLeft = "";

                image.style.marginTop = "";

            });

        });

    }



    /* =====================================================
       7. PRODUCT ARROW MICRO ANIMATION
    ===================================================== */

    products.forEach(product => {

        const arrow = product.querySelector(
            ".product-arrow"
        );

        if (!arrow) return;


        arrow.addEventListener("mouseenter", () => {

            arrow.classList.add("arrow-active");

        });


        arrow.addEventListener("mouseleave", () => {

            arrow.classList.remove("arrow-active");

        });

    });



    /* =====================================================
       8. EXPLORE BUTTON
    ===================================================== */

    const exploreButton =
        section.querySelector(".dinco-explore-btn");


    if (exploreButton) {

        exploreButton.addEventListener("mouseenter", () => {

            exploreButton.classList.add(
                "explore-active"
            );

        });


        exploreButton.addEventListener("mouseleave", () => {

            exploreButton.classList.remove(
                "explore-active"
            );

        });

    }



    /* =====================================================
       9. PARALLAX EFFECT FOR CENTER HUB
    ===================================================== */

    if (!isMobile && center) {

        section.addEventListener("mousemove", (event) => {

            const rect =
                section.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width;


            const y =
                (event.clientY - rect.top) /
                rect.height;


            const moveX =
                (x - 0.5) * 10;

            const moveY =
                (y - 0.5) * 8;


            center.style.setProperty(
                "--center-x",
                `${moveX}px`
            );

            center.style.setProperty(
                "--center-y",
                `${moveY}px`
            );

        });


        section.addEventListener("mouseleave", () => {

            center.style.setProperty(
                "--center-x",
                "0px"
            );

            center.style.setProperty(
                "--center-y",
                "0px"
            );

        });

    }



    /* =====================================================
       10. PREVENT IMAGE DRAGGING
    ===================================================== */

    const images =
        section.querySelectorAll("img");


    images.forEach(img => {

        img.setAttribute(
            "draggable",
            "false"
        );

    });

});




// swervice section start 


const serviceData=[

{
title:"Dinco",
image:"img/img-home-01.jpg",
desc:"We analyze your ideas, understand your business goals and prepare a detailed strategy before development begins. This helps create a strong foundation for the entire project."
},

{
title:"DESIGN DEVELOPMENT",
image:"img/img-home-01.jpg",
desc:"Our designers create modern UI/UX designs that are attractive, responsive and focused on user experience across all devices."
},

{
title:"DELIVERY & SUPPORT",
image:"img/about-img-02.jpg",
desc:"After project completion we provide deployment, maintenance, technical support and continuous improvements."
},

{
title:"LAUNCH & DEPLOY",
image:"img/about-img-02.jpg",
desc:"We deploy your website securely on the server with performance optimization, SEO setup and complete testing."
},

{
title:"TESTING & QA",
image:"img/image-home-1.jpg",
desc:"Every project passes through multiple testing stages to ensure speed, security, responsiveness and bug-free performance."
},

{
title:"FEEDBACK & REVISIONS",
image:"img/img-home-01.jpg",
desc:"Client feedback is important. We improve the final product through revisions until everything meets expectations."
}

];

const modal=document.getElementById("serviceModal");

const modalTitle=document.getElementById("modalTitle");

const modalDesc=document.getElementById("modalDesc");

const modalImage=document.getElementById("modalImage");

document.querySelectorAll(".hover-read-more").forEach((btn,index)=>{

btn.addEventListener("click",function(e){

e.preventDefault();

modal.classList.add("active");

modalTitle.innerHTML=serviceData[index].title;

modalDesc.innerHTML=serviceData[index].desc;

modalImage.src=serviceData[index].image;

});

});

document.querySelector(".close-modal").onclick=()=>{

modal.classList.remove("active");

};

modal.onclick=(e)=>{

if(e.target===modal){

modal.classList.remove("active");

}

};

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

modal.classList.remove("active");

}

});