import React from 'react';
import { useEffect, useState } from 'react';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import CIcon from '@coreui/icons-react';
import { cilSettings } from '@coreui/icons';
import { CForm } from '@coreui/react';
import { Link } from 'react-router-dom';


const ResetPassword = () => {
    

    const [isDirector, setDirector] = useState(false)
    useEffect(() => {
        const user_type = window.sessionStorage.getItem('user_type');
        if (user_type === '9'){
            setDirector(true)
        }else{
            setDirector(false)
        }
    },[]);

    return (

        <>
            <section>
                <div className='container vh-100'>
                    <div className='row h-100 d-flex justify-content-center align-items-center'>
                        <div className='col-lg-6 col-xs-10'>
                            <div className='border rounded-2 p-3'>
                                <div className='h3 d-flex justify-content-center'>
                                    Modifiez votre mot de passe
                                    <CIcon icon={cilSettings} />
                                </div>
                                <div>
                                    <CForm>
                                        <div class="form-floating my-4 border-bottom pb-4">
                                            <input type="password" class="form-control" id="oldpass"  placeholder="Ancien mot de passe"/>
                                            <label for="oldpass">Ancien mot de passe</label>
                                            {/* <small id="oldpasshelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                        </div>
                                        <div class="form-floating my-4">
                                            <input type="password" class="form-control" id="newpass1"  placeholder="Nouveau mot de passe"/>
                                            <label for="oldpass">Nouveau mot de passe</label>
                                            <small id="newpasshelp" class="form-text text-muted">Choisissez un mot de passe sécurisé</small>
                                        </div>
                                        <div class="form-floating my-4">
                                            <input type="password" class="form-control" id="newpass2"  placeholder="Confirmer"/>
                                            <label for="oldpass">Confirmer</label>
                                            <small id="newpasshelp2" class="form-text text-muted"></small>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            {isDirector ? (
                                                <Link to={"/admin-dashboard"}><button type='button' className='btn btn-ghost-danger'>Annuler</button></Link>
                                            ) : (
                                                <Link to={"/dashboard"}><button type='button' className='btn btn-ghost-danger'>Annuler</button></Link>
                                            )}
                                             
                                            <button type='button' className='btn btn-ghost-dark'>Confimer</button>
                                        </div>
                                    </CForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>        

        </>
    )
}

export default ResetPassword