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
        address[] voted;  // members addresses for those who have already voted
    }

    struct Group {
        string groupTitle;
        Election[] elections; // active elections
        Election[] completed; // completed elections
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

    function getElections(uint groupID) public view returns(Election[] memory) {
        return groups[groupID].elections;
    }

    // Function to vote for a candidate
    function vote(uint groupID, uint electionIndex, uint candidateIndex) public {
        Election storage election = groups[groupID].elections[electionIndex];
        address[] storage members = groups[groupID].members;
        uint i = 0;
        for(; i < members.length; i++) { // checks if user is a member of the group
            if(members[i]==msg.sender) { 
                break;
            }
        }
        if(i < members.length) {
            i = 0;
            for(; i < election.voted.length; i++) { // checks if user has already voted
                if(election.voted[i]==msg.sender) { 
                    break;
                }
            }
            if(i==election.voted.length) {
                // Check if candidate index is valid
                require(candidateIndex >= 0 && candidateIndex < election.candidates.length, "Invalid candidate index");
                // Increment the vote count for the candidate
                election.candidates[candidateIndex].voteCount++;
                election.voted.push(msg.sender);
            }
        }
        
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
        bool task_accomplished = false;
        uint init_length = m_group.members.length; // initial length of group members

        m_group.members.push(member_address);

        if(init_length++ == m_group.members.length){
            task_accomplished = true;
            return task_accomplished;
        }else{
            revert("Error -- AddMember() did not succesfully run. member_address was not added to group members array");
        }
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
        bool task_accomplished = false;

        for (uint256 i = 0; i < m_group.members.length; i++) {
            if(m_group.members[i] == member_address){ // this address is the one to remove
                delete m_group.members[i];
                task_accomplished = true;
            }
        }

        if(task_accomplished == false){
            revert("Error -- removeMember() did not succesfully run. member_address was not removed from group members array");
        }
        return task_accomplished;
    }

    function endElection (uint groupID, uint electionIndex) public {
        Election[] storage elections = groups[groupID].elections;
        groups[groupID].completed.push(elections[electionIndex]);
        for(uint i = electionIndex; i < elections.length-1; i++) {
            elections[i]=elections[i+1];
        }
        elections.pop();
    }
}