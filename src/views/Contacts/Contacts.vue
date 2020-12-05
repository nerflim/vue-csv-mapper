<template>
  <div>
    <Empty />
    <div class="actions-container">
      <a-button key="console" type="primary" @click="onImport" class="import-btn">
        <a-icon type="cloud-upload" /> Import Contacts
      </a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      size="middle"
      :pagination="{ pageSize: 5 }"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import Vue from 'vue';
import Empty from './Empty.vue';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true
  },
  {
    title: 'Team ID',
    dataIndex: 'team_id',
    key: 'team_id',
    sorter: true
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  },
  {
    title: 'Phone',
    key: 'phone',
    dataIndex: 'phone',
    sorter: true
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
    sorter: true
  },
  {
    title: 'Sticky Phone Number ID',
    key: 'sticky_phone_number_id',
    dataIndex: 'sticky_phone_number_id',
    sorter: true
  }
];

const data = [
  {
    id: 1,
    team_id: '123',
    name: 'Milfren John',
    phone: 123456,
    email: 'nerflimjohn@gmail.com',
    sticky_phone_number_id: 1234
  },
  {
    id: 2,
    team_id: '123',
    name: 'Milfren John',
    phone: 123456,
    email: 'nerflimjohn@gmail.com',
    sticky_phone_number_id: 1234
  },
  {
    id: 3,
    team_id: '123',
    name: 'Milfren John',
    phone: 123456,
    email: 'nerflimjohn@gmail.com',
    sticky_phone_number_id: 1234
  },
  {
    id: 4,
    team_id: '123',
    name: 'Milfren John',
    phone: 123456,
    email: 'nerflimjohn@gmail.com',
    sticky_phone_number_id: 1234
  },
  {
    id: 5,
    team_id: '123',
    name: 'Milfren John',
    phone: 123456,
    email: 'nerflimjohn@gmail.com',
    sticky_phone_number_id: 1234
  },
  {
    id: 6,
    team_id: '123',
    name: 'Milfren John',
    phone: 123456,
    email: 'nerflimjohn@gmail.com',
    sticky_phone_number_id: 1234
  }
];

export default Vue.extend({
  components: {
    Empty
  },
  data() {
    return {
      data,
      columns
    };
  },
  methods: {
    onImport: function() {
      this.$router.push('/import-contacts');
    },
    onChange: function(pagination: any, filters: any, sorter: any, { currentDataSource }: any) {
      console.log(pagination, filters, sorter, currentDataSource);
    }
  }
});
</script>

<style scoped lang="scss">
.actions-container {
  margin-bottom: 24px;
  text-align: right;
}
</style>
