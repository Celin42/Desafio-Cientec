const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const CPFValidator = require('./src/models/CPFValidator');

const PORT = 3000;
const DATABASE_DIR = path.join(__dirname, 'src', 'database');
const DATA_FILE = path.join(DATABASE_DIR, 'citizens.json');

//Garante que o diretório e o arquivo do banco de dados (simulação) existam
if (!fs.existsSync(DATABASE_DIR)) {
    fs.mkdirSync(DATABASE_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    if (parsedUrl.pathname === '/' && method === 'GET') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro interno do servidor');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } 
    
    //Rota de Cadastro de Cidadão
    else if (parsedUrl.pathname === '/cadastrar' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { nome, cpf } = JSON.parse(body);
                if (!nome || !cpf) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    return res.end(JSON.stringify({ error: 'Nome e CPF são obrigatórios' }));
                }

                if (!CPFValidator.isValid(cpf)) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    return res.end(JSON.stringify({ error: 'CPF inválido' }));
                }

                let citizens = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
                if (citizens.some(c => c.cpf === cpf)) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    return res.end(JSON.stringify({ error: 'Cidadão já cadastrado' }));
                }

                citizens.push({ nome, cpf });
                fs.writeFileSync(DATA_FILE, JSON.stringify(citizens, null, 2));

                res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ message: 'Cidadão cadastrado com sucesso!' }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Erro ao processar a requisição' }));
            }
        });
    } 
    
    //Rota de Busca de Cidadão (por CPF ou Nome)
    else if (parsedUrl.pathname === '/buscar' && method === 'GET') {
        const query = parsedUrl.query;
        const searchCpf = query.cpf ? query.cpf.trim().replace(/\D/g, "") : null;
        const searchNome = query.nome ? query.nome.trim().toLowerCase() : null;
    
        if (!searchCpf && !searchNome) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            return res.end(JSON.stringify({ error: 'Informe um CPF ou Nome para buscar.' }));
        }
    
        try {
            const citizensData = fs.readFileSync(DATA_FILE, 'utf8');
            const citizens = JSON.parse(citizensData);
    
            let foundCitizen = null;
    
            if (searchCpf) {
                foundCitizen = citizens.find(citizen => citizen.cpf === searchCpf);
            } else if (searchNome) {
                foundCitizen = citizens.find(citizen => citizen.nome.toLowerCase() === searchNome);
            }
    
            if (foundCitizen) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(foundCitizen));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Cidadão não encontrado.' }));
            }
        } catch (error) {
            console.error("Erro ao buscar cidadão:", error.message);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Erro interno no servidor.' }));
        }
    } 
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Rota não encontrada');
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
