"use strict";define([],function(){return{isLocalStorageSupported:function(){var t=window.localStorage;try{t.setItem("test","1");t.removeItem("test");return!0}catch(t){return!1}},doesStorageItemExist:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.isLocalStorageSupported()&&null!==window.localStorage.getItem(t)},getLocalStorage:function(t){return this.doesStorageItemExist(t)?window.localStorage.getItem(t):null},addItemToStorage:function(t,e){this.isLocalStorageSupported()&&window.localStorage.setItem(t,e)},deleteLocalStorage:function(t){this.doesStorageItemExist(t)&&window.localStorage.removeItem(t)}}});