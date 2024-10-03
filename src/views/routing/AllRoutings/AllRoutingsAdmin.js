import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { RoutingService } from '../../../apis/services/RoutingService';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

export default function RoutingTable() {

    const [routings, setRoutings] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    
    const routingService = new RoutingService();

    useEffect(() => {
        routingService.allRoutings().then((data) => {
            setRoutings(data);
            setLoading(false);
        });
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
            global: { value: null, matchMode: 'contains' },
            agent: {value: null, matchMode: 'contains' },
            agent_routing_id: { value: null, matchMode: 'equals' },
            description_routing: { value: null, matchMode: 'startsWith' },
            date_debut_routing: { value: null, matchMode: 'dateIs' },
            date_fin_routing: { value: null, matchMode: 'dateIs' }
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <>
                <span className="text-xl text-900 font-bold">Routings</span>
                <div className="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </div>
            </>
        );
    };

    const dateDebutBodyTemplate = (rowData) => {
        return formatDate(new Date(rowData.date_debut_routing));
    };

    const dateFinBodyTemplate = (rowData) => {
        return formatDate(new Date(rowData.date_fin_routing));
    };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />;
    };

    const agentBodyTemplate = (rowData) => {
        const agent = rowData.bdm;
        const fullName = agent.nom_bdm + " " + agent.prenom_bdm;
        return fullName;
    }

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={routings} paginator showGridlines rows={10} loading={loading} dataKey="id"
                filters={filters} globalFilterFields={['agent', 'agent_routing_id', 'description_routing', 'date_debut_routing', 'date_fin_routing']}
                header={header} emptyMessage="No routings found.">
                <Column field="agent" header="BDM" body={agentBodyTemplate} style={{ minWidth: '8rem' }}></Column>
                <Column field="description_routing" header="Description" filter filterPlaceholder="Search by Description" style={{ minWidth: '12rem' }} />
                <Column field="date_debut_routing" header="Start Date" filter filterElement={dateFilterTemplate} style={{ minWidth: '10rem' }} body={dateDebutBodyTemplate} />
                <Column field="date_fin_routing" header="End Date" filter filterElement={dateFilterTemplate} style={{ minWidth: '10rem' }} body={dateFinBodyTemplate} />
            </DataTable>
        </div>
    );
}
