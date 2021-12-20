import React from "react";
import heartFill from '../assets/heart-fill.svg';
import heartStroke from '../assets/heart-stroke.svg';

const PropertyListing = (props) => {
    const {listing, isFavorite, onFavoriteClick} = props;

    return (
        <div className="property-listing" data-testid={listing.id}>
            <div className="photo-action">
                <div className="photo-wrapper">
                    <img src={listing.photo} alt={listing.address} />
                </div>
                <button className="favorite" onClick={() => {onFavoriteClick(listing.id)}} aria-label="Favorite">
                    {isFavorite && <img src={heartFill} alt="favorite icon" />}
                    {!isFavorite && <img src={heartStroke} alt="favorite icon" />}
                </button>
            </div>
            <ul>
                <li>{listing.bedrooms} <abbr>BR</abbr></li>
                <li>{listing.baths} Bath</li>
                <li>{listing.area} <abbr>Sq Ft</abbr></li>
            </ul>
            <div className="list-price">
                ${listing.listPrice}
            </div>
            <div className="address">
                {listing.address}
            </div>
            <div className="list-date">
                listed: {listing.listDate}
            </div>
        </div>
    )
};

export default PropertyListing;