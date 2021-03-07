import { url} from '../../config/config'
const listCalendar = async (accessToken) => {
    try {
      let response = await fetch(url+'/users/me/calendarList', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const createEvent= async (accessToken, calendarId, event)=>{
    try {
      let response = await fetch(url+`/calendars/${calendarId}/events`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(event)
      
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  const listEvents = async (accessToken, calendarId) => {
    try {
      let response = await fetch(url+`/calendars/${calendarId}/events`, { 
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  export{
      listCalendar,
      createEvent,
      listEvents
  }