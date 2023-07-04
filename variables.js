
let state = {
    dragging: false,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    offsetXCanvas: 0,
    offsetYCanvas: 0,
    selectedAircraft: null,
    vetorTime: 1
  };
  
  export function setvetorTime(value) {
    state.vetorTime = value;
  }
  
  export function getvetorTime() {
    return state.vetorTime;
  }

  export function setSelectedAircraft(value) {
    state.selectedAircraft = value;
  }
  
  export function getSelectedAircraft() {
    return state.selectedAircraft;
  }
  
  export function setDragging(value) {
    state.dragging = value;
  }
  
  export function getDragging() {
    return state.dragging;
  }
  
  export function setScale(value) {
    state.scale = value;
  }
  
  export function getScale() {
    return state.scale;
  }
  
  export function setOffsetX(value) {
    state.offsetX = value;
  }
  
  export function getOffsetX() {
    return state.offsetX;
  }
  
  export function setOffsetY(value) {
    state.offsetY = value;
  }
  
  export function getOffsetY() {
    return state.offsetY;
  }
  
  export function setOffsetXCanvas(value) {
    state.offsetXCanvas = value;
  }
  
  export function getOffsetXCanvas() {
    return state.offsetXCanvas;
  }
  
  export function setOffsetYCanvas(value) {
    state.offsetYCanvas = value;
  }
  
  export function getOffsetYCanvas() {
    return state.offsetYCanvas;
  }
  
