import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste 06 : Componente Pokemon.js', () => {
  test('Testa se aparecem corretamente o nome, o tipo, o peso e a imagem do pokemon especificado', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', {
      name: /bug/i,
    }));
    expect(screen.getByText(
      /caterpie/i,
    )).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Bug');
    expect(screen.getByText(/average weight: 2\.9 kg/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Caterpie sprite');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/8/83/Spr_5b_010.png');
  });
  test('Testa se o link more details leva a página para a URL "/pokemon/<id>"', () => {
    const { history } = renderWithRouter(<App />);
    expect(screen.getByRole('link', {
      name: /more details/i,
    })).toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));
    expect(history.location.pathname).toBe('/pokemon/25');
  });
  test('Testa se ao favoritar um pokemon na página de detalhes, aparece uma estrela', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', {
      name: /more details/i,
    })).toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));
    expect(screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    })).toBe(null);
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    expect(screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    })).toHaveAttribute('src', '/star-icon.svg');
  });
});
