document.addEventListener("DOMContentLoaded", () => {

    // GSAP + ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // PRODUCT PAGE — ENTERPRISE BANNER ANIMATION
    // ==========================================

    const productBanner = document.querySelector(".enterprise-screen-banner");

    if (!productBanner) return;

    // Main elements
    const content = productBanner.querySelector(".enterprise-content");
    const visual = productBanner.querySelector(".enterprise-visual-wrapper");

    const meta = productBanner.querySelector(".enterprise-meta-top");
    const title = productBanner.querySelector(".enterprise-main-title");
    const lead = productBanner.querySelector(".enterprise-lead");
    const specs = productBanner.querySelectorAll(".spec-col");
    const buttons = productBanner.querySelectorAll(".enterprise-cta-group a");

    const frame = productBanner.querySelector(".industrial-steel-frame");
    const productImg = productBanner.querySelector(".enterprise-product-img");
    const corners = productBanner.querySelectorAll(".corner-marker");
    const overlay = productBanner.querySelector(".precision-overlay-card");


    // ==========================================
    // INITIAL STATE
    // ==========================================

    gsap.set(meta, {
        opacity: 0,
        y: 25
    });

    gsap.set(title, {
        opacity: 0,
        y: 70
    });

    gsap.set(lead, {
        opacity: 0,
        y: 35
    });

    gsap.set(specs, {
        opacity: 0,
        y: 40
    });

    gsap.set(buttons, {
        opacity: 0,
        y: 30
    });

    gsap.set(visual, {
        opacity: 0,
        x: 80,
        scale: 0.94
    });

    gsap.set(productImg, {
        scale: 1.12,
        opacity: 0
    });

    gsap.set(corners, {
        opacity: 0,
        scale: 0.7
    });

    gsap.set(overlay, {
        opacity: 0,
        y: 30,
        x: 20
    });


    // ==========================================
    // MAIN INTRO TIMELINE
    // ==========================================

    const productHeroTL = gsap.timeline({
        delay: 0.15
    });


    // ------------------------------------------
    // RIGHT IMAGE / VISUAL
    // ------------------------------------------

    productHeroTL
        .to(visual, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.15,
            ease: "power3.out"
        })

        .to(productImg, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.9")


        // ------------------------------------------
        // CORNER MARKERS
        // ------------------------------------------

        .to(corners, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)"
        }, "-=0.7")


        // ------------------------------------------
        // LEFT CONTENT
        // ------------------------------------------

        .to(meta, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.65")

        .to(title, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out"
        }, "-=0.35")

        .to(lead, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.45")


        // ------------------------------------------
        // TECHNICAL SPECS
        // ------------------------------------------

        .to(specs, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out"
        }, "-=0.3")


        // ------------------------------------------
        // BUTTONS
        // ------------------------------------------

        .to(buttons, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out"
        }, "-=0.25")


        // ------------------------------------------
        // FLOATING CARD
        // ------------------------------------------

        .to(overlay, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "back.out(1.4)"
        }, "-=0.25");


    // ==========================================
    // SUBTLE IMAGE FLOAT
    // ==========================================

    gsap.to(productImg, {
        y: -8,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });


    // ==========================================
    // SCROLL ANIMATION
    // ==========================================

    gsap.from(specs, {
        scrollTrigger: {
            trigger: ".tech-specs-box",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
    });


    // ==========================================
    // MOBILE OPTIMIZATION
    // ==========================================

    ScrollTrigger.matchMedia({

        "(max-width: 767px)": function () {

            // Mobile par animation thodi lightweight
            gsap.set(visual, {
                x: 40,
                scale: 0.97
            });

            gsap.set(title, {
                y: 45
            });

            gsap.set(lead, {
                y: 25
            });

            productHeroTL.timeScale(1.15);
        }

    });


});