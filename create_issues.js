// create_issues.js
const fetch = require('node-fetch');
const fs = require('fs');

const owner = 'YOUR_GITHUB_USERNAME'; // เช่น Outsideking
const repo = 'scanzaclip-admin';      // ชื่อ repo
const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.error('Please set GITHUB_TOKEN env var');
  process.exit(1);
}

const tickets = JSON.parse(fs.readFileSync('tickets.json', 'utf8'));

async function createIssue(issue) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github+json'
    },
    body: JSON.stringify({ title: issue.title, body: issue.body })
  });
  const data = await res.json();
  console.log('Created:', data.html_url || data);
}

(async () => {
  for (const t of tickets) {
    await createIssue(t);
  }
})();
