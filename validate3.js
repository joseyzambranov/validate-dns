const dns = require('dns');
const dnsPromises = dns.promises;

async function test(domain){
    let response = await dnsPromises.lookup(domain).catch(() => { return false } )
    if(!response){
        response = await dnsPromises.resolveMx(domain).catch(() => { return false } )
    }

    console.log(response)
}


test("iclaro.euieueeueu")