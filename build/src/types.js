"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingActionString = exports.LeaderboardPnlSortBy = exports.LeaderboardPnlPeriod = exports.SignatureTypes = exports.SigningMethod = exports.AccountAction = exports.OrderStatus = exports.PositionStatus = exports.TimeInForce = exports.OrderType = exports.CandleResolution = exports.MarketStatisticDay = exports.TransferAsset = exports.OrderSide = exports.Asset = exports.Market = void 0;
const starkex_lib_1 = require("@dydxprotocol/starkex-lib");
exports.Market = starkex_lib_1.DydxMarket;
exports.Asset = starkex_lib_1.DydxAsset;
exports.OrderSide = starkex_lib_1.StarkwareOrderSide;
var TransferAsset;
(function (TransferAsset) {
    TransferAsset["USDC"] = "USDC";
})(TransferAsset = exports.TransferAsset || (exports.TransferAsset = {}));
var MarketStatisticDay;
(function (MarketStatisticDay) {
    MarketStatisticDay["ONE"] = "1";
    MarketStatisticDay["SEVEN"] = "7";
    MarketStatisticDay["THIRTY"] = "30";
})(MarketStatisticDay = exports.MarketStatisticDay || (exports.MarketStatisticDay = {}));
var CandleResolution;
(function (CandleResolution) {
    CandleResolution["ONE_DAY"] = "1DAY";
    CandleResolution["FOUR_HOURS"] = "4HOURS";
    CandleResolution["ONE_HOUR"] = "1HOUR";
    CandleResolution["THIRTY_MINS"] = "30MINS";
    CandleResolution["FIFTEEN_MINS"] = "15MINS";
    CandleResolution["FIVE_MINS"] = "5MINS";
    CandleResolution["ONE_MIN"] = "1MIN";
})(CandleResolution = exports.CandleResolution || (exports.CandleResolution = {}));
var OrderType;
(function (OrderType) {
    OrderType["LIMIT"] = "LIMIT";
    OrderType["MARKET"] = "MARKET";
    OrderType["STOP_LIMIT"] = "STOP_LIMIT";
    OrderType["TRAILING_STOP"] = "TRAILING_STOP";
    OrderType["TAKE_PROFIT"] = "TAKE_PROFIT";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var TimeInForce;
(function (TimeInForce) {
    TimeInForce["GTT"] = "GTT";
    TimeInForce["FOK"] = "FOK";
    TimeInForce["IOC"] = "IOC";
})(TimeInForce = exports.TimeInForce || (exports.TimeInForce = {}));
var PositionStatus;
(function (PositionStatus) {
    PositionStatus["OPEN"] = "OPEN";
    PositionStatus["CLOSED"] = "CLOSED";
    PositionStatus["LIQUIDATED"] = "LIQUIDATED";
})(PositionStatus = exports.PositionStatus || (exports.PositionStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["OPEN"] = "OPEN";
    OrderStatus["FILLED"] = "FILLED";
    OrderStatus["CANCELED"] = "CANCELED";
    OrderStatus["UNTRIGGERED"] = "UNTRIGGERED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var AccountAction;
(function (AccountAction) {
    AccountAction["DEPOSIT"] = "DEPOSIT";
    AccountAction["WITHDRAWAL"] = "WITHDRAWAL";
})(AccountAction = exports.AccountAction || (exports.AccountAction = {}));
var SigningMethod;
(function (SigningMethod) {
    SigningMethod["Compatibility"] = "Compatibility";
    SigningMethod["UnsafeHash"] = "UnsafeHash";
    SigningMethod["Hash"] = "Hash";
    SigningMethod["TypedData"] = "TypedData";
    SigningMethod["MetaMask"] = "MetaMask";
    SigningMethod["MetaMaskLatest"] = "MetaMaskLatest";
    SigningMethod["CoinbaseWallet"] = "CoinbaseWallet";
    SigningMethod["Personal"] = "Personal";
})(SigningMethod = exports.SigningMethod || (exports.SigningMethod = {}));
var SignatureTypes;
(function (SignatureTypes) {
    SignatureTypes[SignatureTypes["NO_PREPEND"] = 0] = "NO_PREPEND";
    SignatureTypes[SignatureTypes["DECIMAL"] = 1] = "DECIMAL";
    SignatureTypes[SignatureTypes["HEXADECIMAL"] = 2] = "HEXADECIMAL";
    SignatureTypes[SignatureTypes["PERSONAL"] = 3] = "PERSONAL";
})(SignatureTypes = exports.SignatureTypes || (exports.SignatureTypes = {}));
var LeaderboardPnlPeriod;
(function (LeaderboardPnlPeriod) {
    LeaderboardPnlPeriod["DAILY"] = "DAILY";
    LeaderboardPnlPeriod["WEEKLY"] = "WEEKLY";
    LeaderboardPnlPeriod["MONTHLY"] = "MONTHLY";
    LeaderboardPnlPeriod["ALL_TIME"] = "ALL_TIME";
    LeaderboardPnlPeriod["COMPETITION"] = "COMPETITION";
})(LeaderboardPnlPeriod = exports.LeaderboardPnlPeriod || (exports.LeaderboardPnlPeriod = {}));
var LeaderboardPnlSortBy;
(function (LeaderboardPnlSortBy) {
    LeaderboardPnlSortBy["ABSOLUTE"] = "ABSOLUTE";
    LeaderboardPnlSortBy["PERCENT"] = "PERCENT";
})(LeaderboardPnlSortBy = exports.LeaderboardPnlSortBy || (exports.LeaderboardPnlSortBy = {}));
// ============ API Response Field Types ============
var MarketStatus;
(function (MarketStatus) {
    MarketStatus["ONLINE"] = "ONLINE";
    MarketStatus["OFFLINE"] = "OFFLINE";
    MarketStatus["POST_ONLY"] = "POST_ONLY";
    MarketStatus["CANCEL_ONLY"] = "CANCEL_ONLY";
    MarketStatus["INITIALIZING"] = "INITIALIZING";
})(MarketStatus || (MarketStatus = {}));
// ============ Ethereum Signing ============
var OnboardingActionString;
(function (OnboardingActionString) {
    OnboardingActionString["ONBOARDING"] = "dYdX Onboarding";
    OnboardingActionString["KEY_DERIVATION"] = "dYdX STARK Key";
})(OnboardingActionString = exports.OnboardingActionString || (exports.OnboardingActionString = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBSW1DO0FBc0N0QixRQUFBLE1BQU0sR0FBRyx3QkFBVSxDQUFDO0FBRXBCLFFBQUEsS0FBSyxHQUFHLHVCQUFTLENBQUM7QUFFbEIsUUFBQSxTQUFTLEdBQUcsZ0NBQWtCLENBQUM7QUFFNUMsSUFBWSxhQUVYO0FBRkQsV0FBWSxhQUFhO0lBQ3ZCLDhCQUFhLENBQUE7QUFDZixDQUFDLEVBRlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFFeEI7QUFFRCxJQUFZLGtCQUlYO0FBSkQsV0FBWSxrQkFBa0I7SUFDNUIsK0JBQVMsQ0FBQTtJQUNULGlDQUFXLENBQUE7SUFDWCxtQ0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUpXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBSTdCO0FBRUQsSUFBWSxnQkFRWDtBQVJELFdBQVksZ0JBQWdCO0lBQzFCLG9DQUFnQixDQUFBO0lBQ2hCLHlDQUFxQixDQUFBO0lBQ3JCLHNDQUFrQixDQUFBO0lBQ2xCLDBDQUFzQixDQUFBO0lBQ3RCLDJDQUF1QixDQUFBO0lBQ3ZCLHVDQUFtQixDQUFBO0lBQ25CLG9DQUFnQixDQUFBO0FBQ2xCLENBQUMsRUFSVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQVEzQjtBQUVELElBQVksU0FNWDtBQU5ELFdBQVksU0FBUztJQUNuQiw0QkFBZSxDQUFBO0lBQ2YsOEJBQWlCLENBQUE7SUFDakIsc0NBQXlCLENBQUE7SUFDekIsNENBQStCLENBQUE7SUFDL0Isd0NBQTJCLENBQUE7QUFDN0IsQ0FBQyxFQU5XLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBTXBCO0FBRUQsSUFBWSxXQUlYO0FBSkQsV0FBWSxXQUFXO0lBQ3JCLDBCQUFXLENBQUE7SUFDWCwwQkFBVyxDQUFBO0lBQ1gsMEJBQVcsQ0FBQTtBQUNiLENBQUMsRUFKVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUl0QjtBQUVELElBQVksY0FJWDtBQUpELFdBQVksY0FBYztJQUN4QiwrQkFBYSxDQUFBO0lBQ2IsbUNBQWlCLENBQUE7SUFDakIsMkNBQXlCLENBQUE7QUFDM0IsQ0FBQyxFQUpXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBSXpCO0FBRUQsSUFBWSxXQU1YO0FBTkQsV0FBWSxXQUFXO0lBQ3JCLGtDQUFtQixDQUFBO0lBQ25CLDRCQUFhLENBQUE7SUFDYixnQ0FBaUIsQ0FBQTtJQUNqQixvQ0FBcUIsQ0FBQTtJQUNyQiwwQ0FBMkIsQ0FBQTtBQUM3QixDQUFDLEVBTlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFNdEI7QUFFRCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDdkIsb0NBQW1CLENBQUE7SUFDbkIsMENBQXlCLENBQUE7QUFDM0IsQ0FBQyxFQUhXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBR3hCO0FBRUQsSUFBWSxhQVNYO0FBVEQsV0FBWSxhQUFhO0lBQ3ZCLGdEQUErQixDQUFBO0lBQy9CLDBDQUF5QixDQUFBO0lBQ3pCLDhCQUFhLENBQUE7SUFDYix3Q0FBdUIsQ0FBQTtJQUN2QixzQ0FBcUIsQ0FBQTtJQUNyQixrREFBaUMsQ0FBQTtJQUNqQyxrREFBaUMsQ0FBQTtJQUNqQyxzQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBVFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFTeEI7QUFFRCxJQUFZLGNBS1g7QUFMRCxXQUFZLGNBQWM7SUFDeEIsK0RBQWMsQ0FBQTtJQUNkLHlEQUFXLENBQUE7SUFDWCxpRUFBZSxDQUFBO0lBQ2YsMkRBQVksQ0FBQTtBQUNkLENBQUMsRUFMVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUt6QjtBQUVELElBQVksb0JBTVg7QUFORCxXQUFZLG9CQUFvQjtJQUM5Qix1Q0FBZSxDQUFBO0lBQ2YseUNBQWlCLENBQUE7SUFDakIsMkNBQW1CLENBQUE7SUFDbkIsNkNBQXFCLENBQUE7SUFDckIsbURBQTJCLENBQUE7QUFDN0IsQ0FBQyxFQU5XLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBTS9CO0FBRUQsSUFBWSxvQkFHWDtBQUhELFdBQVksb0JBQW9CO0lBQzlCLDZDQUFxQixDQUFBO0lBQ3JCLDJDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFIVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQUcvQjtBQStaRCxxREFBcUQ7QUFFckQsSUFBSyxZQU1KO0FBTkQsV0FBSyxZQUFZO0lBQ2YsaUNBQWlCLENBQUE7SUFDakIsbUNBQW1CLENBQUE7SUFDbkIsdUNBQXVCLENBQUE7SUFDdkIsMkNBQTJCLENBQUE7SUFDM0IsNkNBQTZCLENBQUE7QUFDL0IsQ0FBQyxFQU5JLFlBQVksS0FBWixZQUFZLFFBTWhCO0FBRUQsNkNBQTZDO0FBRTdDLElBQVksc0JBR1g7QUFIRCxXQUFZLHNCQUFzQjtJQUNoQyx3REFBOEIsQ0FBQTtJQUM5QiwyREFBaUMsQ0FBQTtBQUNuQyxDQUFDLEVBSFcsc0JBQXNCLEdBQXRCLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFHakMifQ==