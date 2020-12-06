<template>
  <div style="display: flex; justify-content: center; align-items: center;">
    <div v-if="csvData.length" class="review-container">
      <div class="action-container">
        <a-button :disabled="loading" @click="goBack">
          <a-icon type="left-circle" /> Go Back
        </a-button>
        <a-button type="primary" :loading="loading" @click="onSave"
          >Save <a-icon type="right-circle"
        /></a-button>
      </div>
      <h1>Review CSV</h1>
      <a-table
        :columns="columns"
        :data-source="csvData"
        size="middle"
        :loading="loading"
        class="csv-table"
      />
    </div>

    <div v-else class="upload-container">
      <div class="upload-csv-icon">
        <a-icon type="file-text" theme="twoTone" />
      </div>
      <h3>Upload CSV File</h3>
      <a-upload :file-list="fileList" :before-upload="beforeUpload" accept=".csv">
        <a-button> <a-icon type="upload" /> Select File </a-button>
      </a-upload>
    </div>
  </div>
</template>

<script lang="ts">
import { setTimeout } from 'timers';
import Vue from 'vue';

interface Data {
  fileList: any[];
  loading: boolean;
  csvData: any[];
  csvHeader: string[];
}

export default Vue.extend({
  data(): Data {
    return {
      fileList: [],
      loading: false,
      csvData: [],
      csvHeader: []
    };
  },
  computed: {
    columns() {
      return this.csvHeader.map((item: string) => ({ key: item, dataIndex: item, title: item }));
    }
  },
  methods: {
    parseText(data: string) {
      if (data) {
        // split new line text
        const parsedData = data.split(/\r\n|\n/);
        // get header
        const headerString = parsedData.shift();
        // split header text
        const headers = headerString && headerString.split(',');

        if (Array.isArray(headers)) {
          this.csvHeader = headers;

          const csvData = parsedData.map(item => {
            const parsedItem = item.split(',');
            const data = {};

            headers.forEach((headerItem: string, headerIndex: number) => {
              data[headerItem] = parsedItem[headerIndex];
            });

            return data;
          });

          this.csvData = csvData;
        }
      }
    },
    beforeUpload(file: any) {
      const reader = new FileReader();

      reader.onload = e => {
        this.parseText(e.target.result);
      };
      reader.readAsText(file);

      return false;
    },
    async onSave() {
      this.loading = true;
      await this.$store
        .dispatch('contact/importContactsAsync', { data: this.csvData, keys: this.csvHeader })
        .then(() => {
          this.loading = false;
        });
    },
    goBack() {
      this.csvHeader = [];
      this.csvData = [];
    }
  }
});
</script>

<style scoped lang="scss">
.upload-container {
  text-align: center;
}
.upload-csv-icon {
  font-size: 80px;
}
.review-container {
  width: 100%;

  .action-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .csv-table {
    margin-top: 24px;
  }
}
</style>
