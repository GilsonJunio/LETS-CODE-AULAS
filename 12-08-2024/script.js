let botao = document.getElementsByClassName('botao')
let area = document.getElementsByClassName('area')
function calculo(a,b,operacao){
	let enviar = fetch('http://localhost:9000/soma',{
			'method':'POST',
			'headers':{'content-type':'application/json'},
			'body':JSON.stringify({
				operacao:operacao,
				a:a,
				b:b
		})
		})
	return enviar
}

botao[0].addEventListener('click', (a) => {
	console.log(a)
	console.log(a.target)
	console.log(a.target.name)

	let operacao = a.target.name
	let resultado = calculo(10,5,operacao)
		
	area[0].innerHTML = `A ${operacao.toUpperCase()} É: `
})
botao[1].addEventListener('click', (a) => {
	console.log(a)
	console.log(a.target)
	console.log(a.target.name)

	let operacao = a.target.name
	let resultado = calculo(10,5,operacao)
		
	area[1].innerHTML = `A ${operacao.toUpperCase()} É: `
})
botao[2].addEventListener('click', (a) => {
	console.log(a)
	console.log(a.target)
	console.log(a.target.name)

	let operacao = a.target.name
	let resultado = calculo(10,5,operacao)
		
	area[2].innerHTML = `A ${operacao.toUpperCase()} É: `
})
botao[3].addEventListener('click', (a) => {
	console.log(a)
	console.log(a.target)
	console.log(a.target.name)

	let operacao = a.target.name
	let resultado = calculo(10,5,operacao)
		
	area[3].innerHTML = `A ${operacao.toUpperCase()} É: `
})