<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="剧目ID"
      prop="id"
      width="120">
    </el-table-column>
    <el-table-column
      label="影片"
      prop="name"
      width="120">
    </el-table-column>
    <el-table-column
      label="图片资源"
      prop="name"
      width="200">
      <el-input
      size="medium"
        placeholder="请输入链接"
        v-model="input"
        clearable>
      </el-input>
    </el-table-column>
    <el-table-column
      align="rightid">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="搜索影片"/>
      </template>
      <template slot-scope="scope" >
            <el-checkbox v-model="checked">推荐</el-checkbox>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '',
          name: '',
          input: '',
           checked: true
        }],
        search: '',
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },mounted() {
            Axios.send('/recommend/get', 'get', {}).then(res => {

                let list = []
                res.data.forEach((item) => {
                    list.push({
                        id: item.playId,
                        name: item.playName,
                        input: item.playPath,
                        checked:item.playStatus
                    })
                })
                this.tableData = list
            }, error => {
                console.log('displayAxiosError', error)
            }).catch(err => {
                throw err
            })
        },
  }
</script>
<style>
</style>
