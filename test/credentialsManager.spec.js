const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const inquirer = require('inquirer');
const CredentialsManager = require('../lib/credentialManager.js');

describe('a credentials manager', () => {
  let credentials;
  before(() => {
    credentials = new CredentialsManager('twine-test');
  });
  it('should prompt the user if no credentials exist', async () => {
    // create stub for the inquirer prompt method
    sinon.stub(inquirer, 'prompt').resolves({ key: 'foo', secret: 'bar' });
    const [key, secret] = await credentials.getKeyAndSecret();
    expect(key).to.equal('foo');
    expect(secret).to.equal('bar');
    inquirer.prompt.restoreDefaultPrompts();
  });

  it('should return credentials if they already exist', async () => {
    const [key, secret] = await credentials.getKeyAndSecret();
    expect(key).to.equal('foo');
    expect(secret).to.equal('bar');
  });
  after(() => {
    credentials.conf.delete('apiKey');
    credentials.conf.delete('apiSecret');
  });
});
