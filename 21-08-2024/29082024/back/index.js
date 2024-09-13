import express from 'express'

//const express = require('express')
import cors from 'cors'
import pg from 'pg'
const app = express()


app.use(express.json())
app.use(cors())

const {Pool} = pg

const pool = new Pool({
	user:'gilson',
	port:"5432",
	host:'127.0.0.1',
	database:'minhadatabase',
	password:'admin'
})

async function buscarDados(){
	const alunos = await pool.query('select * from alunos')
	console.log(alunos.rows)
}

async function adicionarDados(email,nome,idade){
	const aluno = await pool.query("INSERT INTO dados(email,nome,idade) values($1,$2,$3) returning*",[email,nome,idade])
	
	console.log(email,nome,idade)
}
async function criarTabela(){
	const criar = await pool.query("CREATE TABLE alunos (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL)")
	
	console.log("Tabela criada")

}

app.get('/', async (req,res)=>{
	const dados = await pool.query('select * from dados');
	//console.log(dados.rows)
	
	res.json(dados.rows)

})
app.post('/enviar',async (req,res)=>{
	console.log('------------------')
	
	console.log(req.body)
	
	let dadosRecebidos = req.body
	let dadosTratados = [dadosRecebidos.nome,dadosRecebidos.email,dadosRecebidos.idade]
	
	adicionarDados(dadosTratados[0],dadosTratados[1],dadosTratados[2])
	
	res.status(200).json('Dados enviados!')
})
app.listen('9000',()=>{
	console.log('Servidor rodando')
})