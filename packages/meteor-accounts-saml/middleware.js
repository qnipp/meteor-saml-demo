import { saveProfile } from "./profiles.js";
import { generateResponse } from "./utils/generateResponse.js";
import getSAMLForIdP from "./utils/getSAMLForIdP.js";
import parseSAMLUrl from "./utils/parseSAMLUrl.js";

export default async function middleware(req, res, next) {
  try {
    const { operation, idp } = parseSAMLUrl(req.url);

    const saml = getSAMLForIdP(idp);

    switch (operation) {
      case "metadata": {
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(saml.generateServiceProviderMetadata());
        break;
      }
      case "login": {
        const loginUrl = await saml.getAuthorizeUrlAsync();
        res.writeHead(303, { Location: loginUrl });
        res.end();
        break;
      }
      case "validate": {
        const profile = await saml.validatePostResponseAsync(req.body);
        const id = saveProfile({ idp, ...profile });
        const document = generateResponse({ id });
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.end(document);
        break;
      }
      default: {
        throw new Meteor.Error(
          "unknown_operation",
          `The operation ${operation} is unknown.`
        );
      }
    }
  } catch (e) {
    console.log(e);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(`${e.error ?? e}\n${e.reason ?? ""}\n${e.details ?? ""}`);
  }
}
