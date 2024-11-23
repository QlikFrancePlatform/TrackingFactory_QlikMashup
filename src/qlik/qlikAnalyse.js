import picassojs from "picasso.js";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    await delay(2000);

    // Function to set up KPI
    async function setupKpi(kpiId, displayId) {
        let kpiElement = document.getElementById(kpiId);
        const refApi = await kpiElement.getRefApi();
        const obj = await refApi.getObject();
        let displayElement = document.getElementById(displayId);

        let objLayout = await obj.getLayout();
        console.log(objLayout);
        let data = objLayout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
        displayElement.innerHTML = `${data}`;

        obj.on('changed', async () => {
            objLayout = await obj.getLayout();
            data = objLayout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
            displayElement.innerHTML = `${data}`;
        });
    }

    // Set up KPI1
    await setupKpi('kpi1', 'kpi1-display');

    // Set up KPI2
    await setupKpi('kpi2', 'kpi2-display');

    // Select button
    let selectButton = document.getElementById('selectField');
    let sButton = document.getElementById('qe1');
    const refApi = await sButton.getRefApi();
    const doc = await refApi.getDoc();
    const field = await doc.getField('Scrap');

    selectButton.addEventListener("click", async function () {
        console.log("select Valid in Scrap");
        try {
            const result = await field.selectValues([{qText: "Valid"}], true, true);
            console.log("Selection result:", result);
        } catch (error) {
            console.error("Error selecting 'Valid':", error);
        }
    });

    let machineList = ['Machine 1', 'Machine 2', 'Machine 3', 'Machine 4', 'Machine 5'];
    let headerElement = document.getElementById('header');

    machineList.forEach(machine => {
        let machineButton = document.createElement('button');
        machineButton.innerText = machine;
        machineButton.classList.add('machine-button');
        machineButton.classList.add('btn');
        machineButton.classList.add('btn-primary');
        machineButton.classList.add('mx-2');
        headerElement.appendChild(machineButton);

        machineButton.addEventListener("click", async function () {
            try {
                const machineField = await doc.getField("Machine Name");
                console.log(`select ${machine}`);
                const result = await machineField.selectValues([{qText: machine}], true, true);
                console.log(`Selection result for ${machine}:`, result);
            } catch (error) {
                console.error(`Error selecting ${machine}:`, error);
            }
        });
    });

    // list data Picasso js
    const obj = await refApi.getObject();
    let objLayout = await obj.getLayout();
    const data = objLayout.qHyperCube.qDataPages[0].qMatrix;
    data.forEach((row, index) => {
        const date = row[0].qText; // La date
        const percentage = row[2].qText; // Le pourcentage

        // console.log(`Ligne ${index + 1}:`);
        // console.log(`Date: ${date}, Pourcentage: ${percentage}`);
    });

    const formattedData = data.map(row => {
        return {
            Date: row[0].qText,
            Pourcentage: parseFloat(row[2].qText.replace('%', ''))/100
        };
    });

    picassoLine(formattedData);

    obj.on('changed', async () => {
        objLayout = await obj.getLayout();
        let data = objLayout.qHyperCube.qDataPages[0].qMatrix;
        data.forEach((row, index) => {
            // const date = row[0].qText;
            // const percentage = row[2].qText;
            // console.log(`Ligne ${index + 1}:`);
            // console.log(`Date: ${date}, Pourcentage: ${percentage}`);
        });

        let formattedData = data.map(row => {
            return {
                Date: row[0].qText, // Extraction de la date
                Pourcentage: parseFloat(row[2].qText)/100
            };
        });
        picassoLine(formattedData);
    });

    async function picassoLine(formattedData) {
        picassojs.chart({
            element: document.querySelector('#chartLine'),
            type: 'area',
            data: [
                {
                    type: 'matrix',
                    data: await formattedData,
                },
            ],
            settings: {
            scales: {
                y: {
                    data: { field: 'Pourcentage' },
                    invert: true,
                    expand: 0.2
                },
                t: { data: { extract: { field: 'Date' } } }
            },
            components: [{
                type: 'axis',
                dock: 'left',
                scale: 'y',
                formatter: {
                    type: 'd3-number',
                    format: '.2'
                },
            },{
                type: 'axis',
                dock: 'bottom',
                scale: 't',
                formatter: {
                type: 'd3-time',
                format: '%Y-%m'
                }
            }, {
                key: 'lines',
                type: 'line',
                data: {
                    extract: {
                        field: 'Date',
                        props: {
                        v: { field: 'Pourcentage' }
                        }
                    }
                },
                settings: {
                coordinates: {
                    major: { scale: 't' },
                    minor: { scale: 'y', ref: 'v' }
                },
                layers: {
                    curve: 'monotone',
                    line: {
                    show: false
                    },
                    area: {
                        fill: '#F7C17B',
                        fillOpacity: 0.3,
                    }
                }

                }
            },{
                type: 'point',
                data: {
                    extract: {
                    field: 'Date',
                    props: {
                        x: { field: 'Date' },
                        y: { field: 'Pourcentage' },
                    },
                    },
                },
                settings: {
                x: { scale: 't' },
                y: { scale: 'y' },
                size: 0.2,
                fill: '#F7C17B',
                stroke: '#000',
                strokeWidth: 1,
                },
            },]
            }
        })
    }

    // Delete the element by its ID
    const elementToDelete = document.getElementById('qlik-embed-container');
    const elementToDelete1 = document.getElementById('qlik-embed-container1');
    const elementKPI1 = document.getElementById('qlik-embed-kpi1');
    const elementKPI2 = document.getElementById('qlik-embed-kpi2');
    if (elementToDelete && elementToDelete1 && elementKPI1 && elementKPI2) {
        elementToDelete.remove();
        elementToDelete1.remove();
        elementKPI1.remove();
        elementKPI2.remove();
    }

})();



// (async () => {

//     await new Promise(r => setTimeout(r, 2000));

//     let selectButton = document.getElementById('selectField');
//     let sButton = document.getElementById('qe1');

//     const refApi = await sButton.getRefApi();
//     const doc = await refApi.getDoc();
//     const field = await doc.getField('Machine ID');

//     selectButton.addEventListener("click", async function () {
//         console.log("select 2 in Machine ID");
//         field.selectValues([1], true);
//     });

// })();
