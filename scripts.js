function modal() {
    document.querySelector('.modal-overlay').classList.toggle('active')
}

// objs pra colocar html
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances-transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances-transactions", JSON.stringify(transactions))
    },
}


const Transaction = {
    all: Storage.get(),
    /*[
            {
                description: 'Luiz',
                amount: -50001,
                date: '23/01/2021',
            },
            {
                description: 'Website',
                amount: 500000,
                date: '23/01/2021',
            },
            {
                description: 'Internet',
                amount: -20012,
                date: '23/01/2021',
            },
            {
                description: 'App',
                amount: 200000,
                date: '23/01/2021',
            },
],*/ 
    
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },
    incomes() {
        // somar as entradas
        let income = 0;

        // Pegar todas as tranasaçõs e 
        // para cada transação
        Transaction.all.forEach(transaction => {
            // se ela for maior que zero
            if(transaction.amount > 0) {
                // somar a variavel e retornar a variavel
                income += transaction.amount

            }
        })

        return income
    },
    // expenses é despezas
    expenses() {
        // somar as saídas
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense
    },
    total() {
        // entradas - saídas    
        total = Transaction.incomes() + Transaction.expenses()

        return total
    }
}

// funcionalidade pra add na dom
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {

        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        // formatar moeda na dom
        const amount = Utils.formatCurrency(transaction.amount)

        
        const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})"src="/assets/minus.svg" alt="Remover trasação">
            </td>
        </tr>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }

}


// funcionalidade uteis
const Utils = {
    // formatação moeda
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        
        // removendo tudo caracteres especial e deixando so os números
        value = String(value).replace(/\D/g, "")
        
        // deixando com decimais
        value = Number(value) / 100
        
        value = value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        
        const valueFinal = signal + value
        return valueFinal
    },

    formatAmount(value) {
        // forma mais simples: value = Number(value) * 100
        value = Number(value.replace(/\,\./g, "")) * 100
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}

const Form = {
    // selecionar os inputs
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    // pegar os valores dos inputs
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
        
    },

    validateFields() {
        console.log(Form.getValues())

        const { description, amount, date } = Form.getValues()
        
        if(description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
                throw new Error("Por favor, preencha todos os campos")
            }
    },

    formatValues() {
        let { description, date, amount } = Form.getValues()

        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            // Verficar se todas as informações foram preenchidas
            Form.validateFields()
            // formatar os dados para salvar
            const transaction =  Form.formatValues()
            // salvar e atualizar
            Transaction.add(transaction)
            // apagar os dados do formulário
            Form.clearFields()
            // fechar modal
            modal()
            
        } catch (error) {
            alert(error.message)
        }
    }
}


// Storage.set("OLaaaaaaaaaaaaa")
// Storage.get()

const App = {
    init() {
        // adicionando cada transactions na dom
        Transaction.all.forEach( (transaction, index) => {
            DOM.addTransaction(transaction, index)
        })
        
        DOM.updateBalance()
        
        Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}


App.init()


