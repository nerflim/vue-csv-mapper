<template>
  <a-result title="There are no contacts available">
    <template #icon>
      <a-icon type="frown" theme="twoTone" />
    </template>
    <template #extra>
      <a-button type="primary" @click="onImport">
        <a-icon type="cloud-upload" /> Import Contacts
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    onImport: function() {
      this.$router.push('/import-contacts');
    }
  }
});
</script>

<style scoped></style>
