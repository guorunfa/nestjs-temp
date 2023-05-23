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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const logs_entity_1 = require("../logs/logs.entity");
let UserService = class UserService {
    constructor(user, logsRepository) {
        this.user = user;
        this.logsRepository = logsRepository;
    }
    add() {
        const data = new user_entity_1.User();
        data.username = '小率';
        data.password = '123';
        return this.user.save(data);
    }
    findAll() {
        return this.user.find();
    }
    find(username) {
        return this.user.findOne({ where: { username } });
    }
    likeFind(username) {
        return this.user.find({
            where: { username: (0, typeorm_2.Like)(`%${username}%`) },
        });
    }
    async create(user) {
        const userTmp = await this.user.create(user);
        return this.user.save(userTmp);
    }
    async update(id, user) {
        return this.user.update(id, user);
    }
    remove(id) {
        return this.user.delete(id);
    }
    findProfile(id) {
        return this.user.findOne({
            where: {
                id,
            },
            relations: {
                profile: true,
            },
        });
    }
    findLogsByGroup(id) {
        return this.logsRepository
            .createQueryBuilder('logs')
            .select('logs.result', 'result')
            .addSelect('COUNT(logs.result)', 'count')
            .leftJoinAndSelect('logs.user', 'user')
            .where('logs.userId = :id', { id })
            .groupBy('logs.result')
            .getRawMany();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(logs_entity_1.Logs)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map