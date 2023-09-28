// quando a página for carregada

const formulario = document.getElementById('formDiretor');
const botaoCadastrar = document.getElementById('cadastrar');


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
        resetarForm();
    }
    formulario.classList.add('was-validated');   
}


window.onload = () => {
    obterDiretores();

}

function mostrarMensagem(mensagem, tipo){

    let divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML =  `<div class="alert alert-${tipo}" role="alert">
                                ${mensagem}
                             </div>`;

            setTimeout(()=>{
                divMensagem.innerHTML = ''
            },6000);
}


 function obterDiretores(){
    //obter a lista de diretores

   fetch("http://localhost:3205/diretor",{method:"GET"})
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

    fetch("http://localhost:3205/diretor",
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
        }
        else
        {
            mostrarMensagem(respostaBackEnd.mensagem,'danger');
        }
    }).catch((erro)=>{
        mostrarMensagem(erro.mensagem,'danger');
    });
   
}


/*
async function  obterDiretores() {
    const response = await fetch("http://localhost:3205/diretor");
    const movies = await response.json();
    console.log(movies);
    mostrarDiretores(movies);
  }
*/


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
                                            <th>BONUS</th>
                                            <th>CIDADE</th>
                                            <th>CPF</th>
                                            <th>DESCRIÇÃO SETOR</th>
                                            <th>E-MAIL</th>
                                            <th>ENDEREÇO</th>
                                            <th>NOME</th>
                                            <th>RG</th>
                                            <th>COD. SETOR</th>
                                            <th>TELEFONE</th>
                                    </tr>`;

        // add cabeçalho na tabela. 
        tabela.appendChild(cabecalhoTabela);

        for (const diretor of listaDiretores) {
            const linhaTabela = document.createElement('tr');
            linhaTabela.innerHTML = 
                                `<td>${diretor.bonus} </td>
                                <td>${diretor.cidade} </td>
                                <td>${diretor.cpf} </td>
                                <td>${diretor.descricao_setor} </td>
                                <td>${diretor.email} </td>
                                <td>${diretor.endereco} </td>
                                <td>${diretor.nome} </td>
                                <td>${diretor.rg} </td>
                                <td>${diretor.setor} </td>
                                <td>${diretor.telefone} </td>`
                                
        corpoTabela.appendChild(linhaTabela);
        }

        tabela.appendChild(corpoTabela);
        console.log(elementoDivTabela);
        elementoDivTabela.appendChild(tabela);

        //alimentando a tabela com a lista de diretores
    }
    else{
        elementoDivTabela.innerHTML = '<p> Nenhum registro encontrado!!</p>';
    }

}