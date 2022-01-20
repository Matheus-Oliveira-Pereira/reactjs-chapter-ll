import { Container } from "./style"
import incomeImg from '../../assets/entradas.svg'
import saidasImg from '../../assets/saidas.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from "../../hooks/UseTransactions"

export const Sumarry = () => {

    const {transactions} = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit'){
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        }else{
            acc.withdraws += transaction.amount
            acc.total -= transaction.amount
        }

        return acc;
    },{
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong> 
                    {new Intl.NumberFormat('pt-BR',{
                        style:'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)} 
                </strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={saidasImg} alt="Saidas" />
                </header>
                <strong>- 
                    {new Intl.NumberFormat('pt-BR',{
                        style:'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)} 
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR',{
                        style:'currency',
                        currency: 'BRL'
                    }).format(summary.total)} 
                </strong>
            </div>
        </Container>
    )
}