
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const tenantUrl = process.env.TENANT_URL;
const AssistantId = process.env.ASSISTANT_ID;
const apiQsKey = process.env.API_QS_KEY
const authClientId = process.env.OAUTH_CLIENT_ID
const authClientSecret = process.env.OAUTH_CLIENT_SECRET

//=====  Generative call  ===============================================================

export default class qlikCallAnwsers {

    constructor() { console.log('constructor . .. '); }

    async generatePrompt(userPrompt) {

        // send the promt
        try {
            console.log(userPrompt);

            const credentials = btoa(`${authClientId}:${authClientSecret}`);

            const response = await fetch(`${tenantUrl}/api/v1/assistants/${AssistantId}/threads`, {
                method: 'POST',
                headers: {
                  'Authorization': `Basic ${credentials}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grant_type: 'client_credentials' })
            });

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error(`Erreur lors de l'appel à l'API Qlik Answers: ${error.message}`);
            response.status(500).json({ error: 'Prompt generation Error.' });
        }
    }

}

