import { Router } from "express";
import DiretorCTRL from "../controle/DiretorCtrl.js";

const rotaDiretor = new Router();

//definição de endpoints que serão processadas 

const diretorCTRL = new DiretorCTRL();

rotaDiretor.post('/', diretorCTRL.gravar)
.put('/', diretorCTRL.atualizar)
.delete('/', diretorCTRL.excluir)
.get('/', diretorCTRL.consultar)

export default rotaDiretor;