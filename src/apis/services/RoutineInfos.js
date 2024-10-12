import axios from "axios";
import urlBase from "./const";
// const urlLocal = "http://172.31.1.74:5500"
// const urlOnline = "http://51.75.95.225:3000"

// const urlBase = urlOnline


export class RoutineInfos {
    async getRoutineInfosByDateRange(startDateValue,endDateValue){
        try {
            const response = await axios.post(`${urlBase}/api/getRoutineInfosByDateRange`,
                { bdmId: window.sessionStorage.getItem('bdmId'), 
                  dateDebut: startDateValue,
                  dateFin: endDateValue
                }, // Données envoyées en JSON
        {  headers: {
            'Content-Type': 'application/json', // Définir le type de contenu
          }});

          return response.data;     
        }
        catch (error) {
            console.error('Erreur lors de la récupération du routing:', error);
            throw error;
          }
    }
    async getRoutineInfos(){
        try {
            const response = await axios.post(`${urlBase}/api/getRoutineInfos`,
                { bdmId: window.sessionStorage.getItem('bdmId')
                }, // Données envoyées en JSON
        {  headers: {
            'Content-Type': 'application/json', // Définir le type de contenu
          }});

          return response.data;     
        }
        catch (error) {
            console.error('Erreur lors de la récupération du routing:', error);
            throw error;
          }
    }

    async getRoutineInfosForDC(){
      try {
          const response = await axios.post(`${urlBase}/api/getRoutineInfosForDC`,
              { agentTypeId: Number(window.sessionStorage.getItem('user_type'))
              }, // Données envoyées en JSON
      {  headers: {
          'Content-Type': 'application/json', // Définir le type de contenu
        }});

        return response.data;     
      }
      catch (error) {
          console.error('Erreur lors de la récupération du routing:', error);
          throw error;
        }
  }
  async getRoutineInfosForDCByDateRange(startDateValue,endDateValue){
    try {
        const response = await axios.post(`${urlBase}/api/getRoutineInfosForDCByDateRange`,
            {  
              dateDebut: startDateValue,
              dateFin: endDateValue
            }, // Données envoyées en JSON
    {  headers: {
        'Content-Type': 'application/json', // Définir le type de contenu
      }});

      return response.data;     
    }
    catch (error) {
        console.error('Erreur lors de la récupération du routing:', error);
        throw error;
      }
}

  async getRoutineInfosForDcByCommercial(id){
    try {
        const response = await axios.post(`${urlBase}/api/getRoutineInfosForDcByCommercial`,
            { idCommercial: id,
            }, // Données envoyées en JSON
    {  headers: {
        'Content-Type': 'application/json', // Définir le type de contenu
      }});

      return response.data;     
    }
    catch (error) {
        console.error('Erreur lors de la récupération du routing:', error);
        throw error;
      }
}

async getRoutineInfosForDcByCommercialByDateRange(id, startDateValue, endDateValue){
  try {
      const response = await axios.post(`${urlBase}/api/getRoutineInfosForDcByCommercialByDateRange`,
          { idCommercial: id,
            dateDebut: startDateValue,
            dateFin:  endDateValue,
          }, // Données envoyées en JSON
  {  headers: {
      'Content-Type': 'application/json', // Définir le type de contenu
    }});

    return response.data;     
  }
  catch (error) {
      console.error('Erreur lors de la récupération du routing:', error);
      throw error;
    }
}
} 