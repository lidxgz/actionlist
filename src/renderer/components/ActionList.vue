<template>
  <div style="height: 200px">
    <el-table :data="tableData" border style="width: 100%"
    row-key="taskid" :cell-class-name="cellClass"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column align="center" prop="content" label="事项">
        <template slot-scope="scope">
          <el-input v-model="scope.row.content" :disabled="scope.row.taskid != ''"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createDate" label="记录时间" width="90">
        <template slot-scope="scope">{{scope.row.createDate | formatDate}}</template>
      </el-table-column>
      <el-table-column align="center" prop="deadline" label="计划完成时间" width="120">
        <template slot-scope="scope">
          <el-date-picker v-model="scope.row.deadline" :disabled="scope.row.taskid != ''"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="当前状态">
        <template slot-scope="scope">
          <el-input v-model="scope.row.status" type="textarea" autosize></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateTime" label="更新时间" width="90">
        <template slot-scope="scope">{{scope.row.updateDate | formatDate}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="90">
        <template slot-scope="scope">
          <el-button v-show="!scope.row.isChild" @click="save(scope.row)" type="text" size="small">保存</el-button>
          <el-button v-show="!scope.row.isChild" @click="done(scope.row)" type="text" size="small">完成</el-button>
          <el-button v-show="scope.row.taskid != '' && !scope.row.isChild" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import actionlistApi from '../api/ActionList'
import objUtils from '../utils/obj'
export default {
  name: 'action-list',
  data () {
    return {
      today: new Date(),
      listData: actionlistApi.fetch()
    }
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      // let h = date.getHours()
      // h = h < 10 ? '0' + h : h
      // let m = date.getMinutes()
      // m = m < 10 ? '0' + m : m
      // let s = date.getSeconds()
      // s = s < 10 ? '0' + s : s
      return y + '-' + MM + '-' + d // + ' ' + h + ':' + m + ':' + s
    }
  },
  methods: {
    add: function () {
      let data = {}
      data.content = this.newData[0].content
      data.status = this.newData[0].status
      data.deadline = this.newData[0].deadline
      data.recordTime = this.today
      data.updateTime = this.today
      this.tableData.push(data)
      this.newData[0].content = ''
      this.newData[0].status = ''
      this.newData[0].deadline = ''
    },
    save: function (row) {
      row.updateDate = new Date()
      delete row.children
      this.listData = actionlistApi.create(row)
    },
    done: function (row) {
      row.status = 'done'
      delete row.children
      this.listData = actionlistApi.create(row)
    },
    cellClass: function (row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 0) { return 'indent' }
      // return 'testClass'
    }
  },
  computed: {
    tableData: function () {
      // let tabledata = actionlistApi.fetch()
      let tabledata = objUtils.clone(this.listData)
      // let tabledata = this.listData
      let empty = {
        taskid: '',
        content: '',
        status: '',
        createDate: this.today,
        deadline: '',
        updateDate: this.today
      }
      tabledata.push(empty)
      return tabledata
    }
  }
}
</script>
<style>
.el-input.is-disabled .el-input__inner{
  border:none;
  background-color:inherit;
}
.indent .el-input{
  width: 85%;
}
</style>
