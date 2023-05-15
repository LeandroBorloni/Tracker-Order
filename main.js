document.querySelector("#save").addEventListener("click", cadastrarPedido)

let pedidos = []

window.addEventListener("load", () => {
    pedidos = JSON.parse(localStorage.getItem("ListaDePedidos")) || []
    atualizar()
})

document.querySelector("#busca").addEventListener("keyup", () => {
    let busca = document.querySelector("#busca").value
    let pedidosFiltrados = pedidos.filter((Pedido) => {
        return Pedido.produto.includes(busca.toLowerCase())
    })
    filtrar(pedidosFiltrados)
})

document.querySelector("#pendentes").addEventListener("click", () => {
    let pendente = document.querySelector("#pendentes")
    let pedidosPendentes = pedidos.filter((Pedido) => {
        return Pedido
    })
    filtrar(pedidosPendentes)
})

function filtrar (pedidos) {
    document.querySelector("#pedidos").innerHTML = ""
    pedidos.forEach((Pedido) => {
        document.querySelector("#pedidos").innerHTML += createCard(Pedido)
    })
}

function atualizar () {
    document.querySelector("#pedidos").innerHTML = ""
    localStorage.setItem("ListaDePedidos", JSON.stringify(pedidos))
    pedidos.forEach((Pedido) => {
        document.querySelector("#pedidos").innerHTML += createCard(Pedido)
    })
}

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

function apagar(id) {
    pedidos = pedidos.filter((Pedido) => {
        return Pedido.id != id
    })

    atualizar()
}

function concluir(id) {
    let pedidoEncontrado = pedidos.find((Pedido) => {
        return Pedido.id == id 
    })
    pedidoEncontrado.concluida = true
    atualizar()
}

function createCard(Pedido){
    let disable = Pedido.conlcuida ? "disabled" : ""
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