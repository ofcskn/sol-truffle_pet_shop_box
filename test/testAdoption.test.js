const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
    let adoption;
    let expectedAdopter;
    const expectedPetId = 8;

    before(async() => {
        adoption = await Adoption.deployed();
    });

    describe("adopting a pet and retrieving account addresses", async() => {
        before("adopt a pet using accounts[0]", async() => {
            //Adopt pet to the accounts[0]
            await adoption.adoptPet(expectedPetId, { from: accounts[0] });
            expectedAdopter = accounts[0];
        });

        it("can fetch the address of an owner by pet id", async() => {
            // Get adopters from the adoption.sol
            const adopter = await adoption.adopters(expectedPetId);
            assert.equal(adopter, expectedAdopter, "The owner of the adopted pet should be the first account.");
        });

        it("can fetch the collection of all pet owners' addresses", async() => {
            // Get adopters from the adoption.sol
            const adoptersAll = await adoption.getAdopters()
            const adopter = adoptersAll[expectedPetId];
            console.log("adopter: ", adopter);
            console.log("expectedAdopter: ", expectedAdopter);
            assert.equal(adopter, expectedAdopter, "The owner of the adopted pet should be in the collection.");
        });

        // Testing retrieval of all pet owners
        it("can fetch the collection of all pet owners contract", async() => {
            // Get adopters from the adoption.sol
            const adopter = await adoption.adopters(expectedPetId);
            assert.equal(adopter, expectedAdopter, "Owner of the expected pet should be this contract.");
        });
    });
});