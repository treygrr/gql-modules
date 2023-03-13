import type { CodegenConfig } from '@graphql-codegen/cli'
const config: CodegenConfig = {
  schema: './src/gql/schema.graphql',
  documents: ['**/*.gql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true
      }
    },
    './src/gql/graphql-operations.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node']
    },
    './src/gql/generated-modules.d.ts': {
      plugins: ['GqlFileGenerator'],
      config: {
        typedDocumentNodeLocation: './src/gql/graphql-operations',
      }
    }
  }
}
 
export default config