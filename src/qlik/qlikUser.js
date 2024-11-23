// Import the dotenv package to load environment variables from a .env file
import dotenv from 'dotenv';
// Load environment variables from the specified .env file
dotenv.config({ path: '../../.env' });

// Retrieve the tenant URL from the environment variables
const tenantUrl = process.env.TENANT_URL;

/**
 * The OAuth client ID used for authentication.
 * This value is retrieved from the environment variable `OAUTH_CLIENT_ID`.
 *
 * @constant {string} oauthClient
 */
const oauthClient = process.env.OAUTH_CLIENT_ID;

// Retrieve the redirect URI from the environment variables
const redirectUri = process.env.REDIRECT_URI;

// Import the auth and users modules from the Qlik API
import { auth, users } from "@qlik/api";

// Immediately Invoked Async Function Expression (IIFE)
(async () => {
  // Wait for 2 seconds
  await new Promise(r => setTimeout(r, 2000));

  // Set default host configuration for authentication
  auth.setDefaultHostConfig({
    host: tenantUrl,
    // authType: "Oauth2", // This line is commented out, indicating that OAuth2 is not currently used
    clientId: oauthClient,
    redirectUri: redirectUri,
    accessTokenStorage: "session", // Store the access token in the session storage
    autoRedirect: true, // Automatically redirect for authentication if needed
  });

  try {
    // Fetch the current user's information
    const username = await users.getMyUser(auth);

    // Extract the user's name from the response
    const userName = username.data.name;

    // Display the user's name in the HTML element with ID 'userName'
    document.getElementById('userName').innerHTML = userName;

  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching user information:', error);
  }
})();
