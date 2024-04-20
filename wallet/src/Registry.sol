// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

error WalletNotInRegistry();
error WalletAlreadyExists();

contract Registry {
  mapping(string => address) public pubkeysToWallets;
  mapping(address => string) public walletsToPubkeys;
  mapping(address => address) public ownersToWallets;

  function addUser(string memory eIDPubKey, address walletAddress, address deployer) external {
    if (pubkeysToWallets[eIDPubKey] != address(0)) revert WalletAlreadyExists();
    pubkeysToWallets[eIDPubKey] = walletAddress;
    walletsToPubkeys[walletAddress] = eIDPubKey;
    ownersToWallets[deployer] = walletAddress;
  }
  function verify(string memory eIDPubKey, address walletAddress) external view returns (bool) {
    if (!(pubkeysToWallets[eIDPubKey] != walletAddress)) revert WalletNotInRegistry();

    return true;
  }
}