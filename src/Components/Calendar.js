
import React, { useEffect, useState } from 'react';

const CLIENT_ID = '436832833103-m65vsscjlhv5s6mhlsqbu534kv2euanb.apps.googleusercontent.com'; 
const API_KEY = 'AIzaSyAT7Hh6oop7sEco8bZcWV_Z6YqMlKXGC8E';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';


const Calendar = () => {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);

  useEffect(() => {
    const loadGapiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => setGapiLoaded(true);
      document.body.appendChild(script);
    };

    const loadGsiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => setGsiScriptLoaded(true);
      document.body.appendChild(script);
    };

    loadGapiScript();
    loadGsiScript();
  }, []);

  useEffect(() => {
    if (gapiLoaded && gsiScriptLoaded) {
      window.gapi.load('client:auth2', initClient);
    }
  }, [gapiLoaded, gsiScriptLoaded]);

  const initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: SCOPES,
    }).then(() => {
      window.gapi.auth2.getAuthInstance().signIn().then(() => {
        listUpcomingEvents();
      });
    }).catch((error) => {
      console.error('Error initializing Google API: ', error);
    });
  };

  const listUpcomingEvents = () => {
    window.gapi.client.calendar.events.list({
      calendarId: 'primary', // Ensure you're using the correct calendar ID
      timeMin: (new Date()).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    }).then((response) => {
      const events = response.result.items;
      if (events.length > 0) {
        console.log('Upcoming events:', events);
      } else {
        console.log('No upcoming events found.');
      }
    }).catch((error) => {
      console.error('Error fetching events: ', error);
    });
  };

  return (
    <div>
      <h1>Google Calendar Integration</h1>
      <button onClick={listUpcomingEvents}>List Upcoming Events</button>
    </div>
  );
};

export default Calendar;
