import React from 'react';
import Translations from "./Translations";

const Error401 = () => {
    return (
        <div>
            <h1>{Translations.GetText('error401')}</h1>
            <h3>{Translations.GetText('authRequired')}</h3>
        </div>
    );
};

export default Error401;
