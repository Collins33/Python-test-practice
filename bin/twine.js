#! /usr/bin/env node

const CredentialsManager = require('../lib/credentialManager.js');

const main = async () => {
  const credentials = new CredentialsManager('twine');
  const [key, secret] = await credentials.getKeyAndSecret();
  console.log(key, secret);
};

main().catch(console.error);
