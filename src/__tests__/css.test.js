const fs = require('fs');
import {screen} from '@testing-library/dom'
import exp from 'constants';

beforeEach(() => {
  const fileContent = fs.readFileSync('src/index.html', 'utf8');
  const cssContent = fs.readFileSync('src/css/estilo.css', 'utf-8')

  const style = document.createElement("style")
  style.innerHTML = cssContent

  document.head.appendChild(style)
  document.body.innerHTML = fileContent
});

afterEach(() => {
  // cleanup on exiting
   document.body.innerHTML = ""
   document.head.innerHTML = ""
});

test('O campo com o nome do produto não deve ser editável', () => {
  const list = document.querySelectorAll('input:read-only')
  expect(list.length).toBe(1)
})

test('Todos os campos devem ser obrigatórios', () => {
  const list = screen.getAllByRole("textbox");
  for (let item of list) {
    if(item.readOnly === false) {
      expect(item.required).toBe(true)
    }
  }
  const numberInput = screen.getByRole("spinbutton")
  expect(numberInput.required).toBe(true)
})

test('O campo e-mail deve garantir que o valor informado seja um e-mail válido', () => {
  const emailInput = document.querySelector('input[type=email]');
  expect(emailInput).not.toBeNull()
})

test('A nota da avaliação deve ser entre 1 e 5', () => {
  const numberInput = document.querySelector('[type="number"]');
  expect(numberInput).not.toBeNull()
  expect(numberInput.min).toBe("1")
  expect(numberInput.max).toBe("5")
})

test('O formulário deve possuir um botão de envio', () => {
  const submitButton = document.querySelector('[type=submit]');
  expect(submitButton).not.toBeNull()
})