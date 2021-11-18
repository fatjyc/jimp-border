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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const mask_1 = __importDefault(require("./mask"));
const border = (file, color, width = 0, borderRadius = true) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield jimp_1.default.read(file);
    const widthValue = width || image.bitmap.width * 0.1;
    const colorValue = color || "#FFEF45";
    const background = new jimp_1.default(image.bitmap.width + 2 * widthValue, image.bitmap.height + 2 * widthValue, colorValue);
    background.blit(image, widthValue, widthValue);
    background.scaleToFit(image.bitmap.width, image.bitmap.height);
    if (borderRadius) {
        const mask1 = yield jimp_1.default.read(Buffer.from(mask_1.default.mask1, "base64"));
        const mask2 = yield jimp_1.default.read(Buffer.from(mask_1.default.mask2, "base64"));
        const mask3 = yield jimp_1.default.read(Buffer.from(mask_1.default.mask3, "base64"));
        const mask4 = yield jimp_1.default.read(Buffer.from(mask_1.default.mask4, "base64"));
        mask1.scaleToFit(widthValue, widthValue);
        mask2.scaleToFit(widthValue, widthValue);
        mask3.scaleToFit(widthValue, widthValue);
        mask4.scaleToFit(widthValue, widthValue);
        background.mask(mask1, 0, 0);
        background.mask(mask2, 0, background.bitmap.height - widthValue);
        background.mask(mask3, background.bitmap.width - widthValue, background.bitmap.height - widthValue);
        background.mask(mask4, background.bitmap.width - widthValue, 0);
    }
    return background;
});
exports.default = border;
