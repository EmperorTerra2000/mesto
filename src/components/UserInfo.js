export default class UserInfo{
  constructor({name, duty}){
    this._name = name;
    this._duty = duty;
  }

  getUserInfo(){
    return {
      name: this._name.textContent,
      duty: this._duty.textContent
    }
  }

  setUserInfo(name, duty){
    this._name.textContent = name;
    this._duty.textContent = duty;
  }
}