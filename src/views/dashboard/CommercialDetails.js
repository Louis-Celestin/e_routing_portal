import React, { useEffect, useState } from 'react'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Gauge } from '@mui/x-charts';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import { useParams } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { RoutineInfos } from '../../apis/services/RoutineInfos';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useLocation } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Link } from 'react-router-dom';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import "leaflet/dist/leaflet.css"



import 'primeicons/primeicons.css';
import {
    cilLocationPin,
    cilGroup,
    cilUser,
    cilReload
  } from '@coreui/icons'
import CIcon from '@coreui/icons-react';

const routineInfos = new RoutineInfos();

const CommercialDetails = () =>{


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const debut = queryParams.get('debut');
    const fin = queryParams.get('fin');
    const [debutValue, setDebut] = useState(null);
    const [finValue, setFin] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [enCours, setEnCours] = useState(true);
    const [visite, setVisite] = useState(false);
    const [interventions, setInterventions] = useState(false);
    const [dates, setDates] = useState(null);
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [commercial, setCommercial] = useState('');
    const [badge1, setBadge1] = useState('');
    const [badge2, setBadge2] = useState('');
    const [badge3, setBadge3] = useState('');


    const formatDate = (date) => {
        return date.toISOString().slice(0, 10); // Convert to "YYYY-MM-DD"
      };
    
    useEffect(  ()=>{
       
        console.log(id)
        console.log(fin)
        if(id){
            const fetchRoutineInfos = async () => {
              setLoading(true);
              try{
                let data;
                if(fin === 'null'){
                    if(dates && dates.length === 2){
                        const [dateDebut, dateFin] = dates
                        data = await routineInfos.getRoutineInfosForDcByCommercialByDateRange(Number(id), formatDate(dateDebut), formatDate(dateFin))
                    }else{
                        data = await routineInfos.getRoutineInfosForDcByCommercial(Number(id));
                        console.log(data[0].agent)
                    }
                }
                else{
                    if(dates && dates.length === 2){
                        const [dateDebut, dateFin] = dates
                        data = await routineInfos.getRoutineInfosForDcByCommercialByDateRange(Number(id), formatDate(dateDebut), formatDate(dateFin))
                        console.log('Calendar')
                    }else{
                        setDebut(debut)
                        setFin(fin)
                        console.log(debutValue)
                        data = await routineInfos.getRoutineInfosForDcByCommercialByDateRange(Number(id), debutValue, finValue);
                        console.log(data[0].agent)
                    }
                }
                setCommercial(data[0]);
                if (data[0].listePmAvisiter > 0){
                    if(data[0].totalPointsMarchands >= data[0].listePmAvisiter){
                        setBadge1('p-badge-success')
                        setBadge2('p-badge-success')
                    }else if(data[0].listePmAvisiter > data[0].totalPointsMarchands){
                        setBadge1('')
                        setBadge2('p-badge-warning')
                    }else{
                        setBadge1('')
                        setBadge2('')
                    }
                }
                if (data[0].routineEffectués > 0){
                    if(data[0].routineEffectués >= 7){
                        setBadge3('p-badge-success')
                    }else{
                        setBadge3('p-badge-warning')
                    }
                }else{
                    setBadge3('')
                }
              } catch(error){
                console.error('Error fetching data', error);
              }
              finally {
                setLoading(false); // Hide loader when data fetching is done
              }
            };
            fetchRoutineInfos();
        }
      },[Number(id),dates,debutValue,finValue]);


      const button1 = () =>{
        setEnCours(true)
        setVisite(false)
        setInterventions(false)
      }
      const button2 = () =>{
        setEnCours(false)
        setVisite(true)
        setInterventions(false)
      }
      const button3 = () =>{
        setEnCours(false)
        setVisite(false)
        setInterventions(true)
      }

      const clearFilter = () => {
        initFilters();
    };
    
    const setToday = () => {
        const today = new Date();
        setDates([today, today]); // Set today's date as both the start and end of the range
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            nom_Pm: { value: null, matchMode: 'contains' },
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <>
                <div className="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                    {/* <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" /> */}
                </div>
            </>
        );
    };

    const header = renderHeader();

    const NomPMcontent = (rowData) =>{
        return <Link to={`/routine-details/${rowData.idRoutine}`} className='text-decoration-none link-dark link-opacity-75 link-opacity-100-hover d-flex justify-content-between'>
                    <span>{rowData.nom_Pm}</span>
               </Link>
    }

    return (
        <>
            {loading? (<ProgressSpinner/>) : 
            (<>
                <section>
                    <div className='container'>
                        <div className='h2 text-black-400'>Toutes les informations sur <span className='text-yellow-400'>{commercial.agent}</span></div> 
                    </div>
                </section>
                <section>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xxl-7 my-1 col-xl-8 col-sm-12'>
                                <div className='border h-100 rounded-4 p-3 shadow'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <div className='mb-2'><span className='h5 text-bg-dark bg-dark rounded-3 px-2 py-1'>Commercial</span></div>
                                            <div className=''><CIcon icon={cilUser} className='text-grey-600'/> {commercial.agent}</div>
                                            <div><CIcon icon={cilLocationPin} className='text-grey-600'/> {commercial.zone_commerciale}</div>
                                            <div><CIcon icon={cilGroup} className='text-grey-600'/> {commercial.bdmAgent}</div>
                                        </div>
                                        <div className='img-block me-3'>
                                            <img src={commercial.agentImage} className='' style={{borderRadius:'50%', height:'120px', width:'120px', objectFit:'cover'}}/>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between mt-3 w-100'>
                                        <Button type='button' label='Routings demandés' severity='secondary' onClick={button1} badge={String(commercial.totalPointsMarchands)} icon='pi pi-angle-down' style={{fontSize:"11px"}} />
                                        <Button type='button' label='Routings effectués' severity='secondary' onClick={button2} badge={String(commercial.routinesCount)} icon='pi pi-angle-down' style={{fontSize:"11px"}} />
                                        <Button type='button' label='Interventions' severity='secondary' onClick={button3} badge={String(commercial.routineEffectués)} badgeClassName={badge3} icon='pi pi-angle-down' style={{fontSize:"11px"}} />
                                    </div>
                                    <div>
                                        <div className='border mt-2 p-1'>
                                            {enCours? (
                                                <DataTable value={commercial.listePmAvisiter} paginator showGridlines rows={5} filters={filters} globalFilterFields={['nom_Pm']} header={header} emptyMessage="No data found.">
                                                    <Column field='nom_Pm' filter header='Nom du Point Marchand'></Column>
                                                    {/* <Column header='Date de visite'></Column> */}
                                                </DataTable>
                                            ) : (
                                                visite ? (
                                                    <DataTable value={commercial.listePmroutinesVisités} paginator showGridlines rows={5} filters={filters} globalFilterFields={['nom_Pm']} header={header} emptyMessage="No data found.">
                                                        <Column field='nom_Pm' filter header='Nom du Point Marchand'></Column>
                                                        <Column field='date' sortable header='Date de visite'></Column>
                                                    </DataTable>
                                                ) : (
                                                    <DataTable value={commercial.listeInterventios} paginator showGridlines rows={5} filters={filters} globalFilterFields={['nom_Pm']} header={header} emptyMessage="No data found.">
                                                        <Column field='nom_Pm' filter header='Nom du Point Marchand' body={NomPMcontent}></Column>
                                                        <Column field='date' sortable header='Date de visite'></Column>
                                                    </DataTable>
                                                )
                                            ) }
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='col-xxl-5 my-1 col-xl-4 col-sm-12'>
                                <div className='border h-100 rounded-4 p-3 shadow'>
                                    <div className='d-flex flex-column align-items-center h-100'>
                                        <div className='text-center w-100'>
        
                                            <Button type="button" onClick={setToday} icon="pi pi-history" label="Today" outlined />
                                        
                                        </div>
                                        <div className='my-5 py-5 w-100 text-center border-bottom'>
                                            <Calendar variant='filled' value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput showIcon hideOnRangeSelection touchUI showButtonBar/>
                                        </div>
                                        <div className='text-center mt-2'>Statistiques routings</div>
                                        <div className=''>
                                            <Gauge
                                                margin={{
                                                top: 0,
                                                right:30,
                                                left:30,
                                                bottom: 0,
                                                }}
                                                value={commercial.routinesCount}
                                                valueMax={commercial.totalPointsMarchands}
                                                aria-valuetext="Routings effectués sur routing demandés"
                                                // startAngle={-90}
                                                // endAngle={90}
                                                text={
                                                    ({ value, valueMax }) => `${value} / ${valueMax}`
                                                }
                                                
                                                width={200}
                                                height={190}
                                            />
                                        </div>
                                        <div className='text-center mt-2 fw-bold text-grey-700' style={{fontSize:'12px'}}>Routings effectués / Routings demandés</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>)}
            
        
        </>
    )

} 

export default CommercialDetails