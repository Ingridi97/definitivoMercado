async function listarProdutos() {
  const res = await fetch("/produtos");
  const produtos = await res.json();
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";
  produtos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.id} - ${p.nome} - R$ ${p.preco} - Estoque: ${p.quantidade} - Categoria: ${p.categoria}`;
    lista.appendChild(li);
  });
}

function toggleLista() {
  const lista = document.getElementById("lista-produtos");
  if (lista.style.display === "none") {
    listarProdutos();
    lista.style.display = "block";
  } else {
    lista.style.display = "none";
  }
}

async function adicionarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const quantidade = document.getElementById("quantidade").value;
  const categoria = document.getElementById("categoria").value;

  if (!categoria) {
    alert("Selecione uma categoria!");
    return;
  }

  await fetch("/produtos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
      categoria: categoria
    })
  });

  listarProdutos();
}

async function atualizarProduto() {
  const id = document.getElementById("id-update").value;
  const nome = document.getElementById("nome-update").value;
  const preco = document.getElementById("preco-update").value;
  const quantidade = document.getElementById("quantidade-update").value;
  const categoria = document.getElementById("categoria-update").value;

  await fetch(`/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco, quantidade, categoria })
  });

  listarProdutos();
}

async function deletarProduto() {
  const id = document.getElementById("id-delete").value;

  if (!confirm(`Tem certeza que deseja remover o produto ID ${id}?`)) {
    return;
  }

  await fetch(`/produtos/${id}`, {
    method: "DELETE"
  });

  listarProdutos();
}
