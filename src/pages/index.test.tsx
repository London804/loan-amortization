import * as React from 'react'
import { render, screen } from '@testing-library/react'
import Home from './index';
import { endpoints } from './api/loan';
import { users } from '../constants/loan.constant';
import mockRouter from 'next-router-mock';


jest.mock('next/router', () => require('next-router-mock'));


describe("MyComponent", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders data from API", async () => {
        jest.spyOn(global, "fetch").mockImplementation((): Promise<Response> =>
        // @ts-ignore
            Promise.resolve({
                json: (): Promise<Users[]> => Promise.resolve(users),
            })
        );
        render(<Home />);


        const column1 = await screen.findByText("Name");
        const column2 = await screen.findByText("ID");
        const user1 = await screen.findByText("Laura Connor");
        const id1 = await screen.findByText("1");


        expect(column1).toBeInTheDocument();
        expect(column2).toBeInTheDocument();
        expect(user1).toBeInTheDocument();
        expect(id1).toBeInTheDocument();
    });
});





