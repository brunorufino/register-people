import Professor from "../entidades/professor.js";

export default class ProfessorCtrl {

    gravar(requisicao, resposta) {

        resposta.type('application/json'); // mime type
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const Professor = requisicao.body;
            const cpf = Professor.cpf;
            const nome = Professor.nome;
            const rg = Professor.rg;
            const endereco = Professor.endereco;
            const cidade = Professor.cidade;
            const telefone = Professor.telefone;
            const email = Professor.email;
            const documento = Professor.documento;


            if (cpf && nome && rg && endereco && cidade && telefone && email && documento) {
                const Professor = new Professor(cpf, nome, rg, endereco, cidade, telefone, email, documento);
                Professor.gravar().then(() => {
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
            const Professor = requisicao.body;
            const cpf = Professor.cpf;
            const nome = Professor.nome;
            const rg = Professor.rg;
            const endereco = Professor.endereco;
            const cidade = Professor.cidade;
            const telefone = Professor.telefone;
            const email = Professor.email;
            const documento = Professor.documento;

            if (cpf && nome && rg && endereco && cidade && telefone && email && documento) {
                const Professor = new Professor(cpf, nome, rg, endereco, cidade, telefone, email, documento);

                Professor.atualizar().then(() => {
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
            const Professor = requisicao.body;
            const cpf = Professor.cpf;
            if (cpf) {
                const Professor = new Professor();
                Professor.excluir(Professor).then(() => {
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
            const Professor = new Professor();
            Professor.consultar(termo).then((ProfessorPessoais) => {
                resposta.json(ProfessorPessoais);
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





