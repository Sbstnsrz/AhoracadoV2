//Mensages:
function keysPanelMessage(type){
    var keysPanel = document.querySelector(".keys-panel");

    if(type=="win"){
        keysPanel.className = "keys-panel message win";
        keysPanel.textContent = "Ganaste, felicidades!";
    }else if(type=="lose"){
        keysPanel.className = "keys-panel message lose";
        keysPanel.textContent="Fin del juego!";
    }else if(type=="msj-length"){
        keysPanel.className = "keys-panel message";
        keysPanel.textContent = "Palabra debe tener entre 4 y 8 caracteres";
    }else if(type=="msj-wrong"){
        keysPanel.className = "keys-panel message";
        keysPanel.textContent = "La palabra deber ser en mayusculas";
    }else if(type=="reset"){
        keysPanel.className = "keys-panel key-wrong";
        keysPanel.textContent = "";
    }else if(type=="search"){
        keysPanel.className = "keys-panel message";
        keysPanel.textContent = "Eligiendo palabra...";
    }else if(type=="failToConnect"){
        keysPanel.className = "keys-panel message";
        keysPanel.textContent = "No funciona 😭";
    }
}

//Crea word-panel para palabra ingresada.
function wordPanelSet(word){
    var container = document.querySelector("#word-container");
    var dash = document.querySelector("#dash");
    //generar campos de letras
    for(i=0; i<word.length;i++){
        //campo de letra
        var td = document.createElement("td");
        td.className= "word-panel-key";
        container.appendChild(td);
        //campo con guion
        var td = document.createElement("td");
        var linea = document.createElement("hr");
        td.className = "dash";
        td.appendChild(linea);
        dash.appendChild(td);
    }
}

//Borra word-panel.
function wordPanelUnset(){
    document.querySelectorAll(".word-panel-key").forEach(element =>{element.remove();});
    document.querySelectorAll(".dash").forEach(element =>{element.remove();});
}

//Toma la palabra en word-panel y la compara con la recibida.
function wordCheck(word){
    var readWord = "";
    document.querySelectorAll(".word-panel-key").forEach(element => {
        readWord+=element.textContent;
    });
    if(readWord.includes(word)){return true;}else{return false;}
}

//Muestra la letra si es correcta en word-panel.
function keysShowCorrect(key, word){
    var wordPanelKeys = document.querySelectorAll(".word-panel-key");
    var finded = false;
    for(i=0;i<word.length;i++){
        if(word[i]==key){
            wordPanelKeys[i].textContent=key;
            finded = true;
        }
    }
    if(finded){return true;}else{return false;}
}

//Verifica que la palabra este compuesta de A<>Z.
function wordVerify(word){
    for(i=0;i<word.length;i++){
        if(charAtoZCheck(word[i])){
            continue;
        }else{
            return false;
        }
    }
    return true;
}

//Veririca que la palabra tenga entre 8 y 4 caracteres.
function wordVerifyLength(word){
    if(word.length>=4 && word.length<=8){
        return true;
    }else{
        return false;
    }
}

//Muestra las letras faltantes en word-panel.
function keysShowMissed(word){
    var wordPanelKeys = document.querySelectorAll(".word-panel-key");
    for(i=0;i<word.length;i++){
        if(!(wordPanelKeys[i].innerHTML.includes(word[i]))){
            wordPanelKeys[i].classList.add("word-panel-missing-key");
            wordPanelKeys[i].innerHTML=word[i];
        }
    }
}

//Verifica que el caracter sea A<>Z o Ñ.
function charAtoZCheck(char){
    if((char>="A"&&char<="Z") || char=="Ñ"){
        return true;
    }else{
        return false;
  
    }
}


