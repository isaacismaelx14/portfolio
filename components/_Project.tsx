import React from 'react';
import { IProjects } from '../data/types';
import ImageLazy from './_ImageLazy';

type IProps = {
    project: IProjects[0];
    classPrefix: string;
};

function _Project({ project, classPrefix }: IProps) {
    return (
        <>
            <div className={`${classPrefix}top`}>
                <div className={`${classPrefix}title`}>
                    <h2>{project.title}</h2>
                </div>
                <div className={`${classPrefix}image`}>
                    <ImageLazy
                        src={project.img}
                        alt={project.title}
                        width={300}
                        height={150}
                        layout="responsive"
                        objectFit='cover'
                        objectPosition='center'
                    />
                </div>
                <div className={`${classPrefix}summary`}>
                    <p>{project.summary}</p>
                </div>
            </div>
            <div className={`${classPrefix}buttons`}>
                {project.btns.map((btn, index) => (
                    <a
                        key={index}
                        href={btn.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${classPrefix}btn`}
                    >
                        {btn.title}
                    </a>
                ))}
            </div>
        </>
    );
}

export default _Project;
