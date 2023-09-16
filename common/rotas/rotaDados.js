import { Router } from "express";
import DadosCtrl from "../controle/DadosCtrl.js";

const rotaDados = Router();
const dCTRL = new DadosCtrl();


rotaDados
    .get('/:termo', dCTRL.consultar)
    .get('/', dCTRL.consultar)
    .post('/', dCTRL.gravar)
    .put('/', dCTRL.atualizar)
    .delete('/', dCTRL.excluir)


export default rotaDados;
