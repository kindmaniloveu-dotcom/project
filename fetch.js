
const API_URL = 'https://jsonplaceholder.typicode.com/photos';

async function getData(endpoint = '') {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
}

async function showPhotos() {
    const users = document.getElementById('users');
    const status = document.getElementById('status');
    const stats = document.getElementById('stats');

    status.classList.remove('hidden');
    status.textContent = 'Загрузка фотографий...';

    try {
        const data = await getData('?_limit=24');

        status.classList.add('hidden');

        stats.innerHTML = `
            <h2>Всего фотографий: ${data.length}</h2>
        `;

        users.innerHTML = '';

        data.forEach(photo => {
            users.innerHTML += `
                <div class="card">
                    <img src="${photo.thumbnailUrl}"
                         alt="Фото ${photo.id}">
                    <h3>${photo.title}</h3>
                    <p>ID: ${photo.id}</p>
                    <p>Album ID: ${photo.albumId}</p>
                </div>
            `;
        });

    } catch (error) {
        status.classList.remove('hidden');
        status.textContent = 'Ошибка: ' + error.message;
        console.error('Wrong:', error);
    }
}

showPhotos();
