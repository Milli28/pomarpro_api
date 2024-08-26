const conexao = require('../database/connection.database');

//Busca todos os usuários do banco de dados

async function getMovimentos(){
    try{
        const [linhas] = await conexao.query(`
            select 
                m.id,
                m.dt_moviment,
                mi.produto,
                p.descricao as ds_produto,
                mi.quantidade,
                t.descricao as ds_tipo
            from tb_movimentacao m
                inner join tb_mov_item mi on mi.movimentacao = m.id
                inner join tb_produto p on p.id = mi.produto
                inner join tb_tipo t on t.id = m.tipo
        `)
        return linhas;
    }catch(erro){
        return erro;
    }
}
  
  //Busca os usuários pelo ID
  
  async function getMovimentoById(id){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_movimentacao where id = ?
        `,[id])
        return linhas;
    }catch(erro){
        return erro;
    }
  }

//Insere um usuario no banco de dados
async function addMovimento(
    tipo
){
        try{
            const [exec] = await conexao.query(`
             insert into tb_movimentacao(
             dt_moviment,tipo
             ) values (
              current_timestamp,?
              )
            `,[tipo])

            const [linha] = await conexao.query(`
                select last_insert_id() as id;
               `)

            return linha[0];
        }catch(erro){
            return erro;
        }
}
async function addItem(
    movimento,
    produto,
    quantidade
){
        try{
            const [exec] = await conexao.query(`
             insert into tb_mov_item(
             produto,quantidade,movimentacao
             ) values (
              ?,?,?
              )
            `,[produto,quantidade,movimento])

            return  exec.affectedRows;
        }catch(erro){
            return erro;
        }
}




module.exports = {
    getMovimentos,
    getMovimentoById,
    addMovimento,
    addItem
};