export type transactionType = {
    response: any,
    transactionHash: string | number
}

export type TallowanceAndBalance = {
    allowance: string | number,
    balance: string | number
}

export interface marketIitem {
    itemId?: number;
    nftContract?: string;
    tokenId?: number;
    seller?: string;
    owner?: string;
    price?: number;
    paymentMode?: number;
    isCobatchable?: boolean;
    sold?: boolean;
}
export interface ITransaction {
    address:string;
    _open:boolean;
    transaction:Promise<void>;
}