/*
 * Local storage utilities
 ======================== */

define([], function () {
    var storage = {
        /*
         * Check for availability
         ======================== */

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

        doesStorageItemExist: function (item = null) {
            return this.isLocalStorageSupported() && window.localStorage.getItem(item) !== null;
        },

        /*
         * Process storage items
         ======================== */

        getLocalStorage: function (storageItem) {
            return this.doesStorageItemExist(storageItem) ? window.localStorage.getItem(storageItem) : null;
        },

        addItemToStorage: function (storageItem, data) {
            if (this.isLocalStorageSupported()) {
                window.localStorage.setItem(storageItem, data);
            }
        },

        deleteLocalStorage: function (storageItem) {
            if (this.doesStorageItemExist(storageItem)) {
                window.localStorage.removeItem(storageItem);
            }
        }
    }

    return storage;
});
