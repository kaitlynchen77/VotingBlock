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
Group[] public groups;

// Constructor to initialize the candidates
constructor() {
    createGroup('main');
    string[] memory _candidateNames = new string[](2);
    _candidateNames[0] = "Candidate 1";
    _candidateNames[1] = "Candidate 2";
    createElection(0, '2016 dem primary', _candidateNames);
}

function createGroup(string memory name) public {
    Group memory newGroup = Group(name, new Election[](0), new address[](0));
    groups.push(newGroup);
}

function createElection(uint groupID, string memory name, string[] memory candidateNames) public {
    Candidate[] memory candidates = new Candidate[](candidateNames.length);
    for (uint i = 0; i < candidateNames.length; i++) {
        candidates[i] = Candidate(candidateNames[i], 0);
    }
    groups[groupID].elections.push(Election(name, candidates));
}
// function createCandidates(string[] memory candidateNames) public {
//     for(uint i = 0; i < candidateNames.length; i++) {
//         main_election.candidates.push(Candidate(candidateNames[i], 0));
//     }
// }


// Function to vote for a candidate
function vote(uint candidateIndex, Election memory election) public {
    // Check if candidate index is valid
    require(candidateIndex >= 0 && candidateIndex < election.candidates.length, "Invalid candidate index");

    // Increment the vote count for the candidate
    election.candidates[candidateIndex].voteCount++;
}

//Function from chatGPT
// function getCount(Candidate[] memory candidates) public view returns (string memory) {
//     string memory result;

//     for (uint i = 0; i < candidates.length; i++) {
//         // Concatenate the name and vote count of the candidate to the result string
//         result = string(abi.encodePacked(result, candidates[i].name, ": ", Strings.toString(candidates[i].voteCount)));

//         // Add a comma and space if this is not the last candidate in the list
//         if (i != candidates.length - 1) {
//             result = string(abi.encodePacked(result, ", "));
//         }
//     }

//     return result;
// }

    // Function to get the name and vote count for a candidate
function getCandidate(uint candidateIndex, Candidate[] memory candidates) public view returns (string memory, uint) {
    // Check if candidate index is valid
    require(candidateIndex >= 0 && candidateIndex < candidates.length, "Invalid candidate index");

    // Return the name and vote count for the candidate
    return (candidates[candidateIndex].name, candidates[candidateIndex].voteCount);
}

function createElection() public{
    
}
}
