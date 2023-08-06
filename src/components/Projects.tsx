import React, { Suspense, useEffect } from 'react';

const ReactLazy = React.lazy(() => import('./_RecProjects'));
const isInViewPort = (element: any) => {
    const bounding = element.getBoundingClientRect();
    if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <=
            (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <=
            (window.innerHeight || document.documentElement.clientHeight)
    ) {
        return true;
    }
    return false;
};

function Projects() {
    const TopRef = React.useRef<HTMLDivElement>(null);
    const [showC, setShowC] = React.useState(false);

    useEffect(() => {
        const toDo = () => {
            if (isInViewPort(TopRef.current)) {
                setShowC(true);
            }
        };
        if (TopRef.current) window.addEventListener('scroll', toDo, false);
    }, []);

    return (
        <section className="projects" id="projects">
            <div className="projects__title">
                <h2 className="title" ref={TopRef}>
                    Projects
                </h2>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
                {showC ? <ReactLazy /> : <p>Loading...</p>}
            </Suspense>
        </section>
    );
}

export default Projects;
