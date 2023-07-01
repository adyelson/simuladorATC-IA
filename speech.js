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
        let listaPalavras = firstResult.split();
        array.forEach((element, index) => {
           console.log(`${index}:${element}`) 
        });       
        
        
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

function obterLetraFonetica(palavra) {
    var alfabetoFonetico = {
      'Alfa': 'A',
      'Bravo': 'B',
      'Charlie': 'C',
      'Delta': 'D',
      'Eco': 'E',
      'Foxtrot': 'F',
      'Golfo': 'G',
      'Hotel': 'H',
      'Índia': 'I',
      'Juliett': 'J',
      'Kilo': 'K',
      'Lima': 'L',
      'Mike': 'M',
      'November': 'N',
      'Óscar': 'O',
      'Papa': 'P',
      'Quebec': 'Q',
      'Romeo': 'R',
      'Sierra': 'S',
      'Tango': 'T',
      'Uniforme': 'U',
      'Vitor': 'V',
      'Whiskey': 'W',
      'X-ray': 'X',
      'Yankee': 'Y',
      'Zulu': 'Z'
    };
  
    // Verifica se a palavra está presente no objeto
    if (alfabetoFonetico.hasOwnProperty(palavra)) {
      return alfabetoFonetico[palavra];
    }
  
    // Verifica a tolerância para palavras similares
    var palavrasToleradas = {
      'yank': 'Yankee',
      'echo': 'Eco',
      'charli': 'Charlie'
    };
  
    // Verifica se a palavra está presente nas palavras toleradas
    if (palavrasToleradas.hasOwnProperty(palavra)) {
      return alfabetoFonetico[palavrasToleradas[palavra]];
    }
  
    // Caso nenhuma correspondência seja encontrada
    return null;
  }
  
  // Exemplo de uso
  var palavra = 'yank';
  var letraCorrespondente = obterLetraFonetica(palavra);
  console.log(letraCorrespondente); // Saída: Y
  