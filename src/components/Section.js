export default class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = containerSelector;
  }

  //публичный метод, который принимает DOM элемент и добавляет его в контайнер
  addItem(element){
    this._container.prepend(element);
  }

  //метод, отвечающий за отрисовку элементов через renderer
  renderItems(data){
    if(Array.isArray(data)){
      data.forEach(item => this._renderer(item));
    }
    else if(typeof(data) === 'object'){
      this._renderer(data);
    }
  }
}