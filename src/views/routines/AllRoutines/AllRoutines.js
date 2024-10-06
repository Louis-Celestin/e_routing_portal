import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { RoutineService } from '../../../apis/services/RoutineService';
import { Image } from 'primereact/image';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

export default function AdvancedFilterDemo() {

    const [routines, setRoutines] = useState(null);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    
    const routineService = new RoutineService()

    useEffect(() => {
        routineService.getAllRoutinesByBdm().then((data)=>{setRoutines(data)})
        setLoading(false)
        initFilters();
    }, []);


    const formatDate = (value) => {
        return value.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const clearFilter = () => {
        initFilters();
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
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            nom_agent: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            prenom_agent: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            point_marchand_routine: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            date_routine: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            veille_concurentielle_routine: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            id_terminal_tpe_routine: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            etat_tpe_routine: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            etat_chargeur_tpe_routine: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            probleme_bancaire: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            description_problemebancaire: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            probleme_mobile: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            description_probleme_mobile: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            commentaire_routine: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            commenttaire_tpe_routine: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <>
                <span className="text-xl text-900 font-bold">Routines</span>
                <div className="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                    <IconField iconPosition="right">
                        <InputIcon className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </IconField>
                </div>
            </>
        );
    };

    const dateRoutineBodyTemplate = (rowData) => {
        return formatDate(new Date(rowData.date_routine));
    };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />;
    };

    const imageTpeBodyTemplate = (rowData)=>{
        return <Image src={`${rowData.image_tpe_routine}`} zoomSrc={`${rowData.image_tpe_routine}`}  alt={rowData.image_tpe_routine} width="30" height="20"  className="w-2rem shadow-2 border-round" preview/>;
    }

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={routines} paginator showGridlines rows={10} loading={loading} dataKey="id" 
                    filters={filters} globalFilterFields={['nom_agent', 'prenom_agent', 'point_marchand_routine', 'date_routine', 'veille_concurentielle_routine', 'id_terminal_tpe_routine', 'etat_tpe_routine', 'etat_chargeur_tpe_routine', 'probleme_bancaire', 'description_problemebancaire', 'probleme_mobile', 'description_probleme_mobile', 'commentaire_routine', 'commenttaire_tpe_routine']} header={header}
                    emptyMessage="No routines found.">
                <Column field="nom_agent" header="Nom agent" filter filterPlaceholder="Search by Nom agent" style={{ minWidth: '12rem' }} />
                <Column field="prenom_agent" header="Prenom agent" filter filterPlaceholder="Search by Prenom agent" style={{ minWidth: '12rem' }} />
                <Column field="point_marchand_routine" header="PM" filter filterPlaceholder="Search by PM" style={{ minWidth: '14rem' }} />
                <Column field="date_routine" header="Date" sortable filterElement={dateFilterTemplate} style={{ minWidth: '10rem' }} body={dateRoutineBodyTemplate} />
                <Column field="veille_concurentielle_routine" header="Concurence" filter filterPlaceholder="Search by Concurence" style={{ minWidth: '10rem' }} />
                <Column field="id_terminal_tpe_routine" header="SN" filter filterPlaceholder="Search by SN" style={{ minWidth: '12rem' }} />
                <Column field="etat_tpe_routine" header="Etat TPE" filter filterPlaceholder="Search by Etat TPE" style={{ minWidth: '12rem' }} />
                {/* <Column field="etat_chargeur_tpe_routine" header="Etat chargeur" filter filterPlaceholder="Search by Etat chargeur" style={{ minWidth: '8rem' }} /> */}
                {/* <Column field="probleme_bancaire" header="Probleme bancaire" filter filterPlaceholder="Search by Probleme bancaire" style={{ minWidth: '8rem' }} /> */}
                {/* <Column field="description_problemebancaire" header="Description probleme bancaire" filter filterPlaceholder="Search by Description probleme bancaire" style={{ minWidth: '8rem' }} /> */}
                {/* <Column field="probleme_mobile" header="Probleme mobile" filter filterPlaceholder="Search by Probleme mobile" style={{ minWidth: '8rem' }} /> */}
                {/* <Column field="description_probleme_mobile" header="Description probleme mobile" filter filterPlaceholder="Search by Description probleme mobile" style={{ minWidth: '8rem' }} /> */}
                <Column field="commentaire_routine" header="Commentaire routine" filter filterPlaceholder="Search by Commentaire routine" style={{ minWidth: '12rem' }} />
                <Column field="commenttaire_tpe_routine" header="Commentaire TPE" filter filterPlaceholder="Search by Commentaire TPE" style={{ minWidth: '12rem' }} />
                <Column field="image_tpe_routine" header="Image TPE" body={imageTpeBodyTemplate}  style={{ maxWidth: '5rem' }} />
            </DataTable>
        </div>
    );
}
