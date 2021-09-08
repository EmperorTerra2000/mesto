export default class Api{
  constructor(options){
    this.url = options.url;
    this.headers = options.headers;
  }

  //постановка лайка
  clickLike(cardId){
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(this._handleResponse);
  }

  //обработка ответа от сервера
  _handleResponse(res){
    if(!res.ok) Promise.reject(`Ошибка: ${res.status}`);
    return res.json();
  }

  //удаление лайка
  deleteLike(cardId){
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._handleResponse);
  }

  //получение данных о пользователе (имя, профессия...) с сервера
  getUserInfo(){
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then(this._handleResponse);
  }

  //обновление профиля после сабмита в попапе popupFormProfile
  updateInfoUser(name, duty){
    const headersUpdate = this.headers;
    headersUpdate['Content-Type'] = 'application/json';

    return fetch(`${this.url}/users/me`, {
      headers: headersUpdate,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: duty,
      }),
    })
      .then(this._handleResponse);
  }

  //получение данных о карточках (ссылка, название...) с сервера
  getCardInfo(){
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
      method: 'GET',
    })
      .then(this._handleResponse);
  }

  //добавление карточек в сервер
  addCard(data){
    const headersUpdate = this.headers;
    headersUpdate['Content-Type'] = 'application/json';

    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: headersUpdate,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse);
  }

  //метод удаления карточки с сервера
  deleteCard(cardId){
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._handleResponse);
  }

  //изменение аватара
  changeAvatar(data){
    const headersUpdate = this.headers;
    headersUpdate['Content-Type'] = 'application/json';

    return fetch(`${this.url}/users/me/avatar`, {
      headers: headersUpdate,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
  }
}