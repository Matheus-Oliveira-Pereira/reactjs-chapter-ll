import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { api } from '../services/api'

interface TransactionsProps{
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string
}

interface TransactionsProviderProps{
    children: ReactNode;
}
    
type TransactionInputProps = Omit<TransactionsProps, 'id' | 'createdAt'>;

interface TransactionsContextDataProps{
    transactions: TransactionsProps[];
    createTransaction: (transaction: TransactionInputProps) => Promise<void>;
    
}

const TransactionsContext = createContext<TransactionsContextDataProps>(
    {} as TransactionsContextDataProps
)
    
export const TransactionsProvider = ({children}: TransactionsProviderProps) => {
        
    const [transactions, setTransactions] = useState<TransactionsProps[]>([])

    useEffect(()=>{
        api.get('/transactions').then((response) => setTransactions(response.data.transactions))
    },[])

    async function createTransaction(transactionInput: TransactionInputProps) {
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date})
        const {transaction} = response.data
        setTransactions([
            ...transactions, transaction
        ])
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context
}