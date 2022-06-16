import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import { API_URL } from '../environment';
import Button from './Button';
import FormField, { Error, Input, Label } from './FormField';

export const StyledForm = styled.form`
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
`;

const Form = () => {
  const navigate = useNavigate();

  const cepValidation = Yup.string()
    .transform((value) => value.replace(/\D/g, ''))
    .max(8, 'O Cep deve conter 8 caracteres')
    .required('Obrigatório');

  const dimensionsValidation = Yup.number()
    .min(1, 'Insira um valor válido')
    .required('Obrigatório');

  const onKeyPressDimensions = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const formik = useFormik({
    initialValues: {
      originCep: '',
      destinationCep: '',
      height: '',
      width: '',
      length: '',
    },
    validationSchema: Yup.object({
      originCep: cepValidation,
      destinationCep: cepValidation,
      height: dimensionsValidation,
      width: dimensionsValidation,
      length: dimensionsValidation,
    }),
    onSubmit: (values) => {
      const packageDimensions = {
        height: Number(values.height),
        width: Number(values.width),
        length: Number(values.length),
      };

      const requestData = {
        originCep: values.originCep.replace(/\D/g, ''),
        destinationCep: values.destinationCep.replace(/\D/g, ''),
        packageDimensions,
      };

      fetch(API_URL + '/routing', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
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
    <StyledForm onSubmit={formik.handleSubmit}>
      <h1>Consultar frete</h1>
      <FormField>
        <Input
          id="originCep"
          name="originCep"
          type="text"
          mask="99999-999"
          required
          {...formik.getFieldProps('originCep')}
        />
        <Label htmlFor="originCep">Cep de origem </Label>
        {formik.touched.originCep && formik.errors.originCep ? (
          <Error>{formik.errors.originCep}</Error>
        ) : null}
      </FormField>

      <FormField>
        <Input
          id="destinationCep"
          name="destinationCep"
          type="text"
          mask="99999-999"
          {...formik.getFieldProps('destinationCep')}
          required
        />
        <Label htmlFor="destinationCep">Cep de destino</Label>
        {formik.touched.destinationCep && formik.errors.destinationCep ? (
          <Error>{formik.errors.destinationCep}</Error>
        ) : null}
      </FormField>

      <FormField>
        <Input
          id="height"
          name="height"
          type="numeric"
          onKeyPress={onKeyPressDimensions}
          required
          {...formik.getFieldProps('height')}
        />
        <Label htmlFor="height">Altura</Label>
        {formik.touched.height && formik.errors.height ? (
          <Error>{formik.errors.height}</Error>
        ) : null}
      </FormField>

      <FormField>
        <Input
          id="width"
          name="width"
          type="numeric"
          onKeyPress={onKeyPressDimensions}
          required
          {...formik.getFieldProps('width')}
        />
        <Label htmlFor="width">Largura</Label>
        {formik.touched.width && formik.errors.width ? (
          <Error>{formik.errors.width}</Error>
        ) : null}
      </FormField>

      <FormField>
        <Input
          id="length"
          name="length"
          type="numeric"
          onKeyPress={onKeyPressDimensions}
          required
          {...formik.getFieldProps('length')}
        />
        <Label htmlFor="length">Comprimento</Label>
        {formik.touched.length && formik.errors.length ? (
          <Error>{formik.errors.length}</Error>
        ) : null}
      </FormField>

      <Button type="submit" black>
        Enviar
      </Button>
    </StyledForm>
  );
};

export default Form;
