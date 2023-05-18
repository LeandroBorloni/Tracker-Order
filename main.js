document.querySelector("#save").addEventListener("click", cadastrarPedido)

let pedidos = []

/* Para carregar os pedidos (LocalStorage)*/
window.addEventListener("load", () => {
    pedidos = JSON.parse(localStorage.getItem("ListaDePedidos")) || []
    atualizar()
})

/* Buscar pedidos */
document.querySelector("#busca").addEventListener("keyup", () => {
    let busca = document.querySelector("#busca").value
    let pedidosFiltrados = pedidos.filter((Pedido) => {
        return Pedido.produto.includes(busca.toLowerCase())
    })
    filtrar(pedidosFiltrados)
})

/* Filtrar por pendentes */
document.querySelector("#pendentes").addEventListener("click", () => {
    let pedidosPendentes = pedidos.filter((Pedido) => {
        return Pedido.concluida == false
    })
    filtrar(pedidosPendentes)
})

/* Filtar por concluidos */
document.querySelector("#concluidos").addEventListener("click", () => {
    let pedidosConcluidos = pedidos.filter((Pedido) => {
        return Pedido.concluida == true
    })
    filtrar(pedidosConcluidos)
})

/* Função para filtar pedidos */
function filtrar (pedidos) {
    document.querySelector("#pedidos").innerHTML = ""
    pedidos.forEach((Pedido) => {
        document.querySelector("#pedidos").innerHTML += createCard(Pedido)
    })
}

/* Função para atualizar pedidos */
function atualizar () {
    document.querySelector("#pedidos").innerHTML = ""
    localStorage.setItem("ListaDePedidos", JSON.stringify(pedidos))
    pedidos.forEach((Pedido) => {
        document.querySelector("#pedidos").innerHTML += createCard(Pedido)
    })
}

/* Função para cadastrar pedidos */
function cadastrarPedido() {
    const pedido = document.querySelector("#pedido").value 
    const produto = document.querySelector("#produto").value 
    const pagamento = document.querySelector("#pagamento").value 
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const Pedido = {
        id: Date.now(),
        pedido: pedido,
        produto: produto,
        pagamento: pagamento,
        concluida: false
    }

    if(!validar(Pedido.pedido, document.querySelector("#pedido")))return
    if(!validar(Pedido.produto, document.querySelector("#produto")))return  
    if(!validar(Pedido.pagamento, document.querySelector("#pagamento")))return

    pedidos.push(Pedido)

    atualizar()

    modal.hide()

}

/* Função para validação dos campos de cadastro */
function validar(valor, campo) {
    if(valor == ""){
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }

    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
    return true
}

/* Apagar pedido */
function apagar(id) {
    pedidos = pedidos.filter((Pedido) => {
        return Pedido.id != id
    })

    atualizar()
}

/* Concluir pedido */
function concluir(id) {
    let pedidoEncontrado = pedidos.find((Pedido) => {
        return Pedido.id == id 
    })
    pedidoEncontrado.concluida = true
    console.log(pedidoEncontrado)
    atualizar()
}

/* Criar o card do pedido */
function createCard(Pedido){
    let disable = Pedido.concluida ? "disabled" : ""
    return `
        <div class="col-lg-3 col-md-6 col-12">
            <div class="card text-center bg-gradient text-light" data-bs-theme="dark">
                <div class="card-header">
                    Pedido ${Pedido.pedido}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${Pedido.produto}</h5>
                    <p class="card-text">Pagamento em ${Pedido.pagamento}</p>
                    <a href="#" class="btn btn-primary">Estoque</a>
                    <a href="#" class="btn btn-primary">Informações</a>
                </div>
                <div class="card-footer text-body-secondary">
                    <a onClick="concluir(${Pedido.id})" href="#" class="btn btn-success ${disable}" title="Pedido Concluido">
                        <i class="bi bi-check-lg"></i>
                    </a>
                    <a onClick="apagar(${Pedido.id})" href="#" class="btn btn-danger" title="Excluir pedido">
                        <i class="bi bi-trash"></i>
                    </a>
                </div>
            </div> <!-- Card -->
        </div> <!-- Coluna -->`
}

/* Função ver produtos */
document.querySelector("#botao-produtos").addEventListener("click", (Pedido) => {
    document.querySelector("#produtos").innerHTML = "Os produtos cadastrados são: <br>"
    pedidos.forEach((Pedido) => {
        document.querySelector("#produtos").innerHTML += `- ${Pedido.produto} <br>`
    })
})
