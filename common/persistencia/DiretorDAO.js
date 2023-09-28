import Diretor from '../entidades/Diretor.js';
import conectar from './conexao.js';

export default class DiretorCtrl{

        async incluir(diretor){

            if(diretor instanceof Diretor){
                const conexao = await conectar();
                const sql = "INSERT INTO diretor (cpf,rg,nome,email,cidade,telefone, setor, descricao_setor, bonus, endereco) VALUES(?,?,?,?,?,?,?,?,?,?)";
                const valores = [diretor.cpf,diretor.rg,diretor.nome,diretor.email,diretor.cidade,diretor.telefone,diretor.setor,diretor.descricao_setor,diretor.bonus,diretor.endereco];
                await conexao.query(sql,valores);
            }
        }
        async alterar(diretor){
            if(diretor instanceof Diretor){
                const conexao = await conectar();
                const sql = "UPDATE diretor SET rg = ? ,nome = ? ,email = ? ,cidade = ?, telefone = ? , setor = ? , descricao_setor = ? , bonus = ? , endereco = ? WHERE cpf = ?";
                const valores = [diretor.rg,diretor.nome,diretor.email,diretor.cidade,diretor.telefone,diretor.setor,diretor.descricao_setor,diretor.bonus,diretor.endereco,diretor.cpf];
                await conexao.query(sql,valores);
            }
        }
        async excluir(diretor){
            if(diretor instanceof Diretor){
                const conexao = await conectar();
                const sql = "DELETE FROM diretor WHERE cpf = ?";
                const valores = [diretor.cpf];
                await conexao.query(sql,valores);
            }
        }
        async consultar(termo){

            const conexao = await conectar();
            const sql = "SELECT * FROM diretor WHERE nome LIKE ?";
            const valores = ['%' + termo +'%'];
            const [rows] = await conexao.query(sql,valores);
            const listaDiretor = [];


            for(const row of rows){
                const diretor = new Diretor(row['bonus'],row['cidade'],row['cpf'],row['descricao_setor'],row['email'],row['endereco'],row['nome'],row['rg'],row['setor'],row['telefone']);
                listaDiretor.push(diretor);
            }

            return listaDiretor;
        }
}