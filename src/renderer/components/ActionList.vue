<template>
    <div style="height: 200px">
        <el-table
                :data="tableData"
                border
                empty-text="当前数据没有，请添加数据"
                style="width: 100%">
            <el-table-column
                    align="center"
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="address"
                    label="地址">
            </el-table-column>
            <div >
                <p>
                    <el-button size="small" type="primary"> 添加</el-button>
                </p>
            </div>
        </el-table>
    </div>

</template>

<script>
  export default {
    name: 'action-list',
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>
