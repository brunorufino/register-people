import express from 'express';
import autenticar from './seguranca/autenticacao.js';
import session from 'express-session';
import rotaLogin from './rotas/rotaLogin.js';
import rotaDiretor from './common/rotas/rotaDiretor.js';



// Todas as interfaces disponiveis
// sem restrições de conexão
const host = '0.0.0.0';
const port = 3205;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Criação de sessão para origemdas requisições
app.use(session({
    secret: 'Minh4ChAveS3cret4',
    resave: true, // a cada requisição da internet salva a sessão
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

/// para que o express consiga extrair das requisições os valores dos formulários


//configurar a aplicação para que ela publique tudo que está na pasta publico
//assegure que o conteudo seja estático
app.use(express.static('./publico'));
app.use('/diretor', rotaDiretor);


app.use('/login', rotaLogin);

// configurar a aplicação para que seja necessário o usuário realizar login na aplicação
app.use(autenticar, express.static('./protegido'));




app.listen(port, host, () => {
    console.log('Servidor está ligado na porta :'+ port);
})


/*

Testes na Classe DAO e Entidade

let dir = new Diretor(90,"Santos",31231,"CGO","diretoria@liquidacao.com.br","CAMPUS 1 - Pres. Prudente","Bruno R","404314311",300,1899171231)

//console.log(dir.toJSON());

/*dir.gravar().then(()=>{
    console.log("Diretor foi gravado com sucesso no banco");
});

*/

/*dir.atualizar().then(()=>{
    console.log("Diretor alterado com sucesso!!");
})


dir.excluir().then(()=>{
    console.log("Diretor Excluído!!");
})


const dire = new Diretor();
dire.consultar("Esmaelson").then((diretores)=>{
    for(const diretor of diretores){
        console.log(diretor.toJSON());
    }
});


*/ 