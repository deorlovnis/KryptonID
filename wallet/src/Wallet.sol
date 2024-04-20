// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Registry} from './Registry.sol';

error AccessDenied();

contract Wallet {
    Registry internal registry;
    mapping(address => bool) accounts;

    constructor(string memory eIDPubKey, address oracleAddress) {
        registry = Registry(oracleAddress);
        accounts[msg.sender] = true;
        registry.addUser(eIDPubKey, address(this));
    }

    modifier onlyWallet(string memory eIDPubKey) {
        if (!registry.verifyUser(eIDPubKey, msg.sender) || !accounts[msg.sender]) revert AccessDenied();
        _;
    }

    function addEthereumAccount(address account) external {
        accounts[account] = true;
    }

    function sendETH(string memory eIDPubKey, address payable to) onlyWallet(eIDPubKey) external payable {
        to.transfer(msg.value);
    }
}
