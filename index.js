document.addEventListener('DOMContentLoaded', () => {
  let api = `https://reqres.in/api/users?delay=3`;

  const checkExpirationAndFetchData = () => {
      const storedData = localStorage.getItem('userData');
      const storedExpirationTime = localStorage.getItem('expirationTime');
      const currentTime = Date.now();

      if (storedData && storedExpirationTime && currentTime < parseInt(storedExpirationTime)) {
          mostrarData(JSON.parse(storedData));
      } else {
          fetchData();
      }
  };

  const fetchData = () => {
      fetch(api)
          .then(response => response.json())
          .then(data => {
              const expirationTime = Date.now() + 60000; 
              localStorage.setItem('userData', JSON.stringify(data));
              localStorage.setItem('expirationTime', expirationTime.toString());
              mostrarData(data);
          })
          .catch(error => console.log(error));
  };

  const mostrarData = (data) => {
      let body = '';
      for (let i = 0; i < data.data.length; i++) {
          body += `
              <tr>
                  <td>${data.data[i].id}</td>
                  <td>${data.data[i].email}</td>
                  <td>${data.data[i].first_name}</td>
                  <td>${data.data[i].last_name}</td>
                  <td><img src="${data.data[i].avatar}" alt="Avatar"></td>
              </tr>`;
      }
      document.getElementById('data').innerHTML = body;
    };

    checkExpirationAndFetchData();
});