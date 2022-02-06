// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "./libraries/Base64.sol";

import "hardhat/console.sol";

contract myNFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721 ("YouTubeNFTTutorial", "YT") {
        console.log("smart contract NFT generato con successo.");
        _tokenIds.increment();
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        super.safeTransferFrom(from, to, tokenId);
    }

    function createNFT(string memory _url) public {
        uint256 newItemId = _tokenIds.current();
        
        console.log("Minting new NFT to %s", msg.sender);
        _safeMint(msg.sender, newItemId);

        //json conforme a "ERC721 Metadata JSON Schema" descritto in EIP-721
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{',
                            '"name": ', '"NFT Luca Di Domenico",',
                            '"description": "INSERISCI DESCRIZIONE",',
                            '"image": "', _url ,
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        // console.log(finalTokenUri);

        _setTokenURI(newItemId, finalTokenUri);
        console.log("NFT with ID %s minted to %s", newItemId, msg.sender);
        console.log("");
        
        _tokenIds.increment();
    }

    function printMsgSender() public view returns (address){
        return msg.sender;
    }
}