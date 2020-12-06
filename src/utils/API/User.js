class User {
  constructor(http){
    this.$u = http
  }
  async login(params){
    return await this.$u.post('user/login', params)
  }
  async register(params){
    return await this.$u.post('user/register', params)
  }
}

export default User
