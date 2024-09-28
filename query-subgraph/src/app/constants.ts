export const queries = [
  {
    queryName: "depositCompleteds",
    query: `
    query MyQuery {
        depositCompleteds(first: 10) {
          amount
          blockNumber
          blockTimestamp
          id
          sender
          token
          transactionHash
        }
      }
    `,
  },
  {
    queryName: "ownershipTransferreds",
    query: `
    query MyQuery {
        ownershipTransferreds(first: 10) {
          blockNumber
          blockTimestamp
          currentOwner
          id
          newOwner
          transactionHash
          transferredTimestamp
        }
      }
    `,
  },
  {
    queryName: "withdrawCompleteds",
    query: `
    query MyQuery {
        withdrawCompleteds(first: 10) {
          amount
          beneficiary
          blockNumber
          blockTimestamp
          id
          token
          transactionHash
        }
      }
    `,
  },
];

export const depositCompletedsQuery = {
  queryName: "depositCompleteds",
  query: `
  query MyQuery {
      depositCompleteds(first: 10) {
        amount
        blockNumber
        blockTimestamp
        id
        sender
        token
        transactionHash
      }
    }
  `,
};

export const ownershipTransferredsQuery = {
  queryName: "ownershipTransferreds",
  query: `
  query MyQuery {
      ownershipTransferreds(first: 10) {
        blockNumber
        blockTimestamp
        currentOwner
        id
        newOwner
        transactionHash
        transferredTimestamp
      }
    }
  `,
};

export const withdrawCompletedsQuery = {
  queryName: "withdrawCompleteds",
  query: `
  query MyQuery {
      withdrawCompleteds(first: 10) {
        amount
        beneficiary
        blockNumber
        blockTimestamp
        id
        token
        transactionHash
      }
    }
  `,
};
