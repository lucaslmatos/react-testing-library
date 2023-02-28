import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste 05 : Componente Pokedex.js', () => {
  const nameId = 'pokemon-name';
  test('Testa se a página contém un h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', {
      name: /Encountered Pokémon/i,
    })).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo pokémon da lista ao clicar no botão "Próximo Pokemon", e se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('next-pokemon')).toBeInTheDocument();
    for (let i = 0; i < pokemonList.length; i += 1) {
      expect(screen.getByTestId(nameId)).toHaveTextContent(pokemonList[i].name);
      userEvent.click(screen.getByRole('button', {
        name: /próximo pokémon/i,
      }));
      expect(screen.getAllByTestId(nameId)).toHaveLength(1);
    }
  });
  test('Testa se a Pokédex tem os botões de filtro, e se o botão de próximo pokemon mostra apenas pokemons de acordo com o filtro escohido', () => {
    renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    for (let i = 0; i < types.length; i += 1) {
      expect(filterButtons[i]).toHaveTextContent(types[i]);
      userEvent.click(filterButtons[i]);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(types[i]);
      const filteredList = pokemonList.filter((pokemon) => pokemon.type === types[i]);
      for (let i2 = 0; i2 < filteredList.length; i2 += 1) {
        expect(screen.getByTestId('pokemon-type')).toHaveTextContent(filteredList[i2].type);
        userEvent.click(screen.getByRole('button', {
          name: /próximo pokémon/i,
        }));
        expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
      }
      userEvent.click(screen.getByRole('button', { name: 'All' }));
      expect(screen.getByRole('button', {
        name: /próximo pokémon/i,
      })).not.toHaveAttribute('disabled');
    }
  });
  test('Testa se o botão de resetar os filtros All, é o padrão ao carregar a página, e se ao clicar ele mostra a lista completa', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    for (let i = 0; i < pokemonList.length; i += 1) {
      expect(screen.getByTestId(nameId)).toHaveTextContent(pokemonList[i].name);
      userEvent.click(screen.getByRole('button', {
        name: /próximo pokémon/i,
      }));
    }
    expect(pokemonList.length).toBe(9);
  });
});
