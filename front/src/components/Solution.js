import * as moment from 'moment';
import styled from 'styled-components';

const StyledSolution = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 15px;
  /* border-bottom: 1px solid #ddd; */
`;

const Header = styled.div`
  align-items: center;
  column-gap: 10px;
  display: flex;
  flex-direction: row;

  span {
    font-size: 18px;
    color: green;
  }
`;

const H1 = styled.h1`
  font-size: 18px;
  letter-spacing: 0.5px;
  margin: unset;
`;

const P = styled.p`
  margin: unset;
`;

const Tooltip = styled.div`
  position: relative;

  &:hover {
    .tooltip-text {
      visibility: visible;
    }
  }

  .tooltip-text {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 6px;
    bottom: 150%;
    color: #fff;
    font-size: 12px;
    left: 50%;
    padding: 5px 10px;
    position: absolute;
    text-align: center;
    transform: translateX(-50%);
    visibility: hidden;
    width: max-content;
    z-index: 1;

    &::after {
      border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
      border-style: solid;
      border-width: 5px;
      content: '';
      left: 50%;
      margin-left: -5px;
      position: absolute;
      top: 100%;
    }
  }
`;

const Solution = ({ solution, fastestOperator, cheapestOperator }) => {
  const dateFormat = (date) => moment(date).format('DD/MM/YYYY');
  const currencyFormat = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format;

  return (
    <StyledSolution>
      <Header>
        <H1>Operador #{solution.logisticOperator}</H1>
        {solution.logisticOperator === cheapestOperator ? (
          <Tooltip>
            <span className="material-symbols-outlined">savings</span>
            <span className="tooltip-text">Mais barato</span>
          </Tooltip>
        ) : null}

        {solution.logisticOperator === fastestOperator ? (
          <Tooltip>
            <span className="material-symbols-outlined">bolt</span>
            <span className="tooltip-text">Mais rápido</span>
          </Tooltip>
        ) : null}
      </Header>

      <P>Preço: {currencyFormat(solution.price)} </P>
      <P>Data de Entrega: {dateFormat(solution.deliveryTime)} </P>
    </StyledSolution>
  );
};

export default Solution;
