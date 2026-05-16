export default {
  name: 'formulaStudentPage',
  title: 'Formula Student Page',
  type: 'document',
  fields: [
    {
      name: 'intro',
      title: 'Introductory Paragraph',
      type: 'localeBlock',
      description: 'The main introductory text at the top of the page.'
    },
    {
      name: 'teamPhoto',
      title: 'Team Photo',
      type: 'cloudinary.asset',
      description: 'The large group photo displayed below the intro.'
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add sections like "Statik Etaplar" or "Dinamik Etaplar".',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'sectionTitle',
              title: 'Section Title',
              type: 'localeString',
              description: 'e.g. "Statik Etaplar"'
            },
            {
              name: 'events',
              title: 'Events / Subsections',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Event Title',
                      type: 'localeString',
                      description: 'e.g. "İş Planı Sunumu"'
                    },
                    {
                      name: 'content',
                      title: 'Event Description',
                      type: 'localeBlock'
                    },
                    {
                      name: 'image',
                      title: 'Event Image',
                      type: 'cloudinary.asset'
                    },
                    {
                      name: 'imageSide',
                      title: 'Image Position',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'None (Text Only)', value: 'none' },
                          { title: 'Left of Text', value: 'left' },
                          { title: 'Right of Text', value: 'right' }
                        ],
                        layout: 'radio'
                      },
                      initialValue: 'none'
                    }
                  ],
                  preview: {
                    select: {
                      title: 'title.tr',
                      subtitle: 'imageSide'
                    }
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'sectionTitle.tr'
            }
          }
        }
      ]
    }
  ]
}
