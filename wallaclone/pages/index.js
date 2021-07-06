import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import configureStore from '../store';
import {authLogin, authLogout} from '../store/actions'
import storage from '../utils/storage'


// TODO LEER PRIMER EN EL LOCAL STORAGE SI HAY O NO TOKEN E INICIALIZAR EL ESTADO DEL STORE DE REDUX EN FUNCIÓN DE ELLO

const accessToken = storage.get('authToken');


const store = configureStore({preloadedState: {auth: !!accessToken}})
store.dispatch(authLogin())
console.log(store.getState())


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wallaclone</title>
        <meta name="description" content="Generated by the nameless team" />
       
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className="team-title"> WALLACLONE </span> 
        </h1>

        <p className={styles.description}>
          Una aplicación creada por:{' '}
          <code className={styles.code}>nameless-team.js</code>
        </p>

        <h3> <Link href='/login'> Login Page </Link> </h3>
        <h3> <Link href='/register'> Register Page </Link> </h3>
        <h3> <Link href='/adverts'> Adverts Page </Link> </h3>

        

        <div className={styles.grid}>
          <a href="https://github.com/AdrianValenzuela" target="_blank" className={styles.card}>
            <h2>Adrián Valenzuela Guasp &rarr;</h2>
            <p>Backend y agile master. El mejor project manager</p>
          </a>

          <a href="https://github.com/lmhmDev" target="_blank" className={styles.card}>
            <h2>Lorenzo Hermoso Moreno &rarr;</h2>
            <p>Frontend master and extremely reactive</p>
          </a>

          <a
            href="https://github.com/orgs/ProyectoFinal-Wallaclone/people/NandoLT" target="_blank"
            className={styles.card}
          >
            <h2>Fernando Lopez Trejo &rarr;</h2>
            <p>Backend Master and token fanatics</p>
          </a>

          <a
            href="https://github.com/orgs/ProyectoFinal-Wallaclone/people/jaimeperezortega" target="_blank"
            className={styles.card}
          >
            <h2>Jaime Pérez Ortega &rarr;</h2>
            <p>
              Master og nothing and fake afro hair in his github profile
            </p>
          </a>
        </div>
      </main>

      <style jsx>{`
            
            h3{
                color:#09f;
            }
            .team-title{
              color:#09f;
            }

            `}</style>

      <footer className={styles.footer}>
      
          Powered by{' '}
          <span className={styles.logo}>
           THE NAMELESS TEAM
          </span>
        
      </footer>
    </div>
  )
}
