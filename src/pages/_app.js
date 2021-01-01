import '../bootstrap.min.css'
import '../styles.css'
import { EntityProvider } from '../context/index'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <EntityProvider><Component {...pageProps} /></EntityProvider>
}