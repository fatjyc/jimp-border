/**
 * Creates a border out of an image.
 * @param {function(Error, Jimp)} options (optional) color, width
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
export default () => ({
    border(options = {}, cb) {
        if (typeof options === "function") {
            cb = options;
            options = {};
        }

        const color = options.color;
        const width = this.bitmap.width * 0.1 || 4;

        const background = new jimp(
            image.bitmap.width + 2 * width,
            image.bitmap.height + 2 * width,
            color
        );

        background.blit(image, width, width);

        background.scaleToFit(image.bitmap.width, image.bitmap.height);

        return background;
    },
});
