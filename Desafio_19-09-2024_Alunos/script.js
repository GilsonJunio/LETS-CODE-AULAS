const address = "http://localhost:9000"
const metodo = {buscar:"/buscar",enviar:"/enviar"}

const botoes = document.getElementsByTagName('button')
	const botaoEnviar = botoes.enviarDados
const input = document.getElementsByTagName('input')
	const inputNome = input.nome
	const inputEmail = input.email
	const inputIdade = input.idade
const tabela = document.getElementsByTagName('table')[0]

async function Buscar_Dados(){
	const req = await fetch(address+metodo.buscar)
	const parse = await req.json()
		console.log(parse)
	const dados = parse

	return dados
}

async function Enviar_Dados(nomeRepassado,emailRepassado,idadeRepassada){
	const enviar = await fetch(address+metodo.enviar,{
		method:'POST',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({
			nome:nomeRepassado,
			email:emailRepassado,
			idade:idadeRepassada,
		})
	})
	console.log(enviar)
}

function Anexar_Dados(){
	const buscar = Buscar_Dados()
	buscar.then(dados =>{
		console.log(dados)
		
		dados.map(dado =>{
			//const
			let tr = document.createElement('tr')
				tabela.appendChild(tr)

			let nome = document.createElement('td')
				nome.textContent = dado.nome
			let email = document.createElement('td')
				email.textContent = dado.email
			let idade = document.createElement('td')
				idade.textContent = dado.idade			

			tr.appendChild(nome)
			tr.appendChild(email)
			tr.appendChild(idade)

		})
	})
}

Anexar_Dados()


botaoEnviar.addEventListener('click',botaoClicado=>{
	botaoClicado.preventDefault();
	const nomeRepassado = inputNome.value;
	const emailRepassado = inputEmail.value;
	const idadeRepassada = inputIdade.value;
	console.log(nomeRepassado);
	console.log(emailRepassado);
	console.log(idadeRepassada);

	Enviar_Dados(nomeRepassado,emailRepassado,idadeRepassada);
	Anexar_Dados()

})