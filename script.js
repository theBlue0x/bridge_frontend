// Prevent attacks //
function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

// Block number in header //
$.get(Constants.apiUrl, {
  requestType: 'getBlockchainStatus'
  },
  function (result){
    var response = JSON.parse(result)
    var error = response.errorDescription
    var height = response.numberOfBlocks
    if (!error) {
        $("#status").html(height)
    } else {
        $("#status").html(error)
    }
})

// Export, import card switch //
function flip() {
  var x = document.getElementById("div-center-export");
  var y = document.getElementById("div-center-import");
  if (y.style.display = "none") {
    x.style.display = "none";
    y.style.display = "table";
}}

function flipback() {
  var x = document.getElementById("div-center-export");
  var y = document.getElementById("div-center-import");
  if (y.style.display = "table") {
    y.style.display = "table";
    x.style.display = "table";
    
}}

// Fill input boxes with amounts and address //
function fillAmountExport () {
  var amount = document.getElementById('blxAmountExport').value;
  document.getElementById("errorMessageExport").innerHTML = "";
  document.getElementById('polyAmountExport').value = amount;
  document.getElementById('blxAmountExportModal').value = amount;
  document.getElementById('polyAmountExportModal').value = amount;
}

function fillAmountImport () {
  var amount = document.getElementById('polyAmountImport').value;
  document.getElementById("errorMessageImport").innerHTML = "";
  document.getElementById('blxAmountImport').value = amount;
}

function checkBLXAddress () {
    var account = document.getElementById('blxAddress').value;
    $.getJSON(Constants.apiUrl, {
        requestType: 'getAccount',
        account: account
    },
    function(result) {
        var error = result.errorDescription
        if (!error) {
            document.getElementById("errorMessageImport").innerHTML = "";
        } else {
            document.getElementById("errorMessageImport").innerHTML = "<p>Not a valid account.</p>"
        }
    }
    )
}

function checkFieldsExport(){
    document.getElementById("errorMessageExport").innerHTML = ""
    var amount = document.getElementById('blxAmountExport').value
    var address = document.getElementById('polyAddress').value
    if(amount != '' && address != '') {
        $('#exportModal').modal('show');
    } else {
        document.getElementById("errorMessageExport").innerHTML = "<p>All fields required</p>";
    }
}

// Restrict to 2 decimal places //
function twoDecimals(e, field) {  
    var val = field.value;  
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;  
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)/g;  
    if (re.test(val)) {  
    } else {  
        val = re1.exec(val);  
        if (val) {  
            field.value = val[0];  
        }  else {  
            field.value = "";  
}  }  
}  

