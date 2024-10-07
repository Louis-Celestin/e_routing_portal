import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from '../../../services/authService'

const Login = () => {
  
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // setLoading(true);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(username, password);
      console.log('API Response:', response);
      window.sessionStorage.setItem('token', response.user.token);
      window.sessionStorage.setItem('id', response.user.id);
      window.sessionStorage.setItem('name', response.user.username_user);
      window.sessionStorage.setItem('user_type', response.user.agent.type_agent_id);
      window.sessionStorage.setItem('bdmId', response.bdmId);
      const bdmId = window.sessionStorage.getItem('bdmId');
      console.log("BDM ID : ", bdmId)
      const user_type = window.sessionStorage.getItem('user_type');
      console.log(user_type)
      if(user_type === '9'){
        console.log('It works')
        navigate('/admin-dashboard')
      }
      else{
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('error')
      setError('Utilisateur ou mot de passe incorrects');
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          {loading ? (<ProgressSpinner />) :
          (
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Connexion</h1>
                    <p className="text-body-secondary">Connectez-vous!</p>
                    {error && <p className="text-danger">{error}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                      placeholder="Username" 
                      autoComplete="username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Se connecter
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h1>E-ROUTING PORTAL</h1>
                    <p>
                     
                    </p>
                    <p></p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
)}
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
