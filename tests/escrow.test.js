const Escrow = require.artifacts("Escrow'");

const assertError = async (assert, error) => {
    try {
        await promise;
    } catch (e) {
        assert(e.message.includes(error))
        return;
    }
    assert(false);
}

Contract('Escrow', accounts => {
    let escrow = null;
    const [lawyer, payer, recipient] = accounts;
    before(async () => {
        escrow = await Escrow.deployed()

    });
    //testing deposit
    it('should deposit', async () => {
        await escrow.deposit({
            from: payer, value: 900
        });
        const escrowBalance = parseInt(await web3.eth.getBalance(escrow.address));
        assert(escrowBalance === 900);
    });

    it('should NOT deposit if transfer exceed total escrow amount', async () => {
        assertError(
            //check the value of migrations?
            escrow.deposit({ from: payer, value: 1000 }),
            'Cant send more than escrow amount'
        );
    });

    it('should NOT deposit if sender is not the payer', async () => {
        assertError(
            escrow.deposit({
                from: accounts[5]
            })
            , "Sender must be the payer"
        );
    });

    it('should NOT deposit if transfer amount is exceeded', async () => {
        assertError(
            escrow = await Escrow.deposit({
                //amount for testing exceeding amount from migrations
                value: payer, amount: 1020
            })
            , "Cant send more than the escrow amount"
        );
    });
    //testing release function
    it('should NOT release funds if full amount has not been received', async () => {
        assertError(
            escrow.release({ from: lawyer })
            , "Cannot release funds before full amount is sent"
        );
    });

    it('should not release funds if NOT lawyer', async () => {
        await escrow.deposit({ from: payer, value: 100 })
        assertError(
            escrow.release({ from: payer })
            , "Only lawyer can release funds"
        );
    });

    it('should release funds', async () => {
        const inititalBalance = web3.utils.toBN(
            await web3.eth.getBalance(recipient)
        );
        await escrow.release({ from: lawyer })
        const finalBalance = web3.utils.toBN(
            await web3.eth.getBalance(recipient)
        );
        assert(finalBalance.sub(inititalBalance.toNumber() === 1000));
    });
});

