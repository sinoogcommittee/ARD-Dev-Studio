import { createServer } from 'vite';

const server = await createServer({ server: { port: 5555, host: '127.0.0.1' } });
const info = await server.listen();
const addr = server.httpServer.address();
console.log('Listening on:', addr);

// Use Node's http module directly since fetch can't bind in this sandbox env
import http from 'http';
const text = await new Promise((resolve, reject) => {
  http.get(`http://127.0.0.1:${addr.port}/`, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
    res.on('error', reject);
  }).on('error', reject);
});

const checks = {
  'Has root div':      text.includes('id="root"'),
  'Has page title':    text.includes('Anthony Riel C. Diango'),
  'Has module script': text.includes('type="module"'),
  'Has lang=en':       text.includes('lang="en"'),
  'Has meta viewport': text.includes('viewport'),
};

await server.close();

let fail = 0;
for (const [label, ok] of Object.entries(checks)) {
  console.log(ok ? 'PASS' : 'FAIL', label);
  if (!ok) fail++;
}

process.exit(fail > 0 ? 1 : 0);
