const dados = document.getElementsByTagName('input')

const container = document.getElementsByClassName('container')[0]
const address = "http://localhost:9000/"
let botaoenviar = document.getElementById('botaoenviar')

let tabela = document.createElement('table')
	tabela.className = "tabeladedados"
let th_Nome = document.createElement('th')
	th_Nome.textContent = "Nome"
let th_Email = document.createElement('th')
	th_Email.textContent = "Email"
let th_Idade = document.createElement('th')
	th_Idade.textContent = "Idade"
tabela.appendChild(th_Nome)
tabela.appendChild(th_Email)
tabela.appendChild(th_Idade)

async function buscar_Dados(dados){
	const req = await fetch(address,{
		method:'GET'
	})
	dados = await req.json()
	//console.log(dados)

	return dados
}

function renderizar_Alunos(){

	container.appendChild(tabela)
	let dados = buscar_Dados()

	dados.then(alunosDados =>{
		console.log(alunosDados)
		
		alunosDados.map(alunosDados=>{
			//console.log(alunosDados)
			let linha = document.createElement('tr')


			let nome = document.createElement('td')
				nome.textContent = alunosDados.nome
			let email = document.createElement('td')
				email.textContent = alunosDados.email
			let idade = document.createElement('td')
				idade.textContent = alunosDados.idade
			
			tabela.appendChild(linha)



			linha.appendChild(nome)
			linha.appendChild(email)
			linha.appendChild(idade)
		})
	
	})


}
renderizar_Alunos()

async function enviarDados(){
	let email = dados.email.value
	let nome = dados.nome.value
	console.log(nome)
	let idade = dados.idade.value
	console.log(email)
	console.log(nome)
	console.log(idade)

	const req = await fetch('http://localhost:9000/enviar',{
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			nome:nome,
			email:email,
			idade:idade
		})
	})
	console.log(req)

}

botaoenviar.addEventListener('click',botaoClicado =>{
	//alert('sdsd')
	botaoClicado.preventDefault()
	enviarDados()
})