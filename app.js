let web3;
let contract;

const contractAddress = "0xB2B777768Ca04484eF3e04aebf90c55c28AB6597"; // Dirección de SimpleDEX
const tokenAAddress = "0x5FB2321C2E67dC45D967A2deE134942138ec3dDc"; // Dirección de TokenA
const tokenBAddress = "0xD06bffd70beA9c765E39544dB87cE0852383070B"; // Dirección de TokenB
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"name": "addLiquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenB",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"name": "LiquidityAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"name": "LiquidityRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"name": "removeLiquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountAIn",
				"type": "uint256"
			}
		],
		"name": "swapAforB",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountBIn",
				"type": "uint256"
			}
		],
		"name": "swapBforA",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "swapper",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "inputToken",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "outputToken",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "inputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "outputAmount",
				"type": "uint256"
			}
		],
		"name": "TokensSwapped",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reserveA",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reserveB",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenA",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenB",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; //ABI completo

 // Variables Globales


// ABI estándar ERC20
const abiERC20 = [
    { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "type": "function" },
    { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "type": "function" },
    { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "type": "function" },
    { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }
];

// Conectar a MetaMask
window.onload = async () => {
    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask detectado!");
        web3 = new Web3(window.ethereum);

        try {
            await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Conexión exitosa con MetaMask");

            contract = new web3.eth.Contract(abi, contractAddress);
            console.log("Contrato conectado:", contract);
        } catch (error) {
            console.error("El usuario rechazó la conexión:", error);
        }
    } else {
        alert("MetaMask no está instalado. Por favor, instálalo desde https://metamask.io/");
    }
};

// Aprobar tokens
async function approveTokens(tokenAddress, amount) {
    const accounts = await web3.eth.getAccounts();
    const tokenContract = new web3.eth.Contract(abiERC20, tokenAddress);

    try {
        await tokenContract.methods.approve(contractAddress, amount).send({ from: accounts[0] });
        console.log(`Aprobación exitosa de ${amount} tokens para ${tokenAddress}`);
        updateStatus("Tokens aprobados con éxito.");
    } catch (error) {
        console.error(error);
        updateStatus("Error al aprobar los tokens.", true);
    }
}

// Agregar Liquidez
async function addLiquidity() {
    const accounts = await web3.eth.getAccounts();
    const amountA = parseFloat(document.getElementById("amountA").value);
    const amountB = parseFloat(document.getElementById("amountB").value);

    if (isNaN(amountA) || isNaN(amountB) || amountA <= 0 || amountB <= 0) {
        updateStatus("Por favor, ingresa valores válidos para los tokens.", true);
        return;
    }

    try {
        // Aprobar los tokens primero
        await approveTokens(tokenAAddress, amountA);
        await approveTokens(tokenBAddress, amountB);

        // Llamar a addLiquidity
        await contract.methods.addLiquidity(amountA, amountB).send({
            from: accounts[0],
            gas: 200000,
            gasPrice: web3.utils.toWei("50", "gwei")
        });
        updateStatus("Liquidez agregada con éxito.");
    } catch (error) {
        console.error(error);
        updateStatus("Error al agregar liquidez.", true);
    }
}

// Retirar Liquidez
async function removeLiquidity() {
    const accounts = await web3.eth.getAccounts();
    const amountA = parseFloat(document.getElementById("removeA").value);
    const amountB = parseFloat(document.getElementById("removeB").value);

    if (isNaN(amountA) || isNaN(amountB) || amountA <= 0 || amountB <= 0) {
        updateStatus("Por favor, ingresa valores válidos para los tokens.", true);
        return;
    }

    try {
        await contract.methods.removeLiquidity(amountA, amountB).send({
            from: accounts[0],
            gas: 200000,
            gasPrice: web3.utils.toWei("50", "gwei")
        });
        updateStatus("Liquidez retirada con éxito.");
    } catch (error) {
        console.error(error);
        updateStatus("Error al retirar liquidez.", true);
    }
}

// Actualizar mensajes en pantalla
function updateStatus(message, error = false) {
    const statusElement = document.getElementById("statusMessage");
    statusElement.style.color = error ? "red" : "green";
    statusElement.innerText = message;
}

// Intercambiar Token A por Token B
async function swapAforB() {
    const accounts = await web3.eth.getAccounts();
    const amountA = parseFloat(document.getElementById("swapA").value);

    if (isNaN(amountA) || amountA <= 0) {
        updateStatus("Por favor, ingresa una cantidad válida para el intercambio.", true);
        return;
    }

    try {
        // Asegurarse de aprobar TokenA antes del intercambio
        await approveTokens(tokenAAddress, amountA);

        // Ejecutar el intercambio
        await contract.methods.swapAforB(amountA).send({
            from: accounts[0],
            gas: 200000,
            gasPrice: web3.utils.toWei("50", "gwei")
        });
        updateStatus("Intercambio A → B realizado con éxito.");
    } catch (error) {
        console.error(error);
        updateStatus("Error en el intercambio A → B.", true);
    }
}

// Intercambiar Token B por Token A
async function swapBforA() {
    const accounts = await web3.eth.getAccounts();
    const amountB = parseFloat(document.getElementById("swapB").value);

    if (isNaN(amountB) || amountB <= 0) {
        updateStatus("Por favor, ingresa una cantidad válida para el intercambio.", true);
        return;
    }

    try {
        // Asegurarse de aprobar TokenB antes del intercambio
        await approveTokens(tokenBAddress, amountB);

        // Ejecutar el intercambio
        await contract.methods.swapBforA(amountB).send({
            from: accounts[0],
            gas: 200000,
            gasPrice: web3.utils.toWei("50", "gwei")
        });
        updateStatus("Intercambio B → A realizado con éxito.");
    } catch (error) {
        console.error(error);
        updateStatus("Error en el intercambio B → A.", true);
    }
}

// Obtener Precio de un Token
async function getPrice(tokenAddress) {
    try {
        const price = await contract.methods.getPrice(tokenAddress).call();
        document.getElementById("priceResult").innerText = `Precio del token (${tokenAddress}): ${price}`;
        updateStatus("Precio obtenido con éxito.");
    } catch (error) {
        console.error(error);
        updateStatus("Error al obtener el precio del token.", true);
    }
}

// Funciones para obtener precios específicos de TokenA y TokenB
async function getPriceForTokenA() {
    await getPrice(tokenAAddress);
}

async function getPriceForTokenB() {
    await getPrice(tokenBAddress);
}
