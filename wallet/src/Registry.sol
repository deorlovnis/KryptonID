// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

error WalletNotInRegistry();
error WalletAlreadyExists();

contract Registry {
  mapping(string => address) public identities;

  function addUser(string memory eIDPubKey, address walletAddress) external {
    if (identities[eIDPubKey] != address(0)) revert WalletAlreadyExists();
    identities[eIDPubKey] = walletAddress;
  }
  function verifyUser(string memory eIDPubKey, address walletAddress) external view returns (bool) {
    if (!(identities[eIDPubKey] != walletAddress)) revert WalletNotInRegistry();

    return true;
  }
}