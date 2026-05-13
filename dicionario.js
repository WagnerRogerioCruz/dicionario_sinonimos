let dicionario = new Map()

function incluir() {
    
    let palavra = document.getElementById("palavra").value.toLowerCase().trim()
    let significado = document.getElementById("significado").value.trim()
    

    dicionario.set(palavra, significado)

    document.getElementById("palavra").value = ""
    document.getElementById("significado").value = ""
    mostrarPopup("✅ Inclusão efetuada")
    document.getElementById("palavra").focus()

    salvarDados()
    atualizarLista()
}

  
function  pesquisar() {

    let pesquisa = document.getElementById("pesquisa").value.toLowerCase().trim()
    let resultadoElemento = document.getElementById("resultado")

    if (dicionario.has(pesquisa)) {
        resultadoElemento.textContent = "Significado: " + dicionario.get(pesquisa)
    } else {
        mostrarPopup("❌ Palavra não encontrada", "erro") 
        resultadoElemento.textContent = " ❌ Palavra não encontrada"
    }
    document.getElementById("pesquisa").value = ""
    document.getElementById("pesquisa").focus()

}

function mostrarPopup(mensagem, tipo = "sucesso") {
    let popup = document.getElementById("popup")
    
    popup.textContent = mensagem
    popup.classList.remove("erro")

    if (tipo === "erro") {
        popup.classList.add("erro")
    }

    popup.classList.add("mostrar")

    setTimeout(() => {
        popup.classList.remove("mostrar")
    }, 2000)
}

function salvarDados() {
    let dados = Array.from(dicionario.entries())
    localStorage.setItem("dicionario", JSON.stringify(dados))
}

function carregarDados() {
    let dados = localStorage.getItem("dicionario")

    if (dados) {
        dicionario = new Map(JSON.parse(dados))
    }
}

function atualizarLista() {
    let lista = document.getElementById("lista")
    lista.innerHTML = ""

    for (let [palavra, significado] of dicionario) {
        let li = document.createElement("li")
        li.textContent = palavra + " → " + significado
        lista.appendChild(li)
    }
}

carregarDados()
atualizarLista()