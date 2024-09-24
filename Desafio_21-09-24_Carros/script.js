

const address = "http://localhost:7000"
const metodo = {buscar:"/buscar",enviar:"/enviar"}

const botoes = document.getElementsByTagName('button')
	const botaoEnviar = botoes.enviarDados

const input = document.getElementsByTagName('input')
	const inputNome = input.carro
	const inputVersao = input.versao
	const inputPreco = input.preco
	const inputMotor = input.motor
	const inputCambio = input.cambio
	const inputPotencia = input.potencia
	const inputTorque = input.torque

const tabela = document.getElementsByTagName('table')[0]

async function Buscar_Dados(){
	const req = await fetch(address+metodo.buscar)
	const parse = await req.json()
		console.log(parse)
	const dados = parse

	return dados
}

async function Enviar_Dados(nomeRepassado,versaoRepassada,precoRepassado,motorRepassado,cambioRepassado,potenciaRepassada,torqueRepassado){
	const enviar = await fetch(address+metodo.enviar,{
		method:'POST',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({
			nome:nomeRepassado,
			versao:versaoRepassada,
			preco:precoRepassado,
			motor:motorRepassado,
			cambio:cambioRepassado,
			potencia:potenciaRepassada,
			torque:torqueRepassado,
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
			
			let versao = document.createElement('td')
				versao.textContent = dado.versao		
			
			let preco = document.createElement('td')
				preco.textContent = dado.preco
			
			let motor = document.createElement('td')
				motor.textContent = dado.motor
			
			let cambio = document.createElement('td')
				cambio.textContent = dado.cambio
			
			let potencia = document.createElement('td')
				potencia.textContent = dado.potencia

			let torque = document.createElement('td')
				torque.textContent = dado.torque

			tr.appendChild(nome)
			tr.appendChild(versao)
			tr.appendChild(preco)
			tr.appendChild(motor)
			tr.appendChild(cambio)
			tr.appendChild(potencia)
			tr.appendChild(torque)			
		})
	})
}

Anexar_Dados()


botaoEnviar.addEventListener('click',botaoClicado=>{
//	botaoClicado.preventDefault();
	const valoresRepassados = {
		nome: inputNome.value,
		versao: inputVersao.value,
		preco: inputPreco.value,
		motor: inputMotor.value,
		cambio: inputCambio.value,
		potencia: inputPotencia.value,
		torque: inputTorque.value	
	}
	/*
	const valoresParaEnviar = [
		valoresRepassados.nome,
		valoresRepassados.versao,
		valoresRepassados.preco,
		valoresRepassados.potencia,
		valoresRepassados.cambio,
		valoresRepassados.motor,
		valoresRepassados.torque
		]
	*/


/*
	console.log(valoresParaEnviar[0]);
	console.log(valoresParaEnviar[1]);
	console.log(valoresParaEnviar[2]);
	console.log(valoresParaEnviar[3]);
	console.log(valoresParaEnviar[4]);
	console.log(valoresParaEnviar[5]);
*/
	Enviar_Dados(valoresRepassados.nome,valoresRepassados.versao,valoresRepassados.preco,valoresRepassados.motor,valoresRepassados.cambio,valoresRepassados.potencia,valoresRepassados.torque);
	Anexar_Dados()

})