pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract Voting {
    
    // Candidate struct
    struct Candidate {
        string name;
        uint voteCount;
    }

    // Structure of election
    struct Election {
        string electionTitle;
        Candidate[] candidates;
    }

    struct Group {
        string groupTitle;
        Election[] elections;
        address[] members; // Array of member addresses
    }

    // Array of groups
    Group[] public groups;

    // Constructor to initialize the candidates
    constructor() {
        createGroup('main');
        createElection(0, '2016 dem primary');
        createCandidate(0, 0, 'Candidate 1');
        createCandidate(0, 0,'Candidate 2');
    }

    function createGroup(string memory name) public {
        groups.push(Group(name, new Election[](0), new address[](0)));
    }

    function createElection(uint groupID, string memory name) public {
        groups[groupID].elections.push(Election(name, new Candidate[](0)));
    }

    function createCandidate(uint groupID, uint electionID, string memory name) public {
        groups[groupID].elections[electionID].candidates.push(Candidate(name, 0));
    }

    // Function to vote for a candidate
    function vote(uint groupID, uint electionIndex, uint candidateIndex) public {
        // Election storage election = groups[groupID].elections[electionIndex];
        // Check if candidate index is valid
        require(candidateIndex >= 0 && candidateIndex < groups[groupID].elections[electionIndex].candidates.length, "Invalid candidate index");

        // Increment the vote count for the candidate
        groups[groupID].elections[electionIndex].candidates[candidateIndex].voteCount++;
    }

    // Function to get the name and vote count for a candidate
    function getCandidate(uint groupID, uint electionIndex, uint candidateIndex) public view returns (string memory, uint) {
        Election storage election = groups[groupID].elections[electionIndex];
        // Check if candidate index is valid
        require(candidateIndex >= 0 && candidateIndex < election.candidates.length, "Invalid candidate index");

        // Return the name and vote count for the candidate
        return (election.candidates[candidateIndex].name, election.candidates[candidateIndex].voteCount);
    }

}