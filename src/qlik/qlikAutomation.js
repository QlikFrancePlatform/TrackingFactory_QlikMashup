// Import the dotenv package to load environment variables from a .env file
import dotenv from 'dotenv';
// Load environment variables from the specified .env file
dotenv.config({ path: '../../.env' });

// Retrieve the tenant URL from the environment variables
const tenantUrl = process.env.TENANT_URL;
// Retrieve the factory automation ID from the environment variables
const factoryAutomationId = process.env.FACTORY_AUTOMATION_ID;
// Retrieve the factory automation token from the environment variables
const factoryAutomationToken = process.env.FACTORY_AUTOMATION_TOKEN;

// Import the request module for making HTTP requests
const request = require('request');

// Define and export the qlikCallAutomation class
export default class qlikCallAutomation {

  // Constructor method
  constructor() {
    console.log('constructor . .. ');
  }

  // Method to run the factory task assignment automation
  async runFactoryTaskAssignment(body) {
    // Send the body to the automation endpoint
    try {
      // Define the options for the HTTP request
      var options = {
        'method': 'POST',
        'url': `${tenantUrl}/api/v1/automations/${factoryAutomationId}/actions/execute`,
        'headers': {
          'X-Execution-Token': `${factoryAutomationToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };

      // Make the HTTP request
      request(options, function (error, res) {
        if (error) throw new Error(error);
        console.log(res.body);
      });

    } catch (error) {
      // Log any errors that occur during the request
      console.error(`Error during the Automation call: ${error.message}`);
    }
  }
}
