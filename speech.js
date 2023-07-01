function startTalk(){
    console.log('FALANDO')

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
        console.log(event)
        // Verifique a frase e execute um comando dependendo dela
        if (firstResult.includes('vetoração')) {
            console.log('curvando agora');
        } else if (firstResult.includes('qual é a hora')) {
            console.log('Não sei dizer a hora, pois sou apenas um programa de computador.');
        } else {
            console.log('Desculpe, não entendi o que você disse.');
        }
    });
}