const {sequelize} = require("./models")

const main = async ()=>{
    try{
        await sequelize.sync({force:true})
    }catch(err){
        console.error(err);
    }
}
main();