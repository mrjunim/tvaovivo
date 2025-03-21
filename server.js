const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Suas credenciais do Google Sheets API
const SPREADSHEET_ID = '1SNnepUIupKm5XKqKkdUsCZtcNSLM_jTEPbd5kvvB0L8';
const SHEET_NAME = 'Enquete'; // Nome da sua aba
const API_KEY = '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'; // Substitua pela sua API Key

// Inicialize o cliente da API do Google Sheets
const sheets = google.sheets({ version: 'v4', auth: API_KEY });

// Função para ler os dados da planilha
async function getPollData() {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A1:C`, // Leia as colunas A, B e C
        });
        return response.data.values;
    } catch (error) {
        console.error('Erro ao ler a planilha:', error);
        throw error;
    }
}

// Função para atualizar a contagem de votos na planilha
async function updateVoteCount(enquete, opcao, votos) {
    try {
        // Encontre a linha correspondente à enquete e opção
        const data = await getPollData();
        const rowIndex = data.findIndex(row => row[0] === enquete && row[1] === opcao);

        if (rowIndex === -1) {
            throw new Error(`Enquete "${enquete}" ou opção "${opcao}" não encontrada.`);
        }

        // Atualize a célula com a nova contagem de votos
        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!C${rowIndex + 1}`, // A linha + 1 (cabeçalho)
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[votos]],
            },
        });
    } catch (error) {
        console.error('Erro ao atualizar a planilha:', error);
        throw error;
    }
}

app.get('/api/poll', async (req, res) => {
    try {
        const data = await getPollData();
        // Formate os dados para enviar como resposta
        const formattedData = data.slice(1).map(row => ({
            enquete: row[0],
            opcao: row[1],
            votos: parseInt(row[2]),
        }));
        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar a enquete.' });
    }
});

app.post('/api/vote', async (req, res) => {
    const { enquete, opcao } = req.body;

    try {
        // Obtenha a contagem de votos atual
        const data = await getPollData();
        const pollData = data.slice(1).map(row => ({
            enquete: row[0],
            opcao: row[1],
            votos: parseInt(row[2]),
        }));

        const selectedOption = pollData.find(item => item.enquete === enquete && item.opcao === opcao);

        if (!selectedOption) {
            return res.status(400).json({ error: 'Opção não encontrada.' });
        }

        const newVoteCount = selectedOption.votos + 1;

        // Atualize a contagem de votos na planilha
        await updateVoteCount(enquete, opcao, newVoteCount);

        res.json({ message: 'Voto registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao processar o voto:', error);
        res.status(500).json({ error: 'Erro ao registrar o voto.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
