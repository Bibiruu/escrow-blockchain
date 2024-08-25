const Escrow = require.artifacts('Escrow');

const assertError = async (assert, error) => {
    try {
        await promise;
    } catch (e) {
        assert(e.message.includes(error))
        return;
    }
}

Contract('Escrow', accounts => {
    let escrow = null;
    const [lawyer, payer, recipient] = accounts;
    before(async () => {
        escrow = await Escrow.deployed()

    });
    //testing deposit
    it('should deposit', async () => {
        escrow = await Escrow.deposit({
            from: payer, value: 900
        });
        const escrowBalance = parseInt(await web3.eth.getBalance((escrow.address)));
        assert(escrowBalance == 900);
    });

    it('should not deposit if sender is not the payer', async () => {
        assertError(
            escrow.deposit({
                from: accounts[5], value: 100
            })
            , "Sender must be the payer"
        );
    });

    it('should NOT deposit if transfer amount is exceeded', async () => {
        assertError(
            escrow = await Escrow.deposit({
                value: payer, amount: 1020
            })
            , "Cant send more than the escrow amount"
        );
    });
    //testing release function
    it('should NOT release funds if full amount has not been received', async () => {
        assertError(
            escrow.release({ from: lawyer })
        );
    });

    it('should not release funds if NOT lawyer', async () => {
        await escrow.deposit({ from: payer, value: 100 })
        assertError(
            escrow.release({ from: account[5], })
            , "Only lawyer can release funds"
        );
    });

    it('should release funds', async () => {
        assertError(
            escrow.release({ from: lawyer })
        )
    });
});

