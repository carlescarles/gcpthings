var jwt = require('jsonwebtoken');
const axios = require('axios');

var privatekey = (`
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG0Q3AHcdKH/Ih/JuwmFd6fAIaQ77hzdsJ1DvVdhzfPTdLKDTeKZjoXoeaiEnhiWAUML3HFbbAkBqJm4yIlVPdklOrF8bOZ/hs/3Utir6YrUjRRdWfO4TKohxmS653rAqPekuwp2XiZOobHgM6L14FmZsH64mixgbU+zk2dEhMiMXpWFAgMBAAECggEAB7pIwgQm1goSMnXSb3azvBU895RrSFCgi0frSbWG62SWvQ+PjgT0DYDrNA7BPE9vEXOQXGhc5OWye+//emhwJwWFlZGrOL/JXJKxDd62TB77XmiiQ661A4PED9ajoVfwk7Hg8LKorOwpiyrpH7QY+1zzMkKKs1/2AR8GKaLCPlpgRD5vQy8NyeDFOcsVKJE6gt7kiPJJCf38VH3zHDbXMaxh4pQY+L4DBggzbe8FFOBuafzep9bT1P6A9FM9fypoCxeFgPT8UOKhTxprkP8RO1nPvNTxngKK57s8CZmxZXoOdM9CzdnWUMYLR1Mv86So71rNjIa6PRFXfqJH4h43yQKBgQDf7VEsw8wZVM8K3zS3ztGIQdVOCReHE2g2ylTLfCYrvbEjsbI821HeitikIQaIxeMNPOz3hRn7Ji443sv9wPa7F32YTKBrbBo2hhwNLHgVjyCRbxJ7Gqlpshj4isDcMfsNDIc0ZBiw+wKy/7S/REexysKUAQr9aw2ddc7qAQC3gwKBgQDeu+dXx0ZjHgX+JXPDKKPEQ6i9cRqZ5RSrmf0FCE+a+Qs28QMYiImPYiY3q9WiV+j80JY/KoukxIuC4CRJ2UWZIuMbTJCIvoknoFLFEaDaeB6da2DVgxPdrXkaQalbQccRvaYix3dQZA32SnFvcF57xz67xFP1DL2QOYFRg7FoVwKBgQC4MkmEria0a5vH0KVX0Utwbt7cSwRMez1NXI/1tlDbyDTvLJt2Dd7BVasxD22FkmnbmNNAI/+kJNr+st5QBKuwaHlKjzWiR5Ekapqmh37cFRjwKNKl6t+Sbwq1X8WXG5HsQPLyuKfK5R9qSIbQkoT7DdOS1WzJ2oafkKm8uUhyqwKBgHghWoYiaZk98TeA1a31tlY9s73xScqlHn/rPuc+80h/eAf695N82MynwDsYh9HWnkf07IRHGygUBbbh01CtSfdtNJZdtjq6oVjpBJtbhakvTjvTVVfzKXzPelip/4DDum2cHwX1FSobvNgQkJvtPFiAPxqgqjOp2nf2PAROBhpjAoGAQKFebGGdYFLaUurUk46LzCezojrU1iivuHr10Y4EaujbJz2FZYJ+INZwRZu7Ivhg3MWG4bvj7Px0OgZcDHwV/DOofYUWarCPhShMf5C46BpMEanyIifvOCqcHnPAWSKlKGPgayjmAIztM5QFQWoYQ7cXK+WaHOm+RMP4klur8uw=
-----END PRIVATE KEY-----
`);

var date = new Date();
var iat_new = Math.floor(date.getTime()/1000.0);
var exp_new = iat_new + 180;

var payload = (`{
  "iss" : "hello-87@.com",
  "sub" : "hello-87@.com",
  "aud" : "https://www.googleapis.com/oauth2/v4/token",
  "target_audience" : "https://your_cloudRun_URL.app",
  "exp": `+exp_new+`,
  "iat": `+iat_new+`
}`);

var jwt_token = jwt.sign(payload, privatekey, { algorithm: 'RS256', header:{"typ":"JWT"} });
console.log(`Bearer ${jwt_token}`,);

axios.post('https://www.googleapis.com/oauth2/v4/token', {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt_token
  },{
      headers: {
        'Authorization': `Bearer ${jwt_token}`
      }
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });

