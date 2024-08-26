const conexao = require('../database/connection.database');

//Busca todos os usuários do banco de dados

async function getMateriais (){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_material
        `)
        return linhas;
    }catch(erro){
        return erro;
    }
}
  
  //Busca os usuários pelo ID
  
  async function getMaterialById (id){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_material where id = ?
        `,[id])
        return linhas;
    }catch(erro){
        return erro;
    }
  }

//Insere um usuario no banco de dados
async function addMaterial(
    nome,
    valor,
    fornecedor,
    tipo
){
        try{
            const [exec] = await conexao.query(`
             insert into tb_material(
             nome,valor,fornecedor,tipo
             ) values (
              ?,?,?,?
              )
            `,[nome,valor,fornecedor,tipo])
            return exec.affectedRows;
        }catch(erro){
            return erro;
        }

}

module.exports = {
    getMateriais,
    getMaterialById,
    addMaterial
};