export function requestCommand(instructions) {
    let callsign = instructions.chamado;
    for (var key in instructions) {
        console.log(key + ": " + instructions[key]);
      }
    console.log("ola:"+callsign)
    const callSigns = Object.keys(aircrafts).map(key => aircrafts[key].callsign);
      console.log(callSigns);
    const resultado = procurarCallsign(callsign, callSigns);
    let choosenAircraft = resultado.callsign;
    let method = '';
    let listParams = [];
    

    switch (instructions.instrucao) {
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
            listParams = [instructions.velocidade]
            break;

        case 'Reduzir':
            method = 'mudarVelocidade';
            listParams = [instructions.velocidade]
            break;
        default:
            break;
    }
    console.log(choosenAircraft)
    console.log(method)
    console.log(listParams)
 
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
  