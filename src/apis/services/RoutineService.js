import axios from 'axios';
const urlLocal = "http://172.31.1.84:5500"
const urlOnline = "https://apigp.onrender.com"

const urlBase = urlOnline

export class RoutineService {

  async getRoutingByBdm() {
    try {
      const response = await axios.post("https://apigp.onrender.com/api/getRoutingByBdm",// Données envoyées en JSON
        { bdmId: window.sessionStorage.getItem('bdmId') }, // Données envoyées en JSON
        {  headers: {
            'Content-Type': 'application/json', // Définir le type de contenu
          }});

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du routing:', error);
      throw error;
    }
  }

  async getMyAgents(){

    try {
        const response = await axios.post("https://apigp.onrender.com/api/getMyAgents",          // Données envoyées en JSON
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
      const response = await axios.get("https://apigp.onrender.com/api/getPms")
      return response.data
    }catch(error){
      console.error('Erreur lors des agents:', error);
      throw error;
    }
    
  }

  async saveRouting(data){
try{
  axios.post('https://apigp.onrender.com/api/makeRouting', data)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}catch(error){console.error('Error:', error);}

  }

  async getAllRoutinesByBdm(){
    try {
      const response = await axios.post("https://apigp.onrender.com/api/getAllRoutinesByBdm",// Données envoyées en JSON
        { bdmId: window.sessionStorage.getItem('bdmId') }, // Données envoyées en JSON
        {  headers: {
            'Content-Type': 'application/json', // Définir le type de contenu
          }});

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des routines:', error);
      throw error;
    }

  }

  async allRoutines() {
    try {
      const response = await axios.post(`${urlBase}/api/allRoutines`,// Données envoyées en JSON
        { agentTypeid: Number(window.sessionStorage.getItem('user_type')) }, // Données envoyées en JSON
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

}
