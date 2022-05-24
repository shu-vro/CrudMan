export function stringToRegex(s: string): RegExp {
    var m = [];
    return (m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/))
        ? new RegExp(
              m[2],
              m[3]
                  .split("")
                  .filter((i: number, p: any, s: any[]) => s.indexOf(i) === p)
                  .join("")
          )
        : new RegExp(s);
}
export function getValueFromResponse(o: any[] | object, v: string) {
    return Array.of(o)
        .flat(Infinity)
        .map((el) => {
            return el[v];
        })
        .filter((el) => el);
}

export function checkRegexKeyInResponse(o: any[] | object, r: RegExp) {
    return Array.of(o)
        .flat(Infinity)
        .map((el) => {
            return Boolean(Object.keys(el).toString().match(r));
        })
        .filter((el) => el)
        .some((el) => el);
}
