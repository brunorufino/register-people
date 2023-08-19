import { Router } from "express";

const rotaLogin = Router();


rotaLogin.get("/", (requisicao,resposta)=>{
    resposta.redirect("/login.html");
})
.post("/", (requisicao, resposta) =>{
        const usuario = requisicao.body.usuario;
        const senha = requisicao.body.senha;

        if(usuario === 'Renato' && senha === '123')
        {
            requisicao.session.usuarioLogado = true;
    
            resposta.redirect("/cadastroCliente.html");
        }
        else
        {
            resposta.send(" <p>Falha no login!! </p> ");
        }
    });

export default rotaLogin;