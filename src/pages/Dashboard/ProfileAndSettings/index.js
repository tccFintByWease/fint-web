/* libraries */
import React, { Fragment, useEffect, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import _ from 'lodash';
/* schemas */
import { updateUserSchema } from '../../../store/schemas/update-user-schema';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
import userPicture from './../../../assets/images/user-picture.png';
/* components */
import { Form, Row, Col, Modal } from 'react-bootstrap';
import TopNavbar from '../components/TopNavbar/index';
import SideNavbar from '../components/SideNavbar/index';
import AuthenticationErrorMessage from '../../../components/AuthenticationErrorMessage/index';
import Button from '../../../components/Button/index';
import Footer from '../../../components/Footer/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
/* contexts */
import { useAuth } from '../../../contexts/auth';
/* store */
import { UPDATE_USER_URL } from '../../../store/api-urls';
import { getTodayDate, removeTime, formatDatetime } from '../../../utils/date-utils';
import { formatCPF } from '../../../utils/cpf-utils';
import { formatPhone } from '../../../utils/phone-utils';
/* services */
import { handleTheme } from '../../../services/theme-services';

function ProfileAndSettings() {
    const { user, updateUser } = useAuth();

    useEffect(() => {
        getUserData();
    }, [])

    const [showSpinner, setShowSpinner] = useState(false);
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
    
    const [authenticationError, setAuthenticationError] = useState(false);

    const [userData, setUserData] = useState();

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

    const [showModal, setShowModal] = useState(false);

    const [navbarIsOpen, setNavbarIsOpen] = useState(false);

    // reset the menu settings when the window is resized
    const resizeFunction = () => {
        const nav = document.querySelector('.dashboard-header-nav');
        const aside = document.querySelector('.aside');
        const navBackground = document.querySelector('.nav-background');
        const topNavbarContent = document.querySelector('.top-navbar-content');

        if (window.innerWidth >= 960) {
            document.body.style.position = 'initial';
            nav.style.visibility = 'visible';
            navBackground.style.visibility = 'hidden';
            topNavbarContent.classList.add('none');

            aside.classList.remove('mobile-side-nav');
            topNavbarContent.classList.remove('none');

            setNavbarIsOpen(false);
        } else if (window.innerWidth < 960 && !navbarIsOpen) {
            nav.style.visibility = 'hidden';
            
            aside.classList.remove('mobile-side-nav');
            topNavbarContent.classList.remove('none');
        }
    }

    window.onresize = function() { resizeFunction(); }

    const openNavbar = () => {
        const nav = document.querySelector('.dashboard-header-nav');
        const aside = document.querySelector('.aside');
        const navBackground = document.querySelector('.nav-background');

        document.body.style.position = 'fixed';
        nav.style.visibility = 'visible';
        navBackground.style.visibility = 'visible';
        aside.classList.add('mobile-side-nav');

        setNavbarIsOpen(true);
    }

    const closeNavbar = () => {
        const nav = document.querySelector('.dashboard-header-nav');
        const aside = document.querySelector('.aside');
        const navBackground = document.querySelector('.nav-background');

        document.body.style.position = 'initial';
        nav.style.visibility = 'hidden';
        navBackground.style.visibility = 'hidden';
        aside.classList.remove('mobile-side-nav');

        setNavbarIsOpen(false);
    }

    const handleNavbarIsOpen = () => {
        if (!navbarIsOpen) {
            openNavbar();
        } else {
            closeNavbar();
        }
    }

    const handleShowSpinner = (value) => {
        setShowSpinner(value);
    }

    const handleIsSubmitBtnDisabled = (value) => {
        setIsSubmitBtnDisabled(value);
    }

    const getUserData = () => {
        let date = new Date(user.dataNascUsuario);
        date = removeTime(date);
        date = String(date).replaceAll('-', '/');

        let day = date.split('/')[2];
        let month = date.split('/')[1];
        let year = date.split('/')[0];
        
        const dataNascUsuario = `${day}/${month}/${year}`;

        const data = {
            nomeUsuario: user.nomeUsuario,
            emailUsuario: user.emailUsuario,
            cpfUsuario: user.cpfUsuario,
            foneUsuario: user.foneUsuario,
            dataNascUsuario: dataNascUsuario
        }

        setUserData(data);
    }

    const updateUserData = async (userData) => {
        const authenticateErrorMessage = document.querySelector('.authentication-error-message');

        try {
            // disable the button until the API returns
            handleShowSpinner(true);
            handleIsSubmitBtnDisabled(true);
            setAuthenticationError(false);

            const idUsuario = user.idUsuario;
            userData.idUsuario = idUsuario;

            let date = userData.dataNascUsuario.replaceAll('/', '-');
            let day = date.split('-')[2];
            let month = date.split('-')[1];
            let year = date.split('-')[0];
            
            const dataNascUsuario = `${day}-${month}-${year}`;

            userData.dataNascUsuario = dataNascUsuario;

            userData.statusUsuario = user.statusUsuario;
            userData.idMoeda = user.idMoeda;
            userData.senhaUsuario = user.senhaUsuario;
            
            date = removeTime(user.dataCadastroUsuario).replaceAll('/', '-');
            day = date.split('-')[2];
            month = date.split('-')[1];
            year = date.split('-')[0];
            
            const dataCadastroUsuario = `${day}-${month}-${year}`;
            
            userData.dataCadastroUsuario = dataCadastroUsuario;

            const response = await axios.put(UPDATE_USER_URL, userData);

            handleShowSpinner(false);
            handleIsSubmitBtnDisabled(false);

            if (_.isEqual(response.data.result, userData)) {
                updateUser(userData);
                openUserUpdateConfirmation();
            } else {
                authenticateErrorMessage.innerText = `Erro ao atualizar usuário. Tente novamente em instantes`;
                setAuthenticationError(true);
            }
            
        } catch(error) {
            authenticateErrorMessage.innerText = `Erro ao atualizar usuário. Tente novamente em instantes`;
            setAuthenticationError(true);
            handleShowSpinner(false);
        }
    }

    const openUserUpdateConfirmation = () => {
        setShowModal(true);
    }

    const closeUserUpdateConfirmation = () => {
        window.location.reload();
        setShowModal(false);
    }

    return (
        <Fragment>
            <TopNavbar handleNavbarIsOpen={handleNavbarIsOpen} />
            <section className="dashboard">
                <SideNavbar active={''} handleNavbarIsOpen={handleNavbarIsOpen} />
                <section className="profile-and-settings">
                    <h1>Perfil e Configurações</h1>
                    <AuthenticationErrorMessage authenticationError={authenticationError} />
                    <div className="user-data-and-settings flex">
                        <div className="user-data profile-box">
                            <div className="user-data-header flex">
                                <img src={userPicture} alt="Foto do usuário" />
                                <div className="user-data-header-text">
                                    <h2>{user.nomeUsuario}</h2>
                                    {
                                        user.idTipoUsuario !== 1 ? // TODO: MUDAR PRA === 1
                                            <p className="user-type">
                                                PREMIUM
                                            </p>
                                        :
                                            ''
                                    }
                                </div>
                            </div>
                            <Formik
                                onSubmit={(values) => updateUserData(values)}
                                initialValues={{
                                    nomeUsuario: userData?.nomeUsuario ?? '',
                                    emailUsuario: userData?.emailUsuario ?? '',
                                    cpfUsuario: userData?.cpfUsuario ?? '',
                                    foneUsuario: userData?.foneUsuario ?? '',
                                    dataNascUsuario: removeTime(userData?.dataNascUsuario) ?? ''
                                }}
                                validationSchema={updateUserSchema}
                                enableReinitialize={true}>
                                {({
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    touched,
                                    errors
                                }) => (
                                    <Form className="user-data-body" noValidate onSubmit={handleSubmit}>
                                        <Form.Group as={Row} controlId="name">
                                            <Col>
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nome completo"
                                                    maxLength={255}
                                                    name="nomeUsuario"
                                                    value={values.nomeUsuario}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.nomeUsuario && touched.nomeUsuario ? "input-error" : ""}
                                                    data-testid="txt-nomeUsuario"
                                                    autoComplete="name"
                                                />
                                                {errors.nomeUsuario && touched.nomeUsuario && (
                                                    <p className="error-message">{errors.nomeUsuario}</p>
                                                )}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="email">
                                            <Col>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Email"
                                                    maxLength={100}
                                                    name="emailUsuario"
                                                    value={values.emailUsuario}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.emailUsuario && touched.emailUsuario ? "input-error" : ""}
                                                    data-testid="txt-email-usuario"
                                                    autoComplete="email"
                                                />
                                                {errors.emailUsuario && touched.emailUsuario && (
                                                    <p className="error-message">{errors.emailUsuario}</p>
                                                )}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="cpf">
                                            <Col>
                                                <Form.Label>CPF</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="CPF"
                                                    minLength={15}
                                                    maxLength={15}
                                                    name="cpfUsuario"
                                                    value={values.cpfUsuario}
                                                    onChange={e => {
                                                        e.currentTarget.value = formatCPF(e.currentTarget.value);
                                                        handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    className={errors.cpfUsuario && touched.cpfUsuario ? "input-error" : ""}
                                                    data-testid="txt-cpf-usuario"
                                                    autoComplete="off"
                                                />
                                                {errors.cpfUsuario && touched.cpfUsuario && (
                                                    <p className="error-message">{errors.cpfUsuario}</p>
                                                )}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="phone">
                                            <Col>
                                                <Form.Label>Telefone</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    placeholder="Número de telefone"
                                                    minLength={15}
                                                    maxLength={15}
                                                    name="foneUsuario"
                                                    value={values.foneUsuario}
                                                    onChange={e => {
                                                        e.currentTarget.value = formatPhone(e.currentTarget.value);
                                                        handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    className={errors.foneUsuario && touched.foneUsuario ? "input-error" : ""}
                                                    data-testid="txt-fone-usuario"
                                                    autoComplete="tel-national"
                                                />
                                                {errors.foneUsuario && touched.foneUsuario && (
                                                    <p className="error-message">{errors.foneUsuario}</p>
                                                )}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="birthDate">
                                            <Col>
                                                <Form.Label>Data de Nascimento</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Data de Nascimento"
                                                    min='1922-01-01'
                                                    max={getTodayDate()}
                                                    name="dataNascUsuario"
                                                    value={values.dataNascUsuario}
                                                    onChange={handleChange}
                                                    onBlur={e => {
                                                        e.currentTarget.type = 'text';
                                                        if (e.currentTarget.value === '') {
                                                            e.currentTarget.value = '';
                                                            handleChange(e);
                                                        } else {
                                                            const date = e.currentTarget.value.replaceAll('-', '/');
                                                            const day = date.split('/')[2];
                                                            const month = date.split('/')[1];
                                                            const year = date.split('/')[0];

                                                            e.currentTarget.value = `${day}/${month}/${year}`;
                                                            handleChange(e);
                                                        }
                                                        handleBlur(e);
                                                    }}
                                                    onFocus={e => {
                                                        e.currentTarget.type = 'date';
                                                        handleChange(e);
                                                    }}
                                                    className={errors.dataNascUsuario && touched.dataNascUsuario ? "input-error" : ""}
                                                    data-testid="txt-data-nasc-usuario"
                                                    autoComplete="bday"
                                                />
                                                {errors.dataNascUsuario && touched.dataNascUsuario && (
                                                    <p className="error-message">{errors.dataNascUsuario}</p>
                                                )}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="updateUserDataBtn">
                                            <Col>
                                                <Button type="submit" text="Salvar mudanças" transparent={false} />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className="settings profile-box">
                            <h2>Configurações</h2>
                            <div className="color-theme-setting">
                                <p className="setting-name">Tema</p>
                                <p>Alterne entre o modo claro e escuro.</p>
                                <div className="theme-options">
                                    <FontAwesomeIcon icon={faSun} className={theme === 'light' ? 'selected-theme' : ''} onClick={() => handleTheme(setTheme, 'light')} />
                                    <FontAwesomeIcon icon={faMoon} className={theme === 'dark' ? 'selected-theme' : ''} onClick={() => handleTheme(setTheme, 'dark')} />
                                </div>
                            </div>
                            <div className="settings-links">
                                <a className="link-button">
                                    Termos de uso
                                </a>
                                <a className="link-button">
                                    Sobre
                                </a>
                                <a className="link-button">
                                    Suporte
                                </a>
                            </div>
                            <div className="user-settings flex">
                                <a href="#" className="link-button">
                                    Alterar senha
                                </a>
                                <a href="#" className="link-button remove-link-button">
                                    Excluir conta
                                </a>
                            </div>
                            <p className="version flex">
                                Versão 1.0
                            </p>
                        </div>
                    </div>
                </section>
                <Modal dialogClassName="transition-update-confirmation" show={showModal} onHide={closeUserUpdateConfirmation} animation={true} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{user.nomeUsuario}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        oi!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button text="Concluir" transparent={false} onClick={closeUserUpdateConfirmation} />
                    </Modal.Footer>
                </Modal>
            </section>
            <div className="nav-background" onClick={handleNavbarIsOpen}></div>
            <Footer />
        </Fragment>
    );
}

export default ProfileAndSettings;