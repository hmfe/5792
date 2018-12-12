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
            inputPlaceholder: '.search__input-placeholder',
            inputReset: '.search__input-reset',
            results: '.search__results',
            list: 'search__results-list',
            listItem: 'search__results-item',
            notice: '.search__notice'
        }
    };

    let search = {
        /*
         * Prepare and create
         ======================== */

        create: function () {
            this.bindSearchInputEvents();
            this.bindResetEvent();
            history.createSearchHistoryFeed();
        },

        search: function () {
            let self = this,
                searchedKey = this.getSearchedKey();

            if (!this.validateSearchedKey(searchedKey)) {
                return false;
            }

            this._removeResultList();
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

        /**
         * @private
         * @param {object} data 
         */
        _prepareResults: function (data) {
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
         * @param {object} items 
         * @param {number} itemsCount 
         */
        _showResults: function (items, itemsCount) {
            let resultsHtml = '',
                resultsList = document.createElement('ul'),
                resultsWrapper = document.querySelector(config.selectors.results);

            for (let i = 0; i < itemsCount; i++) {
                resultsHtml += this._formatResultItems(items[i]);
            }

            resultsList.insertAdjacentHTML('beforeend', resultsHtml);
            resultsList.classList.add(config.selectors.list);
            resultsWrapper.appendChild(resultsList);
        },

        /**
         * @private
         * @param {object} item
         * @returns {string}
         */
        _formatResultItems: function (item) {
            return item ? `<li class="${config.selectors.listItem}">${item.show.name}</li>` : '';
        },

        _removeResultList: function () {
            document.querySelectorAll('.' + config.selectors.list).forEach(function (list) {
                list.remove();
            });
        },

        /*
         * Search result items
         ======================== */

        /**
         * @returns {HTMLElement}
         */
        getSearchInput: function () {
            return document.getElementById(config.selectors.input);
        },

        /**
         * @returns {string}
         */
        getSearchedKey: function () {
            return this.getSearchInput() ? this.getSearchInput().value : '';
        },

        /**
         * @param {string} key 
         * @returns {boolean}
         */
        validateSearchedKey: function (key) {
            return key && key.length >= config.minSearchLength && /^[a-z0-9\s]+$/i.test(key);
        },

        bindSearchInputEvents: function () {
            this.getSearchInput().addEventListener('keyup', function (e) {
                this.togglePlaceholder();
                this.processSearchInput(e);
            }.bind(this), false);
        },

        processSearchInput: utilities.debounce(function (event) {
            this.search();

            if (event.keyCode == 13) {
                let searchedKey = this.getSearchedKey();

                if (this.validateSearchedKey(searchedKey)) {
                    history.saveHistoryToStorage(searchedKey);
                    history.addNewSearchToHistoryList(searchedKey);
                }
            }
        }, 250),

        bindResetEvent: function () {
            document.querySelector(config.selectors.inputReset).onclick = function (e) {
                this.getSearchInput().value = '';
                this.togglePlaceholder();
                this.removeResultList();
            }.bind(this);
        },

        togglePlaceholder: function () {
            let placeholder = document.querySelector(config.selectors.inputPlaceholder);

            if (this.getSearchInput().value.length > 0) {
                placeholder.style.display = "none";
            } else {
                placeholder.style.display = "";
            }
        }
    }

    return search;
});
