const express = require('express')
const cors = require('cors')
const app = express()
const listaDeTarefas = require('./listaDeTarefas.js')
const tarefas = listaDeTarefas.listaDeTarefas

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
		res.status(200).json('tarefaAdicionada')
})

app.get('/tarefas',cors(corsOptions),(req,res) =>{
	let tarefas = listaDeTarefas.listaDeTarefas
		console.log(tarefas)
	
	res.send(tarefas)
})

app.put('/editartarefas', cors(corsOptions),(req,res) =>{
	console.log(req.body)
	console.log("TAREFAS ATUAIS: "+ JSON.stringify(tarefas))

	let tarefaRecebida = req.body;
	console.log('TAREFA RECEBIDA:' + JSON.stringify(tarefaRecebida))

	let tarefaParaEditar = tarefaRecebida.tarefaAntiga;
		//console.log(tarefaParaEditar)
		console.log('TAREFA PARA EDITAR:' + tarefaParaEditar)

	let tarefaAntigaProcurar = tarefas.findIndex(tarefaAntiga =>{
		console.log(tarefaAntiga)
		let tarefaIgual = tarefaParaEditar === tarefaAntiga.tarefa 
		return tarefaIgual
	})
	console.log(`EXISTE ALGUMA TAREFA ANTIGA IGUAL À ${tarefaParaEditar}? `+JSON.stringify(tarefaAntigaProcurar))
	console.log(tarefas[tarefaAntigaProcurar])
	
	let tarefaEditada = {tarefa:tarefaRecebida.tarefaNova,concluido:false,id:tarefaAntigaProcurar}
	
	tarefas[tarefaAntigaProcurar] = tarefaEditada	
	console.log('tarefa atualizada' + tarefas[tarefaAntigaProcurar])
	res.status(200).json('tarefaAdicionada')

})

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
  'Access-Control-Allow-Origin': "*"
}
