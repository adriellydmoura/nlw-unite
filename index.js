let participantes = [
  {
    nome: "Vilma Dornelles",
    email: "vilma11@gmail.com",
    dataInscricao: new Date(2024, 2, 11, 21, 27),
    dataCheckIn: new Date(2024, 2, 15, 23, 29)
  },
  {
    nome: "Cristian Moura",
    email: "cristian@gmail.com",
    dataInscricao: new Date(2024, 4, 2, 20, 21),
    dataCheckIn: null
  },
  {
    nome: "Luis Carlos Moura",
    email: "luismoura@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 0, 4, 20, 21)
  },
  {
    nome: "Pucca Moura",
    email: "puccamoura@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 5, 23, 29)
  },
  {
    nome: "Lara Dias Dornelles",
    email: "laradornelles@gmail.com",
    dataInscricao: new Date(2024, 2, 11, 19, 27),
    dataCheckIn: null
  },
  {
    nome: "Mirella Dias Dornelles",
    email: "mirelladornelles@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: new Date(2024, 2, 4, 23, 20)
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>${participante.nome}</strong><br>
      <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}