import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '7898q55i',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
})

client.fetch('*[_type == "vehicle"] | order(year desc)').then(data => {
  console.log("Total fetched:", data.length)
  data.forEach((v, i) => {
    console.log(`${i+1}: ${v.name} (Year: ${v.year}, ID: ${v._id})`)
  })
}).catch(console.error)
