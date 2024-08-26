const conexao = require('../database/connection.database');

//Busca todos os usuários do banco de dados

async function getColheitas(){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_colheita
        `)
        return linhas;
    }catch(erro){
        return erro;
    }
}
  
  //Busca os usuários pelo ID
  
  async function getColheitaById(id){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_colheita where id = ?
        `,[id])
        return linhas;
    }catch(erro){
        return erro;
    }
  }

//Insere um usuario no banco de dados
async function addColheita(
    quantidade,
    dt_colheita,
    arvore,
    defensivo,
    fertilizante
){
        try{
            const [exec] = await conexao.query(`
             insert into tb_arvore(
            quantidade,dt_colheita,arvore,defensivo,fertilizante
             ) values (
              ?,current_timestamp,?,?,?
              )
            `,[quantidade,dt_colheita,arvore,defensivo,fertilizante])
            return exec.affectedRows;
        }catch(erro){
            return erro;
        }

}

module.exports = {
    getColheitas,
    getColheitaById,
    addColheita
};