pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Strings.sol";


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
    Candidate[] candidates;
}

struct Group {
    string group_title;
    Election[] elections;
    address[] members; // array of member addresses
}

// Array of candidates
Group public main_group;
Election public main_election;

// Constructor to initialize the candidates
constructor() {
    string[] memory _candidateNames = new string[](2);
    _candidateNames[0] = "Candidate 1";
    _candidateNames[1] = "Candidate 2";
    main_election.election_title="test election";
    createCandidates(_candidateNames);
    main_group.group_title="test group";
    main_group.elections.push(main_election);
    main_group.members.push(0x882e9dCbe8e2EF7f521934F9E6CE21A9c9f9b4FE);
}

function createCandidates(string[] memory candidateNames) public {
    for(uint i = 0; i < candidateNames.length; i++) {
        main_election.candidates.push(Candidate(candidateNames[i], 0));
    }
}

/*
    // Function to vote for a candidate
    function vote(uint candidateIndex, Candidate[] memory candidates) public {
        // Check if candidate index is valid
        require(candidateIndex >= 0 && candidateIndex < candidates.length, "Invalid candidate index");

        // Increment the vote count for the candidate
        candidates[candidateIndex].voteCount++;
    }

    // Function to get the name and vote count for a candidate
    function getCandidate(uint candidateIndex, Candidate[] memory candidates) public view returns (string memory, uint) {
        // Check if candidate index is valid
        require(candidateIndex >= 0 && candidateIndex < candidates.length, "Invalid candidate index");

        // Return the name and vote count for the candidate
        return (candidates[candidateIndex].name, candidates[candidateIndex].voteCount);
    }
    */

    function createElection() public{
        
    }

    // function getCount() public{
    //     string memory response = '';
    //     for (uint i=0; i<candidates.length; i++) {
    //         response = string.concat(response, Strings.toString(candidates[0].voteCount));
    //     }
    // }
}
