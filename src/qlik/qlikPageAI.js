import qlikCallAI from './qlikCallAI.js';

const qlikInstance = new qlikCallAI();

(async () => {

  await new Promise(r => setTimeout(r, 2000));

    // ==============RealPrompt=========================
    //Ask for a content generation
    let sendPrompt = document.getElementById('generativeAISubmit');
    console.log(sendPrompt)

    sendPrompt.addEventListener("click", async function () {
        console.log('ask for generation');
        //retrieve values
        let userPrompt= document.getElementById('generativeAIPrompt').value;
        document.getElementById('loaderAI').style.display = "block";

        try{
            // const r = await qlikInstance.generatePromptAnswers(userPrompt);
            // console.log(r)

            const response = await qlikInstance.generatePrompt(userPrompt);

            // Insert qlik-embed tags
            const embedsContainer = document.getElementById('generativeAIContainerId');
            embedsContainer.innerHTML = ''; // Clear previous results

            colClass = 'col'
            document.getElementById('loaderAI').style.display = "none";
            response.embedTags.forEach((tag, index) => {
                const divElement = document.createElement('div');
                divElement.classList.add(colClass);
                const divEmbed = document.createElement('div');
                divEmbed.classList.add('qlik-embed-generate');
                divEmbed.classList.add('p-2');
                divEmbed.innerHTML = tag;
                const qe = divEmbed.getElementsByTagName('qlik-embed')[0];
                qe.setAttribute('id','qe'+index);
                divElement.appendChild(divEmbed);
                embedsContainer.appendChild(divElement);
            });

            const divElement = document.createElement('div');
            divElement.classList.add(colClass);
            const divEmbed = document.createElement('div');
            divEmbed.innerHTML = marked.parse(response.explanatoryText);
            divElement.appendChild(divEmbed);
            embedsContainer.appendChild(divElement);

        } catch (error) {
            console.error('Error:', error);
        }
    });

})();
