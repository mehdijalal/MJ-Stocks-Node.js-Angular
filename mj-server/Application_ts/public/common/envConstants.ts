const keyNames = [
  'ROOT',
  'API_ROOT',
  'DB_USER', 
  'DB_PASS', 
  'DB_HOST', 
  'DB_DATABASE',
  'IWA-B2C-TENANT-ID',
  'IWA-B2C-CLIENT-ID',
  'IWA-B2C-POLICY-NAME',
  'IWA-B2C-POLICY-NAME_AGENT',
  'IWA-B2C-ISSUER-LINK'
];

//This class get and set environment variables

export class ServerConstants {
  private keyValueMap: any;
  private isLocal:boolean;

  constructor()
  {
    this.isLocal =  process.env.root? false: true;  

    // this is hard-coded for now until Andrew adds it to the app service
    process.env['LOGERRORDAYS'] = '7';

    if(this.getisLocal())
    {
      console.log('LOCAL VARIABLES BEING LOADED');

      process.env.ROOT = '/public';
      process.env.API_ROOT = '/public/controllers/api';
      process.env['IWA-B2C-TENANT-ID']= 'iapsbxb2c.onmicrosoft.com';
      process.env['IWA-B2C-CLIENT-ID'] = '64bc0753-5d4a-41c4-ad18-79339558dde2';
      process.env['IWA-B2C-ISSUER-LINK']  = 'https://login.microsoftonline.com/';
      process.env['IWA-B2C-POLICY-NAME'] = 'B2C_1_agentsignupsignin';
      process.env.AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=iapstrg01dv;AccountKey=S699s8ewyXxWaZjGbT9x5NGMJ2UUJICFu+rh8M83WwAldFI7xpcK1w1Kc9ei/044l247LUiqFPNl1IL9qxpHEA==;EndpointSuffix=core.windows.net";
      //process.env.AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=iapsbxblobstore;AccountKey=jrtXnLtQv+A2pYPRAcFW0F2VcvRqPUrCIZs636G5qzNBRus1+1hmqJdB9+1t3bmRxG+HrbXB8pL2pNtZ4w6CWw==;EndpointSuffix=core.windows.net";
      //process.env.AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=iapstrg01dv;AccountKey=S699s8ewyXxWaZjGbT9x5NGMJ2UUJICFu+rh8M83WwAldFI7xpcK1w1Kc9ei/044l247LUiqFPNl1IL9qxpHEA==;EndpointSuffix=core.windows.net";
    }

    this.loadConstantsFromEnvironmentFile();
  }

  public getisLocal() {
    return this.isLocal;
  }

  public loadConstantsFromEnvironmentFile() {
    console.log("Loading Environment Variables");

    this.keyValueMap = new Map();

    for (let i = 0; i < keyNames.length; i++) {
      this.keyValueMap.set(keyNames[i], process.env[keyNames[i]]);
      console.log("loaded " + keyNames[i] + " as: " +  process.env[keyNames[i]]);
    }

    console.log("Environment Variables load complete");
  }

  public getValueMap() {
    return this.keyValueMap;
  }
}
