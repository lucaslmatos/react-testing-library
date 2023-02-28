import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste 01 : Componente App.js', () => {
  test('Testa se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);
    const allLinks = screen.getAllByRole('link');
    expect(allLinks[0]).toHaveTextContent('Home');
  });
  test('Testa se o primeiro link redireciona a página para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);
    const allLinks = screen.getAllByRole('link');
    userEvent.click(allLinks[0]);
    expect(history.location.pathname).toBe('/');
  });
  test('Testa se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);
    const allLinks = screen.getAllByRole('link');
    expect(allLinks[1]).toHaveTextContent('About');
  });
  test('Testa se o segundo link redireciona a página para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const allLinks = screen.getAllByRole('link');
    userEvent.click(allLinks[1]);
    expect(history.location.pathname).toBe('/about');
  });
  test('Testa se o terceiro link possui o texto favorites', () => {
    renderWithRouter(<App />);
    const allLinks = screen.getAllByRole('link');
    expect(allLinks[2]).toHaveTextContent('Favorite Pokémon');
  });
  test('Testa se o terceiro link redireciona a página para a URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const allLinks = screen.getAllByRole('link');
    userEvent.click(allLinks[2]);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Testa se a mensagem Page requested not Found aparece ao digitar uma URL inexistente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/xablau');
    });
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
