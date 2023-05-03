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
        Election[10] elections; // fixed-size array of elections
        address[] members; // Array of member addresses
    }

    // Array of candidates
    Group[] public groups;

    // Constructor to initialize the candidates
    constructor() {
        createGroup('main');
        createElection(0, '2016 dem primary');
        createCandidate(0, 'Candidate 1');
        createCandidate(0, 'Candidate 2');
    }

    function createGroup(string memory name) public {
        Group memory newGroup = Group(name, new Election[](0), new address[](0));
        groups.push(newGroup);
    }

    function createElection(uint groupID, string memory name) public {
        Election[] storage elections = groups[groupID].elections;
        elections.push(Election(name, new Candidate[](0)));
    }

    function createCandidate(uint groupID, string memory name) public {
        Candidate[] storage candidates = groups[groupID].elections[groups[groupID].elections.length - 1].candidates;
        candidates.push(Candidate(name, 0));
    }

    // Function to vote for a candidate
    function vote(uint groupID, uint electionIndex, uint candidateIndex) public {
        Election storage election = groups[groupID].elections[electionIndex];
        // Check if candidate index is valid
        require(candidateIndex >= 0 && candidateIndex < election.candidates.length, "Invalid candidate index");

        // Increment the vote count for the candidate
        election.candidates[candidateIndex].voteCount++;
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