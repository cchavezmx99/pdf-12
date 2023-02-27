import pdfGenerator from '../../utils/html2pdf.js'

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}


async function handledr (req, res) {  
    
  const { containers, country, station } = req.body  
  try {

    if (req.method === 'POST') {
      
      if (!Array.isArray(containers)) {
        throw new Error('No containers')
      }
  
      if (typeof country !== 'string') {
        throw new Error('Invalid country')
      }
  
      if (typeof station !== 'string') {
        throw new Error('Invalid station')
      }

      const pdf = await pdfGenerator(containers, country, station)
      return res.status(200).json({ pdfUrl: pdf })
    }

    return res.status(405).json({ error: 'Method not allowed' })
     
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }   

}


export default allowCors(handledr)