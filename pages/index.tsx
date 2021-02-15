import Head from 'next/head'
import AutoLoanForm from '../components/AutoLoanForm'

export default function Home () {
  return (
    <div>
      <Head>
        <title>Auto Loans</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <AutoLoanForm />
      </main>
    </div>
  )
}
