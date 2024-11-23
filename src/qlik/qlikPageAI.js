import qlikCallAI from './qlikCallAI.js';

// Create an instance of qlikCallAI
const qlikInstance = new qlikCallAI();

// Function to introduce a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  // Wait for 2 seconds
  await delay(2000);

  // Function to handle the click event for generating AI responses
  const handleGenerativeAISubmit = async () => {
    console.log('ask for generation');

    // Retrieve the value from the input field
    const userPrompt = document.getElementById('generativeAIPrompt').value;

    try {
        // Show the loader while fetching answers
        const loaderAnswers = document.getElementById('loaderAnswers');
        if (loaderAnswers) {
            loaderAnswers.style.display = "block";
        }

        // Fetch answers from the AI instance
        const answers = await qlikInstance.generatePromptAnswers(userPrompt);

        // Insert qlik-embed tags into the container
        const embedsContainer = document.getElementById('generatiAnswersContainerId');
        embedsContainer.innerHTML = ''; // Clear previous results

        const colClass = 'col';
        answers.embedTags.forEach((tag, index) => {
            addEmbedToContainer(embedsContainer, colClass, tag, index);
        });

        addTextToContainer(embedsContainer, colClass, answers.explanatoryText);

    } catch (error) {
        console.error('Error fetching AI answers:', error);
    }

    try {
        // Show the loader while generating prompt
        const loaderAI = document.getElementById('loaderAI');
        if (loaderAI) {
            loaderAI.style.display = "block";
        }

        // Generate prompt from the AI instance
        const response = await qlikInstance.generatePrompt(userPrompt);

        // Insert qlik-embed tags into the container
        const embedsContainer = document.getElementById('generativeAIContainerId');
        if (embedsContainer) {
            embedsContainer.innerHTML = ''; // Clear previous results

            const colClass = 'col';
            response.embedTags.forEach((tag, index) => {
                addEmbedToContainer(embedsContainer, colClass, tag, index);
            });

            addTextToContainer(embedsContainer, colClass, response.explanatoryText);
        } else {
            console.error('Element generativeAIContainerId not found');
        }

        if (loaderAI) {
            loaderAI.style.display = "none";
        }
        if (loaderAnswers) {
            loaderAnswers.style.display = "none";
        }

    } catch (error) {
        console.error('Error generating prompt:', error);
    }
  };

  // Utility function to add qlik-embed tags to the container
  const addEmbedToContainer = (container, colClass, tag, index) => {
    const divElement = document.createElement('div');
    divElement.classList.add(colClass);
    const divEmbed = document.createElement('div');
    divEmbed.classList.add('qlik-embed-generate', 'p-2');
    divEmbed.innerHTML = tag;
    const qe = divEmbed.getElementsByTagName('qlik-embed')[0];
    qe.setAttribute('id', 'qe' + index);
    divElement.appendChild(divEmbed);
    container.appendChild(divElement);
  };

  // Utility function to add explanatory text to the container
  const addTextToContainer = (container, colClass, text) => {
    const divElement = document.createElement('div');
    divElement.classList.add(colClass);
    const divEmbed = document.createElement('div');
    divEmbed.innerHTML = marked.parse(text);
    divElement.appendChild(divEmbed);
    container.appendChild(divElement);
  };

  // Add event listener to the submit button
  const sendPromptButton = document.getElementById('generativeAISubmit');
  if (sendPromptButton) {
    sendPromptButton.addEventListener("click", handleGenerativeAISubmit);
  } else {
    console.error('Button generativeAISubmit not found');
  }
})();
