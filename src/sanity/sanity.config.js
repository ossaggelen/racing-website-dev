import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'

import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'ITU Racing Admin Panel',

  projectId: '7898q55i',
  dataset: 'production',

  basePath: '/admin',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
              ),
            S.listItem()
              .title('Home Page')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            ...S.documentTypeListItems().filter(
              (listItem) => !['settings', 'homePage'].includes(listItem.getId())
            ),
          ]),
    }),
    cloudinarySchemaPlugin()
  ],

  schema: {
    types: schemaTypes,
  },
})
