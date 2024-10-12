import React, { useEffect, useState } from 'react'
// import { PieChart } from '@mui/x-charts/PieChart';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

import { Calendar } from 'primereact/calendar';
import { Gauge } from '@mui/x-charts';
import { RoutineInfos } from '../../apis/services/RoutineInfos';  
import { ProgressSpinner } from 'primereact/progressspinner';
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
import { bottom, end, right } from '@popperjs/core';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const [commercials, setCommercials] = useState([]);
  const [loading, setLoading] = useState(false); 
  const routineInfos = new RoutineInfos();
  const [dates, setDates] = useState(null);
  const [debut, setDebut] = useState(null);
  const [fin, setFin] = useState(null);
  
  const formatDate = (date) => {
    return date.toISOString().slice(0, 10); // Convert to "YYYY-MM-DD"
  };

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
          data = await routineInfos.getRoutineInfosByDateRange(formatDate(startDate), formatDate(endDate));
        } else{
          data = await routineInfos.getRoutineInfos();
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
            <Calendar variant='filled' value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput showIcon hideOnRangeSelection touchUI showButtonBar/>
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
      {/* <CRow>
        <CCol>
          <CCard style={{ width: '18rem' }} className='bg-success-subtle'>
            <CCardImage orientation="top" src={react} />
            <CCardBody>
              <CCardTitle>Infos Admin</CCardTitle>
              <CCardSubtitle className="mb-2 text-body-secondary">Maïmouna Diop</CCardSubtitle>
              <CCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </CCardText>
              <CCardText>120 Marchands</CCardText>
              <CCardLink href="#">Card link</CCardLink>
              <CCardLink href="#">Another link</CCardLink>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard style={{ width: '18rem' }} className='bg-success-subtle'>
            <CCardImage orientation="top" src={react} />
            <CCardBody>
              <CCardTitle>Infos Admin</CCardTitle>
              <CCardSubtitle className="mb-2 text-body-secondary">Maïmouna Diop</CCardSubtitle>
              <CCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </CCardText>
              <CCardText>120 Marchands</CCardText>
              <CCardLink href="#">Card link</CCardLink>
              <CCardLink href="#">Another link</CCardLink>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard style={{ width: '18rem' }} className='bg-success-subtle'>
            <CCardImage orientation="top" src={react} />
            <CCardBody>
              <CCardTitle>Infos Admin</CCardTitle>
              <CCardSubtitle className="mb-2 text-body-secondary">Maïmouna Diop</CCardSubtitle>
              <CCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </CCardText>
              <CCardText>120 Marchands</CCardText>
              <CCardLink href="#">Card link</CCardLink>
              <CCardLink href="#">Another link</CCardLink>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard style={{ width: '18rem' }} className='bg-success-subtle'>
            <CCardImage orientation="top" src={react} />
            <CCardBody>
              <CCardTitle>Infos Admin</CCardTitle>
              <CCardSubtitle className="mb-2 text-body-secondary">Maïmouna Diop</CCardSubtitle>
              <CCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </CCardText>
              <CCardText>120 Marchands</CCardText>
              <CCardLink href="#">Card link</CCardLink>
              <CCardLink href="#">Another link</CCardLink>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}

      {/* <WidgetsDropdown className="mb-4" /> */}
      {/* <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      <WidgetsBrand className="mb-4" withCharts />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Recurring Clients
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Country
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Payment Method
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Last login</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  )
}

export default Dashboard
