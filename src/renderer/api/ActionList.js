import http from '../utils/http'

export default {
  fetch: async function (currPage) {
    if (!currPage) currPage = 1
    let result = await http.get('http://localhost:8080/list?pageNo=' + currPage)
    console.log(result.data.content)
    return result.data
  },
  create: async function (data) {
    await http.post(data, 'http://localhost:8080/action')
    // console.log(data)
    return this.fetch()
  }
}
