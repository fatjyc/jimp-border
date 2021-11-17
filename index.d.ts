import { ImageCallback } from "@jimp/core";

interface Border {
    border(
        options?: {
            color: string;
            width: number;
        },
        cb?: ImageCallback<this>
    ): this;
    border(cb?: ImageCallback<this>): this;
}

export default function (): Border;
