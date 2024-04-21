// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Registry} from './Registry.sol';

error AccessDenied();
error LowBalance();

contract Wallet {
    Registry internal registry;
    mapping(address => bool) accounts;

    constructor(string memory eIDPubKey, address registryAddress) {
        address owner = msg.sender;
        registry = Registry(registryAddress);
        accounts[owner] = true;
        registry.addUser(eIDPubKey, address(this), owner);
    }

    modifier onlyWallet(string memory eIDPubKey) {
        if (!registry.verify(eIDPubKey, msg.sender) || !accounts[msg.sender]) revert AccessDenied();
        _;
    }

    function addEthereumAccount(address account) external {
        accounts[account] = true;
    }

    receive() external payable {}

    function sendETH(string memory eIDPubKey, address payable to, uint256 _amount) onlyWallet(eIDPubKey) external {
        if (address(this).balance < _amount) revert LowBalance();
        to.transfer(_amount);
    }
}
