import { Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Language Learning Helper</title>
        <meta name="description" content="Flashcards for language learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Learn Italiano 🇮🇹</h1>

        <p className={styles.description}>
          Get started by clicking one of the options below!
        </p>

        <Button component="a" href="/practice" size="large">
          Practice
        </Button>

        <Button component="a" href="/list" size="large">
          List
        </Button>
      </main>
    </div>
  );
};

export default Home;
