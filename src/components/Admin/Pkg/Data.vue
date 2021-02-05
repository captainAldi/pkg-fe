<template>
  <div>
    <v-container fluid>
      <!-- Alert Jika Gagal -->
      <v-alert 
        :type="alertObject.type"
        v-model="alertObject.status"
        dismissible
      >
        <li
          v-for="(value, key) of alertObject.message"
          :key="key"
        >
          <template v-for="item in value"> {{item}} </template>
        </li>
      </v-alert>

      <!-- Form Search -->

      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>FILTERS</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  filled
                  clearable
                  v-model="name"
                  label="Nama ..."
                  @input="searchByName"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="2">
                <v-select
                  filled
                  clearable
                  v-model="keterangan"
                  label="Keterangan"
                  @change="searchByKeterangan"
                  :items="keteranganItem"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="2">
                <v-menu
                  ref="menuDateFrom"
                  v-model="menuDateFrom"
                  :close-on-content-click="false"
                  :return-value.sync="dateFrom"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFrom"
                      label="From"
                      prepend-icon="mdi-calendar-month"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                      @change="searchByDateFrom"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateFrom" no-title scrollable @change="searchByDateFrom">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuDateFrom = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menuDateFrom.save(dateFrom)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="2">
                <v-menu
                  ref="menuDateTo"
                  v-model="menuDateTo"
                  :close-on-content-click="false"
                  :return-value.sync="dateTo"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateTo"
                      label="Until"
                      prepend-icon="mdi-calendar-month"
                      readonly
                      clearable
                      v-bind="attrs"
                      @change="searchByDateTo"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateTo" no-title scrollable @change="searchByDateTo">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuDateTo = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menuDateTo.save(dateTo)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="2">
                <v-select
                  filled
                  @change="loadPerPage"
                  v-model="meta.per_page"
                  :items="itemsPerPage"
                  label="Per Page"
                ></v-select>
                
              </v-col>
            </v-row>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>


      <!-- Table -->
      <v-data-table
        :headers="headers"
        :items="allPkgData"
        :loading="dataTableLoading"
        
        must-sort
        hide-default-footer
        class="elevation-4 mt-5"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >

        <!-- Untuk Judul / Bagian Atas -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>PKG</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>

            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              dark
              @click="$emit('refresh')"
              small
              class="ma-2"
            >
              <v-icon>
                mdi-reload
              </v-icon>
            </v-btn>

            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>

            <v-btn
              dark
              small
              color="red lighten-1" 
              @click="exportPDF"
              class="ma-2"
            >
              <v-icon dark>mdi-file-pdf-outline</v-icon>
            </v-btn>
          </v-toolbar>
        </template>



        <!-- Untuk Kolom User -->
        <template
          v-slot:[`item.user`]="{ item }"
        >
          {{item.user.name}}
        </template>

        <!-- Untuk Kolom Nilai -->
        <template
          v-slot:[`item.nilai_akhir`]="{ item }"
        >
          {{item.nilai_akhir}}
        </template>

        <!-- Untuk Kolom Keterangan -->
        <template
          v-slot:[`item.keterangan`]="{ item }"
        >
          {{item.keterangan}}
        </template>

        <!-- Untuk Kolom Tanggal -->
        <template
          v-slot:[`item.tanggal`]="{ item }"
        >
          {{item.tanggal}}
        </template>

        <!-- Untuk Kolom Masukan -->
        <template
          v-slot:[`item.masukan`]="{ item }"
        >
          {{item.masukan}}
        </template>

        <!-- Untuk Kolom Action -->
        <template v-slot:[`item.action`]="{ item }">
          <v-btn
            color="red"
            @click="showDetail(item.id)"
            small
            class="ma-2"
            icon
          >
            <v-icon>
              mdi-file-document-multiple-outline
            </v-icon>
          </v-btn>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="$emit('refresh')">Reset</v-btn>
        </template>
      </v-data-table>

      <v-pagination
        v-model="meta.current_page"
        :length="meta.last_page"
        :total-visible="6"
        @input="changePage"
        class="mt-3"
      ></v-pagination>

    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'dataPkg',
  props: {
    allPkgData: {
        type: Array,
        required: true
    },
    headers: {
        type: Array,
        required: true
    },
    meta: {
        required: true
    },
    dataTableLoading: {
        required: true
    },
  },
  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,

      name: '',
      keterangan: '',
      page: '1',

      keteranganItem: [
        'Amat Baik',
        'Baik',
        'Cukup',
        'Sedang',
        'Kurang'
      ],
      itemsPerPage: [
        '1',
        '5',
        '10',
        '15',
        '20'
      ],

      dateFrom: '',
      dateTo: '',
      menuDateFrom: '',
      menuDateTo: '',

      alertObject: {
        type: 'success',
        message: {},
        status: false
      },

      sortBy: null, 
      sortDesc: false,

    }
  },

  mounted() {

  },

  watch: {
    sortBy() {
      this.$emit('sort', {
          sortBy: this.sortBy,
          sortDesc: this.sortDesc
      })
    },

    sortDesc() {
      this.$emit('sort', {
          sortBy: this.sortBy,
          sortDesc: this.sortDesc
      })
    }
  },

  computed: {
    ...mapGetters({
      user  : 'auth/user',
      guest : 'auth/guest'
    }),
  },

  methods: {
    ...mapActions({
      setAlert  : 'alert/set',
      setAuth   : 'auth/set',
      setDialog : 'dialog/set'
    }),

    showDetail(item) {
      this.$router.push(`/admin/hasil-pkg/${item}`)
    },

    loadPerPage() {
      this.$emit('per_page', this.meta.per_page)
    },

    changePage(val) {
      this.$emit('pagination', val)
    },

    searchByName: _.debounce(function (e) {
      this.$emit('searchName', e)
    }, 500),

    searchByKeterangan: _.debounce(function (e) {
      this.$emit('searchKeterangan', e)
    }, 500),

     searchByDateFrom: _.debounce(function (e) {
      this.$emit('searchDateFrom', e)
    }, 500),

    searchByDateTo: _.debounce(function (e) {
      this.$emit('searchDateTo', e)
    }, 500),

    async exportPDF() {
      try {
        
        this.setDialog({
          status : true,
        })
        
        let config = {
          headers: {
            'Authorization': this.user.api_token,
          },
          responseType: 'blob',
        }

        const response = await axios.get(`${this.api_url}/admin/cetak/pkg`, config)

        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

        // Get Date Time
        let dateTimeNow = new Date()

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `hasil-pkg-${dateTimeNow.getDate()}${dateTimeNow.getMonth()}${dateTimeNow.getFullYear()}-${dateTimeNow.getHours()}${dateTimeNow.getMinutes()}.pdf`); //any other name + extension
        document.body.appendChild(link);
        link.click();
        link.remove();  

        this.setDialog({
          status : false,
        })

      } catch (error) {
        this.setDialog({
          status : false,
        })
        
        this.setAlert({
          status : true,
          color  : 'error',
          text  : error,
        })
      }
    }

  }
}
</script>

<style>

</style>