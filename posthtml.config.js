require('dotenv').config({ path: '.env' });
const fs = require('fs');

const locals = {
  "PROJECT_NAME": process.env.PROJECT_NAME,
  "TENANT_URL": process.env.TENANT_URL,
  "APP_ID": process.env.APP_ID,
  "WEB_INTEGRATION_ID": process.env.WEB_INTEGRATION_ID,
  "OAUTH_CLIENT_ID": process.env.OAUTH_CLIENT_ID,
  "OAUTH_CLIENT_SECRET": process.env.OAUTH_CLIENT_SECRET,
  "ASSISTANT_ID": process.env.ASSISTANT_ID,
  "REDIRECT_URI": process.env.REDIRECT_URI,
  "FACTORY_AUTOMATION_ID": process.env.FACTORY_AUTOMATION_ID,
  "FACTORY_AUTOMATION_KEY": process.env.FACTORY_AUTOMATION_KEY,
  "AI_KEY": process.env.AI_KEY,
  "AI_URI": process.env.AI_URI,
  "AI_MODEL": process.env.AI_MODEL,
  "API_QS_KEY": process.env.API_QS_KEY
};

// Read the existing .posthtmlrc file
const posthtmlrcPath = '.posthtmlrc';
const posthtmlrc = JSON.parse(fs.readFileSync(posthtmlrcPath, 'utf8'));

// Update the locals in the .posthtmlrc file
posthtmlrc.plugins['posthtml-expressions'].locals = locals;

// Write the updated .posthtmlrc file back to disk
fs.writeFileSync(posthtmlrcPath, JSON.stringify(posthtmlrc, null, 2));
