const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");


// MENU MOBILE

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("open");

    });

}


// ANIMAÇÃO AO ENTRAR NA TELA

const elements = document.querySelectorAll(
    ".service-card, .hero-content, .hero-visual, .section"
);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.1
    }

);


elements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all .8s ease";

    observer.observe(element);

});