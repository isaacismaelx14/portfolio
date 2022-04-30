import type { NextPage } from 'next';
import Head from 'next/head';
import AboutMe from '../components/AboutMe';
import Contact from '../components/Contact';
import Stats from '../components/Stats';
import Home from '../components/Home';
import Projects from '../components/Projects';
import Technologies from '../components/Technologies';

const Main: NextPage = () => {
    return (
        <>
            <Head>
                <title>Isaac Martinez | Portfolio</title>
                <meta name="description" content="Portfolio of Isaac Martinez" />
                <meta name='robots' content='index, follow' />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main">
                <Home />
                <AboutMe />
                <Technologies />
                <Stats/> 
                <div className="container">
                    <Projects />
                </div>
                <Contact />
            </main>
        </>
    );
};

export default Main;
