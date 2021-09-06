export default class Card{
  _name
  _link
  _cardSelector
  _handleCardClick

  constructor({name, link, likes, _id, owner}, {handleCardClick, handleOpenPopupDelete, api, userId}, cardSelector){
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = _id;
    this._userId = userId;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleOpenPopupDelete = handleOpenPopupDelete;
    this._api = api;
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
    this._cardLike = this._element.querySelector('.element__like');
    this._numberLikes = this._element.querySelector('.element__numberLikes');
    this._cardTrash = this._element.querySelector('.element__trash');
    this._setEventListeners();//подключаем слушатели привязанные к карточкам

    //добавим данные
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardText.textContent = this._name;
    this._numberLikes.textContent = this._likes.length;//кол-во лайков

    this._checkLike();
    this._deleteTrash();
    
    //вернем элемент наружу
    return this._element;
  }

  //проверка наличия лайка после обновления страницы, и добавления класса element__like_active, если лайк присутствует
  _checkLike(){
    this._api.getUserInfo();
    const check = this._likes.some(element => {
      return element._id == this._userId;
    });

    if(check){
      this._cardLike.classList.add('element__like_active');
    }
  }

  _deleteTrash(){
    if(!(this._userId == this._owner._id)) this._cardTrash.remove();
  }

  //добавление слушателей событий
  _setEventListeners(){
    this._cardLike.addEventListener('click', (event) => {
      this._handleLikeActive(event);
    });
    this._cardTrash.addEventListener('click', (event) => {
      this._handleOpenPopupDelete(this._cardId, event);
    });
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //функция добавления лайка
  _handleLikeActive(event){
    if(!event.target.classList.contains('element__like_active')){
      this._api.clickLike(this._cardId)
        .then(data => {
          // console.log(data);
          // console.log(this._userId);
          event.target.classList.add('element__like_active');
          this._numberLikes.textContent = data.likes.length;
        });
    }
    else {
      this._api.deleteLike(this._cardId)
        .then(data => {
          // console.log(data);
          event.target.classList.remove('element__like_active');
          this._numberLikes.textContent = data.likes.length;
        });
    }
  }
}