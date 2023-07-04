
const callSigns = Object.keys(aircrafts).map(key => aircrafts[key].callsign);
const mensagem =  'lista itens mensagem';
// pela mensagem identificar aeronave

// comando

// parametros do comando
aircrafts[choosenAircraft][method](listParams);


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


  
  
