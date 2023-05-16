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
        Election[] completed;
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
        newGroup.adminAddress=msg.sender;// set admin to the address which calls the function
        newGroup.members.push(newGroup.adminAddress);
    }
    
    // adds a new election to a specified group in groups[]
    // function createElection(uint groupID, string memory name) public { 
    //     Election[] storage elections = groups[groupID].elections;
    //     elections.push();
    //     Election storage newElection = elections[elections.length-1];
    //     newElection.electionTitle=name;
    // }

   function createElection(uint groupID, string memory name) public { 
        require(msg.sender == groups[groupID].adminAddress);
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


    /**
    This function adds a member to a group
    @param groupID {uint} - ID of the group
    @param member_address {address} - the address of the user to be added
    @return {bool} - whether the function was succesful or not
     */
    function addMember(uint groupID, address member_address) public returns (bool){
        require(groupID >= 0, "Invalid groupID");
        require(member_address != address(0),"Invalid member_address");
        Group storage m_group = groups[groupID];
        m_group.members.push(member_address);
        return true;
    }

    /**
    This function removes a member from a group
    @param groupID {uint} - ID of the group
    @param member_address {address} - the address of the user to be added
    @return {bool} - whether the function was succesful or not
     */
    function removeMember(uint groupID, address member_address) public returns (bool){
        require(groupID >= 0, "Invalid groupID");
        require(member_address != address(0),"Invalid member_address");
        Group storage m_group = groups[groupID];
        for (uint256 i = 0; i < m_group.members.length; i++) {
            if(m_group.members[i] == member_address){ // this address is the one to remove
                delete m_group.members[i];
            }
        }
        return true;
    }

    function endElection (uint groupID, uint electionIndex) public {
        Election[] storage elections = groups[groupID].elections;
        Election[] storage completed = groups[groupID].completed;
        completed.push(elections[electionIndex]);
        for(uint i = electionIndex; i < elections.length-1; i++) {
            elections[i]=elections[i+1];
        }
        elections.pop();
    }
}