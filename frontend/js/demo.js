const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'Share_spot'
});
client.connect();
// client.query("select * from user_details",(res,err)=>{
//     if(!err){
//         console.log(res.rows)
//     }
//     else{
//         console.log(err)
//     }
//     client.end;
// })