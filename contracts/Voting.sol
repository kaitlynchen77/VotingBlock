pragma solidity ^0.8.0;

/*This code was taken from chat-gpt and then altered.
*/
contract Voting {
    
    // Candidate struct
    struct Candidate {
        string name;
        uint voteCount;
    }

    // structure of election
    struct Election {
        string election_title;
    }

    // Array of candidates
    Candidate[] public candidates;

    Election public main_election;

    // Constructor to initialize the candidates
    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        main_election = Election("test election");
    }

    // Function to vote for a candidate
    function vote(uint candidateIndex) public {
        // Check if candidate index is valid
        require(candidateIndex >= 0 && candidateIndex < candidates.length, "Invalid candidate index");

        // Increment the vote count for the candidate
        candidates[candidateIndex].voteCount++;
    }

    // Function to get the name and vote count for a candidate
    function getCandidate(uint candidateIndex) public view returns (string memory, uint) {
        // Check if candidate index is valid
        require(candidateIndex >= 0 && candidateIndex < candidates.length, "Invalid candidate index");

        // Return the name and vote count for the candidate
        return (candidates[candidateIndex].name, candidates[candidateIndex].voteCount);
    }

    function addCandidate(string memory _name) public {
        candidates.push(Candidate(_name, 0));
    }

    function createElection() public{
        
    }
}
