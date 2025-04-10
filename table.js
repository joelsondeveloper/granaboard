const transacoes = [
  {
    descricao: "Salário",
    valor: 4500,
    tipo: "Entrada",
    data: "2023-10-01",
  },
  {
    descricao: "Aluguel",
    valor: -1250,
    tipo: "Saída",
    data: "2023-10-05",
  },
  {
    descricao: "Freelance Site",
    valor: 800,
    tipo: "Entrada",
    data: "2023-10-10",
  },
  {
    descricao: "Supermercado",
    valor: -350,
    tipo: "Saída",
    data: "2023-10-12",
  },
  {
    descricao: "Venda de notebook",
    valor: 1500,
    tipo: "Entrada",
    data: "2023-10-15",
  },
  {
    descricao: "Cinema",
    valor: -60,
    tipo: "Saída",
    data: "2023-10-16",
  },
  {
    descricao: "Reembolso empresa",
    valor: 300,
    tipo: "Entrada",
    data: "2023-10-17",
  },
  {
    descricao: "Academia",
    valor: -120,
    tipo: "Saída",
    data: "2023-10-18",
  },
  {
    descricao: "Presente de aniversário",
    valor: 250,
    tipo: "Entrada",
    data: "2023-10-19",
  },
  {
    descricao: "Gasolina",
    valor: -200,
    tipo: "Saída",
    data: "2023-10-20",
  },
];

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
        data
    };

    transacoes.push(novaTransacao);
    criarLinhaDaTabela(novaTransacao);
}

function criarLinhaDaTabela(el) {
  const row = document.createElement("tr");
  row.innerHTML = `
                <td>${el.descricao}</td>
                <td>${el.valor}</td>
                <td>${el.tipo}</td>
                <td>${el.data}</td>
                <td><button class="deleteButton">Excluir</button></td>
            `;
  table.appendChild(row);
}

function atualizarResumo() {
    const saldoInput = document.getElementById("resumeCards__saldo")
    const entradaInput = document.getElementById("resumeCards__entrada")
    const saidaInput = document.getElementById("resumeCards__saida")

    let entrada = transacoes.reduce( function(acc, atual) {
        if (atual.tipo == "Entrada") {
            return acc + atual.valor
        }
        return acc
    }, 0)

    entradaInput.textContent = `R$ ${entrada}`

    let saida = transacoes.reduce( function(acc, atual) {
        if (atual.tipo == "Saída") {
            return acc + atual.valor
        }
        return acc
    }, 0)

    entradaInput.textContent = `R$ ${entrada}`

    saidaInput.textContent = `R$ ${saida}`

    saldoInput.textContent = `R$ ${entrada + saida}`

}

atualizarResumo()
filtrarTransacoes("Todos")