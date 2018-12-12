/*
 * Search History
 ======================== */

define([
    'utilities',
    'storage'
], function (
    utilities,
    storage
) {
    /*
     * Configuration
     ======================== */

    /**
     * @type {object} config
     */
    const config = {
        storage: 'search-history',
        selectors: {
            wrapper: '.search__history',
            list: 'search__history-list',
            deleteAll: '.search__history-delete--all',
            deleteItem: 'search__history-delete--item'
        }
    };

    let searchHistory = {
        /*
         * Add history and items to storage
         ======================== */
        
        /**
         * @param {string|null} key
         */
        saveHistoryToStorage: function (key) {
            if (!key) {
                return;
            }

            let storedHistory = storage.getLocalStorage(config.storage),
                items = storedHistory ? JSON.parse(storedHistory) : [],
                newItem = {
                    'title': key,
                    'date': utilities.getFormattedDate()
                };

            items.unshift(newItem);
            storage.addItemToStorage(config.storage, JSON.stringify(items));
        },

        /**
         * @param {string|null} key
         */
        addNewSearchToHistoryList: function (key) {
            if (!key) {
                return;
            }
            
            let historyList = document.querySelector('.' + config.selectors.list);

            if (historyList.length < 1) {
                this._showSearchHistory();
                return;
            }

            let items = {
                    'title': key,
                    'date': utilities.getFormattedDate()
                },
                historyHtml = this._formatHistoryItem(items);

            historyList.insertAdjacentHTML('afterbegin', historyHtml);
            this._toggleSearchResultDisplay();
        },

        /*
         * Create history list
         ======================== */

        createSearchHistoryFeed: function () {
            this._showSearchHistory();
            this._bindDeleteHistoryEvent();
        },

        /**
         * @private
         */
        _showSearchHistory: function () {
            let storedHistory = storage.getLocalStorage(config.storage),
                items = storedHistory ? JSON.parse(storedHistory) : [],
                historyHtml = '',
                historyList = document.createElement('ul');

            for (let i = 0; i < items.length; i++) {
                historyHtml += this._formatHistoryItem(items[i]);
            }

            historyList.insertAdjacentHTML('beforeend', historyHtml);
            historyList.classList.add(config.selectors.list);
            document.querySelector(config.selectors.wrapper).appendChild(historyList);

            this._toggleSearchResultDisplay();
        },

        /*
         * Delete history & results
         ======================== */

        /**
         * @private
         */
        _deleteSearchHistory: function () {
            storage.deleteLocalStorage(config.storage);
            this._removeSearchResults();
            this._toggleSearchResultDisplay();
        },

        /**
         * @private
         */
        _bindDeleteHistoryEvent: function () {
            document.querySelector(config.selectors.deleteAll).onclick = function () {
                this._deleteSearchHistory();
            }.bind(this);

            document.addEventListener('click', function (e) {
                if (e.target.classList.contains(config.selectors.deleteItem)) {
                    this._deleteSearchHistoryItem(e);
                }
            }.bind(this), false);
        },

        /**
         * @private
         * @param {object} event
         */
        _deleteSearchHistoryItem: function (event) {
            let deleteHistoryItem = event.target;

            if (!deleteHistoryItem) {
                return;
            }

            let storedHistory = storage.getLocalStorage(config.storage),
                items = storedHistory ? JSON.parse(storedHistory) : [],
                newStorage = [];

            deleteHistoryItem.parentElement.remove();

            for (let i = 0; i < items.length; i++) {
                if (items[i].title !== deleteHistoryItem.dataset.title) {
                    newStorage.push(items[i]);
                }
            }

            storage.addItemToStorage(config.storage, JSON.stringify(newStorage));

            this._toggleSearchResultDisplay();
        },

        /**
         * @private
         */
        _removeSearchResults: function () {
            let target = document.querySelectorAll('.' + config.selectors.list);

            if (target && target.length > 0) {
                target[0].remove();
            }
        },

        /*
         * Local utilities
         ======================== */

        /**
         * @private
         * @param {object|null} item
         * @returns {string}
         */
        _formatHistoryItem: function (item) {
            return item ? `<li>
                            <span class="item">${item.title}</span>
                            <span class="date">${item.date}</span>
                            <a class="${config.selectors.deleteItem}" href="javascript:void(0)" data-title="${item.title}"></a>
                            </li>
                        ` : '';
        },

        /**
         * @private
         */
        _toggleSearchResultDisplay: function () {
            let storedHistory = storage.getLocalStorage(config.storage),
                historyWrapper = document.querySelector(config.selectors.wrapper);

            if (storedHistory && storedHistory.length > 0) {
                historyWrapper.style.display = "block";
            } else {
                historyWrapper.style.display = "none";
            }
        }
    }

    return searchHistory;
});
