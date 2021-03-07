var event = {
    'summary': 'When Cool Boyz And Galz meet',
    'location': 'Cool Boyz',
    'description': 'A chance to hear more about Google\'s developer products.',
    "end": {
        "dateTime": "2021-02-04T18:48:00.000Z",
        "timeZone": "BST" // 'America/Los_Angeles'
      },
    "start": {
    "dateTime": "2021-02-03T18:56:00.000Z",
    "timeZone": "BST" // 'America/Los_Angeles'
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'}
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10}
      ]
    }
  };

  export {
      event
  }