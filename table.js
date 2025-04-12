let transacoes;

const table = document.getElementById("transactionsTableBody");

function filtrarTransacoes(tipo) {
  table.innerHTML = "";
  transacoes.forEach(function (el) {
    if (el.tipo === tipo) {
      criarLinhaDaTabela(el);
    } else if (tipo === "Todos") {
      criarLinhaDaTabela(el);
    }
  });
}

function adicionarTransacao() {
  const tipo = document.getElementById("type").value;
  const descricao = document.getElementById("description").value;
  const valor = parseFloat(document.getElementById("value").value);
  const data = document.getElementById("date").value;

  const novaTransacao = {
    descricao,
    valor,
    tipo,
    data,
  };

  transacoes.push(novaTransacao);
  criarLinhaDaTabela(novaTransacao);
  mostrarToast("Transação adicionada com sucesso!");
}

function criarLinhaDaTabela(el) {
  const row = document.createElement("tr");
  const index = transacoes.indexOf(el);
  row.innerHTML = `
                <td>${el.descricao}</td>
                <td>${el.valor}</td>
                <td>${el.tipo}</td>
                <td>${el.data}</td>
                <td><button class="deleteButton" data-id="${index}" onclick="if(confirm('Tem certeza que deseja excluir?')) excluirTransacao(${index})">Excluir</button></td>
            `;
  table.appendChild(row);
  atualizarResumo();
}

function atualizarResumo() {
  if (!transacoes) {
    const salvas = localStorage.getItem("transacoes");
    if (salvas) {
      transacoes = JSON.parse(salvas);
    }
  }
  const saldoInput = document.getElementById("resumeCards__saldo");
  const entradaInput = document.getElementById("resumeCards__entrada");
  const saidaInput = document.getElementById("resumeCards__saida");

  let entrada = transacoes.reduce(function (acc, atual) {
    if (atual.tipo == "Entrada") {
      return acc + atual.valor;
    }
    return acc;
  }, 0);

  let saida = transacoes.reduce(function (acc, atual) {
    if (atual.tipo == "Saída") {
      return acc + atual.valor;
    }
    return acc;
  }, 0);

  entradaInput.textContent = `R$ ${entrada}`;

  saidaInput.textContent = `R$ ${saida}`;

  const saldo = entrada + saida;
  saldoInput.textContent = `R$ ${saldo}`;

  if (saldo >= 0) {
    saldoInput.className = "resumeCards__value green-color";
  } else {
    saldoInput.className = "resumeCards__value red-color";
  }
  renderizarGrafico();
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

let meuGrafico;

function renderizarGrafico() {
  const ctx = document.getElementById("chartTransacoes").getContext("2d");

  if (meuGrafico) {
    meuGrafico.destroy();
  }

  const entrada = transacoes.reduce(
    (acc, atual) => (atual.tipo === "Entrada" ? acc + atual.valor : acc),
    0
  );
  const saida = transacoes.reduce(
    (acc, atual) => (atual.tipo === "Saída" ? acc + atual.valor : acc),
    0
  );

  meuGrafico = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Entradas", "Saídas"],
      datasets: [
        {
          label: "Resumo Financeiro",
          data: [entrada, saida],
          backgroundColor: ["#10b981", "#ef4444"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
    },
  });
}

function excluirTransacao(index) {
  transacoes.splice(index, 1);
  atualizarResumo();
  filtrarTransacoes("Todos");
  mostrarToast("Transação excluida com sucesso!");
}

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  toast.textContent = mensagem;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // esconde depois de 3 segundos
}


atualizarResumo();
filtrarTransacoes("Todos");
