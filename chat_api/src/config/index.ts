import merge from 'lodash.merge'
import production from './production'
import local  from './local';
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig ;

if(stage === 'production'){
     envConfig = production;
}else{
    envConfig = local;
}

export default merge({
    stage,
    dbUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
},envConfig)