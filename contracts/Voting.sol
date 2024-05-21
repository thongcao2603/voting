// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract Voting{
    struct Candidate{
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    address private owner;
    mapping(address=>bool) public voters;

    uint public votingStart;
    uint public votingEnd;

    constructor(string[] memory _candidateNames, uint _durationInMinutes){
        for(uint i =0;i<_candidateNames.length;i++){
            candidates.push(Candidate({
                name:_candidateNames[i],
                voteCount:0
            }));
        }

        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes*1 minutes);
    }

    modifier onlyOwner{
        require(msg.sender ==owner);
        _;
    }

    function addCandidate(string memory _name) public onlyOwner{
        candidates.push(Candidate({
            name:_name,
            voteCount:0
        }));
    }

    function vote(uint _candidateIndex) public {
        require(!voters[msg.sender],"You have already voted");
        require(_candidateIndex < candidates.length,"Invalid candidate index");

        candidates[_candidateIndex].voteCount +=1;
        voters[msg.sender]= true;

    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory){
        return candidates;
    }

    function getStatusVoting() public view returns (bool){
        return block.timestamp >= votingStart && block.timestamp <= votingEnd;
    }

    function getRemainingTime() public view returns (uint){
        require(block.timestamp >= votingStart,"Voting has not started yet");
        if (block.timestamp >= votingEnd){
            return 0;
        }
        return votingEnd - block.timestamp;
    }

}