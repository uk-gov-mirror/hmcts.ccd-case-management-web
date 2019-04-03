const execSync = require('child_process').execSync;

module.exports = [
  {
    context: [
      '/documents'
    ],
    target: 'http://localhost:3453',
  },
  {
    context: [
      '/api'
    ],
    target: 'http://localhost:3453',
  }
];
