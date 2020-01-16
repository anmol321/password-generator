const result = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperCase = document.getElementById('uppercase');
const lowerCase = document.getElementById('lowercase');
const numberEle = document.getElementById('numbers');
const symbol = document.getElementById('symbols');
const generate = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
	lower:getRandomLower,
	upper:getRandomUpper,
	number:getRandomNumber,
	symbol:getRandomSymbol
};




generate.addEventListener('click',()=>{
	const length = parseInt(lengthEl.value);
	const hasLower = lowerCase.checked;
	const hasUpper = upperCase.checked;
	const hasNumber = numberEle.checked;
	const hasSymbol = symbol.checked;
	result.innerText = generatePassword(hasLower, hasUpper, hasSymbol, hasNumber, length);

});

clipboard.addEventListener('click',()=>{
	const textarea = document.createElement('textarea');
	const password = result.innerText;
	if(!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password Copied to clipboard');
})

function generatePassword(lower, upper, symbol, number, length) {
	let password = "";
	const typesCount = lower +upper +number +symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(ele=> Object.values(ele)[0]);
	if(typesCount==0) {
		return '';
	}
	for(let i=0;i<length;i+=typesCount) {
		typesArr.forEach(type=>{
			const funcName = Object.keys(type)[0];
			password+=randomFunc[funcName]();
		});
	}
	return password.slice(0, length);
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}


function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random()*10) + 48);

}

function getRandomSymbol() {
	const symbols = "!@#$^&*()+<>/.,:;~[]";
	return symbols[Math.floor(Math.random()*symbols.length)];
}

