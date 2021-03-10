import { ServerConstants } from '../public/common/envConstants';

var Passport = require('passport').Passport;
var passport = new Passport();
var BearerStrategy = require('passport-azure-ad').BearerStrategy;

// this line it is required to initialize process environment variables if running local
let constants = new ServerConstants();

var tenantID = process.env['IWA-B2C-TENANT-ID'];
var clientID = process.env['IWA-B2C-CLIENT-ID'];
var policyName = process.env['IWA-B2C-POLICY-NAME'];
var issuerName = process.env['IWA-B2C-ISSUER-LINK'];

var options = {
    identityMetadata: issuerName + tenantID + "/v2.0/.well-known/openid-configuration/",
    clientID: clientID,
    policyName: policyName,
    isB2C: true,
    validateIssuer: true,
    loggingLevel: 'info',
    passReqToCallback: false
};


var bearerStrategy = new BearerStrategy(options, function(token, done) {
  // Send user info using the second argument
  done(null, {}, token);
});

passport.initialize();
passport.use(bearerStrategy);

module.exports =
  function(req, res, next) {
        return passport.authenticate(
          'oauth-bearer',
          {
            session: false
          },
          (err, user, info) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            if (!user) {
              res.status(401);
              res.json({
                status: 'error',
                error: 'UNAUTHORIZED_USER'
              })
              return res;
            }
            // Forward user information to the next middleware
            req.authInfo = {
              oid: info.oid,
              email: info.emails[0],
              name: info.name
            };           
            next();
          }
        )(req, res, next);

  
  };
