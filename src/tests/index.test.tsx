import * as React from 'react'
import { render, screen, fireEvent} from '@testing-library/react'
import Home from './index';
import { users, User } from '../constants/loan.constant';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';


jest.mock('next/router', () => require('next-router-mock'));


describe("MyComponent", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders users from API", async () => {
        jest.spyOn(global, "fetch").mockImplementation((): Promise<Response> =>
        // @ts-ignore
            Promise.resolve({
                json: (): Promise<User[]> => Promise.resolve(users),
            })
        );
        render(<Home />);


        const column1 = await screen.findByText("Name");
        const column2 = await screen.findByText("ID");
        const user1 = await screen.findByText("Laura Connor");
        const user2 = await screen.findByText("John Connor");
        const user3 = await screen.findByText("Tim Anderson");
        const user4 = await screen.findByText("Michael Rodgers");
        const user5 = await screen.findByText("Tim Harris");
        const user6 = await screen.findByText("John Jacobs");
        const user7 = await screen.findByText("Ryan Williams");
        const id1 = await screen.findByText("1");
        const id2 = await screen.findByText("2");
        const id3 = await screen.findByText("3");
        const id4 = await screen.findByText("4");
        const id5 = await screen.findByText("5");
        const id6 = await screen.findByText("6");
        const id7 = await screen.findByText("7");


        expect(column1).toBeInTheDocument();
        expect(column2).toBeInTheDocument();
        expect(user1).toBeInTheDocument();
        expect(user2).toBeInTheDocument();
        expect(user3).toBeInTheDocument();
        expect(user4).toBeInTheDocument();
        expect(user5).toBeInTheDocument();
        expect(user6).toBeInTheDocument();
        expect(user7).toBeInTheDocument();
        expect(id1).toBeInTheDocument();
        expect(id2).toBeInTheDocument();
        expect(id3).toBeInTheDocument();
        expect(id4).toBeInTheDocument();
        expect(id5).toBeInTheDocument();
        expect(id6).toBeInTheDocument();
        expect(id7).toBeInTheDocument();
    });
});





