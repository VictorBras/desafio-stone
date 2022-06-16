import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../components/Button';
import Solution from '../../components/Solution';

const Section = styled.section`
  align-items: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  row-gap: 10px;
  width: 100%;
`;

const Card = styled.div`
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  row-gap: 15px;
  width: 60%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const P = styled.p`
  color: #aeaeae;
  font-size: 18px;
  letter-spacing: 0.25px;
  margin: unset;
  padding-left: 15px;
`;

const SolutionsGrid = styled.div`
  align-content: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;

  > div:not(:last-child) {
    border-right: 1px solid #ddd;
  }
`;

const View = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    setTimeout(() => navigate('/routing/find'), 0);
    return;
  }

  const { routing } = state;
  const { fastestOperator, cheapestOperator, solutions } = routing;

  return (
    <Section>
      <Card>
        <h1>Resultado</h1>
        <Content>
          <P>Código: {routing.id}</P>
          <SolutionsGrid>
            {solutions.map((solution) => (
              <Solution
                key={solution.logisticOperator}
                solution={solution}
                fastestOperator={fastestOperator}
                cheapestOperator={cheapestOperator}
              />
            ))}
          </SolutionsGrid>
        </Content>

        <Button black>
          <Link to="/routing/new">Nova consulta</Link>
        </Button>
      </Card>
    </Section>
  );
};

export default View;
