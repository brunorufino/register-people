import express from 'express';
import autenticar from './seguranca/autenticacao.js';
import session from 'express-session';
import rotaLogin from './rotas/rotaLogin.js';
import rotaDados from './common/rotas/rotaDados.js';



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
app.use('/dados', rotaDados);



app.use('/login', rotaLogin);

// configurar a aplicação para que seja necessário o usuário realizar login na aplicação
app.use(autenticar, express.static('./protegido'));




app.listen(port, host, () => {
    console.log('Servidor está ligado na porta :'+ port);
})


