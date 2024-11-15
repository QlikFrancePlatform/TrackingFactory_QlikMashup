
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const tenantUrl = process.env.TENANT_URL;
const AssistantId = process.env.ASSISTANT_ID;
const apiQsKey = process.env.API_QS_KEY

//=====  Generative call  ===============================================================

export default class qlikCallAnwsers {

    constructor() { console.log('constructor . .. '); }

    async generatePrompt(userPrompt) {

        console.log('The prompt of the user : '+userPrompt);

        // send the promt
        try {
            const response = await fetch(`${tenantUrl}/api/v1/assistants/${AssistantId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiQsKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [{ content: userPrompt }]
                })
            });

            const data = await response.json();
            console.log(data);
            const assistantResponse = data.choices[0].message.content;
            console.log(assistantResponse);

            return { assistantResponse }
        } catch (error) {
            console.error(`Erreur lors de l'appel à l'API Qlik Answers: ${error.message}`);
            response.status(500).json({ error: 'Prompt generation Error.' });
        }
    }

}

