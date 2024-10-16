import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import user_profile from './../../assets/images/avatars/user_profile.png'

import { useNavigate } from 'react-router-dom';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const [user_image, setImage] = useState(null)
  const [isPictured, setPictured] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('bdmId');
    navigate('/login');
  };

  useEffect(() =>{
    const user_image_value = window.sessionStorage.getItem('user_image')
    if(user_image_value != 'undefined'){
      setImage(user_image_value)
    }else{
      setImage(user_profile)
    }
  },[])



  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
            <img src={user_image} style={{borderRadius:'50%', height:'30px', width:'30px', objectFit:'cover'}}/>
          {/* <img src={user_profile} style={{borderRadius:'50%', height:'30px', width:'30px', objectFit:'cover'}}/> */}

        
        
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Settings</CDropdownHeader>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem href='#'  onClick={handleLogout} >
          <CIcon icon={cilAccountLogout} className='me-2' />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
