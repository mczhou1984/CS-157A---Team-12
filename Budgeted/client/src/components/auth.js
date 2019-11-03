import jwt_decode from 'jwt-decode'
class Auth {
  constructor() {
    this.authenticated = false
  }

  login(cb) {
    this.authenticated = true
    cb()
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if (token === null){
      return false
    }
    let decodedToken = jwt_decode(token)
    let current_time = new Date().getTime() / 1000;
    if (current_time > decodedToken.exp) {
      return false
     }
     return true


  }
}

export default new Auth();
