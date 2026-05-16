export const sponsorsPage = {
  name: 'sponsorsPage',
  title: 'Sponsors Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'localeString',
      description: 'e.g., SPONSORS',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
      description: 'e.g., THANK YOU TO ALL WHO SUPPORTED US...',
    },
    {
      name: 'introText',
      title: 'Intro & Highlight Texts',
      type: 'localeBlock',
      description: 'All text between the subtitle and the sponsor tiers. You can use the "Text Color" option in the editor to colorize words.',
    },
    {
      name: 'sponsorTiers',
      title: 'Sponsor Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'tierName', title: 'Tier Name (e.g. PLATINUM)', type: 'localeString' },
            {
              name: 'logos',
              title: 'Sponsor Logos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'logo', title: 'Logo', type: 'cloudinary.asset' },
                    { name: 'url', title: 'Website URL', type: 'url' },
                    { name: 'alt', title: 'Alt Text / Sponsor Name', type: 'string' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'benefitsSectionTitle',
      title: 'Outro Section Title',
      type: 'localeString',
      description: 'e.g., Fuel us with your energy — we move as one.',
    },
    {
      name: 'outroText',
      title: 'Outro / Benefits Text',
      type: 'localeBlock',
      description: 'Single text box for all text below the sponsors. Use the style dropdown to choose headings (H3, H4) or align specific blocks to the right (Sağa Yasla variations).',
    }
  ]
}
