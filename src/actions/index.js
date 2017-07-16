import axios from 'axios';

export const FETCH_TRENDING = 'FETCH_TRENDING';
export const FETCH_CONTRIBUTORS = 'FETCH_CONTRIBUTORS';

export function fetchTrending() {
    const url = 'https://api.github.com/search/repositories?q=created:>2017-07-09&sort=stars&order=desc';
    const request = axios.get(url);

    return {
        type: FETCH_TRENDING,
        payload: request
    };
}

export function fetchContributors(fullRepoName) {
    const url = `https://api.github.com/repos/${fullRepoName}/contributors`;
    const request = axios.get(url, {
        auth: {
            username: '', //input username
            password: '' //input github password
        }
    });

    return {
        type: FETCH_CONTRIBUTORS,
        payload: request
    };
}
