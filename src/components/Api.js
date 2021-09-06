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
      .then( res => {
        if(!res.ok) Promise.reject(`Ошибка: ${res.status}`);
        return res.json()
      })
      .catch( err => console.log(err));
  }

  //удаление лайка
  deleteLike(cardId){
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then( res => {
        if(!res.ok) Promise.reject(`Ошибка: ${res.status}`);
        return res.json()
      })
      .catch( err => console.log(err));
  }

  //получение данных о пользователе (имя, профессия...) с сервера
  getUserInfo(){
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then(res => {
        if(!res.ok){
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch(err => console.log(err));
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
      .then(res => {
        if(!res.ok) Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch(err => console.log(err))
  }

  //получение данных о карточках (ссылка, название...) с сервера
  getCardInfo(){
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
      method: 'GET',
    })
      .then(responce => {
        if(!responce.ok) return Promise.reject(`Ошибка: ${responce.status}`);
        return responce.json();
      })
      .catch(err => console.log(err));
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
      .then(res => {
        if(!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch(err => console.log(err));
  }

  //метод удаления карточки с сервера
  deleteCard(cardId){
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => {
        if(!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch(err => console.log(err));
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
      .then(res => {
        if(!res.ok) Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch(err => console.log(err))
  }
}