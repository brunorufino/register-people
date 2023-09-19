import Dados from "../entidades/dados.js";

export default class DadosCtrl {

    gravar(requisicao, resposta) {

        resposta.type('application/json'); // mime type
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const rg = dados.rg;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const telefone = dados.telefone;
            const email = dados.email;
            const documento = dados.documento;


            if (cpf && nome && rg && endereco && cidade && telefone && email && documento) {
                const dados = new Dados(cpf, nome, rg, endereco, cidade, telefone, email, documento);
                dados.gravar().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Cliente inserido com sucesso!!"
                    })
                }).catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Erro ao cadastrar: " + erro.mensage
                    })
                })
            }
            else {
                resposta.status({
                    status: false,
                    mensagem: "Informe todos os campos do request"
                })
            }



        }
        else {
            resposta.status({
                status: false,
                mensagem: "Request inválida!!"
            })
        }

    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json'); // mime type
        if (requisicao.method === 'PUT' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const rg = dados.rg;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const telefone = dados.telefone;
            const email = dados.email;
            const documento = dados.documento;

            if (cpf && nome && rg && endereco && cidade && telefone && email && documento) {
                const dados = new Dados(cpf, nome, rg, endereco, cidade, telefone, email, documento);

                dados.atualizar().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Cliente atualizado com sucesso."
                    })
                }).catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Erro ao atualizar"
                    })

                })
            }
        }

    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if (cpf) {
                const dados = new Dados();
                dados.excluir(dados).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Cliente excluído"
                    })
                }).catch((erro) => {
                    resposta.json({
                        status: true,
                        mensagem: "Erro ao executar o excluir: " + erro.message
                    })
                })
            }
            else {
                resposta.json({
                    status: true,
                    mensagem: "O campo CPF está vázio"
                })
            }
        }
        else {
            resposta.json({
                status: true,
                mensagem: "Requisição inváida" + erro.message
            })
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (resposta.method === "GET") {
            let termo = requisicao.query.termo;
            if (!termo) termo = "";
            const dados = new Dados();
            dados.consultar(termo).then((dadosPessoais) => {
                resposta.json(dadosPessoais);
            }).catch((erro) => {
                resposta.json({
                    status: true,
                    mensagem: "Erro ao executar a consulta de clientes: " + erro.message
                })
            })
        }
        else {
            resposta.status({
                status: false,
                mensagem: "Request inválida!!"
            })
        }

    }


}





