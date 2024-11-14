(async () => {

  await new Promise(r => setTimeout(r, 2000));

  const embeddedObject = document.getElementById("asDataAI");
  const refApi = await embeddedObject.getRefApi();
  const doc = await refApi.getDoc();
  const obj = await refApi.getObject();

  console.log(embeddedObject)
  console.log(refApi)
  console.log(doc)
  console.log(obj)


})();
