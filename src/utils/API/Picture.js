class Picture {
  constructor(http){
    this.http = http
  }
  async getCategory(){
    return await this.http.get('picture/category')
  }
  async picTest(params){
    return await this.http.get('picture', params)
  }
}

export default Picture
