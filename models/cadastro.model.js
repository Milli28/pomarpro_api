const conexao = require('../database/connection.database');

//Busca todos os usuários do banco de dados

async function getCadastros(){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_pomar
        `)
        return linhas;
    }catch(erro){
        return erro;
    }
}
  
  //Busca os usuários pelo ID
  
  async function getCadastroById(id){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_pomar where id = ?
        `,[id])
        return linhas;
    }catch(erro){
        return erro;
    }
  }

//Insere um usuario no banco de dados
async function addCadastro(
    apelido,
    num_linhas,
    num_colunas
){
        try{
            const [exec] = await conexao.query(`
             insert into tb_pomar(
             apelido,num_linhas,num_colunas
             ) values (
              ?,?,?
              )
            `,[apelido,num_linhas,num_colunas])
            return exec.affectedRows;
        }catch(erro){
            return erro;
        }

}

module.exports = {
    getCadastros,
    getCadastroById,
    addCadastro
};