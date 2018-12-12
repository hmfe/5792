/*
 * RequireJS config
 */

require.config({
    baseUrl: 'assets/js',
    paths: {
        utilities: '_utilities-general',
        storage: '_utilities-storage',
        fetch: '_utilities-fetch',
        search: '_feature-search',
        history: '_feature-search-history'
    }
});

/*
 * Initialize search app
 */

define([
    'search'
], function (search) {
    search.create();
});
