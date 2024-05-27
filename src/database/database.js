//importa a tool pg (postgres)
const {Pool} = require("pg")

//conecta a string do banco relacional
const pool = new Pool({
    connectionString: 'postgres://vhqfpyjm:J-sMrNtqI_bfVg6eRNL0_GY_YRvTdjGS@kesavan.db.elephantsql.com/vhqfpyjm'
})

//exporta a função pool
module.exports = {pool}