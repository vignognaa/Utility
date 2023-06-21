let object = [];
let object2 = [];
let oggettoSplittato = [];
let elementiEstratti = [];
let nElementiEstratti = [];
let arrayVal = [];



function extractFromJson() {
	check();
	let valueToExtract = document.getElementById('keyValue').value;
	//console.log(valueToExtract);
	let values = "[" + document.getElementById('input_test').value + "]";
	//console.log(values);
	const formattedJson = values.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":');
	//console.log(formattedJson);
	object = JSON.parse(formattedJson);
	//console.log(object);
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
	//let valueToExtract = document.getElementById('value').value;
	let values = document.getElementById('input_test').value;
	object = values.split('\n');
	//console.log(object);

	let values2 = document.getElementById('input_test2').value;
	object2 = values2.split('\n');
	//console.log(object2);
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
	console.log(oggettoSplittato);
	document.getElementById('result').innerHTML = oggettoSplittato;

}

function oggettoInRiga(){
	check();
	let oggettoDaMettereInRiga = document.getElementById('input_test').value;			
	let valSeparatore = document.getElementById('separatore').value;
	oggettoInRiga = oggettoDaMettereInRiga.replaceAll("\n",valSeparatore);
	//console.log(oggettoInRiga);
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
	
	//console.log(object);
	if(separatore_a !="" && separatore_b !=""){
		for(i in object){
			if (object[i].includes(separatore_a) && object[i].includes(separatore_b)) {
			let c = object[i].indexOf(separatore_a);
			let b = object[i].indexOf(separatore_b);
			let a = c+1;
			//console.log(object[i]);
			//console.log(b);
			elementiEstratti +=  object[i].substring(a,b) + '\n';
			//console.log(object[i].substring(a,b));
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
		//console.log(nObj);
		for(let i=0; i<nObj; i++){
			xmlDoc = parser.parseFromString(object[i],"text/xml");
			//console.log(xmlDoc);
			let trusted = xmlDoc.getElementsByTagName(nomeNodoCondizioneXml)[0].childNodes[0].nodeValue;
			//console.log(xmlDoc);
			//console.log(trusted);
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
		//console.log(nObj);
		for(let i=0; i<nObj; i++){
				xmlDoc = parser.parseFromString(object[i],"text/xml");
				//console.log(xmlDoc);
				object2.push(xmlDoc.getElementsByTagName(nomeNodoCondizioneXml)[0].childNodes[0].nodeValue);
			}


		for(j in arrayVal){
			//console.log(arrayVal[j]);
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
	//let nomeNodoHTML = document.getElementById("nomeNodoHTML").value;
	let selectClassId = document.getElementById("selectClassId").value;
	let classOrId = selectClassId + document.getElementById("classOrId").value;
	let valclassOrId = document.getElementById("valclassOrId").value;
	let text = document.getElementById("input_test").value;
	const parser = new DOMParser();
	const parsedDocument = parser.parseFromString(text, "text/html");
	object = Array.from(parsedDocument.querySelectorAll(classOrId));
	console.log(object);
	for(i in object){
		//let a = parsedDocument.querySelectorAll('tspan');
		//console.log(a.length);

		let currentHTML = object[i];
		let a = currentHTML.querySelectorAll(valclassOrId);
		console.log(a.length);
		console.log(currentHTML);
		if(a.length>1){
			let currVal = [];
			for(let y=0; y<a.length; y++){
			currVal += currentHTML.getElementsByTagName(valclassOrId)[y].childNodes[0].nodeValue + ' ';
			}
			object2.push(currVal);
			//console.log(object2);
		}else if(a.length==1){
			object2.push(currentHTML.getElementsByTagName(valclassOrId)[0].childNodes[0].nodeValue);
		}
		console.log(object2);
		//let x = object[i].getElementsByTagName("tspan")[0].childNodes[0].nodeValue;
		//console.log(x);
	}
	let objectToString = object2.toString();
	//console.log(pro);
	document.getElementById('result').innerHTML = objectToString.replaceAll(',','\n');
	
	//console.log(parsedDocument);
	//console.log(parsedDocument.querySelectorAll('.nv-group'));
	
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
			console.log(duplicati);
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
			console.log(removeDuplicati);
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
