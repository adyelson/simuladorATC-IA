export function startTalk(){
   
    const recognition = new webkitSpeechRecognition();
    // Defina o idioma que será reconhecido (no caso, o português do Brasil)
    recognition.lang = 'pt-BR';
    // Iniciar a reconhecimento de fala

    recognition.start();

    // Criar um evento para processar o resultado da fala reconhecida
    recognition.onresult = (event) => {
        // Obter o primeiro resultado da fala reconhecida
        const speechToText = event.results[0][0].transcript;
        // Escrever o resultado na página
        // document.write(speechToText);
        console.log(speechToText)
    };
    
    // Quando o reconhecimento de voz receber uma frase, faça algo com ela
    recognition.addEventListener('result', (event) => {
        // Pega a primeira frase reconhecida
        const firstResult = event.results[0][0].transcript;
        let listaPalavras = firstResult.split(' ');

        listaPalavras.forEach((element, index) => {
           console.log(`${index}:${element}`) 
        });       
               
     
    });
}
