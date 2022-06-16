import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import Button from '../../components/Button';
import { StyledForm } from '../../components/Form';
import FormField, { Error, Input, Label } from '../../components/FormField';
import { API_URL } from '../../environment';

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

const Find = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: '',
    },
    validationSchema: Yup.object({
      id: Yup.string().required('Obrigatório'),
    }),
    onSubmit: ({ id }) => {
      fetch(API_URL + `/routing/${id}`)
        .then((response) => response.json())
        .then((data) => {
          navigate('/routing/view', {
            state: {
              id: data.id,
              routing: data,
            },
          });
        });
    },
  });

  return (
    <Section>
      <StyledForm onSubmit={formik.handleSubmit}>
        <h1>Reabrir consulta</h1>
        <FormField>
          <Input
            id="id"
            name="id"
            type="text"
            required
            {...formik.getFieldProps('id')}
          />
          <Label htmlFor="id">Código da consulta</Label>
          {formik.touched.id && formik.errors.id ? (
            <Error>{formik.errors.id}</Error>
          ) : null}
        </FormField>

        <Button type="submit" black>
          Enviar
        </Button>
      </StyledForm>
    </Section>
  );
};

export default Find;
