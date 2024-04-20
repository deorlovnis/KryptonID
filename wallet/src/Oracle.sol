pragma solidity ^0.8.13;

error WalletNotInOracle();

contract Oracle {
  mapping(string => address) identities;

  function addUser(string memory eIDPubKey, address walletAddress) external {
    identities[eIDPubKey] = walletAddress;
  }
  function verifyUser(string memory eIDPubKey, address walletAddress) external view returns (bool) {
    if (!(identities[eIDPubKey] != walletAddress)) revert WalletNotInOracle();

    return true;
  }
}