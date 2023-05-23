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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
let UserController = class UserController {
    constructor(userService, configService, logger) {
        this.userService = userService;
        this.configService = configService;
        this.logger = logger;
    }
    getUsers() {
        return this.userService.add();
    }
    addUser() {
        const user = { username: 'toimc', password: '123456' };
        return this.userService.create(user);
    }
    updateUser(params) {
        const user = { username: 'newname' };
        return this.userService.update(params.id, user);
    }
    deleteUser(params) {
        return this.userService.remove(params.id);
    }
    find(params) {
        return this.userService.likeFind(params.name);
    }
    profile() {
        return this.userService.findProfile(5);
    }
    getLogsByGroup() {
        return this.userService.findLogsByGroup(5);
    }
};
__decorate([
    (0, common_1.Get)('/add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Get)('/update/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('/delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('/find/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "find", null);
__decorate([
    (0, common_1.Get)('/profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)('/logsByGroup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "getLogsByGroup", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService, Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map