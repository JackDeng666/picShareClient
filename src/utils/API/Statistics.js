class Statistics{
  constructor(http){
    this.http = http
  }
  async getPraiseAndCollectInfo(params){
    return await this.http.get('statistics/getPraiseAndCollectInfo', params)
  }
  async togglePraise(params){
    return await this.http.post('statistics/togglePraise', params)
  }
  async toggleCollect(params){
    return await this.http.post('statistics/toggleCollect', params)
  }
}

export default Statistics
