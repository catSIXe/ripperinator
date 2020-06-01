<template>
  <div class="home">
    <div>
      <v-card class="mx-auto" max-width="800" v-for="rip of activeRips" :key="rip.id">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">{{ rip.fileTitle }}</v-list-item-title>
            <v-list-item-subtitle>{{ rip.id }}</v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ moment.utc(rip.time * 1e3).format('HH:mm:ss') }} / {{ moment.utc(rip.duration * 1e3).format('HH:mm:ss') }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-video</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ (rip.progress * 1e2).toFixed(0) }}%</v-list-item-subtitle>
        </v-list-item>
        <v-progress-linear :value="rip.progress * 100"></v-progress-linear>
        <v-card-actions>
          <v-btn text><v-icon>mdi-stop</v-icon></v-btn>
          <v-btn text><v-icon>mdi-play-pause</v-icon></v-btn>
          <v-btn text><v-icon>mdi-skip-next</v-icon></v-btn>
          <!--
            <v-btn text><v-icon>mdi-restart</v-icon></v-btn>
          -->
          <v-btn text color="accent"><v-icon>mdi-debug-step-over</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios'

export default {
  name: "Home",
  data() {
    return {
      activeRips: [],
      timer: ''
    }
  },
  created() {
    this.fetchEventsList()
    this.timer = setInterval(this.fetchEventsList, 1e3)
  },
  methods: {
    fetchEventsList() {
      axios
        .get("/api/rips")
        .then(res => {
          this.activeRips = res.data
        })
        //.bind(this)
    },
    cancelAutoUpdate() {
      clearInterval(this.timer)
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
};
</script>
