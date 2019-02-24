<template>
  <div id="app">


        <el-menu :default-active="activeIndex" :active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">拓扑</el-menu-item>
            <el-menu-item index="2">网络结构</el-menu-item>
            <el-menu-item index="6">设备配置</el-menu-item>
            <el-submenu index="3">
                <template slot="title">压力测试</template>
                <el-menu-item index="3-1">CONFIG</el-menu-item>
                <!--<el-menu-item index="3-1">CTICONFIG</el-menu-item>-->
                <!--<el-menu-item index="3-2">IVRCONFIG</el-menu-item>-->
                <el-menu-item index="3-3">生成脚本</el-menu-item>
            </el-submenu>

            <el-submenu index="4" class="nav-right">
                <template slot="title">选择项目</template>
                <el-menu-item v-for="pro in projectlist" :key="pro.id" :index="pro.id.toString()">{{pro.name}}
                </el-menu-item>

            </el-submenu>
            <el-submenu index="5" class="nav-right">
                <template slot="title">项目管理</template>
                <el-menu-item index="5-1">添加项目</el-menu-item>
                <el-menu-item index="5-2">项目列表</el-menu-item>
                <el-menu-item index="5-3">模板管理</el-menu-item>
            </el-submenu>
        </el-menu>








    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
