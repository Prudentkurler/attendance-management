const data = {
    month: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      attendees: [320, 450, 400, 500, 470, 510, 900, 530, 480, 520, 200, 510].map((attendees, _, arr) => ((attendees / arr.reduce((a, b) => a + b, 0)) * 100).toFixed(2)),
    },
    week: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      attendees: [30, 20, 60, 80].map((attendees, _, arr) => ((attendees / arr.reduce((a, b) => a + b, 0)) * 100).toFixed(2)),
    },
    day: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      attendees: [20, 25, 22, 30, 27].map((attendees, _, arr) => ((attendees / arr.reduce((a, b) => a + b, 0)) * 100).toFixed(2)),
    },
  };
  
  export default data;
  