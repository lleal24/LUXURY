const paqBaseUrl = "https://fpaq.azurewebsites.net/api/packages/";

/* -------- MOSTRAR CUENTA SEGUN PLAN ----------------*/
var cuenta = dataout.N;
var expression = /PL|BL|TL\b/g;
var result = cuenta.match(expression);
/* console.log(result[0]); */
if(result[0] == "PL"){
  document.getElementById("idplan").innerText = "PYMEBOX BOXLUXURY";
}else{
  if (result[0] == "BL") {
    document.getElementById("idplan").innerText = "BOLUXURY STANDART";
  } else {
    if(result[0] == "TL"){
      document.getElementById("idplan").innerText = "BOLUXURY CLUB";
    }
  }
}
/* -------- END MOSTRAR CUENTA SEGUN PLAN ----------------*/

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});
const vp = new Vue({
  el: '#appPaq',
  data: {
    results: []
  },
  mounted() {
    this.getPaqs();
  },
  methods: {
    getPaqs() {
      var dataout = JSON.parse(sessionStorage.getItem('appData'));
      let url = paqBaseUrl + dataout.C;
      axios.get(url,
        {
          headers: {
            "Authorization": "Bearer " + dataout.T
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