export const vehicle = {
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'heroImage',
      title: 'Hero Image (tekli)',
      type: 'cloudinary.asset',
      description: 'Ana hero görsel. Çoklu heroImages doluysa bu kullanılmaz.',
    },
    {
      name: 'heroImages',
      title: 'Hero Images (coklu)',
      type: 'array',
      of: [{type: 'cloudinary.asset'}],
      description: 'Carousel için birden fazla büyük fotoğraf. En az 1 eklenirse carousel aktif olur.',
    },
    {
      name: 'races',
      title: 'Races',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'logo', title: 'Logo', type: 'cloudinary.asset'},
            {name: 'name', title: 'Race Name', type: 'localeString'},
            {name: 'url', title: 'Website URL', type: 'url'}
          ]
        }
      ]
    },
    {
      name: 'specs',
      title: 'Technical Specs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label (e.g. HIZLANMA)', type: 'localeString'},
            {name: 'value', title: 'Value (e.g. 2.4 sn)', type: 'string'}
          ]
        }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeBlock'
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'cloudinary.asset'}],
    },
    {
      name: 'sponsorTiers',
      title: 'Sponsor Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'tierName', title: 'Tier Name (e.g. Platin)', type: 'localeString'},
            {
              name: 'logos',
              title: 'Sponsor Logos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'logo', title: 'Logo', type: 'cloudinary.asset'},
                    {name: 'url', title: 'Website URL', type: 'url'}
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
