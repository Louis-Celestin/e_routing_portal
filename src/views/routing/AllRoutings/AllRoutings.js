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
import { RoutingService } from '../../../apis/services/RoutingService';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from "primereact/autocomplete";
import { ProgressSpinner } from 'primereact/progressspinner';



export default function AllRoutings() {
    const routingService = new RoutingService()
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const [loading, setLoading] = useState(false);

    const [dateDebut, setDateDebut] = useState(null)
    const [dateFin, setDateFin] = useState(null)
    const [descriptionRouting,setDescriptionRouting] = useState(null)
    const [pointsMarchands, setPointsMarchands] = useState([]);
    const [selectedPointsmarchands, setSelectedPointsMarchands] = useState(null);
    const [filteredPointsMarchands, setfilteredPointsMarchands] = useState(null);
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [filteredAgents, setFilteredAgents] = useState(null);
    const [selectedAgentId, setSelectedAgentId] = useState(null);
    const [products, setProducts] = useState(null);
    const [routings, setRoutings] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const formatDate = (value) => {
        return value.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const toast = useRef(null);
    const dt = useRef(null);

    const Loader = () => (
        <div className="loader">
            <style>
                {`
                    .loader {
                        border: 16px solid #f3f3f3; /* Light grey */
                        border-top: 16px solid #3498db; /* Blue */
                        border-radius: 50%;
                        width: 120px;
                        height: 120px;
                        animation: spin 2s linear infinite;
                    }
    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
    


    
    
    const search = (event) => {
        setTimeout(() => {
            let _filteredAgents = [...agents];

            if (event.query.trim().length) {
                _filteredAgents = agents.filter((agent) => {
                    return agent.fullName.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            console.log(_filteredAgents); 
            setFilteredAgents(_filteredAgents)
        }, 250);
    };

    const searchPm = (event) => {
        
        setTimeout(() => {
            let _filteredPms;

            if (!event.query.trim().length) {
                _filteredPms = [...pointsMarchands];
            }
            else {
                _filteredPms = pointsMarchands.filter((pointMarchand) => {
                    return pointMarchand.POINT_MARCHAND.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setfilteredPointsMarchands(_filteredPms);
        }, 250);
    }

    const onAgentChange = (e) => {
        setSelectedAgent(e.value);
        setSelectedAgentId(e.value ? e.value.id : null);
        
    };

    const onChangeDescription = (e)=>{
        setDescriptionRouting(e.target.value)
    }

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
        routingService.getRoutingByBdm().then((data)=>setRoutings(data))
        routingService.getMyAgents().then((data) => {         
            const agentsWithFullName = data.map(agent => ({
                ...agent,
                fullName: `${agent.nom_agent} ${agent.prenom_agent}`
            }));
            setAgents(agentsWithFullName);
        });

        routingService.getPms().then((data)=>setPointsMarchands(data))
    }, []);

     
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setLoading(false)
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

        const formatSeletedPms = () => {
        return selectedPointsmarchands.map(pms => ({
            nom_Pm: pms.POINT_MARCHAND
        }));
    };

// const saveRouting = () => {
// setSubmitted(true)
//     let routing_data = {
//         description_routing: descriptionRouting,
//         date_debut_routing: dateDebut,
//         date_fin_routing: dateFin,
//         bdm: 1,
//         agent: selectedAgentId,
//         pm_routing: formatSeletedPms()  // Utiliser directement le résultat de la fonction
//     };

//     routingService.saveRouting(routing_data).then((result)=>{
//         if(result){
//             return <Toast/>
//         }
//     }).catch(err=>{
//         console.log(err)
//     })

//     console.log(routing_data);
// };
const showToast = (severityValue, summaryValue, detailValue)=> {
    toast.current.show({
    severity: severityValue,
    summary: summaryValue,
    detail: detailValue,})
}
const saveRouting = async () => {
    let routing_data = {
        description_routing: descriptionRouting,
        date_debut_routing: dateDebut,
        date_fin_routing: dateFin,
        bdm: 1,
        agent: selectedAgentId,
        pm_routing: formatSeletedPms()
    };
    setLoading(true)
    try {
        const result = await routingService.saveRouting(routing_data);
        console.log(result)
        if (result) {
            setSubmitted(true);  // Afficher le loader
            showToast('success','Success Message','Le routing est créé avec succès.');
            setLoading(false);  // Cacher le loader
            hideDialog(); // Fermer le modal
            // toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Routing créé avec succès', life: 3000 });
        }
        else{
            setSubmitted(false);  // Afficher le loader
            showToast('error','Error Message','Erreur dans la création du routing.');
            setLoading(false);  // Cacher le loader
            hideDialog(); // Fermer le modal
        }

    } catch (err) {
        console.error(err);
        setSubmitted(false);
        showToast('error','Error Message',"Erreur dans la création du routing.");
        setLoading(false);  // Cacher le loader
        hideDialog(); // Fermer le modal
    } finally {
        setLoading(false);  // Cacher le loader
        hideDialog(); // Fermer le modal
    }
};



    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
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
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nouveau" icon="pi pi-plus" severity="success" onClick={openNew} />
                {/* <Button label="Supprimer" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Exporter" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    // MES TEMPLATES

    const descriptionBodyTemplate = (rowData)=>{
        return rowData.description_routing
    }

    const dateDebutBodyTemplate = (rowData)=>{

        return formatDate(new Date(rowData.date_debut_routing))

    }

    const dateFinBodyTemplate = (rowData)=>{

        return formatDate(new Date(rowData.date_fin_routing))

    }


    const agentBodyTemplate = (rowData) => {
        const agent = rowData.agent;
        const fullName = agent.nom_agent + " " + agent.prenom_agent;
        return fullName;
    }
    

    const pmBodytemplate = (rowData) => {
        let dataFormat = JSON.parse(rowData.pm_routing);
        let formattedPmNames = dataFormat.map((element) => {
          if (Array.isArray(element.nom_Pm)) {
            return element.nom_Pm.join(', ');
          } else {
            return element.nom_Pm;
          }
        });
      
        return formattedPmNames.join(', ');
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
            <h4 className="m-0">Mes Routings</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="Rechercher" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="rechercher..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <div className="p-d-flex p-ai-center p-jc-between">

                <Button label="Créer" icon="pi pi-check" onClick={saveRouting} />
            <Button label="Annuler" icon="pi pi-times" onClick={hideDialog} className="p-button-secondary" />
        </div>
    );
    
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={routings} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="description_routing" header="Nom du routing" body={descriptionBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="date_debut_routing" header="Date de debut" body={dateDebutBodyTemplate} sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="date_fin_routing" header="Date de fin" body={dateFinBodyTemplate}></Column>
                    <Column field="pm_routing" header="PM" body={pmBodytemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="agent" header="Commercial" body={agentBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    {/* <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
                </DataTable>
            </div>

            {/* <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Details du routing" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Nom du routing
                    </label>
                    <InputText id="description" onChange={onChangeDescription} required autoFocus className={classNames({ 'p-invalid': submitted && !descriptionRouting })} />
                    {submitted && !descriptionRouting && <small className="p-error">Le nom du routing est obligatoire.</small>}
                </div>
                <div className="field">
                    <label htmlFor="date_debut_routing" className="font-bold">
                        Date de debut du routing
                    </label>
                    <Calendar id="buttondisplay" onChange={(e) => setDateDebut(e.value)} showIcon />
                </div>
                <div className="field">
                    <label htmlFor="date_fin_routing" className="font-bold">
                        Date de fin du routing
                    </label>
                    <Calendar id="buttondisplay"  onChange={(e) => setDateFin(e.value)} showIcon />
                </div>

                <div className="card flex justify-content-center">
                <label htmlFor="commercial" className="font-bold">
                        Commercial
                    </label>
                    <>
            <AutoComplete
                field="fullName"
                value={selectedAgent}
                suggestions={filteredAgents}
                completeMethod={search}
                onChange={onAgentChange}
                required
                itemTemplate={(item) => (
                    <div>{item.fullName}</div>
                )}
            />
        </>
        </div>
        <div className="card flex justify-content-center">
                <label htmlFor="ponit_marchand" className="font-bold">
                        Points marchands
                    </label>
                    <>
                    <AutoComplete field="POINT_MARCHAND" multiple value={selectedPointsmarchands} suggestions={filteredPointsMarchands} completeMethod={searchPm} onChange={(e) => setSelectedPointsMarchands(e.value)} required/>
        </>
        </div>
            </Dialog> */}

{/* <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Details du routing" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
    {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
    <div className="field">
        <label htmlFor="description" className="font-bold">
            Nom du routing
        </label>
        <InputText id="description" onChange={onChangeDescription} required autoFocus className={classNames({ 'p-invalid': submitted && !descriptionRouting })} />
        {submitted && !descriptionRouting && <small className="p-error">Le nom du routing est obligatoire.</small>}
    </div>
    <div className="field">
        <label htmlFor="date_debut_routing" className="font-bold">
            Date de debut du routing
        </label>
        <Calendar id="buttondisplay" onChange={(e) => setDateDebut(e.value)} showIcon />
    </div>
    <div className="field">
        <label htmlFor="date_fin_routing" className="font-bold">
            Date de fin du routing
        </label>
        <Calendar id="buttondisplay" onChange={(e) => setDateFin(e.value)} showIcon />
    </div>

    <div className="card flex justify-content-center">
        <label htmlFor="commercial" className="font-bold">
            Commercial
        </label>
        <AutoComplete
            field="fullName"
            value={selectedAgent}
            suggestions={filteredAgents}
            completeMethod={search}
            onChange={onAgentChange}
            required
            itemTemplate={(item) => (
                <div>{item.fullName}</div>
            )}
        />
    </div>
    <div className="card flex justify-content-center">
        <label htmlFor="ponit_marchand" className="font-bold">
            Points marchands
        </label>
        <AutoComplete field="POINT_MARCHAND" multiple value={selectedPointsmarchands} suggestions={filteredPointsMarchands} completeMethod={searchPm} onChange={(e) => setSelectedPointsMarchands(e.value)} required />
    </div>
</Dialog> */}
<Toast ref={toast} />
<Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Détails du routing" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
    {loading ? (<ProgressSpinner />) :
    (
        <>
    <div className="field">
        <label htmlFor="description" className="font-bold">Nom du routing</label>
        <InputText id="description" value={descriptionRouting} onChange={onChangeDescription} required autoFocus className={classNames({ 'p-invalid': submitted && !descriptionRouting })} />
        {submitted && !descriptionRouting && <small className="p-error">Le nom du routing est obligatoire.</small>}
    </div>
    <div className="field">
        <label htmlFor="date_debut_routing" className="font-bold">Date de début du routing</label>
        <Calendar id="date_debut_routing" value={dateDebut} onChange={(e) => setDateDebut(e.value)} showIcon />
    </div>
    <div className="field">
        <label htmlFor="date_fin_routing" className="font-bold">Date de fin du routing</label>
        <Calendar id="date_fin_routing" value={dateFin} onChange={(e) => setDateFin(e.value)} showIcon />
    </div>
    <div className="card flex justify-content-center">
        <label htmlFor="commercial" className="font-bold">Commercial</label>
        <AutoComplete
            field="fullName"
            value={selectedAgent}
            suggestions={filteredAgents}
            completeMethod={search}
            onChange={onAgentChange}
            required
            itemTemplate={(item) => <div>{item.fullName}</div>}
        />
    </div>
    <div className="card flex justify-content-center">
        <label htmlFor="point_marchand" className="font-bold">Points marchands</label>
        <AutoComplete
            field="POINT_MARCHAND"
            multiple
            value={selectedPointsmarchands}
            suggestions={filteredPointsMarchands}
            completeMethod={searchPm}
            onChange={(e) => setSelectedPointsMarchands(e.value)}
            required
        />
    </div>  
        </>
    )
    }
</Dialog>



            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        