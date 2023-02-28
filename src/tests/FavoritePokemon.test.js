import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Teste 03 : Componente FavoritePokemon.js', () => {
  test('Testa se aparece a mensagem No favorite pokemon found, caso não existam pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemon />);
    expect(screen.getByText(
      /No favorite pokémon found/i,
    )).toBeInTheDocument();
  });
  test('Testa se são exibidos na tela, apenas pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/4');
    });
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    act(() => {
      history.push('/pokemon/23');
    });
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    act(() => {
      history.push('/favorites');
    });
    expect(screen.getByRole('img', {
      name: /charmander is marked as favorite/i,
    }));
    expect(screen.getByRole('img', {
      name: /ekans is marked as favorite/i,
    }));
    screen.logTestingPlaygroundURL();
  });
});
