document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.querySelector(".navbar");
    const dropdownToggles = document.querySelectorAll(".dropdown > a");
    let resizeTimer;

    // Safety Check
    if (!menuToggle || !mobileNav || !dropdownToggles.length) {
        console.error("Critical navigation elements missing!");
        return;
    }

    // ================= MOBILE MENU FUNCTIONS =================
    const toggleMobileMenu = (e) => {
        e.stopPropagation();
        const isOpen = mobileNav.classList.toggle("active");
        
        // Toggle menu states
        menuToggle.classList.toggle("active", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
        
        if (!isOpen) closeAllSubmenus();
    };

    const handleSubmenu = (e) => {
        if (window.matchMedia("(min-width: 993px)").matches) return;

        e.preventDefault();
        e.stopPropagation();
        
        const trigger = e.currentTarget;
        const dropdown = trigger.nextElementSibling;
        const wasOpen = dropdown.classList.contains("active");

        // Close all other submenus
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            if (menu !== dropdown) menu.classList.remove("active");
        });

        // Toggle current submenu with animation support
        dropdown.classList.toggle("active", !wasOpen);
        
        // Force CSS repaint for transitions
        void dropdown.offsetHeight;
        
        // Focus management
        if (!wasOpen) {
            dropdown.querySelector("a")?.focus();
        } else {
            trigger.focus();
        }
    };

    const closeAllSubmenus = () => {
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            menu.classList.remove("active");
        });
    };

    const closeMobileMenu = () => {
        mobileNav.classList.remove("active");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        closeAllSubmenus();
    };

    // ================= EVENT LISTENERS =================
    menuToggle.addEventListener("click", toggleMobileMenu);

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", handleSubmenu);
        toggle.addEventListener("keydown", (e) => {
            if (["Enter", " "].includes(e.key)) handleSubmenu(e);
        });
    });

    document.addEventListener("click", (e) => {
        if (window.matchMedia("(max-width: 992px)").matches && 
           !mobileNav.contains(e.target) && 
           !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMobileMenu();
    });

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.matchMedia("(min-width: 993px)").matches) {
                closeMobileMenu();
            }
        }, 100);
    });
});
