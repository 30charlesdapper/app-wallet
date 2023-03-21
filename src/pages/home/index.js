//aula 8 de front-end 3
const renderFinanceElements = (data) => {
    const totalItems = data.lenght
    const revenues = data
    .filter((item) => Number(item.value) > 0) // ganhos
    .reduce((acc, item) => acc + Number(item.value), 0) //somei os valores de cima
    const expenses = data
    .filter((item) => Number(item.value) < 0) // despesas
    .reduce((acc, item) => acc + Number(item.value), 0) 
    const totalValue = revenues + expenses;
     
    //render total items
    const financeCard1 = document.getElementById("finance-card-1")
    const totalText = document.createTextNode(totalItems)
    const totalElement = document.createElement("h1")
    totalElement.className = "mt smaller" // chamando um classe css
    totalElement.appendChild(totalText)
    financeCard1.appendChild(totalElement)

    //render revenue
    const financeCard2 = document.getElementById("finance-card-2")
    const revenueText = document.createTextNode((
        new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }).format(revenues))
    );
    const revenueTextElement = document.createElement("h1")
    revenueTextElement.className = "mt smaller" // chamando um classe css
    revenueTextElement.appendChild(revenueText)
    financeCard2.appendChild(revenueTextElement)

    //render expense
    const financeCard3 = document.getElementById("finance-card-3")
    const expensesText = document.createTextNode((
        new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }).format(expenses))
    );
    const expensesTextElement = document.createElement("h1")
    expensesTextElement.className = "mt smaller" // chamando um classe css
    expensesTextElement.appendChild(expensesText)
    financeCard3.appendChild(expensesTextElement)

     //render balance
     const financeCard4 = document.getElementById("finance-card-4")
     const balanceText = document.createTextNode((
         new Intl.NumberFormat('pt-BR', { 
             style: 'currency', 
             currency: 'BRL' 
         }).format(totalValue))
     );
     const balanceTextElement = document.createElement("h1")
     balanceTextElement.className = "mt smaller" // chamando um classe css
     balanceTextElement.style.color = "#5936cd"
     expensesTextElement.appendChild(balanceText)
     financeCard4.appendChild(balanceTextElement)
}


const onLoadFinancesData = async () => {
    try {
        const date = "2022-12-15"
        const email = localStorage.getItem("@WalletApp: userEmail")
        const result = await fetch(
            `https://mp-wallet-app-api.herokuapp.com/users?email=${date}`,
            {
                method: "GET",
                headers: {
                    email: email
                },
            }
        )
        const data = await result.json();
        renderFinanceElements(data);
        return data;
    }
    catch (error) {
        return {error};
    }
}




//aula 7 do Front-end 3
const onLoadUserInfo = () => {
    
    const email = localStorage.getItem("@WalletApp: userEmail")
    const name = localStorage.getItem("@WalletApp: userName")

    const navbarUserInfo = document.getElementById("nav-bar_user-container")
    const navbarUserAvatar = document.getElementById("nav-bar-user-avatar")

    // add user info
    const emailElement = document.createElement("p")
    const emailText = document.createTextNode(email)
    emailElement.appendChild(emailTetx)
    navbarUserInfo.appendChild(emailElement)

    // botao sair
    const logoutElement = document.createElement("a")
    const logoutText = document.createTextNode("sair")
    logoutElement.appendChild(logoutText)
    navbarUserInfo.appendChild(logoutElement)

    // add user first inside avatar
    const nameElement = document.createElement("h3")
    const nameText = document.createTextNode(name.charAt(0))
    nameElement.appendChild(nameText)
    navbarUserAvatar.appendChild(nameElement)
}

window.onload = () => {
    onLoadUserInfo();
    onLoadFinancesData()
}