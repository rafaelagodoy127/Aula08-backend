const express = require('express');
const app = express();

app.use(express.json());

app.get('/pedidos-lavagem/:protocolo', (req, res) => {
    const { protocolo } = req.params;

    if (protocolo > 1000) {
        return res.status(404).json({
            erro: 'Protocolo não encontrado no sistema.'
        });
    }

    res.status(200).json({
        protocolo,
        status: 'Pronto para Retirada',
        pecas: 4
    });
});

app.get('/produtos', (req, res) => {
    const { categoria, ordenacao } = req.query;

    res.status(200).json({
        mensagem: 'Listagem de produtos filtrada com sucesso',
        filtrosAplicados: {
            categoria: categoria || 'Todas',
            ordenacao: ordenacao || 'padrao'
        }
    });
});

app.post('/pedidos-lavagem', (req, res) => {
    const { protocolo, cliente, pecas } = req.body;

    if (!protocolo || !cliente || !pecas) {
        return res.status(400).json({
            erro: 'Campos obrigatórios não informados.'
        });
    }

    res.status(201).json({
        mensagem: 'Pedido criado com sucesso',
        pedido: { protocolo, cliente, pecas }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
