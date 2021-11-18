import border from "../index";

test("border", async () => {
    const newPng = await border("./src/__tests__/test.png", "#FF0000", 4);
    newPng.write("./src/__tests__/new.png");
    expect(newPng.bitmap.width).toBe(512);
});
