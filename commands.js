function analisarChamadaAeronautica(texto) {
    const padraoCurva = /^([A-Z]{2,3}\d+),\s*curve\s+(a\s+)?(\w+)\s+proa\s+(\d+)$/i;
    const padraoSubida = /^([A-Z]{2,3}\d+),\s*suba\s+para\s+nivel\s+de\s+voo\s+(\d+),\s*com\s+razão\s+de\s+(\d+)\s+pés$/i;
    const padraoDescida = /^([A-Z]{2,3}\d+),\s*desça\s+para\s+nivel\s+de\s+voo\s+(\d+),\s*com\s+razão\s+de\s+(\d+)\s+pés$/i;
    const padraoReducao = /^([A-Z]{2,3}\d+|\w+),\s*reduza\s+para\s+(?:velocidade\s+)?(\d+)\s+knots$/i;
    const padraoAumento = /^([A-Z]{2,3}\d+|\w+),\s*aumente\s+para\s+(?:velocidade\s+)?(\d+)\s+knots$/i;
  
    const matchesCurva = texto.match(padraoCurva);
    if (matchesCurva) {
      const chamado = matchesCurva[1];
      const instrucao = "Curvar";
      const lado = matchesCurva[3];
      const proa = matchesCurva[4];
  
      return {
        chamado: chamado,
        instrucao: instrucao,
        lado: lado,
        proa: proa
      };
    }
  
    const matchesSubida = texto.match(padraoSubida);
    if (matchesSubida) {
      const chamado = matchesSubida[1];
      const instrucao = "Subir";
      const nivelVoo = matchesSubida[2];
      const razao = matchesSubida[3];
  
      return {
        chamado: chamado,
        instrucao: instrucao,
        nivelVoo: nivelVoo,
        razao: razao
      };
    }
  
    const matchesDescida = texto.match(padraoDescida);
    if (matchesDescida) {
      const chamado = matchesDescida[1];
      const instrucao = "Descer";
      const nivelVoo = matchesDescida[2];
      const razao = matchesDescida[3];
  
      return {
        chamado: chamado,
        instrucao: instrucao,
        nivelVoo: nivelVoo,
        razao: razao
      };
    }
  
    const matchesReducao = texto.match(padraoReducao);
    if (matchesReducao) {
      const chamado = matchesReducao[1];
      const instrucao = "Reduzir";
      const velocidade = matchesReducao[2];
  
      return {
        chamado: chamado,
        instrucao: instrucao,
        velocidade: velocidade
      };
    }
  
    const matchesAumento = texto.match(padraoAumento);
    if (matchesAumento) {
      const chamado = matchesAumento[1];
      const instrucao = "Aumentar";
      const velocidade = matchesAumento[2];
  
      return {
        chamado: chamado,
        instrucao: instrucao,
        velocidade: velocidade
      };
    }
  
    return null;
  }
  
  // Exemplo de chamada para teste
  const chamada1 = "TAM2232, curve a esquerda proa 200";
  const chamada2 = "CO122, suba para nivel de voo 200, com razão de 500 pés";
  const chamada3 = "PTWTA, reduza para velocidade 200 knots";
  const chamada4 = "PTWTA, reduza para 200 knots";
  const chamada5 = "WTA, reduza para 200 knots";
  const chamada6 = "CO122, desça para nivel de voo 300, com razão de 700 pés";
  const chamada7 = "PTWTA, aumente para velocidade 300 knots";
  
  const resultado1 = analisarChamadaAeronautica(chamada1);
  const resultado2 = analisarChamadaAeronautica(chamada2);
  const resultado3 = analisarChamadaAeronautica(chamada3);
  const resultado4 = analisarChamadaAeronautica(chamada4);
  const resultado5 = analisarChamadaAeronautica(chamada5);
  const resultado6 = analisarChamadaAeronautica(chamada6);
  const resultado7 = analisarChamadaAeronautica(chamada7);
  
  console.log(resultado1);
  console.log(resultado2);
  console.log(resultado3);
  console.log(resultado4);
  console.log(resultado5);
  console.log(resultado6);
  console.log(resultado7);
  