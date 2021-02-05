<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
        >
          <h1>Hasil PKG</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
        >
          <DataPkg
            :allPkgData="allPkgData" 
            :headers="headers" 
            :meta="meta"
            :dataTableLoading="dataTableLoading"
            @per_page="handlePerPage" 
            @pagination="handlePagination" 
            @searchName="handleSearchName" 
            @searchKeterangan="handleSearchKeterangan" 
            @searchDateTo="handleSearchDateTo"
            @searchDateFrom="handleSearchDateFrom"
            @sort="handleSort"
            @refresh="handleRefreshData"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'dataPkg',
  components: {
    DataPkg: () => import( /* webpackChunkName: "dataPkgData" */ '@/components/Admin/Pkg/Data.vue'),
  },
  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,

      allPkgData: [],
      headers: [
        {
          text: 'Nama',
          align: 'start',
          value: 'user',
        },
        { text: 'Nilai', value: 'nilai_akhir' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Masukan', value: 'masukan' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      meta: [],
      dataTableLoading: true,

      current_page: 1, 
      per_page: 10, 
      sortBy: 'tanggal',
      sortByDesc: true,

      searchName: '',
      searchKeterangan: '',
      searchDateFrom: '',
      searchDateTo: ''

    }
  },
  mounted() {
    this.loadData()
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

    async loadData() {
      try {
        
        this.dataTableLoading = true

        let config = {
          headers: {
            'Authorization': this.user.api_token
          },
          params: {
            page: this.current_page,
            per_page: this.per_page,
            sortby: this.sortBy,
            sortbydesc: this.sortByDesc ? 'DESC':'ASC',
            name: this.searchName,
            keterangan: this.searchKeterangan,
            dateFrom: this.searchDateFrom,
            dateTo: this.searchDateTo
          }
        }

        const response = await axios.get(this.api_url + '/admin/feedback/hasil/all', config)

        let getData = response.data.data

        this.allPkgData = getData.data

        this.meta = {
          total: getData.total,
          current_page: getData.current_page,
          per_page: getData.per_page,
          last_page: getData.last_page,
          from: getData.from,
          to: getData.to
        }

        this.dataTableLoading = false

        if (getData.data.length > 0) {
            this.setAlert({
              status : true,
              color  : 'success',
              text  : 'Data Berhasil di Ambil',
            })
          } else {
            this.setAlert({
              status : true,
              color  : 'error',
              text  : 'Data Tidak Ada !',
            })
          }

      } catch (error) {
        this.dataTableLoading = false

        this.setAlert({
          status : true,
          color  : 'error',
          text  : error,
        })
      }
    },

    handlePerPage(val) {
      this.per_page = val 
      this.loadData()
    },

    handlePagination(val) {
        this.current_page = val
        this.loadData()
    },

    handleSearchName(val) {
        this.current_page = '1' 
        this.searchName = val
        this.loadData()
    },

    handleSearchKeterangan(val) {
        this.current_page = '1' 
        this.searchKeterangan = val
        this.loadData()
    },

    handleSearchDateFrom(val) {
        this.searchDateFrom = val
    },

    handleSearchDateTo(val) {
        this.current_page = '1'
        this.searchDateTo = val
        this.loadData()
    },

    handleSort(val) {
        this.sortBy = val.sortBy
        this.sortByDesc = val.sortDesc

        this.loadData()
    },

    handleRefreshData() {
      this.loadData()
    }
    
    
  }
}
</script>

<style>

</style>