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
         * Prepare and create
         ======================== */

        createSearchHistoryFeed: function () {
            this.showSearchHistory();
            this.bindDeleteHistoryEvent();
        },

        saveHistoryToStorage: function (key) {
            let storedHistory = storage.getLocalStorage(config.storage),
                items = storedHistory ? JSON.parse(storedHistory) : [],
                newItem = {
                    'title': key,
                    'date': utilities.getFormattedDate()
                };

            items.unshift(newItem);
            storage.addItemToStorage(config.storage, JSON.stringify(items));
        },

        addNewSearchToHistoryList: function (key) {
            let historyList = document.querySelector('.' + config.selectors.list);

            if (historyList.length < 1) {
                this.showSearchHistory();
                return true;
            }

            let items = {
                    'title': key,
                    'date': utilities.getFormattedDate()
                },
                historyHtml = this.formatHistoryItem(items);

            historyList.insertAdjacentHTML('afterbegin', historyHtml);
            this.toggleSearchResultDisplay();
        },

        showSearchHistory: function () {
            let storedHistory = storage.getLocalStorage(config.storage),
                items = storedHistory ? JSON.parse(storedHistory) : [],
                historyHtml = '',
                historyList = document.createElement('ul');

            for (let i = 0; i < items.length; i++) {
                historyHtml += this.formatHistoryItem(items[i]);
            }

            historyList.insertAdjacentHTML('beforeend', historyHtml);
            historyList.classList.add(config.selectors.list);
            document.querySelector(config.selectors.wrapper).appendChild(historyList);

            this.toggleSearchResultDisplay();
        },

        bindDeleteHistoryEvent: function () {
            document.querySelector(config.selectors.deleteAll).onclick = function () {
                this.deleteSearchHistory();
            }.bind(this);

            document.addEventListener('click', function (e) {
                if (e.target.classList.contains(config.selectors.deleteItem)) {
                    this.deleteSearchHistoryItem(e);
                }
            }.bind(this), false);
        },

        deleteSearchHistoryItem: function (e) {
            let deleteHistoryItem = e.target,
                storedHistory = storage.getLocalStorage(config.storage),
                items = storedHistory ? JSON.parse(storedHistory) : [],
                newStorage = [];

            deleteHistoryItem.parentElement.remove();

            for (let i = 0; i < items.length; i++) {
                if (items[i].title !== deleteHistoryItem.dataset.title) {
                    newStorage.push(items[i]);
                }
            }

            storage.addItemToStorage(config.storage, JSON.stringify(newStorage));

            this.toggleSearchResultDisplay();
        },

        deleteSearchHistory: function () {
            storage.deleteLocalStorage(config.storage);
            this.removeSearchResults();
            this.toggleSearchResultDisplay();
        },

        removeSearchResults: function () {
            let target = document.querySelectorAll('.' + config.selectors.list);

            if (target && target.length > 0) {
                target[0].remove();
            }
        },

        formatHistoryItem: function (item) {
            return item ? `<li>
                            <span class="item">${item.title}</span>
                            <span class="date">${item.date}</span>
                            <a class="${config.selectors.deleteItem}" href="javascript:void(0)" data-title="${item.title}"></a>
                            </li>
                        ` : '';
        },

        toggleSearchResultDisplay: function () {
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
