// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { commonEnv } from './environment.common';

const clientId = 'xxxxxx-dddd-dddd-dddd-xxxxxxx';
const tenant = 'mjb2c.onmicrosoft.com';
const scopes = ['https://mjb2c.onmicrosoft.com/api/read'];
const appUrl = 'http://localhost:4200';
const azureInstance = commonEnv.azureInstance;

export class BuildEnvironment {
  constructor() {}

  public static GetEnvironmentUrl(): string {
    return environment.apiUrl;
  }
}

export const environment = {
  production: false,
  appUrl: appUrl,
  scopes: scopes,
  clientId: clientId,
  //apiUrl: 'https://admin-mj.azurewebsites.net/public/controllers/api',
  //apiUrl: 'http://localhost:5200/public/controllers/api',
  apiUrl: 'http://localhost:5200/public/controllers/api',
  apiSubscriptionKeyName: 'admin-APIMNG-Subscription-Key',
  apiSubscriptionKey: 'xxxxxxxxxddddddccccccccaaaaaaa',
  apiSubscriptionEnabled: true,
  agentSignInPolicy: commonEnv.theagentSignInPolicy,
  applicantSignInPolicy: commonEnv.applicantSignInPolicy,
  azureInstance: azureInstance,
  tenant: tenant,
  msalConfig: {
    clientID: clientId,
    authority: `${azureInstance}/${tenant}/${commonEnv.theagentSignInPolicy}`,
    consentScopes: scopes,
    redirectUri: `${appUrl}`,
    cacheLocation: 'localStorage',
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri: `${appUrl}`,
    storeAuthStateInCookie: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
