<template>
  <!-- Excel下载 -->
  <div class="excel">
    <table border="1" ref="table" style="font-size: 26px;" class="table">
      <tr>
        <td>姓名</td>
        <td>年龄</td>
        <td>概率</td>
      </tr>
      <tr>
        <td>lisa</td>
        <td>20</td>
        <td>25%</td>
      </tr>
      <tr>
        <td>john</td>
        <td>22</td>
        <td>30%</td>
      </tr>
      <tr>
        <td>tom</td>
        <td>18</td>
        <td>20%</td>
      </tr>
    </table>
    <!-- element ui -->
    <!-- <el-table :data="list" ref="table">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
    </el-table> -->

    <button style="margin-top:20px;" @click="clickDownLoad">下载</button>
  </div>
</template>

<script>
// import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      list: [
        {name: 'lisa', age: 22},
        {name: 'john', age: 20},
        {name: 'tom', age: 18}
      ]
    }
  },
  methods: {
    clickDownLoad() {
      let table = this.$refs.table
      let workbook = XLSX.utils.table_to_book(table)
      console.log(workbook)
      let wbout = XLSX.write(workbook, {
        bookType: 'xlsx', // 生成的文件格式
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'array' // 编码方式
      })
      let blob = new Blob([wbout], { type: 'application/octet-stream' })
      // saveAs() 保存文件
      //  FileSaver.saveAs(blob, 'text.xlsx')
      let url = URL.createObjectURL(blob)
      let aLink = document.createElement('a')
      aLink.href = url
      aLink.download = 'test.xlsx'
      let event = new MouseEvent('click')
      aLink.dispatchEvent(event)
    }
  }
}
</script>

<style lang='scss'>
.table td {
  padding: 10px;
}
</style>
