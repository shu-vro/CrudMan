export const buffer = (u: string, p: string) => {
    return Buffer.from(`${u}:${p}`).toString("base64");
};
