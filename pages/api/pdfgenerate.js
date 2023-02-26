import pdfGenerator from '../../utils/html2pdf.js'
export default async function handledr (req, res) {  
    
  const { containers, country, station } = req.body

  try {

    if (req.method === 'POST') {

      if (typeof containers === 'object' && containers.length === 0) {
        return res.status(400).json({ error: 'No containers' })
      }
  
      if (typeof country !== 'string' || country.length !== 3) {
        return res.status(400).json({ error: 'Invalid country' })
      }
  
      if (typeof station !== 'string' || station.length !== 3) {
        return res.status(400).json({ error: 'Invalid station' })
      }


      const pdf = await pdfGenerator(containers.containers, country, station)        
      return res.status(200).json({ pdfUrl: pdf })

    }
    
    return res.status(400).json({ error: 'Invalid method' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }   

}
