import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'

import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'ITU Racing Studio',

  projectId: '7898q55i',
  dataset: 'production',

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
            ...S.documentTypeListItems().filter(
              (listItem) => !['settings'].includes(listItem.getId())
            ),
          ]),
    }),
    cloudinarySchemaPlugin()
  ],

  schema: {
    types: schemaTypes,
  },
})
