var keysPanel = document.querySelector(".keys-panel");
var teclado = document.querySelector("#keyboard");
var contador = 0;
var jugando = false;
var secretWord = "";

var buttonsList = ["iniciarJuego","agregarNuevaPalabra",
                "guardarYEmpezar","cancelar",
                "nuevoJuego","desistir","volverAlInicio"];


//Palabras importadas desde JSON en http
var wordsList = importWords();

//Modo inicio:
function home(){
    buttonsModeHome();      
    changeById("draw", "hidded");
    changeById("word-panel", "hidded");
    changeById("keyboard-control", "hidded");
    changeById("input", "input hidded");
    changeById("keyboard", "hidded");

}

function btnIniciarJuego(){
    secretWord = wordSelect(secretWord, wordsList);
    wordPanelSet(secretWord);
    iniciarJuego();
}

function btnAgregarNuevaPalabra(){
    changeById("input", "input show");
    buttonsModeAddWord();
    changeById("word-panel", "showInline");
}

//Modo jugando:
function iniciarJuego(){
    buttonsModePlaying();
    changeById("draw", "mostrar");
    changeById("keyboard-control", "btn-base btn2 mostrar");
    changeById("word-panel", "showInline");
    drawInit();
    keyboardReset();
    jugando = true;
    contador = 0;   
}

function btnNuevoJuego(){
    keysPanelReset(keysPanel);
    wordPanelUnset();
    btnIniciarJuego();
    keyboardReset();
    contador = 0;
}

function btnDesistir(){
    jugando = false;
    for(contador;contador<=9;contador++){
        drawNewPart(contador);
    }
    loserMsj(keysPanel, secretWord);
    buttonsModeGameEnd();  
}

function btnVolverAlInicio(){
    keysPanelReset(keysPanel);
    wordPanelUnset();
    home();
}

//Modo agregar palabra:
function btnGuardarYEmpezar(){
    var newWord = document.getElementById("input").value;
    if(newWord.length>=4 && newWord.length<=10){
        if(wordVerify(newWord)){
            wordsList.push(newWord);
            secretWord=newWord;
            changeById("input", "input hidded");
            wordPanelSet(secretWord);
            iniciarJuego();
        }else{
            alert("Palabra incorrecta");
        }
    }else{
        alert("Palabra debe tener entre 4 y 10 caracteres")
    }  
}

function wordVerify(word){
    for(i=0;i<word.length;i++){
        if(charCheck(word[i])){
            continue;
        }else{
            return false;
        }
    }
    return true;
}

function btnCancelar(){
    home();
}

function keysPanelReset(object){
    object.textContent = "";
    object.className = "keys-panel key-wrong";
}

function verificarLetra(letra){

    if(charCheck(letra)){
        if(contador<9 && keysPanel.textContent.indexOf(letra)==-1){
            keyboardKeydown(letra);
            if(!keysShowCorrect(letra, secretWord)){
                keysPanel.textContent+=letra;
                contador++;
                drawNewPart(contador);
            }
            else{
                if(wordCheck(secretWord)){
                    winnerMsj(keysPanel);
                    buttonsModeGameEnd();
                    jugando = false;
                }
            }
        }
        if(contador==9){
            btnDesistir();
        }
    }
    
}

function charCheck(char){
    if((char>="A"&&char<="Z") || char=="Ñ"){
        return true;
    }else{
        return false;
    }
}


//Captura id de elemento clickeado
document.addEventListener("click",function(event){
    clickParse(event.target, buttonsList);
});

//Captura tecla presionada
window.addEventListener('keydown', function(event){
    if(jugando){
        verificarLetra(event.key.toUpperCase());
    }
});

home();

keyboardSet(teclado);


    