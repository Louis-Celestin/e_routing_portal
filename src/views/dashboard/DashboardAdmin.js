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
  const [debut, setDebut] = useState(null);
  const [fin, setFin] = useState(null);

  const formatDate = (date) => {
    return date.toISOString().slice(0, 10); // Convert to "YYYY-MM-DD"
  };
  
  // useEffect(  ()=>{
  //   const fetchRoutineInfos = async () => {

  //     setLoading(true);
  //     try{
  //       let data;
  //       data = await routineInfos.getRoutineInfosForDC();
  //       setCommercials(data);
  //     } catch(error){
  //       console.error('Error fetching data', error);
  //     }
  //     finally {
  //       setLoading(false); // Hide loader when data fetching is done
  //     }
  //   };
  //   fetchRoutineInfos();
  // }, []);

  useEffect(  ()=>{
    const fetchRoutineInfos = async () => {

      setLoading(true);
      try{
        let data;
        if (dates && dates.length === 2){
          const [startDate, endDate] = dates;
          console.log(formatDate(startDate))
          console.log(formatDate(endDate))
          setDebut(formatDate(startDate))
          setFin(formatDate(endDate))
          data = await routineInfos.getRoutineInfosForDCByDateRange(formatDate(startDate), formatDate(endDate));
        } else{
          data = await routineInfos.getRoutineInfosForDC();
        }
        setCommercials(data);
      } catch(error){
        console.error('Error fetching data', error);
      }
      finally {
        setLoading(false); // Hide loader when data fetching is done
      }
    };
    fetchRoutineInfos();
  }, [dates]);
    

  return (
    <>
      <div className='w-100 bg-gray'>
        <div className='h2'>
        Chiffres des commerciaux
        </div>
      </div>
      <div className="row">
        <div className='col-3 my-5'>
            <Calendar variant='filled' value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection showIcon touchUI showButtonBar/>
        </div>
      </div>
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
                            <span className='fw-bold'>{commercial.routinesCount}</span>
                          </div>
                          <div className='text-info d-flex justify-content-between'>
                            <span>Interventions :</span>
                            <span className='fw-bold'>{commercial.routineEffectués}</span>
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
                            value={commercial.routinesCount}
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
                          <Link className='btn btn-link text-decoration-none link-dark' to={`/details/${commercial.id}?debut=${debut}&fin=${fin}`} style={{cursor:'pointer'}}>Voir plus</Link>
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

