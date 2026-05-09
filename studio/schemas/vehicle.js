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
      title: 'Hero Image (3D Render)',
      type: 'cloudinary.asset',
      description: 'Select image directly from Cloudinary',
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'cloudinary.asset'}],
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
            {name: 'name', title: 'Race Name', type: 'localeString'}
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
              of: [{type: 'cloudinary.asset'}]
            }
          ]
        }
      ]
    }
  ]
}
