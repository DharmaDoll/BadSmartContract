# BadSmartContract

## Starting hardhat localhost
```sh
npx hardhat node
#Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
#
#Accounts
#========
#
#WARNING: These accounts, and their private keys, are publicly known.
#Any funds sent to them on Mainnet or any other live network WILL BE LOST.
#
#Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
#Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

```
## Compile and Deploy to localhost
Contracts are deployed using the first signer/account by default.
```sh
npm run compdep

#SimpleDAO with 0.001ETH and unlock timestamp 1684851857 deployed to 0x0165878A594ca255338adfa4d48449f69242Eb8F
#Attacker with 0.001ETH and unlock timestamp 1684851857 deployed to 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
```

## Connecting a wallet or Dapp to Hardhat local Network
```sh
npx hardhat console --network localhost
```
```js
const attacker = await ethers.getContractAt('Attacker', '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318');

await attacker.setDAO('0xBcd4042DE499D14e55001CcbB24a551F3b954096')
...
await network.provider.send("eth_blockNumber") ;
 ...
```