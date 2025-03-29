"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const typeorm_1 = require("typeorm");
let Crypto = class Crypto {
};
exports.Crypto = Crypto;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Crypto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crypto.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crypto.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crypto.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "current_price", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint"),
    __metadata("design:type", Number)
], Crypto.prototype, "market_cap", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], Crypto.prototype, "market_cap_rank", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint"),
    __metadata("design:type", Number)
], Crypto.prototype, "fully_diluted_valuation", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint"),
    __metadata("design:type", Number)
], Crypto.prototype, "total_volume", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "high_24h", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "low_24h", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "price_change_24h", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "price_change_percentage_24h", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint"),
    __metadata("design:type", Number)
], Crypto.prototype, "market_cap_change_24h", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "market_cap_change_percentage_24h", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint"),
    __metadata("design:type", Number)
], Crypto.prototype, "circulating_supply", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint"),
    __metadata("design:type", Number)
], Crypto.prototype, "total_supply", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { nullable: true }),
    __metadata("design:type", Number)
], Crypto.prototype, "max_supply", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "ath", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "ath_change_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp"),
    __metadata("design:type", Date)
], Crypto.prototype, "ath_date", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "atl", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Crypto.prototype, "atl_change_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp"),
    __metadata("design:type", Date)
], Crypto.prototype, "atl_date", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp"),
    __metadata("design:type", Date)
], Crypto.prototype, "last_updated", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { nullable: true }),
    __metadata("design:type", Number)
], Crypto.prototype, "roi_times", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], Crypto.prototype, "roi_currency", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { nullable: true }),
    __metadata("design:type", Number)
], Crypto.prototype, "roi_percentage", void 0);
exports.Crypto = Crypto = __decorate([
    (0, typeorm_1.Entity)("cryptos")
], Crypto);
