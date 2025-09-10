async function listarProdutos() {
  const res = await fetch("/produtos");
  const produtos = await res.json();
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  produtos.forEach(p => {
    const li = document.createElement("li");
    li.classList.add(p.categoria?.toLowerCase() || "alimentos");
    li.textContent = `${p.id} - ${p.nome} - R$ ${p.preco} - Estoque: ${p.quantidade} - Categoria: ${p.categoria}`;
    lista.appendChild(li);
  });
}

function toggleLista() {
  const lista = document.getElementById("lista-produtos");
  if (lista.style.display === "none" || lista.style.display === "") {
    lista.style.display = "block";
    listarProdutos();
  } else {
    lista.style.display = "none";
  }
}

async function adicionarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const quantidade = document.getElementById("quantidade").value;
  const categoria = document.getElementById("categoria").value;

  await fetch("/produtos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
      categoria
    })
  });

  document.getElementById("nome").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("categoria").value = "";

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

  document.getElementById("id-update").value = "";
  document.getElementById("nome-update").value = "";
  document.getElementById("preco-update").value = "";
  document.getElementById("quantidade-update").value = "";
  document.getElementById("categoria-update").value = "";

  listarProdutos();
}

async function deletarProduto() {
  const id = document.getElementById("id-delete").value;

  if (!confirm("Tem certeza que deseja excluir este produto?")) return;

  await fetch(`/produtos/${id}`, {
    method: "DELETE"
  });

  document.getElementById("id-delete").value = "";

  listarProdutos();
}

async function buscarProduto() {
  const nomeBusca = document.getElementById("nome-busca").value.trim().toLowerCase();
  const res = await fetch("/produtos");
  const produtos = await res.json();
  const resultado = document.getElementById("resultado-busca");
  resultado.innerHTML = "";

  if (!nomeBusca) {
    resultado.innerHTML = "<li>Digite um nome para buscar.</li>";
    return;
  }

  const encontrados = produtos.filter(p => p.nome.toLowerCase().includes(nomeBusca));

  if (encontrados.length === 0) {
    resultado.innerHTML = "<li>Nenhum produto encontrado.</li>";
    return;
  }

  encontrados.forEach(p => {
    const li = document.createElement("li");
    li.classList.add(p.categoria?.toLowerCase() || "alimentos");
    li.textContent = `${p.id} - ${p.nome} - R$ ${p.preco} - Estoque: ${p.quantidade} - Categoria: ${p.categoria}`;
    resultado.appendChild(li);
  });

  document.getElementById("nome-busca").value = "";
   document.getElementById("resultado-busca-busca").value = "resultado-busca";


  buscarProduto();
}

async function filtrarPorCategoria() {
  const categoria = document.getElementById("filtro-categoria").value;
  const res = await fetch("/produtos");
  const produtos = await res.json();
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  const filtrados = categoria === "todas" ? produtos : produtos.filter(p => p.categoria === categoria);

  filtrados.forEach(p => {
    const li = document.createElement("li");
    li.classList.add(p.categoria?.toLowerCase() || "alimentos");
    li.textContent = `${p.id} - ${p.nome} - R$ ${p.preco} - Estoque: ${p.quantidade} - Categoria: ${p.categoria}`;
    lista.appendChild(li);
  });
}
