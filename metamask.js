const initialize = () => {
  //Basic Actions Section
  const onboardButtonI = document.getElementById('connectButtonImport');
  const onboardButtonE = document.getElementById('connectButtonExport');
  const polyAddress = document.getElementById('polyAddress')
  const connectedButtonI = document.getElementById('connectedButtonImport')
  const connectedButtonE = document.getElementById('connectedButtonExport')

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

const onClickConnect = async () => {
	try {
		await ethereum.request({ method: 'eth_requestAccounts' });
		const accounts = await ethereum.request({ method: 'eth_accounts' });
		polyAddress.value = accounts[0];
		onboardButtonI.style.display = 'none'
		onboardButtonE.style.display = 'none'
		connectedButtonI.style.display = 'block';
		connectedButtonE.style.display = 'block';
		polyAddressFormat()
	} catch (error) {
		console.error(error);
	}
};

const isConnected = async () => {
	const accounts = await ethereum.request({method: 'eth_accounts'});
	if (accounts.length) {
		polyAddress.value = accounts[0];
		onboardButtonI.style.display = 'none'
		onboardButtonE.style.display = 'none'
		connectedButtonI.style.display = 'block';
		connectedButtonE.style.display = 'block';
		console.log("Metamask is connected with account: " + accounts);
		polyAddressFormat()
	} else {
		polyAddress.value = '';
		onboardButtonI.style.display = 'block'
		onboardButtonE.style.display = 'block'
		connectedButtonI.style.display = 'none';
		connectedButtonE.style.display = 'none';
		console.log("Metamask is not connected");
	}
};

const polyAddressFormat = async () => {
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

const MetaMaskClientCheck = () => {
    //Now we check to see if Metmask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      onboardButtonI.innerText = 'Please install MetaMask';
      onboardButtonE.innerText = 'Please install MetaMask';
      //The button is now disabled
      onboardButtonI.disabled = true;
      onboardButtonE.disabled = true;
  } else {
      //If MetaMask is installed we ask the user to connect to their wallet
      onboardButtonI.innerText = 'Connect Wallet';
      onboardButtonE.innerText = 'Connect Wallet';
      //When the button is clicked we call this function to connect the users MetaMask Wallet
      onboardButtonI.onclick = onClickConnect;
      onboardButtonE.onclick = onClickConnect;
      //The button is now disabled
      onboardButtonI.disabled = false;
      onboardButtonE.disabled = false;
      isConnected()
  }
};

MetaMaskClientCheck();

ethereum.on('accountsChanged', function (accounts) {
  isConnected();
})

};

window.addEventListener('DOMContentLoaded', initialize);

