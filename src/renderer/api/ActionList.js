import http from '../utils/http'

export default {
  fetch: async function () {
    let result = await http.get('http://localhost:8080/list?pageNo=1')
    console.log(result.data.content)
    return result.data.content
  },
  create: async function (data) {
    await http.post(data, 'http://localhost:8080/action')
    // console.log(data)
    return this.fetch()
  }
}
