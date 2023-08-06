import { useId, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type IFormData = {
    name: string;
    email: string;
    message: string;
    company: string;
};
type IErrors = {
    id: string;
    message: string;
};

function Contact() {
    const [errors, setErrors] = useState<IErrors[]>([]);
    const recaptchaRef = useRef<any>();
    const [sendingMsg, setSendingMsg] = useState(false);
    const id = useId();
    const getId = (subfix: string) => `${id}-${subfix}`;
    const getElement = (id: string) => document.getElementById(getId(id));
    const getInput = (id: string) => getElement(id) as HTMLInputElement;
    const getValue = (id: string) => getInput(id).value;

    const validateData = (data: IFormData) => {
        const errors: IErrors[] = [];

        if (!data.name)
            errors.push({
                id: 'name',
                message: 'Name is required',
            });

        if (!data.email)
            errors.push({
                id: 'email',
                message: 'Email is required',
            });

        if (!data.message)
            errors.push({
                id: 'message',
                message: 'Message is required',
            });

        errors[0] && getInput(errors[0].id).focus();
        setErrors(errors);
        errors.forEach((error) => {
            const parent = getElement('parent-' + error.id);
            if (!parent) return;
            parent.dataset.error = error.message;
        });

        if (errors.length) return false;
        return true;
    };

    const removeAllErrors = () => {
        const elements = document.querySelectorAll('[data-error]');
        elements.forEach((element) => {
            element.removeAttribute('data-error');
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token: any = recaptchaRef.current;
        if (!token) return;

        const data: IFormData = {
            name: getValue('name').trim().toLocaleLowerCase(),
            company: getValue('company').trim().toLocaleLowerCase(),
            email: getValue('email').trim().toLocaleLowerCase(),
            message: getValue('message').trim().toLocaleLowerCase(),
        };

        if (!validateData(data)) return;
        const execToken = await token.executeAsync();
        if (!execToken) return;

        setSendingMsg(true);
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: `Portfolio Contact || ${data.name} <${data.email}>`,
                body: `${data.message} \n\n\n From: ${data.name} <${data.email}> \n Company: ${data.company}`,
            }),
        })
            .then(() => {
                alert(
                    `Thank you ${data.name} for your message. I'll get back to you soon!`
                );
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                getInput('name').value = '';
                getInput('email').value = '';
                getInput('message').value = '';
                getInput('company').value = '';
                setSendingMsg(false);
            });
    };

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                id="contact-svg"
            >
                <path
                    fill="var(--contact-me-background)"
                    fillOpacity="1"
                    d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,160C672,149,768,171,864,186.7C960,203,1056,213,1152,213.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
            <section className="contact" id="contact">
                <div className="contact__container">
                    <div className="contact__container-start">
                        <h2 className="contact__title">Contact Me</h2>
                    </div>
                    <div className="contact__container-end">
                        <form className="contact__form" onSubmit={handleSubmit}>
                            <div
                                className="contact__form-group"
                                id={getId('parent-name')}
                            >
                                <label htmlFor={getId('name')}>Name</label>
                                <input
                                    type="text"
                                    id={getId('name')}
                                    name="name"
                                    onChange={removeAllErrors}
                                />
                            </div>
                            <div
                                className="contact__form-group"
                                id={getId('parent-company')}
                            >
                                <label htmlFor={getId('company')}>
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id={getId('company')}
                                    onChange={removeAllErrors}
                                />
                            </div>
                            <div
                                className="contact__form-group"
                                id={getId('parent-email')}
                            >
                                <label htmlFor={getId('email')}>Email</label>
                                <input
                                    type="email"
                                    id={getId('email')}
                                    onChange={removeAllErrors}
                                />
                            </div>
                            <div
                                className="contact__form-group"
                                id={getId('parent-message')}
                            >
                                <label htmlFor={getId('message')}>
                                    Message
                                </label>
                                <textarea
                                    id={getId('message')}
                                    onChange={removeAllErrors}
                                />
                            </div>

                            <div className="contact__form-group">
                                <button type="submit" disabled={sendingMsg}>
                                    {sendingMsg ? 'Sending...' : 'Submit'}
                                </button>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey="6LdGCoMfAAAAALiHWCokVqDQ6IZaoHG_pgjcfrWO"
                                    onChange={removeAllErrors}
                                    size="invisible"
                                    badge="inline"
                                    style={{
                                        marginTop: '1rem',
                                        marginLeft: '0.5rem'
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;
