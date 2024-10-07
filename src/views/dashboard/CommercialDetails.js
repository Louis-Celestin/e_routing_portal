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
import { RoutineInfos } from '../../apis/services/RoutineInfos';
import { ProgressSpinner } from 'primereact/progressspinner';

const routineInfos = new RoutineInfos();

const CommercialDetails = () =>{

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [enCours, setEnCours] = useState(true);
    const [visite, setVisite] = useState(false);
    const [interventions, setInterventions] = useState(false); 
    const [commercial, setCommercial] = useState('');
    useEffect(  ()=>{
        console.log(id)
        if(id){
            const fetchRoutineInfos = async () => {
              setLoading(true);
              try{
                let data;
                data = await routineInfos.getRoutineInfosForDcByCommercial(Number(id));
                console.log(data[0].agent)
                setCommercial(data[0]);
              } catch(error){
                console.error('Error fetching data', error);
              }
              finally {
                setLoading(false); // Hide loader when data fetching is done
              }
            };
            fetchRoutineInfos();
        }
      },[Number(id)]);

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
                            <div className='col-7'>
                                <div className='border h-100 rounded-4 p-3 shadow'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <div className='mb-2'><span className='h5 text-bg-dark bg-dark rounded-3 px-2 py-1'>Commercial</span></div>
                                            <div className=''>{commercial.agent}</div>
                                            <div>{commercial.zone_commerciale}</div>
                                            <div>{commercial.bdmAgent}</div>
                                        </div>
                                        <div className='img-block me-3'>
                                            <img src={commercial.agentImage} className='' style={{borderRadius:'50%', height:'120px', width:'120px', objectFit:'cover'}}/>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between mt-3 w-100'>
                                        <Button type='button' label='Routing en cours' severity='secondary' onClick={button1} badge={String(commercial.totalPointsMarchands)} icon='pi pi-angle-down' style={{fontSize:"11px"}} />
                                        <Button type='button' label='Marchands visités' severity='secondary' onClick={button2} badge={String(commercial.routingsCount)} icon='pi pi-angle-down' style={{fontSize:"11px"}} />
                                        <Button type='button' label='Interventions' severity='secondary' onClick={button3} badge={String(commercial.routineEffectués)} icon='pi pi-angle-down' style={{fontSize:"11px"}} />
                                    </div>
                                    <div>
                                        <div className='border mt-2 p-1'>
                                            {enCours? (
                                                <DataTable>
                                                <Column header='Nom du Point Marchand'></Column>
                                                <Column header='Période du routing'></Column>
                                                <Column header='Date de visite'></Column>
                                                </DataTable>
                                            ) : (
                                                visite ? (
                                                    <DataTable>
                                                        <Column header='Nom des Point Marchand'></Column>
                                                        <Column header='Période du routing'></Column>
                                                        <Column header='Date de visite'></Column>
                                                    </DataTable>
                                                ) : (
                                                    <DataTable>
                                                        <Column header='Nome du Point Marchand'></Column>
                                                        <Column header='Période du routing'></Column>
                                                        <Column header='Date de visite'></Column>
                                                    </DataTable>
                                                )
                                            ) }
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='col'>
                                <div className='border h-100 rounded-4 p3 shadow'>
                                    <div className='d-flex flex-column align-items-center h-100'>
                                        <div className='text-center mt-2'>Marchands visités</div>
                                        <div className=''>
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