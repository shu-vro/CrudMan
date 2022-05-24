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
    var final = [];
    if (Array.isArray(o)) {
        o.forEach((i) => {
            if (!Array.isArray(i)) {
                if (i.hasOwnProperty(v)) {
                    final.push(i[v]);
                }
            } else {
                final = getValueFromResponse(i, v);
            }
        });
        return final;
    } else if (typeof o === "object") {
        return [o[v]];
    }
    return [];
}

export function checkRegexKeyInResponse(o: any[] | object, r: RegExp) {
    return inner(o, r).some((i) => i === true);
    function inner(o: any, r: RegExp) {
        var final = [];
        if (Array.isArray(o)) {
            o.forEach((i) => {
                if (!Array.isArray(i)) {
                    // if (i.hasOwnProperty(r)) {
                    //     final.push(i[r]);
                    // }
                    let stringify = JSON.stringify(Object.keys(i));
                    final.push(r.test(stringify));
                } else {
                    final = inner(i, r);
                }
            });
            return final;
        } else {
            let stringify = JSON.stringify(Object.keys(o));
            return [r.test(stringify)];
        }
    }
}
