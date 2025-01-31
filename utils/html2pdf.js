import playwright from 'playwright-core';
import chromium from 'chrome-aws-lambda';
import qr from 'qrcode';

const html2pdf = async (containers, country, station) => {
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  const qrMaker = async (counter) => {
    return qr.toString(counter, { type: 'svg' });
  };

  const htmlPromise = containers.map(async ({ id, tag }, index) => {
    const qrCode = await qrMaker(id);
    return `
      <div style="break-after: avoid-page;">
        <h1>${tag}</h1>
        <p>${station}</p>
        <picture>${qrCode}</picture>
        ${index % 2 === 0 ? '<span style="border-bottom: 1px solid black; width: 100vw;"></span>' : ''}
      </div>
    `;
  });

  const htmlString = await Promise.all(htmlPromise);

  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
            body { display: grid; justify-content: center; position: relative; }
            img, picture, svg { height: 9.8cm; width: 9.8cm; padding: 0; margin: 0; }
            h1 { font-size: 6rem; margin: 0; padding: 0; }
            p { font-size: 1.5rem; margin: 0; padding: 0; }
            div { display: grid; place-items: center; height: calc(100vh / 2); }
          </style>
        </head>
        <body>${htmlString.join('')}</body>
      </html>
    `;

    await page.setContent(htmlContent);
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: { left: 0, top: 0, right: 0, bottom: 0 },
    });

    await browser.close();
    return { pdf: pdf.toString('base64') };
  } catch (error) {
    console.error(error);
    throw new Error('Error generating PDF');
  }
};

export default async function handler(req, res) {
  const { containers, country, station } = req.body;

  try {
    const { pdf } = await html2pdf(containers, country, station);
    res.status(200).json({ pdf });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
