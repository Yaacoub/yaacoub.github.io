// Tile items

const tileElements = document.querySelectorAll('a.item');

const encodeImagePath = (imagePath) => imagePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
const normalizeImagePath = (imagePath) => imagePath.replace(/^\.\//, '');

tileElements.forEach((item) => {
    const url = item.dataset.repoUrl;
    const listUrl = url.replace('github.com', 'raw.githubusercontent.com') + '/refs/heads/webp/list.txt?raw=true';

    fetch(listUrl)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').filter(line => line.trim() !== '');

            if (lines.length > 0) {
                const imgName = encodeImagePath(normalizeImagePath(lines[0]));
                const imgElement = item.querySelector('img');
                if (imgElement) {
                    imgElement.src = `${url}/blob/webp/${imgName}?raw=true`;
                }
            }

        }).catch(error => {
            console.error('Error fetching image list:', error)
        });
});