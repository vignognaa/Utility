let object = [];
let object2 = [];
let oggettoSplittato = [];
let elementiEstratti = [];
let nElementiEstratti = [];
let arrayVal = [];



function extractFromJson() {
	check();
	let valueToExtract = document.getElementById('keyValue').value;
	let values = document.getElementById('input_test').value;
	if (values.charAt(0) != "[" && values.charAt(values.length - 1) != "]") {
		values = "[" + values + "]";
	}
	const formattedJson = values.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":');
	object = JSON.parse(formattedJson);
	let array = [];

	for(i in object){
		array += object[i][valueToExtract] + '\n';
		nElementiEstratti.push(object[i] + '\n');				
	}
	
	document.getElementById("result").innerHTML = array;
	document.getElementById('numeroElementi').innerHTML = nElementiEstratti.length;
		}

function compareData() {
	check();
	let values = document.getElementById('input_test').value;
	object = values.split('\n');
	let values2 = document.getElementById('input_test2').value;
	object2 = values2.split('\n');
	
	let array = [];
	for(i in object){				
		if (object2.includes(object[i])) {
			document.getElementById('result').innerHTML = "ok";
		}else{
			array += object[i] + '\n';
			nElementiEstratti.push(object[i] + '\n');
		}
		
	}
	document.getElementById('result').innerHTML = array;
	document.getElementById('numeroElementi').innerHTML = nElementiEstratti.length;
}

function split(){
	let valore = document.getElementById('input_test').value;			
	let val = document.getElementById('value').value;
	oggettoSplittato = valore.replaceAll(val, '\n');
	document.getElementById('result').innerHTML = oggettoSplittato;
}

function oggettoInRiga(){
	check();
	let oggettoDaMettereInRiga = document.getElementById('input_test').value;			
	let valSeparatore = document.getElementById('separatore').value;
	oggettoInRiga = oggettoDaMettereInRiga.replaceAll("\n",valSeparatore);
	document.getElementById('result').innerHTML = oggettoInRiga;

}

function reset(){
	window.location.reload()
}


function estrai(){
	check();
	let values = document.getElementById('input_test').value;
	let separatore_a = document.getElementById('separatore_a').value;
	let separatore_b = document.getElementById('separatore_b').value;
	object = values.split('\n');

	if(separatore_a !="" && separatore_b !=""){
		for(i in object){
			if (object[i].includes(separatore_a) && object[i].includes(separatore_b)) {
			let c = object[i].indexOf(separatore_a);
			let b = object[i].indexOf(separatore_b);
			let a = c+1;
			elementiEstratti +=  object[i].substring(a,b) + '\n';
			nElementiEstratti.push(object[i].substring(a,b) + '\n');
			}
		}
		document.getElementById('result').innerHTML = elementiEstratti;
		document.getElementById('numeroElementi').innerHTML = nElementiEstratti.length;
	}else{
			alert("inserire i separatori!!!!! Es: ( )");
		}
}

var parser, xmlDoc;
function estraiDaXml(){
	check();
	let nomeNodoXml = document.getElementById("nomeNodoXml").value;
	let nomeNodoCondizioneXml = document.getElementById("nomeNodoCondizioneXml").value;
	let condizioneXml = document.getElementById("condizioneValoreXml").value;
	let text = document.getElementById("input_test").value;
	object = text.split('</'+nomeNodoXml+'>');
	parser = new DOMParser();

	if(text != "" && condizioneXml != "" && nomeNodoXml != ""){
		let nObj = object.length - 1;
		
		for(let i=0; i<nObj; i++){
			xmlDoc = parser.parseFromString(object[i],"text/xml");
			
			let trusted = xmlDoc.getElementsByTagName(nomeNodoCondizioneXml)[0].childNodes[0].nodeValue;
			
			
			if(trusted == condizioneXml){
				elementiEstratti += object[i] + '</'+nomeNodoXml+'>';
				nElementiEstratti.push(parser.parseFromString(object[i],"text/xml"));
			}
		}
	}
	document.getElementById('result').innerHTML = elementiEstratti;
	document.getElementById('numeroElementi').innerHTML = nElementiEstratti.length;
}

