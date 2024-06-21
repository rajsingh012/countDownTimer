import UserIcon from './../assets/images/user.png';
import EducationIcon from './../assets/images/mortarboard.png';
import AttachIcon from './../assets/images/attached.png';
import PreviewIcon from './../assets/images/eye.png';
import SubmitIcon from './../assets/images/apply.png';
import { useState } from 'react';

const steps = [
    { icon: UserIcon, label: 'Personal Info', alt: 'Step 1' },
    { icon: EducationIcon, label: 'Education', alt: 'Step 2' },
    { icon: AttachIcon, label: 'Attachments', alt: 'Step 3' },
    { icon: PreviewIcon, label: 'Preview', alt: 'Step 4' },
    { icon: SubmitIcon, label: 'Submit', alt: 'Step 5' }
];

const Stepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        degree: '',
        college: '',
        year: '',
        resume: null,
        coverLetter: null,
        transcript: null
    });

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData({
            ...formData,
            [id]: files ? files[0] : value
        });
    };

    const nextActiveStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const prevActiveStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const activeOnLabels = (index) => {
        setActiveStep(index);
    };

    const stepForms = {
        0: (
            <div className='stepper__form'>
                <div className='stepper__form__input'>
                    <input
                        className='inputField'
                        type='text'
                        id='name'
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='stepper__form__input'>
                    <input
                        className='inputField'
                        type='text'
                        id='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='stepper__form__input'>
                    <input
                        className='inputField'
                        type='text'
                        id='phone'
                        placeholder='Phone'
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
            </div>
        ),
        1: (
            <div className='stepper__form'>
                <div className='stepper__form__input'>
                    <input
                        className='inputField'
                        type='text'
                        id='degree'
                        placeholder='Degree'
                        value={formData.degree}
                        onChange={handleChange}
                    />
                </div>
                <div className='stepper__form__input'>
                    <input
                        className='inputField'
                        type='text'
                        id='college'
                        placeholder='College'
                        value={formData.college}
                        onChange={handleChange}
                    />
                </div>
                <div className='stepper__form__input'>
                    <input
                        className='inputField'
                        type='text'
                        id='year'
                        placeholder='Year'
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>
            </div>
        ),
        2: (
            <div className='stepper__form'>
                <div className='stepper__form__input'>
                    <label className='tabels' htmlFor='resume'>Resume</label>
                    <input
                        className='inputField'
                        type='file'
                        id='resume'
                        onChange={handleChange}
                    />
                </div>
                <div className='stepper__form__input'>
                    <label className='tabels' htmlFor='coverLetter'>Cover Letter</label>
                    <input
                        className='inputField'
                        type='file'
                        id='coverLetter'
                        onChange={handleChange}
                    />
                </div>
            </div>
        ),
        3: (
            <div className='stepper__form'>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>{formData.name}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{formData.email}</td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td>{formData.phone}</td>
                        </tr>
                        <tr>
                            <td>Degree:</td>
                            <td>{formData.degree}</td>
                        </tr>
                        <tr>
                            <td>College:</td>
                            <td>{formData.college}</td>

                        </tr>
                        <tr>
                            <td>Year:</td>
                            <td>{formData.year}</td>
                        </tr>
                        <tr>
                            <td>Resume:</td>
                            <td>{formData.resume ? formData.resume.name : ''}</td>
                        </tr>
                        <tr>
                            <td>Cover Letter:</td>
                            <td>{formData.coverLetter ? formData.coverLetter.name : ''}</td>
                        </tr>
                        </tbody>
                </table>
            </div>
        ),
        4: (
            <div className='stepper__form'>
                <p>Thank you for submitting your application!</p>
            </div>
        )
    };

    return (
        <div className='main'>
            <div className='stepper'>
                {steps.map((step, index) => {
                    const activeImgClassName = activeStep >= index ? 'stepper__icon--active' : '';
                    const activeClassName = activeStep >= index + 1 ? 'stepper__step--activeLine' : '';
                    return (
                        <div
                            key={index}
                            className={`stepper__step ${index === steps.length - 1 ? 'stepper__step--last' : ''} ${activeClassName}`}
                        >
                            <img
                                src={step.icon}
                                className={`stepper__icon ${activeImgClassName}`}
                                onClick={() => activeOnLabels(index)}
                                alt={step.alt}
                            />
                            <p className='stepper__label'>{step.label}</p>
                        </div>
                    );
                })}
            </div>
            <div className='stepperForms'>
                {stepForms[activeStep]}
            </div>
            <div className='buttonsWrap'>
                <button
                    className='stepper__button'
                    onClick={prevActiveStep}
                    disabled={activeStep === 0}
                >
                    Prev
                </button>
                <button
                    className='stepper__button'
                    onClick={nextActiveStep}
                    disabled={activeStep === steps.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Stepper;
