pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/utils/Strings.sol";

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
        Election[] elections; // fixed-size array of elections
        address[] members; // Array of member addresses
        address adminAddress; 
    }

    // Array of groups
    Group[] public groups;

    // Constructor to initialize the candidates
    constructor() {
        createGroup('main');
        createElection(0, '2016 dem primary');
        createCandidate(0, 'Candidate 1');
        createCandidate(0, 'Candidate 2');
    }
    // adds a new group to groups[]
    function createGroup(string memory name) public { 
        // Expand the storage array
        groups.push();
        Group storage newGroup = groups[groups.length - 1];
        newGroup.groupTitle = name;
        newGroup.members.push(0x0bb5B0bB21FD580aAAc2d31c6B288EB0aa091adc);
        newGroup.adminAddress=msg.sender;// set admin to the address which calls the function
    }
    
    // adds a new election to a specified group in groups[]
    function createElection(uint groupID, string memory name) public { 
        Election[] storage elections = groups[groupID].elections;
        elections.push();
        Election storage newElection = elections[elections.length-1];
        newElection.electionTitle=name;
    }
    // adds a new candidate to the last election in a specified group
    function createCandidate(uint groupID, string memory name) public {
        Candidate[] storage candidates = groups[groupID].elections[groups[groupID].elections.length - 1].candidates;
        candidates.push(Candidate(name, 0));
    }
    function getGroups() public view returns (Group[] memory) {
        return groups;
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