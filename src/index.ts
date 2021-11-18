import jimp from "jimp";
import mask from "./mask";

const border = async (
    file: string,
    color: string,
    width: number = 0,
    borderRadius: boolean = true
) => {
    const image = await jimp.read(file);

    const widthValue = width || image.bitmap.width * 0.1;
    const colorValue = color || "#FFEF45";

    const background = new jimp(
        image.bitmap.width + 2 * widthValue,
        image.bitmap.height + 2 * widthValue,
        colorValue
    );

    background.blit(image, widthValue, widthValue);

    background.scaleToFit(image.bitmap.width, image.bitmap.height);

    if (borderRadius) {
        const mask1 = await jimp.read(Buffer.from(mask.mask1, "base64"));
        const mask2 = await jimp.read(Buffer.from(mask.mask2, "base64"));
        const mask3 = await jimp.read(Buffer.from(mask.mask3, "base64"));
        const mask4 = await jimp.read(Buffer.from(mask.mask4, "base64"));

        mask1.scaleToFit(widthValue, widthValue);
        mask2.scaleToFit(widthValue, widthValue);
        mask3.scaleToFit(widthValue, widthValue);
        mask4.scaleToFit(widthValue, widthValue);

        background.mask(mask1, 0, 0);
        background.mask(mask2, 0, background.bitmap.height - widthValue);
        background.mask(
            mask3,
            background.bitmap.width - widthValue,
            background.bitmap.height - widthValue
        );
        background.mask(mask4, background.bitmap.width - widthValue, 0);
    }

    return background;
};

export default border;
