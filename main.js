document.querySelector("#save").addEventListener("click", cadastrarPedido)

function cadastrarPedido() {
    const pedido = document.querySelector("#pedido").value 
    const produto = document.querySelector("#produto").value 
    const pagamento = document.querySelector("#pagamento").value 
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const Pedido = {
        pedido: pedido,
        produto: produto,
        pagamento: pagamento
    }

    if(!validar(Pedido.pedido, document.querySelector("#pedido")))return
    if(!validar(Pedido.produto, document.querySelector("#produto")))return  
    if(!validar(Pedido.pagamento, document.querySelector("#pagamento")))return

    document.querySelector("#pedidos").innerHTML += createCard(Pedido)

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

function apagar(botao) {
    botao.parentNode.parentNode.parentNode.remove()
}

function createCard(Pedido){
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
                    <a href="#" class="btn btn-success" title="Pedido Concluido">
                        <i class="bi bi-check-lg"></i>
                    </a>
                    <a onclick="apagar(this)" href="#" class="btn btn-danger" title="Excluir pedido">
                        <i class="bi bi-trash"></i>
                    </a>
                </div>
            </div> <!-- Card -->
        </div> <!-- Coluna -->`
}