import axios from 'axios';
const urlLocal = "http://172.31.1.58:5500"
const urlOnline = "http://51.75.95.225:3000"

const urlBase = urlOnline

export class RoutingService {


  async getRoutingByBdm() {
    try {
      const response = await axios.post(`${urlBase}/api/getRoutingByBdm`,// Données envoyées en JSON
        { bdmId: Number(window.sessionStorage.getItem('bdmId')) }, // Données envoyées en JSON
        {  headers: {
            'Content-Type': 'application/json', // Définir le type de contenu
          }});
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du routing:', error);
      throw error;
    }
  }

  async getMyAgents(){

    try {
        const response = await axios.post(`${urlBase}/api/getMyAgents`,          // Données envoyées en JSON
          { bdmId: window.sessionStorage.getItem('bdmId') }, // Données envoyées en JSON
          {  headers: {
              'Content-Type': 'application/json', // Définir le type de contenu
            }});
        
        return response.data;
      } catch (error) {
        console.error('Erreur lors des agents:', error);
        throw error;
      }


  }

  async getPms(){
    try{
      const response = await axios.get(`${urlBase}/api/getPms`)
      return response.data
    }catch(error){
      console.error('Erreur lors des agents:', error);
      throw error;
    }
    
  }

  async saveRouting(data){
    try {
      const response = await axios.post(`${urlBase}/api/makeRouting`, data);
      console.log('Response:', response.data);
      return response.data; // Return the response data so it can be handled by the calling function
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error so it can be caught in the calling function
    }
  }


  async allRoutings() {
    try {
      const response = await axios.post(`${urlBase}/api/allRoutings`,// Données envoyées en JSON
        { agentTypeid: Number(window.sessionStorage.getItem('user_type')) }, // Données envoyées en JSON
        {  headers: {
            'Content-Type': 'application/json', // Définir le type de contenu
          }});
        console.log(response.data)
      return response.data.routings;

    } catch (error) {
      console.error('Erreur lors de la récupération du routing:', error);
      throw error;
    }
  }

}
