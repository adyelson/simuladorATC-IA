export function requestCommand(instructions) {
    const callsign = instructions.chamado;
    const callSigns = Object.keys(aircrafts).map(key => aircrafts[key].callsign);

    const resultado = procurarCallsign(callsign, callSigns);
    let choosenAircraft = resultado.callsign;
    let method = '';
    let listParams = [];
    console.log(callSign)

    switch (instructions.intrucao) {
        case 'Curvar':
            method = 'mudarProa';
            listParams = [instructions.proa, instructions.lado]
            break;
        case 'Subir':
            method = 'descer';
            listParams = [instructions.nivelVoo, instructions.razao]
            break;
        case 'Descer':
            method = 'descer';
            listParams = [instructions.nivelVoo, instructions.razao] 
            break;
        case 'Acelerar':
            method = 'mudarVelocidade';
            listParams = [instructions.valocidade]
            break;

        case 'Reduzir':
            method = 'mudarVelocidade';
            listParams = [instructions.valocidade]
            break;
        default:
            break;
    }

 
    aircrafts[choosenAircraft][method](listParams);
}


function procurarCallsign(callsign, callSigns) {
    const index = callSigns.findIndex(cs => cs.toLowerCase() === callsign.toLowerCase());
    if (index !== -1) {
      return {
        callsign: callSigns[index],
        index: index
      };
    }
    return null;
  }
  