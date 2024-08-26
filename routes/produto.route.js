var express = require('express');
var router = express.Router();
const sql = require('../models/produto.model')

//Adiciona o material
router.post('/add',(req,res)=>{
//Guarda as informações em uma variável para
//facilitar o acesso
let dados = req.body.info;

  sql.addProduto(
    dados.descricao,
    dados.unidade_medida,
    dados.valor,
    dados.tipo
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
  sql.getProdutos().then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(200).json(resposta);
    
  })
})

module.exports = router;