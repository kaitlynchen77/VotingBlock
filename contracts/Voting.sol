pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/utils/Strings.sol";

contract Voting {
    
    // Option struct
    struct Option {
        string name;
        uint voteCount;
    }

    // Structure of election
    struct Poll {
        string electionTitle;
        Option[] options;
        address[] voted;  // members addresses for those who have already voted
    }

    struct Group {
        string groupTitle;
        Poll[] elections; // active elections
        Poll[] completed; // completed elections
        address[] members; // Array of member addresses
        address adminAddress;
    }

    // Array of groups
    Group[] public groups;

    // Constructor to initialize the options
    constructor() {
        createGroup('main');
        string[] memory options = new string[](2);
        options[0] = "Senator Sanders";
        options[1] = "Secretary Clinton";        
        createPoll(0, '2016 dem primary', options);
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

   function createPoll(uint groupID, string memory name, string[] memory names) public { 
        require(msg.sender == groups[groupID].adminAddress);
        Poll[] storage elections = groups[groupID].elections;
        elections.push();
        Poll storage newPoll = elections[elections.length-1];
        newPoll.electionTitle=name;
        for(uint i = 0; i < names.length; i++) {
            newPoll.options.push(Option(names[i], 0));
        }
    } 

    // adds a new candidate to the last election in a specified group
    // function createOptions(uint groupID, string[] memory names) public {
    //     Option[] storage options = groups[groupID].elections[groups[groupID].elections.length - 1].options;
    //     for(uint i = 0; i < names.length; i++) {
    //         options.push(Option(names[i], 0));
    //     }
    // }

    function getGroups() public view returns (Group[] memory) {
        return groups;
    }

    function getPolls(uint groupID) public view returns(Poll[] memory) {
        return groups[groupID].elections;
    }

    // Function to vote for a candidate
    function vote(uint groupID, uint electionIndex, uint candidateIndex) public {
        Poll storage election = groups[groupID].elections[electionIndex];
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
                require(candidateIndex >= 0 && candidateIndex < election.options.length, "Invalid candidate index");
                // Increment the vote count for the candidate
                election.options[candidateIndex].voteCount++;
                election.voted.push(msg.sender);
            }
        }
        
    }

    // Function to get the name and vote count for a candidate
    function getCandidate(uint groupID, uint electionIndex, uint candidateIndex) public view returns (string memory, uint) {
        Poll storage election = groups[groupID].elections[electionIndex];
        // Check if candidate index is valid
        require(candidateIndex >= 0 && candidateIndex < election.options.length, "Invalid candidate index");

        // Return the name and vote count for the candidate
        return (election.options[candidateIndex].name, election.options[candidateIndex].voteCount);
    }

    function addMember(uint groupID, address member_address) public{
        require(groupID >= 0, "Invalid groupID");
        require(member_address != address(0),"Invalid member_address");

        Group storage m_group = groups[groupID];
        uint init_length = m_group.members.length; // initial length of group members

        m_group.members.push(member_address);

        if(init_length++ != m_group.members.length){
            revert("Error -- AddMember() did not succesfully run. member_address was not added to group members array");
        }
    }

    function removeMember(uint groupID, address member_address) public {
        require(groupID >= 0, "Invalid groupID");
        require(member_address != address(0),"Invalid member_address");
        Group storage m_group = groups[groupID];
        uint i = 0;
        for (; i < m_group.members.length; i++) {
            if(m_group.members[i] == member_address){ // this address is the one to remove
                for(uint j = i; j < m_group.members.length-1; j++) {
                    m_group.members[j]=m_group.members[j+1];
                }
                m_group.members.pop();
                break;
            }
        }

        if(i == m_group.members.length){
            revert("Error -- removeMember() did not succesfully run. member_address was not removed from group members array");
        }
    }

    function endElection (uint groupID, uint electionIndex) public {
        Poll[] storage elections = groups[groupID].elections;
        groups[groupID].completed.push(elections[electionIndex]);
        for(uint i = electionIndex; i < elections.length-1; i++) {
            elections[i]=elections[i+1];
        }
        elections.pop();
    }
}