import { StarkwareLib } from '@dydxprotocol/starkex-eth';
import { KeyPair } from '@dydxprotocol/starkex-lib';
import { RequestMethod } from '../lib/axios';
import { AccountAction, AccountLeaderboardPnlResponseObject, AccountResponseObject, ApiFastWithdrawalParams, ApiKeyCredentials, ApiOrder, ApiWithdrawal, Data, FillResponseObject, FundingResponseObject, GenericParams, HistoricalPnlResponseObject, ISO8601, ISO31661ALPHA2, LeaderboardPnlPeriod, LiquidityProviderRewardsResponseObject, Market, OrderResponseObject, OrderSide, OrderStatus, OrderType, PartialBy, PositionResponseObject, PositionStatus, RetroactiveMiningRewardsResponseObject, TradingRewardsResponseObject, TransferParams, TransferResponseObject, UserResponseObject, ActiveOrderResponseObject } from '../types';
import Clock from './clock';
export default class Private {
    readonly host: string;
    readonly apiKeyCredentials: ApiKeyCredentials;
    readonly networkId: number;
    readonly starkLib: StarkwareLib;
    readonly starkKeyPair?: KeyPair;
    readonly clock: Clock;
    constructor({ host, apiKeyCredentials, starkPrivateKey, networkId, clock, }: {
        host: string;
        apiKeyCredentials: ApiKeyCredentials;
        networkId: number;
        starkPrivateKey?: string | KeyPair;
        clock: Clock;
    });
    protected request(method: RequestMethod, endpoint: string, data?: {}): Promise<Data>;
    protected _get(endpoint: string, params: {}): Promise<Data>;
    protected post(endpoint: string, data: {}): Promise<Data>;
    protected put(endpoint: string, data: {}): Promise<Data>;
    protected delete(endpoint: string, params: {}): Promise<Data>;
    get(endpoint: string, params: {}): Promise<Data>;
    /**
     * @description get a signature for the ethereumAddress if registered
     */
    getRegistration(genericParams?: GenericParams): Promise<{
        signature: string;
    }>;
    /**
     * @description get the user associated with the ethereumAddress
     */
    getUser(genericParams?: GenericParams): Promise<{
        user: UserResponseObject;
    }>;
    /**
     * @description update information for the user
     *
     * @param {
     * @userData specifiying information about the user
     * @email associated with the user
     * @username for the user
     * @isSharingUsername if the user wants their username publicly shared
     * @isSharingAddress if the user wants their ethereumAddress publicly shared
     * @country for the user (ISO 3166-1 Alpha-2 Compliant)
     * }
     */
    updateUser({ userData, email, username, isSharingUsername, isSharingAddress, country, }: {
        userData: {};
        email?: string | null;
        username?: string;
        isSharingUsername?: boolean;
        isSharingAddress?: boolean;
        country?: ISO31661ALPHA2;
    }): Promise<{
        user: UserResponseObject;
    }>;
    /**
     * @description create an account for an ethereumAddress
     *
     * @param starkKey for the account that will be used as the public key in starkwareEx-Lib requests
     * going forward for this account.
     * @param starkKeyYCoordinate for the account that will be used as the Y coordinate for the public
     * key in starkwareEx-Lib requests going forward for this account.
     */
    createAccount(starkKey: string, starkKeyYCoordinate: string): Promise<{
        account: AccountResponseObject;
    }>;
    /**
     * @description get account associated with an ethereumAddress and accountNumber 0
     *
     * @param ethereumAddress the account is associated with
     */
    getAccount(ethereumAddress: string, genericParams?: GenericParams): Promise<{
        account: AccountResponseObject;
    }>;
    /**
     * @description get all accounts associated with an ethereumAddress
     */
    getAccounts(genericParams?: GenericParams): Promise<{
        accounts: AccountResponseObject[];
    }>;
    /**
     * @description get leaderboard pnl for period and accountNumber 0
     *
     * @param period the period of pnls to retrieve
     */
    getAccountLeaderboardPnl(period: LeaderboardPnlPeriod, params: {
        startedBeforeOrAt?: ISO8601;
    }, genericParams?: GenericParams): Promise<{
        leaderboardPnl: AccountLeaderboardPnlResponseObject;
    }>;
    /**
     * @description get all positions for an account, meeting query parameters
     *
     * @param {
     * @market the positions are for
     * @status of the positions
     * @limit to the number of positions returned
     * @createdBeforeOrAt latest the positions could have been created
     * }
     */
    getPositions(params: {
        market?: Market;
        status?: PositionStatus;
        limit?: number;
        createdBeforeOrAt?: ISO8601;
    }, genericParams?: GenericParams): Promise<{
        positions: PositionResponseObject[];
    }>;
    /**
     * @description get orders for a user by a set of query parameters
     *
     * @param {
     * @market the orders are for
     * @status the orders have
     * @side of the book the orders are on
     * @type of order
     * @limit to the number of orders returned
     * @createdBeforeOrAt sets the time of the last fill that will be received
     * @returnLatestOrders returns the latest orders instead of the oldest and the order is
     * from most recent to least recent (up to limit)
     * }
     */
    getOrders(params?: {
        market?: Market;
        status?: OrderStatus;
        side?: OrderSide;
        type?: OrderType;
        limit?: number;
        createdBeforeOrAt?: ISO8601;
        returnLatestOrders?: boolean;
    }, genericParams?: GenericParams): Promise<{
        orders: OrderResponseObject[];
    }>;
    /**
     * @description get active orders (PENDING, OPEN, UNTRIGGERED) for a user by a set of query
     * parameters - if id is included then side is required
     *
     * @param {
     * @market the orders are for
     * @side of the book the orders are on
     * @id of the order
     * }
     */
    getActiveOrders(market: Market, side?: OrderSide, id?: string, genericParams?: GenericParams): Promise<{
        orders: ActiveOrderResponseObject[];
    }>;
    /**
     * @description get an order by a unique id
     *
     * @param orderId of the order
     */
    getOrderById(orderId: string, genericParams?: GenericParams): Promise<{
        order: OrderResponseObject;
    }>;
    /**
     * @description get an order by a clientId
     *
     * @param clientId of the order
     */
    getOrderByClientId(clientId: string, genericParams?: GenericParams): Promise<{
        order: OrderResponseObject;
    }>;
    /**
     *@description place a new order
     *
     * @param {
     * @market of the order
     * @side of the order
     * @type of the order
     * @timeInForce of the order
     * @postOnly of the order
     * @size of the order
     * @price of the order
     * @limitFee of the order
     * @expiration of the order
     * @cancelId if the order is replacing an existing one
     * @triggerPrice of the order if the order is a triggerable order
     * @trailingPercent of the order if the order is a trailing stop order
     * }
     * @param positionId associated with the order
     */
    createOrder(params: PartialBy<ApiOrder, 'clientId' | 'signature'>, positionId: string): Promise<{
        order: OrderResponseObject;
    }>;
    /**
     * @description cancel a specific order for a user by the order's unique id
     *
     * @param orderId of the order being canceled
     */
    cancelOrder(orderId: string): Promise<{
        cancelOrder: OrderResponseObject;
    }>;
    /**
     * @description cancel all orders for a user for a specific market
     *
     * @param market of the orders being canceled
     */
    cancelAllOrders(market?: Market): Promise<{
        cancelOrders: OrderResponseObject[];
    }>;
    /**
     * @description cancel active orders (PENDING, OPEN, UNTRIGGERED) for a user by a set of query
     * parameters - if id is included then side is required
     *
     * @param {
     * @market the orders are for
     * @side of the book the orders are on
     * @id of the order
     * }
     */
    cancelActiveOrders(market: Market, side?: OrderSide, id?: string, genericParams?: GenericParams): Promise<{
        cancelOrders: ActiveOrderResponseObject[];
    }>;
    /**
     *@description get fills for a user by a set of query parameters
     *
     * @param {
     * @market the fills are for
     * @orderId associated with the fills
     * @limit to the number of fills returned
     * @createdBeforeOrAt sets the time of the last fill that will be received
     * }
     */
    getFills(params: {
        market?: Market;
        orderId?: string;
        limit?: number;
        createdBeforeOrAt?: ISO8601;
    }, genericParams?: GenericParams): Promise<{
        fills: FillResponseObject[];
    }>;
    /**
     * @description get transfers for a user by a set of query parameters
     *
     * @param {
     * @type of transfer
     * @limit to the number of transfers returned
     * @createdBeforeOrAt sets the time of the last transfer that will be received
     * }
     */
    getTransfers(params?: {
        type?: AccountAction;
        limit?: number;
        createdBeforeOrAt?: ISO8601;
    }, genericParams?: GenericParams): Promise<{
        transfers: TransferResponseObject[];
    }>;
    /**
     * @description post a new withdrawal
     *
     * @param {
     * @amount specifies the size of the withdrawal
     * @asset specifies the asset being withdrawn
     * @clientId specifies the clientId for the address
     * }
     * @param positionId specifies the associated position for the transfer
     */
    createWithdrawal(params: PartialBy<ApiWithdrawal, 'clientId' | 'signature'>, positionId: string): Promise<{
        withdrawal: TransferResponseObject;
    }>;
    /**
     * @description post a new fast-withdrawal
     *
     * @param {
      * @creditAmount specifies the size of the withdrawal
      * @debitAmount specifies the amount to be debited
      * @creditAsset specifies the asset being withdrawn
      * @toAddress is the address being withdrawn to
      * @lpPositionId is the LP positionId for the fast withdrawal
      * @clientId specifies the clientId for the address
      * @signature starkware specific signature for fast-withdrawal
      * }
      */
    createFastWithdrawal({ lpStarkKey, ...params }: PartialBy<ApiFastWithdrawalParams, 'clientId' | 'signature'>, positionId: string): Promise<{
        withdrawal: TransferResponseObject;
    }>;
    /**
       * @description post a new transfer
       *
       * @param {
        * @amount specifies the size of the transfer
        * @receiverAccountId specifies the receiver account id
        * @receiverPublicKey specifies the receiver public key
        * @receiverPositionId specifies the receiver position id
        * @clientId specifies the clientId for the address
        * @signature starkware specific signature for the transfer
        * }
        * @param positionId specifies the associated position for the transfer
        */
    createTransfer(params: PartialBy<TransferParams, 'clientId' | 'signature'>, positionId: string): Promise<{
        transfer: TransferResponseObject;
    }>;
    /**
     * @description get a user's funding payments by a set of query parameters
     *
     * @param {
     * @market the funding payments are for
     * @limit to the number of funding payments returned
     * @effectiveBeforeOrAt sets the latest funding payment received
     * }
     */
    getFundingPayments(params: {
        market?: Market;
        limit?: number;
        effectiveBeforeOrAt?: ISO8601;
    }, genericParams?: GenericParams): Promise<{
        fundingPayments: FundingResponseObject;
    }>;
    /**
     * @description get historical pnl ticks for an account between certain times
     *
     * @param {
     * @createdBeforeOrAt latest historical pnl tick being returned
     * @createdOnOrAfter earliest historical pnl tick being returned
     * }
     */
    getHistoricalPnl(params: {
        createdBeforeOrAt?: ISO8601;
        createdOnOrAfter?: ISO8601;
    }, genericParams?: GenericParams): Promise<{
        historicalPnl: HistoricalPnlResponseObject[];
    }>;
    /**
     * @description get trading rewards for a user for a given epoch
     *
     * @param {
     * @epoch to request rewards data for (optional)
     * }
     */
    getTradingRewards(params: {
        epoch?: number;
    }, genericParams?: GenericParams): Promise<{
        tradingRewards: TradingRewardsResponseObject;
    }>;
    /**
     * @description get liquidity provider rewards for a user for a given epoch
     *
     * @param {
     * @epoch to request rewards data for (optional)
     * }
     */
    getLiquidityProviderRewards(params: {
        epoch?: number;
    }, genericParams?: GenericParams): Promise<{
        liquidityRewards: LiquidityProviderRewardsResponseObject;
    }>;
    /**
     * @description get retroactive mining rewards for a user for a given epoch
     *
     */
    getRetroactiveMiningRewards(genericParams?: GenericParams): Promise<{
        retroactiveMiningRewards: RetroactiveMiningRewardsResponseObject;
    }>;
    /**
     * @description get the key ids associated with an ethereumAddress
     *
     */
    getApiKeys(genericParams?: GenericParams): Promise<{
        apiKeys: {
            key: string;
        }[];
    }>;
    /**
     * @description send verification email to email specified by User
     */
    sendVerificationEmail(): Promise<{}>;
    /**
     * @description requests tokens on dYdX's staging server.
     * NOTE: this will not work on Mainnet/Production.
     */
    requestTestnetTokens(): Promise<{
        transfer: TransferResponseObject;
    }>;
    sign({ requestPath, method, isoTimestamp, data, }: {
        requestPath: string;
        method: RequestMethod;
        isoTimestamp: ISO8601;
        data?: {};
    }): string;
}
