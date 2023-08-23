document.addEventListener('DOMContentLoaded', () => {
    let api = `https://reqres.in/api/users?delay=3`;

    const fetchData = () => {
        const getDataButton = document.getElementById('getDataButton');
        const loadingText = document.getElementById('loadingText');

        getDataButton.disabled = true; // Deshabilitar el botón durante la carga
        loadingText.style.display = 'block'; // Mostrar el texto de carga

        fetch(api)
            .then(response => response.json())
            .then(data => {
                const expirationTime = Date.now() + 60000; 
                const currentTime = new Date().toISOString();
                const dataWithTimestamp = {
                    timestamp: currentTime,
                    data: data.data
                };
                localStorage.setItem('userData', JSON.stringify(dataWithTimestamp));
                localStorage.setItem('expirationTime', expirationTime.toString());
                mostrarData(dataWithTimestamp);

                getDataButton.disabled = false; // Habilitar el botón
                loadingText.style.display = 'none'; // Ocultar el texto de carga
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

    const button = document.getElementById('getDataButton');
    button.addEventListener('click', fetchData);
});
