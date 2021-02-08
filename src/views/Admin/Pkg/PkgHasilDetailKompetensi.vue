<template>
  <div>
    <v-container
      fluid
      v-if="pkgDetailKompetensi.length != 0"
    >
      <v-row>
        <v-col
          cols="12"
        >
          <h1>Ini detail PKG Kompetensi</h1>
        </v-col>        
      </v-row>

      <v-row>
        <v-col
          cols="12"
        >
          <v-btn
            dark
            small
            color="red lighten-1" 
            @click="exportPDF"
          >
            <v-icon dark>mdi-file-pdf-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            elevation="4"
            ripple
          >
            <v-card-title class="headline justify-center">
              Lampiran 1C
            </v-card-title>

            <v-divider></v-divider>

            <v-card-subtitle>
              <strong>Nama : </strong> {{ pkgDetailKompetensi.modelFeedback.user.name }}
              <br>
              <strong>Tanggal :</strong> {{ pkgDetailKompetensi.modelFeedback.tanggal }}
            </v-card-subtitle>

            <v-divider></v-divider>

            <v-card-subtitle>
              <v-simple-table
                fixed-header
                height="300px"
              >
                <thead>
                  <tr>
                    <th class="text-left">
                      No
                    </th>
                    <th class="text-left">
                      Kompetensi
                    </th>
                    <th class="text-left">
                      Nilai
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Pedagogik -->
                    <tr>
                      <th colspan="3">A) Pendagogik</th>
                    </tr>

                    <tr>
                      <th scope="row">1</th>
                      <td>Mengetauhi Karateristik Peserta Didik</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp1 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Menguasai teori belajar dan prinsip-prinsip pembelajaran yang mendidik</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp2 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Pengembangan kurikulum</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp3 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Kegiatan pembelajaran yang mendidik</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp4 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Pengembangan potensi peserta didik</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp5 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Komunikasi dengan peserta didik</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp6 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Penilaian dan evaluasi</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp7 }}</td>
                    </tr>

                    <!-- Kepribadian -->
                    <tr>
                      <th colspan="3">B) Kepribadian</th>
                    </tr>

                    <tr>
                      <th scope="row">8</th>
                      <td>Bertindak sesuai dengan norma agama, hukum, sosial dan kebudayaan nasional</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp8 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>Menunjukkan pribadi yang dewasa dan teladan</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp9 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>Etos kerja, tanggung jawab yang tinggi, rasa bangga menjadi guru</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp10 }}</td>
                    </tr>

                    <!-- Sosial -->
                    <tr>
                      <th colspan="3">C) Sosial</th>
                    </tr>

                    <tr>
                      <th scope="row">11</th>
                      <td>Bersikap inklusif, bertindak obyektif, serta tidak diskriminatif</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp11 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">12</th>
                      <td>Komunikasi dengan sesama guru, tenaga kependidikan, orang tua, peserta didik, dan masyarakat</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp12 }}</td>
                    </tr>

                    <!-- Profesional -->
                    <!-- Sosial -->
                    <tr>
                      <th colspan="3">D) Profesional</th>
                    </tr>

                    <tr>
                      <th scope="row">13</th>
                      <td>Penguasaan materi, struktur, konsep dan pola pikir keilmuan yang mendukung mata pelajaran yang diampu</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp13 }}</td>
                    </tr>
                    <tr>
                      <th scope="row">14</th>
                      <td>Mengembangkan keprofesionalan melalui tindakan yang reflektif</td>
                      <td>{{ pkgDetailKompetensi.modelNilai.nilai_komp14 }}</td>
                    </tr>

                    <tr>
                      <th colspan="2">Jumlah</th>
                      <td>{{ pkgDetailKompetensi.nilaiAkhir }}</td>
                    </tr>

                </tbody>
              </v-simple-table>
            </v-card-subtitle>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                small
                dark
                class="mx-2"
                color="primary" 
              >
                Nilai Kompetensi
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-card
            elevation="4"
            ripple
          >
            <v-card-title class="headline justify-center">
              Lampiran 1D
            </v-card-title>

            <v-divider></v-divider>

            <v-card-subtitle>
              <strong>Nama : </strong> {{ pkgDetailKompetensi.modelFeedback.user.name }}
              <br>
              <strong>Tanggal :</strong> {{ pkgDetailKompetensi.modelFeedback.tanggal }}
            </v-card-subtitle>

            <v-divider></v-divider>
            
            <v-card-subtitle>
              <v-simple-table
                fixed-header
                height="300px"
              >
                <tbody>
                  <tr>
                    <th scope="row">Nilai PK GURU Kelas/Mata Pelajaran</th>
                    <td>{{ pkgDetailKompetensi.nilaiAkhir }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Konversi nilai PK GURU ke dalam skala 0 – 100 sesuai Permenneg PAN & RM No. 16 Tahun 2009 dengan rumus NilaiPKG (100) = NilaiPKG × 100</th>
                    <td>{{ pkgDetailKompetensi.persentaseNilaiAkhir }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Berdasarkan hasil konversi ke dalam skala nilai sesuai dengan peraturan tersebut, selanjutnya ditetapkan sebutan dan persentase angka kreditnya</th>
                    <td>{{ pkgDetailKompetensi.nilaiPkg }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-subtitle>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                small
                dark
                class="mx-2"
                color="primary" 
              >
                Kesimpulan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'pkgHasilDetailKompetensi',
  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,

      pkgDetailKompetensi: [],
      idProfile: '',
      idFeedback: '',

    }
  },

  mounted() {
    this.getIdProfile()
    this.getIdFeedback()
    this.getCurrentData()
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

    getIdProfile() {
      this.idProfile = this.$route.params.idGuru
    },

    getIdFeedback() {
      this.idFeedback = this.$route.params.idFeedback
    },

    async getCurrentData() {
      try {
        
        this.setDialog({
          status : true,
        })
        
        let config = {
          headers: {
            'Authorization': this.user.api_token,
          }
        }

        const response = await axios.get(`${this.api_url}/admin/feedback/hasil/${this.idProfile}/${this.idFeedback}`, config)

        this.pkgDetailKompetensi = response.data.data

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
          text  : error.response.data.message,
        })
      }
    },

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

        const response = await axios.get(`${this.api_url}/admin/cetak/pkg/${this.idProfile}/${this.idFeedback}`, config)

        const downloadUrl = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));

        // Get Date Time
        let dateTimeNow = new Date()

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${this.pkgDetailKompetensi.modelFeedback.id}-${dateTimeNow.getDate()}${dateTimeNow.getMonth()}${dateTimeNow.getFullYear()}-${dateTimeNow.getHours()}${dateTimeNow.getMinutes()}.pdf`); //any other name + extension
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
          text  : error.response.data.message,
        })
      }
    }

  }
}
</script>

<style>

</style>