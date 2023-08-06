import Icons from './Icons/_index';
import ImageLazy from './_ImageLazy';
function Home() {
    return (
        <>
            <section className="home" id="home">
                <div className="home__container">
                    <div className="home__container--top">
                        <div className="home__img">
                            <ImageLazy
                                src="/img/isaac.jpg"
                                alt="Isaac Martinez FullStack Developer"
                                title="Isaac Martinez"
                                width={300}
                                height={300}
                                layout="responsive"
                                borderradius="50%"
                            />
                        </div>
                        <div className="home__text">
                            <div className="home__text--subtitle">
                                <span>FullStack Developer</span>
                            </div>
                            <div className="home__text--title">
                                <span className="_simbol">&#60;</span>
                                <span>Isaac Martinez</span>
                                <span className="_simbol">&#47;&#62;</span>
                            </div>
                        </div>
                    </div>
                    <div className="home__container--bottom">
                        <div className="home__buttons">
                            <a
                                href="#about"
                                className="home__buttons--about_me btn"
                            >
                                About Me
                            </a>
                            <a
                                href="#contact"
                                className="home__buttons--contact btn"
                            >
                                Get in contact
                            </a>
                        </div>
                    </div>
                </div>
                <div className="goDownArrow">
                    <a href="#about">
                        <Icons.DownArrow />
                    </a>
                </div>
            </section>
            <svg
                id="wave-home"
                style={{ transform: 'rotate(180deg)' }}
                viewBox="0 0 1440 150"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    style={{ transform: 'translate(0, 0px)', opacity: 1 }}
                    fill="var(--primary-color)"
                    d="M0,75L21.8,65C43.6,55,87,35,131,37.5C174.5,40,218,65,262,62.5C305.5,60,349,30,393,30C436.4,30,480,60,524,67.5C567.3,75,611,60,655,62.5C698.2,65,742,85,785,77.5C829.1,70,873,35,916,25C960,15,1004,30,1047,37.5C1090.9,45,1135,45,1178,50C1221.8,55,1265,65,1309,62.5C1352.7,60,1396,45,1440,40C1483.6,35,1527,40,1571,47.5C1614.5,55,1658,65,1702,65C1745.5,65,1789,55,1833,65C1876.4,75,1920,105,1964,110C2007.3,115,2051,95,2095,82.5C2138.2,70,2182,65,2225,75C2269.1,85,2313,110,2356,105C2400,100,2444,65,2487,52.5C2530.9,40,2575,50,2618,60C2661.8,70,2705,80,2749,70C2792.7,60,2836,30,2880,20C2923.6,10,2967,20,3011,25C3054.5,30,3098,30,3120,30L3141.8,30L3141.8,150L3120,150C3098.2,150,3055,150,3011,150C2967.3,150,2924,150,2880,150C2836.4,150,2793,150,2749,150C2705.5,150,2662,150,2618,150C2574.5,150,2531,150,2487,150C2443.6,150,2400,150,2356,150C2312.7,150,2269,150,2225,150C2181.8,150,2138,150,2095,150C2050.9,150,2007,150,1964,150C1920,150,1876,150,1833,150C1789.1,150,1745,150,1702,150C1658.2,150,1615,150,1571,150C1527.3,150,1484,150,1440,150C1396.4,150,1353,150,1309,150C1265.5,150,1222,150,1178,150C1134.5,150,1091,150,1047,150C1003.6,150,960,150,916,150C872.7,150,829,150,785,150C741.8,150,698,150,655,150C610.9,150,567,150,524,150C480,150,436,150,393,150C349.1,150,305,150,262,150C218.2,150,175,150,131,150C87.3,150,44,150,22,150L0,150Z"
                ></path>
            </svg>
        </>
    );
}

export default Home;
