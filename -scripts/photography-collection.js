// Variables

const titleElement = document.getElementById('page-title');
const dateElement = document.getElementById('page-date');
const gridElement = document.querySelector('.photo-grid');
const reposElement = document.getElementById('photography-repos-data');



// Helper functions

const encodeImagePath = (imagePath) => imagePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
const normalizeImagePath = (imagePath) => imagePath.replace(/^\.\//, '');

const formatDate = (value) => {
    const date = new Date(`${value}-01T00:00:00`);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const applyPhotoVariant = (imageElement, figureElement) => {
    const isPortrait = imageElement.naturalHeight > imageElement.naturalWidth;
    figureElement.classList.remove('item-portrait', 'item-landscape');
    figureElement.classList.add(isPortrait ? 'item-portrait' : 'item-landscape');
};



// Main logic

const collectionId = (new URLSearchParams(window.location.search)).get('collection');
if (!collectionId) {
    console.error('Collection ID is missing from URL parameters.');
}

const collection = JSON.parse(reposElement.textContent || '[]').find(item => String(item.id) === collectionId);
if (!collection) {
    console.error('Collection not found for ID:', collectionId);
}

titleElement.textContent = collection.name;
dateElement.textContent = formatDate(collection.date);
dateElement.dateTime = `${collection.date}-01`;
document.title = `${collection.name} - Yaacoub`;

const listUrl = collection.url.replace('github.com', 'raw.githubusercontent.com') + '/refs/heads/webp/list.txt?raw=true';
fetch(listUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Unable to fetch image list.');
        }
        return response.text();
    })
    .then(data => {
        const lines = data.split('\n');
        lines.forEach((line, index) => {
            const imagePath = encodeImagePath(normalizeImagePath(line));
            const figure = document.createElement('figure');
            const image = document.createElement('img');

            image.alt = `${collection.name} photo ${index + 1}`;
            image.loading = 'lazy';
            image.src = `${collection.url}/blob/webp/${imagePath}?raw=true`;
            image.addEventListener('load', () => applyPhotoVariant(image, figure), { once: true });
            image.addEventListener('error', () => figure.remove(), { once: true });

            figure.setAttribute('class', 'photo-grid-item');
            figure.appendChild(image);
            gridElement.appendChild(figure);
        });
    })
    .catch(error => {
        console.error('Error fetching image list:', error);
    })