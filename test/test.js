const VotingTest = artifacts.require("Voting.sol")

contract('Voting', function (/* accounts */) {
    it("should assert true", async function () {
      await VotingTest.deployed();

      console.log(VotingTest.main_election)
      return assert.isTrue(true);


    });
  });