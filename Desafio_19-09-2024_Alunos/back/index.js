const pg = require('pg')
const express = require('express')
const cors = require('cors')
const app = express();
const {Client, Pool} = pg;

const pool = new Pool({
	user:"gilson",
	password:"admin",
	database:"alunos",
	port:5432,
	host:"localhost",
});

async function Enviar_Dados(nome,email,idade){
	const enviar = await pool.query("INSERT INTO dados(nome, email, idade) values($1,$2,$3) returning *",[nome,email,idade])
};

async function Buscar_Dados(){
	const buscar = await pool.query('SELECT * FROM dados')
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
	console.log(req)

	const dados = req.body;
		console.log(dados)
	const nome = dados.nome;
		console.log(nome)
	const email = dados.email;
		console.log(email)
	const idade = dados.idade;
		console.log(idade)

	Enviar_Dados(nome,email,idade);

	res.status(204).send("Dados Enviados")
})

app.listen("9000",()=>{
	console.log("Servidor Funcionando");
})

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  'Access-Control-Allow-Origin': '*'
}
