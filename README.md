# gcpthings
Functional codes for the GCP world 

In this repository you can find functional pieces of code related to the Google Cloud Platform 

## 1. generate_JWT.js
This node / js code will allow you to generate a signed JWT for Google APIs. You can read more about Server to Server communications for GCP [here](https://developers.google.com/identity/protocols/oauth2/service-account) For the library jsonwebtoken used in the code refer to [here](https://jwt.io)


## 2. generate_FirebaseTokenID.js
This node / js code will allow you to generate a Firebase Token ID. First creating a [custom token](https://firebase.google.com/docs/auth/admin/create-custom-tokens#create_custom_tokens_using_a_third-party_jwt_library) with a third-party JWT library. After exchanging the custom created token for an [ ID and refresh token ](https://firebase.google.com/docs/reference/rest/auth#section-refresh-token)


