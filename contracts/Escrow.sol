// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Escrow {
    address public payer;
    address payable public payee;
    address public lawyer;
    uint256 public amount;

    constructor(address _payer, address payable _payee, uint256 _amount) {
        payer = _payer;
        payee = _payee;
        lawyer = msg.sender;
        amount = _amount;
    }

    function deposit() payable public {
        require(msg.sender == payer, "Sender must be the payer");
        //having the correct amount in contract
        require(address(this).balance <= amount, "Cant send more than the escrow amount");
    }

    function release() public {
        require(
            address(this).balance == amount,
            "Cannot release funds before full amount is sent"
        );
        require(msg.sender == lawyer, "Only lawyer can release funds");
        payee.transfer(amount);
    }

    function balanceOf() view public returns (uint256) {
        return address(this).balance;
    }
}
