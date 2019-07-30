let list = [
  {
    taskid: 1,
    orgId: 1,
    content: '125',
    status: 'done',
    deadline: '2019-07-18',
    createDate: '2019-07-15',
    updateDate: '2019-07-19'
  },
  {
    taskid: 2,
    orgId: 1,
    content: '125',
    status: 'done',
    deadline: '2019-07-18',
    createDate: '2019-07-15',
    updateDate: '2019-07-19'
  }
]

export default {
  fetch: function () {
    let result = []
    for (var i = 0; i < list.length; i++) {
      let item = list[i]
      let contains = false
      for (var j = 0; j < result.length; j++) {
        if (result[j].orgId === item.orgId) {
          let children = result[j].children
          if (!children) children = []
          item.isChild = true
          children.push(item)
          result[j].children = children
          contains = true
          break
        }
      }
      if (!contains) {
        delete item.children
        result.push(item)
      }
    }
    return result
  },
  create: function (data) {
    let newData = {}
    let id = list[list.length - 1].taskid
    newData.taskid = id + 1
    newData.orgId = data.orgId
    newData.content = data.content
    newData.status = data.status
    newData.createDate = data.createDate
    newData.updateDate = data.updateDate
    newData.deadline = data.deadline
    if (!newData.orgId) { newData.orgId = newData.taskid }
    list.push(newData)
    return this.fetch()
  }
}
