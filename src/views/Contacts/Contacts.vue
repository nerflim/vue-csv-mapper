<template>
  <div v-if="dataLoaded">
    <h1>Contacts</h1>
    <Empty v-if="!contacts.data.length" />
    <div v-else>
      <div class="actions-container">
        <a-button key="console" type="primary" @click="onImport" class="import-btn">
          <a-icon type="cloud-upload" /> Import Contacts
        </a-button>
      </div>
      <a-table
        :columns="columns"
        :data-source="contacts.data"
        :loading="loading"
        size="middle"
        :pagination="{ current: contacts.page, pageSize: contacts.pageSize, total: contacts.total }"
        @change="onChange"
        :row-key="record => record.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Empty from './Empty.vue';

const staticColumns = [
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

export default Vue.extend({
  components: {
    Empty
  },
  data() {
    return {
      dataLoaded: false
    };
  },
  computed: {
    contacts() {
      return this.$store.state.contact.contacts;
    },
    loading() {
      return this.$store.state.contact.loading;
    },
    columns() {
      return [
        ...staticColumns,
        ...this.$store.state.contact.customAttributes.map((item: string) => ({
          title: item,
          key: item,
          dataIndex: item,
          sorter: false
        }))
      ];
    }
  },
  methods: {
    onImport: function() {
      this.$router.push('/import-contacts');
    },
    onChange: function(pagination: any, filters: any, sorter: any, { currentDataSource }: any) {
      const payload = {
        pageSize: pagination.pageSize,
        page: pagination.current,
        sort: sorter?.columnKey,
        sortBy: sorter?.order === 'ascend' ? 'asc' : 'desc'
      };
      this.$store.dispatch('contact/getContactsAsync', payload);
    }
  },
  async mounted() {
    const payload = {
      pageSize: this.contacts.pageSize,
      page: this.contacts.page,
      sort: this.contacts.sort,
      sortBy: this.contacts.sortBy
    };

    await this.$store
      .dispatch('contact/getContactsAsync', payload)
      .then(() => (this.dataLoaded = true));
  }
});
</script>

<style scoped lang="scss">
.actions-container {
  margin-bottom: 24px;
}
</style>
