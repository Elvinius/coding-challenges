function stripUrlParams(url, paramsToStrip) {
    //used destructuring assignment to prevent the repetition
    let [strippedUrl, params] = url.split('?');
    if (params) {
        //create an array of parameters
        let paramsArray = params.split('&');
        let uniqueParams = {};
        for (let i = 0; i < paramsArray.length; i++) {
            //The uniqueParams object will include the unique keys with values with the help of following operations.
            let [key, value] = paramsArray[i].split('=');
            if (!uniqueParams[key]) {
                uniqueParams[key] = value;
            }
        }
        //used JS arguments array-like object to check if the second parameter exists or not
        if (arguments[1]) {
            //check if the to-be-deleted parameter included inside paramsToStrip array exists inside uniqueParams object. If yes, delete that key from object.
            paramsToStrip.map(param => {
                for (let key of Object.keys(uniqueParams)) {
                    if (param === key) {
                        delete uniqueParams[key];
                    }
                }
            });
        }
        //here we check if uniqueParams object is empty or not. If not there is no need to add '?' sign after the URL.
        if (Object.keys(uniqueParams).length !== 0) {
            strippedUrl += '?';
            for (const [key, value] of Object.entries(uniqueParams)) {
                if (key == Object.keys(uniqueParams)[0]) {
                    strippedUrl += `${key}=${value}`;
                } else {
                    strippedUrl += '&' + `${key}=${value}`;
                }
            }
        }
        return strippedUrl;
    }
    else {
        return url;
    }
}

// EXAMPLES

console.log(stripUrlParams("https://devtailor.com?first=1&second=2&first=2"));
// output: "https://devtailor.com?first=1&second=2"

console.log(stripUrlParams("https://devtailor.com?a=1&b=2", ["b"]));
// output: "https://devtailor.com?a=1"

console.log(stripUrlParams("https://devtailor.com", ["b"]));
// output: "https://devtailor.com"

//additional test case
console.log(stripUrlParams("https://devtailor.com?a=1", []));
// output: "https://devtailor.com?a=1"