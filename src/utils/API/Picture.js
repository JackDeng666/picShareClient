class Picture {
  constructor(http){
    this.http = http
  }
  async getPicList(params){
    return await this.http.get('pic/picList', params)
  }
  async getPicSetList(params){
    return await this.http.get('pic/picSetList', params)
  }
  async getCategory(){
    return await this.http.get('category/getAll')
  }
  async addPicList(params){
    return await this.http.post('pic/addPicList', params)
  }
}

export default Picture
