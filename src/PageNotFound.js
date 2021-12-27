import React from 'react';
import Translations from "./Translations";

const MyComponent = () => {
    return (
        <div>
            <h1>{Translations.GetText('error404')}</h1>
            <h3>{Translations.GetText('pageNotFound')}</h3>
        </div>
    );
};

export default MyComponent;
