<template>
  <a-layout id="layout-container">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" :selected-keys="[activeRoute]" mode="inline" @click="onNavigate">
        <a-menu-item v-for="item in menuItems" :key="item.url">
          <a-icon :type="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header-container" />
      <a-layout-content class="content-container">
        <div class="content">
          <slot />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Milfren John dela Vega © {{ new Date().getFullYear() }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { menu as menuItems } from '../../constants/menu';

export default Vue.extend({
  data() {
    return {
      collapsed: false,
      menuItems
    };
  },
  computed: {
    activeRoute() {
      return this.$route.path;
    }
  },
  methods: {
    onNavigate: function(item: { key: string }) {
      this.$router.push(item.key);
    }
  }
});
</script>

<style lang="scss">
#layout-container {
  min-height: 100vh;

  .header-container {
    background: #fff;
    padding: 0;
  }
  .content-container {
    margin: 24px;

    .content {
      padding: 24px;
      background-color: #fff;
      min-height: 400px;
    }
  }

  .logo {
    height: 64px;
  }
  .ant-layout-sider-trigger {
    top: 0;
    height: 64px;
    line-height: 64px;
  }
}
</style>
