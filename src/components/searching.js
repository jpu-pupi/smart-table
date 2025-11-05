import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
     // @todo: #5.1 — настроить компаратор
    const comparator = createComparison([
        'skipEmptyTargetValues',
        'searchMultipleFields'
    ]);

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const searchValue = state[searchField];
        return data.filter(item => comparator(item, {
            [searchField]: searchValue,
            searchFields: ['date', 'customer', 'seller']
        }));
    }
}