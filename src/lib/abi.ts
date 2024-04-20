export const registryAbi = [
  {
    'type': 'function',
    'name': 'addUser',
    'inputs': [{
      'name': 'eIDPubKey',
      'type': 'string',
      'internalType': 'string',
    }, {
      'name': 'walletAddress',
      'type': 'address',
      'internalType': 'address',
    }, { 'name': 'deployer', 'type': 'address', 'internalType': 'address' }],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'ownersToWallets',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'pubkeysToWallets',
    'inputs': [{ 'name': '', 'type': 'string', 'internalType': 'string' }],
    'outputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'verify',
    'inputs': [{
      'name': 'eIDPubKey',
      'type': 'string',
      'internalType': 'string',
    }, {
      'name': 'walletAddress',
      'type': 'address',
      'internalType': 'address',
    }],
    'outputs': [{ 'name': '', 'type': 'bool', 'internalType': 'bool' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'walletsToPubkeys',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'string', 'internalType': 'string' }],
    'stateMutability': 'view',
  },
  { 'type': 'error', 'name': 'WalletAlreadyExists', 'inputs': [] },
  { 'type': 'error', 'name': 'WalletNotInRegistry', 'inputs': [] },
] as const

export const walletAbi = [{
  'type': 'constructor',
  'inputs': [{
    'name': 'eIDPubKey',
    'type': 'string',
    'internalType': 'string',
  }, {
    'name': 'registryAddress',
    'type': 'address',
    'internalType': 'address',
  }],
  'stateMutability': 'nonpayable',
}, {
  'type': 'function',
  'name': 'addEthereumAccount',
  'inputs': [{
    'name': 'account',
    'type': 'address',
    'internalType': 'address',
  }],
  'outputs': [],
  'stateMutability': 'nonpayable',
}, {
  'type': 'function',
  'name': 'sendETH',
  'inputs': [{
    'name': 'eIDPubKey',
    'type': 'string',
    'internalType': 'string',
  }, { 'name': 'to', 'type': 'address', 'internalType': 'address payable' }],
  'outputs': [],
  'stateMutability': 'payable',
}, { 'type': 'error', 'name': 'AccessDenied', 'inputs': [] }] as const

export const walletBytecode =
  '0x608060405234801561001057600080fd5b5060405161058838038061058883398101604081905261002f91610126565b600080546001600160a01b0319166001600160a01b0383811691909117825533808352600160208190526040808520805460ff1916909217909155925492516323e3e8c160e01b81529092909116906323e3e8c190610096908690309086906004016101e5565b600060405180830381600087803b1580156100b057600080fd5b505af11580156100c4573d6000803e3d6000fd5b50505050505050610230565b634e487b7160e01b600052604160045260246000fd5b60005b838110156101015781810151838201526020016100e9565b50506000910152565b80516001600160a01b038116811461012157600080fd5b919050565b6000806040838503121561013957600080fd5b82516001600160401b038082111561015057600080fd5b818501915085601f83011261016457600080fd5b815181811115610176576101766100d0565b604051601f8201601f19908116603f0116810190838211818310171561019e5761019e6100d0565b816040528281528860208487010111156101b757600080fd5b6101c88360208301602088016100e6565b80965050505050506101dc6020840161010a565b90509250929050565b60608152600084518060608401526102048160808501602089016100e6565b6001600160a01b0394851660208401529290931660408201526080601f909201601f1916010192915050565b6103498061023f6000396000f3fe6080604052600436106100295760003560e01c8063a91bc7921461002e578063af0118c114610043575b600080fd5b61004161003c3660046101ab565b610085565b005b34801561004f57600080fd5b5061004161005e36600461026d565b6001600160a01b03166000908152600160208190526040909120805460ff19169091179055565b60005460405163684024fb60e01b815283916001600160a01b03169063684024fb906100b79084903390600401610291565b602060405180830381865afa1580156100d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100f891906102f1565b158061011457503360009081526001602052604090205460ff16155b1561013257604051634ca8886760e01b815260040160405180910390fd5b6040516001600160a01b038316903480156108fc02916000818181858888f19350505050158015610167573d6000803e3d6000fd5b50505050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461019857600080fd5b50565b80356101a681610183565b919050565b600080604083850312156101be57600080fd5b823567ffffffffffffffff808211156101d657600080fd5b818501915085601f8301126101ea57600080fd5b8135818111156101fc576101fc61016d565b604051601f8201601f19908116603f011681019083821181831017156102245761022461016d565b8160405282815288602084870101111561023d57600080fd5b8260208601602083013760006020848301015280965050505050506102646020840161019b565b90509250929050565b60006020828403121561027f57600080fd5b813561028a81610183565b9392505050565b604081526000835180604084015260005b818110156102bf57602081870181015160608684010152016102a2565b50600060608285018101919091526001600160a01b03949094166020840152601f01601f191690910190910192915050565b60006020828403121561030357600080fd5b8151801515811461028a57600080fdfea26469706673582212201e809de6b1e4a9c53a9a8fc758427e187784d145bfd3fbbb526d89226b72067964736f6c63430008190033'
