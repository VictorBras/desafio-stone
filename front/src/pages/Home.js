import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';

const Section = styled.section`
  align-items: center;
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background: rgba(0, 0, 0, 0.7)
    url('https://img.freepik.com/free-photo/transportation-logistics-container-cargo-ship-cargo-plane_37416-150.jpg?w=2000');
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  row-gap: 10px;
  width: 100%;
`;

const H1 = styled.h1`
  color: #fff;
  font-size: 60px;
  font-weight: 900;
  letter-spacing: 2px;
`;

const ContainerButtons = styled.div`
  column-gap: 10px;
  display: flex;
  flex-direction: row;
`;

const Home = () => (
  <Section>
    <H1> Calculadora de Frete </H1>
    <ContainerButtons>
      <Button>
        <Link to="/routing/new">Nova consulta</Link>
      </Button>

      <Button>
        <Link to="/routing/view">Consultar um frete</Link>
      </Button>
    </ContainerButtons>
  </Section>
);

export default Home;
