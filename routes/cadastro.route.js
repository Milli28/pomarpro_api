var express = require('express');
var router = express.Router();
const sql = require('../models/cadastro.model')

//Adiciona o material
router.post('/add',(req,res)=>{
//Guarda as informações em uma variável para
//facilitar o acesso
let dados = req.body.info;

  sql.addCadastro(
    dados.apelido,
    dados.num_linhas,
    dados.num_colunas
  ).then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(201).json(resposta);
  })
})

//Rota para buscar todos os usuários

router.get('/buscaTodos',(req,res)=>{
  sql.getCadastros().then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(200).json(resposta);
    
  })
})

module.exports = router;