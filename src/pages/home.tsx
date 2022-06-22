import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import IPageProps from '../interfaces/page';

const HomePage: React.FC<IPageProps> = props => {
    return (
        <Container fluid className='p-0'>
            <Navigation />
            <Header
                title="Your personal Pepper Potts"
                headline="Manage your notes and to-do list"
            />
            <Container className='mt-5'>
                Notes here...
            </Container>
        </Container>
    )
}

export default HomePage