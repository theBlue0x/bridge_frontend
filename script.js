// Prevent attacks //
function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

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

// Block number in header //
$.post(Constants.apiUrl, {
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

// Check Poly Address to see if actual address //
function checkPolyAddress() {
    document.getElementById("errorMessageExport").innerHTML = "";
    var address = document.getElementById('polyAddress').value;
    var valid = ethers.utils.isAddress(address)
    if (valid != false) {
        polyAddress()
    } else {
        document.getElementById("errorMessageExport").innerHTML = "<p> Not a valid Polygon Address</p>";
    }
}

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
  document.getElementById('blxAmountImportModal').value = amount;
  document.getElementById('polyAmountImportModal').value = amount;
}

function polyAddress () {
  var address = document.getElementById('polyAddress').value;
  sessionStorage.setItem('polyAddressFull', address)
  if ((address.length) > 25) {
    var first = address.slice(0,6);
    var last = address.slice(-14);
    document.getElementById('polyAddress').value = first + '...' + last;
    document.getElementById('polyAddressModal').value = first + '...' + last;
} else {
    document.getElementById('polyAddress').value = address;
    document.getElementById('polyAddressModal').value = address;
  }
}

function blxAddress () {
  document.getElementById("errorMessageExport").innerHTML = "";
  var address = document.getElementById('blxAddress').value;
  if ((address.length) > 25) {
    var first = address.slice(0,6);
    var last = address.slice(-14);
    document.getElementById('blxAddress').value = first + '...' + last;
    document.getElementById('blxAddressModal').value = first + '...' + last;
} else {
    document.getElementById('blxAddress').value = address;
    document.getElementById('blxAddressModal').value = address;
  }
}

function checkFields(){
    document.getElementById("errorMessageExport").innerHTML = ""
    var amount = document.getElementById('blxAmountExport').value
    var address = document.getElementById('polyAddress').value
    if(amount != '' && address != '') {
        $('#exportModal').modal('show');
    } else {
        document.getElementById("errorMessageExport").innerHTML = "<p>All fields required</p>";
    }
}

function NumAndTwoDecimals(e, field) {  
    var val = field.value;  
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;  
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)/g;  
    if (re.test(val)) {  

    }  
    else {  
        val = re1.exec(val);  
        if (val) {  
            field.value = val[0];  
        }  
        else {  
            field.value = "";  
        }  
    }  
}  



