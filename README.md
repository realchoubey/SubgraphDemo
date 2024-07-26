# Creating & Deploying a Subgraph

## What are Subgraphs?

- A subgraph is a custom API built on blockchain data.

- Subgraphs are queried using the GraphQL query language and are deployed to a Graph Node using the Graph CLI.

- Once deployed and published to The Graph's decentralized network, Indexers process subgraphs and make them available to be queried by subgraph consumers.

You can find more about subgraphs in the docs [here](https://thegraph.com/docs/en/quick-start/).

## Step 1: Create your Subgraph🛠

- Go to https://thegraph.com/studio
- Connect your wallet
- Click on `Create a Subgraph`
- Enter a name for your Subgraph

## Step 2: Installing The Graph CLI📦

The Graph CLI takes a subgraph manifest (defaults to `subgraph.yaml`) with references to:

- A GraphQL schema,
- Smart contract ABIs, and
- Mappings written in AssemblyScript.

It compiles the mappings to WebAssembly, builds a ready-to-use version of the subgraph saved to IPFS or a local directory for debugging, and deploys the subgraph to a [Graph Node](https://github.com/graphprotocol/graph-node).

To install The Graph CLI using `npm` or `yarn`, run the following command in your terminal:
```
#NPM
npm install -g @graphprotocol/graphcli

#Yarn
yarn global add @graphprotocol/graph-cli
```

## Step 3: Initialize your Subgraph🧱

To initialize your Subgraph, run the following command:

```
graph init --studio <SUBGRAPH_SLUG>
```
> You can get your `SUBGRAPH_SLUG` from the Subgraph Studio

If you subgraph is successfully initialized, your terminal should look similar to this:
```
√ Protocol · ethereum
√ Subgraph slug · fordemo
√ Directory to create the subgraph in · fordemo
√ Ethereum network · sepolia
√ Contract address · 0xf7e903969E1269147aAfc8915f889B2D918D4bE4
√ Fetching ABI from Etherscan
√ Fetching Start Block
√ Fetching Contract Name
√ Start Block · 6378250
√ Contract Name · YourContract
√ Index contract events as entities (Y/n) · true
  Generate subgraph
  Write subgraph to directory
√ Create subgraph scaffold
√ Initialize networks config
√ Initialize subgraph repository
√ Install dependencies with yarn
√ Generate ABI and schema types with yarn codegen
Add another contract? (y/n):
Subgraph fordemo created in fordemo
```
> Enter the protocol and contract details according to your project.

## Step 4: Authenticate your Subgraph⚙️

Go to Subgraph Studio and copy your `Deploy key` from the `Dashboard`.

<img width="380" alt="image" src="https://github.com/user-attachments/assets/b36f7ff6-8f8b-450b-b886-dcd4ef5a7110">

After copying the `Deploy key`, run the following command to authenticate your subgraph:

```
graph auth --studio <DEPLOY_KEY>
```

Output should look like this:

```
Deploy key set for https://api.studio.thegraph.com/deploy/
```

## Step 5: Codegen && Build🏗

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
  Load contract ABI from abis\YourContract.json
- Load contract ABIs
√ Load contract ABIs
- Generate types for contract ABIs
  Generate types for contract ABI: YourContract (abis\YourContract.json)
- Generate types for contract ABIs
  Write types to generated\YourContract\YourContract.ts
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
  Compile data source: YourContract => build\YourContract\YourContract.wasm
- Compile subgraph
√ Compile subgraph
- Write compiled subgraph to build\
  Copy schema file build\schema.graphql
- Write compiled subgraph to build\
  Write subgraph file build\YourContract\abis\YourContract.json
- Write compiled subgraph to build\
  Write subgraph manifest build\subgraph.yaml
- Write compiled subgraph to build\
√ Write compiled subgraph to build\

Build completed: build\subgraph.yaml
```

## Step 6: Deploy your Subgraph🚀

Now the final step to deploy your subgraph to the Subgraph Studio is to run the command:

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
  Compile data source: YourContract => build\YourContract\YourContract.wasm
√ Compile subgraph
  Copy schema file build\schema.graphql
  Write subgraph file build\YourContract\abis\YourContract.json
  Write subgraph manifest build\subgraph.yaml
√ Write compiled subgraph to build\
  Add file to IPFS build\schema.graphql
                .. QmXv32EaV8GbZKWNjsfpKB6ZfVJGXv2dVfeYu3BgitncDM
  Add file to IPFS build\YourContract\abis\YourContract.json
                .. QmTBD9N3uBtQAXCk24mvMqoz1W9jeSA2Yd3iqsn6vr6DEj
  Add file to IPFS build\YourContract\YourContract.wasm
                .. QmVenAZgP8bCvWLKmGJzJNUMVfckHXs8gArKvdvFcyvm9L
√ Upload subgraph to IPFS

Build completed: QmbKWUzaEq3K2yiDpvowuKkWrpMyXcsfbEWQobY4QrvvAG

Deployed to https://thegraph.com/studio/subgraph/fordemo

Subgraph endpoints:
Queries (HTTP):     https://api.studio.thegraph.com/query/55877/fordemo/v0.0.1
```

You will receive an endpoint for your Subgraph. Head over to the Subgraph Studio and go to the `Playground`.

<img width="759" alt="image" src="https://github.com/user-attachments/assets/d8033b4a-3c07-4dfe-bfef-4f0c49c65998">

------

This marks the completion of the Subgraph deployment process✅

Find out more in The Graph documentation, [here](https://thegraph.com/docs/en/developing/creating-a-subgraph/).

Thank you!
