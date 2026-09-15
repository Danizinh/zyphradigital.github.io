
document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("open");

            menuBtn.textContent = nav.classList.contains("open")
                ? "✕"
                : "☰";
        });

        // Fecha o menu ao clicar em um link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuBtn.textContent = "☰";
            });
        });

    }

});
