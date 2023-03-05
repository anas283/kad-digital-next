import Head from "next/head";
import { useRouter } from "next/router"

const WeddingCard = () => {
  const router = useRouter();
  const cardName = router.query.cardName;

  const meta = {
    title: "Walimatul Urus - Kamal & Diana",
    description: "Villamay Shah Alam pada 15 April 2023",
    type: "website",
  }

  return (
    <>
      <Head>
        <title>{ meta.title }</title>
        <meta name="description" content={ meta.description } />
        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
      </Head>
      <div>WeddingCard: { cardName }</div>
    </>
  )
}

export default WeddingCard