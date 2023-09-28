
import conectar from './conexao.js';
import Professor from '../entidades/professor.js';

export default class ProfessorDAO {

    async gravar(Professor) {
        if (Professor instanceof Professor) {
            const conexao = await conectar();
            const sql = 'INSERT INTO Professor (cpf,nome,rg ,endereco,cidade,telefone,email,documento) \
                              values (?,?,?,?,?,?,?,?)';
            const parametros = [Professor.cpf, Professor.nome, Professor.rg, Professor.endereco, Professor.cidade, Professor.telefone, Professor.email, Professor.documento]
            await conexao.execute(sql, parametros);
          
        }
    }

    async atualizar(Professor) {
        if (Professor instanceof Professor) {
            const conexao = await conectar();
            const sql = 'UPDATE Professor SET nome = ?, rg = ?, endereco = ?, cidade = ?, telefone = ?, email = ?, documento = ? WHERE cpf ?';
            const parametros = [Professor.cpf, Professor.nome, Professor.rg, Professor.endereco, Professor.cidade, Professor.telefone, Professor.email, Professor.documento]
            await conexao.execute(sql, parametros);
            
        }
    }

    async excluir(Professor) {
        if (Professor instanceof Professor) {
            const conexao = await conectar();
            const sql = 'DELETE FROM Professor where cpf = ?';
            const parametros = [termo];
            await conexao.execute(sql, parametros);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        if (!termo) termo = "";

        const listaClientes = [];
        const sql = 'SELECT * FROM Professor where nome LIKE ?';
        const parametros = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, parametros);
       
        for (const linha of rows) {
            const cliente =
                new Professor(linha.nome,
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

