class Picture {
  constructor(http){
    this.http = http
  }
  async getCategory(){
    return await this.http.get('category/getAll')
  }
  async addPicList(params){
    return await this.http.post('pic/addPicList', params)
  }
}

export default Picture
