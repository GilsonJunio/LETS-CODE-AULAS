const express = require('express')
const cors = require('cors')
const app = express()
const tarefas = require('listaDeTarefas_modulo')

app.use(express())
app.use(cors())

app.listen(9000, () => {
  console.log('servidor rodando em')
})

app.get('/tarefas',()=>{
  res.json(listaDeTarefas)
})

app.post('/adicionarTarefa',(req,res) =>{
  const tarefa = req.body

  try{
    const novaTarefa = {
      id:tarefas.length+1,
      tarefa:tarefa,
      concluido:false,
    }
    //tarefas.listaDeTarefas.push(novaTarefa)
  } catch(error){
    console.log(error)
  }
  console.log(tarefa)
  res.send('TAREFA ADICIONADA\n')

})