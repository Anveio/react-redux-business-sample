import createBrowserHistory from 'history/createBrowserHistory';

export const freshHistory = createBrowserHistory();

/**
 * Curried version of history.pushState that leaves the first two arguments blank.
 */
export const pushToAppHistory = (newState: string) => freshHistory.push('/');
