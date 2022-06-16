import styled from 'styled-components';

import Form from '../../components/Form';

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

const Create = () => (
  <Section>
    <Form></Form>
  </Section>
);

export default Create;
