"use strict";define([],function(){return{createLoader:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"loader",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"body",r=document.createElement("div"),n=document.querySelector(t);r.classList.add(e+"__loader");r.insertAdjacentHTML("beforeend","Searching...");n.appendChild(r)},destroyLoader:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"loader",t=document.querySelectorAll("."+e+"__loader");t&&t.length>0&&t[0].remove()},showErrorNotFound:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"error",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"body";document.querySelectorAll("."+t+"__error").forEach(function(e){e.remove()});if(e){var n=document.createElement("div"),o=document.querySelector(r);n.classList.add(t+"__error");n.insertAdjacentHTML("beforeend",e);o.appendChild(n)}},debounce:function(e,t,r){var n;return function(){var o=this,d=arguments,i=r&&!n;clearTimeout(n);n=setTimeout(function(){n=null;r||e.apply(o,d)},t);i&&e.apply(o,d)}},getFormattedDate:function(){return new Date(Date.now()).toLocaleDateString("en-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:"false"})}}});