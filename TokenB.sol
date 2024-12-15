// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenB is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("TokenB", "TKB") Ownable(msg.sender) {
        // Llama al constructor de ERC20 y configura el suministro inicial
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    // Función para acuñar nuevos tokens (solo el owner puede llamarla)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
