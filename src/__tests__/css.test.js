const fs = require('fs');
import {screen} from '@testing-library/dom'

let container =  null

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



test('todos os h2 possuem fonte de tamanho igual 1.2em', () => {
  const list = screen.getAllByRole("heading", { level: 2 });
  for (let item of list) {
    const styles =  window.getComputedStyle(item);
    expect(styles.fontSize).toBe('1.2em');
  }
})

test('Todos os paragrafos devem ter texto com a cor #323334', () => {
  const produto1 = screen.getByText("Descrição do produto 1.");
  let style =  window.getComputedStyle(produto1);
  expect(style.color).toBe('rgb(50, 51, 52)');

  const produto2 = screen.getByText("Descrição do produto 2.");
  style =  window.getComputedStyle(produto2);
  expect(style.color).toBe('rgb(50, 51, 52)');

  const produto3 = screen.getByText("Descrição do produto 3.");
  style =  window.getComputedStyle(produto3);
  expect(style.color).toBe('rgb(50, 51, 52)');
})


test('Todos os elementos p.price devem ter o font-weight igual a bold', () => {
  const produto1 = screen.getByText("R$10.00");
  let style =  window.getComputedStyle(produto1);
  expect(style.fontWeight).toBe('bold');

  const produto2 = screen.getByText("R$20.00");
  style =  window.getComputedStyle(produto2);
  expect(style.fontWeight).toBe('bold');

  const produto3 = screen.getByText("R$30.00");
  style =  window.getComputedStyle(produto3);
  expect(style.fontWeight).toBe('bold');
})

