"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const starkex_eth_1 = require("@dydxprotocol/starkex-eth");
const starkex_lib_1 = require("@dydxprotocol/starkex-lib");
const lodash_1 = __importDefault(require("lodash"));
const request_helpers_1 = require("../helpers/request-helpers");
const axios_1 = require("../lib/axios");
const db_1 = require("../lib/db");
// TODO: Figure out if we can get rid of this.
const METHOD_ENUM_MAP = {
    [axios_1.RequestMethod.DELETE]: starkex_lib_1.ApiMethod.DELETE,
    [axios_1.RequestMethod.GET]: starkex_lib_1.ApiMethod.GET,
    [axios_1.RequestMethod.POST]: starkex_lib_1.ApiMethod.POST,
    [axios_1.RequestMethod.PUT]: starkex_lib_1.ApiMethod.PUT,
};
const collateralTokenDecimals = 6;
class Private {
    constructor({ host, apiKeyCredentials, starkPrivateKey, networkId, clock, }) {
        this.host = host;
        this.apiKeyCredentials = apiKeyCredentials;
        this.networkId = networkId;
        this.starkLib = new starkex_eth_1.StarkwareLib({}, networkId);
        if (starkPrivateKey) {
            this.starkKeyPair = starkex_lib_1.asSimpleKeyPair(starkex_lib_1.asEcKeyPair(starkPrivateKey));
        }
        this.clock = clock;
    }
    // ============ Request Helpers ============
    async request(method, endpoint, data) {
        const requestPath = `/v3/${endpoint}`;
        const isoTimestamp = this.clock.getAdjustedIsoString();
        const headers = {
            'DYDX-SIGNATURE': this.sign({
                requestPath,
                method,
                isoTimestamp,
                data,
            }),
            'DYDX-API-KEY': this.apiKeyCredentials.key,
            'DYDX-TIMESTAMP': isoTimestamp,
            'DYDX-PASSPHRASE': this.apiKeyCredentials.passphrase,
        };
        return axios_1.axiosRequest({
            url: `${this.host}${requestPath}`,
            method,
            data,
            headers,
        });
    }
    async _get(endpoint, params) {
        return this.request(axios_1.RequestMethod.GET, request_helpers_1.generateQueryPath(endpoint, params));
    }
    async post(endpoint, data) {
        return this.request(axios_1.RequestMethod.POST, endpoint, data);
    }
    async put(endpoint, data) {
        return this.request(axios_1.RequestMethod.PUT, endpoint, data);
    }
    async delete(endpoint, params) {
        return this.request(axios_1.RequestMethod.DELETE, request_helpers_1.generateQueryPath(endpoint, params));
    }
    // ============ Requests ============
    async get(endpoint, params) {
        return this._get(endpoint, params);
    }
    /**
     * @description get a signature for the ethereumAddress if registered
     */
    async getRegistration(genericParams = {}) {
        return this._get('registration', {
            ...genericParams,
        });
    }
    /**
     * @description get the user associated with the ethereumAddress
     */
    async getUser(genericParams = {}) {
        return this._get('users', {
            ...genericParams,
        });
    }
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
    async updateUser({ userData, email, username, isSharingUsername, isSharingAddress, country, }) {
        return this.put('users', {
            email,
            username,
            isSharingUsername,
            isSharingAddress,
            userData: JSON.stringify(userData),
            country,
        });
    }
    /**
     * @description create an account for an ethereumAddress
     *
     * @param starkKey for the account that will be used as the public key in starkwareEx-Lib requests
     * going forward for this account.
     * @param starkKeyYCoordinate for the account that will be used as the Y coordinate for the public
     * key in starkwareEx-Lib requests going forward for this account.
     */
    async createAccount(starkKey, starkKeyYCoordinate) {
        return this.post('accounts', {
            starkKey,
            starkKeyYCoordinate,
        });
    }
    /**
     * @description get account associated with an ethereumAddress and accountNumber 0
     *
     * @param ethereumAddress the account is associated with
     */
    async getAccount(ethereumAddress, genericParams = {}) {
        return this._get(`accounts/${db_1.getAccountId({ address: ethereumAddress })}`, { ...genericParams });
    }
    /**
     * @description get all accounts associated with an ethereumAddress
     */
    async getAccounts(genericParams = {}) {
        return this._get('accounts', { ...genericParams });
    }
    /**
     * @description get leaderboard pnl for period and accountNumber 0
     *
     * @param period the period of pnls to retrieve
     */
    async getAccountLeaderboardPnl(period, params, genericParams = {}) {
        return this._get(`accounts/leaderboard-pnl/${period}`, {
            ...params,
            ...genericParams,
        });
    }
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
    async getPositions(params, genericParams = {}) {
        return this._get('positions', {
            ...params,
            ...genericParams,
        });
    }
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
    async getOrders(params = {}, genericParams = {}) {
        return this._get('orders', {
            ...params,
            ...genericParams,
        });
    }
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
    async getActiveOrders(market, side, id, genericParams = {}) {
        return this._get('active-orders', {
            market,
            side,
            id,
            ...genericParams,
        });
    }
    /**
     * @description get an order by a unique id
     *
     * @param orderId of the order
     */
    async getOrderById(orderId, genericParams = {}) {
        return this._get(`orders/${orderId}`, { ...genericParams });
    }
    /**
     * @description get an order by a clientId
     *
     * @param clientId of the order
     */
    async getOrderByClientId(clientId, genericParams = {}) {
        return this._get(`orders/client/${clientId}`, { ...genericParams });
    }
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
    async createOrder(params, positionId) {
        const clientId = params.clientId || request_helpers_1.generateRandomClientId();
        let signature = params.signature;
        if (!signature) {
            if (!this.starkKeyPair) {
                throw new Error('Order is not signed and client was not initialized with starkPrivateKey');
            }
            const orderToSign = {
                humanSize: params.size,
                humanPrice: params.price,
                limitFee: params.limitFee,
                market: params.market,
                side: params.side,
                expirationIsoTimestamp: params.expiration,
                clientId,
                positionId,
            };
            const starkOrder = starkex_lib_1.SignableOrder.fromOrder(orderToSign, this.networkId);
            signature = await starkOrder.sign(this.starkKeyPair);
        }
        const order = {
            ...params,
            clientId,
            signature,
        };
        return this.post('orders', order);
    }
    /**
     * @description cancel a specific order for a user by the order's unique id
     *
     * @param orderId of the order being canceled
     */
    async cancelOrder(orderId) {
        return this.delete(`orders/${orderId}`, {});
    }
    /**
     * @description cancel all orders for a user for a specific market
     *
     * @param market of the orders being canceled
     */
    async cancelAllOrders(market) {
        const params = market ? { market } : {};
        return this.delete('orders', params);
    }
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
    async cancelActiveOrders(market, side, id, genericParams = {}) {
        return this.delete('active-orders', {
            market,
            side,
            id,
            ...genericParams,
        });
    }
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
    async getFills(params, genericParams = {}) {
        return this._get('fills', {
            ...params,
            ...genericParams,
        });
    }
    /**
     * @description get transfers for a user by a set of query parameters
     *
     * @param {
     * @type of transfer
     * @limit to the number of transfers returned
     * @createdBeforeOrAt sets the time of the last transfer that will be received
     * }
     */
    async getTransfers(params = {}, genericParams = {}) {
        return this._get('transfers', {
            ...params,
            ...genericParams,
        });
    }
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
    async createWithdrawal(params, positionId) {
        const clientId = params.clientId || request_helpers_1.generateRandomClientId();
        let signature = params.signature;
        if (!signature) {
            if (!this.starkKeyPair) {
                throw new Error('Withdrawal is not signed and client was not initialized with starkPrivateKey');
            }
            const withdrawalToSign = {
                humanAmount: params.amount,
                expirationIsoTimestamp: params.expiration,
                clientId,
                positionId,
            };
            const starkWithdrawal = starkex_lib_1.SignableWithdrawal.fromWithdrawal(withdrawalToSign, this.networkId);
            signature = await starkWithdrawal.sign(this.starkKeyPair);
        }
        const withdrawal = {
            ...params,
            clientId,
            signature,
        };
        return this.post('withdrawals', withdrawal);
    }
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
    async createFastWithdrawal({ lpStarkKey, ...params }, positionId) {
        const clientId = params.clientId || request_helpers_1.generateRandomClientId();
        let signature = params.signature;
        if (!signature) {
            if (!this.starkKeyPair) {
                throw new Error('Fast withdrawal is not signed and client was not initialized with starkPrivateKey');
            }
            const fact = this.starkLib.factRegistry.getTransferErc20Fact({
                recipient: params.toAddress,
                tokenAddress: this.starkLib.collateralToken.getAddress(),
                tokenDecimals: collateralTokenDecimals,
                humanAmount: params.creditAmount,
                salt: starkex_lib_1.nonceFromClientId(clientId),
            });
            const transferToSign = {
                senderPositionId: positionId,
                receiverPositionId: params.lpPositionId,
                receiverPublicKey: lpStarkKey,
                factRegistryAddress: this.starkLib.factRegistry.getAddress(),
                fact,
                humanAmount: params.debitAmount,
                clientId,
                expirationIsoTimestamp: params.expiration,
            };
            const starkConditionalTransfer = starkex_lib_1.SignableConditionalTransfer.fromTransfer(transferToSign, this.networkId);
            signature = await starkConditionalTransfer.sign(this.starkKeyPair);
        }
        const fastWithdrawal = {
            ...params,
            clientId,
            signature,
        };
        return this.post('fast-withdrawals', fastWithdrawal);
    }
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
    async createTransfer(params, positionId) {
        const clientId = params.clientId || request_helpers_1.generateRandomClientId();
        let signature = params.signature;
        if (!signature) {
            if (!this.starkKeyPair) {
                throw new Error('Transfer is not signed and client was not initialized with starkPrivateKey');
            }
            const transferToSign = {
                humanAmount: params.amount,
                expirationIsoTimestamp: params.expiration,
                receiverPositionId: params.receiverPositionId,
                senderPositionId: positionId,
                receiverPublicKey: params.receiverPublicKey,
                clientId,
            };
            const starkTransfer = starkex_lib_1.SignableTransfer.fromTransfer(transferToSign, this.networkId);
            signature = await starkTransfer.sign(this.starkKeyPair);
        }
        const transfer = {
            amount: params.amount,
            receiverAccountId: params.receiverAccountId,
            clientId,
            signature,
            expiration: params.expiration,
        };
        return this.post('transfers', transfer);
    }
    /**
     * @description get a user's funding payments by a set of query parameters
     *
     * @param {
     * @market the funding payments are for
     * @limit to the number of funding payments returned
     * @effectiveBeforeOrAt sets the latest funding payment received
     * }
     */
    async getFundingPayments(params, genericParams = {}) {
        return this._get('funding', {
            ...params,
            ...genericParams,
        });
    }
    /**
     * @description get historical pnl ticks for an account between certain times
     *
     * @param {
     * @createdBeforeOrAt latest historical pnl tick being returned
     * @createdOnOrAfter earliest historical pnl tick being returned
     * }
     */
    getHistoricalPnl(params, genericParams = {}) {
        return this._get('historical-pnl', {
            ...params,
            ...genericParams,
        });
    }
    /**
     * @description get trading rewards for a user for a given epoch
     *
     * @param {
     * @epoch to request rewards data for (optional)
     * }
     */
    getTradingRewards(params, genericParams = {}) {
        return this._get('rewards/weight', {
            ...params,
            ...genericParams,
        });
    }
    /**
     * @description get liquidity provider rewards for a user for a given epoch
     *
     * @param {
     * @epoch to request rewards data for (optional)
     * }
     */
    getLiquidityProviderRewards(params, genericParams = {}) {
        return this._get('rewards/liquidity', {
            ...params,
            ...genericParams,
        });
    }
    /**
     * @description get retroactive mining rewards for a user for a given epoch
     *
     */
    getRetroactiveMiningRewards(genericParams = {}) {
        return this._get('rewards/retroactive-mining', {
            ...genericParams,
        });
    }
    /**
     * @description get the key ids associated with an ethereumAddress
     *
     */
    async getApiKeys(genericParams = {}) {
        return this._get('api-keys', { ...genericParams });
    }
    /**
     * @description send verification email to email specified by User
     */
    async sendVerificationEmail() {
        return this.put('emails/send-verification-email', {});
    }
    /**
     * @description requests tokens on dYdX's staging server.
     * NOTE: this will not work on Mainnet/Production.
     */
    async requestTestnetTokens() {
        // Ropsten
        if (this.networkId !== 3) {
            throw new Error('Network is not Ropsten');
        }
        return this.post('testnet/tokens', {});
    }
    // ============ Signing ============
    sign({ requestPath, method, isoTimestamp, data, }) {
        const messageString = (isoTimestamp +
            METHOD_ENUM_MAP[method] +
            requestPath +
            (lodash_1.default.isEmpty(data) ? '' : JSON.stringify(data)));
        return crypto_1.default.createHmac('sha256', Buffer.from(this.apiKeyCredentials.secret, 'base64')).update(messageString).digest('base64');
    }
}
exports.default = Private;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3ByaXZhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFFNUIsMkRBQXlEO0FBQ3pELDJEQVltQztBQUNuQyxvREFBdUI7QUFFdkIsZ0VBQXVGO0FBQ3ZGLHdDQUdzQjtBQUN0QixrQ0FBeUM7QUFzQ3pDLDhDQUE4QztBQUM5QyxNQUFNLGVBQWUsR0FBcUM7SUFDeEQsQ0FBQyxxQkFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLHVCQUFTLENBQUMsTUFBTTtJQUN4QyxDQUFDLHFCQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsdUJBQVMsQ0FBQyxHQUFHO0lBQ2xDLENBQUMscUJBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSx1QkFBUyxDQUFDLElBQUk7SUFDcEMsQ0FBQyxxQkFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLHVCQUFTLENBQUMsR0FBRztDQUNuQyxDQUFDO0FBRUYsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLENBQUM7QUFFbEMsTUFBcUIsT0FBTztJQVExQixZQUFZLEVBQ1YsSUFBSSxFQUNKLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsU0FBUyxFQUNULEtBQUssR0FPTjtRQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksMEJBQVksQ0FBQyxFQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxlQUFlLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyw2QkFBZSxDQUFDLHlCQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztTQUNuRTtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lB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