import axios from 'axios';

export class RoutineService {

  async getRoutingByBdm() {
    try {
      const response = await axios.post("http://172.31.1.27:5500/api/getRoutingByBdm",// Données envoyées en JSON
        { bdmId: 1 }, // Données envoyées en JSON
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
        const response = await axios.post("http://172.31.1.27:5500/api/getMyAgents",          // Données envoyées en JSON
          { bdmId: 1 }, // Données envoyées en JSON
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
      const response = await axios.get("http://172.31.1.27:5500/api/getPms")
      return response.data
    }catch(error){
      console.error('Erreur lors des agents:', error);
      throw error;
    }
    
  }

  async saveRouting(data){
try{
  axios.post('http://172.31.1.27:5500/api/makeRouting', data)
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
      const response = await axios.post("http://172.31.1.27:5500/api/getAllRoutinesByBdm",// Données envoyées en JSON
        { bdmId: 1 }, // Données envoyées en JSON
        {  headers: {
            'Content-Type': 'application/json', // Définir le type de contenu
          }});

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des routines:', error);
      throw error;
    }

  }

}
