const Configstore = require('configstore');
const inquirer = require('inquirer');

class CredentialsManager {
  constructor(name) {
    this.conf = new Configstore(name);
  }

  async getKeyAndSecret() {
    const key = this.conf.get('apiKey');
    if (key) {
      const secret = this.conf.get('apiSecret');
      return [key, secret];
    }
    const answers = await inquirer.prompt([
      { type: 'input', name: 'key', message: 'Enter twitter API key: ' },
      { type: 'password', name: 'secret', message: 'Enter your twitter API Secret' },
    ]);
    this.conf.set('apiKey', answers.key);
    this.conf.set('apiSecret', answers.secret);
    return [answers.key, answers.secret];
  }
}

module.exports = CredentialsManager;
