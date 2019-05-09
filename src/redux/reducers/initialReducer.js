import React from 'react';

export default (state = 0, action) => {
    if(action.type === "pretty") {
        return { name: 'suman'}
    } else {
        return state;
    }
}