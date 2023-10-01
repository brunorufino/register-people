
CREATE TABLE diretor (
    cliente_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cpf int(11) NOT NULL,
    rg varchar(20) NOT NULL,
    nome varchar(50) NOT NULL,
    email varchar(40) NOT NULL,
    cidade varchar(40)NOT NULL,
    telefone int(13),
    endereco varchar(60) NOT NULL,
    documento varchar(20) 
);