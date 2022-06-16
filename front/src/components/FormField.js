import styled from 'styled-components';
import InputMask from 'comigo-tech-react-input-mask';

const StyledFormField = styled.div`
  display: grid;
  grid-template-rows: max-content 12px;
  margin-bottom: 10px;
  position: relative;
`;

export const Input = styled(InputMask)`
  background: none;
  border-radius: 1rem;
  border: solid 1.5px #9e9e9e;
  color: #000;
  font-size: 1rem;
  padding: 1rem;
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:focus,
  &:valid {
    border: 1.5px solid #1a73e8;
    outline: none;

    ~ label {
      background-color: #fff;
      color: #2196f3;
      padding: 0 0.2em;
      transform: translateY(-50%) scale(0.8);
    }
  }
`;

export const Label = styled.label`
  color: #aeaeae;
  left: 15px;
  pointer-events: none;
  position: absolute;
  transform: translateY(1rem);
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const Error = styled.span`
  color: #dc3545;
  font-size: 10px;
  letter-spacing: 0.7px;
`;

const FormField = ({ children }) => (
  <StyledFormField>{children}</StyledFormField>
);

export default FormField;
