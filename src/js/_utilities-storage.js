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
         * @param {string|null} storageItem 
         * @returns {boolean}
         */
        doesStorageItemExist: function (storageItem = null) {
            return this.isLocalStorageSupported() && window.localStorage.getItem(storageItem) !== null;
        },

        /*
         * Process storage items
         ======================== */

        /**
         * @param {string|null} storageItem 
         * @returns {string}
         */
        getLocalStorage: function (storageItem) {
            return this.doesStorageItemExist(storageItem) ? window.localStorage.getItem(storageItem) : '';
        },

        /**
         * @param {string|null} storageItem 
         * @param {string} data 
         */
        addItemToStorage: function (
            storageItem, 
            data = ''
        ) {
            if (this.isLocalStorageSupported()) {
                window.localStorage.setItem(storageItem, data);
            }
        },

        /**
         * @param {string|null} storageItem 
         */
        deleteLocalStorage: function (storageItem) {
            if (this.doesStorageItemExist(storageItem)) {
                window.localStorage.removeItem(storageItem);
            }
        }
    }

    return storage;
});
