

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


const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        const formMessage =
            document.getElementById("formMessage");

        const formData =
            new FormData(form);

        const data =
            Object.fromEntries(formData.entries());


        try {

            const response =
                await fetch("/api/contact", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(data)

                });


            const result =
                await response.json();


            if (result.success) {

                formMessage.textContent =
                    "Mensagem enviada com sucesso!";

                form.reset();

            } else {

                formMessage.textContent =
                    "Não foi possível enviar.";

            }

        } catch (error) {

            console.error(error);

            formMessage.textContent =
                "Erro de conexão com o servidor.";

        }

    });

}
