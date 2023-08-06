import React from 'react';
import Icons from './Icons/_index';

function Footer() {
    return (
        <section className="footer">
            <div className="footer__container">
                <div className="footer__text">
                    <span>By Isaac Martinez</span>
                </div>
                <div className="footer__icons">
                    <a
                        href="https://www.github.com/isaacismaelx14"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="icon">
                            <Icons.Github />
                        </div>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/isaac-martinez-642242214/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="icon">
                            <Icons.Linkedin />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Footer;
