import useTheme from '../../../hooks/useTheme';

const ThemeWrapper = ({children}) => {
    useTheme();

    return children;
}

export default ThemeWrapper;