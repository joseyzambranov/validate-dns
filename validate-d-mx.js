
const dns = require("dns");

const domainValidityMap = {};
  let getAllDomain = await domainDao.getAll();
  let newDomains = [];
  for (let domain of domains) {
    if (domain) {
      let isValid = true;
      let domainExists = getAllDomain.find(
        (element) => element.domain === domain
      );
      if (domainExists) {
        isValid = domainExists.valid;
      } else {
        let response = await dnsPromises.lookup(domain).catch(() => {
          return false;
        });
        if (!response) {
          response = await dnsPromises.resolveMx(domain).catch(() => {
            return false;
          });
        }
        if (!response) {
          isValid = false;
        }
        newDomains.push({
          domain: domain,
          valid: isValid,
        });
      }
      domainValidityMap[domain] = isValid;
    }
  }
  for (let detail of details) {
    if (detail.email) {
      let sections = detail.email.split("@");
      if (!domainValidityMap[`${sections[1]}`]) {
        detail.valid = domainValidityMap[`${sections[1]}`];
        detail.reason = "Dominio o MX inválido";
      }
    }
  }