// quando a página for carregada
//const endpoint = 'http://localhost:3205/diretor';
const endpoint = 'https://129.146.68.51/aluno5-ppiadsead/diretor';
const formulario = document.getElementById('formDiretor');
const botaoCadastrar = document.getElementById('cadastrar');
const botaoAtualizar = document.getElementById('atualizar');
const botaoExcluir = document.getElementById('excluir');

function obterDiretorFormulario(){

    return {
        bonus: document.getElementById('bonus').value,
        cidade: document.getElementById('cidade').value,
        cpf: document.getElementById('cpf').value,
        descricao_setor: document.getElementById('descricaosetor').value,
        email: document.getElementById('email').value,
        endereco: document.getElementById('endereco').value,
        nome: document.getElementById('nome').value,
        rg: document.getElementById('rg').value,
        setor: document.getElementById('codsetor').value,
        telefone: document.getElementById('telefone').value
    }
}

function resetarForm(){
    document.getElementById('bonus').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('descricaosetor').value = '';
    document.getElementById('email').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('rg').value = '';
    document.getElementById('codsetor').value = '';
    document.getElementById('telefone').value = '';
}


botaoCadastrar.onclick=(e)=>{

    if(formulario.checkValidity()){
        const diretor = obterDiretorFormulario();
        cadastrarDiretores(diretor);
        prepararFormlario();
        obterDiretores();
        
    }
    formulario.classList.add('was-validated');   
}

botaoAtualizar.onclick=(e)=>{

    if(formulario.checkValidity()){
        const diretor = obterDiretorFormulario();
        atualizarDiretor(diretor);
        prepararFormlario();
        obterDiretores();
    }
    formulario.classList.add('was-validated');   
}
botaoExcluir.onclick=apagarDiretor;
  
window.onload = () => {
    prepararFormlario();
    obterDiretores();
}

function mostrarMensagem(mensagem, tipo){
    let divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML =  `<div class="alert alert-${tipo}" role="alert">
                                ${mensagem}
                             </div>`;

            setTimeout(()=>{
                divMensagem.innerHTML = ''
            },5000);
}

 function obterDiretores(){
    //obter a lista de diretores
   fetch(endpoint,{method:"GET"})
    .then((resposta)=>{
     if(resposta.ok){
            return resposta.json();  
    }
    else{
        return [];
    }
    })
    .then((listaDiretores)=>{
        mostrarDiretores(listaDiretores);
    }).catch((erro)=>{
        mostrarMensagem(erro.mensagem,'danger');
    });
   
}

function cadastrarDiretores(diretor){

    fetch(endpoint,
    {method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(diretor)
    })
    .then((resposta)=>{
     if(resposta.ok){
            return resposta.json();  
    }
    else{
        return {
            status: false,
            mensagem: 'Não foi possível enviar as informações para o backend'
        } 
    }
    }).then((respostaBackEnd)=>{
        if(respostaBackEnd.status){
            mostrarMensagem(respostaBackEnd.mensagem,'success');
            obterDiretores();
        }
        else
        {
            mostrarMensagem(respostaBackEnd.mensagem,'danger');
        }
    }).catch((erro)=>{
        mostrarMensagem(erro.mensagem,'danger');
    });
   
}

function prepararFormlario(bonus="",cidade="",cpf="",descricao_setor="",email="",endereco="",nome="",rg="",setor="",telefone="",acao=""){

    let botaoCadastrar = document.getElementById('cadastrar');
    let botaoAtualizar = document.getElementById('atualizar');
    let botaoExcluir = document.getElementById('excluir');

     document.getElementById('bonus').value = bonus;
     document.getElementById('cidade').value = cidade;
     document.getElementById('cpf').value = cpf;
     document.getElementById('descricaosetor').value = descricao_setor;
     document.getElementById('email').value = email;
     document.getElementById('endereco').value = endereco;
     document.getElementById('nome').value = nome;
     document.getElementById('rg').value = rg;
     document.getElementById('codsetor').value = setor;
     document.getElementById('telefone').value = telefone;


    if(acao === 'excluir'){
        document.getElementById('cpf').disabled = true;
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = false;
    }
    else if(acao === 'atualizar'){
        document.getElementById('cpf').disabled = true;
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
        botaoExcluir.disabled = true;
    }
    else {
        document.getElementById('cpf').disabled = false;
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = true;
    }
}

