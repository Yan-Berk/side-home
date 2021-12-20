import React, {useEffect, useState} from "react";
import Screen from "../components/Screen";
import PropertyListing from "../components/PropertyListing";
import {DateTime} from "luxon";
import "../styles/property-listings.scss";
import {fetchProperties} from "../utils/ApiClient";

const PropertyListings = () => {
    const title = 'Property Listings';
    const propertiesLocalStorageKey = 'properties';
    const favoritesLocalStorageKey = 'favorites';
    const [propertyListings, setPropertyListings] = useState([]);
    const [favoriteProperties, setFavoriteProperties] = useState(() => new Set());

    const onFavoriteClick = (id) => {
        if (favoriteProperties.has(id)) {
            setFavoriteProperties(currentFavorites => {
                const newFavorites = new Set(currentFavorites);
                newFavorites.delete(id);
                window.localStorage.setItem(favoritesLocalStorageKey, JSON.stringify([...newFavorites]));
                return newFavorites;
            });
        }
        else {
            setFavoriteProperties(currentFavorites => {
                const newFavorites = new Set(currentFavorites).add(id);
                window.localStorage.setItem(favoritesLocalStorageKey, JSON.stringify([...newFavorites]));
                return newFavorites;
            });
        }
    };

    useEffect(() => {
        const getListings = (propertyListings) => {
            return propertyListings.map((inputListing) => {
                return {
                    id: inputListing.mlsId,
                    address: `${inputListing.address.streetNumberText} ${inputListing.address.streetName}, ${inputListing.address.city}, ${inputListing.address.state}`,
                    bedrooms: inputListing.property.bedrooms,
                    baths: inputListing.property.bathsFull + inputListing.property.bathsHalf,
                    area: inputListing.property.area,
                    listPrice: Number(inputListing.listPrice).toLocaleString(),
                    listDate: DateTime.fromISO(inputListing.listDate).toLocaleString(),
                    photo: inputListing.photos[0]
                };
            });
        };

        const loadProperties = () => {
            const propertiesLocalStorage = window.localStorage.getItem(propertiesLocalStorageKey);
            if (propertiesLocalStorage && Object.keys(propertiesLocalStorage).length > 0) {
                setPropertyListings(JSON.parse(propertiesLocalStorage));
            }
            else {
                fetchProperties().then((result) => {
                    const listings = getListings(result);
                    setPropertyListings(listings);
                    window.localStorage.setItem(propertiesLocalStorageKey, JSON.stringify(listings));
                });
            }
        };

        const loadFavorites = () => {
            const favoritesLocalStorage = JSON.parse(window.localStorage.getItem(favoritesLocalStorageKey));
            if (favoritesLocalStorage && Object.keys(favoritesLocalStorage).length > 0) {
                setFavoriteProperties(() => new Set(favoritesLocalStorage));
            }
        };

        document.title = title;
        loadProperties();
        loadFavorites();
    }, []);

    if (!propertyListings || propertyListings.length === 0) {
        return <div className="property-listings">Loading...</div>;
    }

    const propertyListingDiv = propertyListings.map(listing => {
        return (<PropertyListing key={listing.address} listing={listing}
                                 isFavorite={favoriteProperties.has(listing.id)}
                                 onFavoriteClick={onFavoriteClick}
        />)
    });

    return (
        <Screen title={title}>
            <div className="property-listings">
                {propertyListingDiv}
            </div>
        </Screen>
    );
};

export default PropertyListings;