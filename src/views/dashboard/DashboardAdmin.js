import React, { useEffect, useState } from 'react'
// import { PieChart } from '@mui/x-charts/PieChart';

import { Calendar } from 'primereact/calendar';
import { Gauge } from '@mui/x-charts';
import { RoutineInfos } from '../../apis/services/RoutineInfos';  
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CCardText,
  CCardLink,
  CCardImage,

  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { bottom, right } from '@popperjs/core';
import { Link } from 'react-router-dom';

export default function DashboardAdmin(){

  const [commercials, setCommercials] = useState([]);
  const [loading, setLoading] = useState(false  ); 
  const routineInfos = new RoutineInfos();
  const [dates, setDates] = useState(null);
  
  useEffect(  ()=>{
    const fetchRoutineInfos = async () => {

      setLoading(true);
      try{
        let data;
        data = await routineInfos.getRoutineInfosForDC();
        setCommercials(data);
      } catch(error){
        console.error('Error fetching data', error);
      }
      finally {
        setLoading(false); // Hide loader when data fetching is done
      }
    };
    fetchRoutineInfos();
  }, []);
    

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
      <div className='w-100 bg-gray'>
        <div className='h2'>
        Chiffres des commerciaux
        </div>
      </div>
      {/* <div className="row">
        <div className='col-3 my-5'>
            <Calendar variant='filled' value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection showIcon touchUI showButtonBar/>
        </div>
      </div> */}
      <section>
        <div className='row'>
            {loading ? (<ProgressSpinner />) :
              (
                  <>
                    {commercials.map((commercial) => (
                    <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6'>
                      <div className='block rounded-2 my-2 p-3 shadow'>
                        <div className='com-info-block my-3 d-flex align-items-center'>
                          <div className='img-block me-3'>
                            <img src={commercial.agentImage} className='' style={{borderRadius:'50%', height:'70px', width:'70px', objectFit:'cover'}}/>
                          </div>
                          <div className='infos'>
                            <span className='text-wrap'>{commercial.agent}</span>   
                          </div> 
                        </div>
                        <div>
                          <h6 className='fw-50'>Satistiques du commercial</h6>
                        </div> 
                        <div className='border-bottom d-flex flex-column justify-content-between'>
                          <div className='text-info d-flex justify-content-between'>
                            <span className='fz-6'>Routings demandés :</span>
                            <span className='fw-bold'>{commercial.totalPointsMarchands}</span>
                          </div>
                          <div className='text-info d-flex justify-content-between'>
                            <span>Routings éffectués :</span>
                            <span className='fw-bold'>{commercial.routingsCount}</span>
                          </div>
                          <div className='text-info d-flex justify-content-between'>
                            <span>Interventions :</span>
                            <span className='fw-bold'>{commercial.routinesCount}</span>
                          </div>
                        </div>
                        <div>
                        <Gauge
                            margin={{
                              top: 0,
                              right:30,
                              left:30,
                              bottom: 0,
                            }}
                            value={commercial.routingsCount}
                            valueMax={commercial.totalPointsMarchands}
                            // startAngle={-90}
                            // endAngle={90}
                            text={
                              ({ value, valueMax }) => `${value} / ${valueMax}`
                          }
                          width={200}
                          height={190}
                        />
                        </div>
                        <div>
                          <Link className='btn btn-link text-decoration-none link-dark' to={`/details/${commercial.id}`} style={{cursor:'pointer'}}>Voir plus</Link>
                        </div>
                      </div>
                    </div>

                    ))} 
                  </>
              )}
        </div>
      
    
      </section>
    </>
  ) 
}

