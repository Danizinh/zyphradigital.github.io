const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


// Permite receber JSON

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// Arquivos do site

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// Arquivo onde vamos guardar mensagens

const dataFolder =
    path.join(__dirname, "data");

const messagesFile =
    path.join(
        dataFolder,
        "messages.json"
    );


// Cria pasta data

if (!fs.existsSync(dataFolder)) {

    fs.mkdirSync(dataFolder);

}


// Cria arquivo de mensagens

if (!fs.existsSync(messagesFile)) {

    fs.writeFileSync(
        messagesFile,
        "[]"
    );

}


// API DO FORMULÁRIO

app.post(
    "/api/contact",
    (req, res) => {

        const {
            name,
            email,
            company,
            service,
            message
        } = req.body;


        // Validação

        if (
            !name ||
            !email ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Preencha os campos obrigatórios."

            });

        }


        // Lê mensagens existentes

        const messages =
            JSON.parse(
                fs.readFileSync(
                    messagesFile,
                    "utf8"
                )
            );


        // Nova mensagem

        const newMessage = {

            id: Date.now(),

            name,

            email,

            company,

            service,

            message,

            date:
                new Date().toISOString()

        };


        // Adiciona

        messages.push(
            newMessage
        );


        // Salva

        fs.writeFileSync(

            messagesFile,

            JSON.stringify(
                messages,
                null,
                2
            )

        );


        // Resposta

        res.json({

            success: true,

            message:
                "Mensagem recebida!"

        });

    }
);


// Inicia servidor

app.listen(
    PORT,
    () => {

        console.log(
            `Zyphra Digital rodando em http://localhost:${PORT}`
        );

    }
);