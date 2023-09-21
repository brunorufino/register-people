import { Router } from "express";
import ProfessorCtrl from "../controle/ProfessorCtrl.js";

const rotaProfessor = Router();
const dCTRL = new ProfessorCtrl();


rotaProfessor.get('/:termo', dCTRL.consultar)
    .get('/', dCTRL.consultar)
    .post('/', dCTRL.gravar)
    .put('/', dCTRL.atualizar)
    .delete('/', dCTRL.excluir)

export default rotaProfessor;
