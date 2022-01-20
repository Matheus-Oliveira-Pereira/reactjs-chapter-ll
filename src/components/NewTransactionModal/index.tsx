import { FormEvent, useState} from 'react';
import Modal from 'react-modal'

import closeImg from '../../assets/botaoFechar.svg'
import incomeImg from '../../assets/entradas.svg'
import outcomeImg from '../../assets/saidas.svg'

import { Container, RadioBox, TransactionTypeContainer } from './style';
import { useTransactions } from '../../hooks/UseTransactions';

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export const NewTransactionModal = ({isOpen, onRequestClose}:NewTransactionModalProps) => {
    const {createTransaction} = useTransactions()

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('deposit')
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(e: FormEvent){
        e.preventDefault();
        
        await createTransaction({
            title,
            amount,
            type,
            category
        })

        setTitle('')
        setAmount(0)
        setType('')
        setCategory('deposit')
        onRequestClose();        
    }   

    return(
    <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName={'react-modal-overlay'}
        className={'react-modal-content'}
    >   
        <button type='button' onClick={onRequestClose} className='react-modal-close'>
            <img src={closeImg} alt="Fechar Modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>
            <input 
                placeholder='Título' 
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <input 
                placeholder='Valor' 
                type='number' 
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
            />
            <TransactionTypeContainer>
                <RadioBox
                    type='button'
                    onClick={() => setType('deposit')}
                    isActive={type === 'deposit'}
                    activeColor="green"
                >   
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox
                    type='button'
                    onClick={() => setType('withdraw')}
                    isActive={type === 'withdraw'}
                    activeColor="red"
                >   
                    <img src={outcomeImg} alt="Saida" />
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>
            <input 
                placeholder='Categoria'
                value={category}
                onChange={event => setCategory(event.target.value)}
            />
            <button type="submit">
                Cadastrar
            </button>
        </Container>
    </Modal>
    )
}