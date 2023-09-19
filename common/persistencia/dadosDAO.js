import Dados from '../entidades/dados.js';
import conectar from './conexao.js';

export default class DadosDAO {

    async gravar(dados) {
        if (dados instanceof Dados) {
            const conexao = await conectar();
            const sql = 'INSERT INTO dados (cpf,nome,rg ,endereco,cidade,telefone,email,documento) \
                              values (?,?,?,?,?,?,?,?)';
            const parametros = [dados.cpf, dados.nome, dados.rg, dados.endereco, dados.cidade, dados.telefone, dados.email, dados.documento]
            await conexao.execute(sql, parametros);
          
        }
    }

    async atualizar(dados) {
        if (dados instanceof Dados) {
            const conexao = await conectar();
            const sql = 'UPDATE dados SET nome = ?, rg = ?, endereco = ?, cidade = ?, telefone = ?, email = ?, documento = ? WHERE cpf ?';
            const parametros = [dados.cpf, dados.nome, dados.rg, dados.endereco, dados.cidade, dados.telefone, dados.email, dados.documento]
            await conexao.execute(sql, parametros);
            
        }
    }

    async excluir(dados) {
        if (dados instanceof Dados) {
            const conexao = await conectar();
            const sql = 'DELETE FROM dados where cpf = ?';
            const parametros = [termo];
            await conexao.execute(sql, parametros);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        if (!termo) termo = "";

        const listaClientes = [];
        const sql = 'SELECT * FROM dados where nome LIKE ?';
        const parametros = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, parametros);
       
        for (const linha of rows) {
            const cliente =
                new Dados(linha.nome,
                    linha.cpf,
                    linha.endereco,
                    linha.cidade,
                    linha.telefone,
                    linha.email,
                    linha.documento)

            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}

