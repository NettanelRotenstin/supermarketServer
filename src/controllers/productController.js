"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByName = void 0;
const productService_1 = require("../services/productService");
const getProductByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, productService_1.getByNameService)(req.params.name);
        res.status(201).json({
            msg: "user login succesfull",
            err: false,
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "something went wrong",
            err: true,
            data: null
        });
    }
});
exports.getProductByName = getProductByName;