function rimuoviDaXml(){
	check();
	let nomeNodoXml = document.getElementById("_nomeNodoXml").value;
	let nomeNodoCondizioneXml = document.getElementById("_nomeNodoCondizioneXml").value;
	let condizioneXml = document.getElementById("_condizioneValoreXml").value;
	let text = document.getElementById("input_test").value;
	object = text.split('</'+nomeNodoXml+'>');
	arrayVal = condizioneXml.split(";");
	parser = new DOMParser();

	if(text != "" && condizioneXml != "" && nomeNodoXml != ""){
		let nObj = object.length - 1;
		
		for(let i=0; i<nObj; i++){
				xmlDoc = parser.parseFromString(object[i],"text/xml");
				
				object2.push(xmlDoc.getElementsByTagName(nomeNodoCondizioneXml)[0].childNodes[0].nodeValue);
			}


		for(j in arrayVal){
			
			for(x in object2){
				if(object2[x] == arrayVal[j]){
					elementiEstratti += object[x] + '</'+nomeNodoXml+'>';
					nElementiEstratti.push(parser.parseFromString(object[x],"text/xml"));
				}
			}
		}
	document.getElementById('result').innerHTML = elementiEstratti;
	document.getElementById('numeroElementi').innerHTML = nElementiEstratti.length;
	}
}

function getValuesFromHTML(){
	check();
	
	let selectClassId = document.getElementById("selectClassId").value;
	let classOrId = selectClassId + document.getElementById("classOrId").value;
	let valclassOrId = document.getElementById("valclassOrId").value;
	let text = document.getElementById("input_test").value;
	const parser = new DOMParser();
	const parsedDocument = parser.parseFromString(text, "text/html");
	object = Array.from(parsedDocument.querySelectorAll(classOrId));

	for(i in object){
		//let a = parsedDocument.querySelectorAll('tspan');
		
		let currentHTML = object[i];
		let a = currentHTML.querySelectorAll(valclassOrId);
		
		if(a.length>1){
			let currVal = [];
			for(let y=0; y<a.length; y++){
			currVal += currentHTML.getElementsByTagName(valclassOrId)[y].childNodes[0].nodeValue + ' ';
			}
			object2.push(currVal);
			
		}else if(a.length==1){
			object2.push(currentHTML.getElementsByTagName(valclassOrId)[0].childNodes[0].nodeValue);
		}
	}
	let objectToString = object2.toString();
	
	document.getElementById('result').innerHTML = objectToString.replaceAll(',','\n');
	
}

function trovaDuplicati(){
	check();
	let duplicati = [];
	let values = document.getElementById('input_test').value;
	object = values.split('\n');
	for(i in object){
		let contatore = 0;
		let currentValue = object[i];
		for(y in object){
			if(object[y] == currentValue){
				contatore++;
			}
			if(contatore>1 && duplicati.includes(currentValue) == false){
			duplicati += currentValue + ';';
			nElementiEstratti.push(currentValue);
			}
		}
	}
	document.getElementById('result').innerHTML = duplicati.replaceAll(';','\n');
	document.getElementById('numeroElementi').innerHTML = nElementiEstratti.length;
}

function rimuoviDuplicati(){
	check();
	let removeDuplicati = [];
	let values = document.getElementById('input_test').value;
	object = values.split('\n');
	for(i in object){
		let contatore = 0;
		let currentValue = object[i];
		for(y in object){
			if(removeDuplicati.includes(currentValue) == false){
			removeDuplicati += currentValue + ';';
			nElementiEstratti.push(currentValue);
			}
		}
	}
	document.getElementById('result').innerHTML = removeDuplicati.replaceAll(';','\n');
	document.getElementById('numeroElementi').innerHTML = nElementiEstratti.length;
}

function check(){
	if(elementiEstratti !="" || nElementiEstratti !=""){
		document.getElementById('result').innerHTML = "";
		document.getElementById('numeroElementi').innerHTML = "";
		elementiEstratti = "";
		nElementiEstratti = [];
		object = [];
		object2 = [];
	}else{
		
	}
}
