const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationItems = document.querySelectorAll(".nav-links a");
const yearLabel = document.querySelector("#current-year");

if (yearLabel) {
    yearLabel.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "開啟選單");
        navLinks.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    };

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "開啟選單" : "關閉選單");
        navLinks.classList.toggle("is-open", !isExpanded);
        document.body.classList.toggle("menu-open", !isExpanded);
    });

    navigationItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

const pageSections = document.querySelectorAll("main section[id]");

const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 160;
    let activeSection = pageSections[0];

    pageSections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
            activeSection = section;
        }
    });

    navigationItems.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${activeSection.id}`);
    });
};

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();
