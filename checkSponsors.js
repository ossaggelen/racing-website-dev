import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '7898q55i',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
})

client.fetch('*[_type == "vehicle"]{name, sponsorTiers}').then(data => {
  console.log(JSON.stringify(data, null, 2))
}).catch(console.error)
