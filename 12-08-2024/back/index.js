const express = require('express')
const app= express()
const cors = require ('cors')
const port = 9000
const soma = require('soma')
const subtracao = require('subtracao')
const multiplicacao = require('multiplicacao')
const divisao = require('divisao')

app.use(express.json())



app.use(cors())

app.get('/', (req,res) =>{
	res.send('Hello World!')
})

app.get('/home', (req,res) =>{
	res.send('Home')
})

app.get('/users', (req,res) =>{
	res.json([
	{
      id: 1,
      name: "Mauricio",
    },
    {
      id: 2,
      name: "João Pedro",
    },
    {
      id: 3,
      name: "Luana",
    },
    {
      id: 4,
      name: "Jonathas Portela",
    }
    ,
    {
      id: 5,
      name: "Gilson",
    }
    ]
   )
})
app.listen(port,() => {
	console.log('servidor funcionando na porta ' + port)
})
app.get('/users', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
app.post('/soma', cors(corsOptions), (req,res) => {
  console.log('---------------------')

  const valoresEnviados = req.body
    console.log(valoresEnviados)
    console.log('primeiro valor: '+valoresEnviados.a)
    console.log('segundo valor: '+valoresEnviados.b)
  
  if(valoresEnviados.operacao === 'soma'){
    let total = soma(valoresEnviados.a,valoresEnviados.b)
    let operacao = valoresEnviados.operacao
    
    console.log(`iniciando ${operacao}`)
    console.log(`enviando: ${total}`)
    
    res.send(JSON.stringify(total))
  }
  else if(valoresEnviados.operacao === 'multiplicacao'){
    let total = multiplicacao(valoresEnviados.a,valoresEnviados.b)
    let operacao = valoresEnviados.operacao
    
    console.log(`iniciando ${operacao}`)
    console.log(`enviando: ${total}`)
    
    res.send(JSON.stringify(total))
  }
  else if(valoresEnviados.operacao === 'divisao'){
    let total = divisao(valoresEnviados.a,valoresEnviados.b)
    let operacao = valoresEnviados.operacao
    
    console.log(`iniciando ${operacao}`)
    console.log(`enviando: ${total}`)
    
    res.send(JSON.stringify(total))
  }
  else if(valoresEnviados.operacao === 'subtracao'){
    
    let total = subtracao(valoresEnviados.a,valoresEnviados.b)
    let operacao = valoresEnviados.operacao

    console.log(`iniciando ${operacao}`)
    console.log(`enviando: ${total}`)

    res.send(JSON.stringify(total))
  }
  else{
    console.log('operação inválida')
  }
  



})




























var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  'Access-Control-Allow-Origin': "http://localhost:9000/soma"
}
app.get('/soma', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})