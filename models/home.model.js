const conexao = require('../database/connection.database');

//Busca todos os usuários do banco de dados

async function getHomes(){
    try{
        const [linhas] = await conexao.query(`
        select 
p.id,
p.descricao,
sum(if(t.id=11,mi.quantidade,0)) - sum(if(t.id=12,mi.quantidade,0)) as quantidade
from tb_movimentacao m
inner join tb_mov_item mi on mi.movimentacao = m.id
inner join tb_tipo t on t.id = m.tipo
inner join tb_produto p on p.id = mi.produto
where 1=1
and m.tipo in (11,12)
group by p.id;
        `)
        return linhas;
    }catch(erro){
        return erro;
    }
}
  
  //Busca os usuários pelo ID
  
  async function getHomeById(id){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_produto where id = ?
        `,[id])
        return linhas;
    }catch(erro){
        return erro;
    }
  }

//Insere um usuario no banco de dados
async function addHome(
    descricao,
    quantidade
){
        try{
            const [exec] = await conexao.query(`
             insert into tb_produto(
            descricao,quantidade
             ) values (
              ?,?
              )
            `,[descricao,quantidade])
            return exec.affectedRows;
        }catch(erro){
            return erro;
        }

}

module.exports = {
    getHomes,
    getHomeById,
    addHome
};