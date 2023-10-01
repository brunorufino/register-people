import Diretor from '../entidades/Diretor.js';

//essa classa irá manipular controlar a entidade DIRETOR
export default class DiretorCTRL{
  
gravar(requisicao, resposta){
    resposta.type("application/json");


    if(requisicao.method === "POST"  && requisicao.is('application/json')){
        const dados = requisicao.body;
        const bonus = dados.bonus;
        const cidade = dados.cidade;
        const cpf = dados.cpf;
        const descricao_setor = dados.descricao_setor;
        const email = dados.email;
        const endereco = dados.endereco;
        const nome = dados.nome;
        const rg = dados.rg;
        const setor = dados.setor;
        const telefone = dados.telefone;


        if(bonus && cidade && cpf && descricao_setor && email && endereco && nome && rg && setor && telefone){
      
            const diretor = new Diretor(cpf,cidade,bonus,descricao_setor,email,endereco,nome,rg,setor,telefone);
            diretor.gravar().then(()=>{
                resposta.status(200).json({
                    status: true,
                    mensagem: "Diretor registrado com sucesso!!"
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });

        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Informe todos os campos obrigatórios"
            });
        }
    }
    else{
        // erro do usuário que fez a requisição
        resposta.status(400).json({
            status: false,
            mensagem: "Método não permitido ou formato de requisição diferente de JSON ! Consulte a documentação!"
        });
    }
}

atualizar(requisicao, resposta){
    resposta.type("application/json");


    if(requisicao.method === "PUT"  && requisicao.is('application/json')){
        const dados = requisicao.body;
        const bonus = dados.bonus;
        const cidade = dados.cidade;
        const cpf = dados.cpf;
        const descricao_setor = dados.descricao_setor;
        const email = dados.email;
        const endereco = dados.endereco;
        const nome = dados.nome;
        const rg = dados.rg;
        const setor = dados.setor;
        const telefone = dados.telefone;


        if(bonus && cidade && cpf && descricao_setor && email && endereco && nome && rg && setor && telefone){
            // gravar as informações
            const diretor = new Diretor(cpf,cidade,bonus,descricao_setor,email,endereco,nome,rg,setor,telefone);
            diretor.atualizar().then(()=>{
                resposta.status(200).json({
                    status: true,
                    mensagem: "Diretor atualizado com sucesso!!"
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });

        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Informe todos os campos obrigatórios"
            });
        }
    }
    else{
        // erro do usuário que fez a requisição
        resposta.status(400).json({
            status: false,
            mensagem: "Método não permitido ou formato de requisição diferente de JSON ! Consulte a documentação!"
        });
    }
}
excluir(requisicao, resposta){
    resposta.type("application/json");


    if(requisicao.method === "DELETE"  && requisicao.is('application/json')){
        const dados = requisicao.body;
        const cpf = dados.cpf;
        
        if(cpf){
            const diretor = new Diretor(cpf);
            diretor.excluir().then(()=>{
                resposta.status(200).json({
                    status: true,
                    mensagem: "Diretor apagado com sucesso!!"
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });

        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Informe todos os campos obrigatórios"
            });
        }
    }
    else{
        // erro do usuário que fez a requisição
        resposta.status(400).json({
            status: false,
            mensagem: "Método não permitido ou formato de requisição diferente de JSON ! Consulte a documentação!"
        });
    }
}

consultar(requisicao, resposta){
    resposta.type("application/json");

    if(requisicao.method === "GET" ){
            const diretor = new Diretor();
            diretor.consultar('').then((diretores)=>{
                resposta.status(200).json(diretores);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
    }
    else{
        // erro do usuário que fez a requisição
        resposta.status(400).json({
            status: false,
            mensagem: "Método não permitido ou formato de requisição diferente de JSON ! Consulte a documentação!"
        });
    }
}

}