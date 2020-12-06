<template>
  <div class="container">
    <div v-if="csvData.length && !isSaved && !isError" class="review-container">
      <div class="action-container">
        <a-button :disabled="isSaving" @click="goBack">
          <a-icon type="left-circle" /> Go Back
        </a-button>
        <a-button type="primary" :loading="isSaving" @click="onSave"
          >Save <a-icon type="right-circle"
        /></a-button>
      </div>
      <h1>Review CSV</h1>
      <a-table
        :columns="columns"
        :data-source="csvData"
        size="middle"
        :loading="isSaving"
        class="csv-table"
      />
    </div>

    <a-result
      v-else-if="isSaving && isSaved && !isError"
      status="success"
      title="Successfully imported contacts!"
    >
      <template #extra>
        <a-button key="contacts" type="primary" @click="goToContacts">
          Go to Contacts
        </a-button>
        <a-button key="importAgain" @click="onReset">
          Import CSV Again
        </a-button>
      </template>
    </a-result>

    <div v-else class="upload-container">
      <div v-if="isError">
        <a-alert type="error" message="Import failed! Please try again" banner />
      </div>
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
import Vue from 'vue';

interface Data {
  fileList: any[];
  isSaving: boolean;
  isSaved: boolean;
  isError: boolean;
  csvData: any[];
  csvHeader: string[];
}

export default Vue.extend({
  data(): Data {
    return {
      fileList: [],
      isSaving: false,
      isSaved: false,
      isError: false,
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
      this.isError = false;
      const reader = new FileReader();

      reader.onload = e => {
        this.parseText(e.target.result);
      };
      reader.readAsText(file);

      return false;
    },
    onReset() {
      this.goBack();
      this.isSaving = false;
      this.isSaved = false;
      this.isError = false;
    },
    async onSave() {
      this.isSaving = true;
      await this.$store
        .dispatch('contact/importContactsAsync', { data: this.csvData, keys: this.csvHeader })
        .then(() => {
          this.isError = false;
          this.isSaved = true;
        })
        .catch(() => {
          this.onReset();
          this.isError = true;
        });
    },
    goBack() {
      this.csvHeader = [];
      this.csvData = [];
    },
    goToContacts() {
      this.$router.push('/contacts');
    }
  }
});
</script>

<style scoped lang="scss">
.container {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  .upload-container {
    text-align: center;
    width: 100%;
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
}
</style>
