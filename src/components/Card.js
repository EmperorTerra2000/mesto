export default class Card{
  _name
  _link
  _cardSelector
  _handleCardClick

  constructor(item, cardSelector, handleCardClick){
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate(){
    //забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .cloneNode(true);

    //вернем DOM-элемент карточки
    return cardElement;
  }

  generateCard(){
    //Запишем разметку в приватное поле _element. 
    //Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.element__image');
    this._cardText = this._element.querySelector('.element__text');
    this._setEventListeners();//подключаем слушатели привязанные к карточкам

    //добавим данные
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardText.textContent = this._name;

    //вернем элемент наружу
    return this._element;
  }

  //добавление слушателей событий
  _setEventListeners(){
    this._element.querySelector('.element__like').addEventListener('click', (event) => {
      this._handleLikeActive(event);
    });
    this._element.querySelector('.element__trash').addEventListener('click', (event) => {
      this._handleDelete(event);
    });
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //функция добавления лайка
  _handleLikeActive(event){
    event.target.classList.toggle('element__like_active');
  }

  //удаление карточки
  _handleDelete(event){
    const itemElement = event.target.closest('.element');
    itemElement.remove();
  }
}