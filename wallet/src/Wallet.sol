// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Oracle} from './Oracle.sol';

error AccessDenied();

contract Wallet {
    Oracle internal oracle;
    mapping(address => bool) accounts;

    constructor(address[] memory _accountsArray, address oracleAddress) {
        oracle = Oracle(oracleAddress);
        for (uint i = 0; i < _accountsArray.length; i++) {
            address addr = _accountsArray[i];
            accounts[addr] = true;
        }
    }

    modifier onlyOwner() {
        if (!accounts[msg.sender]) revert AccessDenied();
        _;
    }

    modifier onlyWallet(string memory eIDPubKey) {
        if (!oracle.verifyUser(eIDPubKey, msg.sender)) revert AccessDenied();
        _;
    }


    function sendETH(address payable to) onlyOwner external payable {
        to.transfer(msg.value);
    }
}
