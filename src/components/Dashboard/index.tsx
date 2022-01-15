import { Sumarry } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import { Container } from "./styles";


export const Dashboard = () => {
    return(
        <Container>
            <Sumarry/>
            <TransactionsTable/>
        </Container>
    );
}