import { DydxAsset, DydxMarket, StarkwareOrderSide } from '@dydxprotocol/starkex-lib';
import BigNumber from 'bignumber.js';
import { HttpProvider, IpcProvider, WebsocketProvider } from 'web3-core';
export { Account as EthereumAccount } from 'web3-core';
export declare type ISO8601 = string;
export declare type ISO31661ALPHA2 = string;
export declare type Address = string;
export declare type Integer = BigNumber;
export declare type Provider = HttpProvider | IpcProvider | WebsocketProvider;
export declare type PositionsMap = {
    [market: string]: PositionResponseObject;
};
export declare type GenericParams = {
    [name: string]: any;
};
export declare type Data = any;
export { SendOptions as EthereumSendOptions } from '@dydxprotocol/starkex-eth';
export interface ApiKeyCredentials {
    key: string;
    secret: string;
    passphrase: string;
}
export declare type Market = DydxMarket;
export declare const Market: typeof DydxMarket;
export declare type Asset = DydxAsset;
export declare const Asset: typeof DydxAsset;
export declare type OrderSide = StarkwareOrderSide;
export declare const OrderSide: typeof StarkwareOrderSide;
export declare enum TransferAsset {
    USDC = "USDC"
}
export declare enum MarketStatisticDay {
    ONE = "1",
    SEVEN = "7",
    THIRTY = "30"
}
export declare enum CandleResolution {
    ONE_DAY = "1DAY",
    FOUR_HOURS = "4HOURS",
    ONE_HOUR = "1HOUR",
    THIRTY_MINS = "30MINS",
    FIFTEEN_MINS = "15MINS",
    FIVE_MINS = "5MINS",
    ONE_MIN = "1MIN"
}
export declare enum OrderType {
    LIMIT = "LIMIT",
    MARKET = "MARKET",
    STOP_LIMIT = "STOP_LIMIT",
    TRAILING_STOP = "TRAILING_STOP",
    TAKE_PROFIT = "TAKE_PROFIT"
}
export declare enum TimeInForce {
    GTT = "GTT",
    FOK = "FOK",
    IOC = "IOC"
}
export declare enum PositionStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    LIQUIDATED = "LIQUIDATED"
}
export declare enum OrderStatus {
    PENDING = "PENDING",
    OPEN = "OPEN",
    FILLED = "FILLED",
    CANCELED = "CANCELED",
    UNTRIGGERED = "UNTRIGGERED"
}
export declare enum AccountAction {
    DEPOSIT = "DEPOSIT",
    WITHDRAWAL = "WITHDRAWAL"
}
export declare enum SigningMethod {
    Compatibility = "Compatibility",
    UnsafeHash = "UnsafeHash",
    Hash = "Hash",
    TypedData = "TypedData",
    MetaMask = "MetaMask",
    MetaMaskLatest = "MetaMaskLatest",
    CoinbaseWallet = "CoinbaseWallet",
    Personal = "Personal"
}
export declare enum SignatureTypes {
    NO_PREPEND = 0,
    DECIMAL = 1,
    HEXADECIMAL = 2,
    PERSONAL = 3
}
export declare enum LeaderboardPnlPeriod {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    ALL_TIME = "ALL_TIME",
    COMPETITION = "COMPETITION"
}
export declare enum LeaderboardPnlSortBy {
    ABSOLUTE = "ABSOLUTE",
    PERCENT = "PERCENT"
}
interface ApiStarkwareSigned {
    signature: string;
    expiration: string;
}
export interface ApiOrder extends ApiStarkwareSigned {
    market: Market;
    side: OrderSide;
    type: OrderType;
    size: string;
    price: string;
    clientId: string;
    timeInForce: TimeInForce;
    postOnly: boolean;
    limitFee: string;
    cancelId?: string;
    triggerPrice?: string;
    trailingPercent?: string;
}
export interface ApiWithdrawal extends ApiStarkwareSigned {
    amount: string;
    asset: Asset;
    clientId: string;
}
export interface ApiTransfer extends ApiStarkwareSigned {
    amount: string;
    clientId: string;
    receiverAccountId: string;
}
export interface TransferParams extends ApiStarkwareSigned {
    amount: string;
    clientId: string;
    receiverAccountId: string;
    receiverPublicKey: string;
    receiverPositionId: string;
}
export interface ApiFastWithdrawal extends ApiStarkwareSigned {
    creditAsset: TransferAsset;
    creditAmount: string;
    debitAmount: string;
    toAddress: string;
    lpPositionId: string;
    clientId: string;
}
export interface ApiFastWithdrawalParams extends ApiFastWithdrawal {
    lpStarkKey: string;
}
export interface MarketResponseObject {
    market: Market;
    status: MarketStatus;
    baseAsset: Asset;
    quoteAsset: Asset;
    tickSize: string;
    indexPrice: string;
    oraclePrice: string;
    nextFundingRate: string;
    nextFundingAt: ISO8601;
    minOrderSize: string;
    type: string;
    initialMarginFraction: string;
    maintenanceMarginFraction: string;
    stepSize: string;
    priceChange24H: string;
    volume24H: string;
    trades24H: string;
    openInterest: string;
    incrementalInitialMarginFraction: string;
    baselinePositionSize: string;
    incrementalPositionSize: string;
    maxPositionSize: string;
    assetResolution: string;
    syntheticAssetId: string;
}
export interface MarketsResponseObject {
    [market: string]: MarketResponseObject;
}
export interface MarketStatisticResponseObject {
    market: Market;
    open: string;
    high: string;
    low: string;
    close: string;
    baseVolume: string;
    quoteVolume: string;
    type: string;
    fees: string;
}
export interface OrderResponseObject {
    id: string;
    clientId?: string;
    accountId: string;
    market: Market;
    side: OrderSide;
    price: string;
    triggerPrice?: string | null;
    trailingPercent?: string | null;
    size: string;
    remainingSize: string;
    type: OrderType;
    createdAt: ISO8601;
    unfillableAt?: ISO8601 | null;
    expiresAt?: ISO8601;
    status: OrderStatus;
    timeInForce: TimeInForce;
    postOnly: boolean;
    cancelReason?: string | null;
}
export interface ActiveOrderResponseObject {
    id: string;
    accountId: string;
    remainingSize: string;
    price: string;
    market: Market;
    side: OrderSide;
}
export interface PositionResponseObject {
    market: Market;
    status: PositionStatus;
    side: string;
    size: string;
    maxSize: string;
    entryPrice: string;
    exitPrice?: string;
    unrealizedPnl: string;
    realizedPnl?: string;
    createdAt: ISO8601;
    closedAt?: ISO8601;
    sumOpen?: string;
    sumClose?: string;
    netFunding?: string;
}
export interface FillResponseObject {
    id: string;
    side: OrderSide;
    liquidity: string;
    type: OrderType;
    market: Market;
    price: string;
    size: string;
    fee: string;
    createdAt: ISO8601;
    orderId: string | null | undefined;
}
export interface UserResponseObject {
    ethereumAddress: string;
    isRegistered: boolean;
    email: string | null;
    username: string | null;
    userData: {};
    makerFeeRate: string | null;
    takerFeeRate: string | null;
    makerVolume30D: string | null;
    takerVolume30D: string | null;
    fees30D: string | null;
    referredByAffiliateLink: string | null;
    isSharingUsername: boolean | null;
    isSharingAddress: boolean | null;
    dydxTokenBalance: string;
    stakedDydxTokenBalance: string;
    isEmailVerified: boolean;
    country: ISO31661ALPHA2 | null;
}
export interface AccountResponseObject {
    starkKey: string;
    positionId: string;
    equity: string;
    freeCollateral: string;
    pendingDeposits: string;
    pendingWithdrawals: string;
    openPositions: PositionsMap;
    accountNumber: string;
    id: string;
    quoteBalance: string;
}
export interface TransferResponseObject {
    id: string;
    type: string;
    debitAsset: Asset;
    creditAsset: Asset;
    debitAmount: string;
    creditAmount: string;
    transactionHash?: string;
    status: string;
    createdAt: ISO8601;
    confirmedAt?: ISO8601;
    clientId?: string;
    fromAddress?: string;
    toAddress?: string;
}
export interface FundingResponseObject {
    market: Market;
    payment: string;
    rate: string;
    positionSize: string;
    price: string;
    effectiveAt: ISO8601;
}
export interface HistoricalFundingResponseObject {
    market: Market;
    rate: string;
    price: string;
    effectiveAt: ISO8601;
}
export interface HistoricalPnlResponseObject {
    equity: string;
    totalPnl: string;
    createdAt: ISO8601;
    netTransfers: string;
    accountId: string;
}
export interface OrderbookResponseOrder {
    price: string;
    size: string;
}
export interface OrderbookResponseObject {
    bids: OrderbookResponseOrder[];
    asks: OrderbookResponseOrder[];
}
export interface CandleResponseObject {
    startedAt: ISO8601;
    updatedAt: ISO8601;
    market: Market;
    resolution: CandleResolution;
    low: string;
    high: string;
    open: string;
    close: string;
    baseTokenVolume: string;
    trades: string;
    usdVolume: string;
    startingOpenInterest: string;
}
export interface ConfigResponseObject {
    collateralAssetId: string;
    collateralTokenAddress: string;
    defaultMakerFee: string;
    defaultTakerFee: string;
    exchangeAddress: string;
    maxExpectedBatchLengthMinutes: string;
    maxFastWithdrawalAmount: string;
    cancelOrderRateLimiting: CancelOrderRateLimiting;
    placeOrderRateLimiting: PlaceOrderRateLimiting;
}
export interface CancelOrderRateLimiting {
    maxPointsMulti: number;
    maxPointsSingle: number;
    windowSecMulti: number;
    windowSecSingle: number;
}
export interface PlaceOrderRateLimiting {
    maxPoints: number;
    windowSec: number;
    targetNotional: number;
    minLimitConsumption: number;
    minMarketConsumption: number;
    minTriggerableConsumption: number;
    maxOrderConsumption: number;
}
export interface FastWithdrawalsResponseObject {
    liquidityProviders: {
        [lpPositionId: number]: LiquidityProviderInfo;
    };
}
export interface LeaderboardPnlResponseObject {
    topPnls: LeaderboardPnl[];
    startedAt: ISO8601 | null;
    endsAt: ISO8601 | null;
    updatedAt: ISO8601;
}
export interface LeaderboardPnl {
    username: string;
    ethereumAddress: string | null;
    absolutePnl: string;
    percentPnl: string;
    absoluteRank: number | null;
    percentRank: number | null;
}
export interface AccountLeaderboardPnlResponseObject {
    absolutePnl: string;
    percentPnl: string;
    absoluteRank: number | null;
    percentRank: number | null;
    updatedAt: ISO8601 | null;
    startedAt: ISO8601 | null;
    endsAt: ISO8601 | null;
    accountId: string;
}
export interface LiquidityProviderInfo {
    availableFunds: string;
    starkKey: string;
    quote: LiquidityProviderQuote | null;
}
export interface LiquidityProviderQuote {
    creditAsset: TransferAsset;
    creditAmount: string;
    debitAmount: string;
}
export interface Trade {
    side: OrderSide;
    size: string;
    price: string;
    createdAt: ISO8601;
}
export interface TradingRewardsResponseObject {
    epoch: number;
    epochStart: ISO8601;
    epochEnd: ISO8601;
    fees: Fees;
    openInterest: OpenInterest;
    weight: Weight;
    stakedDYDX: StakedDYDXIncludingFloor;
    totalRewards: string;
    estimatedRewards: string;
}
export interface Fees {
    feesPaid: string;
    totalFeesPaid: string;
}
export interface OpenInterest {
    averageOpenInterest: string;
    totalAverageOpenInterest: string;
}
export interface Weight {
    weight: string;
    totalWeight: string;
}
export interface StakedDYDX {
    averageStakedDYDX: string;
    totalAverageStakedDYDX: string;
}
export interface StakedDYDXIncludingFloor extends StakedDYDX {
    averageStakedDYDXWithFloor: string;
}
export interface LiquidityProviderRewardsResponseObject {
    epoch: number;
    epochStart: ISO8601;
    epochEnd: ISO8601;
    markets: {
        [market: string]: LiquidityRewards;
    };
    stakedDYDX: StakedDYDX;
}
export interface LiquidityRewards {
    market: Market;
    uptime: string;
    score: string;
    totalScore: string;
    totalRewards: string;
    estimatedRewards: string;
}
export interface RetroactiveMiningRewardsResponseObject {
    epoch: number;
    epochStart: ISO8601;
    epochEnd: ISO8601;
    retroactiveMining: RetroactiveMiningRewards;
    estimatedRewards: string;
}
export interface RetroactiveMiningRewards {
    allocation: string;
    targetVolume: string;
    volume: string;
}
export interface PublicRetroactiveMiningRewardsResponseObject {
    allocation: string;
    targetVolume: string;
}
declare enum MarketStatus {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    POST_ONLY = "POST_ONLY",
    CANCEL_ONLY = "CANCEL_ONLY",
    INITIALIZING = "INITIALIZING"
}
export declare enum OnboardingActionString {
    ONBOARDING = "dYdX Onboarding",
    KEY_DERIVATION = "dYdX STARK Key"
}
export interface OnboardingAction {
    action: OnboardingActionString;
    onlySignOn?: 'https://trade.dydx.exchange';
}
export interface EthPrivateAction {
    method: string;
    requestPath: string;
    body: string;
    timestamp: string;
}
export declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;