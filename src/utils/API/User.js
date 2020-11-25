class User {
  constructor(http){
    this.$u = http
  }
  async picTest(params){
    return await this.$u.get('picture', params)
  }
}

export default User
