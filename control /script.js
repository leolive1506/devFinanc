function modal() {
    document.querySelector(".modal-overlay").classList.toggle("active")
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("control-finances")) || []
    },

    set(transactions) {
        localStorage.setItem("control-finances", JSON.stringify(transactions))
    }
}


const updateValuesCards = {
    trasactions: Storage.get(),
    
    add(transaction) {
        updateValuesCards.trasactions.push(transaction)
        App.reload()
    },


    remove(index) {
        updateValuesCards.trasactions.splice(index, 1)
        App.reload()
    },
    clearTable() {
        table.tbody.innerHTML = ""
    },

    entrada() {
        let entrada = 0
        updateValuesCards.trasactions.forEach(transaction => {
            if(transaction.amount > 0) {
                entrada += transaction.amount
            }
        })

        return entrada
    },

    gastos() {
        let gastos = 0
        updateValuesCards.trasactions.forEach(transaction => {
            if(transaction.amount < 0) {
                gastos += transaction.amount
            }
        })

        return gastos
    },

    total() {
        
        const CardTotal = document.querySelector('.total')

        let total = updateValuesCards.entrada() + updateValuesCards.gastos()

        // add class to card
        CardTotal.classList.remove("red", "green")
        let CSSclass = total >= 0 ? "green" : "red"
        CardTotal.classList.add(CSSclass)
        
        return total
    },

    displays() {

        const valueEntrada = Utils.formatCurrency(updateValuesCards.entrada())
        const entrada = document.querySelector("#incomeDisplay")
            .innerHTML = valueEntrada

        const valueGastos = Utils.formatCurrency(updateValuesCards.gastos())
        const gastos = document.querySelector("#expenseDisplay")
            .innerHTML = valueGastos

        const valueTotal = Utils.formatCurrency(updateValuesCards.total())
        const total = document.querySelector("#totalDisplay")
                .innerHTML = valueTotal
        

    },

}


const table = {
    tbody: document.querySelector('tbody'),

    innerHTMLElement(transaction, index) {

    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)
    const html =
    `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="updateValuesCards.remove(${index})"src="/assets/minus.svg" alt="Remover Transação">
            </td>
        </tr>

    `  
        return html
    },

    addTransaction(transaction, index) {
        const tr = document.createElement("tr")
        tr.innerHTML = table.innerHTMLElement(transaction, index)
        table.tbody.appendChild(tr)
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        
        return signal + value
    },

    formatAmount(value) {
        value = Number(value) * 100
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        // return splittedDate
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    
}

const Form = {

    description: document.querySelector("#description"),
    amount: document.querySelector("#amount"),
    date: document.querySelector("#date"),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    validatFields() {

        const { description, amount, date } = Form.getValues()

        if(description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
                throw new Error("Preeche irmão")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        return {
            description, amount, date
        }
    },

    clearModal() {

        description.value = ""
        amount.value = ""
        date.value = ""

    },
    // chama direto no formulário
    submit(event) {
        event.preventDefault()
        try{    
            Form.validatFields()
            Form.formatValues()
            updateValuesCards.add(Form.formatValues())
            Form.clearModal()
            modal()
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {

        updateValuesCards.trasactions.forEach((transaction, index) => {
            table.addTransaction(transaction, index )
        })
        // atualizar valor dos cards que fazem soma
        updateValuesCards.displays()

        Storage.set(updateValuesCards.trasactions)
    },
    reload() {
        updateValuesCards.clearTable()
        App.init()
    },
}


App.init()
