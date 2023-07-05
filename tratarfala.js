

export function analisarChamadaAeronautica(texto) {
  const comandos = texto.split(" ");
  let chamado = extrairCodigo(texto);

  if (!chamado) {
    let p1 = comandos.shift();
    // Verificar o callsign
    const callsignCheck = verificarRelacaoCallsign(p1);
    if (callsignCheck) {
      p1 = callsignCheck;
    }

    let p2 = comandos.shift();
    chamado = p1 + p2;

  }

  if (comandos.includes("curve") || comandos.includes("curva")) {
    const instrucao = "Curvar";
    const curveIndex = comandos.indexOf("curve");
    const ladoIndex = curveIndex + 2;
    const proaIndex = comandos.indexOf("proa");
    const lado = comandos.slice(ladoIndex, proaIndex).join(" ");
    const proa = comandos[proaIndex + 1];

    return {
      chamado: chamado,
      instrucao: instrucao,
      lado: lado,
      proa: proa
    };
  }

  if (comandos.includes("suba")) {
    const instrucao = "Subir";
    const nivelVoo = comandos[comandos.indexOf("voo") + 1];
    const razaoIndex = comandos.indexOf("razão");
    const razao = razaoIndex !== -1 ? comandos[razaoIndex + 2] : null;

    return {
      chamado: chamado,
      instrucao: instrucao,
      nivelVoo: nivelVoo,
      razao: razao
    };
  }

  if (comandos.includes("desça")) {
    const instrucao = "Descer";
    const nivelVoo = comandos[comandos.indexOf("voo") + 1];
    const razaoIndex = comandos.indexOf("razão");
    const razao = razaoIndex !== -1 ? comandos[razaoIndex + 2] : null;

    return {
      chamado: chamado,
      instrucao: instrucao,
      nivelVoo: nivelVoo,
      razao: razao
    };
  }

  if (comandos.includes("reduza") || comandos.includes("aumente") || comandos.includes("acelero") || comandos.includes("acelere")|| comandos.includes("acelera")) {
    const instrucao = comandos.includes("reduza") ? "Reduzir" : "Acelerar";
    const velocidadeIndex = comandos.indexOf("reduza") !== -1 ? comandos.indexOf("reduza") : comandos.indexOf("aumente");
    const velocidadeTokens = comandos.slice(velocidadeIndex + 1);

    let velocidade = "";
    let velocidadeEncontrada = false;

    for (let i = 0; i < velocidadeTokens.length; i++) {
      const token = velocidadeTokens[i];

      if (token === "para") {
        velocidadeEncontrada = true;
        continue;
      }

      if (velocidadeEncontrada && !isNaN(token)) {
        velocidade = token;
        break;
      }
    }

    return {
      chamado: chamado,
      instrucao: instrucao,
      velocidade: velocidade
    };
  }

  return null;
}



function verificarRelacaoCallsign(callsign) {
  const relacaoCallsigns = {
    "azul": "AZU",
    "korean air": "KAL",
    // Adicione outras relações conforme necessário
  };
  for (const [key, value] of Object.entries(relacaoCallsigns)) {
    if (callsign.toLowerCase().includes(key)) {
      return value;
    }
  }
  return null;
}

// Exemplo de chamada para teste
const chamada1 = "TAM 2232 curve a esquerda proa 200";
const chamada2 = "CO 122 suba para nivel de voo 200, com razão de 500 pés";
const chamada3 = "Papa Tango Whiskey Tango Alfa reduza para velocidade 200 knots";
const chamada4 = "azul 2231, reduza para 200 knots";
const chamada5 = "WTZ, acelere para 200 knots";
const chamada6 = "CO 122, desça para nivel de voo 300, com razão de 700 pés";
const chamada7 = "PTWTA, aumente para velocidade 300 knots";
const chamada8 = "WTA reduza para 200 knots";
const chamada9 = "CO 122 desça para nivel de voo 300, com razão de 700 pés";

const resultado1 = analisarChamadaAeronautica(chamada1);
const resultado2 = analisarChamadaAeronautica(chamada2);
const resultado3 = analisarChamadaAeronautica(chamada3);
const resultado4 = analisarChamadaAeronautica(chamada4);
const resultado5 = analisarChamadaAeronautica(chamada5);
const resultado6 = analisarChamadaAeronautica(chamada6);
const resultado7 = analisarChamadaAeronautica(chamada7);
const resultado8 = analisarChamadaAeronautica(chamada8);
const resultado9 = analisarChamadaAeronautica(chamada9);

console.log(resultado1);
console.log(resultado2);
console.log(resultado3);
console.log(resultado4);
console.log(resultado5);
console.log(resultado6);
console.log(resultado7);
console.log(resultado8);
console.log(resultado9);


function extrairCodigo(texto) {
  const alfabetoFonetico = {
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

  const palavras = texto.split(' ');
  const codigo = [];

  for (let i = 0; i < palavras.length; i++) {
    const palavra = palavras[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    for (let chave in alfabetoFonetico) {
      if (alfabetoFonetico.hasOwnProperty(chave)) {
        const chaveFormatada = chave.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (palavra.toLowerCase().startsWith(chaveFormatada.toLowerCase())) {
          codigo.push(alfabetoFonetico[chave]);

          if (codigo.length >= 5) {
            codigo.splice(0, 0);
          }

          break;
        }
      }
    }
  }

  return codigo.join('');
}

// Exemplos de chamada para teste
const texto1 = 'papa Tango Whisky Tango alfa reduza para velocidade 200 knots';
const texto2 = 'whiskY tango Alfa reduza para velocidade 200 knots';
const texto3 = 'Papá tango Whisky kebec alfa Zulu reduza para velocidade 200 knots';
const texto4 = 'ecO yankee reduza para velocidade 200 knots';
const texto5 = 'echo yankey reduza para velocidade 200 knots';

console.log(extrairCodigo(texto1)); // PTWTA
console.log(extrairCodigo(texto2)); // WTA
console.log(extrairCodigo(texto3)); // PTWAZ
console.log(extrairCodigo(texto4)); // EY
console.log(extrairCodigo(texto5)); // EY