function apagarDiretor(){

    if(confirm("Confirma a exclusão do diretor selecionado")){

        fetch(endpoint,{method:"DELETE",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({cpf:document.getElementById('cpf').value})
        }).then((resposta)=>{
            if(resposta.ok)
                return resposta.json();
        }).then((dados)=>{
            mostrarMensagem(dados.mensagem,'success');
            
            obterDiretores();

        }).catch((erro)=>{
            mostrarMensagem(erro.mensagem,'danger');
        });
    }
    else{
        prepararFormlario();
    }
}

function atualizarDiretor(diretor){

    if(confirm("Confirma a alteração dos dados selecionado")){
        fetch(endpoint,
            {method:"PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(diretor)
            })
            .then((resposta)=>{
            if(resposta.ok){
                    return resposta.json();  
            }
            else{
                return {
                    status: false,
                    mensagem: 'Não foi possível enviar as informações para o backend'
                } 
            }
            }).then((respostaBackEnd)=>{
                if(respostaBackEnd.status){
                    mostrarMensagem(respostaBackEnd.mensagem,'success');
                   // obterDiretores();   
                }
                else
                {
                    mostrarMensagem(respostaBackEnd.mensagem,'danger');
                }
            }).catch((erro)=>{
                mostrarMensagem(erro.mensagem,'danger');
            });
    }
}



function mostrarDiretores(listaDiretores){
    let elementoDivTabela = document.getElementById("espacoTabela");
    if(listaDiretores.length > 0 )
    {
           // limpar elemento divTabela
        elementoDivTabela.innerHTML = '';
        let tabela = document.createElement('table');
        tabela.className = 'table table-striped table-houver'
        let cabecalhoTabela = document.createElement('thead');
        let corpoTabela = document.createElement('tbody');


        // montado tabela 
        // utilizando literal string
        cabecalhoTabela.innerHTML  = `<tr> 
                                            <th>CPF</th>
                                            <th>CIDADE</th>
                                            <th>BONUS</th>
                                            <th>DESCRIÇÃO SETOR</th>
                                            <th>E-MAIL</th>
                                            <th>ENDEREÇO</th>
                                            <th>NOME</th>
                                            <th>RG</th>
                                            <th>COD. SETOR</th>
                                            <th>TELEFONE</th>
                                            <th>AÇÕES</th>
                                    </tr>`;

        // add cabeçalho na tabela. 
        tabela.appendChild(cabecalhoTabela);

        for (const diretor of listaDiretores) {
            const linhaTabela = document.createElement('tr');
            linhaTabela.innerHTML = 
                                `   <td>${diretor.cpf} </td>
                                    <td>${diretor.cidade} </td>
                                    <td>${diretor.bonus} </td>
                                    <td>${diretor.descricao_setor} </td>
                                    <td>${diretor.email} </td>
                                    <td>${diretor.endereco} </td>
                                    <td>${diretor.nome} </td>
                                    <td>${diretor.rg} </td>
                                    <td>${diretor.setor} </td>
                                    <td>${diretor.telefone}
                                <td> 
                                    <button type='button' onClick="prepararFormlario('${diretor.bonus}',
                                                                                    '${diretor.cidade}',
                                                                                    '${diretor.cpf}',
                                                                                    '${diretor.descricao_setor}',
                                                                                    '${diretor.email}',
                                                                                    '${diretor.endereco}',
                                                                                    '${diretor.nome}',
                                                                                    '${diretor.rg}',
                                                                                    '${diretor.setor}',
                                                                                    '${diretor.telefone}', 'atualizar')"> Editar</button>
                                                                                    &nbsp;
                                    <button type='button' onClick="prepararFormlario('${diretor.bonus}',
                                                                                    '${diretor.cidade}',
                                                                                    '${diretor.cpf}',
                                                                                    '${diretor.descricao_setor}',
                                                                                    '${diretor.email}',
                                                                                    '${diretor.endereco}',
                                                                                    '${diretor.nome}',
                                                                                    '${diretor.rg}',
                                                                                    '${diretor.setor}',
                                                                                    '${diretor.telefone}', 'excluir')"> Excluir</button>
                                </td>`;
                                
        corpoTabela.appendChild(linhaTabela);
        }

        tabela.appendChild(corpoTabela);
        console.log(elementoDivTabela);
        elementoDivTabela.appendChild(tabela);

        //alimentando a tabela com a lista de diretores
    }
    else{
        elementoDivTabela.innerHTML = "<div class='alert alert-warning' role='alert'> Não há registros cadastrados !!!</div>";
    }

}