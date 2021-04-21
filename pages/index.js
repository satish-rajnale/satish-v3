import Head from "next/head";
import styles from "../styles/Home.module.css";
import Card from "../Components/Cards";
import Button from "../Components/Button";
export default function Home() {
  return (
    <>
    
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
        <div className={styles.btn_container}>
          <Button />
        </div>
        <div className={styles.container}>
          <div className={styles.main}>
            <Card />
          </div>
        </div>
 
    </>
  );
}
