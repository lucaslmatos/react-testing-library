import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Teste 02 : Componente About.js', () => {
  test('Testa se as informações sobre a pokédex aparecem na tela', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    )).toBeInTheDocument();
    expect(screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    )).toBeInTheDocument();
  });
  test('Testa se existe um h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('heading', {
      name: /about pokédex/i,
    })).toBeInTheDocument();
  });
  test('Testa se a página contém uma imagem definida', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
