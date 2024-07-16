import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../../apis/services/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

import axios from 'axios';


export class AgentService {
    async getAgents() {
        try {
            const response = await axios.post('http://172.31.1.38:5500/api/getMyAgents', {
                bdmId: 1,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching agents:', error);
            return [];
        }
    }
}

export default function MesCommerciaux() {
    let emptyAgent = {
        id: null,
        type_agent_id: null,
        zone_commerciale_id: null,
        responsable_agent_id: null,
        nom_agent: '',
        prenom_agent: '',
        email_pro_agent: '',
        numero_telephone_agent: '',
        code_authorisation_agent: ''
    };
    const [agents, setAgents] = useState(null);
    const [agentDialog, setAgentDialog] = useState(false);
    const [deleteAgentDialog, setDeleteAgentDialog] = useState(false);
    const [deleteAgentsDialog, setDeleteAgentsDialog] = useState(false);
    const [agent, setAgent] = useState(emptyAgent);
    const [selectedAgents, setSelectedAgents] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        const agentService = new AgentService();
        agentService.getAgents().then((data) => {
        console.log('Fetched agents:', data); // Log the fetched data
        if (Array.isArray(data)) {
            setAgents(data);
        } else {
            setAgents([]);
        }
    });
    }, []);

    const openNew = () => {
        setAgent(emptyAgent);
        setSubmitted(false);
        setAgentDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAgentDialog(true);
    };

    const hideDeleteAgentDialog = () => {
        setDeleteAgentDialog(false);
    };

    const hideDeleteAgentsDialog = () => {
        setDeleteAgentsDialog(false);
    };

    const saveAgent = () => {
        setSubmitted(true);

        if (agent.name.trim()) {
            let _agents = [...agents];
            let _agent = { ...agent };

            if (agent.id) {
                const index = findIndexById(agent.id);

                _agents[index] = _agent;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Agent Updated', life: 3000 });
            } else {
                _agent.id = createId();
                _agent.image = 'agent-placeholder.svg';
                _agents.push(_agent);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Agent Created', life: 3000 });
            }

            setAgents(_agents);
            setAgentDialog(false);
            setAgent(emptyAgent);
        }
    };

    const editAgent = (agent) => {
        setAgent({ ...agent });
        setAgentDialog(true);
    };

    const confirmDeleteAgent = (agent) => {
        setAgent(agent);
        setDeleteAgentDialog(true);
    };


    const deleteAgent = () => {
        let _agents = agents.filter((val) => val.id !== agent.id);

        setAgents(_agents);
        setDeleteAgentDialog(false);
        setAgent(emptyAgent);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Agent Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < agents.length; i++) {
            if (agents[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteAgentsDialog(true);
    };

    const deleteSelectedAgents = () => {
        let _agents = agents.filter((val) => !selectedAgents.includes(val));

        setAgents(_agents);
        setDeleteAgentsDialog(false);
        setSelectedAgents(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Agents Deleted', life: 3000 });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _agent = { ...agent };

        _agent[`${name}`] = val;

        setAgent(_agent);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedAgents || !selectedAgents.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Mes Commerciaux</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const agentDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveAgent} />
        </React.Fragment>
    );
    const deleteAgentDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAgentDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteAgent} />
        </React.Fragment>
    );
    const deleteAgentsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAgentsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedAgents} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={agents} selection={selectedAgents} onSelectionChange={(e) => setSelectedAgents(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} agents" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="nom_agent" header="Nom" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="prenom_agent" header="Prénom" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="email_pro_agent" header="Email" sortable></Column>
                    <Column field="numero_telephone_agent" header="Téléphone" sortable></Column>
                    <Column field="code_authorisation_agent" header="Code d'autorisation" sortable></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={agentDialog} style={{ width: '32rem' }} header="Agent Details" modal className="p-fluid" footer={agentDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom_agent">Nom</label>
                    <InputText id="nom_agent" value={agent.nom_agent} onChange={(e) => onInputChange(e, 'nom_agent')} required autoFocus className={classNames({ 'p-invalid': submitted && !agent.nom_agent })} />
                    {submitted && !agent.nom_agent && <small className="p-error">Nom is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="prenom_agent">Prénom</label>
                    <InputText id="prenom_agent" value={agent.prenom_agent} onChange={(e) => onInputChange(e, 'prenom_agent')} required autoFocus className={classNames({ 'p-invalid': submitted && !agent.prenom_agent })} />
                    {submitted && !agent.prenom_agent && <small className="p-error">Prénom is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email_pro_agent">Email</label>
                    <InputText id="email_pro_agent" value={agent.email_pro_agent} onChange={(e) => onInputChange(e, 'email_pro_agent')} required className={classNames({ 'p-invalid': submitted && !agent.email_pro_agent })} />
                    {submitted && !agent.email_pro_agent && <small className="p-error">Email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="numero_telephone_agent">Téléphone</label>
                    <InputText id="numero_telephone_agent" value={agent.numero_telephone_agent} onChange={(e) => onInputChange(e, 'numero_telephone_agent')} required className={classNames({ 'p-invalid': submitted && !agent.numero_telephone_agent })} />
                    {submitted && !agent.numero_telephone_agent && <small className="p-error">Téléphone is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code_authorisation_agent">Code d'autorisation</label>
                    <InputText id="code_authorisation_agent" value={agent.code_authorisation_agent} onChange={(e) => onInputChange(e, 'code_authorisation_agent')} required className={classNames({ 'p-invalid': submitted && !agent.code_authorisation_agent })} />
                    {submitted && !agent.code_authorisation_agent && <small className="p-error">Code d'autorisation is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteAgentDialog} style={{ width: '32rem' }} header="Confirm" modal footer={deleteAgentDialogFooter} onHide={hideDeleteAgentDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {agent && <span>Are you sure you want to delete <b>{agent.nom_agent}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteAgentsDialog} style={{ width: '32rem' }} header="Confirm" modal footer={deleteAgentsDialogFooter} onHide={hideDeleteAgentsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {agent && <span>Are you sure you want to delete the selected agents?</span>}
                </div>
            </Dialog>
        </div>
    );
}