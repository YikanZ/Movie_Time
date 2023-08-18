import {render, waitFor, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import mockServer from "../__mocks__/mockServer";
import MovieList from "../components/MoviesList";

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

test("renders the approporite number of movie cards", async () => {
    const TITLE_OF_MOVIE = "Blacksmith Scene";
    const MOVIE_CARD_CLASS="moviesListCard";
    const NUMBER_OF_MOVIES = 2;

    const { container } = render(
        <MemoryRouter>
            <MovieList />
        </MemoryRouter>
    );

    await waitFor(() => screen.getByText(TITLE_OF_MOVIE));
    const movieCards = container.getElementsByClassName(MOVIE_CARD_CLASS);
    // screen.debug();
    expect(movieCards.length).toBe(NUMBER_OF_MOVIES);
});
    
