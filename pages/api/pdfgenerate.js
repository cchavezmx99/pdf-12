import pdfGenerator from '../../utils/html2pdf.js'
export default async function handledr (req, res) {  
    
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
      console.log("🚀 ~ file: pdfgenerate.js:22 ~ handledr ~ pdf:", pdf)
      return res.status(200).json({ pdfUrl: pdf })
    }

    return res.status(405).json({ error: 'Method not allowed' })
     
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }   

}
