// var event = {
//     'summary': 'When Cool Boyz And Galz meet',
//     'location': 'Cool Boyz',
//     'description': 'A chance to hear more about Google\'s developer products.',
//     "end": {
//         "dateTime": "2021-02-04T18:48:00.000Z",
//         "timeZone": "BST" // 'America/Los_Angeles'
//       },
//     "start": {
//     "dateTime": "2021-02-03T18:56:00.000Z",
//     "timeZone": "BST" // 'America/Los_Angeles'
//     },
//     'recurrence': [
//       'RRULE:FREQ=DAILY;COUNT=2'
//     ],
//     'attendees': [
//       {'email': 'lpage@example.com'},
//       {'email': 'sbrin@example.com'}
//     ],
//     'reminders': {
//       'useDefault': false,
//       'overrides': [
//         {'method': 'email', 'minutes': 24 * 60},
//         {'method': 'popup', 'minutes': 10}
//       ]
//     }
//   };


var event=[
            {
              eventId: 1,
              title:"Mountain Hiking" ,
              summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus ipsum nec risus facilisis iaculis. Nullam quam massa, viverra suscipit turpis sit amet, tempor pretium felis. Aliquam quis vestibulum nisi.",
              tag:["adventurous"]
            },
            {
              eventId: 2,
              title:"Art Exibition" ,
              summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus ipsum nec risus facilisis iaculis. Nullam quam massa, viverra suscipit turpis sit amet, tempor pretium felis. Aliquam quis vestibulum nisi.",
              tag:["art"]
            },
            {
              eventId: 3,
              title:"Research paper on AI" ,
              summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus ipsum nec risus facilisis iaculis. Nullam quam massa, viverra suscipit turpis sit amet, tempor pretium felis. Aliquam quis vestibulum nisi",
              tag:["science"]
            },
            {
              eventId: 4,
              title:"Women's Voices For Change - Redefining Life After forty" ,
              summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus ipsum nec risus facilisis iaculis. Nullam quam massa, viverra suscipit turpis sit amet, tempor pretium felis. Aliquam quis vestibulum nisi.",
              tag:["empowerment"]
            }
          ]
  export {
      event
  }