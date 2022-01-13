"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_helpers_1 = require("../helpers/request-helpers");
const axios_1 = require("../lib/axios");
class Public {
    constructor(host) {
        this.host = host;
    }
    // ============ Request Helpers ============
    get(requestPath, params) {
        return axios_1.axiosRequest({
            method: 'GET',
            url: `${this.host}/v3/${request_helpers_1.generateQueryPath(requestPath, params)}`,
        });
    }
    async put(requestPath, data) {
        return axios_1.axiosRequest({
            url: `${this.host}/v3/${requestPath}`,
            method: 'PUT',
            data,
        });
    }
    // ============ Requests ============
    /**
     * @description check if a user exists for an ethereum address
     *
     * @param ethereumAddress of the user
     */
    doesUserExistWithAddress(ethereumAddress) {
        const uri = 'users/exists';
        return this.get(uri, { ethereumAddress });
    }
    /**
     * @description check if a username already exists
     *
     * @param username being queried
     */
    doesUserExistWithUsername(username) {
        const uri = 'usernames';
        return this.get(uri, { username });
    }
    /**
     * @description get market information for either all markets or a specific market
     *
     * @param market if only one market should be returned
     */
    getMarkets(market) {
        const uri = 'markets';
        return this.get(uri, { market });
    }
    /**
     * @description get orderbook for a specific market
     *
     * @param market being queried
     */
    getOrderBook(market) {
        return this.get(`orderbook/${market}`, {});
    }
    /**
     * @description get one or more market specific statistics for a time period
     *
     * @param {
     * @market being queried
     * @days if a specific time period statistic should be returned
     * }
     */
    getStats({ market, days, }) {
        const uri = market !== undefined
            ? `stats/${market}`
            : 'stats';
        return this.get(uri, { days });
    }
    /**
     * @description get trades for a market up to a certain time
     *
     * @param market being checked
     * @param startingBeforeOrAt latest trade being returned
     */
    getTrades({ market, startingBeforeOrAt, }) {
        const uri = `trades/${market}`;
        return this.get(uri, { startingBeforeOrAt });
    }
    /**
     * @description get historical funding rates for a market up to a certain time
     *
     * @param market being checked
     * @param effectiveBeforeOrAt latest historical funding rate being returned
     */
    getHistoricalFunding({ market, effectiveBeforeOrAt, }) {
        const uri = `historical-funding/${market}`;
        return this.get(uri, { effectiveBeforeOrAt });
    }
    /**
     * @description Get the amount of funds available for fast withdrawals, denominated in USDC.
     * To request a quote for a fast withdrawal, provide either a creditAmount or debitAmount (but
     * not both), and a creditAsset.
     *
     * @param creditAsset The asset to receive
     * @param creditAmount The amount to receive
     * @param debitAmount The amount of the collateral asset to transfer to the LP on layer-2
     */
    getFastWithdrawals({ creditAsset, creditAmount, debitAmount, }) {
        return this.get('fast-withdrawals', { creditAsset, creditAmount, debitAmount });
    }
    /**
     * @description get candles for a specific market
     *
     * @param market being checked
     * @param resolution Specific candle resolution being returned
     * @param fromISO is starting time candles are from
     * @param toISO is ending time candles go up to
     * @param limit to number of candles returned
     */
    getCandles({ market, resolution, fromISO, toISO, limit, }) {
        const uri = `candles/${market}`;
        return this.get(uri, {
            resolution,
            fromISO,
            toISO,
            limit,
        });
    }
    /**
     * @description get leaderboard pnls
     *
     * @param period Time period being checked
     * @param sortBy Pnl to sort by
     * @param limit Number of leaderboard pnls returned
     */
    getLeaderboardPnls({ period, startingBeforeOrAt, sortBy, limit, }) {
        const uri = 'leaderboard-pnl';
        return this.get(uri, {
            period,
            startingBeforeOrAt,
            sortBy,
            limit,
        });
    }
    /**
     * @description get retroactive mining rewards for an ethereum address
     *
     * @param ethereumAddress An Ethereum address of a user
     */
    getPublicRetroactiveMiningRewards(ethereumAddress) {
        const uri = 'rewards/public-retroactive-mining';
        return this.get(uri, {
            ethereumAddress,
        });
    }
    /**
     * @description verify email for user with token
     *
     * @token that verifies user received a verification email to
     * the email they specified
     */
    async verifyEmail(token) {
        return this.put('emails/verify-email', {
            token,
        });
    }
    /**
     * @description get api server time as iso and as epoch in seconds with MS
     */
    getTime() {
        return this.get('time', {});
    }
    /**
     * @description get a rough estimate of the difference (in epoch seconds) between the server time
     * and the system time.
     */
    async getTimestampAdjustment() {
        const time1 = Date.now();
        const { epoch } = await this.getTime();
        const time2 = Date.now();
        const averageEpoch = (time1 + time2) / 2 / 1000;
        return epoch - averageEpoch;
    }
    /**
     * @description  get global config variables for the exchange as a whole.
     * This includes (but is not limited to) details on the exchange, including addresses,
     * fees, transfers, and rate limits.
     */
    async getConfig() {
        return this.get('config', {});
    }
}
exports.default = Public;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvcHVibGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0VBQStEO0FBQy9ELHdDQUE0QztBQXNCNUMsTUFBcUIsTUFBTTtJQUd6QixZQUFZLElBQVk7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELDRDQUE0QztJQUVwQyxHQUFHLENBQ1QsV0FBbUIsRUFDbkIsTUFBVTtRQUVWLE9BQU8sb0JBQVksQ0FBQztZQUNsQixNQUFNLEVBQUUsS0FBSztZQUNiLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLE9BQU8sbUNBQWlCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ2pFLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxLQUFLLENBQUMsR0FBRyxDQUNqQixXQUFtQixFQUNuQixJQUFRO1FBRVIsT0FBTyxvQkFBWSxDQUFDO1lBQ2xCLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLE9BQU8sV0FBVyxFQUFFO1lBQ3JDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSTtTQUNMLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQ0FBcUM7SUFFckM7Ozs7T0FJRztJQUNILHdCQUF3QixDQUN0QixlQUF1QjtRQUV2QixNQUFNLEdBQUcsR0FBVyxjQUFjLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx5QkFBeUIsQ0FDdkIsUUFBZ0I7UUFFaEIsTUFBTSxHQUFHLEdBQVcsV0FBVyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7OztPQUlH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