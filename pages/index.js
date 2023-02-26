import Head from 'next/head'
import { useState } from 'react'
import Prism from 'prismjs'

const containers = [ 
  { id: '871f2f28-0581-45bb-9c6f-408ec1e58854', tag: 'XVN-988' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f25', tag: 'XVN-989' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f26', tag: 'XVN-990' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-992' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-993' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-994' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-995' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-996' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-997' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-998' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-999' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-1000' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-1001' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-1002' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-1003' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-1004' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-1005' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-1006' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-1007' },
  { id: 'f241f0eb-b940-48f6-8c14-6b4744e17f27', tag: 'XVN-1008' },
  ]

export default function Home() {


  const [loading, setLoading] = useState(false)  
  const handlerTestPDF = (e) => {
    e.preventDefault()
    setLoading(true)

    fetch('/api/pdfgenerate', {    
      method: 'POST',
      body: JSON.stringify({
        "country": "MEX",
        containers,
        "station": "MX5"
      }),
      headers: {
        'Content-Type': 'application/json',      
      }
    }).then(res => res.json())
      .then(({ pdfUrl }) => {      
        const base64 = Buffer.from(pdfUrl, 'base64')
        const blob = new Blob([base64], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        window.open(url)
        setLoading(false)
    })

    .catch(err => console.log(err))
  }

  const code = `
  const [loading, setLoading] = useState(false)  
  const handlerTestPDF = () => {
    setLoading(true)

    fetch('https://serverless-pdf-generator-ten.vercel.app/api/pdfgenerate', {    
      method: 'POST',
      body: JSON.stringify({
        "country": "MEX",
        "station": "MX5",
        containers: [ 
          { id: '871f2f28-0581-45bb-9c6f-408ec1e58854', tag: 'XVN-988' }
        ],
      }),
      headers: {
        'Content-Type': 'application/json',      
      }
    }).then(res => res.json())
      .then(({ pdfUrl }) => {      
        const base64 = Buffer.from(pdfUrl, 'base64')
        const blob = new Blob([base64], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        window.open(url)
        setLoading(false)
    })

    .catch(err => console.log(err))
  }
  `
  const html = Prism.highlight(code, Prism.languages.javascript, 'javascript')

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header>
            <h1>
              PDF con Next.js y Playwright
            </h1>          
        </header>
        <div>          
          <div className='introduccion'>
            <p>
              Este proyecto es una prueba de concepto para generar PDFs con Next.js y Playwright.
              atravez de una serverless function de Vercel, generar un PDF con la información de los contenedores              
            </p>
            <form onSubmit={handlerTestPDF}>
            <button>
              <div className="container">
                { loading && <div className="bar"></div>}
              </div>
              <span>Generar PDF</span>
            </button>    
            </form>
          </div>
          <hr />          
          <div>
            <h3>¿Comó usarlo?</h3>            
            <p>
              Desde un axios o fetch con una petición de tipo POST.                         
            </p>
            <span className='instalacion'>
              https://serverless-pdf-generator-ten.vercel.app/api/pdfgenerate
            </span>
            <h3>Parámetros</h3>
              <div className='parametros' style={{ marginLeft: 30 }}>
                <p><span>containers:</span> Array</p>
                <p><span>country:</span> String</p>
                <p><span>station:</span> String</p>
              </div>
            <h3>Respuesta</h3>
             <div className='parametros' style={{ marginLeft: 30 }}>
                <p><span>pdfUrl:</span> Base 64</p>
              </div>

            <hr />

            <h3>Ejemplo: Descarga automática</h3>
            <code className='code'>
              <pre className='code-styles' dangerouslySetInnerHTML={{ __html: html }} />
            </code>
          </div>
        </div>
        <div>
        </div>
        <footer></footer>                
      </main>
    </>
  )
}
