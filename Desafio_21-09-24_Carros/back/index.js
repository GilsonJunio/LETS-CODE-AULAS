const pg = require('pg')
const express = require('express')
const cors = require('cors')
const app = express();
const {Client, Pool} = pg;

const pool = new Pool({
	user:"gilson",
	password:"admin",
	database:"carros",
	port:5432,
	host:"localhost",
});

async function Enviar_Dados(nome,versao,preco,cambio,motor,potencia,torque){
	const enviar = await pool.query("INSERT INTO carros(nome,versao,preco,cambio,motor,potencia,torque) values($1,$2,$3,$4,$5,$6,$7) returning *",[nome,versao,preco,cambio,motor,potencia,torque])
};

async function Buscar_Dados(){
	const buscar = await pool.query('SELECT * FROM carros')
	const tratar = buscar.rows
	const dados = tratar
	console.log(dados)

	return dados
}








Buscar_Dados();

app.use(express.json());
app.use(cors());

app.get("/buscar", cors(corsOptions),(req,res) =>{	
	const dados = Buscar_Dados()
	//const tratar = 
	//console.log(dados)
	
	dados.then(dados =>{
		console.log(dados)
		res.send(dados)
	})
});

app.post("/enviar",cors(corsOptions),(req,res)=>{
	//console.log(req)

	const dados = req.body;
		console.log(dados)

	const dadosParaEnviar = {
		nome: dados.nome,
		versao: dados.versao,
		preco: dados.preco,
		cambio: dados.cambio,
		motor:dados.motor,
		potencia: dados.potencia,
		torque: dados.torque
	}

	Enviar_Dados(dadosParaEnviar.nome,dadosParaEnviar.versao,dadosParaEnviar.preco,dadosParaEnviar.cambio,dadosParaEnviar.motor,dadosParaEnviar.potencia,dadosParaEnviar.torque);

	res.status(204).send("Dados Enviados")
})

app.listen("7000",()=>{
	console.log("Servidor dos carros Funcionando na porta 7000");
})

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  'Access-Control-Allow-Origin': '*'
}
