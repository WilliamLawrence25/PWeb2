const fs = require('fs')
const path = require('path')
const express = require('express')
const bp = require('body-parser')
const MarkdownIt = require('markdown-it'),
	md = new MarkdownIt();
const app = express()

app.use(express.static('pub'))
app.use(bp.json())
app.use(bp.urlencoded({
	extended: true
}))

app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")
})

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'pub/index.html'))
})
// Ruta para devolver la lista de archivos Markdown
app.get('/markdown-files', (request, response) => {
    const markdownDir = path.resolve(__dirname, 'Mrkd');
    fs.readdir(markdownDir, (err, files) => {
        if (err) {
            console.error(err);
            response.status(500).json({ error: 'Incapaz de leer el directorio' });
            return;
        }
        const markdownFiles = files.filter(file => file.endsWith('.md')); // Filtrar solo los archivos .md
        response.json(markdownFiles);
    });
});
// Ruta para devolver el contenido de un archivo Markdown específico
app.get('/markdown-content', (request, response) => {
    const fileName = request.query.file;
    const filePath = path.resolve(__dirname, 'Mrkd', fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ error: 'Incapaz de leer el directorio' });
            return;
        }
        const htmlContent = md.render(data);
        response.json({ content: htmlContent });
    });
});
// Ruta para crear y almacenar un nuevo archivo Markdown
app.post('/create-markdown', (request, response) => {
    const { fileName, content } = request.body;
    if (!fileName || !content) {
        response.status(400).json({ error: 'fileName y content son requeridos' });
        return;
    }
    const filePath = path.resolve(__dirname, 'Mrkd', fileName);
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(err);
            response.status(500).json({ error: 'Incapaz de escribir el archivo' });
            return;
        }
        response.json({ message: 'Archivo creado exitosamente' });
    });
});