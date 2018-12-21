"use strict";define(["fetch","utilities","history"],function(e,t,n){var s="http://api.tvmaze.com/search/shows?q=",r=10,i=3,c="search",o={input:"search__input",list:"search__results-list",listItem:"search__results-item",inputPlaceholder:".search__input-placeholder",inputReset:".search__btn-reset",results:".search__results",notice:".search__notice"};return{create:function(){this._bindSearchInputEvents();this._bindSaveResultEvent();this._bindResetEvent();n.createSearchHistoryFeed()},search:function(){var n=this,r=this._getSearchedKey();if(!this._validateSearchedKey(r))return!1;this._removeResultList();t.removeErrorMessages(c);t.createLoader(c,o.notice);e.fetchData(s+r).then(function(e){n._prepareResults(e)},function(n){t.destroyLoader(c);t.showErrorNotFound(e.getFetchError(n,1),c,o.notice)})},_prepareResults:function(n){if(n){var s=e.getItems(n),i=e.getItemsCount(s,r),a=e.getFetchError(n,i);a?t.showErrorNotFound(a,c,o.notice):this._showResults(s,i);t.destroyLoader(c)}},_showResults:function(e,t){if(e||t){for(var n="",s=document.createElement("ul"),r=document.querySelector(o.results),i=0;i<t;i++)n+=this._formatResultItem(e[i]);s.insertAdjacentHTML("beforeend",n);s.classList.add(o.list);r.appendChild(s)}},_formatResultItem:function(e){return e?'<li>\n                        <a href="javascript:void(0)" class="'.concat(o.listItem,'">\n                            ').concat(e.show.name,"\n                        </a>\n                    </li>"):""},_removeResultList:function(){document.querySelectorAll("."+o.list).forEach(function(e){e.remove()})},_bindSearchInputEvents:function(){this._getSearchInput().addEventListener("keyup",function(e){this._togglePlaceholder();this._processSearchInput(e)}.bind(this),!1)},_bindSaveResultEvent:function(){document.addEventListener("click",function(e){if(e.target.classList.contains(o.listItem)){var t=e.target.textContent;if(t&&t.length>0){n.saveHistoryToStorage(t);n.addNewSearchToHistoryList(t)}}}.bind(this),!1)},_processSearchInput:t.debounce(function(e){this.search()},250),_getSearchInput:function(){return document.getElementById(o.input)},_getSearchedKey:function(){return this._getSearchInput()?this._getSearchInput().value:""},_validateSearchedKey:function(e){return e&&e.length>=i&&/^[a-z0-9\s]+$/i.test(e)},_bindResetEvent:function(){document.querySelector(o.inputReset).onclick=function(e){this._getSearchInput().value="";this._togglePlaceholder();this._removeResultList()}.bind(this)},_togglePlaceholder:function(){var e=document.querySelector(o.inputPlaceholder);this._getSearchInput().value.length>0?e.style.display="none":e.style.display=""}}});