export const settings = {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'homeHeroImage',
      title: 'Home Page Hero Image',
      type: 'cloudinary.asset',
      description: 'The large full-bleed image shown on the Home Page.'
    },
    {
      name: 'carsPageSymbolicHero',
      title: 'Shared Page Hero Image',
      type: 'cloudinary.asset',
      description: 'The global symbolic picture shown at the top of Cars, Team, Sponsors, and Contact pages.'
    }
  ]
}
