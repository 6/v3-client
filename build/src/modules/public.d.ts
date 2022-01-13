import { FastWithdrawalsResponseObject, CandleResolution, CandleResponseObject, ConfigResponseObject, Data, HistoricalFundingResponseObject, ISO8601, Market, MarketsResponseObject, MarketStatisticDay, MarketStatisticResponseObject, OrderbookResponseObject, Trade, TransferAsset, LeaderboardPnlSortBy, LeaderboardPnlPeriod, LeaderboardPnlResponseObject, PublicRetroactiveMiningRewardsResponseObject } from '../types';
export default class Public {
    readonly host: string;
    constructor(host: string);
    private get;
    protected put(requestPath: string, data: {}): Promise<Data>;
    /**
     * @description check if a user exists for an ethereum address
     *
     * @param ethereumAddress of the user
     */
    doesUserExistWithAddress(ethereumAddress: string): Promise<{
        exists: boolean;
    }>;
    /**
     * @description check if a username already exists
     *
     * @param username being queried
     */
    doesUserExistWithUsername(username: string): Promise<{
        exists: boolean;
    }>;
    /**
     * @description get market information for either all markets or a specific market
     *
     * @param market if only one market should be returned
     */
    getMarkets(market?: Market): Promise<{
        markets: MarketsResponseObject;
    }>;
    /**
     * @description get orderbook for a specific market
     *
     * @param market being queried
     */
    getOrderBook(market: Market): Promise<OrderbookResponseObject>;
    /**
     * @description get one or more market specific statistics for a time period
     *
     * @param {
     * @market being queried
     * @days if a specific time period statistic should be returned
     * }
     */
    getStats({ market, days, }: {
        market?: Market;
        days?: MarketStatisticDay;
    }): Promise<{
        markets: MarketStatisticResponseObject;
    }>;
    /**
     * @description get trades for a market up to a certain time
     *
     * @param market being checked
     * @param startingBeforeOrAt latest trade being returned
     */
    getTrades({ market, startingBeforeOrAt, }: {
        market: Market;
        startingBeforeOrAt?: ISO8601;
    }): Promise<{
        trades: Trade[];
    }>;
    /**
     * @description get historical funding rates for a market up to a certain time
     *
     * @param market being checked
     * @param effectiveBeforeOrAt latest historical funding rate being returned
     */
    getHistoricalFunding({ market, effectiveBeforeOrAt, }: {
        market: Market;
        effectiveBeforeOrAt?: ISO8601;
    }): Promise<{
        historicalFunding: HistoricalFundingResponseObject[];
    }>;
    /**
     * @description Get the amount of funds available for fast withdrawals, denominated in USDC.
     * To request a quote for a fast withdrawal, provide either a creditAmount or debitAmount (but
     * not both), and a creditAsset.
     *
     * @param creditAsset The asset to receive
     * @param creditAmount The amount to receive
     * @param debitAmount The amount of the collateral asset to transfer to the LP on layer-2
     */
    getFastWithdrawals({ creditAsset, creditAmount, debitAmount, }: {
        creditAsset?: TransferAsset;
        creditAmount?: string;
        debitAmount?: string;
    }): Promise<FastWithdrawalsResponseObject>;
    /**
     * @description get candles for a specific market
     *
     * @param market being checked
     * @param resolution Specific candle resolution being returned
     * @param fromISO is starting time candles are from
     * @param toISO is ending time candles go up to
     * @param limit to number of candles returned
     */
    getCandles({ market, resolution, fromISO, toISO, limit, }: {
        market: Market;
        resolution?: CandleResolution;
        fromISO?: ISO8601;
        toISO?: ISO8601;
        limit?: number;
    }): Promise<{
        candles: CandleResponseObject[];
    }>;
    /**
     * @description get leaderboard pnls
     *
     * @param period Time period being checked
     * @param sortBy Pnl to sort by
     * @param limit Number of leaderboard pnls returned
     */
    getLeaderboardPnls({ period, startingBeforeOrAt, sortBy, limit, }: {
        period: LeaderboardPnlPeriod;
        startingBeforeOrAt?: ISO8601;
        sortBy: LeaderboardPnlSortBy;
        limit?: number;
    }): Promise<LeaderboardPnlResponseObject>;
    /**
     * @description get retroactive mining rewards for an ethereum address
     *
     * @param ethereumAddress An Ethereum address of a user
     */
    getPublicRetroactiveMiningRewards(ethereumAddress: string): Promise<PublicRetroactiveMiningRewardsResponseObject>;
    /**
     * @description verify email for user with token
     *
     * @token that verifies user received a verification email to
     * the email they specified
     */
    verifyEmail(token: string): Promise<{}>;
    /**
     * @description get api server time as iso and as epoch in seconds with MS
     */
    getTime(): Promise<{
        iso: string;
        epoch: number;
    }>;
    /**
     * @description get a rough estimate of the difference (in epoch seconds) between the server time
     * and the system time.
     */
    getTimestampAdjustment(): Promise<number>;
    /**
     * @description  get global config variables for the exchange as a whole.
     * This includes (but is not limited to) details on the exchange, including addresses,
     * fees, transfers, and rate limits.
     */
    getConfig(): Promise<ConfigResponseObject>;
}