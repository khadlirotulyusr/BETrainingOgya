const url = require("url");
const crypto = require("crypto");

const requireHMac = () => {
    return (req, res, next) => {
        const nonSecurePaths = ['/api/health-check', '/api/oase'];
        if (nonSecurePaths.includes(req.path)) return next();

        let retrievedSignature, parsedData, computedSignature;
        console.log('ini req bro',req.url)
        if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Headers", "X-Signature");
            res.writeHead(204);
            res.end();
        } else {
         // Get signature.
            retrievedSignature = req.headers["x-signature"];
            console.log("ini headers",req.headers)
            console.log("ini hmac",retrievedSignature)
            if(!retrievedSignature){
                res.writeHead(403, {
                    "Content-Type": "text/plain"
                });
                res.end("HMAC Not Found\n");
                return;
            }
         // Recalculate signature.
            if(req.method === "POST") {
                parsedData = req.body;
                parsedData = JSON.stringify(parsedData);
            } else if(req.method === "GET") {
                // parsedData = url.parse(req.url).query;
                parsedData = url.parse(req.headers["referer"]).query;
            }
            if(!parsedData){
                parsedData = '';
            }
            console.log(process.env.SIGNATURE_SECRET_KEY);
            console.log('ini parse data',parsedData)
            computedSignature = crypto.createHmac("sha256", process.env.SIGNATURE_SECRET_KEY).update(parsedData).digest("hex");
            console.log(computedSignature)
         // Compare signatures.
            if (computedSignature === retrievedSignature) {
                next();
            } else {
                console.log("Not match")
                res.writeHead(403, {
                    "Content-Type": "text/plain"
                });
                res.end("HMAC validation failure\n");
            }
        }
    }
}

module.exports = {
    requireHMac
}