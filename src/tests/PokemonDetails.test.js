import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste 07 : Componente PokemonDetails.js', () => {
  const path = '/pokemon/10';
  test('Testa se as informações são mostradas de forma correta na pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(path);
    });
    expect(screen.getByRole('heading', {
      name: /Caterpie Details/i,
    })).toBeInTheDocument();
    expect(screen.queryByRole('link', {
      name: /more details/i,
    })).toBe(null);
    expect(screen.getByRole('heading', {
      name: /Summary/i,
    })).toBeInTheDocument();
    expect(screen.getByText(
      /for protection, it releases a horrible stench from the antennae on its head to drive away enemies\./i,
    )).toBeInTheDocument();
  });
  test('Testa se as informações são mostradas de forma correta na parte de localização', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(path);
    });
    expect(screen.getByRole('heading', {
      name: /game locations of caterpie/i,
    })).toBeInTheDocument();
    const caterpie = pokemonList[2];
    const countAllLocations = caterpie.foundAt.length;
    const locations = screen.queryAllByRole('img', { name: /caterpie location/i });
    expect(countAllLocations).toEqual(locations.length);
    for (let index = 0; index < locations.length; index += 1) {
      expect(locations[index]).toHaveAttribute('src', caterpie.foundAt[index].map);
      expect(locations[index]).toHaveAttribute('alt', 'Caterpie location');
      expect(screen.getByText(caterpie.foundAt[index].location)).toBeInTheDocument();
    }
  });
  test('Testa se o usuário pode favoritar na pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const msg = 'Pokémon favoritado?';
    act(() => {
      history.push(path);
    });
    expect(screen.getByLabelText(msg)).toBeInTheDocument();
    expect(screen.queryByRole('img', {
      name: /caterpie is marked as favorite/i,
    })).toBe(null);
    userEvent.click(screen.getByLabelText(msg));
    expect(screen.queryByRole('img', {
      name: /caterpie is marked as favorite/i,
    })).toBeInTheDocument();
    userEvent.click(screen.getByLabelText(msg));
    expect(screen.queryByRole('img', {
      name: /caterpie is marked as favorite/i,
    })).toBe(null);
  });
});
