import React from 'react';
import Translations from "./Translations";

const Error403 = () => {
    return (
        <div>
            <h1>{Translations.GetText('error403')}</h1>
            <h3>{Translations.GetText('noPermissions')}</h3>
        </div>
    );
};

export default Error403;
