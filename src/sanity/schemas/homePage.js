export const homePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'localeString',
      description: 'The text under the main ITU RACING title.'
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'localeString',
      description: 'Usually "Hakkımızda" / "About Us"'
    },
    {
      name: 'aboutIntro',
      title: 'About Intro Text',
      type: 'localeBlock'
    },
    {
      name: 'parallaxImage',
      title: 'Parallax Break Image',
      type: 'cloudinary.asset',
      description: 'Image shown with a dynamic scroll effect between About and Mission/Vision sections.'
    },
    {
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'localeString'
    },
    {
      name: 'missionText',
      title: 'Mission Text',
      type: 'localeBlock'
    },
    {
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'localeString'
    },
    {
      name: 'visionText',
      title: 'Vision Text',
      type: 'localeBlock'
    },
    {
      name: 'formulaStudentTitle',
      title: 'Formula Student Title',
      type: 'localeString'
    },
    {
      name: 'formulaStudentIntro',
      title: 'Formula Student Intro Text',
      type: 'localeBlock'
    },
    {
      name: 'formulaStudentBgImage',
      title: 'Formula Student Background Image',
      type: 'cloudinary.asset',
      description: 'Background image for the Formula Student section.'
    },
    {
      name: 'youtubeLink',
      title: 'YouTube Video Link',
      type: 'url',
      description: 'Link to the latest YouTube video'
    },
    {
      name: 'instagramPageUrl',
      title: 'Instagram Page URL',
      type: 'url',
      description: 'Link to the main Instagram profile (e.g. https://instagram.com/ituracing)'
    },
    {
      name: 'instagramFeedUrl',
      title: 'Behold.so JSON Feed URL',
      type: 'url',
      description: 'Paste the JSON URL provided by Behold.so to automatically fetch the latest posts.'
    }
  ]
}
