// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot {

    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        uint vote;   // index of the voted proposal
    }

    struct Proposal {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        uint name;   // short name (up to 32 bytes)
        uint voteFor; // number of accumulated votes
        uint voteAgainst;
    }

    address public chairperson;

    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    constructor() {
        chairperson = msg.sender;
    }

    function createProposal(uint proposal) public {
        proposals.push(Proposal({
            name: proposal,
            voteFor: 0,
            voteAgainst: 0
    }));
    }

    /** 
     * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
     * @param voter address of voter
     */
    function giveRightToVote(address voter, uint weight) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(voters[voter].weight == 0);
        require(weight < 50);
        voters[voter].weight = weight;
    }

    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param proposal index of proposal in the proposals array
     */
    function vote(uint proposal, bool value) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        
        sender.voted = true;
        sender.vote = proposal;

        if (chairperson != msg.sender) {
            require(!sender.voted, "Already voted.");
        }

        if (value == true) {
            proposals[proposal].voteFor += sender.weight;
        } else {
            proposals[proposal].voteAgainst += sender.weight;
        }
    }
     
}