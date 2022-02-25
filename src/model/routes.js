const ROUTES = {
    ROOT: 'ROOT',
    ABOUT: 'ABOUT',
    MY_CARDS: 'MY_CARDS',
    MY_FAVORITE_CARDS: 'MY_FAVORITE_CARDS',
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP',
    BIZ_SIGN_UP: 'BIZ_SIGN_UP',
    LOGOUT: 'LOGOUT',
};

const ROUTES_DEF = {
    [ROUTES.ROOT]: { to: '/', label: 'Home' },
    [ROUTES.ABOUT]: { to: '/about', label: 'About' },
    [ROUTES.MY_CARDS]: {
        to: '/my-cards',
        label: 'My Cards',
    },
    [ROUTES.MY_FAVORITE_CARDS]:
        {
            to: '/my-favorite-cards',
            label: 'My Favorite Cards',
        },
    [ROUTES.SIGN_IN]: { to: 'signin', label: 'Signin' },
    [ROUTES.SIGN_UP]: { to: 'signup', label: 'Signup' },
    [ROUTES.BIZ_SIGN_UP]: { to: 'bin-signup', label: 'Signup as Business' },
    [ROUTES.LOGOUT]: { to: 'logout', label: 'Logout' },
};

export { ROUTES_DEF, ROUTES };
