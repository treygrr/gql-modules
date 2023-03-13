const path = require('path');

function generateModuleFromDefinition(definition, docLocation, typedDocumentNodeLocation) {
  const basepath = path.resolve(__dirname)
  // check if has src folder
  
  const relativeDocLocation = docLocation.replace(basepath, '')
  const pascalCaseName = definition.name.value[0].toUpperCase() + definition.name.value.slice(1)
  const FormattedInputName = `${pascalCaseName}Document`
  return `declare module '@${relativeDocLocation}${path.sep}${definition.name.value}.gql' {
    import { ${FormattedInputName} } from '${typedDocumentNodeLocation}'
    export default ${FormattedInputName};
  }`
}


module.exports = {
  plugin(schema, documents, config, info) {
    return documents
      .map(doc => {
        const docLocation = path.dirname(doc.location)
        const query = doc.document.definitions.filter(def => def?.operation === 'query')
        const mutation = doc.document.definitions.filter(def => def?.operation === 'mutation')
        const typedDocumentNodeLocation = config.typedDocumentNodeLocation;
        let generatedFileContents = ``
        if (query.length > 0) {
          query.forEach(def => {
            generatedFileContents += generateModuleFromDefinition(def, docLocation, typedDocumentNodeLocation)
          })
        }
        if (mutation.length > 0) {
          mutation.forEach(def => {
            generatedFileContents += generateModuleFromDefinition(def, docLocation, typedDocumentNodeLocation)
          })
        }
        return generatedFileContents
      })
      .join('\n')
  },
  // clean the above code up
}