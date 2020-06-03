<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="影片"
      width="120">
    </el-table-column>
    <el-table-column
      prop="director"
      label="导演"
      width="120">
    </el-table-column>
    <el-table-column
      prop="actor"
      label="演员"
      width="200">
      </el-table-column>
      <el-table-column
        prop="picture"
        label="图片"
        width="100">
        </el-table-column>
    <el-table-column
          fixed="right"
          label="操作"
          width="140">
          <template slot-scope="scope">
            <el-button @click="handleClick" type="text" size="small">详情</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
  </el-table>
</template>

<script>
    export default {
    methods: {
          deleteRow(index, rows) {
            rows.splice(index, 1);
          }
        },data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          director: 'California',
          actor: 'Los Angeles，Jackie Chan',
        }]
      }
    }
}
</script>

<style>
</style>
