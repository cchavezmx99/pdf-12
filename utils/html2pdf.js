import qr from "qrcode";
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

const html2pdf = async (containers, country, station) => {
  const isLocal = process.env.AWS_EXECUTION_ENV === undefined;
  const browser = isLocal
    ? await require("puppeteer").launch()
    : await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar",
      ),
      headless: chorium.headless,
      ignoreHTTPSErrors: true,
    });

  console.log("Launching browser");
  console.log("IsLocal", isLocal);
  const page = await browser.newPage();

  const qrMaker = async (counter) => {
    const qrCode = qr.toString(counter, {
      type: "svg",
    });
    return qrCode;
  };

  const htmlPromise = containers.map(async ({ id, tag }, index) => {
    const qrCode = await qrMaker(id);
    if (index % 2 === 0) {
      return `
      <div style="break-after: avoid-page;">
        <h1>${tag}</h1>
        <p>${station}</p>        
        <picture>
          ${qrCode}
        </picture>
        <span style="border-bottom: 1px solid black; width: 100vw;"></span>
      </div>          
      `;
    } else {
      return `
      <div style="break-after: avoid-page;">
        <h1>${tag}</h1>
        <p>${station}</p>
        <picture>
          ${qrCode}
        </picture>
      </div>          
      `;
    }
  });

  const htmlString = await Promise.all(htmlPromise);

  try {
    const hmtlGET = `
    <!DOCTYPE html>        
    <html>
      <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
          body {
            display: grid;  
            justify-content: center;        
            position: relative;            
          }

          img, picture, svg{            
            height: 8.5cm;
            width: 8.5m;
            padding: 0;
            margin: 0;
          }

          h1 {
            font-size: 5rem;
            margin: 0;
            padding: 0;
          }

          p {
            font-size: 1.5rem;
            margin: 0;
            padding: 0;
          }

          hr {
            width: 100vh;
            height: 2px;
            background-color: black;
          }

          div {
            display: grid;
            place-items: center;
            height: calc(100vh / 2 );
          }

        </style>
      </head>
      <body>        
      ${htmlString.join("")}
      </body>
    </html>
    `;
    await page.setContent(hmtlGET);
    const pdf = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });

    await browser.close();
    // convert pdf to base64
    const base64 = pdf.toString("base64");
    return { pdf: base64 };
  } catch (error) {
    throw new GraphQLError("Error in pdfGenerator.js");
  }
};

const pdfGenerator = async (containers, country, station) => {
  try {
    const { pdf } = await html2pdf(containers, country, station);
    return pdf;
  } catch (error) {
    console.log(error);
    throw new Error("Error in pdfGenerator.js");
  }
};

export default pdfGenerator;
