"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
Object.defineProperty(exports, "__esModule", { value: true });
const getProfile = (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { User } = req.app.get("models");
        const userId = req.get("user_id") || 0;
        const user = yield User.findOne({ where: { id: userId } });
        if (!user) return res.status(401).end();
        req.user = user;
        // Contract.addScope(
        //   "defaultScope",
        //   {
        //     where: {
        //       [Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
        //     },
        //   },
        //   { override: true }
        // );
        next();
    });
module.exports = { getProfile };
