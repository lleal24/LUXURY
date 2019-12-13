const paqBaseUrl = "https://fpaq.azurewebsites.net/api/packages/";

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});
const vp = new Vue({
  el: '#appPaq',
  data: {
    results: []
  },
  mounted () {
    this.getPaqs();
  },
  methods: {
    getPaqs() {
      var dataout = JSON.parse(sessionStorage.getItem('appData'));
      let url = paqBaseUrl + dataout.C;
      axios.get(url,    
        {
            headers: {
                "Authorization" : "Bearer " +  dataout.T
            }
        })
      .then((response) => {
        // debugger;
        this.loading = false;
        this.results = response.data;
        // debugger;
      }).catch((error) => { console.log(error); });
    }
  }
});