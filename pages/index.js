import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Landing from './Landing';

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Kad Digital - Create stunning invitations in minutes.</title>
        <meta
          name="description"
          content="Craft beautiful wedding cards that ensure your guests don't miss out on the special event!"
        />
        <meta property="og:title" content="Kad Digital - Create stunning invitations in minutes." />
        <meta property="og:description" content="Craft beautiful wedding cards that ensure your guests don't miss out on the special event!" />
        <meta property="og:image" content="https://ik.imagekit.io/kaddigital/og-image-main.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Landing />

    </div>
  )
}
