// Tile items

const tile_items = document.querySelectorAll('a.item');

tile_items.forEach((item) => {
    const url = item.getAttribute('href');
    const listUrl = url.replace('github.com', 'raw.githubusercontent.com') + '/refs/heads/webp/list.txt?raw=true';

    fetch(listUrl)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').filter(line => line.trim() !== '');

            if (lines.length > 0) {
                const imgName = encodeURIComponent(lines[0].replace(/^\.\//, ''));
                const imgElement = item.querySelector('img');
                if (imgElement) {
                    imgElement.src = `${url}/blob/webp/${imgName}?raw=true`;
                }

                const currentUrl = new URL(window.location.href);
                const index = item.dataset.index;
                if (index !== undefined && index !== null) {
                    currentUrl.searchParams.set('collection', index);
                    item.href = currentUrl.toString();
                }
            }

        }).catch(error => console.error('Error fetching image list:', error));
});