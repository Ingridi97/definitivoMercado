async function listarProdutos() {
  const res = await fetch("/produtos");
  const produtos = await res.json();
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";
  produtos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.id} - ${p.nome} - R$ ${p.preco} - Estoque: ${p.quantidade}`;
    lista.appendChild(li);
  });
}

async function adicionarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const quantidade = document.getElementById("quantidade").value;

  await fetch("/produtos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade)
    })
  });

  listarProdutos();
}

async function atualizarProduto() {
  const id = document.getElementById("id-update").value;
  const nome = document.getElementById("nome-update").value;
  const preco = document.getElementById("preco-update").value;
  const quantidade = document.getElementById("quantidade-update").value;

  await fetch(`/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco, quantidade })
  });

  listarProdutos();
}

async function deletarProduto() {
  const id = document.getElementById("id-delete").value;

  await fetch(`/produtos/${id}`, {
    method: "DELETE"
  });

  listarProdutos();
}
