import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Teste 04 : Componente NotFound.js', () => {
  test('Testa se a página contém un h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', {
      name: /Page requested not found/i,
    })).toBeInTheDocument();
  });
  test('Testa se a página contém um gif definido', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
