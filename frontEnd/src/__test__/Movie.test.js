import {render, waitFor, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import mockServer from "../__mocks__/mockServer";
import MovieList from "../components/MoviesList";

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

test("renders the approporite number of movie cards", async () => {
    const TITLE_OF_MOVIE_1 = "Blacksmith Scene";
    const TITLE_OF_MOVIE_2 = "The Great Train Robbery";

    const { container } = render(
        <MemoryRouter>
            <MovieList />
        </MemoryRouter>
    );

    await waitFor(() => screen.getByText(TITLE_OF_MOVIE_1));
    // const movieCards = container.getElementsByClassName(MOVIE_IMAGE_TYPE);
    // screen.debug();
    // expect(movieCards.length).toBe(NUMBER_OF_MOVIES);
    const testElement1 = screen.getByText(TITLE_OF_MOVIE_1);
    const testElement2 = screen.getByText(TITLE_OF_MOVIE_2);

    expect(testElement1).toBeInTheDocument();
    expect(testElement2).toBeInTheDocument();

});
    
