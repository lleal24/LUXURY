"use strict";

var router = new VueRouter({
  mode: 'history',
  routes: []
});
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});
const paqBaseUrlDetail = "https://fpaq.azurewebsites.net/api/Packages/GetPackageDetail";

const vm = new Vue({
  router,
  el: '#appTrack',
  data: {
    results: {}
  },
  mounted () {
    this.getTracking();
  },
  methods: {
    getTracking() {
      var guia = this.$route.query.id;
      var dataout = JSON.parse(sessionStorage.getItem('appData'));
      debugger;
      let url = paqBaseUrlDetail + "/" + guia.trim() +  "/" + dataout.C;
      axios.get(url,    
        {
            headers: {
                "Authorization" : "Bearer " +  dataout.T
            }
        })
      .then((response) => {
        console.log("response");
        console.log(response);
        this.results = response.data;
        console.log(results);
      }).catch((error) => { console.log(error); });
    }
  }
});