
async function(context, variables) {
  const jwt = require('jsonwebtoken');   // we require both modules axios and jsonwebtoken 
  const axios = require('axios');

//paste your private key from the json key file that you obtain after creating a key for a service account. Fake key below ;)
var privatekey = (`
-----BEGIN PRIVATE KEY-----
MII567cgkqhkiG9w0BAQEFAA1234DPGty/sNKSFG4RdqJ1234cilZy09helloworlduljyZ+LaxxBruSYzBd1+AcwmvAn/Z4H4YRFy3wO1OOsOkjlodhdxu/dJqrzc9+Sr8+058G5NaezTnnHxYLMQX4rWCn5zFookBz3I7qLSwvJB8cl0CivCyAc1xO2U0g4NlLZGwdKzzie2UbcH+r2Kr6gr+CcoyKTuVop6TIX2uWGpkkvK19SYZ6tX8ZBbRIbJ2wFmym56nHgxPKkW3L+GW8VPskb08bUxIcJcfEGtv1O9+f9Ok2r6aGt1pnAgMBAAECggEABveZ4E8Ad1zS6uIJUh4QEKWJsZNyefu0QNgcDBHmunB59QsaICkuDUUvLegdEmua82D6uaf/0CjLZ/tffguYWs/EH4KvgAe/pbo6aGCqqGGMM6pw1s3ITsH7/0V6PkqOPpL3xw8WodRIc+veJChu5Lxh6VAg+pS1KiQmxU/cP09SYRuL/9dEMcmCOywQOS1q3C+CtxeGmibXzY5oOflK8g3Pr1/ERUjoKrOtQBqULffenNGFykr4ZJ4kk0EUzP/Jm06uSJr6xZ9YKk9lidPI3DvC0R5LZntZdqNuAEe2aPBGg6RE+rCwFXp/HxTqhLPoC+oTrJRGzcEWllTcP4bL6QKBgQD2+eDxAmaAI4s457u++5P8df5ZVnCYXFySmaruJMoKCzRYL+P+k9ZSvAhQVdw44fm6X/OQHOmePIrKeKmLfZcQxRODqW5lxvY3mGu51BYLRT0NAez7zAjoExShJ14rOKfA2/2J16kQWkVXlqECJeOkdLQTQeLheR0dOvbVOSBW3wKBgQDWrAs4Vp1QSk+LWrWxGA2vUM8PY2QsAZhYIQBQ7KQSxHgie1mekfpXvVYmH1OK/Npclag0Bpufy5gOLlPM4AK/jsL9dM/hoRhdfE+kMPYiyKYGsLYBBwNQB9dsY30BHFGpVaggVaAAwTUTkfrXcGtf7605D9T/SJLmvNUt0HIVeQKBgARyY1ZzkJzmBu+zXHIH3ZZCGZ5KLCTSJOiO08EN8IVVxk+ALT68MrOypwOrSBfOGcz9RUlm+93ZgTY8DfFxBXNL2RoZxt8WQgCmQepKo0r4qCy/yCCQf+iNz2VHbC6jCoIyc9Izi9u7hFwbXjLHs92WLFfca9VbdOa91Qvpx2dJAoGBAKsN6d7ZfX6lx95VyGM1tGnW7TbozsAWAUtv+G2DMnXV4ZgwS8gDr8RMFSJJYetk8aZGhgH2pfjdZOsf1Rxx/x6eZhdKBf9WuzB6xochkG9FDK5WDqCg8u3JYcl3OPsykotoupARSm5vhZhzgLo8VQLb216Vk/Za4NtE6mUYLF+ZAoGBAMASQsP7fg1cXWsNf1BcRQSLOqTlv00vXI+rW8zch5NPycLb118t2Zb2sihSEGHMJnF+Herl0DyQNVj+Ts9MKotthJWtd+sGZH2YYoQzkDfaVZz4fwLBpUC95RJuFWM73JfL0HxT9nrOWaAwd4D0hApPjifeFtDPjNkxAEM2tACg
-----END PRIVATE KEY-----
`);
  
// calculate current time and future expire time. you can change the 180 (3minutes) for another value up to 3600 (1hr) for the validity of the token
var date = new Date();
var iat_new = Math.floor(date.getTime()/1000.0);
var exp_new = iat_new + 180;


/*
iss : is the email address of the service account
scope : list of scopes that you want to grant access. to your application, as per the application consent page. USE SPACE TO SEPARATE
aud : url of token generation as per below
*/
var payload = (`{
  "iss" : "email@myproject.gserviceaccount.com",
  "scope" : "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/firebase.database",
  "aud" : "https://oauth2.googleapis.com/token",
  "exp": `+exp_new+`,
  "iat": `+iat_new+`
}`);

// first we create the custom access token 
var jwt_token = jwt.sign(payload, privatekey, { algorithm: 'RS256' });

// after we have to exchange it for a Firebase token ID 
const req = await axios.post('https://oauth2.googleapis.com/token', {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt_token
  });
 
 // finally we return the access token 
    return {
        accesstoken : req.data.access_token
    };
};
