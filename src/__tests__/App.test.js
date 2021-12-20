import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {rest} from "msw";
import { setupServer } from "msw/node";
import userEvent from '@testing-library/user-event';
import PropertyListings from "../screens/PropertyListings";

const runApiCall = () => {
    server.use(
        rest.get("https://api.simplyrets.com/properties", (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        mlsId: 1,
                        address: {
                            streetNumberText: "74434",
                            streetName: "East Sweet Bottom Br",
                            city: "Houston",
                            state: "Texas"
                        },
                        property: {
                            bedrooms: 3,
                            baths: 4,
                            area: 1000,
                        },
                        listPrice: 100000,
                        listDate: '2021-01-01',
                        photos: ['https://s3-us-west-2.amazonaws.com/cdn.simplyrets.com/properties/trial/home9.jpg']
                    }
                ])
            );
        })
    );
};

describe("Property Listings", () => {
    test("Property Listing header is displayed", async () => {
        runApiCall();
        render(<PropertyListings/>);
        await waitFor(() => screen.getByText('Property Listings'));
    });

    test("Property listing items are displayed", async () => {
        runApiCall();
        render(<PropertyListings/>);
        await waitFor(() => screen.getByText('74434 East Sweet Bottom Br, Houston, Texas'));
    });

    test("Favorite click", async () => {
        const altText = 'favorite icon';
        runApiCall();
        const { getByTestId } = await render(<PropertyListings />);
        const propertyListing = getByTestId(1);

        let favoriteIcon = within(propertyListing).getByAltText(altText);
        expect(favoriteIcon).toHaveAttribute('src', 'heart-stroke.svg');

        userEvent.click(favoriteIcon);
        favoriteIcon = within(propertyListing).getByAltText(altText);
        expect(favoriteIcon).toHaveAttribute('src', 'heart-fill.svg');
    });
});
const server = setupServer(
    rest.get("https://api.simplyrets.com/properties", (req, res, ctx) => {
        return res(ctx.json({}));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
