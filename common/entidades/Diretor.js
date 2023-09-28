import DiretorDAO from '../persistencia/DiretorDAO.js';

export default class Diretor
{
    #bonus
    #cidade
    #cpf
    #descricao_setor
    #email
    #endereco
    #nome
    #rg
    #setor
    #telefone

    constructor(bonus,cidade,cpf,descricao_setor,email,endereco,nome,rg,setor,telefone){

        this.#bonus = bonus;
        this.#cidade = cidade;
        this.#cpf = cpf;
        this.#descricao_setor = descricao_setor;
        this.#email = email;
        this.#endereco = endereco;
        this.#nome = nome;
        this.#rg = rg;
        this.#setor = setor;
        this.#telefone = telefone; 

    }


    toJSON(){
        return {
            bonus: this.#bonus,
            cidade: this.#cidade, 
            cpf: this.#cpf,
            descricao_setor:this.#descricao_setor,
            email:this.#email,
            endereco:this.#endereco,
            nome:this.#nome,
            rg:this.#rg,
            setor:this.#setor,
            telefone:this.#telefone  
        }
    }
    

    get bonus(){
        return this.#bonus;
    }

    get nome(){
        return this.#nome;
    }

    get cidade(){
        return this.#cidade;
    }

    get descricao_setor(){
        return this.#descricao_setor;
    }

    get email(){
        return this.#email;
    }

    get endereco(){
        return this.#endereco;
    }

    get rg(){
        return this.#rg;
    }

    get setor(){
        return this.#setor;
    }

    get telefone (){
        return this.#telefone;
    }
    get cpf(){
        return this.#cpf;
    }
    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    set bonus(novoBonus){
        this.#bonus = novoBonus;
    }

    set cidade (novaCidade){
        this.#cidade = novaCidade;
    }
    
    set descricao_setor(novaDescricao_Setor){
        this.#descricao_setor = novaDescricao_Setor;
    }
    
    set email (novoEmail){
        this.#email = novoEmail;
    }
    
    set endereco (novoEndereco){
        this.#endereco = novoEndereco;
    }
    
    set nome(novoNome){
        this.#nome = novoNome;
    }
    
    set rg(novoRg){
        this.#rg = novoRg;
    }
  
    set setor (novoSetor){
        this.#setor = novoSetor
    }

    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }
 

    async gravar(){
        const diretorDAO = new DiretorDAO();
        diretorDAO.incluir(this);
    }

    async atualizar(){
        const diretorDAO = new DiretorDAO();
        diretorDAO.alterar(this);
    }

    async excluir(){
        const diretorDAO = new DiretorDAO();
        diretorDAO.excluir(this);
    }

    async consultar(termo){
        const diretorDAO = new DiretorDAO();
        const lista = diretorDAO.consultar(termo);
        return lista;
    }

}