import jimp from "jimp";

async function main() {
    const image = await jimp.read("img/test.png");
    const mask1 = await jimp.read("img/mask-1.png");
    const mask2 = await jimp.read("img/mask-2.png");
    const mask3 = await jimp.read("img/mask-3.png");
    const mask4 = await jimp.read("img/mask-4.png");

    // TODO: width 和 color 应该做成参数
    const width = image.bitmap.width * 0.1;
    const color = "#FFEF45";

    const background = new jimp(
        image.bitmap.width + 2 * width,
        image.bitmap.height + 2 * width,
        color
    );

    background.blit(image, width, width);

    background.scaleToFit(image.bitmap.width, image.bitmap.height);

    mask1.scaleToFit(width, width);
    mask2.scaleToFit(width, width);
    mask3.scaleToFit(width, width);
    mask4.scaleToFit(width, width);

    background.mask(mask1, 0, 0);
    background.mask(mask2, 0, background.bitmap.height - width);
    background.mask(mask3, background.bitmap.width - width, background.bitmap.height - width);
    background.mask(mask4, background.bitmap.width - width, 0);

    background.write("img/new.png", console.log);
}

main();
