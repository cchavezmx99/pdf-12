import pdfGenerator from '../../utils/html2pdf.js'
// import pdfGenerator from 'html2pdf-containers'
// import fetch from 'node-fetch'

// const API_99 = process.env.API_99
// const CREATE_CONTAINERS = `
//   mutation ($numContainers: Int!, $station: String!, $country: String!) {
//     createContainers(
//       numContainers: $numContainers
//       station: $station
//       country: $country
//     ) {
//       pdfUrl
//       containers {
//         id
//         tag
//       }
//     }
//   }
// `

export default async function handledr (req, res) {  
    try {
      const { numContainers, station, country } = req.body
      try {
        // const containers = await fetch(API_99, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     query: CREATE_CONTAINERS,
        //     variables: {
        //       numContainers,
        //       station,
        //       country
        //     }
        //   })
        // })
        // .then((res) => res.json())
        // .then((res: any) => res.data.createContainers)
        // .catch((error) => console.log('🚀 ~ file: index.js:48 ~ pdfGenerator: ~ error:', error))        
        const containers =  {
          pdfUrl: 'https://storage.googleapis.com/containers_qrcodes_bucket/pdf/f241f0eb-b940-48f6-8c14-6b4744e17f25.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=cr-induction-bff-sa%40precise-line-76299minutos.iam.gserviceaccount.com%2F20230223%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230223T164507Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=b459071592ec39271106f56dd4ffc3ae29e7415b7a4774bcee0f48ce40d7b2a0fed319e4ea3974b3a543c5a54a2f73c1aace5b8ef5277b87c287111c91391ef37b3ac117bccb4cf651f89c3fb97653e3187eb65a82e6e67e1dc31e59d36b943f4022da74cbf5aedbf9945dc99ae622449796ae3556229b2d9802a11f070b119f9e842f0d4bf686c5e25f2ea4287e5c924bd6ba8254ace0e21d60f1509dcbe875e713885bf1089ee1558a69f4c9051d321cd750f519aa311918015e47a20457b41240517491379d5daa738ebaadb09e788ec3bcf36999fc67de73eaf7a611cf23a87e283988fc74f29a78b99d3ac02c951f5203064e3fcfa3eb2c54f1268a73f1',
          containers: [ 
            { id: '871f2f28-0581-45bb-9c6f-408ec1e58854', tag: 'XVN-988' },
            { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f25', tag: 'XVN-989' },
            { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f26', tag: 'XVN-990' },
            { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-992' },
            { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-993' },
            { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-994' },
            { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-995' },
            { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-996' },
            { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-997' },
           ]
        } 
        const pdf = await pdfGenerator(containers.containers, country, station)        
        return res.status(200).json({ pdfUrl: pdf })
      } catch (error) {
        console.log('🚀 ~ file: index.js:50 ~ pdfGenerator: ~ error:', error) 
        return res.status(500).json({ error: 'Error generating pdf' })        
      }

    } catch (error) {
      console.log('🚀 ~ file: index.js:52 ~ pdfGenerator: ~ error:', error)
      return res.status(500).json({ error: 'Error generating pdf' })      
    }

}
