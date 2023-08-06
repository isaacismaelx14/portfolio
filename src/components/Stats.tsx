import { useEffect, useState } from 'react';

function Stats() {
    const [stats, setStats] = useState<any>({
        bg: '000',
        text: 'ffffff',
    });
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setStats({
                bg: '30343d',
                text: 'ffffff',
            });
        }
        else {
            setStats({
                bg: 'e3e3e3',
                text: '000000',
            });
        }
    }, []);

    return (
        <section className="stats" id="stats">
            <div className="stats__container container">
                <div className="stats__container-start">
                    <h2 className="stats__title title">Stats</h2>
                </div>
                <div className="stats__container-end">
                    <img
                        src={`https://github-readme-stats.vercel.app/api?username=isaacismaelx14&show_icons=true&hide=&count_private=true&title_color=0891b2&text_color=${stats.text}&icon_color=0891b2&bg_color=${stats.bg}&hide_border=true&show_icons=true`}
                        alt="isaacismaelx14's GitHub stats"
                    />
                    <img
                        src={`https://github-readme-streak-stats.herokuapp.com/?user=isaacismaelx14&stroke=${stats.text}&background=${stats.bg}&ring=0891b2&fire=0891b2&currStreakNum=${stats.text}&currStreakLabel=0891b2&sideNums=${stats.text}&sideLabels=${stats.text}&dates=${stats.text}&hide_border=true`}
                        alt="isaacismaelx14's GitHub streak"
                    />
                    <img
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=isaacismaelx14&&layout=compact&langs_count=10&title_color=0891b2&text_color=${stats.text}&icon_color=0891b2&bg_color=${stats.bg}&hide_border=true&locale=en&custom_title=Top%20%Languages`}
                        alt="Top Languages"
                    />
                </div>
            </div>
        </section>
    );
}

export default Stats;
