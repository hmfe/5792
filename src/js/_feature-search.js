/*
 * Search and Show
 ======================== */

define([
    'fetch',
    'utilities',
    'history'
], function (
    fetch,
    utilities,
    history
) {
    /*
     * Configuration
     ======================== */

    /**
     * @type {object} config
     */
    const config = {
        url: 'http://api.tvmaze.com/search/shows?q=',
        maxLength: 10,
        minSearchLength: 3,
        classPrefix: 'search',
        selectors: {
            input: 'search__input',
            list: 'search__results-list',
            listItem: 'search__results-item',
            
            inputPlaceholder: '.search__input-placeholder',
            inputReset: '.search__btn-reset',
            results: '.search__results',
            notice: '.search__notice'
        }
    };

    let search = {
        /*
         * Public funtions
         ======================== */

        create: function () {
            this._bindSearchInputEvents();
            this._bindResetEvent();
            history.createSearchHistoryFeed();
        },

        search: function () {
            let self = this,
                searchedKey = this._getSearchedKey();

            if (!this._validateSearchedKey(searchedKey)) {
                return false;
            }

            this._removeResultList();
            utilities.removeErrorMessages(config.classPrefix);
            utilities.createLoader(config.classPrefix, config.selectors.notice);

            fetch.fetchData(config.url + searchedKey)
                .then(function (response) {
                    self._prepareResults(response);
                }, function (response) {
                    utilities.destroyLoader(config.classPrefix);
                    utilities.showErrorNotFound(
                        fetch.getFetchError(response, 1),
                        config.classPrefix,
                        config.selectors.notice
                    );
                });
        },

        /*
         * Process/display search results
         ======================== */

        /**
         * @private
         * @param {object|null} data 
         */
        _prepareResults: function (data) {
            if (!data) {
                return;
            }

            let items = fetch.getItems(data),
                itemsCount = fetch.getItemsCount(items, config.maxLength),
                responseError = fetch.getFetchError(data, itemsCount);

            if (responseError) {
                utilities.showErrorNotFound(
                    responseError,
                    config.classPrefix,
                    config.selectors.notice
                );
            } else {
                this._showResults(items, itemsCount);
            }

            utilities.destroyLoader(config.classPrefix);
        },

        /**
         * @private
         * @param {object|null} items 
         * @param {number|null} itemsCount 
         */
        _showResults: function (items, itemsCount) {
            if (!items && !itemsCount) {
                return;
            }

            let resultsHtml = '',
                resultsList = document.createElement('ul'),
                resultsWrapper = document.querySelector(config.selectors.results);

            for (let i = 0; i < itemsCount; i++) {
                resultsHtml += this._formatResultItem(items[i]);
            }

            resultsList.insertAdjacentHTML('beforeend', resultsHtml);
            resultsList.classList.add(config.selectors.list);
            resultsWrapper.appendChild(resultsList);
        },

        /**
         * @private
         * @param {object|null} item
         * @returns {string}
         */
        _formatResultItem: function (item) {
            return item ? `<li class="${config.selectors.listItem}">${item.show.name}</li>` : '';
        },

        /**
         * @private
         */
        _removeResultList: function () {
            document.querySelectorAll('.' + config.selectors.list).forEach(function (list) {
                list.remove();
            });
        },

        /*
         * Process search input
         ======================== */

        /**
         * @private
         */
        _bindSearchInputEvents: function () {
            this._getSearchInput().addEventListener('keyup', function (event) {
                this._togglePlaceholder();
                this._processSearchInput(event);
            }.bind(this), false);
        },

        /**
         * @private
         */
        _processSearchInput: utilities.debounce(function (event) {
            this.search();

            if (event.keyCode == 13) {
                let searchedKey = this._getSearchedKey();

                if (this._validateSearchedKey(searchedKey)) {
                    history.saveHistoryToStorage(searchedKey);
                    history.addNewSearchToHistoryList(searchedKey);
                }
            }
        }, 250),

        /**
         * @private
         * @returns {HTMLElement}
         */
        _getSearchInput: function () {
            return document.getElementById(config.selectors.input);
        },

        /**
         * @private
         * @returns {string}
         */
        _getSearchedKey: function () {
            return this._getSearchInput() ? this._getSearchInput().value : '';
        },

        /**
         * @private
         * @param {string} key 
         * @returns {boolean}
         */
        _validateSearchedKey: function (key) {
            return key && key.length >= config.minSearchLength && /^[a-z0-9\s]+$/i.test(key);
        },

        /*
         * Other search form actions
         ======================== */

        /**
         * @private
         */
        _bindResetEvent: function () {
            document.querySelector(config.selectors.inputReset).onclick = function (event) {
                this._getSearchInput().value = '';
                this._togglePlaceholder();
                this._removeResultList();
            }.bind(this);
        },

        /**
         * @private
         */
        _togglePlaceholder: function () {
            let placeholder = document.querySelector(config.selectors.inputPlaceholder);

            if (this._getSearchInput().value.length > 0) {
                placeholder.style.display = "none";
            } else {
                placeholder.style.display = "";
            }
        }
    }

    return search;
});
