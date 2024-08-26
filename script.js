let listaDeTarefas = document.getElementsByClassName('lista-de-tarefas')[0]; 
let tarefas_listaDeTarefas = document.getElementsByClassName('tarefa')
let botoes = document.getElementsByTagName('button');
let botoesEditar = document.getElementsByClassName('botaoEditar');
let botoesSalvar = document.getElementsByClassName('botaoSalvar')
let campoDeEditarTarefa = document.getElementsByClassName('campoDeEditarTarefa')

async function carregarDados(){
	const req = await fetch('http://localhost:9000/tarefas')
//		console.log(req)

	const dados =  await req.json()
//		console.log(dados)

	let tarefas = dados

	console.log(tarefas)

	tarefas.map(tarefa =>{
		//console.log(tarefa)
		let li = document.createElement('li')
			li.innerHTML = tarefa.tarefa
			li.className = 'tarefa'
		
		let checkbox = document.createElement('input')
			checkbox.type = 'checkbox'
		let labelConcluido = document.createElement('label')
			labelConcluido.innerHTML = "CONCLUÍDO"
		let botaoEditar = document.createElement('button')
			botaoEditar.name = 'botaoEditar'
			botaoEditar.className = 'botaoEditar'
			botaoEditar.innerHTML = "EDITAR"

		listaDeTarefas.appendChild(li)
		li.appendChild(botaoEditar)
		li.appendChild(labelConcluido)
		li.appendChild(checkbox)
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

function editarTarefa(tarefaEditada,tarefaAntiga){
	const req =  fetch('http://localhost:9000/editartarefas',{
		method:'PUT',
		headers:{
			'Content-Type':'application/json'

		},
		body:JSON.stringify({
			tarefaAntiga:tarefaAntiga,
			tarefaNova:tarefaEditada,
		})
	})
	
}


botoes.botaoEnviar.addEventListener('click',(botaoClicado) =>{
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

let dadosIniciais = new Promise((resolve,reject) =>{
resolve(carregarDados())
reject('erro')

})
dadosIniciais.then(()=>{
	//console.log(botoes.botaoEditar)

	for(i in botoesEditar){
		botoesEditar[i].addEventListener('click', botaoClicado=>{
			//console.log(botaoClicado)
			//console.log(botaoClicado.target.parentNode)
			
			let tarefaAntiga = botaoClicado.target.parentNode.firstChild.textContent
			let campoDaTarefaAntiga = botaoClicado.target.parentNode
			let tarefa = campoDaTarefaAntiga.firstChild
			console.log(tarefa) 

			let inputDeEditarTarefa = document.createElement('input')
				inputDeEditarTarefa.value = tarefa.textContent
				inputDeEditarTarefa.className = "campoDeEditarTarefa"

			let botaoSalvar = document.createElement('button')
				botaoSalvar.className = "botaoSalvar"
				botaoSalvar.textContent = "SALVAR ALTERAÇÕES"

			campoDaTarefaAntiga.appendChild(botaoSalvar)
			campoDaTarefaAntiga.removeChild(tarefa)
			campoDaTarefaAntiga.removeChild(botaoClicado.target)
			campoDaTarefaAntiga.insertBefore(inputDeEditarTarefa,campoDaTarefaAntiga.firstChild)
			
			for (i in botoesSalvar){
				console.log(i)
				botoesSalvar[i].addEventListener('click',botaoClicado =>{
					let tarefaEditada = botaoClicado.target.parentNode.firstChild.value
					console.log(tarefaEditada)

					console.log(tarefaAntiga)
					editarTarefa(tarefaEditada,tarefaAntiga)
	
					listaDeTarefas.removeChild(botoesSalvar[i])
					carregarDados()
				})

			}
		})

	}



})




