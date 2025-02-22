document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.getElementById("searchIcon");
    const searchOverlay = document.getElementById("searchOverlay");
    const searchClose = document.getElementById("searchClose");
    const searchInput = document.getElementById("searchInput");

    if (searchIcon && searchOverlay && searchClose && searchInput) {
        // Show Search Bar
        searchIcon.addEventListener("click", function () {
            searchOverlay.classList.add("active");
            searchInput.focus(); // Auto-focus input when opened
        });

        // Close Search Bar
        searchClose.addEventListener("click", function () {
            searchOverlay.classList.remove("active");
        });

        // Close Search Bar When Clicking Outside
        searchOverlay.addEventListener("click", function (event) {
            if (event.target === searchOverlay) {
                searchOverlay.classList.remove("active");
            }
        });

        // Handle Search on Enter Key Press
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent form submission

                let query = searchInput.value.trim();
                if (query) {
                    // Redirect to a search results page (modify this URL as needed)
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    } else {
        console.error("Search elements not found. Check your HTML structure.");
    }
});
