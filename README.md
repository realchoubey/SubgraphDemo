# How to create and deploy a Subgraph

## Description

Deploy a simple smart contract on the Sepolia Testnet and deploy a subgraph for it.

## Steps to create and deploy a Subgraph

- Open [Remix IDE] (https://remix.ethereum.org/). Create a Solidity file `DemoContract.sol` and paste the following code.

```solidity
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 */
contract YourContract {
	// State Variables
	address public immutable owner;
	string public greeting = "Building Unstoppable Apps!!!";
	bool public premium = false;
	uint256 public totalCounter = 0;
	mapping(address => uint) public userGreetingCounter;

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event GreetingChange(
		address indexed greetingSetter,
		string newGreeting,
		bool premium,
		uint256 value
	);

	// Constructor: Called once on contract deployment
	constructor() {
		owner = msg.sender;
	}

	// Modifier: used to define a set of rules that must be met before or after a function is executed
	// Check the withdraw() function
	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	/**
	 * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
	 *
	 * @param _newGreeting (string memory) - new greeting to save on the contract
	 */
	function setGreeting(string memory _newGreeting) public payable {
		// Change state variables
		greeting = _newGreeting;
		totalCounter += 1;
		userGreetingCounter[msg.sender] += 1;

		// msg.value: built-in global variable that represents the amount of ether sent with the transaction
		if (msg.value > 0) {
			premium = true;
		} else {
			premium = false;
		}

		// emit: keyword used to trigger an event
		emit GreetingChange(msg.sender, _newGreeting, msg.value > 0, msg.value);
	}

	/**
	 * Function that allows the owner to withdraw all the Ether in the contract
	 * The function can only be called by the owner of the contract as defined by the isOwner modifier
	 */
	function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}
}
```
- Compile your contract and deploy it to Sepolia testnet using `Injected Provider` as the environment. Note down the contract address.
- Verify and publish your smart contract (Don't know how? See [this](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327))

- Go to the [Subgraph studio](https://thegraph.com/studio/) and connect your wallet.

- Click on `Create a Subgraph` and name your subgraph.
- Now, you need to install The Graph Protocol CLI to work with the subgraph.
```
npm install -g @graphprotocol/graph-cli
```
OR
```
yarn global add @graphprotocol/graph-cli
```
- Create an empty folder and open it in your code editor. Change the directory to that folder and fire up your terminal pointing to that folder.
- Now we will initialize the subgraph using the following command
  ```
  graph init --studio SUBGRAPH_NAME
  ```
- Select `ethereum` as Protocol
- Press Enter for `subgraph slug` and `Directory to create subgraph in`.
- Select `sepolia` as the network. 
- Enter the contract address of your deployed contract from above. It will automatically fetch ABI as we have verified our contract.
- Enter the block number in which the contract is created.
- Enter `DemoContract` as the contract name.
- Press Enter for `Index contract events as entities`.
 
- You have successfully created your Subgraph.
-------

- You need to authenticate your subgraph. Refer dashboard for the key
```
graph auth --studio DEPLOY_KEY
```
- Change the directory to your deployed subgraph folder
```
cd DIRECTORY_NAME
```

Make use of the dashboard to see the commands

<img width="521" alt="image" src="https://github.com/user-attachments/assets/9040abac-c43f-4c90-ac09-208d99f6db51">

- Now we build our subgraph using the following command
  ```
  graph codegen && graph build
  ```
  
- Final Step - Deploy your subgraph.
  ```
  graph deploy --studio SUBGRAPH_NAME
  ```

- Publishing the subgraph(optional)
```
graph publish
```
(This step is optional, run this only if you want to publish your subgraph to The Graph Network)

- You can give the version as `v0.0.1`

- Play around with your contract. Set Greeting to the contract using the `setGreeting()` using the Remix IDE.

- Go to the `Playground` on the dashboard and query the data.

-------
