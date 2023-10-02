import React from 'react';

const useStateWithCallback = (initialState) => {
    const [state, setState] = React.useState(initialState);
    const cbRef = React.useRef(null);

    const updateState = React.useCallback((newState, cb) => {
        cbRef.current = cb;

        setState(prev => typeof newState === 'function' ? newState(prev) : newState);
    }, []);

    React.useEffect(() => {
        if(cbRef.current){
            cbRef.current(state);
            cbRef.current = null;
        }
    }, [state]);

    return [state, updateState]
}

export default useStateWithCallback;