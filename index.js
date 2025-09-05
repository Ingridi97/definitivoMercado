const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "src")));

let produtos = [
  { id: 1, nome: "Arroz", preco: 15, quantidade: 50, categoria: "Alimentos" },
  { id: 2, nome: "Feijão", preco: 10, quantidade: 30, categoria: "Alimentos" }
];

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// GET -> listar produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// POST -> adicionar produto
app.post("/produtos", (req, res) => {
  const { nome, preco, quantidade, categoria } = req.body;

  if (!nome || isNaN(preco) || isNaN(quantidade) || !categoria) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  // Não permitir nomes duplicados
  if (produtos.some(p => p.nome.toLowerCase() === nome.toLowerCase())) {
    return res.status(400).json({ erro: "Produto já existe!" });
  }

  const novo = {
    id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
    nome,
    preco: parseFloat(preco),
    quantidade: parseInt(quantidade),
    categoria
  };

  produtos.push(novo);
  res.status(201).json(novo);
});

// PUT -> atualizar produto
app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });

  const { nome, preco, quantidade, categoria } = req.body;
  if (nome) produto.nome = nome;
  if (!isNaN(preco)) produto.preco = parseFloat(preco);
  if (!isNaN(quantidade)) produto.quantidade = parseInt(quantidade);
  if (categoria) produto.categoria = categoria;

  res.json(produto);
});

// DELETE -> remover produto
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existe = produtos.some(p => p.id === id);

  if (!existe) return res.status(404).json({ erro: "Produto não encontrado" });

  produtos = produtos.filter(p => p.id !== id);
  res.json({ mensagem: `Produto ${id} removido com sucesso` });
});

app.listen(8080, () => {
  console.log("🚀 Servidor rodando em: http://localhost:8080");
});
