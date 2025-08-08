require("dotenv").config();
const app = require('./server');

app.listen(process.env.PORT, ()=>{
    console.log(`Servicio levantado en puerto ${process.env.PORT}`);
 })