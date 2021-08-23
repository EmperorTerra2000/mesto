export default class Section {
  constructor({items, renderer}, containerSelector){
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  //публичный метод, который принимает DOM элемент и добавляет его в контайнер
  addItem(element){
    this._container.prepend(element);
  }

  //метод, отвечающий за отрисовку элементов через renderer
  renderItems(){
    if(Array.isArray(this._renderedItems)){
      this._renderedItems.forEach(item => this._renderer(item));
    }
    else if(typeof(this._renderedItems) === 'object'){
      this._renderer(this._renderedItems);
    }
  }
}