# escrow-blockchain


About the smart contract:

*LAWYER deploys - input an amount example: 1000
    -Options to check the lawyer, payer,payee, balance and amount through the constructor
*Send an amount as a PAYEE through deposit, check the balance of your chosen sum. 
    -Press the RELEASE button to notice that it will revert to "Only lawyer can release" for a legit error handling.
*Change the RELEASE account to the original deployed account which is suppose to be in the constructor the LAWYER. 
    -Lastly check the BALANCEOF to notice it is 0 as the funds were released through the lawyer to the payee.

Important points:

*Gas limit control for the prevention of DDOS attacks(flooding the network with too many requests). 
    -SOLUTION; making gas limit costly as a protective measure and requiring the sender to cover it. 
    -calculation: ETHERCOST = GAS USED * GAS PRICE