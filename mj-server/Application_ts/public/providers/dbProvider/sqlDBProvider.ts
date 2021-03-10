// import * as sql from 'mssql';
// const dotenv = require('dotenv');
// dotenv.config();
const {poolPromise} = require('./sqlDBConnection');
// This is the database's driver.

// It contains methods that executes queries or stored procedures.

export class SQLDBProvider {
  private config: any;

  constructor() {}

  public async getConnection(): Promise<any> {
    const pool = await poolPromise;
  }

  public async executeQuery(insertQuery, inputParameters = []): Promise<any> {
    //const pool = await this.getConnection();
    const pool = await poolPromise;
    const request = await pool.request();

    inputParameters.forEach(function(p) {
      request.input(p.name, p.dataType, p.value);
    });

    return request.query(insertQuery);
  }
  public async executeSP(procedureName: string): Promise<any> {
    const pool = await poolPromise;
    const request = await pool.request();

    return request.query(procedureName);
  }

  public async executeSPWithParameters(procedureName: string, inputParameters: any[]): Promise<any> {
    const pool = await poolPromise;
    const request = await pool.request();

    inputParameters.forEach(function(p) {
      request.input(p.name, p.dataType, p.value);
    });

    return request.execute(procedureName);
  }

  public async executeSPWithParametersAndOutputParameter(
    procedureName: string,
    inputParameters: any[],
    outputParameters: any[]
  ): Promise<any> {
    const pool = await poolPromise;
    const request = await pool.request();

    inputParameters.forEach(function(p) {
      request.input(p.name, p.dataType, p.value);
    });

    outputParameters.forEach(function(p) {
      request.output(p.name, p.dataType, p.value);
    });

    return request.execute(procedureName);
  }
}
