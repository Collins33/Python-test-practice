const Configstore = require('configstore');
const inquirer = require('inquirer');
const keytar = require('keytar-prebuild');


class CredentialsManager {
  constructor(name) {
    this.conf = new Configstore(name);
    // name used to create the class will be used to retrieve from keytar
    this.service = name;
  }

  async getKeyAndSecret() {
    const key = this.conf.get('apiKey');
    if (key) {
      // retrieve api secret fromthe keychain
      const secret = await keytar.getPassword(this.service, key);
      return [key, secret];
    }
    const answers = await inquirer.prompt([
      { type: 'input', name: 'key', message: 'Enter twitter API key: ' },
      { type: 'password', name: 'secret', message: 'Enter your twitter API Secret' },
    ]);
    this.conf.set('apiKey', answers.key);
    // save api secret to keytar
    // will store sensitive info in the keychain
    await keytar.setPassword(this.service, answers.key, answers.secret);
    return [answers.key, answers.secret];
  }

  async clearKeyAndSecret() {
    const key = this.conf.get('apiKey');
    this.conf.delete('apiKey');
    await keytar.deletePassword(this.service, key);
  }
}

module.exports = CredentialsManager;
