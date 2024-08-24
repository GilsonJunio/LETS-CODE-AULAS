const express = require('express')
const cors = require('cors')
const app = express()
const listaDeTarefas = require('./listaDeTarefas.js')
const objTeste = {teste:'teste'}

app.use(express.json())
app.use(cors())


app.listen('9000',()=>{
	console.log('servidor rodando na porta 9000')
})

app.post('/adicionartarefa',cors(corsOptions),(req,res) =>{

	let tarefaRecebida = req.body
		console.log(tarefaRecebida)

	let tarefas = listaDeTarefas.listaDeTarefas
		console.log(tarefas)
	
	tarefaRecebida.id = tarefas[tarefas.length-1].id+1
		console.log(tarefaRecebida)
	
	
	tarefas.push(tarefaRecebida)

		res.send()






})
app.get('/tarefas',cors(corsOptions),(req,res) =>{
	let tarefas = listaDeTarefas.listaDeTarefas
		console.log(tarefas)
	
	res.send(tarefas)






})

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
  'Access-Control-Allow-Origin': "*"
}
