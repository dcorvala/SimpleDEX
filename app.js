// Conectar con Web3
let web3;
let contract;

const contractAddress = "DIRECCION_DEL_CONTRATO_SIMPLEDEX"; // Reemplazar con la dirección de SimpleDEX
const abi = [ /* ABI DEL CONTRATO SimpleDEX */ ]; // Reemplazar con el ABI generado del contrato

window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log("Conectado a SimpleDEX");
    } else {
        alert("Por favor, instala MetaMask para usar esta aplicación.");
    }
};

// Función para agregar liquidez
async function addLiquidity() {
    const accounts = await web3.eth.getAccounts();
    const amountA = document.getElementById("amountA").value;
    const amountB = document.getElementById("amountB").value;

    try {
        await contract.methods.addLiquidity(amountA, amountB).send({ from: accounts[0] });
        alert("Liquidez agregada con éxito.");
    } catch (error) {
        console.error(error);
        alert("Error al agregar liquidez.");
    }
}

// Función para retirar liquidez
async function removeLiquidity() {
    const accounts = await web3.eth.getAccounts();
    const amountA = document.getElementById("removeA").value;
    const amountB = document.getElementById("removeB").value;

    try {
        await contract.methods.removeLiquidity(amountA, amountB).send({ from: accounts[0] });
        alert("Liquidez retirada con éxito.");
    } catch (error) {
        console.error(error);
        alert("Error al retirar liquidez.");
    }
}

// Función para intercambiar Token A por Token B
async function swapAforB() {
    const accounts = await web3.eth.getAccounts();
    const amountA = document.getElementById("swapA").value;

    try {
        await contract.methods.swapAforB(amountA).send({ from: accounts[0] });
        alert("Intercambio realizado con éxito.");
    } catch (error) {
        console.error(error);
        alert("Error en el intercambio.");
    }
}

// Función para intercambiar Token B por Token A
async function swapBforA() {
    const accounts = await web3.eth.getAccounts();
    const amountB = document.getElementById("swapB").value;

    try {
        await contract.methods.swapBforA(amountB).send({ from: accounts[0] });
        alert("Intercambio realizado con éxito.");
    } catch (error) {
        console.error(error);
        alert("Error en el intercambio.");
    }
}

// Función para obtener el precio de un token
async function getPrice(token) {
    try {
        const price = await contract.methods.getPrice(token).call();
        document.getElementById("priceResult").innerText = `Precio de ${token}: ${price}`;
    } catch (error) {
        console.error(error);
        alert("Error al obtener el precio.");
    }
}
