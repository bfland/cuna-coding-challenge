import '../styles/globals.css'
import { useState } from 'react'
import { AppProps } from 'next/app'
import Layout from '../components/Layout'

function MyApp ({ Component, pageProps }: AppProps) {
  // I know, I know! I took the liberty of a shortcut here - this is not a
  // solution I would ever use in a real-world app to pass state to components,
  // as now all pages receive the 'message' and 'setMessage' props... this
  // could be improved/remedied with the use of Redux action/reducer flow
  // at a lower level.
  const [disqualifiedMsg, setDisqualifiedMsg] = useState('')

  return (
    <Layout>
      <Component
        {...pageProps}
        message={disqualifiedMsg}
        setMessage={setDisqualifiedMsg}
      />
    </Layout>
  )
}

export default MyApp
