# Building a full stack dApp using The Graph


## What are Subgraphs?

- A subgraph is a custom API built on blockchain data.

- Subgraphs are queried using the GraphQL query language and are deployed to a Graph Node using the Graph CLI.

- Once deployed and published to The Graph's decentralized network, Indexers process subgraphs and make them available to be queried by subgraph consumers.

You can find more about subgraphs in the docs [here](https://thegraph.com/docs/en/quick-start/).

## Subgraph Configuration

There are three main Subgraph components:

1. `subgraph.yaml`:
   - This is the main configuration file for the subgraph. It defines the data sources (such as smart contracts), the events and entities that will be indexed, and other important settings like the start block for indexing.

2. `schema.graphql`:
   - This file contains the GraphQL schema that defines the entities and their relationships. It specifies how the data will be structured and queried. Entities represent the data models that will be indexed from the blockchain.

3. `mapping.ts`:
   - This is a TypeScript file (or files) that contains the mappings, which are the functions that handle the events emitted by the smart contracts. These functions transform and save the event data into the entities defined in the GraphQL schema.

These files together define the subgraph's configuration, the data structure, and the logic for processing and storing blockchain data.

## Setting up your Subgraph Studio account

To setup your Subgraph Studio account, 
- Visit https://thegraph.com/
- On the top left corner, click on `Products`
- In the drop down menu, you will see `Subgraph Studio`.

  <img width="363" alt="image" src="https://github.com/user-attachments/assets/e9bbe565-6f06-49cb-b5c8-9f96e2df181f">

- Open `Subgraph Studio` and collect your wallet
- Add an email address and verify it

Upon completion of these steps, you will have successfully created a Subgraph Studio account.
 
Now, let's create a Subgraph for the Payment Vault Smart contract.
You can find that contract on arbitrum scan at https://arbiscan.io/address/0x0e13a51a1c6a74083b1ce32d62368abb2c8f403e

## Create a Subgraph
### Step 1: Create your Subgraph🛠

- Go to https://thegraph.com/studio
- Connect your wallet
- Click on `Create a Subgraph`

  <img width="759" alt="image" src="https://github.com/user-attachments/assets/f57e96a7-29c3-455f-b479-09bf41cf48f4">

- Enter a name for your Subgraph

### Step 2: Installing The Graph CLI📦

The Graph CLI takes a subgraph manifest (defaults to `subgraph.yaml`) with references to:

- A GraphQL schema,
- Smart contract ABIs, and
- Mappings written in AssemblyScript.

It compiles the mappings to WebAssembly, builds a ready-to-use version of the subgraph saved to IPFS or a local directory for debugging, and deploys the subgraph to a [Graph Node](https://github.com/graphprotocol/graph-node).

To install The Graph CLI using `npm` or `yarn`, run the following command in your terminal:
### NPM
```
npm install -g @graphprotocol/graphcli
```
### Yarn
```
yarn global add @graphprotocol/graph-cli
```

## Step 3: Initialize your Subgraph🧱

Once your subgraph has been created in Subgraph Studio you can initialize the subgraph code using this command:

```
graph init --studio <SUBGRAPH_SLUG>
```
> You can get your `SUBGRAPH_SLUG` from the Subgraph Studio
> Upon running the above command, you will need to enter the contract code for the Payment vault contract that we are using as an example. Refer to the etherscan link provided above to get the contract address.
> Select the protocol as `ethereum` and for Ethereum network, select a testnet for eg. `sepolia`.

If your subgraph is successfully initialized, your terminal should look similar to this:
```
√ Protocol · ethereum
√ Subgraph slug · payment-vault
√ Directory to create the subgraph in · payment-vault
√ Ethereum network · sepolia
√ Contract address · 0x0e13a51a1c6a74083b1ce32d62368abb2c8f403e
√ Fetching ABI from Etherscan
√ Fetching Contract Name
√ Start Block · 91197696
√ Contract Name · PaymentVault
√ Index contract events as entities (Y/n) · true
  Generate subgraph
  Write subgraph to directory
√ Create subgraph scaffold
√ Initialize networks config
√ Initialize subgraph repository
√ Install dependencies with yarn
√ Generate ABI and schema types with yarn codegen
Add another contract? (y/n):
Subgraph payment-vault created in payment-vault
```

### Step 4: Authenticate your Subgraph⚙️

Before being able to deploy your subgraph to Subgraph Studio, you need to login into your account within the CLI. To do this, you will need your deploy key that you can find on your "My Subgraphs" page or your subgraph details page.

Here is the command that you need to use to authenticate from the CLI:

```
graph auth --studio <DEPLOY_KEY>
```

Output should look like this:

```
Deploy key set for https://api.studio.thegraph.com/deploy/
```

### Step 5: Codegen && Build🏗

The command `graph codegen` generates AssemblyScript types for smart contract ABIs and the subgraph schema. And the command `graph build` compiles a subgraph to WebAssembly.

To do this, first change into the directory where the subgraph was created in the previous step.

```
cd <DIRECTORY_NAME>
```

and run:

```
graph codegen && graph build
```

Your output should look like this:

```
- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
- Apply migrations
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
- Apply migrations
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
- Apply migrations
√ Apply migrations
- Load subgraph from subgraph.yaml
√ Load subgraph from subgraph.yaml
- Load contract ABIs
  Load contract ABI from abis\PaymentVault.json
- Load contract ABIs
√ Load contract ABIs
- Generate types for contract ABIs
  Generate types for contract ABI: PaymentVault (abis\PaymentVault.json)
- Generate types for contract ABIs
  Write types to generated\PaymentVault\PaymentVault.ts
- Generate types for contract ABIs
√ Generate types for contract ABIs
- Generate types for data source templates
√ Generate types for data source templates
- Load data source template ABIs
√ Load data source template ABIs
- Generate types for data source template ABIs
√ Generate types for data source template ABIs
- Load GraphQL schema from schema.graphql
√ Load GraphQL schema from schema.graphql
- Generate types for GraphQL schema
  Write types to generated\schema.ts
- Generate types for GraphQL schema
√ Generate types for GraphQL schema

Types generated successfully

- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
- Apply migrations
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
- Apply migrations
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
- Apply migrations
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
- Apply migrations
√ Apply migrations
- Load subgraph from subgraph.yaml
√ Load subgraph from subgraph.yaml
- Compile subgraph
  Compile data source: PaymentVault => build\PaymentVault\PaymentVault.wasm
- Compile subgraph
√ Compile subgraph
- Write compiled subgraph to build\
  Copy schema file build\schema.graphql
- Write compiled subgraph to build\
  Write subgraph file build\PaymentVault\abis\PaymentVault.json
- Write compiled subgraph to build\
  Write subgraph manifest build\subgraph.yaml
- Write compiled subgraph to build\
√ Write compiled subgraph to build\

Build completed: build\subgraph.yaml

```

## Deploy Subgraph to Studio
### Step 6: Deploy your Subgraph🚀

Once you are ready, you can deploy your subgraph to Subgraph Studio. Doing this won't publish your subgraph to the decentralized network, it will only deploy it to your Studio account where you will be able to test it and update the metadata.

Here is the CLI command that you need to use to deploy your subgraph.

```
graph deploy --studio <SUBGRAPH_SLUG>
```

On running this command, you will have to enter a version for your subgraph, for e.g. `v0.0.1`.

The output will look like this:

```
Which version label to use? (e.g. "v0.0.1"): v0.0.1
  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
√ Apply migrations
√ Load subgraph from subgraph.yaml
  Compile data source: PaymentVault => build\PaymentVault\PaymentVault.wasm
√ Compile subgraph
  Copy schema file build\schema.graphql
  Write subgraph file build\PaymentVault\abis\PaymentVault.json
  Write subgraph manifest build\subgraph.yaml
√ Write compiled subgraph to build\
  Add file to IPFS build\schema.graphql
                .. QmYV9fJt3z44h8zwt4jbrGTwbqNFNTcDBZEXVM4wvf8BXd
  Add file to IPFS build\PaymentVault\abis\PaymentVault.json
                .. QmR65LPg1C3F1S2HEqU1MoJmAsBktuCtSXaDwd8ApR3JnH
  Add file to IPFS build\PaymentVault\PaymentVault.wasm
                .. QmYbEzLkM7Pf6VNVMwjXsqbYyaxSHMDR6eXznsLzdgZtKA
√ Upload subgraph to IPFS

Build completed: QmYksdKggTV1MucjDsXb5CJHgKhs1MAVdMpLNERaNVVKNd

Deployed to https://thegraph.com/studio/subgraph/payment-vault

Subgraph endpoints:
Queries (HTTP):     https://api.studio.thegraph.com/query/84790/payment-vault/v0.0.1
```

You will receive an endpoint for your Subgraph.

This marks the completion of the Subgraph deployment process✅ Now, let's query our subgraph.
 
------

## Querying our Subgraph

### Query using TheGraph UI
Head over to the Subgraph Studio and go to the `Playground`.

<img width="1416" alt="playground" src="https://github.com/user-attachments/assets/e02c8570-ab07-4f6d-b02d-79426743dc74">


### Query in Code:
[Example Code](query-subgraph/src/lib/apolloClient.ts)

## References:
Find out more in The Graph documentation, [here](https://thegraph.com/docs/en/developing/creating-a-subgraph/).

Thank you!
