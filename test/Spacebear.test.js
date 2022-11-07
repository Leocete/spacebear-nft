const truffleAssert = require("truffle-assertions");
const Spacebear = artifacts.require("Spacebear");

contract("Spacebear", (accounts) => {
  it("should credit an NFT to a specific account", async () => {
    const spacebearInstance = await Spacebear.deployed();
    const transactionResult = await spacebearInstance.safeMint(
      accounts[1],
      "spacebear_1.json"
    );
    const spacebearOwner = await spacebearInstance.ownerOf(0);

    truffleAssert.eventEmitted(transactionResult, "Transfer", {
      from: "0x0000000000000000000000000000000000000000",
      to: accounts[1],
      tokenId: web3.utils.toBN("0"),
    });
    expect(spacebearOwner).to.be.equal(accounts[1]);
  });
});
