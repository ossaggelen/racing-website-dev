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
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Normal (Sağa Yasla)', value: 'normalRight'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H3 (Sağa Yasla)', value: 'h3Right'},
            {title: 'H4', value: 'h4'},
            {title: 'H4 (Sağa Yasla)', value: 'h4Right'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            annotations: [
              {
                name: 'textColor',
                title: 'Text Color',
                type: 'object',
                fields: [
                  {
                    name: 'value',
                    title: 'Color',
                    type: 'string',
                    description: 'Hex color code (e.g. for blue: #24acb7, for red: #ed3007) or CSS color name'
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      title: 'English',
      name: 'en',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Normal (Sağa Yasla)', value: 'normalRight'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H3 (Sağa Yasla)', value: 'h3Right'},
            {title: 'H4', value: 'h4'},
            {title: 'H4 (Sağa Yasla)', value: 'h4Right'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            annotations: [
              {
                name: 'textColor',
                title: 'Text Color',
                type: 'object',
                fields: [
                  {
                    name: 'value',
                    title: 'Color',
                    type: 'string',
                    description: 'Hex color code (e.g. for blue: #24acb7, for red: #ed3007) or CSS color name'
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  ]
}


