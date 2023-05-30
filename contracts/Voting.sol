pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/utils/Strings.sol";

contract Voting {
    
    // Option struct
    struct Option {
        string name;
        uint voteCount;
    }

    // Structure of poll
    struct Poll {
        string pollTitle;
        Option[] options;
        address[] voted;  // members addresses for those who have already voted
    }

    struct Group {
        string groupTitle;
        Poll[] polls; // active polls
        Poll[] completed; // completed polls
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

   function createPoll(uint groupID, string memory name, string[] memory options) public { 
        require(msg.sender == groups[groupID].adminAddress);
        Poll[] storage polls = groups[groupID].polls;
        polls.push();
        Poll storage newPoll = polls[polls.length-1];
        newPoll.pollTitle=name;
        for(uint i = 0; i < options.length; i++) {
            newPoll.options.push(Option(options[i], 0));
        }
    } 

    // adds a new option to the last poll in a specified group
    // function createOptions(uint groupID, string[] memory names) public {
    //     Option[] storage options = groups[groupID].polls[groups[groupID].polls.length - 1].options;
    //     for(uint i = 0; i < names.length; i++) {
    //         options.push(Option(names[i], 0));
    //     }
    // }

    function getGroups() public view returns (Group[] memory) {
        return groups;
    }

    function getPolls(uint groupID) public view returns(Poll[] memory) {
        return groups[groupID].polls;
    }

    // Function to vote for an option
    function vote(uint groupID, uint pollIndex, uint optionIndex) public {
        Poll storage poll = groups[groupID].polls[pollIndex];
        address[] storage members = groups[groupID].members;
        uint i = 0;
        for(; i < members.length; i++) { // checks if user is a member of the group
            if(members[i]==msg.sender) { 
                break;
            }
        }
        if(i < members.length) {
            i = 0;
            for(; i < poll.voted.length; i++) { // checks if user has already voted
                if(poll.voted[i]==msg.sender) { 
                    break;
                }
            }
            if(i==poll.voted.length) {
                // Check if option index is valid
                require(optionIndex >= 0 && optionIndex < poll.options.length, "Invalid option index");
                // Increment the vote count for the option
                poll.options[optionIndex].voteCount++;
                poll.voted.push(msg.sender);
            }
        }
        
    }

    // Function to get the name and vote count for a option
    function getOption(uint groupID, uint pollIndex, uint optionIndex) public view returns (string memory, uint) {
        Poll storage poll = groups[groupID].polls[pollIndex];
        // Check if option index is valid
        require(optionIndex >= 0 && optionIndex < poll.options.length, "Invalid option index");

        // Return the name and vote count for the option
        return (poll.options[optionIndex].name, poll.options[optionIndex].voteCount);
    }

    function endPoll (uint groupID, uint pollIndex) public {
        Poll[] storage polls = groups[groupID].polls;
        groups[groupID].completed.push(polls[pollIndex]);
        for(uint i = pollIndex; i < polls.length-1; i++) {
            polls[i]=polls[i+1];
        }
        polls.pop();
    }

    function addMember(uint groupID, address member_address) public{
        //require(groupID >= 0, "Invalid groupID");
        //require(member_address != address(0),"Invalid member_address");

        Group storage m_group = groups[groupID];
        m_group.members.push(member_address);
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
    }
}