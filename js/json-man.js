async function importWords(){
    var test = fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
    .then(response => response.json())
    .then(data => test=data['body']['Word']);
    return test;
}
