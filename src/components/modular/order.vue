<template>
  <!-- 预约管理 -->
  <div class="__reservation">
    <div class="formBox">
      <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
        <el-form-item label="服务队名称：">
          <el-input v-model="form" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="服务类别：">
          <!--<el-select v-model="formInline.typeId" placeholder="请选择服务类别">
            <el-option :label="form" :value="form" v-for="(item,index) in typeCodeList" :key="index"></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchSubmit('formInline')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
        formInline:""
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
