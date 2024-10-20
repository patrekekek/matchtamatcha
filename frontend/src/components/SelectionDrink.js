import React from 'react';

const SelectionDrink = ({ title, drinks, selectedDrinks, handleDecrement, handleIncrement }) => {
    return (
        <div className="drink-category">
            <h2>{title}</h2>
            <div className="drink-list">
                {drinks && drinks
                    .filter(drink => drink.isAvailable)
                    .map(drink => (
                        <div className="drink-item" key={drink._id}>
                            <p>{drink.name}</p>
                            <div className="quantity">
                                <button type="button" className="quantity__minus" onClick={() => handleDecrement(drink._id)}><span>-</span></button>
                                <input name="quantity" type="text" className="quantity__input" value={selectedDrinks[drink._id]?.quantity || 0} readOnly />
                                <button type="button" className="quantity__plus" onClick={() => handleIncrement(drink._id)}><span>+</span></button>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default SelectionDrink;
