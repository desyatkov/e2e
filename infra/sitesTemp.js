const { spawn } = require('child_process');
const pyprog = spawn('python3',["./infra/get-urls.py", "https://www.betterplay.com"] );

pyprog.stdout.on('data', (data) => {
  console.log(JSON.parse(data).data);
});

pyprog.stderr.on('data', (data) => {
  console.log(data.toString());
});

