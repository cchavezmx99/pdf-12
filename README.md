This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

El proyecto de generación de PDF desde la serverles function de Vercel, se debe considerar los siguientes puntos:

- La generación de PDF se realiza con la librería de **playwright**; la ventaja que nos da esta librería es que nos permite generar PDF de cualquier sitio web, sin importar el framework que este utilice, ya que la librería se encarga de emular un navegador y realizar la captura de la pagina web, podemos generar PDF a partir de código HTML o de una URL.

- Para generar el PDF se necesita de aumentar la capacidad que tiene la serveless function de manera predeterminada, para esto se debe crear un archivo **vercel.json** en la raiz del proyecto, y agregar el siguiente código:

```json
{
  "functions": {
    "pages/api/pdfgenerate.js": {
      "memory": 3008,
      "maxDuration": 60
    }
  }
}
```

- Se esta utilizando **"chrome-aws-lambda": "10.1.0"** como binarios de chrome para la generación de PDF, ya que la librería de **playwright** necesita de estos archivos.

  <br />

- Si se ejecuta en un entorno local, se debe instalar el binario de chrome aparte y des comentar la linea del archivo **html2pdf.js**. en el lanzador de playwright.

  ```javascript
      executablePath: await chromium.executablePath,
  ```

- Otro punto a considerar es la vesion de node, se debe usar la vesrsion 14, otra version da errores por el paquete de chrome-aws-lambda y vercel. Se puede configurar la version de node en el archivo **package.json** o desde la consola de vercel, en la seccion de **settings**.

```json
  "engines": {
    "node": "14.x"
  }
```

- La serveless function de vercel tiene un limite de 50MB, por lo que se debe tener cuidado con las librerías que se instalen, y es que si se pasa de este limite, la serveless function no se va a poder ejecutar o compilar el proyecto.

- Se ocupa la version **"next": "12.0.7"** para ahorrar 7mb en el tamaño de la serverless function.

## Uso

## [Documentación](https://serverless-pdf-generator-ten.vercel.app/)
