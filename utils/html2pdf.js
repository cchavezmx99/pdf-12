import qr from "qrcode";
import * as puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

console.log(chromium);

const html2pdf = async (containers, country, station) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: chromium.executablePath("/var/task/node_modules/@sparticuz/chromium/build"),
    headless: chromium.headless === "true",
  });

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
            height: 9.8cm;
            width: 9.8cm;
            padding: 0;
            margin: 0;
          }

          h1 {
            font-size: 6rem;
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
  const { pdf } = await html2pdf(containers, country, station);
  return pdf;
};

export default pdfGenerator;
