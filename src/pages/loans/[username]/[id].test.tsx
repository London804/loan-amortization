import * as React from 'react'
import { act, render, screen, } from '@testing-library/react'
import Loans from './[id]';
import { Loan, loans, loanScheduleMock } from '../../../constants/loan.constant';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));


describe("MyComponent", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders loan form", async () => {
        jest.spyOn(global, "fetch").mockImplementation((): Promise<Response> =>
            // @ts-ignore
            Promise.resolve({
                json: (): Promise<Loan[]> => Promise.resolve(loans),
            })
        );
        render(<Loans />);


        const textfield1 = await screen.findAllByText("Amount");
        const textfield2 = await screen.findAllByText("APR");
        const textfield3 = await screen.findAllByText("Term");
        const textfield4 = await screen.findAllByText("Status");

        expect(textfield1[0]).toBeInTheDocument();
        expect(textfield2[0]).toBeInTheDocument();
        expect(textfield3[0]).toBeInTheDocument();
        expect(textfield4[0]).toBeInTheDocument();

    })

    it("renders loans from API", async () => {
        jest.spyOn(global, "fetch").mockImplementation((): Promise<Response> =>
            // @ts-ignore
            Promise.resolve({
                json: (): Promise<Loan[]> => Promise.resolve(loans),
            })
        );
        render(<Loans />);

        const row1Amount = await screen.findByText('4000');
        const row1Apr = await screen.findByText('4');
        const row1Term = await screen.findAllByText('60');
        const row1OwnerId = await screen.findAllByText('1');
        const row1Status = await screen.findAllByText('active');
        const row1Id = await screen.findAllByText('1');

        expect(row1Amount).toBeInTheDocument();
        expect(row1Apr).toBeInTheDocument();
        expect(row1Term[0]).toBeInTheDocument();
        expect(row1OwnerId[0]).toBeInTheDocument();
        expect(row1Status[0]).toBeInTheDocument();
        expect(row1Id[0]).toBeInTheDocument();
    }) 
});
