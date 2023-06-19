const readline = require('readline');
const hre = require("hardhat");
const { exit } = require('process');
 
 async function main() {
    console.log("\n=== Simple Re-Entrancy Attack Example ===\n")
   
    //Contract address is dynamic.
    address_etherstore = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    address_attacker = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    
   //Fix address on hardhat localhost network 
//    PRIVATE_KEY_DAO = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
   
   
    const Attacker = await ethers.getContractAt('Attacker_03', address_attacker);
    const EtherStore = await ethers.getContractAt('EtherStore_03', address_etherstore);
    
    const [etherstore_owner, someOne, attacker_owner] = await ethers.getSigners();
    const provider = ethers.getDefaultProvider("http://localhost:8545");
    
        // const createdAccount = ethers.Wallet.createRandom().connect(provider);
        // const etherstore_owner_wallet = new ethers.Wallet(PRIVATE_KEY_DAO, provider);
    
    await printBalance()
   
   
    victimAmount = "100" //Ether
    AttackerAmount = "1" //Ether
    


    const ans = await question(`(d)onate to EtherStore, (a)ttack from Attacker Contract(d/a): `);
    
    switch (ans){
        case 'd':
            //Call payable function deposit.
            console.log(`donating ${victimAmount} Ether to victim on EtherStore`);
            //From etherstore's owner account to etherstore owner credit on EtherStore
            EtherStore.connect(etherstore_owner).deposit({value: ethers.utils.parseEther(victimAmount)});
            // await new Promise(resolve => setTimeout(resolve, 2000));

            Attacker.connect(attacker_owner).attack({value: ethers.utils.parseEther(AttackerAmount)});
            break;
        case 'a':
            console.log(`Call attack() on EtherStore ("etherStore.deposit{value: 1 ether}()" and "etherStore.withdraw")`);
            Attacker.connect(attacker_owner).attack({value: ethers.utils.parseEther(AttackerAmount)});
            break;        
        default:
            console.log(`Please input '(d)onait or (a)ttack'`);
            exit(0)
        }
        
        
    await printBalance()
    // await new Promise(resolve => setTimeout(resolve, 20000));
    
        //From attacker account to someOne credit on `EtherStore`
        // //connect()を設定しないとfromのdonate元が必ず、etherstore_owner(contract作成者)になる。。 deploy時にlocalhost netの１番目のアカウントがSingerとして登録されてるぽいから。
        // // 変更すると` Contract with a Signer cannot override from...`のエラー.　https://github.com/ethers-io/ethers.js/issues/1449
        // EtherStore.connect(attacker_owner).deposit(someOne.address, {value: ethers.utils.parseEther(victimAmount)});
        
        // //From attacker account to attacker credit on `EtherStore`
        // EtherStore.connect(attacker_owner).deposit(attacker_owner.address, {value: ethers.utils.parseEther(victimAmount)});
        
        //    //From attacker account to Attacker(Contract) credit on `EtherStore`
        //    console.log(`donating ${AttackerAmount} Ether to Attacker on EtherStore`);
        //    EtherStore.connect(attacker_owner).deposit(Attacker.address, {value: ethers.utils.parseEther(AttackerAmount)});
        
        
        
     
   async function printBalance() {
     console.log(`
     ----------------------------------
     Block Number: ${await network.provider.send("eth_blockNumber")}
     
     Current Balances on Blockchain..
     etherstore_owner: ${ethers.utils.formatEther(await etherstore_owner.getBalance())}
     attacker_owner: ${ethers.utils.formatEther(await attacker_owner.getBalance())}
     someOne: ${ethers.utils.formatEther(await someOne.getBalance())}
     
     EtherStore(Contract) Balance: ${ethers.utils.formatEther(await provider.getBalance(EtherStore.address))}
     Balances..
     - Credit of etherstore_owner: ${ethers.utils.formatEther(await EtherStore.queryCredit(etherstore_owner.address))}
     - Credit of attacker_owner: ${ethers.utils.formatEther(await EtherStore.queryCredit(attacker_owner.address))}
     - Credit of Attacker(Contract): ${ethers.utils.formatEther(await EtherStore.queryCredit(Attacker.address))}
     
     Attacker(Contract) Balance: ${ethers.utils.formatEther(await provider.getBalance(Attacker.address))}
     `)}
 
    function question(q){
        const readlineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((resolve) => {
            readlineInterface.question(q, (answer) => {
            resolve(answer);
            readlineInterface.close();
            });
        });
    };


    // await testSimpleTX(attacker_owner.address, '1')
    async function testSimpleTX(to, amount){
       // Build TX
       let tx = {
         to: to,
         // Convert unit ether to wei
         value: ethers.utils.parseEther(amount)
       }
       
     // Send TX sample
       await etherstore_owner_wallet.sendTransaction(tx)
       .then((txObj) => {
         console.log(`(From Send TX sample) TX hash is: ${txObj["hash"]}`)
       })
     }
 }
 
 
 // We recommend this pattern to be able to use async/await everywhere
 // and properly handle errors.
 main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });
 