/*
 * Local storage utilities
 ======================== */

define([], function () {
    var storage = {
        /*
         * Check for availability
         ======================== */

        /**
         * @returns {boolean}
         */
        isLocalStorageSupported: function () {
            var testKey = 'test',
                storageItem = window.localStorage;

            try {
                storageItem.setItem(testKey, '1');
                storageItem.removeItem(testKey);

                return true;
            } catch (error) {
                return false;
            }
        },

        /**
         * @param {string|null} item 
         * @returns {boolean}
         */
        doesStorageItemExist: function (item = null) {
            return this.isLocalStorageSupported() && window.localStorage.getItem(item) !== null;
        },

        /*
         * Process storage items
         ======================== */

        /**
         * @param {string} storageItem 
         * @returns {string}
         */
        getLocalStorage: function (storageItem) {
            return this.doesStorageItemExist(storageItem) ? window.localStorage.getItem(storageItem) : '';
        },

        /**
         * @param {string} storageItem 
         * @param {string} data 
         */
        addItemToStorage: function (storageItem, data) {
            if (this.isLocalStorageSupported()) {
                window.localStorage.setItem(storageItem, data);
            }
        },

        /**
         * @param {string} storageItem 
         */
        deleteLocalStorage: function (storageItem) {
            if (this.doesStorageItemExist(storageItem)) {
                window.localStorage.removeItem(storageItem);
            }
        }
    }

    return storage;
});
