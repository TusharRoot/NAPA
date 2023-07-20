export type CreateNewTransactionResponse = {
    data: TransactionResponse;
    code: number;
    responseTime: string;
  };
  
  export type TransactionResponse = {
    rowId: string;
    transactionUUID: string;
    sellerWallet: string;
    buyerWallet: string;
    type: string;
    itemId: string;
    amount: string;
    currencyType: string;
    status: string;
    txId: string;
    contractAddress: string;
    tokenId: number;
    wallet: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type GetTransactionResponse = {
    data: TransactionResponse;
    code: number;
    responseTime: string;
  };
  
  export type NewTransaction = {
    sellerWallet: string;
    buyerWallet: string;
    type: string;
    itemId: string;
    amount: string;
    currencyType: string;
    status: string;
    txId: string;
    contractAddress: string;
    tokenId: number;
    wallet: string;
    profileId: string;
    owner: string
  };
  