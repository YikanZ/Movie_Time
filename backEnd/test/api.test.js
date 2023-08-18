import supertest from "supertest";
import { expect } from "chai";
import app from '../index.js';

const requestWithSupertest = supertest(app);

describe('Testing GET /movies endpoint', function() {
    it ('responds with a vaile HTTP status code and number of movies',
        async function() {
            const DEFAULT_MOVIES_PER_PAGE = 20;
            const response = await requestWithSupertest.get('/api/v1/movies');

            expect(response.status).to.equal(200);
      
            expect(response.body.movies.length).to.equal(DEFAULT_MOVIES_PER_PAGE);
            
        });
});

describe("Testing GET /movies/:id endpoint", function() {
    it ("responds with a valid HTTP status code and response body",
        async function() {
            const response = await requestWithSupertest.get(
                '/api/v1/movies/id/573a1390f29313caabcd4135'
                );
                expect(response.status).to.equal(200);
                expect(response.body.title).to.equal("Blacksmith Scene");
        });
});

describe("Testing GET /movies/ratings endpoint", function() {
    it ("responds with a valid HTTP status code and and ratings",
        async function() {
            const response = await requestWithSupertest.get("api/v1/movies/ratings");
            expect(response.status).to.equal(200);
            expect(response.body[0].to.equal("AO"));
            expect(response.body.length).to.equal(21);
        });
});

describe("Testing POST /review endpoint", function() {
    it ("responds with a valid HTTP status code and number of movies", async function() {
        const req_body = {
            "movie_id": "573a1390f29313caabcd4135",
            "review":"This is a TEST review",
            "user_id":"1234",
            "name":"Test User"
        };
        const response = await requestWithSupertest.post("/api/v1/movies/review").send(req_body);
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("success");
    });
});



