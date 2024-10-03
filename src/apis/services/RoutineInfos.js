import axios from "axios";
const urlLocal = "http://172.31.1.58:5500"
const urlOnline = "https://apigp.onrender.com"

const urlBase = urlOnline


export class RoutineInfos {
    async getRoutineInfosByDateRange(startDateValue,endDateValue){
        try {
            const response = await axios.post(`${urlBase}/api/getRoutineInfosByDateRange`,
                { bdmId: window.sessionStorage.getItem('bdmId'), 
                  startDate: startDateValue,
                  endDate: endDateValue
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
} 