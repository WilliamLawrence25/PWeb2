document.addEventListener('DOMContentLoaded', function () {
    const list = document.getElementById('markdownList');
    const contentDiv = document.getElementById('markdownContent');
    const createForm = document.getElementById('createMarkdownForm');

    // Función para obtener la lista de archivos Markdown
    function fetchMarkdownFiles() {
        const url = 'http://localhost:3000/markdown-files';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                list.innerHTML = ''; 
                data.forEach(file => {
                    const listItem = document.createElement('li');
                    listItem.textContent = file;
                    listItem.addEventListener('click', () => fetchMarkdownContent(file));
                    list.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching markdown files:', error));
    }

    // Función para obtener el contenido de un archivo Markdown específico
    function fetchMarkdownContent(file) {
        const url = `http://localhost:3000/markdown-content?file=${encodeURIComponent(file)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                contentDiv.innerHTML = data.content; // Muestra el contenido del archivo
            })
            .catch(error => console.error('Error fetching markdown content:', error));
    }

    // Función para crear un nuevo archivo Markdown
    createForm.onsubmit = function (e) {
        e.preventDefault();
        const fileName = document.getElementById('fileName').value;
        const content = document.getElementById('content').value;

        const url = 'http://localhost:3000/create-markdown';
        const data = { fileName, content };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.message);
            fetchMarkdownFiles(); // Actualizar la lista de archivos
        })
        .catch(error => console.error('Error creating markdown file:', error));
    };

    fetchMarkdownFiles();
});