'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_empresa')) ?? []
const setLocalStorage = (dbempresa) => localStorage.setItem("db_empresa", JSON.stringify(dbEmpresa))

// CRUD - create read update delete
const deleteempresa = (index) => {
    const dbempresa = readEmpresa()
    dbEmpresa.splice(index, 1)
    setLocalStorage(dbEmpresa)
}

const updateEmpresa = (index, Empresa) => {
    const dbEmpresa = readEmpresa()
    dbEmpresa[index] = Empresa
    setLocalStorage(dbEmpresa)
}mpre

const readEmpresa = () => getLocalStorage()

const createEmpresa = (Empresa) => {
    const dbEmpresa = getLocalStorage()
    dbEmpresa.push (Empresa)
    setLocalStorage(dbEmpresa)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')Empresa
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveEmpresa = () => {
    debugger
    if (isValidFields()) {
        const empresa = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            creatempresa(empresa)
            updateTable()
            closeModal()
        } else {
            updateempresa(index, empresa)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (empresa, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${empresa.nome}</td>
        <td>${empresa.email}</td>
        <td>${empresa.celular}</td>
        <td>${empresa.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableEmpresa>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableempresa>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbEmpresa = readEmpresa()
    clearTable()
    dbEmpresa.forEach(createRow)
}

const fillFields = (empresa) => {
    document.getElementById('nome').value = empresa.nome
    document.getElementById('email').value = empresa.email
    document.getElementById('celular').value = empresa.celular
    document.getElementById('cidade').value = empresa.cidade
    document.getElementById('nome').dataset.index = empresa.index
}

const editEmpresa = (index) => {
    const empresa = readEmpresa()[index]
    empresa.index = index
    fillFields(empresa)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editEmpresa(index)
        } else {
            const empresa = readEmpresa()[index]
            const response = confirm(`Deseja realmente excluir o empresa ${empresa.nome}`)
            if (response) {
                deleteEmpresa(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarEmpresa')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveEmpresa)

document.querySelector('#tableEmpresa>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)