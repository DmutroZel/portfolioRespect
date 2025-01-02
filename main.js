const TOKEN = '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';
const username = 'DmutroZel';
const repositories = ['compiler', 'catchers-game-', 'Weather-Forecast', 'CoffeeMachine', 'JavaScriptShop'];

async function getUserInfo() {
    const url = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `token ${TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        const userInfo = document.getElementById('user-info');
        userInfo.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            <img src="${data.avatar_url}" alt="User Avatar" class="avatar">
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
        `;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function fetchProjects() {
    for (let i = 0; i < repositories.length; i++) {
        const repo = repositories[i];
        const repoUrl = `https://api.github.com/repos/${username}/${repo}`;

        try {
            const response = await fetch(repoUrl, {
                headers: {
                    Authorization: `token ${TOKEN}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch repository data for ${repo}`);
            }

            const repoData = await response.json();

            const card = document.getElementById(`projectsCard${i + 1}`);

            const title = document.createElement('h3');
            title.textContent = repoData.name;

            const description = document.createElement('p');
            description.textContent = repoData.description;

            const link = document.createElement('a');
            link.href = repoData.html_url;
            link.textContent = 'View Repository';
            link.target = '_blank';

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(link);
        } catch (error) {
            console.error(`Error fetching data for ${repo}:`, error);
        }
    }
}

function updateTime() {
    const timeElement = document.querySelector('.time');
    const kievTime = new Date().toLocaleTimeString('uk-UA', { timeZone: 'Europe/Kiev' });
    timeElement.textContent = `My Time: ${kievTime}`;
}

setInterval(updateTime, 1000);

updateTime();
getUserInfo();
fetchProjects();



