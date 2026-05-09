export const localeString = {
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fields: [
    {
      title: 'Turkish',
      name: 'tr',
      type: 'string'
    },
    {
      title: 'English',
      name: 'en',
      type: 'string'
    }
  ]
}

export const localeBlock = {
  title: 'Localized Portable Text',
  name: 'localeBlock',
  type: 'object',
  fields: [
    {
      title: 'Turkish',
      name: 'tr',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      title: 'English',
      name: 'en',
      type: 'array',
      of: [{type: 'block'}]
    }
  ]
}
