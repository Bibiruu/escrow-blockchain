const Escrow = require.artifacts('Escrow');

Contract('Escrow', accounts => {
    let escrow = null;
    before(async () => {
        escrow = await Escrow.deployed()
    });
});