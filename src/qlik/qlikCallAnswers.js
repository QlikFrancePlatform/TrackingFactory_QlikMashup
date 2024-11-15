
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const tenantUrl = process.env.TENANT_URL;
const AssistantId = process.env.ASSISTANT_ID;
const apiQsKey = process.env.API_QS_KEY

const request = require('request');

//=====  Generative call  ===============================================================

export default class qlikCallAnwsers {

    constructor() { console.log('constructor . .. '); }

    async generatePrompt(userPrompt) {

        // send the promt
        try {
            console.log(userPrompt);
            var options = {
                'method': 'POST',
                'url': `${tenantUrl}/api/v1/assistants/${AssistantId}/threads`,
                'headers': {
                  'Authorization': `Bearer ${apiQsKey}`,
                  'Content-Type': 'application/json'
                }
            };

            request(options, function (error, res) {
                console.log(res);
                if (error) throw new Error(error);
                    console.log(res.body);
            });

        } catch (error) {
            console.error(`Erreur lors de l'appel à l'API Qlik Answers: ${error.message}`);
            response.status(500).json({ error: 'Prompt generation Error.' });
        }
    }

}

