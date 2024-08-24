let listaDeTarefas = document.getElementsByClassName('lista-de-tarefas')[0];

let botoes = document.getElementsByTagName('button');

async function carregarDados(){
	const req = await fetch('http://localhost:9000/tarefas')
		console.log(req)

	const dados =  await req.json()
		console.log(dados)
	
	dados.map(tarefa =>{
		let li = document.createElement('li')
		li.innerHTML = tarefa.tarefa

		listaDeTarefas.appendChild(li)
	})

	return dados
}

function enviarTarefa(novaTarefa){
	const req =  fetch('http://localhost:9000/adicionartarefa',{
		method:'POST',
		headers:{
			'Content-Type':'application/json'

		},
		body:JSON.stringify({
			tarefa:novaTarefa,
			concluido: false
		})
	})
	
}

botoes[0].addEventListener('click',(botaoClicado) =>{
	console.log(botaoClicado)
	if(botaoClicado.target === botoes.botaoEnviar){
		var novaTarefa = document.getElementsByClassName('enviar-tarefa')[0].value;
		enviarTarefa(novaTarefa)	
		novaTarefa = ""	
	}
	else{
		console.log('VOCÊ APERTOU UM BOTÃO QUE NÃO FUNCIONA')
	}

	let recarregarDados = new Promise((resolve,reject) => {
		resolve(carregarDados())
		reject(console.log('!!!!!!!!!'))
	})
	
	listaDeTarefas.innerHTML = ""

	recarregarDados.then(carregarDados())
})




carregarDados()

