export default class Dados{
    #cpf
    #nome
    #rg 
    #endereco
    #cidade
    #telefone
    #email
    #documento

constructor (nome,cpf,rg,endereco,cidade,telefone,email,documento){
    this.#cpf = cpf;
    this.nome = nome;
    this.rg = rg;
    this.endereco = endereco;
    this.cidade = cidade;
    this.telefone = telefone;
    this.email = email;
    this.documento = documento;
}

get cpf(){
    return this.#cpf;
}
get nome(){
    return this.#nome;
}
get rg(){
    return this.#rg;
}
get endereco(){
    return this.#endereco;
}
get cidade(){
    return this.#cidade;
}
get telefone(){
    return this.#telefone;
}
get email(){
    return this.#email;
}
get documento(){
    return this.#documento;
}

set cpf(novoCpf){
    this.#cpf = novoCpf;
}
set nome(novoNome){
    this.#nome = novoNome
}
set rg(novoRg){
    this.#rg = novoRg;
}
set endereco(novoEndereco){
    this.#endereco = novoEndereco;
}
set cidade(novaCidade){
    this.#cidade = novaCidade
}
set telefone(novoTelefone){
    this.#telefone = novoTelefone;
}
set email(novoEmail){
    this.#email = novoEmail;
}
set documento(novoDocumento){
    this.#documento = novoDocumento;
}

toJSON(){
    return {
        nome: this.#nome,
        documento: this.#documento,
        cpf: this.#cpf,
        rg: this.#rg,
        endereco: this.#endereco,
        cidade: this.#cidade,
        email: this.#email,
        telefone: this.#telefone
    }
}



}
