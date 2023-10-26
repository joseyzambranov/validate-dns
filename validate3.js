const dns = require('dns');
const dnsPromises = dns.promises;

async function test(domain){
    let response = await dnsPromises.lookup(domain).catch(() => { return false } )
    if(!response){
        response = await dnsPromises.resolveMx(domain).catch(() => { return false } )
    }

    console.log(response)
    //try {
    //    let response = await dnsPromises.lookup(domain);
    //    console.log(response)
    //    return
    //} catch (error) {
    //   // console.log("ocurrio un error" , error)
    //   // console.error(error)
    //    return dnsPromises.resolveMx(domain)
    //}

}


test("iclaro.euieueeueu")

/*

dnsLookup(domain).then(() => {
        //    }).catch((domainError) => {
        //      return dnsresolveMx(domain).then(() => {
        //      }).catch((mxError) => {
        //        if(!invalidDoemainMx.includes(domain)){
        //          invalidDoemainMx.push(domain)
        //        }
        //        item.valid = false;
        //        item.reason = `Dominio y MX Inválidos (${domain}): ${domainError.message}, MX Error: ${mxError.message}`;
        //      });
        //    })


*/