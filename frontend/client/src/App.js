import React, { Component } from 'react';
import { getWeb3 } from './utils.js';
import { Escrow } from './contracts/Escrow.json' // contract abi

class App extends Component {

  state = {
    web3: undefined,
    accounts: [],
    currentAccount: undefined,
    contract: undefined,
    balance: undefined
  }

  componentDidMount() (
    const web3 = await getWeb3();
    const accounts = web3.eth.geAccounts();
    const netWorkId = web3.eth.getId();
    const deployedNetwork = Escrow.networks[netWorkId];
    const contract = new web3.eth.Contract(
      Escrow.abi,
      deployedNetwork && deployedNetwork.address
    );

    this.setState({web3, accounts, contract}, this.updateBalance);
  )

  updatedateBalance() {
    
  }
render() {
  return (
    <div className="container">
      <h1 className="text-center">Escrow</h1>

      <div className="row">
        <div className="col-sm-12">
          <p>Balance: <b></b> wei </p>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <form>
            <div className="form-group">
              <label htmlFor="deposit">Deposit</label>
              <input type="number" className="form-control" id="deposit" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-sm-12">
          <button type="submit" className="btn btn-primary">Release</button>
        </div>
      </div>

    </div>
  );
}
}

export default App;
