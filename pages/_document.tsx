import Document, {
  Html,
  Head,
  Main,
  NextScript,
  // DocumentContext,
} from 'next/document'

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext) {
  //   const originalRenderPage = ctx.renderPage

  //   ctx.renderPage = () =>
  //     originalRenderPage({
  //       // useful for wrapping the whole react tree
  //       enhanceApp: App => App,
  //       // useful for wrapping in a per-page basis
  //       enhanceComponent: Component => Component,
  //     })

  //   // Run the parent `getInitialProps`, it now includes the custom `renderPage`
  //   const initialProps = await Document.getInitialProps(ctx)
  //   console.log({ initialProps })
  //   return initialProps
  // }

  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
