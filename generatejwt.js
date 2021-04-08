// 1) "npm install jsonwebtoken" or alternatively import jsonwebtoken libraries and or dependencies
var jwt = require('jsonwebtoken');

//2) paste your private key from the json key file that you obtain after creating a key for a service account. Fake key below ;)
var privatekey = (`
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBaxxrzc9IcJc2+eDxAmaAI4s457u++5P8df5ZVnCYXFySmaruJMoKCzRYL+P+k9ZSvAhQVdw44fm6X/OQHOmePIrKeKmLfZcQxRODqW5lxvY3mGu51BYLRT0NAez7zAjoExShJ14rOKfA2/2J16kQWkVXlqECJeOkdLQTQeLheR0dOvbVOSBW3wKBgQDWrAs4Vp1QSk+LWrWxGA2vUM8PY2QsAZhYIQBQ7KQSxHgie1mekfpXvVYmH1OK/Npclag0Bpufy5gOLlPM4AK/jsL9dM/hoRhdfE+kMPYiyKYGsLYBBwNQB9dsY30BHFGpVaggVaAAwTUTkfrXcGtf7605D9T/SJLmvNUt0HIVeQKBgARyY1ZzkJzmBu+zXHIH3ZZCGZ5KLCTSJOiO08EN8IVVxk+ALT68MrOypwOrSBfOGcz9RUlm+93ZgTY8DfFxBXNL2RoZxt8WQgCmQepKo0r4qCy/yCCQf+iNz2VHbC6jCoIyc9Izi9u7hFwbXjLHs92WLFfca9VbdOa91Qvpx2dJAoGBAKsN6d7ZfX6lx95VyGM1tGnW7TbozsAWAUtv+G2DMnXV4ZgwS8gDr8RMFSJJYetk8aZGhgH2pfjdZOsf1Rxx/x6eZhdKBf9WuzB6xochkG9FDK5WDqCg8u3JYcl3OPsykotoupARSm5vhZhzgLo8VQLb216Vk/Za4NtE6mUYLF+ZAoGBAMASQsP7fg1cXWsNf1BcRQSLOqTlv00vXI+rW8zch5NPycLb118t2Zb2sihSEGHMJnF+Herl0DyQNVj+Ts9MKotthJWtd+sGZH2YYoQzkDfaVZz4fwLBpUC95RJuFWM73JfL0HxT9nrOWaAwd4D0hApPjifeFtDPjNkxAEM2tACg
-----END PRIVATE KEY-----
`);

//3) obtain the key id from the Google Cloud settings 
var kid = ('04887460000000000ed5b63e1f1');

// calculate current time and future expire time. you can change the 180 (3minutes) for another value up to 3600 (1hr) for the validity of the token. 
var date = new Date();
var iat_new = Math.floor(date.getTime()/1000.0);
var exp_new = iat_new + 180;

// Create the payload 
// iss and sub is the email address of the service account
// aud for the API that we attempt to use
// exp and iat for issue and expiry time
var payload = (`{
  "iss" : "something_here@project_id_here.iam.gserviceaccount.com", 
  "sub" : "something_here@project_id_here.iam.gserviceaccount.com", 
  "aud" : "https://firestore.googleapis.com/",
  "exp": `+exp_new+`,
  "iat": `+iat_new+`
}`);

// finally the token is signed and generated 
var token = jwt.sign(payload, privatekey, { algorithm: 'RS256', keyid: kid });
