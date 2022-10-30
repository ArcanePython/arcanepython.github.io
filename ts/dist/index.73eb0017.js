// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1pQXO":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "7afc657273eb0017";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"3CPcP":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const mtls = __importStar(require("./mouselistener")); // connect events for mouse and mouse wheel
const skeleton = __importStar(require("./skeleton")); // read geometry from .obj / .mtl files
const fish = __importStar(require("./fishanimation")); // read geometry from .obj / .mtl files
const manytextures = __importStar(require("./manytextures")); // camera projection
const objmtlimport_js_1 = require("./objmtlimport.js");
const ShowOBJMTL = 1;
const ShowTextures = 2;
const ShowTriangleBone = 3;
const ShowFish = 4;
var selectedShow = ShowFish;
//-----------------------------------------------------------------------------------------
var dictPars;
function GetUrlPars(s, dictPars) {
    var p = s.indexOf("?");
    var spar = s.substring(p + 1), ppar = "", cpar = "";
    while(spar.indexOf("&") > 0){
        ppar = spar.substring(0, spar.indexOf("&"));
        var pp = ppar.indexOf("=");
        if (pp >= 0) {
            cpar = ppar.substring(0, pp);
            ppar = ppar.substring(1 + pp);
            dictPars.set(cpar, ppar);
        } else dictPars.set(ppar, "");
        spar = spar.substring(spar.indexOf("&") + 1);
    }
    p = spar.indexOf("=");
    if (p >= 0) {
        cpar = spar.substring(0, p);
        ppar = spar.substring(1 + p);
        dictPars.set(cpar, ppar);
    } else dictPars.set(spar, "");
    return dictPars;
}
function main() {
    var s = window.location.href;
    if (s.includes("?")) {
        console.log("url parameters " + s);
        dictPars = GetUrlPars(s, new Map());
    }
    if (dictPars == undefined) console.log("No arguments");
    else dictPars.forEach((value, key)=>{
        console.log("UrlPars key=" + key + " value=" + value);
    });
    // == Canvas and mouse
    const canvas = document.querySelector("#c");
    var app;
    function OnMouseWheel(eventstring) {
        document.getElementById("app").innerHTML = "mousewheel: [" + eventstring + "]";
    }
    function OnMouseMove(eventstring) {}
    function OnMouseDown(eventstring) {
        document.getElementById("app").innerHTML = "mousedown: [" + eventstring + "]";
    }
    function OnMouseUp(eventstring) {
        document.getElementById("app").innerHTML = "mouseup: [" + eventstring + "] ";
    }
    if (canvas) {
        app = new mtls.MouseListener(canvas);
        app.OnMouseWheel = OnMouseWheel;
        app.OnMouseMove = OnMouseMove;
        app.OnMouseDown = OnMouseDown;
        app.OnMouseUp = OnMouseUp;
    }
    //== WebGL2
    const gl = canvas.getContext("webgl2"); // allow for vs300 shaders
    //== dispatch to class
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("textures")) != undefined) {
        new manytextures.ManyTextures(gl, app, dictPars);
        return;
    } else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("skeleton")) != undefined) {
        new skeleton.Skeleton(gl, app, dictPars);
        return;
    } else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("fish")) != undefined) {
        new fish.FishAnimation(gl, app, dictPars);
        return;
    } else if (dictPars == undefined) {
        dictPars = new Map();
        switch(selectedShow){
            case ShowTriangleBone:
            case ShowFish:
                dictPars === null || dictPars === void 0 || dictPars.set("radius0", "60");
                dictPars === null || dictPars === void 0 || dictPars.set("mesh", "strip");
                dictPars === null || dictPars === void 0 || dictPars.set("hx", "1.2");
                dictPars === null || dictPars === void 0 || dictPars.set("hy", "0.1");
                dictPars === null || dictPars === void 0 || dictPars.set("stride", "180");
                dictPars === null || dictPars === void 0 || dictPars.set("numrows", "39");
                console.log("run default skeleton " + dictPars);
                if (selectedShow == ShowFish) new fish.FishAnimation(gl, app, dictPars);
                else new skeleton.Skeleton(gl, app, dictPars);
                return;
            case ShowTextures:
                dictPars === null || dictPars === void 0 || dictPars.set("textures", "");
                new manytextures.ManyTextures(gl, app, dictPars);
                return;
            case ShowOBJMTL:
                console.log("no entries");
                //show building index.html?building&radius0=45&hx=-0.68&hy=0.47&hxl=-0.61&difflight=1&speclight=0
                dictPars === null || dictPars === void 0 || dictPars.set("building", "");
                dictPars === null || dictPars === void 0 || dictPars.set("radius0", "45");
                dictPars === null || dictPars === void 0 || dictPars.set("hx", "-0.68");
                dictPars === null || dictPars === void 0 || dictPars.set("hy", "0.47");
                dictPars === null || dictPars === void 0 || dictPars.set("hxl", "-0.61");
                dictPars === null || dictPars === void 0 || dictPars.set("difflight", "0.5");
                dictPars === null || dictPars === void 0 || dictPars.set("speclight", "0.5");
                new objmtlimport_js_1.ObjMtlImport(gl, app, dictPars);
                return;
            default:
                return;
        }
    } else {
        new objmtlimport_js_1.ObjMtlImport(gl, app, dictPars);
        return;
    }
}
main();

},{"./mouselistener":"kqrhn","./skeleton":"7hZAU","./fishanimation":"jTKYD","./manytextures":"llxVM","./objmtlimport.js":"46ggt"}],"kqrhn":[function(require,module,exports) {
"use strict";
//--- MOUSE EVENT LISTENERS ------------------------------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MouseListener = exports.MouseState = void 0;
class MouseState {
    constructor(){
        this.changewheel = false;
        this.changedrag = false;
        this.dragging = false;
        this.totaldelta = 0.0;
        this.delta = 0.0;
        this.sx = this.sy = "0.5";
        this.x = this.y = 0.5;
        this.dragx0 = this.dragy0 = 0;
        this.dragdistance = 10;
    }
}
exports.MouseState = MouseState;
class MouseListener {
    constructor(canvas){
        this.state = {
            count: 0
        };
        this.controlkeydown = false;
        this.mouse = new MouseState();
        this.state = {
            count: 0
        };
        canvas.addEventListener("keydown", (event)=>{
            console.log("keydown " + event.ctrlKey);
            if (event.ctrlKey) this.controlkeydown = true;
        });
        canvas.addEventListener("keyup", (event)=>{
            console.log("keyup " + event.ctrlKey);
            if (!event.ctrlKey) this.controlkeydown = false;
        });
        canvas.addEventListener("wheel", (event)=>{
            this.mouse.changewheel = true;
            this.mouse.delta = Math.sign(event.deltaY);
            console.log("delta=" + this.mouse.delta + " totaldelta=" + this.mouse.totaldelta);
            if (this.mouse.delta < 0) this.mouse.totaldelta--;
            if (this.mouse.delta > 0) this.mouse.totaldelta++;
            if (this.OnMouseWheel != undefined) this.OnMouseWheel(this.mouse.totaldelta.toString());
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
        canvas.onmousedown = (e)=>{
            this.mouse.button = e.button;
            this.mouse.down = true;
            if (this.OnMouseDown != undefined) this.OnMouseDown(this.mouse.sx + " " + this.mouse.sy);
            this.mouse.dragx0 = this.mouse.x;
            this.mouse.dragy0 = this.mouse.y;
            this.mouse.dragging = true;
            e.cancelBubble = true;
        };
        canvas.onmouseup = (e)=>{
            this.mouse.down = false;
            if (this.mouse.dragvector == undefined) {
                if (this.OnMouseUp != undefined) this.OnMouseUp(this.mouse.sx + " " + this.mouse.sy + " clickat");
            } else if (this.OnMouseUp != undefined) this.OnMouseUp(this.mouse.sx + " " + this.mouse.sy + " dragging: v=" + this.mouse.dragvector + " d=" + this.mouse.dragdistance);
            this.mouse.dragging = false;
            delete this.mouse.dragvector;
        };
        canvas.onmousemove = (e)=>{
            var canvas = document.getElementById("c");
            let rect = canvas.getBoundingClientRect();
            this.mouse.px = this.mouse.x;
            this.mouse.py = this.mouse.y;
            this.mouse.x = (e.x - rect.left) / canvas.width;
            this.mouse.x = this.mouse.x * 2.0 - 1.0;
            this.mouse.y = (canvas.height - (e.y - rect.top)) / canvas.height;
            this.mouse.y = this.mouse.y * 2.0 - 1.0;
            this.mouse.sy = this.mouse.y.toFixed(2);
            this.mouse.sx = this.mouse.x.toFixed(2);
            this.state.count += 1;
            if (this.mouse.dragging) {
                var dx = this.mouse.x - this.mouse.dragx0;
                var dy = this.mouse.y - this.mouse.dragy0;
                var d = Math.sqrt(dx * dx + dy * dy);
                this.mouse.dragvector = [
                    dx / d,
                    dy / d
                ];
                this.mouse.dragdistance = d;
            }
            if (this.OnMouseMove != undefined) this.OnMouseMove(this.mouse.sx + " " + this.mouse.sy);
            //console.log("setmouse "+this.mouse.x+","+this.mouse.y); }
            canvas.oncontextmenu = (e)=>e.preventDefault();
        };
    }
    mousewheeleventdone() {
        this.mouse.changewheel = false;
    }
    drageventdone() {
        this.mouse.changedrag = false;
    }
}
exports.MouseListener = MouseListener;

},{}],"7hZAU":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Skeleton = void 0;
const twgl = __importStar(require("./../node_modules/twgl.js")); // Greg's work
const twgl_js_1 = require("./../node_modules/twgl.js");
const camhandler = __importStar(require("./camhandler")); // camera projection
const boneanimation = __importStar(require("./boneanimation"));
const fish = __importStar(require("./fish"));
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
twgl.setAttributePrefix("a_");
class Skeleton extends fish.FishHTranslated {
    constructor(cgl, capp, dictpar){
        super(1.0, 0.03, 1.0, 0.015, 0.5, 2.5, "zelenskyy");
        this.bufferInfo = null;
        this.skinVAO = null;
        this.phase0 = 0.0; //2.0; // 143 degrees 
        var spar;
        if ((spar = dictpar.get("phase2")) != undefined) this.phase0 = +spar;
        this.gl = cgl;
        this.app = capp;
        this.prepareSurfaceTextures(this.gl, "zelenskyy");
        this.programInfo = twgl.createProgramInfo(this.gl, [
            boneanimation.vsSkeleton,
            boneanimation.fsSkeleton
        ]);
        this.mesh = this.prepareMesh(this.gl, dictpar, 1.0);
        this.numBones = this.mesh.type == this.gl.TRIANGLE_STRIP ? this.mesh.nsegments / this.mesh.bonediv : this.mesh.nsegments;
        this.createBoneTexture(this.gl, dictpar);
        this.createSurfaceTexture(this.gl);
        this.uniforms = this.prepareUniforms(this.gl, dictpar); // this.phase0);
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.mesh.arrays);
        this.skinVAO = twgl.createVAOFromBufferInfo(this.gl, this.programInfo, this.bufferInfo);
        this.cam = camhandler.Camera.createZUpCamera(this.gl, dictpar, 50.0, this.app);
        this.cam.zoominVelocity = 0.5;
        requestAnimationFrame(()=>this.render(0));
    }
    //------------------------------------------------------------------------------------------------------------------------------------
    render(time) {
        //time=0;
        var gl = this.gl;
        gl.useProgram(this.programInfo.program);
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var cam = this.cam;
        cam.CamHandlingZUp(gl, this.app);
        this.uniforms.worldviewprojection = cam.viewProjection;
        gl.bindVertexArray(this.skinVAO);
        this.computeBone(time);
        this.prepareBoneTexture(gl, this.bindPoseInv2);
        this.uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [
            20.0,
            -20,
            0.0
        ]); // draw a fish
        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.mesh.type);
        this.uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [
            0.0,
            0.0,
            0.0
        ]); // draw a fish
        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.mesh.type);
        this.computeBone(time);
        this.prepareBoneTexture(gl, this.bindPoseInv2);
        this.uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [
            50.0,
            -20,
            10.0
        ]); // draw a fish    
        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.mesh.type);
        this.uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [
            -10,
            5.0,
            -10
        ]); // draw a fish
        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.mesh.type);
        requestAnimationFrame(()=>this.render(++time));
    }
}
exports.Skeleton = Skeleton;

},{"./../node_modules/twgl.js":"3uqAP","./camhandler":"4jukU","./boneanimation":"aOyYs","./fish":"otYB7"}],"3uqAP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addExtensionsToContext", ()=>addExtensionsToContext);
parcelHelpers.export(exports, "attributes", ()=>attributes);
parcelHelpers.export(exports, "bindFramebufferInfo", ()=>bindFramebufferInfo);
parcelHelpers.export(exports, "bindTransformFeedbackInfo", ()=>bindTransformFeedbackInfo);
parcelHelpers.export(exports, "bindUniformBlock", ()=>bindUniformBlock);
parcelHelpers.export(exports, "canFilter", ()=>canFilter);
parcelHelpers.export(exports, "canGenerateMipmap", ()=>canGenerateMipmap);
parcelHelpers.export(exports, "createAttribsFromArrays", ()=>createAttribsFromArrays);
parcelHelpers.export(exports, "createAttributeSetters", ()=>createAttributeSetters);
parcelHelpers.export(exports, "createBufferFromArray", ()=>createBufferFromArray);
parcelHelpers.export(exports, "createBufferFromTypedArray", ()=>createBufferFromTypedArray);
parcelHelpers.export(exports, "createBufferInfoFromArrays", ()=>createBufferInfoFromArrays);
parcelHelpers.export(exports, "createBuffersFromArrays", ()=>createBuffersFromArrays);
parcelHelpers.export(exports, "createFramebufferInfo", ()=>createFramebufferInfo);
parcelHelpers.export(exports, "createProgram", ()=>createProgram);
parcelHelpers.export(exports, "createProgramAsync", ()=>createProgramAsync);
parcelHelpers.export(exports, "createProgramFromScripts", ()=>createProgramFromScripts);
parcelHelpers.export(exports, "createProgramFromSources", ()=>createProgramFromSources);
parcelHelpers.export(exports, "createProgramInfo", ()=>createProgramInfo);
parcelHelpers.export(exports, "createProgramInfoAsync", ()=>createProgramInfoAsync);
parcelHelpers.export(exports, "createProgramInfoFromProgram", ()=>createProgramInfoFromProgram);
parcelHelpers.export(exports, "createSampler", ()=>createSampler);
parcelHelpers.export(exports, "createSamplers", ()=>createSamplers);
parcelHelpers.export(exports, "createTexture", ()=>createTexture);
parcelHelpers.export(exports, "createTextures", ()=>createTextures);
parcelHelpers.export(exports, "createTransformFeedback", ()=>createTransformFeedback);
parcelHelpers.export(exports, "createTransformFeedbackInfo", ()=>createTransformFeedbackInfo);
parcelHelpers.export(exports, "createUniformBlockInfo", ()=>createUniformBlockInfo);
parcelHelpers.export(exports, "createUniformBlockInfoFromProgram", ()=>createUniformBlockInfoFromProgram);
parcelHelpers.export(exports, "createUniformBlockSpecFromProgram", ()=>createUniformBlockSpecFromProgram);
parcelHelpers.export(exports, "createUniformSetters", ()=>createUniformSetters);
parcelHelpers.export(exports, "createVAOAndSetAttributes", ()=>createVAOAndSetAttributes);
parcelHelpers.export(exports, "createVAOFromBufferInfo", ()=>createVAOFromBufferInfo);
parcelHelpers.export(exports, "createVertexArrayInfo", ()=>createVertexArrayInfo);
parcelHelpers.export(exports, "draw", ()=>draw);
parcelHelpers.export(exports, "drawBufferInfo", ()=>drawBufferInfo);
parcelHelpers.export(exports, "drawObjectList", ()=>drawObjectList);
parcelHelpers.export(exports, "framebuffers", ()=>framebuffers);
parcelHelpers.export(exports, "getArray_", ()=>getArray);
parcelHelpers.export(exports, "getBytesPerElementForInternalFormat", ()=>getBytesPerElementForInternalFormat);
parcelHelpers.export(exports, "getContext", ()=>getContext);
parcelHelpers.export(exports, "getFormatAndTypeForInternalFormat", ()=>getFormatAndTypeForInternalFormat);
parcelHelpers.export(exports, "getGLTypeForTypedArray", ()=>getGLTypeForTypedArray);
parcelHelpers.export(exports, "getGLTypeForTypedArrayType", ()=>getGLTypeForTypedArrayType);
parcelHelpers.export(exports, "getNumComponentsForFormat", ()=>getNumComponentsForFormat);
parcelHelpers.export(exports, "getNumComponents_", ()=>getNumComponents);
parcelHelpers.export(exports, "getTypedArrayTypeForGLType", ()=>getTypedArrayTypeForGLType);
parcelHelpers.export(exports, "getWebGLContext", ()=>getWebGLContext);
parcelHelpers.export(exports, "glEnumToString", ()=>glEnumToString);
parcelHelpers.export(exports, "isArrayBuffer", ()=>isArrayBuffer);
parcelHelpers.export(exports, "isWebGL1", ()=>isWebGL1);
parcelHelpers.export(exports, "isWebGL2", ()=>isWebGL2);
parcelHelpers.export(exports, "loadTextureFromUrl", ()=>loadTextureFromUrl);
parcelHelpers.export(exports, "m4", ()=>m4);
parcelHelpers.export(exports, "primitives", ()=>primitives);
parcelHelpers.export(exports, "programs", ()=>programs);
parcelHelpers.export(exports, "resizeCanvasToDisplaySize", ()=>resizeCanvasToDisplaySize);
parcelHelpers.export(exports, "resizeFramebufferInfo", ()=>resizeFramebufferInfo);
parcelHelpers.export(exports, "resizeTexture", ()=>resizeTexture);
parcelHelpers.export(exports, "setAttribInfoBufferFromArray", ()=>setAttribInfoBufferFromArray);
parcelHelpers.export(exports, "setAttributeDefaults_", ()=>setDefaults);
parcelHelpers.export(exports, "setAttributePrefix", ()=>setAttributePrefix);
parcelHelpers.export(exports, "setAttributes", ()=>setAttributes);
parcelHelpers.export(exports, "setBlockUniforms", ()=>setBlockUniforms);
parcelHelpers.export(exports, "setBuffersAndAttributes", ()=>setBuffersAndAttributes);
parcelHelpers.export(exports, "setDefaultTextureColor", ()=>setDefaultTextureColor);
parcelHelpers.export(exports, "setDefaults", ()=>setDefaults$2);
parcelHelpers.export(exports, "setEmptyTexture", ()=>setEmptyTexture);
parcelHelpers.export(exports, "setSamplerParameters", ()=>setSamplerParameters);
parcelHelpers.export(exports, "setTextureDefaults_", ()=>setDefaults$1);
parcelHelpers.export(exports, "setTextureFilteringForSize", ()=>setTextureFilteringForSize);
parcelHelpers.export(exports, "setTextureFromArray", ()=>setTextureFromArray);
parcelHelpers.export(exports, "setTextureFromElement", ()=>setTextureFromElement);
parcelHelpers.export(exports, "setTextureParameters", ()=>setTextureParameters);
parcelHelpers.export(exports, "setUniformBlock", ()=>setUniformBlock);
parcelHelpers.export(exports, "setUniforms", ()=>setUniforms);
parcelHelpers.export(exports, "setUniformsAndBindTextures", ()=>setUniformsAndBindTextures);
parcelHelpers.export(exports, "textures", ()=>textures);
parcelHelpers.export(exports, "typedarrays", ()=>typedarrays);
parcelHelpers.export(exports, "utils", ()=>utils);
parcelHelpers.export(exports, "v3", ()=>v3);
parcelHelpers.export(exports, "vertexArrays", ()=>vertexArrays);
/* @license twgl.js 4.24.0 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/twgl.js for details */ /*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 *
 * Vec3 math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new Vec3. In other words you can do this
 *
 *     var v = v3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
 *
 * or
 *
 *     var v = v3.create();
 *     v3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any vector as the destination. So for example
 *
 *     v3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 * @module twgl/v3
 */ let VecType = Float32Array;
/**
 * A JavaScript array with 3 values or a Float32Array with 3 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/v3.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Vec3
 * @memberOf module:twgl/v3
 */ /**
 * Sets the type this library creates for a Vec3
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Vec3
 * @memberOf module:twgl/v3
 */ function setDefaultType(ctor) {
    const oldType = VecType;
    VecType = ctor;
    return oldType;
}
/**
 * Creates a vec3; may be called with x, y, z to set initial values.
 * @param {number} [x] Initial x value.
 * @param {number} [y] Initial y value.
 * @param {number} [z] Initial z value.
 * @return {module:twgl/v3.Vec3} the created vector
 * @memberOf module:twgl/v3
 */ function create(x, y, z) {
    const dst = new VecType(3);
    if (x) dst[0] = x;
    if (y) dst[1] = y;
    if (z) dst[2] = z;
    return dst;
}
/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector tha tis the sum of a and b.
 * @memberOf module:twgl/v3
 */ function add(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
    dst[2] = a[2] + b[2];
    return dst;
}
/**
 * Subtracts two vectors.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector that is the difference of a and b.
 * @memberOf module:twgl/v3
 */ function subtract(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    return dst;
}
/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {number} t Interpolation coefficient.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The linear interpolated result.
 * @memberOf module:twgl/v3
 */ function lerp(a, b, t, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] + t * (b[0] - a[0]);
    dst[1] = a[1] + t * (b[1] - a[1]);
    dst[2] = a[2] + t * (b[2] - a[2]);
    return dst;
}
/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient vector t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} t Interpolation coefficients vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} the linear interpolated result.
 * @memberOf module:twgl/v3
 */ function lerpV(a, b, t, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] + t[0] * (b[0] - a[0]);
    dst[1] = a[1] + t[1] * (b[1] - a[1]);
    dst[2] = a[2] + t[2] * (b[2] - a[2]);
    return dst;
}
/**
 * Return max values of two vectors.
 * Given vectors a and b returns
 * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The max components vector.
 * @memberOf module:twgl/v3
 */ function max(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = Math.max(a[0], b[0]);
    dst[1] = Math.max(a[1], b[1]);
    dst[2] = Math.max(a[2], b[2]);
    return dst;
}
/**
 * Return min values of two vectors.
 * Given vectors a and b returns
 * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The min components vector.
 * @memberOf module:twgl/v3
 */ function min(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = Math.min(a[0], b[0]);
    dst[1] = Math.min(a[1], b[1]);
    dst[2] = Math.min(a[2], b[2]);
    return dst;
}
/**
 * Multiplies a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */ function mulScalar(v, k, dst) {
    dst = dst || new VecType(3);
    dst[0] = v[0] * k;
    dst[1] = v[1] * k;
    dst[2] = v[2] * k;
    return dst;
}
/**
 * Divides a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */ function divScalar(v, k, dst) {
    dst = dst || new VecType(3);
    dst[0] = v[0] / k;
    dst[1] = v[1] / k;
    dst[2] = v[2] / k;
    return dst;
}
/**
 * Computes the cross product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of a cross b.
 * @memberOf module:twgl/v3
 */ function cross(a, b, dst) {
    dst = dst || new VecType(3);
    const t1 = a[2] * b[0] - a[0] * b[2];
    const t2 = a[0] * b[1] - a[1] * b[0];
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = t1;
    dst[2] = t2;
    return dst;
}
/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @return {number} dot product
 * @memberOf module:twgl/v3
 */ function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} length of vector.
 * @memberOf module:twgl/v3
 */ function length$1(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}
/**
 * Computes the square of the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} square of the length of vector.
 * @memberOf module:twgl/v3
 */ function lengthSq(v) {
    return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
/**
 * Computes the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} distance between a and b
 * @memberOf module:twgl/v3
 */ function distance(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
/**
 * Computes the square of the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} square of the distance between a and b
 * @memberOf module:twgl/v3
 */ function distanceSq(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
}
/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param {module:twgl/v3.Vec3} a The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The normalized vector.
 * @memberOf module:twgl/v3
 */ function normalize(a, dst) {
    dst = dst || new VecType(3);
    const lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    const len = Math.sqrt(lenSq);
    if (len > 0.00001) {
        dst[0] = a[0] / len;
        dst[1] = a[1] / len;
        dst[2] = a[2] / len;
    } else {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
    }
    return dst;
}
/**
 * Negates a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} -v.
 * @memberOf module:twgl/v3
 */ function negate(v, dst) {
    dst = dst || new VecType(3);
    dst[0] = -v[0];
    dst[1] = -v[1];
    dst[2] = -v[2];
    return dst;
}
/**
 * Copies a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A copy of v.
 * @memberOf module:twgl/v3
 */ function copy(v, dst) {
    dst = dst || new VecType(3);
    dst[0] = v[0];
    dst[1] = v[1];
    dst[2] = v[2];
    return dst;
}
/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of products of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */ function multiply(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] * b[0];
    dst[1] = a[1] * b[1];
    dst[2] = a[2] * b[2];
    return dst;
}
/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of quotients of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */ function divide(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] / b[0];
    dst[1] = a[1] / b[1];
    dst[2] = a[2] / b[2];
    return dst;
}
var v3 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    add: add,
    copy: copy,
    create: create,
    cross: cross,
    distance: distance,
    distanceSq: distanceSq,
    divide: divide,
    divScalar: divScalar,
    dot: dot,
    lerp: lerp,
    lerpV: lerpV,
    length: length$1,
    lengthSq: lengthSq,
    max: max,
    min: min,
    mulScalar: mulScalar,
    multiply: multiply,
    negate: negate,
    normalize: normalize,
    setDefaultType: setDefaultType,
    subtract: subtract
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * 4x4 Matrix math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new matrix. In other words you can do this
 *
 *     const mat = m4.translation([1, 2, 3]);  // Creates a new translation matrix
 *
 * or
 *
 *     const mat = m4.create();
 *     m4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any matrix as the destination. So for example
 *
 *     const mat = m4.identity();
 *     const trans = m4.translation([1, 2, 3]);
 *     m4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
 *
 * @module twgl/m4
 */ let MatType = Float32Array;
/**
 * A JavaScript array with 16 values or a Float32Array with 16 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/m4.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Mat4
 * @memberOf module:twgl/m4
 */ /**
 * Sets the type this library creates for a Mat4
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Mat4
 * @memberOf module:twgl/m4
 */ function setDefaultType$1(ctor) {
    const oldType = MatType;
    MatType = ctor;
    return oldType;
}
/**
 * Negates a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} -m.
 * @memberOf module:twgl/m4
 */ function negate$1(m, dst) {
    dst = dst || new MatType(16);
    dst[0] = -m[0];
    dst[1] = -m[1];
    dst[2] = -m[2];
    dst[3] = -m[3];
    dst[4] = -m[4];
    dst[5] = -m[5];
    dst[6] = -m[6];
    dst[7] = -m[7];
    dst[8] = -m[8];
    dst[9] = -m[9];
    dst[10] = -m[10];
    dst[11] = -m[11];
    dst[12] = -m[12];
    dst[13] = -m[13];
    dst[14] = -m[14];
    dst[15] = -m[15];
    return dst;
}
/**
 * Creates a matrix.
 * @return {module:twgl/m4.Mat4} A new matrix.
 * @memberOf module:twgl/m4
 */ function create$1() {
    return new MatType(16).fill(0);
}
/**
 * Copies a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] The matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A copy of m.
 * @memberOf module:twgl/m4
 */ function copy$1(m, dst) {
    dst = dst || new MatType(16);
    dst[0] = m[0];
    dst[1] = m[1];
    dst[2] = m[2];
    dst[3] = m[3];
    dst[4] = m[4];
    dst[5] = m[5];
    dst[6] = m[6];
    dst[7] = m[7];
    dst[8] = m[8];
    dst[9] = m[9];
    dst[10] = m[10];
    dst[11] = m[11];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
    return dst;
}
/**
 * Creates an n-by-n identity matrix.
 *
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} An n-by-n identity matrix.
 * @memberOf module:twgl/m4
 */ function identity(dst) {
    dst = dst || new MatType(16);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Takes the transpose of a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The transpose of m.
 * @memberOf module:twgl/m4
 */ function transpose(m, dst) {
    dst = dst || new MatType(16);
    if (dst === m) {
        let t;
        t = m[1];
        m[1] = m[4];
        m[4] = t;
        t = m[2];
        m[2] = m[8];
        m[8] = t;
        t = m[3];
        m[3] = m[12];
        m[12] = t;
        t = m[6];
        m[6] = m[9];
        m[9] = t;
        t = m[7];
        m[7] = m[13];
        m[13] = t;
        t = m[11];
        m[11] = m[14];
        m[14] = t;
        return dst;
    }
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    dst[0] = m00;
    dst[1] = m10;
    dst[2] = m20;
    dst[3] = m30;
    dst[4] = m01;
    dst[5] = m11;
    dst[6] = m21;
    dst[7] = m31;
    dst[8] = m02;
    dst[9] = m12;
    dst[10] = m22;
    dst[11] = m32;
    dst[12] = m03;
    dst[13] = m13;
    dst[14] = m23;
    dst[15] = m33;
    return dst;
}
/**
 * Computes the inverse of a 4-by-4 matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The inverse of m.
 * @memberOf module:twgl/m4
 */ function inverse(m, dst) {
    dst = dst || new MatType(16);
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    const tmp_0 = m22 * m33;
    const tmp_1 = m32 * m23;
    const tmp_2 = m12 * m33;
    const tmp_3 = m32 * m13;
    const tmp_4 = m12 * m23;
    const tmp_5 = m22 * m13;
    const tmp_6 = m02 * m33;
    const tmp_7 = m32 * m03;
    const tmp_8 = m02 * m23;
    const tmp_9 = m22 * m03;
    const tmp_10 = m02 * m13;
    const tmp_11 = m12 * m03;
    const tmp_12 = m20 * m31;
    const tmp_13 = m30 * m21;
    const tmp_14 = m10 * m31;
    const tmp_15 = m30 * m11;
    const tmp_16 = m10 * m21;
    const tmp_17 = m20 * m11;
    const tmp_18 = m00 * m31;
    const tmp_19 = m30 * m01;
    const tmp_20 = m00 * m21;
    const tmp_21 = m20 * m01;
    const tmp_22 = m00 * m11;
    const tmp_23 = m10 * m01;
    const t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    const t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    const t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    const t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
    const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
    return dst;
}
/**
 * Multiplies two 4-by-4 matrices with a on the left and b on the right
 * @param {module:twgl/m4.Mat4} a The matrix on the left.
 * @param {module:twgl/m4.Mat4} b The matrix on the right.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix product of a and b.
 * @memberOf module:twgl/m4
 */ function multiply$1(a, b, dst) {
    dst = dst || new MatType(16);
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];
    const b00 = b[0];
    const b01 = b[1];
    const b02 = b[2];
    const b03 = b[3];
    const b10 = b[4];
    const b11 = b[5];
    const b12 = b[6];
    const b13 = b[7];
    const b20 = b[8];
    const b21 = b[9];
    const b22 = b[10];
    const b23 = b[11];
    const b30 = b[12];
    const b31 = b[13];
    const b32 = b[14];
    const b33 = b[15];
    dst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    dst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    dst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    dst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
    dst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    dst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    dst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    dst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
    dst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    dst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
    dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
    return dst;
}
/**
 * Sets the translation component of a 4-by-4 matrix to the given
 * vector.
 * @param {module:twgl/m4.Mat4} a The matrix.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with translation set.
 * @memberOf module:twgl/m4
 */ function setTranslation(a, v, dst) {
    dst = dst || identity();
    if (a !== dst) {
        dst[0] = a[0];
        dst[1] = a[1];
        dst[2] = a[2];
        dst[3] = a[3];
        dst[4] = a[4];
        dst[5] = a[5];
        dst[6] = a[6];
        dst[7] = a[7];
        dst[8] = a[8];
        dst[9] = a[9];
        dst[10] = a[10];
        dst[11] = a[11];
    }
    dst[12] = v[0];
    dst[13] = v[1];
    dst[14] = v[2];
    dst[15] = 1;
    return dst;
}
/**
 * Returns the translation component of a 4-by-4 matrix as a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The translation component of m.
 * @memberOf module:twgl/m4
 */ function getTranslation(m, dst) {
    dst = dst || create();
    dst[0] = m[12];
    dst[1] = m[13];
    dst[2] = m[14];
    return dst;
}
/**
 * Returns an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} axis The axis 0 = x, 1 = y, 2 = z;
 * @return {module:twgl/v3.Vec3} [dst] vector.
 * @return {module:twgl/v3.Vec3} The axis component of m.
 * @memberOf module:twgl/m4
 */ function getAxis(m, axis, dst) {
    dst = dst || create();
    const off = axis * 4;
    dst[0] = m[off + 0];
    dst[1] = m[off + 1];
    dst[2] = m[off + 2];
    return dst;
}
/**
 * Sets an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v the axis vector
 * @param {number} axis The axis  0 = x, 1 = y, 2 = z;
 * @param {module:twgl/m4.Mat4} [dst] The matrix to set. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with axis set.
 * @memberOf module:twgl/m4
 */ function setAxis(a, v, axis, dst) {
    if (dst !== a) dst = copy$1(a, dst);
    const off = axis * 4;
    dst[off + 0] = v[0];
    dst[off + 1] = v[1];
    dst[off + 2] = v[2];
    return dst;
}
/**
 * Computes a 4-by-4 perspective transformation matrix given the angular height
 * of the frustum, the aspect ratio, and the near and far clipping planes.  The
 * arguments define a frustum extending in the negative z direction.  The given
 * angle is the vertical angle of the frustum, and the horizontal angle is
 * determined to produce the given aspect ratio.  The arguments near and far are
 * the distances to the near and far clipping planes.  Note that near and far
 * are not z coordinates, but rather they are distances along the negative
 * z-axis.  The matrix generated sends the viewing frustum to the unit box.
 * We assume a unit box extending from -1 to 1 in the x and y dimensions and
 * from 0 to 1 in the z dimension.
 * @param {number} fieldOfViewYInRadians The camera angle from top to bottom (in radians).
 * @param {number} aspect The aspect ratio width / height.
 * @param {number} zNear The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} zFar The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */ function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
    dst = dst || new MatType(16);
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
    const rangeInv = 1.0 / (zNear - zFar);
    dst[0] = f / aspect;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = f;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = (zNear + zFar) * rangeInv;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = zNear * zFar * rangeInv * 2;
    dst[15] = 0;
    return dst;
}
/**
 * Computes a 4-by-4 orthogonal transformation matrix given the left, right,
 * bottom, and top dimensions of the near clipping plane as well as the
 * near and far clipping plane distances.
 * @param {number} left Left side of the near clipping plane viewport.
 * @param {number} right Right side of the near clipping plane viewport.
 * @param {number} bottom Bottom of the near clipping plane viewport.
 * @param {number} top Top of the near clipping plane viewport.
 * @param {number} near The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} far The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */ function ortho(left, right, bottom, top, near, far, dst) {
    dst = dst || new MatType(16);
    dst[0] = 2 / (right - left);
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 / (top - bottom);
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 2 / (near - far);
    dst[11] = 0;
    dst[12] = (right + left) / (left - right);
    dst[13] = (top + bottom) / (bottom - top);
    dst[14] = (far + near) / (near - far);
    dst[15] = 1;
    return dst;
}
/**
 * Computes a 4-by-4 perspective transformation matrix given the left, right,
 * top, bottom, near and far clipping planes. The arguments define a frustum
 * extending in the negative z direction. The arguments near and far are the
 * distances to the near and far clipping planes. Note that near and far are not
 * z coordinates, but rather they are distances along the negative z-axis. The
 * matrix generated sends the viewing frustum to the unit box. We assume a unit
 * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
 * dimension.
 * @param {number} left The x coordinate of the left plane of the box.
 * @param {number} right The x coordinate of the right plane of the box.
 * @param {number} bottom The y coordinate of the bottom plane of the box.
 * @param {number} top The y coordinate of the right plane of the box.
 * @param {number} near The negative z coordinate of the near plane of the box.
 * @param {number} far The negative z coordinate of the far plane of the box.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective projection matrix.
 * @memberOf module:twgl/m4
 */ function frustum(left, right, bottom, top, near, far, dst) {
    dst = dst || new MatType(16);
    const dx = right - left;
    const dy = top - bottom;
    const dz = near - far;
    dst[0] = 2 * near / dx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 * near / dy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = (left + right) / dx;
    dst[9] = (top + bottom) / dy;
    dst[10] = far / dz;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = near * far / dz;
    dst[15] = 0;
    return dst;
}
let xAxis;
let yAxis;
let zAxis;
/**
 * Computes a 4-by-4 look-at transformation.
 *
 * This is a matrix which positions the camera itself. If you want
 * a view matrix (a matrix which moves things in front of the camera)
 * take the inverse of this.
 *
 * @param {module:twgl/v3.Vec3} eye The position of the eye.
 * @param {module:twgl/v3.Vec3} target The position meant to be viewed.
 * @param {module:twgl/v3.Vec3} up A vector pointing up.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The look-at matrix.
 * @memberOf module:twgl/m4
 */ function lookAt(eye, target, up, dst) {
    dst = dst || new MatType(16);
    xAxis = xAxis || create();
    yAxis = yAxis || create();
    zAxis = zAxis || create();
    normalize(subtract(eye, target, zAxis), zAxis);
    normalize(cross(up, zAxis, xAxis), xAxis);
    normalize(cross(zAxis, xAxis, yAxis), yAxis);
    dst[0] = xAxis[0];
    dst[1] = xAxis[1];
    dst[2] = xAxis[2];
    dst[3] = 0;
    dst[4] = yAxis[0];
    dst[5] = yAxis[1];
    dst[6] = yAxis[2];
    dst[7] = 0;
    dst[8] = zAxis[0];
    dst[9] = zAxis[1];
    dst[10] = zAxis[2];
    dst[11] = 0;
    dst[12] = eye[0];
    dst[13] = eye[1];
    dst[14] = eye[2];
    dst[15] = 1;
    return dst;
}
/**
 * Creates a 4-by-4 matrix which translates by the given vector v.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translation matrix.
 * @memberOf module:twgl/m4
 */ function translation(v, dst) {
    dst = dst || new MatType(16);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = v[0];
    dst[13] = v[1];
    dst[14] = v[2];
    dst[15] = 1;
    return dst;
}
/**
 * Translates the given 4-by-4 matrix by the given vector v.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translated matrix.
 * @memberOf module:twgl/m4
 */ function translate(m, v, dst) {
    dst = dst || new MatType(16);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    if (m !== dst) {
        dst[0] = m00;
        dst[1] = m01;
        dst[2] = m02;
        dst[3] = m03;
        dst[4] = m10;
        dst[5] = m11;
        dst[6] = m12;
        dst[7] = m13;
        dst[8] = m20;
        dst[9] = m21;
        dst[10] = m22;
        dst[11] = m23;
    }
    dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
    dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
    dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
    dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */ function rotationX(angleInRadians, dst) {
    dst = dst || new MatType(16);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = c;
    dst[6] = s;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = -s;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the x-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function rotateX(m, angleInRadians, dst) {
    dst = dst || new MatType(16);
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[4] = c * m10 + s * m20;
    dst[5] = c * m11 + s * m21;
    dst[6] = c * m12 + s * m22;
    dst[7] = c * m13 + s * m23;
    dst[8] = c * m20 - s * m10;
    dst[9] = c * m21 - s * m11;
    dst[10] = c * m22 - s * m12;
    dst[11] = c * m23 - s * m13;
    if (m !== dst) {
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[3];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */ function rotationY(angleInRadians, dst) {
    dst = dst || new MatType(16);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c;
    dst[1] = 0;
    dst[2] = -s;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = s;
    dst[9] = 0;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the y-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function rotateY(m, angleInRadians, dst) {
    dst = dst || new MatType(16);
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c * m00 - s * m20;
    dst[1] = c * m01 - s * m21;
    dst[2] = c * m02 - s * m22;
    dst[3] = c * m03 - s * m23;
    dst[8] = c * m20 + s * m00;
    dst[9] = c * m21 + s * m01;
    dst[10] = c * m22 + s * m02;
    dst[11] = c * m23 + s * m03;
    if (m !== dst) {
        dst[4] = m[4];
        dst[5] = m[5];
        dst[6] = m[6];
        dst[7] = m[7];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */ function rotationZ(angleInRadians, dst) {
    dst = dst || new MatType(16);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c;
    dst[1] = s;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = -s;
    dst[5] = c;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the z-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function rotateZ(m, angleInRadians, dst) {
    dst = dst || new MatType(16);
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c * m00 + s * m10;
    dst[1] = c * m01 + s * m11;
    dst[2] = c * m02 + s * m12;
    dst[3] = c * m03 + s * m13;
    dst[4] = c * m10 - s * m00;
    dst[5] = c * m11 - s * m01;
    dst[6] = c * m12 - s * m02;
    dst[7] = c * m13 - s * m03;
    if (m !== dst) {
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
        dst[11] = m[11];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the given axis by the given
 * angle.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A matrix which rotates angle radians
 *     around the axis.
 * @memberOf module:twgl/m4
 */ function axisRotation(axis, angleInRadians, dst) {
    dst = dst || new MatType(16);
    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    const n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    const xx = x * x;
    const yy = y * y;
    const zz = z * z;
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    const oneMinusCosine = 1 - c;
    dst[0] = xx + (1 - xx) * c;
    dst[1] = x * y * oneMinusCosine + z * s;
    dst[2] = x * z * oneMinusCosine - y * s;
    dst[3] = 0;
    dst[4] = x * y * oneMinusCosine - z * s;
    dst[5] = yy + (1 - yy) * c;
    dst[6] = y * z * oneMinusCosine + x * s;
    dst[7] = 0;
    dst[8] = x * z * oneMinusCosine + y * s;
    dst[9] = y * z * oneMinusCosine - x * s;
    dst[10] = zz + (1 - zz) * c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the given axis by the
 * given angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function axisRotate(m, axis, angleInRadians, dst) {
    dst = dst || new MatType(16);
    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    const n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    const xx = x * x;
    const yy = y * y;
    const zz = z * z;
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    const oneMinusCosine = 1 - c;
    const r00 = xx + (1 - xx) * c;
    const r01 = x * y * oneMinusCosine + z * s;
    const r02 = x * z * oneMinusCosine - y * s;
    const r10 = x * y * oneMinusCosine - z * s;
    const r11 = yy + (1 - yy) * c;
    const r12 = y * z * oneMinusCosine + x * s;
    const r20 = x * z * oneMinusCosine + y * s;
    const r21 = y * z * oneMinusCosine - x * s;
    const r22 = zz + (1 - zz) * c;
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
    dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
    dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
    dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
    dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
    dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
    dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
    dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
    dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
    dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
    dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
    dst[11] = r20 * m03 + r21 * m13 + r22 * m23;
    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param {module:twgl/v3.Vec3} v A vector of
 *     three entries specifying the factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaling matrix.
 * @memberOf module:twgl/m4
 */ function scaling(v, dst) {
    dst = dst || new MatType(16);
    dst[0] = v[0];
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = v[1];
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = v[2];
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Scales the given 4-by-4 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * three entries.
 * @param {module:twgl/m4.Mat4} m The matrix to be modified.
 * @param {module:twgl/v3.Vec3} v A vector of three entries specifying the
 *     factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaled matrix.
 * @memberOf module:twgl/m4
 */ function scale(m, v, dst) {
    dst = dst || new MatType(16);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * m[0];
    dst[1] = v0 * m[1];
    dst[2] = v0 * m[2];
    dst[3] = v0 * m[3];
    dst[4] = v1 * m[4];
    dst[5] = v1 * m[5];
    dst[6] = v1 * m[6];
    dst[7] = v1 * m[7];
    dst[8] = v2 * m[8];
    dst[9] = v2 * m[9];
    dst[10] = v2 * m[10];
    dst[11] = v2 * m[11];
    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Takes a 4-by-4 matrix and a vector with 3 entries,
 * interprets the vector as a point, transforms that point by the matrix, and
 * returns the result as a vector with 3 entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The point.
 * @param {module:twgl/v3.Vec3} [dst] optional vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed point.
 * @memberOf module:twgl/m4
 */ function transformPoint(m, v, dst) {
    dst = dst || create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const d = v0 * m[3] + v1 * m[7] + v2 * m[11] + m[15];
    dst[0] = (v0 * m[0] + v1 * m[4] + v2 * m[8] + m[12]) / d;
    dst[1] = (v0 * m[1] + v1 * m[5] + v2 * m[9] + m[13]) / d;
    dst[2] = (v0 * m[2] + v1 * m[6] + v2 * m[10] + m[14]) / d;
    return dst;
}
/**
 * Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
 * direction, transforms that direction by the matrix, and returns the result;
 * assumes the transformation of 3-dimensional space represented by the matrix
 * is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion. Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The direction.
 * @param {module:twgl/v3.Vec3} [dst] optional Vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed direction.
 * @memberOf module:twgl/m4
 */ function transformDirection(m, v, dst) {
    dst = dst || create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * m[0] + v1 * m[4] + v2 * m[8];
    dst[1] = v0 * m[1] + v1 * m[5] + v2 * m[9];
    dst[2] = v0 * m[2] + v1 * m[6] + v2 * m[10];
    return dst;
}
/**
 * Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
 * as a normal to a surface, and computes a vector which is normal upon
 * transforming that surface by the matrix. The effect of this function is the
 * same as transforming v (as a direction) by the inverse-transpose of m.  This
 * function assumes the transformation of 3-dimensional space represented by the
 * matrix is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion.  Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The normal.
 * @param {module:twgl/v3.Vec3} [dst] The direction. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed normal.
 * @memberOf module:twgl/m4
 */ function transformNormal(m, v, dst) {
    dst = dst || create();
    const mi = inverse(m);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * mi[0] + v1 * mi[1] + v2 * mi[2];
    dst[1] = v0 * mi[4] + v1 * mi[5] + v2 * mi[6];
    dst[2] = v0 * mi[8] + v1 * mi[9] + v2 * mi[10];
    return dst;
}
var m4 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    axisRotate: axisRotate,
    axisRotation: axisRotation,
    copy: copy$1,
    create: create$1,
    frustum: frustum,
    getAxis: getAxis,
    getTranslation: getTranslation,
    identity: identity,
    inverse: inverse,
    lookAt: lookAt,
    multiply: multiply$1,
    negate: negate$1,
    ortho: ortho,
    perspective: perspective,
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
    rotationX: rotationX,
    rotationY: rotationY,
    rotationZ: rotationZ,
    scale: scale,
    scaling: scaling,
    setAxis: setAxis,
    setDefaultType: setDefaultType$1,
    setTranslation: setTranslation,
    transformDirection: transformDirection,
    transformNormal: transformNormal,
    transformPoint: transformPoint,
    translate: translate,
    translation: translation,
    transpose: transpose
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /* DataType */ const BYTE = 0x1400;
const UNSIGNED_BYTE = 0x1401;
const SHORT = 0x1402;
const UNSIGNED_SHORT = 0x1403;
const INT = 0x1404;
const UNSIGNED_INT = 0x1405;
const FLOAT = 0x1406;
const UNSIGNED_SHORT_4_4_4_4 = 0x8033;
const UNSIGNED_SHORT_5_5_5_1 = 0x8034;
const UNSIGNED_SHORT_5_6_5 = 0x8363;
const HALF_FLOAT = 0x140B;
const UNSIGNED_INT_2_10_10_10_REV = 0x8368;
const UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B;
const UNSIGNED_INT_5_9_9_9_REV = 0x8C3E;
const FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD;
const UNSIGNED_INT_24_8 = 0x84FA;
const glTypeToTypedArray = {};
{
    const tt = glTypeToTypedArray;
    tt[BYTE] = Int8Array;
    tt[UNSIGNED_BYTE] = Uint8Array;
    tt[SHORT] = Int16Array;
    tt[UNSIGNED_SHORT] = Uint16Array;
    tt[INT] = Int32Array;
    tt[UNSIGNED_INT] = Uint32Array;
    tt[FLOAT] = Float32Array;
    tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
    tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
    tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
    tt[HALF_FLOAT] = Uint16Array;
    tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
    tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
    tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
    tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
    tt[UNSIGNED_INT_24_8] = Uint32Array;
}/**
 * Get the GL type for a typedArray
 * @param {ArrayBufferView} typedArray a typedArray
 * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */ function getGLTypeForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) return BYTE;
     // eslint-disable-line
    if (typedArray instanceof Uint8Array) return UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArray instanceof Uint8ClampedArray) return UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArray instanceof Int16Array) return SHORT;
     // eslint-disable-line
    if (typedArray instanceof Uint16Array) return UNSIGNED_SHORT;
     // eslint-disable-line
    if (typedArray instanceof Int32Array) return INT;
     // eslint-disable-line
    if (typedArray instanceof Uint32Array) return UNSIGNED_INT;
     // eslint-disable-line
    if (typedArray instanceof Float32Array) return FLOAT;
     // eslint-disable-line
    throw new Error("unsupported typed array type");
}
/**
 * Get the GL type for a typedArray type
 * @param {ArrayBufferView} typedArrayType a typedArray constructor
 * @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */ function getGLTypeForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) return BYTE;
     // eslint-disable-line
    if (typedArrayType === Uint8Array) return UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArrayType === Uint8ClampedArray) return UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArrayType === Int16Array) return SHORT;
     // eslint-disable-line
    if (typedArrayType === Uint16Array) return UNSIGNED_SHORT;
     // eslint-disable-line
    if (typedArrayType === Int32Array) return INT;
     // eslint-disable-line
    if (typedArrayType === Uint32Array) return UNSIGNED_INT;
     // eslint-disable-line
    if (typedArrayType === Float32Array) return FLOAT;
     // eslint-disable-line
    throw new Error("unsupported typed array type");
}
/**
 * Get the typed array constructor for a given GL type
 * @param {number} type the GL type. (eg: `gl.UNSIGNED_INT`)
 * @return {function} the constructor for a the corresponding typed array. (eg. `Uint32Array`).
 * @memberOf module:twgl/typedArray
 */ function getTypedArrayTypeForGLType(type) {
    const CTOR = glTypeToTypedArray[type];
    if (!CTOR) throw new Error("unknown gl type");
    return CTOR;
}
const isArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? function isArrayBufferOrSharedArrayBuffer(a) {
    return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
} : function isArrayBuffer(a) {
    return a && a.buffer && a.buffer instanceof ArrayBuffer;
};
var typedarrays = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getGLTypeForTypedArray: getGLTypeForTypedArray,
    getGLTypeForTypedArrayType: getGLTypeForTypedArrayType,
    getTypedArrayTypeForGLType: getTypedArrayTypeForGLType,
    isArrayBuffer: isArrayBuffer
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /* eslint no-console: "off" */ /**
 * Copy named properties
 *
 * @param {string[]} names names of properties to copy
 * @param {object} src object to copy properties from
 * @param {object} dst object to copy properties to
 * @private
 */ function copyNamedProperties(names, src, dst) {
    names.forEach(function(name) {
        const value = src[name];
        if (value !== undefined) dst[name] = value;
    });
}
/**
 * Copies properties from source to dest only if a matching key is in dest
 *
 * @param {Object.<string, ?>} src the source
 * @param {Object.<string, ?>} dst the dest
 * @private
 */ function copyExistingProperties(src, dst) {
    Object.keys(dst).forEach(function(key) {
        if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) dst[key] = src[key];
    });
}
function error(...args) {
    console.error(...args);
}
function warn(...args) {
    console.warn(...args);
}
function isBuffer(gl, t) {
    return typeof WebGLBuffer !== "undefined" && t instanceof WebGLBuffer;
}
function isRenderbuffer(gl, t) {
    return typeof WebGLRenderbuffer !== "undefined" && t instanceof WebGLRenderbuffer;
}
function isShader(gl, t) {
    return typeof WebGLShader !== "undefined" && t instanceof WebGLShader;
}
function isTexture(gl, t) {
    return typeof WebGLTexture !== "undefined" && t instanceof WebGLTexture;
}
function isSampler(gl, t) {
    return typeof WebGLSampler !== "undefined" && t instanceof WebGLSampler;
}
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const STATIC_DRAW = 0x88e4;
const ARRAY_BUFFER = 0x8892;
const ELEMENT_ARRAY_BUFFER = 0x8893;
const BUFFER_SIZE = 0x8764;
const BYTE$1 = 0x1400;
const UNSIGNED_BYTE$1 = 0x1401;
const SHORT$1 = 0x1402;
const UNSIGNED_SHORT$1 = 0x1403;
const INT$1 = 0x1404;
const UNSIGNED_INT$1 = 0x1405;
const FLOAT$1 = 0x1406;
const defaults = {
    attribPrefix: ""
};
/**
 * Sets the default attrib prefix
 *
 * When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 * as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 * In other words I'll create arrays of geometry like this
 *
 *     var arrays = {
 *       position: ...
 *       normal: ...
 *       texcoord: ...
 *     };
 *
 * But need those mapped to attributes and my attributes start with `a_`.
 *
 * @deprecated see {@link module:twgl.setDefaults}
 * @param {string} prefix prefix for attribs
 * @memberOf module:twgl/attributes
 */ function setAttributePrefix(prefix) {
    defaults.attribPrefix = prefix;
}
function setDefaults(newDefaults) {
    copyExistingProperties(newDefaults, defaults);
}
function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, array, drawType || STATIC_DRAW);
}
/**
 * Given typed array creates a WebGLBuffer and copies the typed array
 * into it.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|WebGLBuffer} typedArray the typed array. Note: If a WebGLBuffer is passed in it will just be returned. No action will be taken
 * @param {number} [type] the GL bind type for the buffer. Default = `gl.ARRAY_BUFFER`.
 * @param {number} [drawType] the GL draw type for the buffer. Default = 'gl.STATIC_DRAW`.
 * @return {WebGLBuffer} the created WebGLBuffer
 * @memberOf module:twgl/attributes
 */ function createBufferFromTypedArray(gl, typedArray, type, drawType) {
    if (isBuffer(gl, typedArray)) return typedArray;
    type = type || ARRAY_BUFFER;
    const buffer = gl.createBuffer();
    setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
    return buffer;
}
function isIndices(name) {
    return name === "indices";
}
// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function getNormalizationForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) return true;
     // eslint-disable-line
    if (typedArray instanceof Uint8Array) return true;
     // eslint-disable-line
    return false;
}
// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function getNormalizationForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) return true;
     // eslint-disable-line
    if (typedArrayType === Uint8Array) return true;
     // eslint-disable-line
    return false;
}
function getArray(array) {
    return array.length ? array : array.data;
}
const texcoordRE = /coord|texture/i;
const colorRE = /color|colour/i;
function guessNumComponentsFromName(name, length1) {
    let numComponents;
    if (texcoordRE.test(name)) numComponents = 2;
    else if (colorRE.test(name)) numComponents = 4;
    else numComponents = 3; // position, normals, indices ...
    if (length1 % numComponents > 0) throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length1} values is not evenly divisible by ${numComponents}. You should specify it.`);
    return numComponents;
}
function getNumComponents(array, arrayName) {
    return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
}
function makeTypedArray(array, name) {
    if (isArrayBuffer(array)) return array;
    if (isArrayBuffer(array.data)) return array.data;
    if (Array.isArray(array)) array = {
        data: array
    };
    let Type = array.type;
    if (!Type) {
        if (isIndices(name)) Type = Uint16Array;
        else Type = Float32Array;
    }
    return new Type(array.data);
}
/**
 * The info for an attribute. This is effectively just the arguments to `gl.vertexAttribPointer` plus the WebGLBuffer
 * for the attribute.
 *
 * @typedef {Object} AttribInfo
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {number} [numComponents] the number of components for this attribute.
 * @property {number} [size] synonym for `numComponents`.
 * @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
 * @property {boolean} [normalize] whether or not to normalize the data. Default = false
 * @property {number} [offset] offset into buffer in bytes. Default = 0
 * @property {number} [stride] the stride in bytes per element. Default = 0
 * @property {number} [divisor] the divisor in instances. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
 *    where as anything else = do call it with this value
 * @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
 * @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
 * @memberOf module:twgl
 */ /**
 * Use this type of array spec when TWGL can't guess the type or number of components of an array
 * @typedef {Object} FullArraySpec
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {(number|number[]|ArrayBufferView)} data The data of the array. A number alone becomes the number of elements of type.
 * @property {number} [numComponents] number of components for `vertexAttribPointer`. Default is based on the name of the array.
 *    If `coord` is in the name assumes `numComponents = 2`.
 *    If `color` is in the name assumes `numComponents = 4`.
 *    otherwise assumes `numComponents = 3`
 * @property {constructor} [type] type. This is only used if `data` is a JavaScript array. It is the constructor for the typedarray. (eg. `Uint8Array`).
 * For example if you want colors in a `Uint8Array` you might have a `FullArraySpec` like `{ type: Uint8Array, data: [255,0,255,255, ...], }`.
 * @property {number} [size] synonym for `numComponents`.
 * @property {boolean} [normalize] normalize for `vertexAttribPointer`. Default is true if type is `Int8Array` or `Uint8Array` otherwise false.
 * @property {number} [stride] stride for `vertexAttribPointer`. Default = 0
 * @property {number} [offset] offset for `vertexAttribPointer`. Default = 0
 * @property {number} [divisor] divisor for `vertexAttribDivisor`. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
 *    where as anything else = do call it with this value
 * @property {string} [attrib] name of attribute this array maps to. Defaults to same name as array prefixed by the default attribPrefix.
 * @property {string} [name] synonym for `attrib`.
 * @property {string} [attribName] synonym for `attrib`.
 * @property {WebGLBuffer} [buffer] Buffer to use for this attribute. This lets you use your own buffer
 *    but you will need to supply `numComponents` and `type`. You can effectively pass an `AttribInfo`
 *    to provide this. Example:
 *
 *         const bufferInfo1 = twgl.createBufferInfoFromArrays(gl, {
 *           position: [1, 2, 3, ... ],
 *         });
 *         const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, {
 *           position: bufferInfo1.attribs.position,  // use the same buffer from bufferInfo1
 *         });
 *
 * @memberOf module:twgl
 */ /**
 * An individual array in {@link module:twgl.Arrays}
 *
 * When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
 * the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
 * be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
 *
 * @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
 * @memberOf module:twgl
 */ /**
 * This is a JavaScript object of arrays by name. The names should match your shader's attributes. If your
 * attributes have a common prefix you can specify it by calling {@link module:twgl.setAttributePrefix}.
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * Objects with various fields. See {@link module:twgl.FullArraySpec}.
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 * @typedef {Object.<string, module:twgl.ArraySpec>} Arrays
 * @memberOf module:twgl
 */ /**
 * Creates a set of attribute data and WebGLBuffers from set of arrays
 *
 * Given
 *
 *      var arrays = {
 *        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
 *        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *      };
 *
 * returns something like
 *
 *      var attribs = {
 *        position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
 *      };
 *
 * notes:
 *
 * *   Arrays can take various forms
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * @param {WebGLRenderingContext} gl The webgl rendering context.
 * @param {module:twgl.Arrays} arrays The arrays
 * @param {module:twgl.BufferInfo} [srcBufferInfo] a BufferInfo to copy from
 *   This lets you share buffers. Any arrays you supply will override
 *   the buffers from srcBufferInfo.
 * @return {Object.<string, module:twgl.AttribInfo>} the attribs
 * @memberOf module:twgl/attributes
 */ function createAttribsFromArrays(gl, arrays) {
    const attribs = {};
    Object.keys(arrays).forEach(function(arrayName) {
        if (!isIndices(arrayName)) {
            const array = arrays[arrayName];
            const attribName = array.attrib || array.name || array.attribName || defaults.attribPrefix + arrayName;
            if (array.value) {
                if (!Array.isArray(array.value) && !isArrayBuffer(array.value)) throw new Error("array.value is not array or typedarray");
                attribs[attribName] = {
                    value: array.value
                };
            } else {
                let buffer;
                let type;
                let normalization;
                let numComponents;
                if (array.buffer && array.buffer instanceof WebGLBuffer) {
                    buffer = array.buffer;
                    numComponents = array.numComponents || array.size;
                    type = array.type;
                    normalization = array.normalize;
                } else if (typeof array === "number" || typeof array.data === "number") {
                    const numValues = array.data || array;
                    const arrayType = array.type || Float32Array;
                    const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
                    type = getGLTypeForTypedArrayType(arrayType);
                    normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArrayType(arrayType);
                    numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
                    buffer = gl.createBuffer();
                    gl.bindBuffer(ARRAY_BUFFER, buffer);
                    gl.bufferData(ARRAY_BUFFER, numBytes, array.drawType || STATIC_DRAW);
                } else {
                    const typedArray = makeTypedArray(array, arrayName);
                    buffer = createBufferFromTypedArray(gl, typedArray, undefined, array.drawType);
                    type = getGLTypeForTypedArray(typedArray);
                    normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArray(typedArray);
                    numComponents = getNumComponents(array, arrayName);
                }
                attribs[attribName] = {
                    buffer: buffer,
                    numComponents: numComponents,
                    type: type,
                    normalize: normalization,
                    stride: array.stride || 0,
                    offset: array.offset || 0,
                    divisor: array.divisor === undefined ? undefined : array.divisor,
                    drawType: array.drawType
                };
            }
        }
    });
    gl.bindBuffer(ARRAY_BUFFER, null);
    return attribs;
}
/**
 * Sets the contents of a buffer attached to an attribInfo
 *
 * This is helper function to dynamically update a buffer.
 *
 * Let's say you make a bufferInfo
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *     var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
 *
 *  And you want to dynamically update the positions. You could do this
 *
 *     // assuming arrays.position has already been updated with new data.
 *     twgl.setAttribInfoBufferFromArray(gl, bufferInfo.attribs.position, arrays.position);
 *
 * @param {WebGLRenderingContext} gl
 * @param {AttribInfo} attribInfo The attribInfo who's buffer contents to set. NOTE: If you have an attribute prefix
 *   the name of the attribute will include the prefix.
 * @param {ArraySpec} array Note: it is arguably inefficient to pass in anything but a typed array because anything
 *    else will have to be converted to a typed array before it can be used by WebGL. During init time that
 *    inefficiency is usually not important but if you're updating data dynamically best to be efficient.
 * @param {number} [offset] an optional offset into the buffer. This is only an offset into the WebGL buffer
 *    not the array. To pass in an offset into the array itself use a typed array and create an `ArrayBufferView`
 *    for the portion of the array you want to use.
 *
 *        var someArray = new Float32Array(1000); // an array with 1000 floats
 *        var someSubArray = new Float32Array(someArray.buffer, offsetInBytes, sizeInUnits); // a view into someArray
 *
 *    Now you can pass `someSubArray` into setAttribInfoBufferFromArray`
 * @memberOf module:twgl/attributes
 */ function setAttribInfoBufferFromArray(gl, attribInfo, array, offset) {
    array = makeTypedArray(array);
    if (offset !== undefined) {
        gl.bindBuffer(ARRAY_BUFFER, attribInfo.buffer);
        gl.bufferSubData(ARRAY_BUFFER, offset, array);
    } else setBufferFromTypedArray(gl, ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
}
function getBytesPerValueForGLType(gl, type) {
    if (type === BYTE$1) return 1; // eslint-disable-line
    if (type === UNSIGNED_BYTE$1) return 1; // eslint-disable-line
    if (type === SHORT$1) return 2; // eslint-disable-line
    if (type === UNSIGNED_SHORT$1) return 2; // eslint-disable-line
    if (type === INT$1) return 4; // eslint-disable-line
    if (type === UNSIGNED_INT$1) return 4; // eslint-disable-line
    if (type === FLOAT$1) return 4; // eslint-disable-line
    return 0;
}
// Tries to get the number of elements from a set of arrays.
const positionKeys = [
    "position",
    "positions",
    "a_position"
];
function getNumElementsFromNonIndexedArrays(arrays) {
    let key;
    let ii;
    for(ii = 0; ii < positionKeys.length; ++ii){
        key = positionKeys[ii];
        if (key in arrays) break;
    }
    if (ii === positionKeys.length) key = Object.keys(arrays)[0];
    const array = arrays[key];
    const length1 = getArray(array).length;
    if (length1 === undefined) return 1; // There's no arrays
    const numComponents = getNumComponents(array, key);
    const numElements = length1 / numComponents;
    if (length1 % numComponents > 0) throw new Error(`numComponents ${numComponents} not correct for length ${length1}`);
    return numElements;
}
function getNumElementsFromAttributes(gl, attribs) {
    let key;
    let ii;
    for(ii = 0; ii < positionKeys.length; ++ii){
        key = positionKeys[ii];
        if (key in attribs) break;
        key = defaults.attribPrefix + key;
        if (key in attribs) break;
    }
    if (ii === positionKeys.length) key = Object.keys(attribs)[0];
    const attrib = attribs[key];
    if (!attrib.buffer) return 1; // There's no buffer
    gl.bindBuffer(ARRAY_BUFFER, attrib.buffer);
    const numBytes = gl.getBufferParameter(ARRAY_BUFFER, BUFFER_SIZE);
    gl.bindBuffer(ARRAY_BUFFER, null);
    const bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
    const totalElements = numBytes / bytesPerValue;
    const numComponents = attrib.numComponents || attrib.size;
    // TODO: check stride
    const numElements = totalElements / numComponents;
    if (numElements % 1 !== 0) throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
    return numElements;
}
/**
 * @typedef {Object} BufferInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
 * @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
 * @memberOf module:twgl
 */ /**
 * Creates a BufferInfo from an object of arrays.
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * Given an object like
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 *  Creates an BufferInfo like this
 *
 *     bufferInfo = {
 *       numElements: 4,        // or whatever the number of elements is
 *       indices: WebGLBuffer,  // this property will not exist if there are no indices
 *       attribs: {
 *         position: { buffer: WebGLBuffer, numComponents: 3, },
 *         normal:   { buffer: WebGLBuffer, numComponents: 3, },
 *         texcoord: { buffer: WebGLBuffer, numComponents: 2, },
 *       },
 *     };
 *
 *  The properties of arrays can be JavaScript arrays in which case the number of components
 *  will be guessed.
 *
 *     var arrays = {
 *        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
 *        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
 *        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
 *        indices:  [0, 1, 2, 1, 2, 3],
 *     };
 *
 *  They can also be TypedArrays
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *
 *  Or AugmentedTypedArrays
 *
 *     var positions = createAugmentedTypedArray(3, 4);
 *     var texcoords = createAugmentedTypedArray(2, 4);
 *     var normals   = createAugmentedTypedArray(3, 4);
 *     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
 *
 *     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
 *     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
 *     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
 *     indices.push([0, 1, 2, 1, 2, 3]);
 *
 *     var arrays = {
 *        position: positions,
 *        texcoord: texcoords,
 *        normal:   normals,
 *        indices:  indices,
 *     };
 *
 * For the last example it is equivalent to
 *
 *     var bufferInfo = {
 *       attribs: {
 *         position: { numComponents: 3, buffer: gl.createBuffer(), },
 *         texcoord: { numComponents: 2, buffer: gl.createBuffer(), },
 *         normal: { numComponents: 3, buffer: gl.createBuffer(), },
 *       },
 *       indices: gl.createBuffer(),
 *       numElements: 6,
 *     };
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.position.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.texcoord.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.normal.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
 *     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.Arrays} arrays Your data
 * @param {module:twgl.BufferInfo} [srcBufferInfo] An existing
 *        buffer info to start from. WebGLBuffers etc specified
 *        in the srcBufferInfo will be used in a new BufferInfo
 *        with any arrays specified overriding the ones in
 *        srcBufferInfo.
 * @return {module:twgl.BufferInfo} A BufferInfo
 * @memberOf module:twgl/attributes
 */ function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
    const newAttribs = createAttribsFromArrays(gl, arrays);
    const bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
    bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
    const indices = arrays.indices;
    if (indices) {
        const newIndices = makeTypedArray(indices, "indices");
        bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, ELEMENT_ARRAY_BUFFER);
        bufferInfo.numElements = newIndices.length;
        bufferInfo.elementType = getGLTypeForTypedArray(newIndices);
    } else if (!bufferInfo.numElements) bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
    return bufferInfo;
}
/**
 * Creates a buffer from an array, typed array, or array spec
 *
 * Given something like this
 *
 *     [1, 2, 3],
 *
 * or
 *
 *     new Uint16Array([1,2,3]);
 *
 * or
 *
 *     {
 *        data: [1, 2, 3],
 *        type: Uint8Array,
 *     }
 *
 * returns a WebGLBuffer that contains the given data.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.ArraySpec} array an array, typed array, or array spec.
 * @param {string} arrayName name of array. Used to guess the type if type can not be derived otherwise.
 * @return {WebGLBuffer} a WebGLBuffer containing the data in array.
 * @memberOf module:twgl/attributes
 */ function createBufferFromArray(gl, array, arrayName) {
    const type = arrayName === "indices" ? ELEMENT_ARRAY_BUFFER : ARRAY_BUFFER;
    const typedArray = makeTypedArray(array, arrayName);
    return createBufferFromTypedArray(gl, typedArray, type);
}
/**
 * Creates buffers from arrays or typed arrays
 *
 * Given something like this
 *
 *     var arrays = {
 *        positions: [1, 2, 3],
 *        normals: [0, 0, 1],
 *     }
 *
 * returns something like
 *
 *     buffers = {
 *       positions: WebGLBuffer,
 *       normals: WebGLBuffer,
 *     }
 *
 * If the buffer is named 'indices' it will be made an ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.Arrays} arrays
 * @return {Object<string, WebGLBuffer>} returns an object with one WebGLBuffer per array
 * @memberOf module:twgl/attributes
 */ function createBuffersFromArrays(gl, arrays) {
    const buffers = {};
    Object.keys(arrays).forEach(function(key) {
        buffers[key] = createBufferFromArray(gl, arrays[key], key);
    });
    // Ugh!
    if (arrays.indices) {
        buffers.numElements = arrays.indices.length;
        buffers.elementType = getGLTypeForTypedArray(makeTypedArray(arrays.indices));
    } else buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
    return buffers;
}
var attributes = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createAttribsFromArrays: createAttribsFromArrays,
    createBuffersFromArrays: createBuffersFromArrays,
    createBufferFromArray: createBufferFromArray,
    createBufferFromTypedArray: createBufferFromTypedArray,
    createBufferInfoFromArrays: createBufferInfoFromArrays,
    setAttribInfoBufferFromArray: setAttribInfoBufferFromArray,
    setAttributePrefix: setAttributePrefix,
    setAttributeDefaults_: setDefaults,
    getNumComponents_: getNumComponents,
    getArray_: getArray
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const getArray$1 = getArray; // eslint-disable-line
const getNumComponents$1 = getNumComponents; // eslint-disable-line
/**
 * @typedef {(Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array)} TypedArray
 */ /**
 * Add `push` to a typed array. It just keeps a 'cursor'
 * and allows use to `push` values into the array so we
 * don't have to manually compute offsets
 * @param {TypedArray} typedArray TypedArray to augment
 * @param {number} numComponents number of components.
 * @private
 */ function augmentTypedArray(typedArray, numComponents) {
    let cursor = 0;
    typedArray.push = function() {
        for(let ii = 0; ii < arguments.length; ++ii){
            const value = arguments[ii];
            if (value instanceof Array || isArrayBuffer(value)) for(let jj = 0; jj < value.length; ++jj)typedArray[cursor++] = value[jj];
            else typedArray[cursor++] = value;
        }
    };
    typedArray.reset = function(opt_index) {
        cursor = opt_index || 0;
    };
    typedArray.numComponents = numComponents;
    Object.defineProperty(typedArray, "numElements", {
        get: function() {
            return this.length / this.numComponents | 0;
        }
    });
    return typedArray;
}
/**
 * creates a typed array with a `push` function attached
 * so that you can easily *push* values.
 *
 * `push` can take multiple arguments. If an argument is an array each element
 * of the array will be added to the typed array.
 *
 * Example:
 *
 *     const array = createAugmentedTypedArray(3, 2);  // creates a Float32Array with 6 values
 *     array.push(1, 2, 3);
 *     array.push([4, 5, 6]);
 *     // array now contains [1, 2, 3, 4, 5, 6]
 *
 * Also has `numComponents` and `numElements` properties.
 *
 * @param {number} numComponents number of components
 * @param {number} numElements number of elements. The total size of the array will be `numComponents * numElements`.
 * @param {constructor} opt_type A constructor for the type. Default = `Float32Array`.
 * @return {ArrayBufferView} A typed array.
 * @memberOf module:twgl/primitives
 */ function createAugmentedTypedArray(numComponents, numElements, opt_type) {
    const Type = opt_type || Float32Array;
    return augmentTypedArray(new Type(numComponents * numElements), numComponents);
}
function allButIndices(name) {
    return name !== "indices";
}
/**
 * Given indexed vertices creates a new set of vertices un-indexed by expanding the indexed vertices.
 * @param {Object.<string, TypedArray>} vertices The indexed vertices to deindex
 * @return {Object.<string, TypedArray>} The deindexed vertices
 * @memberOf module:twgl/primitives
 */ function deindexVertices(vertices) {
    const indices = vertices.indices;
    const newVertices = {};
    const numElements = indices.length;
    function expandToUnindexed(channel) {
        const srcBuffer = vertices[channel];
        const numComponents = srcBuffer.numComponents;
        const dstBuffer = createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
        for(let ii = 0; ii < numElements; ++ii){
            const ndx = indices[ii];
            const offset = ndx * numComponents;
            for(let jj = 0; jj < numComponents; ++jj)dstBuffer.push(srcBuffer[offset + jj]);
        }
        newVertices[channel] = dstBuffer;
    }
    Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);
    return newVertices;
}
/**
 * flattens the normals of deindexed vertices in place.
 * @param {Object.<string, TypedArray>} vertices The deindexed vertices who's normals to flatten
 * @return {Object.<string, TypedArray>} The flattened vertices (same as was passed in)
 * @memberOf module:twgl/primitives
 */ function flattenNormals(vertices) {
    if (vertices.indices) throw new Error("can not flatten normals of indexed vertices. deindex them first");
    const normals = vertices.normal;
    const numNormals = normals.length;
    for(let ii = 0; ii < numNormals; ii += 9){
        // pull out the 3 normals for this triangle
        const nax = normals[ii + 0];
        const nay = normals[ii + 1];
        const naz = normals[ii + 2];
        const nbx = normals[ii + 3];
        const nby = normals[ii + 4];
        const nbz = normals[ii + 5];
        const ncx = normals[ii + 6];
        const ncy = normals[ii + 7];
        const ncz = normals[ii + 8];
        // add them
        let nx = nax + nbx + ncx;
        let ny = nay + nby + ncy;
        let nz = naz + nbz + ncz;
        // normalize them
        const length1 = Math.sqrt(nx * nx + ny * ny + nz * nz);
        nx /= length1;
        ny /= length1;
        nz /= length1;
        // copy them back in
        normals[ii + 0] = nx;
        normals[ii + 1] = ny;
        normals[ii + 2] = nz;
        normals[ii + 3] = nx;
        normals[ii + 4] = ny;
        normals[ii + 5] = nz;
        normals[ii + 6] = nx;
        normals[ii + 7] = ny;
        normals[ii + 8] = nz;
    }
    return vertices;
}
function applyFuncToV3Array(array, matrix, fn) {
    const len = array.length;
    const tmp = new Float32Array(3);
    for(let ii = 0; ii < len; ii += 3){
        fn(matrix, [
            array[ii],
            array[ii + 1],
            array[ii + 2]
        ], tmp);
        array[ii] = tmp[0];
        array[ii + 1] = tmp[1];
        array[ii + 2] = tmp[2];
    }
}
function transformNormal$1(mi, v, dst) {
    dst = dst || create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * mi[0] + v1 * mi[1] + v2 * mi[2];
    dst[1] = v0 * mi[4] + v1 * mi[5] + v2 * mi[6];
    dst[2] = v0 * mi[8] + v1 * mi[9] + v2 * mi[10];
    return dst;
}
/**
 * Reorients directions by the given matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */ function reorientDirections(array, matrix) {
    applyFuncToV3Array(array, matrix, transformDirection);
    return array;
}
/**
 * Reorients normals by the inverse-transpose of the given
 * matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */ function reorientNormals(array, matrix) {
    applyFuncToV3Array(array, inverse(matrix), transformNormal$1);
    return array;
}
/**
 * Reorients positions by the given matrix. In other words, it
 * multiplies each vertex by the given matrix.
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */ function reorientPositions(array, matrix) {
    applyFuncToV3Array(array, matrix, transformPoint);
    return array;
}
/**
 * @typedef {(number[]|TypedArray)} NativeArrayOrTypedArray
 */ /**
 * Reorients arrays by the given matrix. Assumes arrays have
 * names that contains 'pos' could be reoriented as positions,
 * 'binorm' or 'tan' as directions, and 'norm' as normals.
 *
 * @param {Object.<string, NativeArrayOrTypedArray>} arrays The vertices to reorient
 * @param {module:twgl/m4.Mat4} matrix matrix to reorient by.
 * @return {Object.<string, NativeArrayOrTypedArray>} same arrays that were passed in.
 * @memberOf module:twgl/primitives
 */ function reorientVertices(arrays, matrix) {
    Object.keys(arrays).forEach(function(name) {
        const array = arrays[name];
        if (name.indexOf("pos") >= 0) reorientPositions(array, matrix);
        else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) reorientDirections(array, matrix);
        else if (name.indexOf("norm") >= 0) reorientNormals(array, matrix);
    });
    return arrays;
}
/**
 * Creates XY quad BufferInfo
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, WebGLBuffer>} the created XY Quad BufferInfo
 * @memberOf module:twgl/primitives
 * @function createXYQuadBuffers
 */ /**
 * Creates XY quad Buffers
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {module:twgl.BufferInfo} the created XY Quad buffers
 * @memberOf module:twgl/primitives
 * @function createXYQuadBufferInfo
 */ /**
 * Creates XY quad vertices
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0, 0.5);
 *
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, TypedArray>} the created XY Quad vertices
 * @memberOf module:twgl/primitives
 */ function createXYQuadVertices(size, xOffset, yOffset) {
    size = size || 2;
    xOffset = xOffset || 0;
    yOffset = yOffset || 0;
    size *= 0.5;
    return {
        position: {
            numComponents: 2,
            data: [
                xOffset + -1 * size,
                yOffset + -1 * size,
                xOffset + 1 * size,
                yOffset + -1 * size,
                xOffset + -1 * size,
                yOffset + 1 * size,
                xOffset + 1 * size,
                yOffset + 1 * size, 
            ]
        },
        normal: [
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            1, 
        ],
        texcoord: [
            0,
            0,
            1,
            0,
            0,
            1,
            1,
            1, 
        ],
        indices: [
            0,
            1,
            2,
            2,
            1,
            3
        ]
    };
}
/**
 * Creates XZ plane BufferInfo.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {module:twgl.BufferInfo} The created plane BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createPlaneBufferInfo
 */ /**
 * Creates XZ plane buffers.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, WebGLBuffer>} The created plane buffers.
 * @memberOf module:twgl/primitives
 * @function createPlaneBuffers
 */ /**
 * Creates XZ plane vertices.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, TypedArray>} The created plane vertices.
 * @memberOf module:twgl/primitives
 */ function createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
    width = width || 1;
    depth = depth || 1;
    subdivisionsWidth = subdivisionsWidth || 1;
    subdivisionsDepth = subdivisionsDepth || 1;
    matrix = matrix || identity();
    const numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    for(let z = 0; z <= subdivisionsDepth; z++)for(let x = 0; x <= subdivisionsWidth; x++){
        const u = x / subdivisionsWidth;
        const v = z / subdivisionsDepth;
        positions.push(width * u - width * 0.5, 0, depth * v - depth * 0.5);
        normals.push(0, 1, 0);
        texcoords.push(u, v);
    }
    const numVertsAcross = subdivisionsWidth + 1;
    const indices = createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
    for(let z1 = 0; z1 < subdivisionsDepth; z1++)for(let x1 = 0; x1 < subdivisionsWidth; x1++){
        // Make triangle 1 of quad.
        indices.push((z1 + 0) * numVertsAcross + x1, (z1 + 1) * numVertsAcross + x1, (z1 + 0) * numVertsAcross + x1 + 1);
        // Make triangle 2 of quad.
        indices.push((z1 + 1) * numVertsAcross + x1, (z1 + 1) * numVertsAcross + x1 + 1, (z1 + 0) * numVertsAcross + x1 + 1);
    }
    const arrays = reorientVertices({
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    }, matrix);
    return arrays;
}
/**
 * Creates sphere BufferInfo.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {module:twgl.BufferInfo} The created sphere BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createSphereBufferInfo
 */ /**
 * Creates sphere buffers.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, WebGLBuffer>} The created sphere buffers.
 * @memberOf module:twgl/primitives
 * @function createSphereBuffers
 */ /**
 * Creates sphere vertices.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, TypedArray>} The created sphere vertices.
 * @memberOf module:twgl/primitives
 */ function createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
    if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
    opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
    opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
    opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
    opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
    const latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
    const longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
    // We are going to generate our sphere by iterating through its
    // spherical coordinates and generating 2 triangles for each quad on a
    // ring of the sphere.
    const numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    // Generate the individual vertices in our vertex buffer.
    for(let y = 0; y <= subdivisionsHeight; y++)for(let x = 0; x <= subdivisionsAxis; x++){
        // Generate a vertex based on its spherical coordinates
        const u = x / subdivisionsAxis;
        const v = y / subdivisionsHeight;
        const theta = longRange * u + opt_startLongitudeInRadians;
        const phi = latRange * v + opt_startLatitudeInRadians;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        const ux = cosTheta * sinPhi;
        const uy = cosPhi;
        const uz = sinTheta * sinPhi;
        positions.push(radius * ux, radius * uy, radius * uz);
        normals.push(ux, uy, uz);
        texcoords.push(1 - u, v);
    }
    const numVertsAround = subdivisionsAxis + 1;
    const indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
    for(let x1 = 0; x1 < subdivisionsAxis; x1++)for(let y1 = 0; y1 < subdivisionsHeight; y1++){
        // Make triangle 1 of quad.
        indices.push((y1 + 0) * numVertsAround + x1, (y1 + 0) * numVertsAround + x1 + 1, (y1 + 1) * numVertsAround + x1);
        // Make triangle 2 of quad.
        indices.push((y1 + 1) * numVertsAround + x1, (y1 + 0) * numVertsAround + x1 + 1, (y1 + 1) * numVertsAround + x1 + 1);
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Array of the indices of corners of each face of a cube.
 * @type {Array.<number[]>}
 * @private
 */ const CUBE_FACE_INDICES = [
    [
        3,
        7,
        5,
        1
    ],
    [
        6,
        2,
        0,
        4
    ],
    [
        6,
        7,
        3,
        2
    ],
    [
        0,
        1,
        5,
        4
    ],
    [
        7,
        6,
        4,
        5
    ],
    [
        2,
        3,
        1,
        0
    ]
];
/**
 * Creates a BufferInfo for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCubeBufferInfo
 */ /**
 * Creates the buffers and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCubeBuffers
 */ /**
 * Creates the vertices and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function createCubeVertices(size) {
    size = size || 1;
    const k = size / 2;
    const cornerVertices = [
        [
            -k,
            -k,
            -k
        ],
        [
            +k,
            -k,
            -k
        ],
        [
            -k,
            +k,
            -k
        ],
        [
            +k,
            +k,
            -k
        ],
        [
            -k,
            -k,
            +k
        ],
        [
            +k,
            -k,
            +k
        ],
        [
            -k,
            +k,
            +k
        ],
        [
            +k,
            +k,
            +k
        ], 
    ];
    const faceNormals = [
        [
            1,
            0,
            0
        ],
        [
            -1,
            0,
            0
        ],
        [
            0,
            1,
            0
        ],
        [
            0,
            -1,
            0
        ],
        [
            0,
            0,
            1
        ],
        [
            0,
            0,
            -1
        ], 
    ];
    const uvCoords = [
        [
            1,
            0
        ],
        [
            0,
            0
        ],
        [
            0,
            1
        ],
        [
            1,
            1
        ], 
    ];
    const numVertices = 24;
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    const indices = createAugmentedTypedArray(3, 12, Uint16Array);
    for(let f = 0; f < 6; ++f){
        const faceIndices = CUBE_FACE_INDICES[f];
        for(let v = 0; v < 4; ++v){
            const position = cornerVertices[faceIndices[v]];
            const normal = faceNormals[f];
            const uv = uvCoords[v];
            // Each face needs all four vertices because the normals and texture
            // coordinates are not all the same.
            positions.push(position);
            normals.push(normal);
            texcoords.push(uv);
        }
        // Two triangles make a square face.
        const offset = 4 * f;
        indices.push(offset + 0, offset + 1, offset + 2);
        indices.push(offset + 0, offset + 2, offset + 3);
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Creates a BufferInfo for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created cone BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBufferInfo
 */ /**
 * Creates buffers for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, WebGLBuffer>} The created cone buffers.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBuffers
 */ /**
 * Creates vertices for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis. .
 *
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, TypedArray>} The created cone vertices.
 * @memberOf module:twgl/primitives
 */ function createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
    if (radialSubdivisions < 3) throw new Error("radialSubdivisions must be 3 or greater");
    if (verticalSubdivisions < 1) throw new Error("verticalSubdivisions must be 1 or greater");
    const topCap = opt_topCap === undefined ? true : opt_topCap;
    const bottomCap = opt_bottomCap === undefined ? true : opt_bottomCap;
    const extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
    const numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    const indices = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);
    const vertsAroundEdge = radialSubdivisions + 1;
    // The slant of the cone is constant across its surface
    const slant = Math.atan2(bottomRadius - topRadius, height);
    const cosSlant = Math.cos(slant);
    const sinSlant = Math.sin(slant);
    const start = topCap ? -2 : 0;
    const end = verticalSubdivisions + (bottomCap ? 2 : 0);
    for(let yy = start; yy <= end; ++yy){
        let v = yy / verticalSubdivisions;
        let y = height * v;
        let ringRadius;
        if (yy < 0) {
            y = 0;
            v = 1;
            ringRadius = bottomRadius;
        } else if (yy > verticalSubdivisions) {
            y = height;
            v = 1;
            ringRadius = topRadius;
        } else ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
        if (yy === -2 || yy === verticalSubdivisions + 2) {
            ringRadius = 0;
            v = 0;
        }
        y -= height / 2;
        for(let ii = 0; ii < vertsAroundEdge; ++ii){
            const sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
            const cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
            positions.push(sin * ringRadius, y, cos * ringRadius);
            if (yy < 0) normals.push(0, -1, 0);
            else if (yy > verticalSubdivisions) normals.push(0, 1, 0);
            else if (ringRadius === 0.0) normals.push(0, 0, 0);
            else normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
            texcoords.push(ii / radialSubdivisions, 1 - v);
        }
    }
    for(let yy1 = 0; yy1 < verticalSubdivisions + extra; ++yy1){
        if (yy1 === 1 && topCap || yy1 === verticalSubdivisions + extra - 2 && bottomCap) continue;
        for(let ii1 = 0; ii1 < radialSubdivisions; ++ii1){
            indices.push(vertsAroundEdge * (yy1 + 0) + 0 + ii1, vertsAroundEdge * (yy1 + 0) + 1 + ii1, vertsAroundEdge * (yy1 + 1) + 1 + ii1);
            indices.push(vertsAroundEdge * (yy1 + 0) + 0 + ii1, vertsAroundEdge * (yy1 + 1) + 1 + ii1, vertsAroundEdge * (yy1 + 1) + 0 + ii1);
        }
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Expands RLE data
 * @param {number[]} rleData data in format of run-length, x, y, z, run-length, x, y, z
 * @param {number[]} [padding] value to add each entry with.
 * @return {number[]} the expanded rleData
 * @private
 */ function expandRLEData(rleData, padding) {
    padding = padding || [];
    const data = [];
    for(let ii = 0; ii < rleData.length; ii += 4){
        const runLength = rleData[ii];
        const element = rleData.slice(ii + 1, ii + 4);
        element.push.apply(element, padding);
        for(let jj = 0; jj < runLength; ++jj)data.push.apply(data, element);
    }
    return data;
}
/**
 * Creates 3D 'F' BufferInfo.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function create3DFBufferInfo
 */ /**
 * Creates 3D 'F' buffers.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function create3DFBuffers
 */ /**
 * Creates 3D 'F' vertices.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color arrays.
 *
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function create3DFVertices() {
    const positions = [
        // left column front
        0,
        0,
        0,
        0,
        150,
        0,
        30,
        0,
        0,
        0,
        150,
        0,
        30,
        150,
        0,
        30,
        0,
        0,
        // top rung front
        30,
        0,
        0,
        30,
        30,
        0,
        100,
        0,
        0,
        30,
        30,
        0,
        100,
        30,
        0,
        100,
        0,
        0,
        // middle rung front
        30,
        60,
        0,
        30,
        90,
        0,
        67,
        60,
        0,
        30,
        90,
        0,
        67,
        90,
        0,
        67,
        60,
        0,
        // left column back
        0,
        0,
        30,
        30,
        0,
        30,
        0,
        150,
        30,
        0,
        150,
        30,
        30,
        0,
        30,
        30,
        150,
        30,
        // top rung back
        30,
        0,
        30,
        100,
        0,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        100,
        0,
        30,
        100,
        30,
        30,
        // middle rung back
        30,
        60,
        30,
        67,
        60,
        30,
        30,
        90,
        30,
        30,
        90,
        30,
        67,
        60,
        30,
        67,
        90,
        30,
        // top
        0,
        0,
        0,
        100,
        0,
        0,
        100,
        0,
        30,
        0,
        0,
        0,
        100,
        0,
        30,
        0,
        0,
        30,
        // top rung front
        100,
        0,
        0,
        100,
        30,
        0,
        100,
        30,
        30,
        100,
        0,
        0,
        100,
        30,
        30,
        100,
        0,
        30,
        // under top rung
        30,
        30,
        0,
        30,
        30,
        30,
        100,
        30,
        30,
        30,
        30,
        0,
        100,
        30,
        30,
        100,
        30,
        0,
        // between top rung and middle
        30,
        30,
        0,
        30,
        60,
        30,
        30,
        30,
        30,
        30,
        30,
        0,
        30,
        60,
        0,
        30,
        60,
        30,
        // top of middle rung
        30,
        60,
        0,
        67,
        60,
        30,
        30,
        60,
        30,
        30,
        60,
        0,
        67,
        60,
        0,
        67,
        60,
        30,
        // front of middle rung
        67,
        60,
        0,
        67,
        90,
        30,
        67,
        60,
        30,
        67,
        60,
        0,
        67,
        90,
        0,
        67,
        90,
        30,
        // bottom of middle rung.
        30,
        90,
        0,
        30,
        90,
        30,
        67,
        90,
        30,
        30,
        90,
        0,
        67,
        90,
        30,
        67,
        90,
        0,
        // front of bottom
        30,
        90,
        0,
        30,
        150,
        30,
        30,
        90,
        30,
        30,
        90,
        0,
        30,
        150,
        0,
        30,
        150,
        30,
        // bottom
        0,
        150,
        0,
        0,
        150,
        30,
        30,
        150,
        30,
        0,
        150,
        0,
        30,
        150,
        30,
        30,
        150,
        0,
        // left side
        0,
        0,
        0,
        0,
        0,
        30,
        0,
        150,
        30,
        0,
        0,
        0,
        0,
        150,
        30,
        0,
        150,
        0, 
    ];
    const texcoords = [
        // left column front
        0.22,
        0.19,
        0.22,
        0.79,
        0.34,
        0.19,
        0.22,
        0.79,
        0.34,
        0.79,
        0.34,
        0.19,
        // top rung front
        0.34,
        0.19,
        0.34,
        0.31,
        0.62,
        0.19,
        0.34,
        0.31,
        0.62,
        0.31,
        0.62,
        0.19,
        // middle rung front
        0.34,
        0.43,
        0.34,
        0.55,
        0.49,
        0.43,
        0.34,
        0.55,
        0.49,
        0.55,
        0.49,
        0.43,
        // left column back
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        // top rung back
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        // middle rung back
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        // top
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        // top rung front
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        // under top rung
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        // between top rung and middle
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // top of middle rung
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // front of middle rung
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // bottom of middle rung.
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        // front of bottom
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // bottom
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        // left side
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0, 
    ];
    const normals = expandRLEData([
        // left column front
        // top rung front
        // middle rung front
        18,
        0,
        0,
        1,
        // left column back
        // top rung back
        // middle rung back
        18,
        0,
        0,
        -1,
        // top
        6,
        0,
        1,
        0,
        // top rung front
        6,
        1,
        0,
        0,
        // under top rung
        6,
        0,
        -1,
        0,
        // between top rung and middle
        6,
        1,
        0,
        0,
        // top of middle rung
        6,
        0,
        1,
        0,
        // front of middle rung
        6,
        1,
        0,
        0,
        // bottom of middle rung.
        6,
        0,
        -1,
        0,
        // front of bottom
        6,
        1,
        0,
        0,
        // bottom
        6,
        0,
        -1,
        0,
        // left side
        6,
        -1,
        0,
        0, 
    ]);
    const colors = expandRLEData([
        // left column front
        // top rung front
        // middle rung front
        18,
        200,
        70,
        120,
        // left column back
        // top rung back
        // middle rung back
        18,
        80,
        70,
        200,
        // top
        6,
        70,
        200,
        210,
        // top rung front
        6,
        200,
        200,
        70,
        // under top rung
        6,
        210,
        100,
        70,
        // between top rung and middle
        6,
        210,
        160,
        70,
        // top of middle rung
        6,
        70,
        180,
        210,
        // front of middle rung
        6,
        100,
        70,
        210,
        // bottom of middle rung.
        6,
        76,
        210,
        100,
        // front of bottom
        6,
        140,
        210,
        80,
        // bottom
        6,
        90,
        130,
        110,
        // left side
        6,
        160,
        160,
        220, 
    ], [
        255
    ]);
    const numVerts = positions.length / 3;
    const arrays = {
        position: createAugmentedTypedArray(3, numVerts),
        texcoord: createAugmentedTypedArray(2, numVerts),
        normal: createAugmentedTypedArray(3, numVerts),
        color: createAugmentedTypedArray(4, numVerts, Uint8Array),
        indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
    };
    arrays.position.push(positions);
    arrays.texcoord.push(texcoords);
    arrays.normal.push(normals);
    arrays.color.push(colors);
    for(let ii = 0; ii < numVerts; ++ii)arrays.indices.push(ii);
    return arrays;
}
/**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCresentBufferInfo
 */ /**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */ /**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */ /**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCrescentBufferInfo
 */ /**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCrescentBuffers
 */ /**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function createCrescentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
    if (subdivisionsDown <= 0) throw new Error("subdivisionDown must be > 0");
    startOffset = startOffset || 0;
    endOffset = endOffset || 1;
    const subdivisionsThick = 2;
    const offsetRange = endOffset - startOffset;
    const numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    function lerp(a, b, s) {
        return a + (b - a) * s;
    }
    function createArc(arcRadius, x, normalMult, normalAdd, uMult, uAdd) {
        for(let z = 0; z <= subdivisionsDown; z++){
            const uBack = x / (subdivisionsThick - 1);
            const v = z / subdivisionsDown;
            const xBack = (uBack - 0.5) * 2;
            const angle = (startOffset + v * offsetRange) * Math.PI;
            const s = Math.sin(angle);
            const c = Math.cos(angle);
            const radius = lerp(verticalRadius, arcRadius, s);
            const px = xBack * thickness;
            const py = c * verticalRadius;
            const pz = s * radius;
            positions.push(px, py, pz);
            const n = add(multiply([
                0,
                s,
                c
            ], normalMult), normalAdd);
            normals.push(n);
            texcoords.push(uBack * uMult + uAdd, v);
        }
    }
    // Generate the individual vertices in our vertex buffer.
    for(let x = 0; x < subdivisionsThick; x++){
        const uBack = (x / (subdivisionsThick - 1) - 0.5) * 2;
        createArc(outerRadius, x, [
            1,
            1,
            1
        ], [
            0,
            0,
            0
        ], 1, 0);
        createArc(outerRadius, x, [
            0,
            0,
            0
        ], [
            uBack,
            0,
            0
        ], 0, 0);
        createArc(innerRadius, x, [
            1,
            1,
            1
        ], [
            0,
            0,
            0
        ], 1, 0);
        createArc(innerRadius, x, [
            0,
            0,
            0
        ], [
            uBack,
            0,
            0
        ], 0, 1);
    }
    // Do outer surface.
    const indices = createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
    function createSurface(leftArcOffset, rightArcOffset) {
        for(let z = 0; z < subdivisionsDown; ++z){
            // Make triangle 1 of quad.
            indices.push(leftArcOffset + z + 0, leftArcOffset + z + 1, rightArcOffset + z + 0);
            // Make triangle 2 of quad.
            indices.push(leftArcOffset + z + 1, rightArcOffset + z + 1, rightArcOffset + z + 0);
        }
    }
    const numVerticesDown = subdivisionsDown + 1;
    // front
    createSurface(numVerticesDown * 0, numVerticesDown * 4);
    // right
    createSurface(numVerticesDown * 5, numVerticesDown * 7);
    // back
    createSurface(numVerticesDown * 6, numVerticesDown * 2);
    // left
    createSurface(numVerticesDown * 3, numVerticesDown * 1);
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Creates cylinder BufferInfo. The cylinder will be created around the origin
 * along the y-axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of cylinder.
 * @param {number} height Height of cylinder.
 * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
 * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
 * @param {boolean} [topCap] Create top cap. Default = true.
 * @param {boolean} [bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCylinderBufferInfo
 */ /**
  * Creates cylinder buffers. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, WebGLBuffer>} The created buffers.
  * @memberOf module:twgl/primitives
  * @function createCylinderBuffers
  */ /**
  * Creates cylinder vertices. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, TypedArray>} The created vertices.
  * @memberOf module:twgl/primitives
  */ function createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
    return createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
}
/**
 * Creates BufferInfo for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTorusBufferInfo
 */ /**
 * Creates buffers for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createTorusBuffers
 */ /**
 * Creates vertices for a torus
 *
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
    if (radialSubdivisions < 3) throw new Error("radialSubdivisions must be 3 or greater");
    if (bodySubdivisions < 3) throw new Error("verticalSubdivisions must be 3 or greater");
    startAngle = startAngle || 0;
    endAngle = endAngle || Math.PI * 2;
    const range = endAngle - startAngle;
    const radialParts = radialSubdivisions + 1;
    const bodyParts = bodySubdivisions + 1;
    const numVertices = radialParts * bodyParts;
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    const indices = createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
    for(let slice = 0; slice < bodyParts; ++slice){
        const v = slice / bodySubdivisions;
        const sliceAngle = v * Math.PI * 2;
        const sliceSin = Math.sin(sliceAngle);
        const ringRadius = radius + sliceSin * thickness;
        const ny = Math.cos(sliceAngle);
        const y = ny * thickness;
        for(let ring = 0; ring < radialParts; ++ring){
            const u = ring / radialSubdivisions;
            const ringAngle = startAngle + u * range;
            const xSin = Math.sin(ringAngle);
            const zCos = Math.cos(ringAngle);
            const x = xSin * ringRadius;
            const z = zCos * ringRadius;
            const nx = xSin * sliceSin;
            const nz = zCos * sliceSin;
            positions.push(x, y, z);
            normals.push(nx, ny, nz);
            texcoords.push(u, 1 - v);
        }
    }
    for(let slice1 = 0; slice1 < bodySubdivisions; ++slice1)for(let ring1 = 0; ring1 < radialSubdivisions; ++ring1){
        const nextRingIndex = 1 + ring1;
        const nextSliceIndex = 1 + slice1;
        indices.push(radialParts * slice1 + ring1, radialParts * nextSliceIndex + ring1, radialParts * slice1 + nextRingIndex);
        indices.push(radialParts * nextSliceIndex + ring1, radialParts * nextSliceIndex + nextRingIndex, radialParts * slice1 + nextRingIndex);
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Creates a disc BufferInfo. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createDiscBufferInfo
 */ /**
 * Creates disc buffers. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createDiscBuffers
 */ /**
 * Creates disc vertices. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
    if (divisions < 3) throw new Error("divisions must be at least 3");
    stacks = stacks ? stacks : 1;
    stackPower = stackPower ? stackPower : 1;
    innerRadius = innerRadius ? innerRadius : 0;
    // Note: We don't share the center vertex because that would
    // mess up texture coordinates.
    const numVertices = (divisions + 1) * (stacks + 1);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    const indices = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
    let firstIndex = 0;
    const radiusSpan = radius - innerRadius;
    const pointsPerStack = divisions + 1;
    // Build the disk one stack at a time.
    for(let stack = 0; stack <= stacks; ++stack){
        const stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
        for(let i = 0; i <= divisions; ++i){
            const theta = 2.0 * Math.PI * i / divisions;
            const x = stackRadius * Math.cos(theta);
            const z = stackRadius * Math.sin(theta);
            positions.push(x, 0, z);
            normals.push(0, 1, 0);
            texcoords.push(1 - i / divisions, stack / stacks);
            if (stack > 0 && i !== divisions) {
                // a, b, c and d are the indices of the vertices of a quad.  unless
                // the current stack is the one closest to the center, in which case
                // the vertices a and b connect to the center vertex.
                const a = firstIndex + (i + 1);
                const b = firstIndex + i;
                const c = firstIndex + i - pointsPerStack;
                const d = firstIndex + (i + 1) - pointsPerStack;
                // Make a quad of the vertices a, b, c, d.
                indices.push(a, b, c);
                indices.push(a, c, d);
            }
        }
        firstIndex += divisions + 1;
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * creates a random integer between 0 and range - 1 inclusive.
 * @param {number} range
 * @return {number} random value between 0 and range - 1 inclusive.
 * @private
 */ function randInt(range) {
    return Math.random() * range | 0;
}
/**
 * Used to supply random colors
 * @callback RandomColorFunc
 * @param {number} ndx index of triangle/quad if unindexed or index of vertex if indexed
 * @param {number} channel 0 = red, 1 = green, 2 = blue, 3 = alpha
 * @return {number} a number from 0 to 255
 * @memberOf module:twgl/primitives
 */ /**
 * @typedef {Object} RandomVerticesOptions
 * @property {number} [vertsPerColor] Defaults to 3 for non-indexed vertices
 * @property {module:twgl/primitives.RandomColorFunc} [rand] A function to generate random numbers
 * @memberOf module:twgl/primitives
 */ /**
 * Creates an augmentedTypedArray of random vertex colors.
 * If the vertices are indexed (have an indices array) then will
 * just make random colors. Otherwise assumes they are triangles
 * and makes one random color for every 3 vertices.
 * @param {Object.<string, AugmentedTypedArray>} vertices Vertices as returned from one of the createXXXVertices functions.
 * @param {module:twgl/primitives.RandomVerticesOptions} [options] options.
 * @return {Object.<string, AugmentedTypedArray>} same vertices as passed in with `color` added.
 * @memberOf module:twgl/primitives
 */ function makeRandomVertexColors(vertices, options) {
    options = options || {};
    const numElements = vertices.position.numElements;
    const vColors = createAugmentedTypedArray(4, numElements, Uint8Array);
    const rand = options.rand || function(ndx, channel) {
        return channel < 3 ? randInt(256) : 255;
    };
    vertices.color = vColors;
    if (vertices.indices) // just make random colors if index
    for(let ii = 0; ii < numElements; ++ii)vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
    else {
        // make random colors per triangle
        const numVertsPerColor = options.vertsPerColor || 3;
        const numSets = numElements / numVertsPerColor;
        for(let ii1 = 0; ii1 < numSets; ++ii1){
            const color = [
                rand(ii1, 0),
                rand(ii1, 1),
                rand(ii1, 2),
                rand(ii1, 3)
            ];
            for(let jj = 0; jj < numVertsPerColor; ++jj)vColors.push(color);
        }
    }
    return vertices;
}
/**
 * creates a function that calls fn to create vertices and then
 * creates a buffers for them
 * @private
 */ function createBufferFunc(fn) {
    return function(gl) {
        const arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
        return createBuffersFromArrays(gl, arrays);
    };
}
/**
 * creates a function that calls fn to create vertices and then
 * creates a bufferInfo object for them
 * @private
 */ function createBufferInfoFunc(fn) {
    return function(gl) {
        const arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
        return createBufferInfoFromArrays(gl, arrays);
    };
}
const arraySpecPropertyNames = [
    "numComponents",
    "size",
    "type",
    "normalize",
    "stride",
    "offset",
    "attrib",
    "name",
    "attribName", 
];
/**
 * Copy elements from one array to another
 *
 * @param {Array|TypedArray} src source array
 * @param {Array|TypedArray} dst dest array
 * @param {number} dstNdx index in dest to copy src
 * @param {number} [offset] offset to add to copied values
 * @private
 */ function copyElements(src, dst, dstNdx, offset) {
    offset = offset || 0;
    const length1 = src.length;
    for(let ii = 0; ii < length1; ++ii)dst[dstNdx + ii] = src[ii] + offset;
}
/**
 * Creates an array of the same time
 *
 * @param {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} srcArray array who's type to copy
 * @param {number} length size of new array
 * @return {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} array with same type as srcArray
 * @private
 */ function createArrayOfSameType(srcArray, length1) {
    const arraySrc = getArray$1(srcArray);
    const newArray = new arraySrc.constructor(length1);
    let newArraySpec = newArray;
    // If it appears to have been augmented make new one augmented
    if (arraySrc.numComponents && arraySrc.numElements) augmentTypedArray(newArray, arraySrc.numComponents);
    // If it was a full spec make new one a full spec
    if (srcArray.data) {
        newArraySpec = {
            data: newArray
        };
        copyNamedProperties(arraySpecPropertyNames, srcArray, newArraySpec);
    }
    return newArraySpec;
}
/**
 * Concatenates sets of vertices
 *
 * Assumes the vertices match in composition. For example
 * if one set of vertices has positions, normals, and indices
 * all sets of vertices must have positions, normals, and indices
 * and of the same type.
 *
 * Example:
 *
 *      const cubeVertices = twgl.primitives.createCubeVertices(2);
 *      const sphereVertices = twgl.primitives.createSphereVertices(1, 10, 10);
 *      // move the sphere 2 units up
 *      twgl.primitives.reorientVertices(
 *          sphereVertices, twgl.m4.translation([0, 2, 0]));
 *      // merge the sphere with the cube
 *      const cubeSphereVertices = twgl.primitives.concatVertices(
 *          [cubeVertices, sphereVertices]);
 *      // turn them into WebGL buffers and attrib data
 *      const bufferInfo = twgl.createBufferInfoFromArrays(gl, cubeSphereVertices);
 *
 * @param {module:twgl.Arrays[]} arrays Array of arrays of vertices
 * @return {module:twgl.Arrays} The concatenated vertices.
 * @memberOf module:twgl/primitives
 */ function concatVertices(arrayOfArrays) {
    const names = {};
    let baseName;
    // get names of all arrays.
    // and numElements for each set of vertices
    for(let ii = 0; ii < arrayOfArrays.length; ++ii){
        const arrays = arrayOfArrays[ii];
        Object.keys(arrays).forEach(function(name) {
            if (!names[name]) names[name] = [];
            if (!baseName && name !== "indices") baseName = name;
            const arrayInfo = arrays[name];
            const numComponents = getNumComponents$1(arrayInfo, name);
            const array = getArray$1(arrayInfo);
            const numElements = array.length / numComponents;
            names[name].push(numElements);
        });
    }
    // compute length of combined array
    // and return one for reference
    function getLengthOfCombinedArrays(name) {
        let length1 = 0;
        let arraySpec;
        for(let ii = 0; ii < arrayOfArrays.length; ++ii){
            const arrays = arrayOfArrays[ii];
            const arrayInfo = arrays[name];
            const array = getArray$1(arrayInfo);
            length1 += array.length;
            if (!arraySpec || arrayInfo.data) arraySpec = arrayInfo;
        }
        return {
            length: length1,
            spec: arraySpec
        };
    }
    function copyArraysToNewArray(name, base, newArray) {
        let baseIndex = 0;
        let offset = 0;
        for(let ii = 0; ii < arrayOfArrays.length; ++ii){
            const arrays = arrayOfArrays[ii];
            const arrayInfo = arrays[name];
            const array = getArray$1(arrayInfo);
            if (name === "indices") {
                copyElements(array, newArray, offset, baseIndex);
                baseIndex += base[ii];
            } else copyElements(array, newArray, offset);
            offset += array.length;
        }
    }
    const base = names[baseName];
    const newArrays = {};
    Object.keys(names).forEach(function(name) {
        const info = getLengthOfCombinedArrays(name);
        const newArraySpec = createArrayOfSameType(info.spec, info.length);
        copyArraysToNewArray(name, base, getArray$1(newArraySpec));
        newArrays[name] = newArraySpec;
    });
    return newArrays;
}
/**
 * Creates a duplicate set of vertices
 *
 * This is useful for calling reorientVertices when you
 * also want to keep the original available
 *
 * @param {module:twgl.Arrays} arrays of vertices
 * @return {module:twgl.Arrays} The duplicated vertices.
 * @memberOf module:twgl/primitives
 */ function duplicateVertices(arrays) {
    const newArrays = {};
    Object.keys(arrays).forEach(function(name) {
        const arraySpec = arrays[name];
        const srcArray = getArray$1(arraySpec);
        const newArraySpec = createArrayOfSameType(arraySpec, srcArray.length);
        copyElements(srcArray, getArray$1(newArraySpec), 0);
        newArrays[name] = newArraySpec;
    });
    return newArrays;
}
const create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
const create3DFBuffers = createBufferFunc(create3DFVertices);
const createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
const createCubeBuffers = createBufferFunc(createCubeVertices);
const createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
const createPlaneBuffers = createBufferFunc(createPlaneVertices);
const createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
const createSphereBuffers = createBufferFunc(createSphereVertices);
const createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
const createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
const createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
const createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
const createCrescentBufferInfo = createBufferInfoFunc(createCrescentVertices);
const createCrescentBuffers = createBufferFunc(createCrescentVertices);
const createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
const createCylinderBuffers = createBufferFunc(createCylinderVertices);
const createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
const createTorusBuffers = createBufferFunc(createTorusVertices);
const createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
const createDiscBuffers = createBufferFunc(createDiscVertices);
// these were mis-spelled until 4.12
const createCresentBufferInfo = createCrescentBufferInfo;
const createCresentBuffers = createCrescentBuffers;
const createCresentVertices = createCrescentVertices;
var primitives = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create3DFBufferInfo: create3DFBufferInfo,
    create3DFBuffers: create3DFBuffers,
    create3DFVertices: create3DFVertices,
    createAugmentedTypedArray: createAugmentedTypedArray,
    createCubeBufferInfo: createCubeBufferInfo,
    createCubeBuffers: createCubeBuffers,
    createCubeVertices: createCubeVertices,
    createPlaneBufferInfo: createPlaneBufferInfo,
    createPlaneBuffers: createPlaneBuffers,
    createPlaneVertices: createPlaneVertices,
    createSphereBufferInfo: createSphereBufferInfo,
    createSphereBuffers: createSphereBuffers,
    createSphereVertices: createSphereVertices,
    createTruncatedConeBufferInfo: createTruncatedConeBufferInfo,
    createTruncatedConeBuffers: createTruncatedConeBuffers,
    createTruncatedConeVertices: createTruncatedConeVertices,
    createXYQuadBufferInfo: createXYQuadBufferInfo,
    createXYQuadBuffers: createXYQuadBuffers,
    createXYQuadVertices: createXYQuadVertices,
    createCresentBufferInfo: createCresentBufferInfo,
    createCresentBuffers: createCresentBuffers,
    createCresentVertices: createCresentVertices,
    createCrescentBufferInfo: createCrescentBufferInfo,
    createCrescentBuffers: createCrescentBuffers,
    createCrescentVertices: createCrescentVertices,
    createCylinderBufferInfo: createCylinderBufferInfo,
    createCylinderBuffers: createCylinderBuffers,
    createCylinderVertices: createCylinderVertices,
    createTorusBufferInfo: createTorusBufferInfo,
    createTorusBuffers: createTorusBuffers,
    createTorusVertices: createTorusVertices,
    createDiscBufferInfo: createDiscBufferInfo,
    createDiscBuffers: createDiscBuffers,
    createDiscVertices: createDiscVertices,
    deindexVertices: deindexVertices,
    flattenNormals: flattenNormals,
    makeRandomVertexColors: makeRandomVertexColors,
    reorientDirections: reorientDirections,
    reorientNormals: reorientNormals,
    reorientPositions: reorientPositions,
    reorientVertices: reorientVertices,
    concatVertices: concatVertices,
    duplicateVertices: duplicateVertices
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * Gets the gl version as a number
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {number} version of gl
 * @private
 */ //function getVersionAsNumber(gl) {
//  return parseFloat(gl.getParameter(gl.VERSION).substr(6));
//}
/**
 * Check if context is WebGL 2.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 2.0
 * @memberOf module:twgl
 */ function isWebGL2(gl) {
    // This is the correct check but it's slow
    //  return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
    // This might also be the correct check but I'm assuming it's slow-ish
    // return gl instanceof WebGL2RenderingContext;
    return !!gl.texStorage2D;
}
/**
 * Check if context is WebGL 1.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 1.0
 * @memberOf module:twgl
 */ function isWebGL1(gl) {
    // This is the correct check but it's slow
    // const version = getVersionAsNumber(gl);
    // return version <= 1.0 && version > 0.0;  // because as of 2016/5 Edge returns 0.96
    // This might also be the correct check but I'm assuming it's slow-ish
    // return gl instanceof WebGLRenderingContext;
    return !gl.texStorage2D;
}
/**
 * Gets a string for WebGL enum
 *
 * Note: Several enums are the same. Without more
 * context (which function) it's impossible to always
 * give the correct enum. As it is, for matching values
 * it gives all enums. Checking the WebGL2RenderingContext
 * that means
 *
 *      0     = ZERO | POINT | NONE | NO_ERROR
 *      1     = ONE | LINES | SYNC_FLUSH_COMMANDS_BIT
 *      32777 = BLEND_EQUATION_RGB | BLEND_EQUATION_RGB
 *      36662 = COPY_READ_BUFFER | COPY_READ_BUFFER_BINDING
 *      36663 = COPY_WRITE_BUFFER | COPY_WRITE_BUFFER_BINDING
 *      36006 = FRAMEBUFFER_BINDING | DRAW_FRAMEBUFFER_BINDING
 *
 * It's also not useful for bits really unless you pass in individual bits.
 * In other words
 *
 *     const bits = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
 *     twgl.glEnumToString(gl, bits);  // not going to work
 *
 * Note that some enums only exist on extensions. If you
 * want them to show up you need to pass the extension at least
 * once. For example
 *
 *     const ext = gl.getExtension('WEBGL_compressed_texture_s3tc');
 *     if (ext) {
 *        twgl.glEnumToString(ext, 0);  // just prime the function
 *
 *        ..later..
 *
 *        const internalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
 *        console.log(twgl.glEnumToString(gl, internalFormat));
 *
 * Notice I didn't have to pass the extension the second time. This means
 * you can have place that generically gets an enum for texture formats for example.
 * and as long as you primed the function with the extensions
 *
 * If you're using `twgl.addExtensionsToContext` to enable your extensions
 * then twgl will automatically get the extension's enums.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext or any extension object
 * @param {number} value the value of the enum you want to look up.
 * @return {string} enum string or hex value
 * @memberOf module:twgl
 * @function glEnumToString
 */ const glEnumToString = function() {
    const haveEnumsForType = {};
    const enums = {};
    function addEnums(gl) {
        const type = gl.constructor.name;
        if (!haveEnumsForType[type]) {
            for(const key in gl)if (typeof gl[key] === "number") {
                const existing = enums[gl[key]];
                enums[gl[key]] = existing ? `${existing} | ${key}` : key;
            }
            haveEnumsForType[type] = true;
        }
    }
    return function glEnumToString(gl, value) {
        addEnums(gl);
        return enums[value] || (typeof value === "number" ? `0x${value.toString(16)}` : value);
    };
}();
var utils = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    glEnumToString: glEnumToString,
    isWebGL1: isWebGL1,
    isWebGL2: isWebGL2
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const defaults$1 = {
    textureColor: new Uint8Array([
        128,
        192,
        255,
        255
    ]),
    textureOptions: {},
    crossOrigin: undefined
};
const isArrayBuffer$1 = isArrayBuffer;
// Should we make this on demand?
const getShared2DContext = function() {
    let s_ctx;
    return function getShared2DContext() {
        s_ctx = s_ctx || (typeof document !== "undefined" && document.createElement ? document.createElement("canvas").getContext("2d") : null);
        return s_ctx;
    };
}();
// NOTE: Chrome supports 2D canvas in a Worker (behind flag as of v64 but
//       not only does Firefox NOT support it but Firefox freezes immediately
//       if you try to create one instead of just returning null and continuing.
//  : (global.OffscreenCanvas && (new global.OffscreenCanvas(1, 1)).getContext("2d"));  // OffscreenCanvas may not support 2d
// NOTE: We can maybe remove some of the need for the 2d canvas. In WebGL2
// we can use the various unpack settings. Otherwise we could try using
// the ability of an ImageBitmap to be cut. Unfortunately cutting an ImageBitmap
// is async and the current TWGL code expects a non-Async result though that
// might not be a problem. ImageBitmap though is not available in Edge or Safari
// as of 2018-01-02
/* PixelFormat */ const ALPHA = 0x1906;
const RGB = 0x1907;
const RGBA = 0x1908;
const LUMINANCE = 0x1909;
const LUMINANCE_ALPHA = 0x190A;
const DEPTH_COMPONENT = 0x1902;
const DEPTH_STENCIL = 0x84F9;
/* TextureWrapMode */ // const REPEAT                         = 0x2901;
// const MIRRORED_REPEAT                = 0x8370;
const CLAMP_TO_EDGE = 0x812f;
/* TextureMagFilter */ const NEAREST = 0x2600;
const LINEAR = 0x2601;
/* TextureMinFilter */ // const NEAREST_MIPMAP_NEAREST         = 0x2700;
// const LINEAR_MIPMAP_NEAREST          = 0x2701;
// const NEAREST_MIPMAP_LINEAR          = 0x2702;
// const LINEAR_MIPMAP_LINEAR           = 0x2703;
/* Texture Target */ const TEXTURE_2D = 0x0de1;
const TEXTURE_CUBE_MAP = 0x8513;
const TEXTURE_3D = 0x806f;
const TEXTURE_2D_ARRAY = 0x8c1a;
/* Cubemap Targets */ const TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
const TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
const TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
const TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
const TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
const TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851a;
/* Texture Parameters */ const TEXTURE_MIN_FILTER = 0x2801;
const TEXTURE_MAG_FILTER = 0x2800;
const TEXTURE_WRAP_S = 0x2802;
const TEXTURE_WRAP_T = 0x2803;
const TEXTURE_WRAP_R = 0x8072;
const TEXTURE_MIN_LOD = 0x813a;
const TEXTURE_MAX_LOD = 0x813b;
const TEXTURE_BASE_LEVEL = 0x813c;
const TEXTURE_MAX_LEVEL = 0x813d;
/* Pixel store */ const UNPACK_ALIGNMENT = 0x0cf5;
const UNPACK_ROW_LENGTH = 0x0cf2;
const UNPACK_IMAGE_HEIGHT = 0x806e;
const UNPACK_SKIP_PIXELS = 0x0cf4;
const UNPACK_SKIP_ROWS = 0x0cf3;
const UNPACK_SKIP_IMAGES = 0x806d;
const UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
const UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
const UNPACK_FLIP_Y_WEBGL = 0x9240;
const R8 = 0x8229;
const R8_SNORM = 0x8F94;
const R16F = 0x822D;
const R32F = 0x822E;
const R8UI = 0x8232;
const R8I = 0x8231;
const RG16UI = 0x823A;
const RG16I = 0x8239;
const RG32UI = 0x823C;
const RG32I = 0x823B;
const RG8 = 0x822B;
const RG8_SNORM = 0x8F95;
const RG16F = 0x822F;
const RG32F = 0x8230;
const RG8UI = 0x8238;
const RG8I = 0x8237;
const R16UI = 0x8234;
const R16I = 0x8233;
const R32UI = 0x8236;
const R32I = 0x8235;
const RGB8 = 0x8051;
const SRGB8 = 0x8C41;
const RGB565 = 0x8D62;
const RGB8_SNORM = 0x8F96;
const R11F_G11F_B10F = 0x8C3A;
const RGB9_E5 = 0x8C3D;
const RGB16F = 0x881B;
const RGB32F = 0x8815;
const RGB8UI = 0x8D7D;
const RGB8I = 0x8D8F;
const RGB16UI = 0x8D77;
const RGB16I = 0x8D89;
const RGB32UI = 0x8D71;
const RGB32I = 0x8D83;
const RGBA8 = 0x8058;
const SRGB8_ALPHA8 = 0x8C43;
const RGBA8_SNORM = 0x8F97;
const RGB5_A1 = 0x8057;
const RGBA4 = 0x8056;
const RGB10_A2 = 0x8059;
const RGBA16F = 0x881A;
const RGBA32F = 0x8814;
const RGBA8UI = 0x8D7C;
const RGBA8I = 0x8D8E;
const RGB10_A2UI = 0x906F;
const RGBA16UI = 0x8D76;
const RGBA16I = 0x8D88;
const RGBA32I = 0x8D82;
const RGBA32UI = 0x8D70;
const DEPTH_COMPONENT16 = 0x81A5;
const DEPTH_COMPONENT24 = 0x81A6;
const DEPTH_COMPONENT32F = 0x8CAC;
const DEPTH32F_STENCIL8 = 0x8CAD;
const DEPTH24_STENCIL8 = 0x88F0;
/* DataType */ const BYTE$2 = 0x1400;
const UNSIGNED_BYTE$2 = 0x1401;
const SHORT$2 = 0x1402;
const UNSIGNED_SHORT$2 = 0x1403;
const INT$2 = 0x1404;
const UNSIGNED_INT$2 = 0x1405;
const FLOAT$2 = 0x1406;
const UNSIGNED_SHORT_4_4_4_4$1 = 0x8033;
const UNSIGNED_SHORT_5_5_5_1$1 = 0x8034;
const UNSIGNED_SHORT_5_6_5$1 = 0x8363;
const HALF_FLOAT$1 = 0x140B;
const HALF_FLOAT_OES = 0x8D61; // Thanks Khronos for making this different >:(
const UNSIGNED_INT_2_10_10_10_REV$1 = 0x8368;
const UNSIGNED_INT_10F_11F_11F_REV$1 = 0x8C3B;
const UNSIGNED_INT_5_9_9_9_REV$1 = 0x8C3E;
const FLOAT_32_UNSIGNED_INT_24_8_REV$1 = 0x8DAD;
const UNSIGNED_INT_24_8$1 = 0x84FA;
const RG = 0x8227;
const RG_INTEGER = 0x8228;
const RED = 0x1903;
const RED_INTEGER = 0x8D94;
const RGB_INTEGER = 0x8D98;
const RGBA_INTEGER = 0x8D99;
const formatInfo = {};
{
    // NOTE: this is named `numColorComponents` vs `numComponents` so we can let Uglify mangle
    // the name.
    const f = formatInfo;
    f[ALPHA] = {
        numColorComponents: 1
    };
    f[LUMINANCE] = {
        numColorComponents: 1
    };
    f[LUMINANCE_ALPHA] = {
        numColorComponents: 2
    };
    f[RGB] = {
        numColorComponents: 3
    };
    f[RGBA] = {
        numColorComponents: 4
    };
    f[RED] = {
        numColorComponents: 1
    };
    f[RED_INTEGER] = {
        numColorComponents: 1
    };
    f[RG] = {
        numColorComponents: 2
    };
    f[RG_INTEGER] = {
        numColorComponents: 2
    };
    f[RGB] = {
        numColorComponents: 3
    };
    f[RGB_INTEGER] = {
        numColorComponents: 3
    };
    f[RGBA] = {
        numColorComponents: 4
    };
    f[RGBA_INTEGER] = {
        numColorComponents: 4
    };
    f[DEPTH_COMPONENT] = {
        numColorComponents: 1
    };
    f[DEPTH_STENCIL] = {
        numColorComponents: 2
    };
}/**
 * @typedef {Object} TextureFormatDetails
 * @property {number} textureFormat format to pass texImage2D and similar functions.
 * @property {boolean} colorRenderable true if you can render to this format of texture.
 * @property {boolean} textureFilterable true if you can filter the texture, false if you can ony use `NEAREST`.
 * @property {number[]} type Array of possible types you can pass to texImage2D and similar function
 * @property {Object.<number,number>} bytesPerElementMap A map of types to bytes per element
 * @private
 */ let s_textureInternalFormatInfo;
function getTextureInternalFormatInfo(internalFormat) {
    if (!s_textureInternalFormatInfo) {
        // NOTE: these properties need unique names so we can let Uglify mangle the name.
        const t = {};
        // unsized formats
        t[ALPHA] = {
            textureFormat: ALPHA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                1,
                2,
                2,
                4
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2
            ]
        };
        t[LUMINANCE] = {
            textureFormat: LUMINANCE,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                1,
                2,
                2,
                4
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2
            ]
        };
        t[LUMINANCE_ALPHA] = {
            textureFormat: LUMINANCE_ALPHA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                2,
                4,
                4,
                8
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2
            ]
        };
        t[RGB] = {
            textureFormat: RGB,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                3,
                6,
                6,
                12,
                2
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2,
                UNSIGNED_SHORT_5_6_5$1
            ]
        };
        t[RGBA] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4,
                8,
                8,
                16,
                2,
                2
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2,
                UNSIGNED_SHORT_4_4_4_4$1,
                UNSIGNED_SHORT_5_5_5_1$1
            ]
        };
        t[DEPTH_COMPONENT] = {
            textureFormat: DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2,
                4
            ],
            type: [
                UNSIGNED_INT$2,
                UNSIGNED_SHORT$2
            ]
        };
        // sized formats
        t[R8] = {
            textureFormat: RED,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                1
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[R8_SNORM] = {
            textureFormat: RED,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                1
            ],
            type: [
                BYTE$2
            ]
        };
        t[R16F] = {
            textureFormat: RED,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                4,
                2
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1
            ]
        };
        t[R32F] = {
            textureFormat: RED,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                FLOAT$2
            ]
        };
        t[R8UI] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                1
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[R8I] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                1
            ],
            type: [
                BYTE$2
            ]
        };
        t[R16UI] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                UNSIGNED_SHORT$2
            ]
        };
        t[R16I] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                SHORT$2
            ]
        };
        t[R32UI] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        t[R32I] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                INT$2
            ]
        };
        t[RG8] = {
            textureFormat: RG,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                2
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RG8_SNORM] = {
            textureFormat: RG,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                2
            ],
            type: [
                BYTE$2
            ]
        };
        t[RG16F] = {
            textureFormat: RG,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                8,
                4
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1
            ]
        };
        t[RG32F] = {
            textureFormat: RG,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                FLOAT$2
            ]
        };
        t[RG8UI] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RG8I] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                BYTE$2
            ]
        };
        t[RG16UI] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_SHORT$2
            ]
        };
        t[RG16I] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                SHORT$2
            ]
        };
        t[RG32UI] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        t[RG32I] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                INT$2
            ]
        };
        t[RGB8] = {
            textureFormat: RGB,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                3
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[SRGB8] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                3
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RGB565] = {
            textureFormat: RGB,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                3,
                2
            ],
            type: [
                UNSIGNED_BYTE$2,
                UNSIGNED_SHORT_5_6_5$1
            ]
        };
        t[RGB8_SNORM] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                3
            ],
            type: [
                BYTE$2
            ]
        };
        t[R11F_G11F_B10F] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                12,
                6,
                4
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1,
                UNSIGNED_INT_10F_11F_11F_REV$1
            ]
        };
        t[RGB9_E5] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                12,
                6,
                4
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1,
                UNSIGNED_INT_5_9_9_9_REV$1
            ]
        };
        t[RGB16F] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                12,
                6
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1
            ]
        };
        t[RGB32F] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                12
            ],
            type: [
                FLOAT$2
            ]
        };
        t[RGB8UI] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                3
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RGB8I] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                3
            ],
            type: [
                BYTE$2
            ]
        };
        t[RGB16UI] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                6
            ],
            type: [
                UNSIGNED_SHORT$2
            ]
        };
        t[RGB16I] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                6
            ],
            type: [
                SHORT$2
            ]
        };
        t[RGB32UI] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                12
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        t[RGB32I] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                12
            ],
            type: [
                INT$2
            ]
        };
        t[RGBA8] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[SRGB8_ALPHA8] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RGBA8_SNORM] = {
            textureFormat: RGBA,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                BYTE$2
            ]
        };
        t[RGB5_A1] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4,
                2,
                4
            ],
            type: [
                UNSIGNED_BYTE$2,
                UNSIGNED_SHORT_5_5_5_1$1,
                UNSIGNED_INT_2_10_10_10_REV$1
            ]
        };
        t[RGBA4] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4,
                2
            ],
            type: [
                UNSIGNED_BYTE$2,
                UNSIGNED_SHORT_4_4_4_4$1
            ]
        };
        t[RGB10_A2] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT_2_10_10_10_REV$1
            ]
        };
        t[RGBA16F] = {
            textureFormat: RGBA,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                16,
                8
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1
            ]
        };
        t[RGBA32F] = {
            textureFormat: RGBA,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                16
            ],
            type: [
                FLOAT$2
            ]
        };
        t[RGBA8UI] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RGBA8I] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                BYTE$2
            ]
        };
        t[RGB10_A2UI] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT_2_10_10_10_REV$1
            ]
        };
        t[RGBA16UI] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                UNSIGNED_SHORT$2
            ]
        };
        t[RGBA16I] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                SHORT$2
            ]
        };
        t[RGBA32I] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                16
            ],
            type: [
                INT$2
            ]
        };
        t[RGBA32UI] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                16
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        // Sized Internal
        t[DEPTH_COMPONENT16] = {
            textureFormat: DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2,
                4
            ],
            type: [
                UNSIGNED_SHORT$2,
                UNSIGNED_INT$2
            ]
        };
        t[DEPTH_COMPONENT24] = {
            textureFormat: DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        t[DEPTH_COMPONENT32F] = {
            textureFormat: DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                FLOAT$2
            ]
        };
        t[DEPTH24_STENCIL8] = {
            textureFormat: DEPTH_STENCIL,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT_24_8$1
            ]
        };
        t[DEPTH32F_STENCIL8] = {
            textureFormat: DEPTH_STENCIL,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                FLOAT_32_UNSIGNED_INT_24_8_REV$1
            ]
        };
        Object.keys(t).forEach(function(internalFormat) {
            const info = t[internalFormat];
            info.bytesPerElementMap = {};
            info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
                const type = info.type[ndx];
                info.bytesPerElementMap[type] = bytesPerElement;
            });
        });
        s_textureInternalFormatInfo = t;
    }
    return s_textureInternalFormatInfo[internalFormat];
}
/**
 * Gets the number of bytes per element for a given internalFormat / type
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @param {number} type The type parameter for texImage2D etc..
 * @return {number} the number of bytes per element for the given internalFormat, type combo
 * @memberOf module:twgl/textures
 */ function getBytesPerElementForInternalFormat(internalFormat, type) {
    const info = getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    const bytesPerElement = info.bytesPerElementMap[type];
    if (bytesPerElement === undefined) throw "unknown internal format";
    return bytesPerElement;
}
/**
 * Info related to a specific texture internalFormat as returned
 * from {@link module:twgl/textures.getFormatAndTypeForInternalFormat}.
 *
 * @typedef {Object} TextureFormatInfo
 * @property {number} format Format to pass to texImage2D and related functions
 * @property {number} type Type to pass to texImage2D and related functions
 * @memberOf module:twgl/textures
 */ /**
 * Gets the format and type for a given internalFormat
 *
 * @param {number} internalFormat The internal format
 * @return {module:twgl/textures.TextureFormatInfo} the corresponding format and type,
 * @memberOf module:twgl/textures
 */ function getFormatAndTypeForInternalFormat(internalFormat) {
    const info = getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    return {
        format: info.textureFormat,
        type: info.type[0]
    };
}
/**
 * Returns true if value is power of 2
 * @param {number} value number to check.
 * @return true if value is power of 2
 * @private
 */ function isPowerOf2(value) {
    return (value & value - 1) === 0;
}
/**
 * Gets whether or not we can generate mips for the given
 * internal format.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number} width The width parameter from texImage2D etc..
 * @param {number} height The height parameter from texImage2D etc..
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */ function canGenerateMipmap(gl, width, height, internalFormat) {
    if (!isWebGL2(gl)) return isPowerOf2(width) && isPowerOf2(height);
    const info = getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    return info.colorRenderable && info.textureFilterable;
}
/**
 * Gets whether or not we can generate mips for the given format
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */ function canFilter(internalFormat) {
    const info = getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    return info.textureFilterable;
}
/**
 * Gets the number of components for a given image format.
 * @param {number} format the format.
 * @return {number} the number of components for the format.
 * @memberOf module:twgl/textures
 */ function getNumComponentsForFormat(format) {
    const info = formatInfo[format];
    if (!info) throw "unknown format: " + format;
    return info.numColorComponents;
}
/**
 * Gets the texture type for a given array type.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @return {number} the gl texture type
 * @private
 */ function getTextureTypeForArrayType(gl, src, defaultType) {
    if (isArrayBuffer$1(src)) return getGLTypeForTypedArray(src);
    return defaultType || UNSIGNED_BYTE$2;
}
function guessDimensions(gl, target, width, height, numElements) {
    if (numElements % 1 !== 0) throw "can't guess dimensions";
    if (!width && !height) {
        const size = Math.sqrt(numElements / (target === TEXTURE_CUBE_MAP ? 6 : 1));
        if (size % 1 === 0) {
            width = size;
            height = size;
        } else {
            width = numElements;
            height = 1;
        }
    } else if (!height) {
        height = numElements / width;
        if (height % 1) throw "can't guess dimensions";
    } else if (!width) {
        width = numElements / height;
        if (width % 1) throw "can't guess dimensions";
    }
    return {
        width: width,
        height: height
    };
}
/**
 * Sets the default texture color.
 *
 * The default texture color is used when loading textures from
 * urls. Because the URL will be loaded async we'd like to be
 * able to use the texture immediately. By putting a 1x1 pixel
 * color in the texture we can start using the texture before
 * the URL has loaded.
 *
 * @param {number[]} color Array of 4 values in the range 0 to 1
 * @deprecated see {@link module:twgl.setDefaults}
 * @memberOf module:twgl/textures
 */ function setDefaultTextureColor(color) {
    defaults$1.textureColor = new Uint8Array([
        color[0] * 255,
        color[1] * 255,
        color[2] * 255,
        color[3] * 255
    ]);
}
function setDefaults$1(newDefaults) {
    copyExistingProperties(newDefaults, defaults$1);
    if (newDefaults.textureColor) setDefaultTextureColor(newDefaults.textureColor);
}
/**
 * A function to generate the source for a texture.
 * @callback TextureFunc
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options the texture options
 * @return {*} Returns any of the things documented for `src` for {@link module:twgl.TextureOptions}.
 * @memberOf module:twgl
 */ /**
 * Texture options passed to most texture functions. Each function will use whatever options
 * are appropriate for its needs. This lets you pass the same options to all functions.
 *
 * Note: A `TexImageSource` is defined in the WebGL spec as a `HTMLImageElement`, `HTMLVideoElement`,
 * `HTMLCanvasElement`, `ImageBitmap`, or `ImageData`.
 *
 * @typedef {Object} TextureOptions
 * @property {number} [target] the type of texture `gl.TEXTURE_2D` or `gl.TEXTURE_CUBE_MAP`. Defaults to `gl.TEXTURE_2D`.
 * @property {number} [level] the mip level to affect. Defaults to 0. Note, if set auto will be considered false unless explicitly set to true.
 * @property {number} [width] the width of the texture. Only used if src is an array or typed array or null.
 * @property {number} [height] the height of a texture. Only used if src is an array or typed array or null.
 * @property {number} [depth] the depth of a texture. Only used if src is an array or type array or null and target is `TEXTURE_3D` .
 * @property {number} [min] the min filter setting (eg. `gl.LINEAR`). Defaults to `gl.NEAREST_MIPMAP_LINEAR`
 *     or if texture is not a power of 2 on both dimensions then defaults to `gl.LINEAR`.
 * @property {number} [mag] the mag filter setting (eg. `gl.LINEAR`). Defaults to `gl.LINEAR`
 * @property {number} [minMag] both the min and mag filter settings.
 * @property {number} [internalFormat] internal format for texture. Defaults to `gl.RGBA`
 * @property {number} [format] format for texture. Defaults to `gl.RGBA`.
 * @property {number} [type] type for texture. Defaults to `gl.UNSIGNED_BYTE` unless `src` is ArrayBufferView. If `src`
 *     is ArrayBufferView defaults to type that matches ArrayBufferView type.
 * @property {number} [wrap] Texture wrapping for both S and T (and R if TEXTURE_3D or WebGLSampler). Defaults to `gl.REPEAT` for 2D unless src is WebGL1 and src not npot and `gl.CLAMP_TO_EDGE` for cube
 * @property {number} [wrapS] Texture wrapping for S. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapT] Texture wrapping for T. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapR] Texture wrapping for R. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [minLod] TEXTURE_MIN_LOD setting
 * @property {number} [maxLod] TEXTURE_MAX_LOD setting
 * @property {number} [baseLevel] TEXTURE_BASE_LEVEL setting
 * @property {number} [maxLevel] TEXTURE_MAX_LEVEL setting
 * @property {number} [unpackAlignment] The `gl.UNPACK_ALIGNMENT` used when uploading an array. Defaults to 1.
 * @property {number[]|ArrayBufferView} [color] Color to initialize this texture with if loading an image asynchronously.
 *     The default use a blue 1x1 pixel texture. You can set another default by calling `twgl.setDefaults`
 *     or you can set an individual texture's initial color by setting this property. Example: `[1, .5, .5, 1]` = pink
 * @property {number} [premultiplyAlpha] Whether or not to premultiply alpha. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [flipY] Whether or not to flip the texture vertically on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [colorspaceConversion] Whether or not to let the browser do colorspace conversion of the texture on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {boolean} [auto] If `undefined` or `true`, in WebGL1, texture filtering is set automatically for non-power of 2 images and
 *    mips are generated for power of 2 images. In WebGL2 mips are generated if they can be. Note: if `level` is set above
 *    then then `auto` is assumed to be `false` unless explicity set to `true`.
 * @property {number[]} [cubeFaceOrder] The order that cube faces are pulled out of an img or set of images. The default is
 *
 *     [gl.TEXTURE_CUBE_MAP_POSITIVE_X,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
 *
 * @property {(number[]|ArrayBufferView|TexImageSource|TexImageSource[]|string|string[]|module:twgl.TextureFunc)} [src] source for texture
 *
 *    If `string` then it's assumed to be a URL to an image. The image will be downloaded async. A usable
 *    1x1 pixel texture will be returned immediately. The texture will be updated once the image has downloaded.
 *    If `target` is `gl.TEXTURE_CUBE_MAP` will attempt to divide image into 6 square pieces. 1x6, 6x1, 3x2, 2x3.
 *    The pieces will be uploaded in `cubeFaceOrder`
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_CUBE_MAP` then it must have 6 entries, one for each face of a cube map.
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_2D_ARRAY` then each entry is a slice of the a 2d array texture
 *    and will be scaled to the specified width and height OR to the size of the first image that loads.
 *
 *    If `TexImageSource` then it wil be used immediately to create the contents of the texture. Examples `HTMLImageElement`,
 *    `HTMLCanvasElement`, `HTMLVideoElement`.
 *
 *    If `number[]` or `ArrayBufferView` it's assumed to be data for a texture. If `width` or `height` is
 *    not specified it is guessed as follows. First the number of elements is computed by `src.length / numComponents`
 *    where `numComponents` is derived from `format`. If `target` is `gl.TEXTURE_CUBE_MAP` then `numElements` is divided
 *    by 6. Then
 *
 *    *   If neither `width` nor `height` are specified and `sqrt(numElements)` is an integer then width and height
 *        are set to `sqrt(numElements)`. Otherwise `width = numElements` and `height = 1`.
 *
 *    *   If only one of `width` or `height` is specified then the other equals `numElements / specifiedDimension`.
 *
 * If `number[]` will be converted to `type`.
 *
 * If `src` is a function it will be called with a `WebGLRenderingContext` and these options.
 * Whatever it returns is subject to these rules. So it can return a string url, an `HTMLElement`
 * an array etc...
 *
 * If `src` is undefined then an empty texture will be created of size `width` by `height`.
 *
 * @property {string} [crossOrigin] What to set the crossOrigin property of images when they are downloaded.
 *    default: undefined. Also see {@link module:twgl.setDefaults}.
 *
 * @memberOf module:twgl
 */ /**
 * Sets any packing state that will be set based on the options.
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @private
 */ function setPackState(gl, options) {
    if (options.colorspaceConversion !== undefined) gl.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
    if (options.premultiplyAlpha !== undefined) gl.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
    if (options.flipY !== undefined) gl.pixelStorei(UNPACK_FLIP_Y_WEBGL, options.flipY);
}
/**
 * Set skip state to defaults
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @private
 */ function setSkipStateToDefault(gl) {
    gl.pixelStorei(UNPACK_ALIGNMENT, 4);
    if (isWebGL2(gl)) {
        gl.pixelStorei(UNPACK_ROW_LENGTH, 0);
        gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
        gl.pixelStorei(UNPACK_SKIP_PIXELS, 0);
        gl.pixelStorei(UNPACK_SKIP_ROWS, 0);
        gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
    }
}
/**
 * Sets the parameters of a texture or sampler
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number|WebGLSampler} target texture target or sampler
 * @param {function()} parameteriFn texParameteri or samplerParameteri fn
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @private
 */ function setTextureSamplerParameters(gl, target, parameteriFn, options) {
    if (options.minMag) {
        parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.minMag);
        parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.minMag);
    }
    if (options.min) parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.min);
    if (options.mag) parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.mag);
    if (options.wrap) {
        parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrap);
        parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrap);
        if (target === TEXTURE_3D || isSampler(gl, target)) parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrap);
    }
    if (options.wrapR) parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrapR);
    if (options.wrapS) parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrapS);
    if (options.wrapT) parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrapT);
    if (options.minLod) parameteriFn.call(gl, target, TEXTURE_MIN_LOD, options.minLod);
    if (options.maxLod) parameteriFn.call(gl, target, TEXTURE_MAX_LOD, options.maxLod);
    if (options.baseLevel) parameteriFn.call(gl, target, TEXTURE_BASE_LEVEL, options.baseLevel);
    if (options.maxLevel) parameteriFn.call(gl, target, TEXTURE_MAX_LEVEL, options.maxLevel);
}
/**
 * Sets the texture parameters of a texture.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */ function setTextureParameters(gl, tex, options) {
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    setTextureSamplerParameters(gl, target, gl.texParameteri, options);
}
/**
 * Sets the sampler parameters of a sampler.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLSampler} sampler the WebGLSampler to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */ function setSamplerParameters(gl, sampler, options) {
    setTextureSamplerParameters(gl, sampler, gl.samplerParameteri, options);
}
/**
 * Creates a new sampler object and sets parameters.
 *
 * Example:
 *
 *      const sampler = twgl.createSampler(gl, {
 *        minMag: gl.NEAREST,         // sets both TEXTURE_MIN_FILTER and TEXTURE_MAG_FILTER
 *        wrap: gl.CLAMP_TO_NEAREST,  // sets both TEXTURE_WRAP_S and TEXTURE_WRAP_T and TEXTURE_WRAP_R
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per sampler.
 * @return {Object.<string,WebGLSampler>} the created samplers by name
 * @private
 */ function createSampler(gl, options) {
    const sampler = gl.createSampler();
    setSamplerParameters(gl, sampler, options);
    return sampler;
}
/**
 * Creates a multiple sampler objects and sets parameters on each.
 *
 * Example:
 *
 *      const samplers = twgl.createSamplers(gl, {
 *        nearest: {
 *          minMag: gl.NEAREST,
 *        },
 *        nearestClampS: {
 *          minMag: gl.NEAREST,
 *          wrapS: gl.CLAMP_TO_NEAREST,
 *        },
 *        linear: {
 *          minMag: gl.LINEAR,
 *        },
 *        nearestClamp: {
 *          minMag: gl.NEAREST,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClamp: {
 *          minMag: gl.LINEAR,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClampT: {
 *          minMag: gl.LINEAR,
 *          wrapT: gl.CLAMP_TO_EDGE,
 *        },
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set on the sampler
 * @private
 */ function createSamplers(gl, samplerOptions) {
    const samplers = {};
    Object.keys(samplerOptions).forEach(function(name) {
        samplers[name] = createSampler(gl, samplerOptions[name]);
    });
    return samplers;
}
/**
 * Makes a 1x1 pixel
 * If no color is passed in uses the default color which can be set by calling `setDefaultTextureColor`.
 * @param {(number[]|ArrayBufferView)} [color] The color using 0-1 values
 * @return {Uint8Array} Unit8Array with color.
 * @private
 */ function make1Pixel(color) {
    color = color || defaults$1.textureColor;
    if (isArrayBuffer$1(color)) return color;
    return new Uint8Array([
        color[0] * 255,
        color[1] * 255,
        color[2] * 255,
        color[3] * 255
    ]);
}
/**
 * Sets filtering or generates mips for texture based on width or height
 * If width or height is not passed in uses `options.width` and//or `options.height`
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @param {number} [width] width of texture
 * @param {number} [height] height of texture
 * @param {number} [internalFormat] The internalFormat parameter from texImage2D etc..
 * @memberOf module:twgl/textures
 */ function setTextureFilteringForSize(gl, tex, options, width, height, internalFormat) {
    options = options || defaults$1.textureOptions;
    internalFormat = internalFormat || RGBA;
    const target = options.target || TEXTURE_2D;
    width = width || options.width;
    height = height || options.height;
    gl.bindTexture(target, tex);
    if (canGenerateMipmap(gl, width, height, internalFormat)) gl.generateMipmap(target);
    else {
        const filtering = canFilter(internalFormat) ? LINEAR : NEAREST;
        gl.texParameteri(target, TEXTURE_MIN_FILTER, filtering);
        gl.texParameteri(target, TEXTURE_MAG_FILTER, filtering);
        gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
        gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
    }
}
function shouldAutomaticallySetTextureFilteringForSize(options) {
    return options.auto === true || options.auto === undefined && options.level === undefined;
}
/**
 * Gets an array of cubemap face enums
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @return {number[]} cubemap face enums
 * @private
 */ function getCubeFaceOrder(gl, options) {
    options = options || {};
    return options.cubeFaceOrder || [
        TEXTURE_CUBE_MAP_POSITIVE_X,
        TEXTURE_CUBE_MAP_NEGATIVE_X,
        TEXTURE_CUBE_MAP_POSITIVE_Y,
        TEXTURE_CUBE_MAP_NEGATIVE_Y,
        TEXTURE_CUBE_MAP_POSITIVE_Z,
        TEXTURE_CUBE_MAP_NEGATIVE_Z, 
    ];
}
/**
 * @typedef {Object} FaceInfo
 * @property {number} face gl enum for texImage2D
 * @property {number} ndx face index (0 - 5) into source data
 * @ignore
 */ /**
 * Gets an array of FaceInfos
 * There's a bug in some NVidia drivers that will crash the driver if
 * `gl.TEXTURE_CUBE_MAP_POSITIVE_X` is not uploaded first. So, we take
 * the user's desired order from his faces to WebGL and make sure we
 * do the faces in WebGL order
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @return {FaceInfo[]} cubemap face infos. Arguably the `face` property of each element is redundant but
 *    it's needed internally to sort the array of `ndx` properties by `face`.
 * @private
 */ function getCubeFacesWithNdx(gl, options) {
    const faces = getCubeFaceOrder(gl, options);
    // work around bug in NVidia drivers. We have to upload the first face first else the driver crashes :(
    const facesWithNdx = faces.map(function(face, ndx) {
        return {
            face: face,
            ndx: ndx
        };
    });
    facesWithNdx.sort(function(a, b) {
        return a.face - b.face;
    });
    return facesWithNdx;
}
/**
 * Set a texture from the contents of an element. Will also set
 * texture filtering or generate mips based on the dimensions of the element
 * unless `options.auto === false`. If `target === gl.TEXTURE_CUBE_MAP` will
 * attempt to slice image into 1x6, 2x3, 3x2, or 6x1 images, one for each face.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {HTMLElement} element a canvas, img, or video element.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 * @kind function
 */ function setTextureFromElement(gl, tex, element, options) {
    options = options || defaults$1.textureOptions;
    const target = options.target || TEXTURE_2D;
    const level = options.level || 0;
    let width = element.width;
    let height = element.height;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || formatType.type;
    setPackState(gl, options);
    gl.bindTexture(target, tex);
    if (target === TEXTURE_CUBE_MAP) {
        // guess the parts
        const imgWidth = element.width;
        const imgHeight = element.height;
        let size;
        let slices;
        if (imgWidth / 6 === imgHeight) {
            // It's 6x1
            size = imgHeight;
            slices = [
                0,
                0,
                1,
                0,
                2,
                0,
                3,
                0,
                4,
                0,
                5,
                0
            ];
        } else if (imgHeight / 6 === imgWidth) {
            // It's 1x6
            size = imgWidth;
            slices = [
                0,
                0,
                0,
                1,
                0,
                2,
                0,
                3,
                0,
                4,
                0,
                5
            ];
        } else if (imgWidth / 3 === imgHeight / 2) {
            // It's 3x2
            size = imgWidth / 3;
            slices = [
                0,
                0,
                1,
                0,
                2,
                0,
                0,
                1,
                1,
                1,
                2,
                1
            ];
        } else if (imgWidth / 2 === imgHeight / 3) {
            // It's 2x3
            size = imgWidth / 2;
            slices = [
                0,
                0,
                1,
                0,
                0,
                1,
                1,
                1,
                0,
                2,
                1,
                2
            ];
        } else throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
        const ctx = getShared2DContext();
        if (ctx) {
            ctx.canvas.width = size;
            ctx.canvas.height = size;
            width = size;
            height = size;
            getCubeFacesWithNdx(gl, options).forEach(function(f) {
                const xOffset = slices[f.ndx * 2 + 0] * size;
                const yOffset = slices[f.ndx * 2 + 1] * size;
                ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
                gl.texImage2D(f.face, level, internalFormat, format, type, ctx.canvas);
            });
            // Free up the canvas memory
            ctx.canvas.width = 1;
            ctx.canvas.height = 1;
        } else if (typeof createImageBitmap !== "undefined") {
            // NOTE: It seems like we should prefer ImageBitmap because unlike canvas it's
            // note lossy? (alpha is not premultiplied? although I'm not sure what
            width = size;
            height = size;
            getCubeFacesWithNdx(gl, options).forEach(function(f) {
                const xOffset = slices[f.ndx * 2 + 0] * size;
                const yOffset = slices[f.ndx * 2 + 1] * size;
                // We can't easily use a default texture color here as it would have to match
                // the type across all faces where as with a 2D one there's only one face
                // so we're replacing everything all at once. It also has to be the correct size.
                // On the other hand we need all faces to be the same size so as one face loads
                // the rest match else the texture will be un-renderable.
                gl.texImage2D(f.face, level, internalFormat, size, size, 0, format, type, null);
                createImageBitmap(element, xOffset, yOffset, size, size, {
                    premultiplyAlpha: "none",
                    colorSpaceConversion: "none"
                }).then(function(imageBitmap) {
                    setPackState(gl, options);
                    gl.bindTexture(target, tex);
                    gl.texImage2D(f.face, level, internalFormat, format, type, imageBitmap);
                    if (shouldAutomaticallySetTextureFilteringForSize(options)) setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
                });
            });
        }
    } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
        const smallest = Math.min(element.width, element.height);
        const largest = Math.max(element.width, element.height);
        const depth = largest / smallest;
        if (depth % 1 !== 0) throw "can not compute 3D dimensions of element";
        const xMult = element.width === largest ? 1 : 0;
        const yMult = element.height === largest ? 1 : 0;
        gl.pixelStorei(UNPACK_ALIGNMENT, 1);
        gl.pixelStorei(UNPACK_ROW_LENGTH, element.width);
        gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
        gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
        gl.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
        for(let d = 0; d < depth; ++d){
            const srcX = d * smallest * xMult;
            const srcY = d * smallest * yMult;
            gl.pixelStorei(UNPACK_SKIP_PIXELS, srcX);
            gl.pixelStorei(UNPACK_SKIP_ROWS, srcY);
            gl.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
        }
        setSkipStateToDefault(gl);
    } else gl.texImage2D(target, level, internalFormat, format, type, element);
    if (shouldAutomaticallySetTextureFilteringForSize(options)) setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
    setTextureParameters(gl, tex, options);
}
function noop() {}
/**
 * Checks whether the url's origin is the same so that we can set the `crossOrigin`
 * @param {string} url url to image
 * @returns {boolean} true if the window's origin is the same as image's url
 * @private
 */ function urlIsSameOrigin(url) {
    if (typeof document !== "undefined") {
        // for IE really
        const a = document.createElement("a");
        a.href = url;
        return a.hostname === location.hostname && a.port === location.port && a.protocol === location.protocol;
    } else {
        const localOrigin = new URL(location.href).origin;
        const urlOrigin = new URL(url, location.href).origin;
        return urlOrigin === localOrigin;
    }
}
function setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
    return crossOrigin === undefined && !urlIsSameOrigin(url) ? "anonymous" : crossOrigin;
}
/**
 * Loads an image
 * @param {string} url url to image
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @return {HTMLImageElement} the image being loaded.
 * @private
 */ function loadImage(url, crossOrigin, callback) {
    callback = callback || noop;
    let img;
    crossOrigin = crossOrigin !== undefined ? crossOrigin : defaults$1.crossOrigin;
    crossOrigin = setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
    if (typeof Image !== "undefined") {
        img = new Image();
        if (crossOrigin !== undefined) img.crossOrigin = crossOrigin;
        const clearEventHandlers = function clearEventHandlers() {
            img.removeEventListener("error", onError); // eslint-disable-line
            img.removeEventListener("load", onLoad); // eslint-disable-line
            img = null;
        };
        const onError = function onError() {
            const msg = "couldn't load image: " + url;
            error(msg);
            callback(msg, img);
            clearEventHandlers();
        };
        const onLoad = function onLoad() {
            callback(null, img);
            clearEventHandlers();
        };
        img.addEventListener("error", onError);
        img.addEventListener("load", onLoad);
        img.src = url;
        return img;
    } else if (typeof ImageBitmap !== "undefined") {
        let err;
        let bm;
        const cb = function cb() {
            callback(err, bm);
        };
        const options = {};
        if (crossOrigin) options.mode = "cors"; // TODO: not sure how to translate image.crossOrigin
        fetch(url, options).then(function(response) {
            if (!response.ok) throw response;
            return response.blob();
        }).then(function(blob) {
            return createImageBitmap(blob, {
                premultiplyAlpha: "none",
                colorSpaceConversion: "none"
            });
        }).then(function(bitmap) {
            // not sure if this works. We don't want
            // to catch the user's error. So, call
            // the callback in a timeout so we're
            // not in this scope inside the promise.
            bm = bitmap;
            setTimeout(cb);
        }).catch(function(e) {
            err = e;
            setTimeout(cb);
        });
        img = null;
    }
    return img;
}
/**
 * check if object is a TexImageSource
 *
 * @param {Object} obj Object to test
 * @return {boolean} true if object is a TexImageSource
 * @private
 */ function isTexImageSource(obj) {
    return typeof ImageBitmap !== "undefined" && obj instanceof ImageBitmap || typeof ImageData !== "undefined" && obj instanceof ImageData || typeof HTMLElement !== "undefined" && obj instanceof HTMLElement;
}
/**
 * if obj is an TexImageSource then just
 * uses it otherwise if obj is a string
 * then load it first.
 *
 * @param {string|TexImageSource} obj
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @private
 */ function loadAndUseImage(obj, crossOrigin, callback) {
    if (isTexImageSource(obj)) {
        setTimeout(function() {
            callback(null, obj);
        });
        return obj;
    }
    return loadImage(obj, crossOrigin, callback);
}
/**
 * Sets a texture to a 1x1 pixel color. If `options.color === false` is nothing happens. If it's not set
 * the default texture color is used which can be set by calling `setDefaultTextureColor`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 * @private
 */ function setTextureTo1PixelColor(gl, tex, options) {
    options = options || defaults$1.textureOptions;
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    if (options.color === false) return;
    // Assume it's a URL
    // Put 1x1 pixels in texture. That makes it renderable immediately regardless of filtering.
    const color = make1Pixel(options.color);
    if (target === TEXTURE_CUBE_MAP) for(let ii = 0; ii < 6; ++ii)gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
    else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, 0, RGBA, 1, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
    else gl.texImage2D(target, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
}
/**
 * The src image(s) used to create a texture.
 *
 * When you call {@link module:twgl.createTexture} or {@link module:twgl.createTextures}
 * you can pass in urls for images to load into the textures. If it's a single url
 * then this will be a single HTMLImageElement. If it's an array of urls used for a cubemap
 * this will be a corresponding array of images for the cubemap.
 *
 * @typedef {HTMLImageElement|HTMLImageElement[]} TextureSrc
 * @memberOf module:twgl
 */ /**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback TextureReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} texture the texture.
 * @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
 * @memberOf module:twgl
 */ /**
 * A callback for when all images have finished downloading and been uploaded into their respective textures
 * @callback TexturesReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
 * @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
 * @memberOf module:twgl
 */ /**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback CubemapReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each face.
 * @memberOf module:twgl
 */ /**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback ThreeDReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each slice.
 * @memberOf module:twgl
 */ /**
 * Loads a texture from an image from a Url as specified in `options.src`
 * If `options.color !== false` will set the texture to a 1x1 pixel color so that the texture is
 * immediately useable. It will be updated with the contents of the image once the image has finished
 * downloading. Filtering options will be set as appropriate for image unless `options.auto === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A function to be called when the image has finished loading. err will
 *    be non null if there was an error.
 * @return {HTMLImageElement} the image being downloaded.
 * @memberOf module:twgl/textures
 */ function loadTextureFromUrl(gl, tex, options, callback) {
    callback = callback || noop;
    options = options || defaults$1.textureOptions;
    setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({}, options);
    const img = loadAndUseImage(options.src, options.crossOrigin, function(err, img) {
        if (err) callback(err, tex, img);
        else {
            setTextureFromElement(gl, tex, img, options);
            callback(null, tex, img);
        }
    });
    return img;
}
/**
 * Loads a cubemap from 6 urls or TexImageSources as specified in `options.src`. Will set the cubemap to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.CubemapReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 * @private
 */ function loadCubemapFromUrls(gl, tex, options, callback) {
    callback = callback || noop;
    const urls = options.src;
    if (urls.length !== 6) throw "there must be 6 urls for a cubemap";
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || UNSIGNED_BYTE$2;
    const target = options.target || TEXTURE_2D;
    if (target !== TEXTURE_CUBE_MAP) throw "target must be TEXTURE_CUBE_MAP";
    setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({}, options);
    let numToLoad = 6;
    const errors = [];
    const faces = getCubeFaceOrder(gl, options);
    let imgs; // eslint-disable-line
    function uploadImg(faceTarget) {
        return function(err, img) {
            --numToLoad;
            if (err) errors.push(err);
            else if (img.width !== img.height) errors.push("cubemap face img is not a square: " + img.src);
            else {
                setPackState(gl, options);
                gl.bindTexture(target, tex);
                // So assuming this is the first image we now have one face that's img sized
                // and 5 faces that are 1x1 pixel so size the other faces
                if (numToLoad === 5) // use the default order
                getCubeFaceOrder().forEach(function(otherTarget) {
                    // Should we re-use the same face or a color?
                    gl.texImage2D(otherTarget, level, internalFormat, format, type, img);
                });
                else gl.texImage2D(faceTarget, level, internalFormat, format, type, img);
                if (shouldAutomaticallySetTextureFilteringForSize(options)) gl.generateMipmap(target);
            }
            if (numToLoad === 0) callback(errors.length ? errors : undefined, tex, imgs);
        };
    }
    imgs = urls.map(function(url, ndx) {
        return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
    });
}
/**
 * Loads a 2d array or 3d texture from urls OR TexImageSources as specified in `options.src`.
 * Will set the texture to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 *
 * If the width and height is not specified the width and height of the first
 * image loaded will be used. Note that since images are loaded async
 * which image downloads first is unknown.
 *
 * If an image is not the same size as the width and height it will be scaled
 * to that width and height.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.ThreeDReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 * @private
 */ function loadSlicesFromUrls(gl, tex, options, callback) {
    callback = callback || noop;
    const urls = options.src;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || UNSIGNED_BYTE$2;
    const target = options.target || TEXTURE_2D_ARRAY;
    if (target !== TEXTURE_3D && target !== TEXTURE_2D_ARRAY) throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
    setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({}, options);
    let numToLoad = urls.length;
    const errors = [];
    let imgs; // eslint-disable-line
    const level = options.level || 0;
    let width = options.width;
    let height = options.height;
    const depth = urls.length;
    let firstImage = true;
    function uploadImg(slice) {
        return function(err, img) {
            --numToLoad;
            if (err) errors.push(err);
            else {
                setPackState(gl, options);
                gl.bindTexture(target, tex);
                if (firstImage) {
                    firstImage = false;
                    width = options.width || img.width;
                    height = options.height || img.height;
                    gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
                    // put it in every slice otherwise some slices will be 0,0,0,0
                    for(let s = 0; s < depth; ++s)gl.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
                } else {
                    let src = img;
                    let ctx;
                    if (img.width !== width || img.height !== height) {
                        // Size the image to fix
                        ctx = getShared2DContext();
                        src = ctx.canvas;
                        ctx.canvas.width = width;
                        ctx.canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                    }
                    gl.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);
                    // free the canvas memory
                    if (ctx && src === ctx.canvas) {
                        ctx.canvas.width = 0;
                        ctx.canvas.height = 0;
                    }
                }
                if (shouldAutomaticallySetTextureFilteringForSize(options)) gl.generateMipmap(target);
            }
            if (numToLoad === 0) callback(errors.length ? errors : undefined, tex, imgs);
        };
    }
    imgs = urls.map(function(url, ndx) {
        return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
    });
}
/**
 * Sets a texture from an array or typed array. If the width or height is not provided will attempt to
 * guess the size. See {@link module:twgl.TextureOptions}.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {(number[]|ArrayBufferView)} src An array or typed arry with texture data.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */ function setTextureFromArray(gl, tex, src, options) {
    options = options || defaults$1.textureOptions;
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    let width = options.width;
    let height = options.height;
    let depth = options.depth;
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
    if (!isArrayBuffer$1(src)) {
        const Type = getTypedArrayTypeForGLType(type);
        src = new Type(src);
    } else if (src instanceof Uint8ClampedArray) src = new Uint8Array(src.buffer);
    const bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
    const numElements = src.byteLength / bytesPerElement; // TODO: check UNPACK_ALIGNMENT?
    if (numElements % 1) throw "length wrong size for format: " + glEnumToString(gl, format);
    let dimensions;
    if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
        if (!width && !height && !depth) {
            const size = Math.cbrt(numElements);
            if (size % 1 !== 0) throw "can't guess cube size of array of numElements: " + numElements;
            width = size;
            height = size;
            depth = size;
        } else if (width && (!height || !depth)) {
            dimensions = guessDimensions(gl, target, height, depth, numElements / width);
            height = dimensions.width;
            depth = dimensions.height;
        } else if (height && (!width || !depth)) {
            dimensions = guessDimensions(gl, target, width, depth, numElements / height);
            width = dimensions.width;
            depth = dimensions.height;
        } else {
            dimensions = guessDimensions(gl, target, width, height, numElements / depth);
            width = dimensions.width;
            height = dimensions.height;
        }
    } else {
        dimensions = guessDimensions(gl, target, width, height, numElements);
        width = dimensions.width;
        height = dimensions.height;
    }
    setSkipStateToDefault(gl);
    gl.pixelStorei(UNPACK_ALIGNMENT, options.unpackAlignment || 1);
    setPackState(gl, options);
    if (target === TEXTURE_CUBE_MAP) {
        const elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
        const faceSize = numElements / 6 * elementsPerElement;
        getCubeFacesWithNdx(gl, options).forEach((f)=>{
            const offset = faceSize * f.ndx;
            const data = src.subarray(offset, offset + faceSize);
            gl.texImage2D(f.face, level, internalFormat, width, height, 0, format, type, data);
        });
    } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
    else gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
    return {
        width: width,
        height: height,
        depth: depth,
        type: type
    };
}
/**
 * Sets a texture with no contents of a certain size. In other words calls `gl.texImage2D` with `null`.
 * You must set `options.width` and `options.height`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */ function setEmptyTexture(gl, tex, options) {
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || formatType.type;
    setPackState(gl, options);
    if (target === TEXTURE_CUBE_MAP) for(let ii = 0; ii < 6; ++ii)gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
    else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
    else gl.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
}
/**
 * Creates a texture based on the options passed in.
 *
 * Note: may reset UNPACK_ALIGNMENT, UNPACK_ROW_LENGTH, UNPACK_IMAGE_HEIGHT, UNPACK_SKIP_IMAGES
 * UNPACK_SKIP_PIXELS, and UNPACK_SKIP_ROWS
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A callback called when an image has been downloaded and uploaded to the texture.
 * @return {WebGLTexture} the created texture.
 * @memberOf module:twgl/textures
 */ function createTexture(gl, options, callback) {
    callback = callback || noop;
    options = options || defaults$1.textureOptions;
    const tex = gl.createTexture();
    const target = options.target || TEXTURE_2D;
    let width = options.width || 1;
    let height = options.height || 1;
    const internalFormat = options.internalFormat || RGBA;
    gl.bindTexture(target, tex);
    if (target === TEXTURE_CUBE_MAP) {
        // this should have been the default for cubemaps :(
        gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
        gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
    }
    let src = options.src;
    if (src) {
        if (typeof src === "function") src = src(gl, options);
        if (typeof src === "string") loadTextureFromUrl(gl, tex, options, callback);
        else if (isArrayBuffer$1(src) || Array.isArray(src) && (typeof src[0] === "number" || Array.isArray(src[0]) || isArrayBuffer$1(src[0]))) {
            const dimensions = setTextureFromArray(gl, tex, src, options);
            width = dimensions.width;
            height = dimensions.height;
        } else if (Array.isArray(src) && (typeof src[0] === "string" || isTexImageSource(src[0]))) {
            if (target === TEXTURE_CUBE_MAP) loadCubemapFromUrls(gl, tex, options, callback);
            else loadSlicesFromUrls(gl, tex, options, callback);
        } else {
            setTextureFromElement(gl, tex, src, options);
            width = src.width;
            height = src.height;
        }
    } else setEmptyTexture(gl, tex, options);
    if (shouldAutomaticallySetTextureFilteringForSize(options)) setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
    setTextureParameters(gl, tex, options);
    return tex;
}
/**
 * Resizes a texture based on the options passed in.
 *
 * Note: This is not a generic resize anything function.
 * It's mostly used by {@link module:twgl.resizeFramebufferInfo}
 * It will use `options.src` if it exists to try to determine a `type`
 * otherwise it will assume `gl.UNSIGNED_BYTE`. No data is provided
 * for the texture. Texture parameters will be set accordingly
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the texture to resize
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {number} [width] the new width. If not passed in will use `options.width`
 * @param {number} [height] the new height. If not passed in will use `options.height`
 * @param {number} [depth] the new depth. If not passed in will use `options.depth`
 * @memberOf module:twgl/textures
 */ function resizeTexture(gl, tex, options, width, height, depth) {
    width = width || options.width;
    height = height || options.height;
    depth = depth || options.depth;
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    let type;
    const src = options.src;
    if (!src) type = options.type || formatType.type;
    else if (isArrayBuffer$1(src) || Array.isArray(src) && typeof src[0] === "number") type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
    else type = options.type || formatType.type;
    if (target === TEXTURE_CUBE_MAP) for(let ii = 0; ii < 6; ++ii)gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
    else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
    else gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
}
/**
 * Check if a src is an async request.
 * if src is a string we're going to download an image
 * if src is an array of strings we're going to download cubemap images
 * @param {*} src The src from a TextureOptions
 * @returns {bool} true if src is async.
 * @private
 */ function isAsyncSrc(src) {
    return typeof src === "string" || Array.isArray(src) && typeof src[0] === "string";
}
/**
 * Creates a bunch of textures based on the passed in options.
 *
 * Example:
 *
 *     const textures = twgl.createTextures(gl, {
 *       // a power of 2 image
 *       hftIcon: { src: "images/hft-icon-16.png", mag: gl.NEAREST },
 *       // a non-power of 2 image
 *       clover: { src: "images/clover.jpg" },
 *       // From a canvas
 *       fromCanvas: { src: ctx.canvas },
 *       // A cubemap from 6 images
 *       yokohama: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: [
 *           'images/yokohama/posx.jpg',
 *           'images/yokohama/negx.jpg',
 *           'images/yokohama/posy.jpg',
 *           'images/yokohama/negy.jpg',
 *           'images/yokohama/posz.jpg',
 *           'images/yokohama/negz.jpg',
 *         ],
 *       },
 *       // A cubemap from 1 image (can be 1x6, 2x3, 3x2, 6x1)
 *       goldengate: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: 'images/goldengate.jpg',
 *       },
 *       // A 2x2 pixel texture from a JavaScript array
 *       checker: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         src: [
 *           255,255,255,255,
 *           192,192,192,255,
 *           192,192,192,255,
 *           255,255,255,255,
 *         ],
 *       },
 *       // a 1x2 pixel texture from a typed array.
 *       stripe: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         format: gl.LUMINANCE,
 *         src: new Uint8Array([
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *         ]),
 *         width: 1,
 *       },
 *     });
 *
 * Now
 *
 * *   `textures.hftIcon` will be a 2d texture
 * *   `textures.clover` will be a 2d texture
 * *   `textures.fromCanvas` will be a 2d texture
 * *   `textures.yohohama` will be a cubemap texture
 * *   `textures.goldengate` will be a cubemap texture
 * *   `textures.checker` will be a 2d texture
 * *   `textures.stripe` will be a 2d texture
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per texture.
 * @param {module:twgl.TexturesReadyCallback} [callback] A callback called when all textures have been downloaded.
 * @return {Object.<string,WebGLTexture>} the created textures by name
 * @memberOf module:twgl/textures
 */ function createTextures(gl, textureOptions, callback) {
    callback = callback || noop;
    let numDownloading = 0;
    const errors = [];
    const textures = {};
    const images = {};
    function callCallbackIfReady() {
        if (numDownloading === 0) setTimeout(function() {
            callback(errors.length ? errors : undefined, textures, images);
        }, 0);
    }
    Object.keys(textureOptions).forEach(function(name) {
        const options = textureOptions[name];
        let onLoadFn;
        if (isAsyncSrc(options.src)) {
            onLoadFn = function(err, tex, img) {
                images[name] = img;
                --numDownloading;
                if (err) errors.push(err);
                callCallbackIfReady();
            };
            ++numDownloading;
        }
        textures[name] = createTexture(gl, options, onLoadFn);
    });
    // queue the callback if there are no images to download.
    // We do this because if your code is structured to wait for
    // images to download but then you comment out all the async
    // images your code would break.
    callCallbackIfReady();
    return textures;
}
var textures = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    setTextureDefaults_: setDefaults$1,
    createSampler: createSampler,
    createSamplers: createSamplers,
    setSamplerParameters: setSamplerParameters,
    createTexture: createTexture,
    setEmptyTexture: setEmptyTexture,
    setTextureFromArray: setTextureFromArray,
    loadTextureFromUrl: loadTextureFromUrl,
    setTextureFromElement: setTextureFromElement,
    setTextureFilteringForSize: setTextureFilteringForSize,
    setTextureParameters: setTextureParameters,
    setDefaultTextureColor: setDefaultTextureColor,
    createTextures: createTextures,
    resizeTexture: resizeTexture,
    canGenerateMipmap: canGenerateMipmap,
    canFilter: canFilter,
    getNumComponentsForFormat: getNumComponentsForFormat,
    getBytesPerElementForInternalFormat: getBytesPerElementForInternalFormat,
    getFormatAndTypeForInternalFormat: getFormatAndTypeForInternalFormat
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * Low level shader program related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.programs` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/programs
 */ const error$1 = error;
const warn$1 = warn;
function getElementById(id) {
    return typeof document !== "undefined" && document.getElementById ? document.getElementById(id) : null;
}
const TEXTURE0 = 0x84c0;
const DYNAMIC_DRAW = 0x88e8;
const ARRAY_BUFFER$1 = 0x8892;
const ELEMENT_ARRAY_BUFFER$1 = 0x8893;
const UNIFORM_BUFFER = 0x8a11;
const TRANSFORM_FEEDBACK_BUFFER = 0x8c8e;
const TRANSFORM_FEEDBACK = 0x8e22;
const COMPILE_STATUS = 0x8b81;
const LINK_STATUS = 0x8b82;
const FRAGMENT_SHADER = 0x8b30;
const VERTEX_SHADER = 0x8b31;
const SEPARATE_ATTRIBS = 0x8c8d;
const ACTIVE_UNIFORMS = 0x8b86;
const ACTIVE_ATTRIBUTES = 0x8b89;
const TRANSFORM_FEEDBACK_VARYINGS = 0x8c83;
const ACTIVE_UNIFORM_BLOCKS = 0x8a36;
const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 0x8a44;
const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8a46;
const UNIFORM_BLOCK_DATA_SIZE = 0x8a40;
const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 0x8a43;
const FLOAT$3 = 0x1406;
const FLOAT_VEC2 = 0x8B50;
const FLOAT_VEC3 = 0x8B51;
const FLOAT_VEC4 = 0x8B52;
const INT$3 = 0x1404;
const INT_VEC2 = 0x8B53;
const INT_VEC3 = 0x8B54;
const INT_VEC4 = 0x8B55;
const BOOL = 0x8B56;
const BOOL_VEC2 = 0x8B57;
const BOOL_VEC3 = 0x8B58;
const BOOL_VEC4 = 0x8B59;
const FLOAT_MAT2 = 0x8B5A;
const FLOAT_MAT3 = 0x8B5B;
const FLOAT_MAT4 = 0x8B5C;
const SAMPLER_2D = 0x8B5E;
const SAMPLER_CUBE = 0x8B60;
const SAMPLER_3D = 0x8B5F;
const SAMPLER_2D_SHADOW = 0x8B62;
const FLOAT_MAT2x3 = 0x8B65;
const FLOAT_MAT2x4 = 0x8B66;
const FLOAT_MAT3x2 = 0x8B67;
const FLOAT_MAT3x4 = 0x8B68;
const FLOAT_MAT4x2 = 0x8B69;
const FLOAT_MAT4x3 = 0x8B6A;
const SAMPLER_2D_ARRAY = 0x8DC1;
const SAMPLER_2D_ARRAY_SHADOW = 0x8DC4;
const SAMPLER_CUBE_SHADOW = 0x8DC5;
const UNSIGNED_INT$3 = 0x1405;
const UNSIGNED_INT_VEC2 = 0x8DC6;
const UNSIGNED_INT_VEC3 = 0x8DC7;
const UNSIGNED_INT_VEC4 = 0x8DC8;
const INT_SAMPLER_2D = 0x8DCA;
const INT_SAMPLER_3D = 0x8DCB;
const INT_SAMPLER_CUBE = 0x8DCC;
const INT_SAMPLER_2D_ARRAY = 0x8DCF;
const UNSIGNED_INT_SAMPLER_2D = 0x8DD2;
const UNSIGNED_INT_SAMPLER_3D = 0x8DD3;
const UNSIGNED_INT_SAMPLER_CUBE = 0x8DD4;
const UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7;
const TEXTURE_2D$1 = 0x0DE1;
const TEXTURE_CUBE_MAP$1 = 0x8513;
const TEXTURE_3D$1 = 0x806F;
const TEXTURE_2D_ARRAY$1 = 0x8C1A;
const typeMap = {};
/**
 * Returns the corresponding bind point for a given sampler type
 * @private
 */ function getBindPointForSamplerType(gl, type) {
    return typeMap[type].bindPoint;
}
// This kind of sucks! If you could compose functions as in `var fn = gl[name];`
// this code could be a lot smaller but that is sadly really slow (T_T)
function floatSetter(gl, location1) {
    return function(v) {
        gl.uniform1f(location1, v);
    };
}
function floatArraySetter(gl, location1) {
    return function(v) {
        gl.uniform1fv(location1, v);
    };
}
function floatVec2Setter(gl, location1) {
    return function(v) {
        gl.uniform2fv(location1, v);
    };
}
function floatVec3Setter(gl, location1) {
    return function(v) {
        gl.uniform3fv(location1, v);
    };
}
function floatVec4Setter(gl, location1) {
    return function(v) {
        gl.uniform4fv(location1, v);
    };
}
function intSetter(gl, location1) {
    return function(v) {
        gl.uniform1i(location1, v);
    };
}
function intArraySetter(gl, location1) {
    return function(v) {
        gl.uniform1iv(location1, v);
    };
}
function intVec2Setter(gl, location1) {
    return function(v) {
        gl.uniform2iv(location1, v);
    };
}
function intVec3Setter(gl, location1) {
    return function(v) {
        gl.uniform3iv(location1, v);
    };
}
function intVec4Setter(gl, location1) {
    return function(v) {
        gl.uniform4iv(location1, v);
    };
}
function uintSetter(gl, location1) {
    return function(v) {
        gl.uniform1ui(location1, v);
    };
}
function uintArraySetter(gl, location1) {
    return function(v) {
        gl.uniform1uiv(location1, v);
    };
}
function uintVec2Setter(gl, location1) {
    return function(v) {
        gl.uniform2uiv(location1, v);
    };
}
function uintVec3Setter(gl, location1) {
    return function(v) {
        gl.uniform3uiv(location1, v);
    };
}
function uintVec4Setter(gl, location1) {
    return function(v) {
        gl.uniform4uiv(location1, v);
    };
}
function floatMat2Setter(gl, location1) {
    return function(v) {
        gl.uniformMatrix2fv(location1, false, v);
    };
}
function floatMat3Setter(gl, location1) {
    return function(v) {
        gl.uniformMatrix3fv(location1, false, v);
    };
}
function floatMat4Setter(gl, location1) {
    return function(v) {
        gl.uniformMatrix4fv(location1, false, v);
    };
}
function floatMat23Setter(gl, location1) {
    return function(v) {
        gl.uniformMatrix2x3fv(location1, false, v);
    };
}
function floatMat32Setter(gl, location1) {
    return function(v) {
        gl.uniformMatrix3x2fv(location1, false, v);
    };
}
function floatMat24Setter(gl, location1) {
    return function(v) {
        gl.uniformMatrix2x4fv(location1, false, v);
    };
}
function floatMat42Setter(gl, location1) {
    return function(v) {
        gl.uniformMatrix4x2fv(location1, false, v);
    };
}
function floatMat34Setter(gl, location1) {
    return function(v) {
        gl.uniformMatrix3x4fv(location1, false, v);
    };
}
function floatMat43Setter(gl, location1) {
    return function(v) {
        gl.uniformMatrix4x3fv(location1, false, v);
    };
}
function samplerSetter(gl, type, unit, location1) {
    const bindPoint = getBindPointForSamplerType(gl, type);
    return isWebGL2(gl) ? function(textureOrPair) {
        let texture;
        let sampler;
        if (isTexture(gl, textureOrPair)) {
            texture = textureOrPair;
            sampler = null;
        } else {
            texture = textureOrPair.texture;
            sampler = textureOrPair.sampler;
        }
        gl.uniform1i(location1, unit);
        gl.activeTexture(TEXTURE0 + unit);
        gl.bindTexture(bindPoint, texture);
        gl.bindSampler(unit, sampler);
    } : function(texture) {
        gl.uniform1i(location1, unit);
        gl.activeTexture(TEXTURE0 + unit);
        gl.bindTexture(bindPoint, texture);
    };
}
function samplerArraySetter(gl, type, unit, location1, size) {
    const bindPoint = getBindPointForSamplerType(gl, type);
    const units = new Int32Array(size);
    for(let ii = 0; ii < size; ++ii)units[ii] = unit + ii;
    return isWebGL2(gl) ? function(textures) {
        gl.uniform1iv(location1, units);
        textures.forEach(function(textureOrPair, index) {
            gl.activeTexture(TEXTURE0 + units[index]);
            let texture;
            let sampler;
            if (isTexture(gl, textureOrPair)) {
                texture = textureOrPair;
                sampler = null;
            } else {
                texture = textureOrPair.texture;
                sampler = textureOrPair.sampler;
            }
            gl.bindSampler(unit, sampler);
            gl.bindTexture(bindPoint, texture);
        });
    } : function(textures) {
        gl.uniform1iv(location1, units);
        textures.forEach(function(texture, index) {
            gl.activeTexture(TEXTURE0 + units[index]);
            gl.bindTexture(bindPoint, texture);
        });
    };
}
typeMap[FLOAT$3] = {
    Type: Float32Array,
    size: 4,
    setter: floatSetter,
    arraySetter: floatArraySetter
};
typeMap[FLOAT_VEC2] = {
    Type: Float32Array,
    size: 8,
    setter: floatVec2Setter,
    cols: 2
};
typeMap[FLOAT_VEC3] = {
    Type: Float32Array,
    size: 12,
    setter: floatVec3Setter,
    cols: 3
};
typeMap[FLOAT_VEC4] = {
    Type: Float32Array,
    size: 16,
    setter: floatVec4Setter,
    cols: 4
};
typeMap[INT$3] = {
    Type: Int32Array,
    size: 4,
    setter: intSetter,
    arraySetter: intArraySetter
};
typeMap[INT_VEC2] = {
    Type: Int32Array,
    size: 8,
    setter: intVec2Setter,
    cols: 2
};
typeMap[INT_VEC3] = {
    Type: Int32Array,
    size: 12,
    setter: intVec3Setter,
    cols: 3
};
typeMap[INT_VEC4] = {
    Type: Int32Array,
    size: 16,
    setter: intVec4Setter,
    cols: 4
};
typeMap[UNSIGNED_INT$3] = {
    Type: Uint32Array,
    size: 4,
    setter: uintSetter,
    arraySetter: uintArraySetter
};
typeMap[UNSIGNED_INT_VEC2] = {
    Type: Uint32Array,
    size: 8,
    setter: uintVec2Setter,
    cols: 2
};
typeMap[UNSIGNED_INT_VEC3] = {
    Type: Uint32Array,
    size: 12,
    setter: uintVec3Setter,
    cols: 3
};
typeMap[UNSIGNED_INT_VEC4] = {
    Type: Uint32Array,
    size: 16,
    setter: uintVec4Setter,
    cols: 4
};
typeMap[BOOL] = {
    Type: Uint32Array,
    size: 4,
    setter: intSetter,
    arraySetter: intArraySetter
};
typeMap[BOOL_VEC2] = {
    Type: Uint32Array,
    size: 8,
    setter: intVec2Setter,
    cols: 2
};
typeMap[BOOL_VEC3] = {
    Type: Uint32Array,
    size: 12,
    setter: intVec3Setter,
    cols: 3
};
typeMap[BOOL_VEC4] = {
    Type: Uint32Array,
    size: 16,
    setter: intVec4Setter,
    cols: 4
};
typeMap[FLOAT_MAT2] = {
    Type: Float32Array,
    size: 32,
    setter: floatMat2Setter,
    rows: 2,
    cols: 2
};
typeMap[FLOAT_MAT3] = {
    Type: Float32Array,
    size: 48,
    setter: floatMat3Setter,
    rows: 3,
    cols: 3
};
typeMap[FLOAT_MAT4] = {
    Type: Float32Array,
    size: 64,
    setter: floatMat4Setter,
    rows: 4,
    cols: 4
};
typeMap[FLOAT_MAT2x3] = {
    Type: Float32Array,
    size: 32,
    setter: floatMat23Setter,
    rows: 2,
    cols: 3
};
typeMap[FLOAT_MAT2x4] = {
    Type: Float32Array,
    size: 32,
    setter: floatMat24Setter,
    rows: 2,
    cols: 4
};
typeMap[FLOAT_MAT3x2] = {
    Type: Float32Array,
    size: 48,
    setter: floatMat32Setter,
    rows: 3,
    cols: 2
};
typeMap[FLOAT_MAT3x4] = {
    Type: Float32Array,
    size: 48,
    setter: floatMat34Setter,
    rows: 3,
    cols: 4
};
typeMap[FLOAT_MAT4x2] = {
    Type: Float32Array,
    size: 64,
    setter: floatMat42Setter,
    rows: 4,
    cols: 2
};
typeMap[FLOAT_MAT4x3] = {
    Type: Float32Array,
    size: 64,
    setter: floatMat43Setter,
    rows: 4,
    cols: 3
};
typeMap[SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D$1
};
typeMap[SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_3D$1
};
typeMap[SAMPLER_2D_SHADOW] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D$1
};
typeMap[SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D_ARRAY$1
};
typeMap[SAMPLER_2D_ARRAY_SHADOW] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D_ARRAY$1
};
typeMap[SAMPLER_CUBE_SHADOW] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[INT_SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D$1
};
typeMap[INT_SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_3D$1
};
typeMap[INT_SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[INT_SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D_ARRAY$1
};
typeMap[UNSIGNED_INT_SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D$1
};
typeMap[UNSIGNED_INT_SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_3D$1
};
typeMap[UNSIGNED_INT_SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D_ARRAY$1
};
function floatAttribSetter(gl, index) {
    return function(b) {
        if (b.value) {
            gl.disableVertexAttribArray(index);
            switch(b.value.length){
                case 4:
                    gl.vertexAttrib4fv(index, b.value);
                    break;
                case 3:
                    gl.vertexAttrib3fv(index, b.value);
                    break;
                case 2:
                    gl.vertexAttrib2fv(index, b.value);
                    break;
                case 1:
                    gl.vertexAttrib1fv(index, b.value);
                    break;
                default:
                    throw new Error("the length of a float constant value must be between 1 and 4!");
            }
        } else {
            gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribPointer(index, b.numComponents || b.size, b.type || FLOAT$3, b.normalize || false, b.stride || 0, b.offset || 0);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index, b.divisor);
        }
    };
}
function intAttribSetter(gl, index) {
    return function(b) {
        if (b.value) {
            gl.disableVertexAttribArray(index);
            if (b.value.length === 4) gl.vertexAttrib4iv(index, b.value);
            else throw new Error("The length of an integer constant value must be 4!");
        } else {
            gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || INT$3, b.stride || 0, b.offset || 0);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index, b.divisor);
        }
    };
}
function uintAttribSetter(gl, index) {
    return function(b) {
        if (b.value) {
            gl.disableVertexAttribArray(index);
            if (b.value.length === 4) gl.vertexAttrib4uiv(index, b.value);
            else throw new Error("The length of an unsigned integer constant value must be 4!");
        } else {
            gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || UNSIGNED_INT$3, b.stride || 0, b.offset || 0);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index, b.divisor);
        }
    };
}
function matAttribSetter(gl, index, typeInfo) {
    const defaultSize = typeInfo.size;
    const count = typeInfo.count;
    return function(b) {
        gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
        const numComponents = b.size || b.numComponents || defaultSize;
        const size = numComponents / count;
        const type = b.type || FLOAT$3;
        const typeInfo = typeMap[type];
        const stride = typeInfo.size * numComponents;
        const normalize = b.normalize || false;
        const offset = b.offset || 0;
        const rowOffset = stride / count;
        for(let i = 0; i < count; ++i){
            gl.enableVertexAttribArray(index + i);
            gl.vertexAttribPointer(index + i, size, type, normalize, stride, offset + rowOffset * i);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index + i, b.divisor);
        }
    };
}
const attrTypeMap = {};
attrTypeMap[FLOAT$3] = {
    size: 4,
    setter: floatAttribSetter
};
attrTypeMap[FLOAT_VEC2] = {
    size: 8,
    setter: floatAttribSetter
};
attrTypeMap[FLOAT_VEC3] = {
    size: 12,
    setter: floatAttribSetter
};
attrTypeMap[FLOAT_VEC4] = {
    size: 16,
    setter: floatAttribSetter
};
attrTypeMap[INT$3] = {
    size: 4,
    setter: intAttribSetter
};
attrTypeMap[INT_VEC2] = {
    size: 8,
    setter: intAttribSetter
};
attrTypeMap[INT_VEC3] = {
    size: 12,
    setter: intAttribSetter
};
attrTypeMap[INT_VEC4] = {
    size: 16,
    setter: intAttribSetter
};
attrTypeMap[UNSIGNED_INT$3] = {
    size: 4,
    setter: uintAttribSetter
};
attrTypeMap[UNSIGNED_INT_VEC2] = {
    size: 8,
    setter: uintAttribSetter
};
attrTypeMap[UNSIGNED_INT_VEC3] = {
    size: 12,
    setter: uintAttribSetter
};
attrTypeMap[UNSIGNED_INT_VEC4] = {
    size: 16,
    setter: uintAttribSetter
};
attrTypeMap[BOOL] = {
    size: 4,
    setter: intAttribSetter
};
attrTypeMap[BOOL_VEC2] = {
    size: 8,
    setter: intAttribSetter
};
attrTypeMap[BOOL_VEC3] = {
    size: 12,
    setter: intAttribSetter
};
attrTypeMap[BOOL_VEC4] = {
    size: 16,
    setter: intAttribSetter
};
attrTypeMap[FLOAT_MAT2] = {
    size: 4,
    setter: matAttribSetter,
    count: 2
};
attrTypeMap[FLOAT_MAT3] = {
    size: 9,
    setter: matAttribSetter,
    count: 3
};
attrTypeMap[FLOAT_MAT4] = {
    size: 16,
    setter: matAttribSetter,
    count: 4
};
const errorRE = /ERROR:\s*\d+:(\d+)/gi;
function addLineNumbersWithError(src, log = "", lineOffset = 0) {
    // Note: Error message formats are not defined by any spec so this may or may not work.
    const matches = [
        ...log.matchAll(errorRE)
    ];
    const lineNoToErrorMap = new Map(matches.map((m, ndx)=>{
        const lineNo = parseInt(m[1]);
        const next = matches[ndx + 1];
        const end = next ? next.index : log.length;
        const msg = log.substring(m.index, end);
        return [
            lineNo - 1,
            msg
        ];
    }));
    return src.split("\n").map((line, lineNo)=>{
        const err = lineNoToErrorMap.get(lineNo);
        return `${lineNo + 1 + lineOffset}: ${line}${err ? `\n\n^^^ ${err}` : ""}`;
    }).join("\n");
}
/**
 * Error Callback
 * @callback ErrorCallback
 * @param {string} msg error message.
 * @param {number} [lineOffset] amount to add to line number
 * @memberOf module:twgl
 */ /**
 * Program Callback
 * @callback ProgramCallback
 * @param {string} [err] error message, falsy if no error
 * @param {WebGLProgram|module:twgl.ProgramInfo} [result] the program or programInfo
 */ const spaceRE = /^[ \t]*\n/;
/**
 * Remove the first end of line because WebGL 2.0 requires
 * #version 300 es
 * as the first line. No whitespace allowed before that line
 * so
 *
 * <script>
 * #version 300 es
 * </script>
 *
 * Has one line before it which is invalid according to GLSL ES 3.00
 *
 * @param {string} shaderSource The source of the shader
 * @returns {{shaderSource: string, lineOffset: number}}
 * @private
 */ function prepShaderSource(shaderSource) {
    let lineOffset = 0;
    if (spaceRE.test(shaderSource)) {
        lineOffset = 1;
        shaderSource = shaderSource.replace(spaceRE, "");
    }
    return {
        lineOffset,
        shaderSource
    };
}
/**
 * @param {module:twgl.ProgramOptions} progOptions
 * @param {string} msg
 * @return null
 * @private
 */ function reportError(progOptions, msg) {
    progOptions.errorCallback(msg);
    if (progOptions.callback) setTimeout(()=>{
        progOptions.callback(`${msg}\n${progOptions.errors.join("\n")}`);
    });
    return null;
}
/**
 * Loads a shader.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} shaderSource The shader source.
 * @param {number} shaderType The type of shader.
 * @param {module:twgl.ProgramOptions} progOptions
 * @return {WebGLShader} The created shader.
 * @private
 */ function loadShader(gl, shaderSource, shaderType, progOptions) {
    // Create the shader object
    const shader = gl.createShader(shaderType);
    // Load the shader source
    gl.shaderSource(shader, prepShaderSource(shaderSource).shaderSource);
    // Compile the shader
    gl.compileShader(shader);
    if (!progOptions.callback && !checkShaderStatus(gl, shaderType, shader, progOptions.errorCallback)) {
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
/**
 * Check Shader status
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {number} shaderType The shader type
 * @param {WebGLShader} shader The shader
 * @param {ErrorCallback} [errFn] function to receive error message.
 * @return {bool} true if shader is ok.
 * @private
 */ function checkShaderStatus(gl, shaderType, shader, errFn) {
    errFn = errFn || error$1;
    // Check the compile status
    const compiled = gl.getShaderParameter(shader, COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        const lastError = gl.getShaderInfoLog(shader);
        const { lineOffset , shaderSource  } = prepShaderSource(gl.getShaderSource(shader));
        errFn(`${addLineNumbersWithError(shaderSource, lastError, lineOffset)}\nError compiling ${glEnumToString(gl, shaderType)}: ${lastError}`);
    }
    return compiled;
}
/**
 * @typedef {Object} ProgramOptions
 * @property {function(string)} [errorCallback] callback for errors
 * @property {Object.<string,number>} [attribLocations] a attribute name to location map
 * @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
 *   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
 *   you can pass an array of names.
 * @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
 * @property {ProgramCallback} [callback] callback for async program compilation.
 * @memberOf module:twgl
 */ /**
 * Gets the program options based on all these optional arguments
 * @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
 * @private
 */ function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
    let transformFeedbackVaryings;
    let transformFeedbackMode;
    let callback;
    if (typeof opt_locations === "function") {
        opt_errorCallback = opt_locations;
        opt_locations = undefined;
    }
    if (typeof opt_attribs === "function") {
        opt_errorCallback = opt_attribs;
        opt_attribs = undefined;
    } else if (opt_attribs && !Array.isArray(opt_attribs)) {
        // If we have an errorCallback we can just return this object
        // Otherwise we need to construct one with default errorCallback
        if (opt_attribs.errorCallback && opt_attribs.errors) return opt_attribs;
        const opt = opt_attribs;
        opt_errorCallback = opt.errorCallback;
        opt_attribs = opt.attribLocations;
        transformFeedbackVaryings = opt.transformFeedbackVaryings;
        transformFeedbackMode = opt.transformFeedbackMode;
        callback = opt.callback;
    }
    const errorCallback = opt_errorCallback || error$1;
    const errors = [];
    const options = {
        errorCallback (msg, ...args) {
            errors.push(msg);
            errorCallback(msg, ...args);
        },
        transformFeedbackVaryings,
        transformFeedbackMode,
        callback,
        errors
    };
    if (opt_attribs) {
        let attribLocations = {};
        if (Array.isArray(opt_attribs)) opt_attribs.forEach(function(attrib, ndx) {
            attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
        });
        else attribLocations = opt_attribs;
        options.attribLocations = attribLocations;
    }
    return options;
}
const defaultShaderType = [
    "VERTEX_SHADER",
    "FRAGMENT_SHADER", 
];
function getShaderTypeFromScriptType(gl, scriptType) {
    if (scriptType.indexOf("frag") >= 0) return FRAGMENT_SHADER;
    else if (scriptType.indexOf("vert") >= 0) return VERTEX_SHADER;
    return undefined;
}
function deleteShaders(gl, shaders) {
    shaders.forEach(function(shader) {
        gl.deleteShader(shader);
    });
}
const wait = (ms = 0)=>new Promise((resolve)=>setTimeout(resolve, ms));
/**
 * Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
 * program.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgram(gl, [vs, fs], options);
 *     twgl.createProgram(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error of a callback was provided.
 * @memberOf module:twgl/programs
 */ function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
    // This code is really convoluted, because it may or may not be async
    // Maybe it would be better to have a separate function
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const realShaders = [];
    const newShaders = [];
    for(let ndx = 0; ndx < shaders.length; ++ndx){
        let shader = shaders[ndx];
        if (typeof shader === "string") {
            const elem = getElementById(shader);
            const src = elem ? elem.text : shader;
            let type = gl[defaultShaderType[ndx]];
            if (elem && elem.type) type = getShaderTypeFromScriptType(gl, elem.type) || type;
            shader = loadShader(gl, src, type, progOptions);
            newShaders.push(shader);
        }
        if (isShader(gl, shader)) realShaders.push(shader);
    }
    if (realShaders.length !== shaders.length) {
        deleteShaders(gl, newShaders);
        return reportError(progOptions, "not enough shaders for program");
    }
    const program = gl.createProgram();
    realShaders.forEach(function(shader) {
        gl.attachShader(program, shader);
    });
    if (progOptions.attribLocations) Object.keys(progOptions.attribLocations).forEach(function(attrib) {
        gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
    });
    let varyings = progOptions.transformFeedbackVaryings;
    if (varyings) {
        if (varyings.attribs) varyings = varyings.attribs;
        if (!Array.isArray(varyings)) varyings = Object.keys(varyings);
        gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || SEPARATE_ATTRIBS);
    }
    gl.linkProgram(program);
    if (progOptions.callback) {
        checkForProgramLinkCompletionAsync(gl, program, progOptions);
        return null;
    } else {
        if (!checkProgramStatus(gl, program, progOptions.errorCallback)) {
            gl.deleteProgram(program);
            deleteShaders(gl, newShaders);
            return null;
        }
        return program;
    }
}
/**
 * Same as createProgram but returns a promise
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramAsync(gl, [vs, fs], options);
 *     twgl.createProgramAsync(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramAsync(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramAsync(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {Promise<WebGLProgram>} The created program
 * @memberOf module:twgl/programs
 */ function createProgramAsync(gl, shaders, ...args) {
    return new Promise((resolve, reject)=>{
        const programOptions = getProgramOptions(...args);
        programOptions.callback = (err, program)=>{
            if (err) reject(err);
            else resolve(program);
        };
        createProgram(gl, shaders, programOptions);
    });
}
/**
 * Same as createProgramInfo but returns a promise
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders or ids. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {Promise<module:twgl.ProgramInfo>} The created ProgramInfo
 * @memberOf module:twgl/programs
 */ function createProgramInfoAsync(gl, shaders, ...args) {
    return new Promise((resolve, reject)=>{
        const programOptions = getProgramOptions(...args);
        programOptions.callback = (err, programInfo)=>{
            if (err) reject(err);
            else resolve(programInfo);
        };
        createProgramInfo(gl, shaders, programOptions);
    });
}
/**
 * Asynchronously wait for program to link.
 * Note: if 'KHR_parallel_shader_compile' extension does not
 * exist then compilation will not be truly async.
 * @param {WebGLRenderingContext} gl The context
 * @param {WebGLProgram} program The program
 * @param {module:twgl.ProgramOptions} progOptions Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @private
 */ async function checkForProgramLinkCompletionAsync(gl, program, progOptions) {
    const ext = gl.getExtension("KHR_parallel_shader_compile");
    const checkFn = ext ? (gl, program)=>gl.getProgramParameter(program, ext.COMPLETION_STATUS_KHR) : ()=>true;
    let waitTime = 0;
    do {
        await wait(waitTime); // must wait at least once
        waitTime = 1000 / 60;
    }while (!checkFn(gl, program));
    const success = checkProgramStatus(gl, program, progOptions.errorCallback);
    const err = success ? undefined : progOptions.errors.join("\n");
    if (!success) {
        const errFn = progOptions.errorCallback || error$1;
        errFn(err);
        gl.deleteProgram(program);
        // TODO: delete shaders, but only shaders that were created newly for this
        // program
        program = null;
    }
    progOptions.callback(err, program);
}
/**
 * Check a program's link status
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program Program to check
 * @param {ErrorCallback} [errFn] func for errors
 * @return {bool} true if program is ok
 * @private
 */ function checkProgramStatus(gl, program, errFn) {
    errFn = errFn || error$1;
    // Check the link status
    const linked = gl.getProgramParameter(program, LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        const lastError = gl.getProgramInfoLog(program);
        errFn(`Error in program linking: ${lastError}`);
    }
    return linked;
}
/**
 * Loads a shader from a script tag.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} scriptId The id of the script tag.
 * @param {number} [opt_shaderType] The type of shader. If not passed in it will
 *     be derived from the type of the script tag.
 * @param {module:twgl.ProgramOptions} [progOptions] callback for errors.
 * @return {WebGLShader?} The created shader or null if error.
 * @private
 */ function createShaderFromScript(gl, scriptId, opt_shaderType, progOptions) {
    let shaderSource = "";
    const shaderScript = getElementById(scriptId);
    if (!shaderScript) return reportError(progOptions, `unknown script element: ${scriptId}`);
    shaderSource = shaderScript.text;
    const shaderType = opt_shaderType || getShaderTypeFromScriptType(gl, shaderScript.type);
    if (!shaderType) return reportError(progOptions, "unknown shader type");
    return loadShader(gl, shaderSource, shaderType, progOptions);
}
/**
 * Creates a program from 2 script tags.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderScriptIds Array of ids of the script
 *        tags for the shaders. The first is assumed to be the
 *        vertex shader, the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error or a callback was provided.
 * @memberOf module:twgl/programs
 */ function createProgramFromScripts(gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const shaders = [];
    for(let ii = 0; ii < shaderScriptIds.length; ++ii){
        const shader = createShaderFromScript(gl, shaderScriptIds[ii], gl[defaultShaderType[ii]], progOptions);
        if (!shader) return null;
        shaders.push(shader);
    }
    return createProgram(gl, shaders, progOptions);
}
/**
 * Creates a program from 2 sources.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error or a callback was provided.
 * @memberOf module:twgl/programs
 */ function createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const shaders = [];
    for(let ii = 0; ii < shaderSources.length; ++ii){
        const shader = loadShader(gl, shaderSources[ii], gl[defaultShaderType[ii]], progOptions);
        if (!progOptions.callback && !shader) return null;
        shaders.push(shader);
    }
    return createProgram(gl, shaders, progOptions);
}
/**
 * Returns true if attribute/uniform is a reserved/built in
 *
 * It makes no sense to me why GL returns these because it's
 * illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
 * with names that start with `gl_` (and `webgl_` in WebGL)
 *
 * I can only assume they are there because they might count
 * when computing the number of uniforms/attributes used when you want to
 * know if you are near the limit. That doesn't really make sense
 * to me but the fact that these get returned are in the spec.
 *
 * @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
 *    `gl.getActiveAttrib`.
 * @return {bool} true if it's reserved
 * @private
 */ function isBuiltIn(info) {
    const name = info.name;
    return name.startsWith("gl_") || name.startsWith("webgl_");
}
const tokenRE = /(\.|\[|]|\w+)/g;
const isDigit = (s)=>s >= "0" && s <= "9";
function addSetterToUniformTree(fullPath, setter, node, uniformSetters) {
    const tokens = fullPath.split(tokenRE).filter((s)=>s !== "");
    let tokenNdx = 0;
    let path = "";
    for(;;){
        const token = tokens[tokenNdx++]; // has to be name or number
        path += token;
        const isArrayIndex = isDigit(token[0]);
        const accessor = isArrayIndex ? parseInt(token) : token;
        if (isArrayIndex) path += tokens[tokenNdx++]; // skip ']'
        const isLastToken = tokenNdx === tokens.length;
        if (isLastToken) {
            node[accessor] = setter;
            break;
        } else {
            const token1 = tokens[tokenNdx++]; // has to be . or [
            const isArray = token1 === "[";
            const child = node[accessor] || (isArray ? [] : {});
            node[accessor] = child;
            node = child;
            uniformSetters[path] = uniformSetters[path] || function(node) {
                return function(value) {
                    setUniformTree(node, value);
                };
            }(child);
            path += token1;
        }
    }
}
/**
 * Creates setter functions for all uniforms of a shader
 * program.
 *
 * @see {@link module:twgl.setUniforms}
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @returns {Object.<string, function>} an object with a setter by name for each uniform
 * @memberOf module:twgl/programs
 */ function createUniformSetters(gl, program) {
    let textureUnit = 0;
    /**
   * Creates a setter for a uniform of the given program with it's
   * location embedded in the setter.
   * @param {WebGLProgram} program
   * @param {WebGLUniformInfo} uniformInfo
   * @returns {function} the created setter.
   */ function createUniformSetter(program, uniformInfo, location1) {
        const isArray = uniformInfo.name.endsWith("[0]");
        const type = uniformInfo.type;
        const typeInfo = typeMap[type];
        if (!typeInfo) throw new Error(`unknown type: 0x${type.toString(16)}`); // we should never get here.
        let setter;
        if (typeInfo.bindPoint) {
            // it's a sampler
            const unit = textureUnit;
            textureUnit += uniformInfo.size;
            if (isArray) setter = typeInfo.arraySetter(gl, type, unit, location1, uniformInfo.size);
            else setter = typeInfo.setter(gl, type, unit, location1, uniformInfo.size);
        } else if (typeInfo.arraySetter && isArray) setter = typeInfo.arraySetter(gl, location1);
        else setter = typeInfo.setter(gl, location1);
        setter.location = location1;
        return setter;
    }
    const uniformSetters = {};
    const uniformTree = {};
    const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
    for(let ii = 0; ii < numUniforms; ++ii){
        const uniformInfo = gl.getActiveUniform(program, ii);
        if (isBuiltIn(uniformInfo)) continue;
        let name = uniformInfo.name;
        // remove the array suffix.
        if (name.endsWith("[0]")) name = name.substr(0, name.length - 3);
        const location1 = gl.getUniformLocation(program, uniformInfo.name);
        // the uniform will have no location if it's in a uniform block
        if (location1) {
            const setter = createUniformSetter(program, uniformInfo, location1);
            uniformSetters[name] = setter;
            addSetterToUniformTree(name, setter, uniformTree, uniformSetters);
        }
    }
    return uniformSetters;
}
/**
 * @typedef {Object} TransformFeedbackInfo
 * @property {number} index index of transform feedback
 * @property {number} type GL type
 * @property {number} size 1 - 4
 * @memberOf module:twgl
 */ /**
 * Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {Object<string, module:twgl.TransformFeedbackInfo>}
 * @memberOf module:twgl
 */ function createTransformFeedbackInfo(gl, program) {
    const info = {};
    const numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
    for(let ii = 0; ii < numVaryings; ++ii){
        const varying = gl.getTransformFeedbackVarying(program, ii);
        info[varying.name] = {
            index: ii,
            type: varying.type,
            size: varying.size
        };
    }
    return info;
}
/**
 * Binds buffers for transform feedback.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {(module:twgl.ProgramInfo|Object<string, module:twgl.TransformFeedbackInfo>)} transformFeedbackInfo A ProgramInfo or TransformFeedbackInfo.
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @memberOf module:twgl
 */ function bindTransformFeedbackInfo(gl, transformFeedbackInfo, bufferInfo) {
    if (transformFeedbackInfo.transformFeedbackInfo) transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
    if (bufferInfo.attribs) bufferInfo = bufferInfo.attribs;
    for(const name in bufferInfo){
        const varying = transformFeedbackInfo[name];
        if (varying) {
            const buf = bufferInfo[name];
            if (buf.offset) gl.bindBufferRange(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
            else gl.bindBufferBase(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
        }
    }
}
/**
 * Creates a transform feedback and sets the buffers
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @return {WebGLTransformFeedback} the created transform feedback
 * @memberOf module:twgl
 */ function createTransformFeedback(gl, programInfo, bufferInfo) {
    const tf = gl.createTransformFeedback();
    gl.bindTransformFeedback(TRANSFORM_FEEDBACK, tf);
    gl.useProgram(programInfo.program);
    bindTransformFeedbackInfo(gl, programInfo, bufferInfo);
    gl.bindTransformFeedback(TRANSFORM_FEEDBACK, null);
    return tf;
}
/**
 * @typedef {Object} UniformData
 * @property {string} name The name of the uniform
 * @property {number} type The WebGL type enum for this uniform
 * @property {number} size The number of elements for this uniform
 * @property {number} blockNdx The block index this uniform appears in
 * @property {number} offset The byte offset in the block for this uniform's value
 * @memberOf module:twgl
 */ /**
 * The specification for one UniformBlockObject
 *
 * @typedef {Object} BlockSpec
 * @property {number} index The index of the block.
 * @property {number} size The size in bytes needed for the block
 * @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
 *    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
 * @property {bool} usedByVertexShader Self explanatory
 * @property {bool} usedByFragmentShader Self explanatory
 * @property {bool} used Self explanatory
 * @memberOf module:twgl
 */ /**
 * A `UniformBlockSpec` represents the data needed to create and bind
 * UniformBlockObjects for a given program
 *
 * @typedef {Object} UniformBlockSpec
 * @property {Object.<string, module:twgl.BlockSpec>} blockSpecs The BlockSpec for each block by block name
 * @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
 * @memberOf module:twgl
 */ /**
 * Creates a UniformBlockSpec for the given program.
 *
 * A UniformBlockSpec represents the data needed to create and bind
 * UniformBlockObjects
 *
 * @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
 * @param {WebGLProgram} program A WebGLProgram for a successfully linked program
 * @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
 * @memberOf module:twgl/programs
 */ function createUniformBlockSpecFromProgram(gl, program) {
    const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
    const uniformData = [];
    const uniformIndices = [];
    for(let ii = 0; ii < numUniforms; ++ii){
        uniformIndices.push(ii);
        uniformData.push({});
        const uniformInfo = gl.getActiveUniform(program, ii);
        uniformData[ii].name = uniformInfo.name;
    }
    [
        [
            "UNIFORM_TYPE",
            "type"
        ],
        [
            "UNIFORM_SIZE",
            "size"
        ],
        [
            "UNIFORM_BLOCK_INDEX",
            "blockNdx"
        ],
        [
            "UNIFORM_OFFSET",
            "offset", 
        ], 
    ].forEach(function(pair) {
        const pname = pair[0];
        const key = pair[1];
        gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
            uniformData[ndx][key] = value;
        });
    });
    const blockSpecs = {};
    const numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
    for(let ii1 = 0; ii1 < numUniformBlocks; ++ii1){
        const name = gl.getActiveUniformBlockName(program, ii1);
        const blockSpec = {
            index: gl.getUniformBlockIndex(program, name),
            usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii1, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
            usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii1, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
            size: gl.getActiveUniformBlockParameter(program, ii1, UNIFORM_BLOCK_DATA_SIZE),
            uniformIndices: gl.getActiveUniformBlockParameter(program, ii1, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
        };
        blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
        blockSpecs[name] = blockSpec;
    }
    return {
        blockSpecs: blockSpecs,
        uniformData: uniformData
    };
}
const arraySuffixRE = /\[\d+\]\.$/; // better way to check?
const pad = (v, padding)=>((v + (padding - 1)) / padding | 0) * padding;
function createUniformBlockUniformSetter(view, isArray, rows, cols) {
    if (isArray || rows) {
        cols = cols || 1;
        const numElements = view.length;
        const totalRows = numElements / 4;
        return function(value) {
            let dst = 0;
            let src = 0;
            for(let row = 0; row < totalRows; ++row){
                for(let col = 0; col < cols; ++col)view[dst++] = value[src++];
                dst += 4 - cols;
            }
        };
    } else return function(value) {
        if (value.length) view.set(value);
        else view[0] = value;
    };
}
/**
 * Represents a UniformBlockObject including an ArrayBuffer with all the uniform values
 * and a corresponding WebGLBuffer to hold those values on the GPU
 *
 * @typedef {Object} UniformBlockInfo
 * @property {string} name The name of the block
 * @property {ArrayBuffer} array The array buffer that contains the uniform values
 * @property {Float32Array} asFloat A float view on the array buffer. This is useful
 *    inspecting the contents of the buffer in the debugger.
 * @property {WebGLBuffer} buffer A WebGL buffer that will hold a copy of the uniform values for rendering.
 * @property {number} [offset] offset into buffer
 * @property {Object<string, ArrayBufferView>} uniforms A uniform name to ArrayBufferView map.
 *   each Uniform has a correctly typed `ArrayBufferView` into array at the correct offset
 *   and length of that uniform. So for example a float uniform would have a 1 float `Float32Array`
 *   view. A single mat4 would have a 16 element `Float32Array` view. An ivec2 would have an
 *   `Int32Array` view, etc.
 * @property {Object<string, function>} setters A setter for this uniform.
 *   The reason to use setters is elements of arrays are padded to vec4 sizes which
 *   means if you want to set an array of 4 floats you'd need to set 16 values
 *   (or set elements 0, 4, 8, 12). In other words
 *   `someBlockInfo.uniforms.some4FloatArrayUniform.set([0, , , , 1, , , , 2, , , , 3])`
 *   where as the setter handles just passing in [0, 1, 2, 3] either directly as in
 *   `someBlockInfo.setter.some4FloatArrayUniform.set([0, 1, 2, 3])` (not recommended)
 *   or via {@link module:twgl.setBlockUniforms}
 * @memberOf module:twgl
 */ /**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {WebGLProgram} program A WebGLProgram
 * @param {module:twgl.UniformBlockSpec} uniformBlockSpec. A UniformBlockSpec as returned
 *     from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {string} blockName The name of the block.
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */ function createUniformBlockInfoFromProgram(gl, program, uniformBlockSpec, blockName) {
    const blockSpecs = uniformBlockSpec.blockSpecs;
    const uniformData = uniformBlockSpec.uniformData;
    const blockSpec = blockSpecs[blockName];
    if (!blockSpec) {
        warn$1("no uniform block object named:", blockName);
        return {
            name: blockName,
            uniforms: {}
        };
    }
    const array = new ArrayBuffer(blockSpec.size);
    const buffer = gl.createBuffer();
    const uniformBufferIndex = blockSpec.index;
    gl.bindBuffer(UNIFORM_BUFFER, buffer);
    gl.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
    let prefix = blockName + ".";
    if (arraySuffixRE.test(prefix)) prefix = prefix.replace(arraySuffixRE, ".");
    const uniforms = {};
    const setters = {};
    const setterTree = {};
    blockSpec.uniformIndices.forEach(function(uniformNdx) {
        const data = uniformData[uniformNdx];
        let name = data.name;
        if (name.startsWith(prefix)) name = name.substr(prefix.length);
        const isArray = name.endsWith("[0]");
        if (isArray) name = name.substr(0, name.length - 3);
        const typeInfo = typeMap[data.type];
        const Type = typeInfo.Type;
        const byteLength = isArray ? pad(typeInfo.size, 16) * data.size : typeInfo.size * data.size;
        const uniformView = new Type(array, data.offset, byteLength / Type.BYTES_PER_ELEMENT);
        uniforms[name] = uniformView;
        // Note: I'm not sure what to do here. The original
        // idea was to create TypedArray views into each part
        // of the block. This is useful, for example if you have
        // a block with { mat4: model; mat4 view; mat4 projection; }
        // you'll get a Float32Array for each one suitable for
        // passing to most JS math libraries including twgl's and glMatrix.js.
        //
        // But, if you have a an array of structures, especially if that
        // array is large, you get a whole bunch of TypedArray views.
        // Every one of them has overhead and switching between them all
        // is probably a cache miss. In that case it would really be better
        // to just have one view (asFloat) and have all the setters
        // just reference the correct portion. But, then you can't easily
        // treat a matrix, or a vec4, as a standalone thing like you can
        // with all the views.
        //
        // Another problem with the views is they are not shared. With
        // uniforms you have one set of setters. With UniformBlockInfo
        // you have a set of setters *pre block instance*. That's because
        // TypedArray views can't be mapped to different buffers.
        //
        // My gut right now is if you really want the speed and compactness
        // then you should probably roll your own solution. TWGL's goal
        // here is ease of use as AFAICT there is no simple generic efficient
        // solution.
        const setter = createUniformBlockUniformSetter(uniformView, isArray, typeInfo.rows, typeInfo.cols);
        setters[name] = setter;
        addSetterToUniformTree(name, setter, setterTree, setters);
    });
    return {
        name: blockName,
        array,
        asFloat: new Float32Array(array),
        buffer,
        uniforms,
        setters
    };
}
/**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {module:twgl.ProgramInfo} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo}
 * @param {string} blockName The name of the block.
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */ function createUniformBlockInfo(gl, programInfo, blockName) {
    return createUniformBlockInfoFromProgram(gl, programInfo.program, programInfo.uniformBlockSpec, blockName);
}
/**
 * Binds a uniform block to the matching uniform block point.
 * Matches by blocks by name so blocks must have the same name not just the same
 * structure.
 *
 * If you have changed any values and you upload the values into the corresponding WebGLBuffer
 * call {@link module:twgl.setUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @return {bool} true if buffer was bound. If the programInfo has no block with the same block name
 *     no buffer is bound.
 * @memberOf module:twgl/programs
 */ function bindUniformBlock(gl, programInfo, uniformBlockInfo) {
    const uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
    const blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
    if (blockSpec) {
        const bufferBindIndex = blockSpec.index;
        gl.bindBufferRange(UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
        return true;
    }
    return false;
}
/**
 * Uploads the current uniform values to the corresponding WebGLBuffer
 * and binds that buffer to the program's corresponding bind point for the uniform block object.
 *
 * If you haven't changed any values and you only need to bind the uniform block object
 * call {@link module:twgl.bindUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @memberOf module:twgl/programs
 */ function setUniformBlock(gl, programInfo, uniformBlockInfo) {
    if (bindUniformBlock(gl, programInfo, uniformBlockInfo)) gl.bufferData(UNIFORM_BUFFER, uniformBlockInfo.array, DYNAMIC_DRAW);
}
/**
 * Sets values of a uniform block object
 *
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo A UniformBlockInfo as returned by {@link module:twgl.createUniformBlockInfo}.
 * @param {Object.<string, ?>} values A uniform name to value map where the value is correct for the given
 *    type of uniform. So for example given a block like
 *
 *       uniform SomeBlock {
 *         float someFloat;
 *         vec2 someVec2;
 *         vec3 someVec3Array[2];
 *         int someInt;
 *       }
 *
 *  You can set the values of the uniform block with
 *
 *       twgl.setBlockUniforms(someBlockInfo, {
 *          someFloat: 12.3,
 *          someVec2: [1, 2],
 *          someVec3Array: [1, 2, 3, 4, 5, 6],
 *          someInt: 5,
 *       }
 *
 *  Arrays can be JavaScript arrays or typed arrays
 *
 *  You can also fill out structure and array values either via
 *  shortcut. Example
 *
 *     // -- in shader --
 *     struct Light {
 *       float intensity;
 *       vec4 color;
 *       float nearFar[2];
 *     };
 *     uniform Lights {
 *       Light lights[2];
 *     };
 *
 *     // in JavaScript
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       lights: [
 *         { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.1, 10] },
 *         { intensity: 2.0, color: [0, 0, 1, 1], nearFar[0.2, 15] },
 *       ],
 *     });
 *
 *   or the more traditional way
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       "lights[0].intensity": 5.0,
 *       "lights[0].color": [1, 0, 0, 1],
 *       "lights[0].nearFar": [0.1, 10],
 *       "lights[1].intensity": 2.0,
 *       "lights[1].color": [0, 0, 1, 1],
 *       "lights[1].nearFar": [0.2, 15],
 *     });
 *
 *   You can also specify partial paths
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       'lights[1]': { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.2, 15] },
 *     });
 *
 *   But you can not specify leaf array indices.
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       'lights[1].nearFar[1]': 15,     // BAD! nearFar is a leaf
 *       'lights[1].nearFar': [0.2, 15], // GOOD
 *     });
 *
 *  **IMPORTANT!**, packing in a UniformBlock is unintuitive.
 *  For example the actual layout of `someVec3Array` above in memory
 *  is `1, 2, 3, unused, 4, 5, 6, unused`. twgl takes in 6 values
 *  as shown about and copies them, skipping the padding. This might
 *  be confusing if you're already familiar with Uniform blocks.
 *
 *  If you want to deal with the padding yourself you can access the array
 *  buffer views directly. eg:
 *
 *      someBlockInfo.someVec3Array.set([1, 2, 3, 0, 4, 5, 6, 0]);
 *
 *  Any name that doesn't match will be ignored
 * @memberOf module:twgl/programs
 */ function setBlockUniforms(uniformBlockInfo, values) {
    const setters = uniformBlockInfo.setters;
    for(const name in values){
        const setter = setters[name];
        if (setter) {
            const value = values[name];
            setter(value);
        }
    }
}
function setUniformTree(tree, values) {
    for(const name in values){
        const prop = tree[name];
        if (typeof prop === "function") prop(values[name]);
        else setUniformTree(tree[name], values[name]);
    }
}
/**
 * Set uniforms and binds related textures.
 *
 * example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs"]);
 *
 *     const tex1 = gl.createTexture();
 *     const tex2 = gl.createTexture();
 *
 *     ... assume we setup the textures with data ...
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     gl.useProgram(program);
 *
 * This will automatically bind the textures AND set the
 * uniforms.
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *
 * For the example above it is equivalent to
 *
 *     var texUnit = 0;
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex1);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex2);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
 *     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
 *     gl.uniformMatrix4fv(u_someMatrix, false, [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ]);
 *
 * Note it is perfectly reasonable to call `setUniforms` multiple times. For example
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *     };
 *
 *     const moreUniforms {
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *     twgl.setUniforms(programInfo, moreUniforms);
 *
 * You can also add WebGLSamplers to uniform samplers as in
 *
 *     const uniforms = {
 *       u_someSampler: {
 *         texture: someWebGLTexture,
 *         sampler: someWebGLSampler,
 *       },
 *     };
 *
 * In which case both the sampler and texture will be bound to the
 * same unit.
 *
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 *        uniforms.
 *   You can pass multiple objects by putting them in an array or by calling with more arguments.For example
 *
 *     const sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     const localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     twgl.setUniforms(programInfo, sharedUniforms, localUniforms);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, [sharedUniforms, localUniforms]);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, sharedUniforms);
 *     twgl.setUniforms(programInfo, localUniforms};
 *
 *   You can also fill out structure and array values either via
 *   shortcut. Example
 *
 *     // -- in shader --
 *     struct Light {
 *       float intensity;
 *       vec4 color;
 *       float nearFar[2];
 *     };
 *     uniform Light lights[2];
 *
 *     // in JavaScript
 *
 *     twgl.setUniforms(programInfo, {
 *       lights: [
 *         { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.1, 10] },
 *         { intensity: 2.0, color: [0, 0, 1, 1], nearFar[0.2, 15] },
 *       ],
 *     });
 *
 *   or the more traditional way
 *
 *     twgl.setUniforms(programInfo, {
 *       "lights[0].intensity": 5.0,
 *       "lights[0].color": [1, 0, 0, 1],
 *       "lights[0].nearFar": [0.1, 10],
 *       "lights[1].intensity": 2.0,
 *       "lights[1].color": [0, 0, 1, 1],
 *       "lights[1].nearFar": [0.2, 15],
 *     });
 *
 *   You can also specify partial paths
 *
 *     twgl.setUniforms(programInfo, {
 *       'lights[1]': { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.2, 15] },
 *     });
 *
 *   But you can not specify leaf array indices
 *
 *     twgl.setUniforms(programInfo, {
 *       'lights[1].nearFar[1]': 15,     // BAD! nearFar is a leaf
 *       'lights[1].nearFar': [0.2, 15], // GOOD
 *     });
 *
 * @memberOf module:twgl/programs
 */ function setUniforms(setters, ...args) {
    const actualSetters = setters.uniformSetters || setters;
    const numArgs = args.length;
    for(let aNdx = 0; aNdx < numArgs; ++aNdx){
        const values = args[aNdx];
        if (Array.isArray(values)) {
            const numValues = values.length;
            for(let ii = 0; ii < numValues; ++ii)setUniforms(actualSetters, values[ii]);
        } else for(const name in values){
            const setter = actualSetters[name];
            if (setter) setter(values[name]);
        }
    }
}
/**
 * Alias for `setUniforms`
 * @function
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 * @memberOf module:twgl/programs
 */ const setUniformsAndBindTextures = setUniforms;
/**
 * Creates setter functions for all attributes of a shader
 * program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
 *
 * @see {@link module:twgl.setAttributes} for example
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @return {Object.<string, function>} an object with a setter for each attribute by name.
 * @memberOf module:twgl/programs
 */ function createAttributeSetters(gl, program) {
    const attribSetters = {};
    const numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
    for(let ii = 0; ii < numAttribs; ++ii){
        const attribInfo = gl.getActiveAttrib(program, ii);
        if (isBuiltIn(attribInfo)) continue;
        const index = gl.getAttribLocation(program, attribInfo.name);
        const typeInfo = attrTypeMap[attribInfo.type];
        const setter = typeInfo.setter(gl, index, typeInfo);
        setter.location = index;
        attribSetters[attribInfo.name] = setter;
    }
    return attribSetters;
}
/**
 * Sets attributes and binds buffers (deprecated... use {@link module:twgl.setBuffersAndAttributes})
 *
 * Example:
 *
 *     const program = createProgramFromScripts(
 *         gl, ["some-vs", "some-fs");
 *
 *     const attribSetters = createAttributeSetters(program);
 *
 *     const positionBuffer = gl.createBuffer();
 *     const texcoordBuffer = gl.createBuffer();
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *     };
 *
 *     gl.useProgram(program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setAttributes(attribSetters, attribs);
 *
 * Properties of attribs. For each attrib you can add
 * properties:
 *
 * *   type: the type of data in the buffer. Default = gl.FLOAT
 * *   normalize: whether or not to normalize the data. Default = false
 * *   stride: the stride. Default = 0
 * *   offset: offset into the buffer. Default = 0
 * *   divisor: the divisor for instances. Default = undefined
 *
 * For example if you had 3 value float positions, 2 value
 * float texcoord and 4 value uint8 colors you'd setup your
 * attribs like this
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *       a_color: {
 *         buffer: colorBuffer,
 *         numComponents: 4,
 *         type: gl.UNSIGNED_BYTE,
 *         normalize: true,
 *       },
 *     };
 *
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} buffers AttribInfos mapped by attribute name.
 * @memberOf module:twgl/programs
 * @deprecated use {@link module:twgl.setBuffersAndAttributes}
 * @private
 */ function setAttributes(setters, buffers) {
    for(const name in buffers){
        const setter = setters[name];
        if (setter) setter(buffers[name]);
    }
}
/**
 * Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
 *
 * Example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs");
 *
 *     const arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *     };
 *
 *     const bufferInfo = createBufferInfoFromArrays(gl, arrays);
 *
 *     gl.useProgram(programInfo.program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setBuffersAndAttributes(gl, programInfo, bufferInfo);
 *
 * For the example above it is equivalent to
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 *     gl.enableVertexAttribArray(a_positionLocation);
 *     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
 *     gl.enableVertexAttribArray(a_texcoordLocation);
 *     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters A `ProgramInfo` as returned from {@link module:twgl.createProgramInfo} or Attribute setters as returned from {@link module:twgl.createAttributeSetters}
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} buffers a `BufferInfo` as returned from {@link module:twgl.createBufferInfoFromArrays}.
 *   or a `VertexArrayInfo` as returned from {@link module:twgl.createVertexArrayInfo}
 * @memberOf module:twgl/programs
 */ function setBuffersAndAttributes(gl, programInfo, buffers) {
    if (buffers.vertexArrayObject) gl.bindVertexArray(buffers.vertexArrayObject);
    else {
        setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
        if (buffers.indices) gl.bindBuffer(ELEMENT_ARRAY_BUFFER$1, buffers.indices);
    }
}
/**
 * @typedef {Object} ProgramInfo
 * @property {WebGLProgram} program A shader program
 * @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
 * @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
 * @property {module:twgl.UniformBlockSpec} [uniformBlockSpec] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
 * @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
 * @memberOf module:twgl
 */ /**
 * Creates a ProgramInfo from an existing program.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {module:twgl.ProgramInfo} The created ProgramInfo.
 * @memberOf module:twgl/programs
 */ function createProgramInfoFromProgram(gl, program) {
    const uniformSetters = createUniformSetters(gl, program);
    const attribSetters = createAttributeSetters(gl, program);
    const programInfo = {
        program,
        uniformSetters,
        attribSetters
    };
    if (isWebGL2(gl)) {
        programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
        programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
    }
    return programInfo;
}
const notIdRE = /\s|{|}|;/;
/**
 * Creates a ProgramInfo from 2 sources.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramInfo(gl, [vs, fs], options);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders or ids. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
 * @memberOf module:twgl/programs
 */ function createProgramInfo(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const errors = [];
    shaderSources = shaderSources.map(function(source) {
        // Lets assume if there is no \n it's an id
        if (!notIdRE.test(source)) {
            const script = getElementById(source);
            if (!script) {
                const err = `no element with id: ${source}`;
                progOptions.errorCallback(err);
                errors.push(err);
            } else source = script.text;
        }
        return source;
    });
    if (errors.length) return reportError(progOptions, "");
    const origCallback = progOptions.callback;
    if (origCallback) progOptions.callback = (err, program)=>{
        let programInfo;
        if (!err) programInfo = createProgramInfoFromProgram(gl, program);
        origCallback(err, programInfo);
    };
    const program = createProgramFromSources(gl, shaderSources, progOptions);
    if (!program) return null;
    return createProgramInfoFromProgram(gl, program);
}
var programs = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createAttributeSetters: createAttributeSetters,
    createProgram: createProgram,
    createProgramAsync: createProgramAsync,
    createProgramFromScripts: createProgramFromScripts,
    createProgramFromSources: createProgramFromSources,
    createProgramInfo: createProgramInfo,
    createProgramInfoAsync: createProgramInfoAsync,
    createProgramInfoFromProgram: createProgramInfoFromProgram,
    createUniformSetters: createUniformSetters,
    createUniformBlockSpecFromProgram: createUniformBlockSpecFromProgram,
    createUniformBlockInfoFromProgram: createUniformBlockInfoFromProgram,
    createUniformBlockInfo: createUniformBlockInfo,
    createTransformFeedback: createTransformFeedback,
    createTransformFeedbackInfo: createTransformFeedbackInfo,
    bindTransformFeedbackInfo: bindTransformFeedbackInfo,
    setAttributes: setAttributes,
    setBuffersAndAttributes: setBuffersAndAttributes,
    setUniforms: setUniforms,
    setUniformsAndBindTextures: setUniformsAndBindTextures,
    setUniformBlock: setUniformBlock,
    setBlockUniforms: setBlockUniforms,
    bindUniformBlock: bindUniformBlock
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const TRIANGLES = 0x0004;
const UNSIGNED_SHORT$3 = 0x1403;
/**
 * Drawing related functions
 *
 * For backward compatibility they are available at both `twgl.draw` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/draw
 */ /**
 * Calls `gl.drawElements` or `gl.drawArrays`, whichever is appropriate
 *
 * normally you'd call `gl.drawElements` or `gl.drawArrays` yourself
 * but calling this means if you switch from indexed data to non-indexed
 * data you don't have to remember to update your draw call.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} bufferInfo A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays} or
 *   a VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @param {number} [type] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...). Defaults to `gl.TRIANGLES`
 * @param {number} [count] An optional count. Defaults to bufferInfo.numElements
 * @param {number} [offset] An optional offset. Defaults to 0.
 * @param {number} [instanceCount] An optional instanceCount. if set then `drawArraysInstanced` or `drawElementsInstanced` will be called
 * @memberOf module:twgl/draw
 */ function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
    type = type === undefined ? TRIANGLES : type;
    const indices = bufferInfo.indices;
    const elementType = bufferInfo.elementType;
    const numElements = count === undefined ? bufferInfo.numElements : count;
    offset = offset === undefined ? 0 : offset;
    if (elementType || indices) {
        if (instanceCount !== undefined) gl.drawElementsInstanced(type, numElements, elementType === undefined ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset, instanceCount);
        else gl.drawElements(type, numElements, elementType === undefined ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset);
    } else if (instanceCount !== undefined) gl.drawArraysInstanced(type, offset, numElements, instanceCount);
    else gl.drawArrays(type, offset, numElements);
}
/**
 * A DrawObject is useful for putting objects in to an array and passing them to {@link module:twgl.drawObjectList}.
 *
 * You need either a `BufferInfo` or a `VertexArrayInfo`.
 *
 * @typedef {Object} DrawObject
 * @property {boolean} [active] whether or not to draw. Default = `true` (must be `false` to be not true). In other words `undefined` = `true`
 * @property {number} [type] type to draw eg. `gl.TRIANGLES`, `gl.LINES`, etc...
 * @property {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @property {module:twgl.BufferInfo} [bufferInfo] A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays}
 * @property {module:twgl.VertexArrayInfo} [vertexArrayInfo] A VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @property {Object<string, ?>} uniforms The values for the uniforms.
 *   You can pass multiple objects by putting them in an array. For example
 *
 *     var sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     var localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     var drawObj = {
 *       ...
 *       uniforms: [sharedUniforms, localUniforms],
 *     };
 *
 * @property {number} [offset] the offset to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to 0.
 * @property {number} [count] the count to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to bufferInfo.numElements.
 * @property {number} [instanceCount] the number of instances. Defaults to undefined.
 * @memberOf module:twgl
 */ /**
 * Draws a list of objects
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {DrawObject[]} objectsToDraw an array of objects to draw.
 * @memberOf module:twgl/draw
 */ function drawObjectList(gl, objectsToDraw) {
    let lastUsedProgramInfo = null;
    let lastUsedBufferInfo = null;
    objectsToDraw.forEach(function(object) {
        if (object.active === false) return;
        const programInfo = object.programInfo;
        const bufferInfo = object.vertexArrayInfo || object.bufferInfo;
        let bindBuffers = false;
        const type = object.type === undefined ? TRIANGLES : object.type;
        if (programInfo !== lastUsedProgramInfo) {
            lastUsedProgramInfo = programInfo;
            gl.useProgram(programInfo.program);
            // We have to rebind buffers when changing programs because we
            // only bind buffers the program uses. So if 2 programs use the same
            // bufferInfo but the 1st one uses only positions the when the
            // we switch to the 2nd one some of the attributes will not be on.
            bindBuffers = true;
        }
        // Setup all the needed attributes.
        if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
            if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) gl.bindVertexArray(null);
            lastUsedBufferInfo = bufferInfo;
            setBuffersAndAttributes(gl, programInfo, bufferInfo);
        }
        // Set the uniforms.
        setUniforms(programInfo, object.uniforms);
        // Draw
        drawBufferInfo(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
    });
    if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) gl.bindVertexArray(null);
}
var draw = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    drawBufferInfo: drawBufferInfo,
    drawObjectList: drawObjectList
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const FRAMEBUFFER = 0x8d40;
const RENDERBUFFER = 0x8d41;
const TEXTURE_2D$2 = 0x0de1;
const UNSIGNED_BYTE$3 = 0x1401;
/* PixelFormat */ const DEPTH_COMPONENT$1 = 0x1902;
const RGBA$1 = 0x1908;
const DEPTH_COMPONENT24$1 = 0x81a6;
const DEPTH_COMPONENT32F$1 = 0x8cac;
const DEPTH24_STENCIL8$1 = 0x88f0;
const DEPTH32F_STENCIL8$1 = 0x8cad;
/* Framebuffer Object. */ const RGBA4$1 = 0x8056;
const RGB5_A1$1 = 0x8057;
const RGB565$1 = 0x8D62;
const DEPTH_COMPONENT16$1 = 0x81A5;
const STENCIL_INDEX = 0x1901;
const STENCIL_INDEX8 = 0x8D48;
const DEPTH_STENCIL$1 = 0x84F9;
const COLOR_ATTACHMENT0 = 0x8CE0;
const DEPTH_ATTACHMENT = 0x8D00;
const STENCIL_ATTACHMENT = 0x8D20;
const DEPTH_STENCIL_ATTACHMENT = 0x821A;
/* TextureWrapMode */ const CLAMP_TO_EDGE$1 = 0x812F;
/* TextureMagFilter */ const LINEAR$1 = 0x2601;
/**
 * The options for a framebuffer attachment.
 *
 * Note: For a `format` that is a texture include all the texture
 * options from {@link module:twgl.TextureOptions} for example
 * `min`, `mag`, `clamp`, etc... Note that unlike {@link module:twgl.TextureOptions}
 * `auto` defaults to `false` for attachment textures but `min` and `mag` default
 * to `gl.LINEAR` and `wrap` defaults to `CLAMP_TO_EDGE`
 *
 * @typedef {Object} AttachmentOptions
 * @property {number} [attachmentPoint] The attachment point. Defaults
 *   to `gl.COLOR_ATTACHMENT0 + ndx` unless type is a depth or stencil type
 *   then it's gl.DEPTH_ATTACHMENT or `gl.DEPTH_STENCIL_ATTACHMENT` depending
 *   on the format or attachment type.
 * @property {number} [format] The format. If one of `gl.RGBA4`,
 *   `gl.RGB565`, `gl.RGB5_A1`, `gl.DEPTH_COMPONENT16`,
 *   `gl.STENCIL_INDEX8` or `gl.DEPTH_STENCIL` then will create a
 *   renderbuffer. Otherwise will create a texture. Default = `gl.RGBA`
 * @property {number} [type] The type. Used for texture. Default = `gl.UNSIGNED_BYTE`.
 * @property {number} [target] The texture target for `gl.framebufferTexture2D`.
 *   Defaults to `gl.TEXTURE_2D`. Set to appropriate face for cube maps.
 * @property {number} [samples] The number of samples. Default = 1
 * @property {number} [level] level for `gl.framebufferTexture2D`. Defaults to 0.
 * @property {number} [layer] layer for `gl.framebufferTextureLayer`. Defaults to undefined.
 *   If set then `gl.framebufferTextureLayer` is called, if not then `gl.framebufferTexture2D`
 * @property {(WebGLRenderbuffer | WebGLTexture)} [attachment] An existing renderbuffer or texture.
 *    If provided will attach this Object. This allows you to share
 *    attachments across framebuffers.
 * @memberOf module:twgl
 * @mixes module:twgl.TextureOptions
 */ const defaultAttachments = [
    {
        format: RGBA$1,
        type: UNSIGNED_BYTE$3,
        min: LINEAR$1,
        wrap: CLAMP_TO_EDGE$1
    },
    {
        format: DEPTH_STENCIL$1
    }, 
];
const attachmentsByFormat = {};
attachmentsByFormat[DEPTH_STENCIL$1] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT16$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT24$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT32F$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH24_STENCIL8$1] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH32F_STENCIL8$1] = DEPTH_STENCIL_ATTACHMENT;
function getAttachmentPointForFormat(format, internalFormat) {
    return attachmentsByFormat[format] || attachmentsByFormat[internalFormat];
}
const renderbufferFormats = {};
renderbufferFormats[RGBA4$1] = true;
renderbufferFormats[RGB5_A1$1] = true;
renderbufferFormats[RGB565$1] = true;
renderbufferFormats[DEPTH_STENCIL$1] = true;
renderbufferFormats[DEPTH_COMPONENT16$1] = true;
renderbufferFormats[STENCIL_INDEX] = true;
renderbufferFormats[STENCIL_INDEX8] = true;
function isRenderbufferFormat(format) {
    return renderbufferFormats[format];
}
const MAX_COLOR_ATTACHMENT_POINTS = 32; // even an 3090 only supports 8 but WebGL/OpenGL ES define constants for 32
function isColorAttachmentPoint(attachmentPoint) {
    return attachmentPoint >= COLOR_ATTACHMENT0 && attachmentPoint < COLOR_ATTACHMENT0 + MAX_COLOR_ATTACHMENT_POINTS;
}
/**
 * @typedef {Object} FramebufferInfo
 * @property {WebGLFramebuffer} framebuffer The WebGLFramebuffer for this framebufferInfo
 * @property {Array.<(WebGLRenderbuffer | WebGLTexture)>} attachments The created attachments in the same order as passed in to {@link module:twgl.createFramebufferInfo}.
 * @property {number} width The width of the framebuffer and its attachments
 * @property {number} height The width of the framebuffer and its attachments
 * @memberOf module:twgl
 */ /**
 * Creates a framebuffer and attachments.
 *
 * This returns a {@link module:twgl.FramebufferInfo} because it needs to return the attachments as well as the framebuffer.
 * It also leaves the framebuffer it just created as the currently bound `FRAMEBUFFER`.
 * Note: If this is WebGL2 or if you called {@link module:twgl.addExtensionsToContext} then it will set the drawBuffers
 * to `[COLOR_ATTACHMENT0, COLOR_ATTACHMENT1, ...]` for how ever many color attachments were created.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 * Passing in a specific size
 *
 *     const width = 256;
 *     const height = 256;
 *     const fbi = twgl.createFramebufferInfo(gl, attachments, width, height);
 *
 * **Note!!** It is up to you to check if the framebuffer is renderable by calling `gl.checkFramebufferStatus`.
 * [WebGL1 only guarantees 3 combinations of attachments work](https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.6).
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.AttachmentOptions[]} [attachments] which attachments to create. If not provided the default is a framebuffer with an
 *    `RGBA`, `UNSIGNED_BYTE` texture `COLOR_ATTACHMENT0` and a `DEPTH_STENCIL` renderbuffer `DEPTH_STENCIL_ATTACHMENT`.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @return {module:twgl.FramebufferInfo} the framebuffer and attachments.
 * @memberOf module:twgl/framebuffers
 */ function createFramebufferInfo(gl, attachments, width, height) {
    const target = FRAMEBUFFER;
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(target, fb);
    width = width || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;
    attachments = attachments || defaultAttachments;
    const usedColorAttachmentsPoints = [];
    const framebufferInfo = {
        framebuffer: fb,
        attachments: [],
        width: width,
        height: height
    };
    attachments.forEach(function(attachmentOptions, i) {
        let attachment = attachmentOptions.attachment;
        const samples = attachmentOptions.samples;
        const format = attachmentOptions.format;
        let attachmentPoint = attachmentOptions.attachmentPoint || getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
        if (!attachmentPoint) attachmentPoint = COLOR_ATTACHMENT0 + i;
        if (isColorAttachmentPoint(attachmentPoint)) usedColorAttachmentsPoints.push(attachmentPoint);
        if (!attachment) {
            if (samples !== undefined || isRenderbufferFormat(format)) {
                attachment = gl.createRenderbuffer();
                gl.bindRenderbuffer(RENDERBUFFER, attachment);
                if (samples > 1) gl.renderbufferStorageMultisample(RENDERBUFFER, samples, format, width, height);
                else gl.renderbufferStorage(RENDERBUFFER, format, width, height);
            } else {
                const textureOptions = Object.assign({}, attachmentOptions);
                textureOptions.width = width;
                textureOptions.height = height;
                if (textureOptions.auto === undefined) {
                    textureOptions.auto = false;
                    textureOptions.min = textureOptions.min || textureOptions.minMag || LINEAR$1;
                    textureOptions.mag = textureOptions.mag || textureOptions.minMag || LINEAR$1;
                    textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || CLAMP_TO_EDGE$1;
                    textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || CLAMP_TO_EDGE$1;
                }
                attachment = createTexture(gl, textureOptions);
            }
        }
        if (isRenderbuffer(gl, attachment)) gl.framebufferRenderbuffer(target, attachmentPoint, RENDERBUFFER, attachment);
        else if (isTexture(gl, attachment)) {
            if (attachmentOptions.layer !== undefined) gl.framebufferTextureLayer(target, attachmentPoint, attachment, attachmentOptions.level || 0, attachmentOptions.layer);
            else gl.framebufferTexture2D(target, attachmentPoint, attachmentOptions.target || TEXTURE_2D$2, attachment, attachmentOptions.level || 0);
        } else throw new Error("unknown attachment type");
        framebufferInfo.attachments.push(attachment);
    });
    if (gl.drawBuffers) gl.drawBuffers(usedColorAttachmentsPoints);
    return framebufferInfo;
}
/**
 * Resizes the attachments of a framebuffer.
 *
 * You need to pass in the same `attachments` as you passed in {@link module:twgl.createFramebufferInfo}
 * because TWGL has no idea the format/type of each attachment.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments
 *         twgl.resizeFramebufferInfo(gl, fbi);
 *       }
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments to match
 *         twgl.resizeFramebufferInfo(gl, fbi, attachments);
 *       }
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo} framebufferInfo a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 * @param {module:twgl.AttachmentOptions[]} [attachments] the same attachments options as passed to {@link module:twgl.createFramebufferInfo}.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @memberOf module:twgl/framebuffers
 */ function resizeFramebufferInfo(gl, framebufferInfo, attachments, width, height) {
    width = width || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;
    framebufferInfo.width = width;
    framebufferInfo.height = height;
    attachments = attachments || defaultAttachments;
    attachments.forEach(function(attachmentOptions, ndx) {
        const attachment = framebufferInfo.attachments[ndx];
        const format = attachmentOptions.format;
        const samples = attachmentOptions.samples;
        if (samples !== undefined || isRenderbuffer(gl, attachment)) {
            gl.bindRenderbuffer(RENDERBUFFER, attachment);
            if (samples > 1) gl.renderbufferStorageMultisample(RENDERBUFFER, samples, format, width, height);
            else gl.renderbufferStorage(RENDERBUFFER, format, width, height);
        } else if (isTexture(gl, attachment)) resizeTexture(gl, attachment, attachmentOptions, width, height);
        else throw new Error("unknown attachment type");
    });
}
/**
 * Binds a framebuffer
 *
 * This function pretty much solely exists because I spent hours
 * trying to figure out why something I wrote wasn't working only
 * to realize I forget to set the viewport dimensions.
 * My hope is this function will fix that.
 *
 * It is effectively the same as
 *
 *     gl.bindFramebuffer(gl.FRAMEBUFFER, someFramebufferInfo.framebuffer);
 *     gl.viewport(0, 0, someFramebufferInfo.width, someFramebufferInfo.height);
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo|null} [framebufferInfo] a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 *   If falsy will bind the canvas.
 * @param {number} [target] The target. If not passed `gl.FRAMEBUFFER` will be used.
 * @memberOf module:twgl/framebuffers
 */ function bindFramebufferInfo(gl, framebufferInfo, target) {
    target = target || FRAMEBUFFER;
    if (framebufferInfo) {
        gl.bindFramebuffer(target, framebufferInfo.framebuffer);
        gl.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
    } else {
        gl.bindFramebuffer(target, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
}
var framebuffers = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    bindFramebufferInfo: bindFramebufferInfo,
    createFramebufferInfo: createFramebufferInfo,
    resizeFramebufferInfo: resizeFramebufferInfo
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * vertex array object related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.attributes` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/vertexArrays
 */ const ELEMENT_ARRAY_BUFFER$2 = 0x8893;
/**
 * @typedef {Object} VertexArrayInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLVertexArrayObject} [vertexArrayObject] a vertex array object
 * @memberOf module:twgl
 */ /**
 * Creates a VertexArrayInfo from a BufferInfo and one or more ProgramInfos
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * > **IMPORTANT:** Vertex Array Objects are **not** a direct analog for a BufferInfo. Vertex Array Objects
 *   assign buffers to specific attributes at creation time. That means they can only be used with programs
 *   who's attributes use the same attribute locations for the same purposes.
 *
 * > Bind your attribute locations by passing an array of attribute names to {@link module:twgl.createProgramInfo}
 *   or use WebGL 2's GLSL ES 3's `layout(location = <num>)` to make sure locations match.
 *
 * also
 *
 * > **IMPORTANT:** After calling twgl.setBuffersAndAttribute with a BufferInfo that uses a Vertex Array Object
 *   that Vertex Array Object will be bound. That means **ANY MANIPULATION OF ELEMENT_ARRAY_BUFFER or ATTRIBUTES**
 *   will affect the Vertex Array Object state.
 *
 * > Call `gl.bindVertexArray(null)` to get back manipulating the global attributes and ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.ProgramInfo|module:twgl.ProgramInfo[]} programInfo a programInfo or array of programInfos
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 *
 *    You need to make sure every attribute that will be used is bound. So for example assume shader 1
 *    uses attributes A, B, C and shader 2 uses attributes A, B, D. If you only pass in the programInfo
 *    for shader 1 then only attributes A, B, and C will have their attributes set because TWGL doesn't
 *    now attribute D's location.
 *
 *    So, you can pass in both shader 1 and shader 2's programInfo
 *
 * @return {module:twgl.VertexArrayInfo} The created VertexArrayInfo
 *
 * @memberOf module:twgl/vertexArrays
 */ function createVertexArrayInfo(gl, programInfos, bufferInfo) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    if (!programInfos.length) programInfos = [
        programInfos
    ];
    programInfos.forEach(function(programInfo) {
        setBuffersAndAttributes(gl, programInfo, bufferInfo);
    });
    gl.bindVertexArray(null);
    return {
        numElements: bufferInfo.numElements,
        elementType: bufferInfo.elementType,
        vertexArrayObject: vao
    };
}
/**
 * Creates a vertex array object and then sets the attributes on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} attribs AttribInfos mapped by attribute name.
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 *
 * @return {WebGLVertexArrayObject|null} The created WebGLVertexArrayObject
 *
 * @memberOf module:twgl/vertexArrays
 */ function createVAOAndSetAttributes(gl, setters, attribs, indices) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    setAttributes(setters, attribs);
    if (indices) gl.bindBuffer(ELEMENT_ARRAY_BUFFER$2, indices);
    // We unbind this because otherwise any change to ELEMENT_ARRAY_BUFFER
    // like when creating buffers for other stuff will mess up this VAO's binding
    gl.bindVertexArray(null);
    return vao;
}
/**
 * Creates a vertex array object and then sets the attributes
 * on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {Object.<string, function>| module:twgl.ProgramInfo} programInfo as returned from createProgramInfo or Attribute setters as returned from createAttributeSetters
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 *
 * @return {WebGLVertexArrayObject|null} The created WebGLVertexArrayObject
 *
 * @memberOf module:twgl/vertexArrays
 */ function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
    return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
}
var vertexArrays = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createVertexArrayInfo: createVertexArrayInfo,
    createVAOAndSetAttributes: createVAOAndSetAttributes,
    createVAOFromBufferInfo: createVAOFromBufferInfo
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const defaults$2 = {
    addExtensionsToContext: true
};
/**
 * Various default settings for twgl.
 *
 * Note: You can call this any number of times. Example:
 *
 *     twgl.setDefaults({ textureColor: [1, 0, 0, 1] });
 *     twgl.setDefaults({ attribPrefix: 'a_' });
 *
 * is equivalent to
 *
 *     twgl.setDefaults({
 *       textureColor: [1, 0, 0, 1],
 *       attribPrefix: 'a_',
 *     });
 *
 * @typedef {Object} Defaults
 * @property {string} [attribPrefix] The prefix to stick on attributes
 *
 *   When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 *   as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 *   In other words I'll create arrays of geometry like this
 *
 *       const arrays = {
 *         position: ...
 *         normal: ...
 *         texcoord: ...
 *       };
 *
 *   But need those mapped to attributes and my attributes start with `a_`.
 *
 *   Default: `""`
 *
 * @property {number[]} [textureColor] Array of 4 values in the range 0 to 1
 *
 *   The default texture color is used when loading textures from
 *   urls. Because the URL will be loaded async we'd like to be
 *   able to use the texture immediately. By putting a 1x1 pixel
 *   color in the texture we can start using the texture before
 *   the URL has loaded.
 *
 *   Default: `[0.5, 0.75, 1, 1]`
 *
 * @property {string} [crossOrigin]
 *
 *   If not undefined sets the crossOrigin attribute on images
 *   that twgl creates when downloading images for textures.
 *
 *   Also see {@link module:twgl.TextureOptions}.
 *
 * @property {bool} [addExtensionsToContext]
 *
 *   If true, then, when twgl will try to add any supported WebGL extensions
 *   directly to the context under their normal GL names. For example
 *   if ANGLE_instances_arrays exists then twgl would enable it,
 *   add the functions `vertexAttribDivisor`, `drawArraysInstanced`,
 *   `drawElementsInstanced`, and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR`
 *   to the `WebGLRenderingContext`.
 *
 * @memberOf module:twgl
 */ /**
 * Sets various defaults for twgl.
 *
 * In the interest of terseness which is kind of the point
 * of twgl I've integrated a few of the older functions here
 *
 * @param {module:twgl.Defaults} newDefaults The default settings.
 * @memberOf module:twgl
 */ function setDefaults$2(newDefaults) {
    copyExistingProperties(newDefaults, defaults$2);
    setDefaults(newDefaults); // eslint-disable-line
    setDefaults$1(newDefaults); // eslint-disable-line
}
const prefixRE = /^(.*?)_/;
function addExtensionToContext(gl, extensionName) {
    glEnumToString(gl, 0);
    const ext = gl.getExtension(extensionName);
    if (ext) {
        const enums = {};
        const fnSuffix = prefixRE.exec(extensionName)[1];
        const enumSuffix = "_" + fnSuffix;
        for(const key in ext){
            const value = ext[key];
            const isFunc = typeof value === "function";
            const suffix = isFunc ? fnSuffix : enumSuffix;
            let name = key;
            // examples of where this is not true are WEBGL_compressed_texture_s3tc
            // and WEBGL_compressed_texture_pvrtc
            if (key.endsWith(suffix)) name = key.substring(0, key.length - suffix.length);
            if (gl[name] !== undefined) {
                if (!isFunc && gl[name] !== value) warn(name, gl[name], value, key);
            } else if (isFunc) gl[name] = function(origFn) {
                return function() {
                    return origFn.apply(ext, arguments);
                };
            }(value);
            else {
                gl[name] = value;
                enums[name] = value;
            }
        }
        // pass the modified enums to glEnumToString
        enums.constructor = {
            name: ext.constructor.name
        };
        glEnumToString(enums, 0);
    }
    return ext;
}
/*
 * If you're wondering why the code doesn't just iterate
 * over all extensions using `gl.getExtensions` is that it's possible
 * some future extension is incompatible with this code. Rather than
 * have thing suddenly break it seems better to manually add to this
 * list.
 *
 */ const supportedExtensions = [
    "ANGLE_instanced_arrays",
    "EXT_blend_minmax",
    "EXT_color_buffer_float",
    "EXT_color_buffer_half_float",
    "EXT_disjoint_timer_query",
    "EXT_disjoint_timer_query_webgl2",
    "EXT_frag_depth",
    "EXT_sRGB",
    "EXT_shader_texture_lod",
    "EXT_texture_filter_anisotropic",
    "OES_element_index_uint",
    "OES_standard_derivatives",
    "OES_texture_float",
    "OES_texture_float_linear",
    "OES_texture_half_float",
    "OES_texture_half_float_linear",
    "OES_vertex_array_object",
    "WEBGL_color_buffer_float",
    "WEBGL_compressed_texture_atc",
    "WEBGL_compressed_texture_etc1",
    "WEBGL_compressed_texture_pvrtc",
    "WEBGL_compressed_texture_s3tc",
    "WEBGL_compressed_texture_s3tc_srgb",
    "WEBGL_depth_texture",
    "WEBGL_draw_buffers", 
];
/**
 * Attempts to enable all of the following extensions
 * and add their functions and constants to the
 * `WebGLRenderingContext` using their normal non-extension like names.
 *
 *      ANGLE_instanced_arrays
 *      EXT_blend_minmax
 *      EXT_color_buffer_float
 *      EXT_color_buffer_half_float
 *      EXT_disjoint_timer_query
 *      EXT_disjoint_timer_query_webgl2
 *      EXT_frag_depth
 *      EXT_sRGB
 *      EXT_shader_texture_lod
 *      EXT_texture_filter_anisotropic
 *      OES_element_index_uint
 *      OES_standard_derivatives
 *      OES_texture_float
 *      OES_texture_float_linear
 *      OES_texture_half_float
 *      OES_texture_half_float_linear
 *      OES_vertex_array_object
 *      WEBGL_color_buffer_float
 *      WEBGL_compressed_texture_atc
 *      WEBGL_compressed_texture_etc1
 *      WEBGL_compressed_texture_pvrtc
 *      WEBGL_compressed_texture_s3tc
 *      WEBGL_compressed_texture_s3tc_srgb
 *      WEBGL_depth_texture
 *      WEBGL_draw_buffers
 *
 * For example if `ANGLE_instanced_arrays` exists then the functions
 * `drawArraysInstanced`, `drawElementsInstanced`, `vertexAttribDivisor`
 * and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR` are added to the
 * `WebGLRenderingContext`.
 *
 * Note that if you want to know if the extension exists you should
 * probably call `gl.getExtension` for each extension. Alternatively
 * you can check for the existence of the functions or constants that
 * are expected to be added. For example
 *
 *    if (gl.drawBuffers) {
 *      // Either WEBGL_draw_buffers was enabled OR you're running in WebGL2
 *      ....
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @memberOf module:twgl
 */ function addExtensionsToContext(gl) {
    for(let ii = 0; ii < supportedExtensions.length; ++ii)addExtensionToContext(gl, supportedExtensions[ii]);
}
/**
 * Creates a webgl context.
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 * @private
 */ function create3DContext(canvas, opt_attribs) {
    const names = [
        "webgl",
        "experimental-webgl"
    ];
    let context = null;
    for(let ii = 0; ii < names.length; ++ii){
        context = canvas.getContext(names[ii], opt_attribs);
        if (context) {
            if (defaults$2.addExtensionsToContext) addExtensionsToContext(context);
            break;
        }
    }
    return context;
}
/**
 * Gets a WebGL1 context.
 *
 * Note: Will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 * @deprecated
 * @private
 */ function getWebGLContext(canvas, opt_attribs) {
    const gl = create3DContext(canvas, opt_attribs);
    return gl;
}
/**
 * Creates a webgl context.
 *
 * Will return a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *     twgl.isWebGL2(gl);
 *
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 */ function createContext(canvas, opt_attribs) {
    const names = [
        "webgl2",
        "webgl",
        "experimental-webgl"
    ];
    let context = null;
    for(let ii = 0; ii < names.length; ++ii){
        context = canvas.getContext(names[ii], opt_attribs);
        if (context) {
            if (defaults$2.addExtensionsToContext) addExtensionsToContext(context);
            break;
        }
    }
    return context;
}
/**
 * Gets a WebGL context.  Will create a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *    function isWebGL2(gl) {
 *      return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0 ") == 0;
 *    }
 *
 * Note: For a WebGL1 context will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 */ function getContext(canvas, opt_attribs) {
    const gl = createContext(canvas, opt_attribs);
    return gl;
}
/**
 * Resize a canvas to match the size it's displayed.
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] So you can pass in `window.devicePixelRatio` or other scale value if you want to.
 * @return {boolean} true if the canvas was resized.
 * @memberOf module:twgl
 */ function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    multiplier = Math.max(0, multiplier);
    const width = canvas.clientWidth * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4jukU":[function(require,module,exports) {
"use strict";
// camera
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Camera = void 0;
const twgl_js_1 = require("./../node_modules/twgl.js");
class Camera {
    constructor(dictpar){
        // camera
        this.target = [
            0,
            0,
            0
        ]; // target of camera
        this.radius0 = 0.0; // camera distance, set at objectsize*2 when not in dictpar
        this.ahoriz = 0; // horizontal angle
        this.avert = 0; // vertical angle
        this.fov = 30.0; // field of view in degrees
        this.near = 0.5; // near plane
        this.far = 1000.0; // far plane
        this.rotationVelocity = 0.012; // mouse drag sensitivity for angle turns
        this.zoominVelocity = 1.0; // mouse wheel sensitivity set at objectsize/40
        // lights
        this.ahorizlight = 3.0 * Math.PI / 2.0; // light horizontal angle
        this.avertlight = Math.PI / 4.0; // light vertical angle
        this.lightpos = [
            8,
            8,
            20
        ];
        this.difflightintensity = 0.9;
        this.speclightintensity = 0.9;
        // result state to pass to shader
        this.lookAt = twgl_js_1.m4.identity(); // m4.lookAt(this.eye, this.target, this.up);
        this.viewProjection = twgl_js_1.m4.identity(); // projection configured
        //----------------------------------------------------------------
        //local state
        this.zaxis = [
            0,
            0,
            1
        ]; // yaw axis
        this.yaxis = [
            0,
            1,
            0
        ]; // roll axis
        this.up = [
            0,
            1,
            0
        ]; // up vector (can be Z or Y)
        this.radius = 0.0; // distance of camera
        this.eye = [
            -1,
            0,
            0
        ]; // location of camera
        this.myr = twgl_js_1.m4.identity();
        this.myrl = twgl_js_1.m4.identity(); // light
        this.projection = twgl_js_1.m4.identity();
        this.changelight = false;
        this.changeeye = false;
        if (dictpar.get("radius0") != undefined) this.radius0 = +dictpar.get("radius0");
        if (dictpar.get("hx") != undefined) this.ahoriz = +dictpar.get("hx");
        if (dictpar.get("hy") != undefined) this.avert = +dictpar.get("hy");
        if (dictpar.get("hxl") != undefined) {
            this.ahorizlight = +dictpar.get("hxl");
            this.changelight = true;
        }
        if (dictpar.get("hyl") != undefined) {
            this.avertlight = +dictpar.get("hyl");
            this.changelight = true;
        }
        if (dictpar.get("difflight") != undefined) {
            this.difflightintensity = +dictpar.get("difflight");
            this.changelight = true;
        }
        if (dictpar.get("speclight") != undefined) {
            this.speclightintensity = +dictpar.get("speclight");
            this.changelight = true;
        }
        this.radius = this.radius0;
    }
    static createYUpCamera(gl, dictpar, szobj, app) {
        var cam = new Camera(dictpar);
        cam.zoominVelocity = szobj / 20.0;
        if (cam.radius0 == 0) {
            cam.radius0 = 2.0 * szobj;
            console.log("set cam.radius0 to 2*object size = " + cam.radius0);
        }
        cam.target = [
            0,
            0,
            0
        ];
        cam.near = szobj / 10.0;
        cam.far = 10.0 * szobj;
        cam.setRadius(cam.radius0);
        cam.setYUpPerspective(gl, app);
        cam.setYUpEye();
        cam.setYUpLight();
        return cam;
    }
    static createZUpCamera(gl, dictpar, szobj, app) {
        var cam = new Camera(dictpar);
        cam.zoominVelocity = szobj / 20.0;
        if (cam.radius0 == 0) {
            cam.radius0 = 2.0 * szobj;
            console.log("set cam.radius0 to 2*object size = " + cam.radius0);
        }
        cam.target = [
            0,
            0,
            0
        ];
        cam.near = szobj / 10.0;
        cam.far = 10.0 * szobj;
        cam.setRadius(cam.radius0);
        //cam.ahoriz = 0.7;
        cam.setZUpPerspective(gl, app);
        cam.setZUpEye();
        return cam;
    }
    translateEye(v) {
        var t = twgl_js_1.m4.translation(v);
        this.eye = twgl_js_1.m4.transformPoint(t, this.eye);
        this.lookAt = twgl_js_1.m4.lookAt(this.eye, this.target, this.up);
        this.viewProjection = twgl_js_1.m4.multiply(this.projection, twgl_js_1.m4.inverse(this.lookAt));
        console.log("translate eye " + this.eye);
    }
    translateTarget(v) {
        var t = twgl_js_1.m4.translation(v);
        this.target = twgl_js_1.m4.transformPoint(t, this.target);
        this.lookAt = twgl_js_1.m4.lookAt(this.eye, this.target, this.up);
        console.log("translate target " + this.target);
        this.viewProjection = twgl_js_1.m4.multiply(this.projection, twgl_js_1.m4.inverse(this.lookAt));
    }
    ReportEye() {
        var sEye = this.eye[0].toPrecision(4) + "," + this.eye[1].toPrecision(4) + "," + this.eye[2].toPrecision(4);
        var sTarget = this.target[0].toPrecision(4) + "," + this.target[1].toPrecision(4) + "," + this.target[2].toPrecision(4);
        var sLightPos = this.lightpos[0].toPrecision(4) + "," + this.lightpos[1].toPrecision(4) + "," + this.lightpos[2].toPrecision(4);
        document.getElementById("projection").innerHTML = "hx:" + (180.0 / Math.PI * this.ahoriz).toPrecision(3) + " hy:" + (180.0 / Math.PI * this.avert).toPrecision(3) + "<br>r0=" + this.radius0.toPrecision(4) + ", r=" + this.radius.toPrecision(4) + "<br>eye:[" + sEye + "]<br>target: [" + sTarget + "]<br>light: " + sLightPos;
    }
    //===================================================================================================================
    setYUpPerspective(gl, app) {
        const afov = this.fov * Math.PI / 180;
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = this.near;
        const zFar = this.far;
        this.up = [
            0,
            1,
            0
        ];
        this.projection = twgl_js_1.m4.perspective(afov, aspect, zNear, zFar);
    }
    setZUpPerspective(gl, app) {
        const afov = this.fov * Math.PI / 180;
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 180;
        this.up = [
            0,
            0,
            1
        ];
        this.projection = twgl_js_1.m4.perspective(afov, aspect, zNear, zFar);
    }
    setYUpEye() {
        // this.zaxis = m4.transformPoint(this.invworldmat, [0,0,1]) as number[];
        this.myr = twgl_js_1.m4.identity();
        twgl_js_1.m4.axisRotate(this.myr, this.yaxis, this.ahoriz, this.myr);
        twgl_js_1.m4.axisRotate(this.myr, this.zaxis, this.avert, this.myr);
        this.eye = twgl_js_1.m4.transformPoint(this.myr, [
            this.radius,
            0,
            0
        ]);
        this.lookAt = twgl_js_1.m4.lookAt(this.eye, this.target, this.up);
        this.viewProjection = twgl_js_1.m4.multiply(this.projection, twgl_js_1.m4.inverse(this.lookAt));
        this.ReportEye();
        console.log("< setYUpEye radius=" + this.radius + " (" + this.radius0 + ")");
    }
    setZUpEye() {
        //  this.yaxis = m4.transformPoint(this.invworldmat, [0,1,0]) as number[];    
        this.myr = twgl_js_1.m4.identity();
        twgl_js_1.m4.axisRotate(this.myr, this.zaxis, this.ahoriz, this.myr);
        //up = m4.transformPoint(myr,[0,1,0]) as number[];
        twgl_js_1.m4.axisRotate(this.myr, this.yaxis, this.avert, this.myr);
        this.eye = twgl_js_1.m4.transformPoint(this.myr, [
            this.radius,
            0,
            0
        ]);
        this.lookAt = twgl_js_1.m4.lookAt(this.eye, this.target, this.up);
        this.viewProjection = twgl_js_1.m4.multiply(this.projection, twgl_js_1.m4.inverse(this.lookAt));
        this.ReportEye();
        console.log("< setZUpEye radius=" + this.radius + " (" + this.radius0 + ")");
    }
    setYUpLight() {
        this.myrl = twgl_js_1.m4.identity();
        twgl_js_1.m4.axisRotate(this.myrl, this.yaxis, this.ahorizlight, this.myrl);
        this.up = twgl_js_1.m4.transformPoint(this.myrl, [
            0,
            1,
            0
        ]);
        twgl_js_1.m4.axisRotate(this.myrl, this.zaxis, this.avertlight, this.myrl);
        this.lightpos = twgl_js_1.m4.transformPoint(this.myrl, [
            this.radius,
            0,
            0
        ]);
    }
    setRadius(r) {
        this.radius = this.radius0 = r;
    }
    CamHandlingYUp(gl, app) {
        if ((app === null || app === void 0 ? void 0 : app.mouse.dragvector) != undefined && (app === null || app === void 0 ? void 0 : app.mouse.dragdistance) > 1e-2) {
            const ctrldown = app === null || app === void 0 ? void 0 : app.controlkeydown;
            if (!ctrldown) {
                this.ahoriz = this.ahoriz - app.mouse.dragvector[0] * this.rotationVelocity;
                this.avert = this.avert - app.mouse.dragvector[1] * this.rotationVelocity;
                if (this.avert < -Math.PI / 2.0) this.avert = -Math.PI / 2.0 + 1e-3;
                if (this.avert > Math.PI / 2.0) this.avert = Math.PI / 2.0 - 1e-3;
                this.changeeye = true;
            } else {
                this.ahorizlight = this.ahorizlight - app.mouse.dragvector[0] * this.rotationVelocity;
                this.avertlight = this.avertlight - app.mouse.dragvector[1] * this.rotationVelocity;
                this.changelight = true;
            }
            app === null || app === void 0 || app.drageventdone();
        }
        if ((app === null || app === void 0 ? void 0 : app.mouse.changewheel) && (app === null || app === void 0 ? void 0 : app.mouse.totaldelta) != undefined) {
            this.radius = this.radius0 + (app === null || app === void 0 ? void 0 : app.mouse.totaldelta) * this.zoominVelocity;
            this.changeeye = true;
            app === null || app === void 0 || app.mousewheeleventdone();
        }
        this.setYUpPerspective(gl, app);
        if (this.changeeye) {
            this.setYUpEye();
            this.changeeye = false;
        }
        if (this.changelight) {
            this.setYUpLight();
            this.changelight = false;
        }
    }
    // Camera with Z-AXIS up
    CamHandlingZUp(gl, app) {
        this.setZUpPerspective(gl, app);
        //   var change = false;
        if ((app === null || app === void 0 ? void 0 : app.mouse.dragvector) != undefined && (app === null || app === void 0 ? void 0 : app.mouse.dragdistance) > 1e-2) {
            this.ahoriz = this.ahoriz - app.mouse.dragvector[0] * this.rotationVelocity;
            this.avert = this.avert + app.mouse.dragvector[1] * this.rotationVelocity;
            if (this.avert < -Math.PI / 2.0) this.avert = -Math.PI / 2.0 + 1e-3;
            if (this.avert > Math.PI / 2.0) this.avert = Math.PI / 2.0 - 1e-3;
            this.changeeye = true;
        }
        //  if (app?.mouse.totaldelta != undefined && (this.radius0 + app?.mouse.totaldelta* zoominvelocity)> 1.0)
        if ((app === null || app === void 0 ? void 0 : app.mouse.changewheel) && (app === null || app === void 0 ? void 0 : app.mouse.totaldelta) != undefined) {
            this.radius = this.radius0 + (app === null || app === void 0 ? void 0 : app.mouse.totaldelta) * this.zoominVelocity;
            this.changeeye = true;
            app === null || app === void 0 || app.mousewheeleventdone();
        //  console.log("wheel");
        }
        //!   this.target = [0, (mobj.meshMinMax.maxy+mobj.meshMinMax.miny)/2, 0];
        if (this.changeeye) {
            this.setZUpEye();
            this.changeeye = false;
        }
    //  console.log("viewProjection= "+this.viewProjection);
    }
}
exports.Camera = Camera;

},{"./../node_modules/twgl.js":"3uqAP"}],"aOyYs":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoneAnimation = exports.fsSkeleton = exports.vsSkeleton = void 0;
const twgl = __importStar(require("./../node_modules/twgl.js")); // Greg's work
const twgl_js_1 = require("./../node_modules/twgl.js");
//import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
//import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)
//import * as mtls from "./mouselistener";     // connect events for buttons and wheel
// -- vertex shader --
exports.vsSkeleton = `#version 300 es

// camera
uniform mat4 worldviewprojection;
uniform vec3 lightWorldPos;
uniform mat4 world;
uniform mat4 viewInverse;
uniform mat4 worldInverseTranspose;

in vec4 a_position;
in vec4 a_weight;
in uvec4 a_boneNdx;
in vec2 a_texcoord;
 
uniform mat4 projection;
uniform mat4 view;

uniform sampler2D boneMatrixTexture;

uniform float numBones;

out vec2 v_texCoord;

mat4 m4ident =  mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
mat4 m4zero =  mat4(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);

mat4 getBoneMatrix(uint boneNdx) {
  if (boneNdx>99998u) return m4zero;
  return mat4(
    texelFetch(boneMatrixTexture, ivec2(0, boneNdx), 0),
    texelFetch(boneMatrixTexture, ivec2(1, boneNdx), 0),
    texelFetch(boneMatrixTexture, ivec2(2, boneNdx), 0),
    texelFetch(boneMatrixTexture, ivec2(3, boneNdx), 0));
}

void main() {
  v_texCoord = a_texcoord;
  vec4 bonemovedskinpos = (getBoneMatrix(a_boneNdx[0]) * a_position * a_weight[0] + getBoneMatrix(a_boneNdx[1]) * a_position * a_weight[1]);
  gl_Position = worldviewprojection * world * bonemovedskinpos;
 }
`;
exports.fsSkeleton = `#version 300 es
precision mediump float;
//precision highp float;
uniform vec4 color;
in vec2 v_texCoord;
out vec4 outColor;
uniform sampler2D surfaceTexture;

void main () {
  vec4 cColor =  texture(surfaceTexture, v_texCoord);
  outColor=cColor * vec4(0.5,0.5,0.5,1);
}
`;
class BoneAnimation {
    constructor(){
        this.bindPose = [];
        this.bones = [];
        this.boneMatrixTexture = null;
        this.boneMatrices = [];
        this.surfaceTexture = null;
        // animation state
        this.px = 0.0;
        this.py = 0.0;
        this.pz = 0.0;
        this.scale = 1.0;
        // bindPoseInv0: m4.Mat4[] = [] ;
        this.bindPoseInv2 = [];
        this.phase0 = 0;
        this.mesh = null;
        this.bufferInfo = null;
        this.skinVAO = null;
        this.uniforms = null;
    }
    setNumBones(gl) {
        this.numBones = this.mesh.type == gl.TRIANGLE_STRIP ? this.mesh.nsegments / this.mesh.bonediv : this.mesh.nsegments;
    }
    mat4report(m) {
        var srep = m.toString();
        var srep1 = "";
        srep.split(",").forEach((item)=>{
            srep1 += item.substring(0, 5) + ",";
        });
        return srep;
    }
    prepareBoneInv(bindPose) {
        // compute the initial positions of each matrix
        var nrep = 0;
        console.log("prepareBoneInv - bindpose");
        bindPose.forEach((v)=>{
            this.mat4report(v);
            console.log(nrep + "] [" + v.toString() + "] ");
            nrep++;
        });
        // compute their inverses
        return bindPose.map(function(m) {
            return twgl_js_1.m4.inverse(m);
        });
    }
    prepareSurfaceTextures(gl, selectedSurface) {
        var gradientname = require("./resources/models/stone/circlegradient.png");
        var clovername = require("./images/clover.jpg");
        var zelenskyyname = require("./resources/models/stone/zelenskii.png");
        var flagofukrainname = require("./resources/models/stone/flagofukraine.png");
        var textures = twgl.createTextures(gl, {
            checker: {
                mag: gl.NEAREST,
                min: gl.LINEAR,
                src: [
                    255,
                    255,
                    255,
                    255,
                    192,
                    192,
                    192,
                    255,
                    92,
                    92,
                    92,
                    255,
                    255,
                    255,
                    255,
                    255, 
                ]
            },
            clover: {
                src: clovername
            },
            zelenskyy: {
                src: zelenskyyname
            },
            gradient: {
                src: gradientname
            },
            flagofukraine: {
                src: flagofukrainname
            }
        });
        if (selectedSurface == "clover") this.surfaceTexture = textures.clover;
        if (selectedSurface == "zelenskyy") this.surfaceTexture = textures.zelenskyy;
        if (selectedSurface == "checker") this.surfaceTexture = textures.checker;
        if (selectedSurface == "gradient") this.surfaceTexture = textures.gradient;
        if (selectedSurface == "flagofukraine") this.surfaceTexture = textures.flagofukraine;
        return textures;
    }
    prepareBoneMatrices(gl, dictpar) {
        if (this.numBones == undefined) return;
        this.boneArray = new Float32Array(this.numBones * 16);
        // prepare the texture for bone matrices
        this.boneMatrixTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.boneMatrixTexture);
        // since we want to use the texture for pure data we turn off filtering
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        for(let i = 0; i < this.numBones; ++i){
            this.boneMatrices.push(new Float32Array(this.boneArray.buffer, i * 64, 16));
            this.bindPose.push(twgl_js_1.m4.identity()); // just allocate storage
            this.bones.push(twgl_js_1.m4.identity()); // just allocate storage
        }
    }
    prepareBoneTexture(gl, bindPosInv) {
        // multiply each by its bindPoseInverse
        this.bones.forEach((bone, ndx)=>{
            twgl_js_1.m4.multiply(bone, bindPosInv[ndx], this.boneMatrices[ndx]);
        });
        // update the texture with the current matrices
        gl.bindTexture(gl.TEXTURE_2D, this.boneMatrixTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, 4, this.numBones, 0, gl.RGBA, gl.FLOAT, this.boneArray);
    }
}
exports.BoneAnimation = BoneAnimation;

},{"./../node_modules/twgl.js":"3uqAP","./resources/models/stone/circlegradient.png":"50y7h","./images/clover.jpg":"iLTuo","./resources/models/stone/zelenskii.png":"gMM6z","./resources/models/stone/flagofukraine.png":"1o0L8"}],"50y7h":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "circlegradient.6cda9680.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"iLTuo":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "clover.bed4e0b3.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"gMM6z":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "zelenskii.830ddd79.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"1o0L8":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "flagofukraine.65ef6112.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"otYB7":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FishOneJoint = exports.FishHRotated = exports.FishV = exports.FishHTranslated = exports.Fish = void 0;
const twgl_js_1 = require("./../node_modules/twgl.js");
const stridedmesh = __importStar(require("./stridedmesh")); // mesh and bones (data)
const trianglesmesh = __importStar(require("./trianglesmesh")); // mesh and bones (data)
const boneanimation = __importStar(require("./boneanimation"));
class Fish extends boneanimation.BoneAnimation {
    constructor(size, forwardspeed, phase0, deltaphase, arange, ampl, surfacetexturefile){
        super();
        this.size = size;
        this.forwardspeed = forwardspeed;
        this.phase0 = phase0;
        this.deltaphase = deltaphase;
        this.arange = arange;
        this.ampl = ampl;
        this.surfacetexturefile = surfacetexturefile;
    }
    computeBone(time) {
        const aphase = this.mesh.bonediv * 0.01 * Math.PI * Math.sin(time * this.deltaphase);
        this.computeBoneMatrices(this.bones, aphase + this.phase0); //, this.ampl, this.arange);     
    }
    createSurfaceTexture(gl) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.surfaceTexture);
    }
    createBoneTexture(gl, dictpar) {
        gl.activeTexture(gl.TEXTURE0);
        this.prepareBoneMatrices(gl, dictpar); // see derived class
        this.computeBone(0);
        this.bindPose = this.bones;
        this.bindPoseInv2 = this.prepareBoneInv(this.bindPose);
    }
    prepareUniforms(gl, dictpar) {
        return {
            world: twgl_js_1.m4.identity(),
            projection: twgl_js_1.m4.identity(),
            worldviewprojection: twgl_js_1.m4.identity(),
            view: twgl_js_1.m4.translation([
                0.0,
                0.0,
                0.0
            ]),
            surfaceTexture: this.surfaceTexture,
            boneMatrixTexture: this.boneMatrixTexture,
            color: [
                0.0,
                0.0,
                0.0,
                0.0
            ]
        };
    }
    numberDictPar(dictpar, parname, pardefault) {
        var spar;
        if ((spar = dictpar.get(parname)) != undefined) return +spar;
        return pardefault;
    }
    stringDictPar(dictpar, parname, pardefault) {
        var spar;
        if ((spar = dictpar.get(parname)) != undefined) return spar;
        return pardefault;
    }
}
exports.Fish = Fish;
//--- VARIOUS TYPES OF FISH COME HERE ----------------------------------------------------------------------------
class FishHTranslated extends Fish {
    prepareMesh(gl, dictpar, scale) {
        this.scale = scale;
        var cstride = this.numberDictPar(dictpar, "stride", 80);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 80);
        var cmeshtype = this.stringDictPar(dictpar, "mesh", "triangle");
        if (cmeshtype == "strip") {
            var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale);
            tsmesh.arrays.position = tsmesh.getFishHPositions();
            tsmesh.type = gl.TRIANGLE_STRIP;
            console.log("created triangle strip mesh. phase=" + this.phase0);
            return tsmesh;
        } else {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishHPositions();
            console.log("created triangles mesh. phase=" + this.phase0);
            trmesh.type = gl.TRIANGLES;
            return trmesh;
        }
    }
    computeBoneMatrices(bones, di) {
        var amp = 0.0;
        var damp = this.ampl / bones.length;
        var arange = this.arange * 2.0 * Math.PI;
        for(var i = 0; i < bones.length; i++){
            var m = twgl_js_1.m4.identity();
            var normx = i;
            normx = normx / bones.length;
            var ay = arange * (normx * di);
            var az = arange * (normx * di);
            twgl_js_1.m4.translate(m, [
                this.px,
                this.py + amp * Math.cos(0.5 * ay),
                this.pz + amp * 10.0 * Math.sin(az)
            ], bones[i]);
            this.py += 0.0;
            this.pz += 0.00000;
            amp += this.size * damp;
        }
        this.px += -this.forwardspeed; // * bones.length;    
    }
}
exports.FishHTranslated = FishHTranslated;
//--------------------------------------------------------------------------------------------------------
class FishV extends Fish {
    prepareMesh(gl, dictpar, scale) {
        this.scale = scale;
        var cstride = this.numberDictPar(dictpar, "stride", 80);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 80);
        var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip");
        if (cmeshtype == "strip") {
            var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale);
            tsmesh.arrays.position = tsmesh.getFishVPositions();
            tsmesh.type = gl.TRIANGLE_STRIP;
            return tsmesh;
        } else {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishVPositions();
            trmesh.type = gl.TRIANGLES;
            return trmesh;
        }
    }
    computeBoneMatrices(bones, di) {
        var amp = 0.0, damp = this.ampl / bones.length, arange = this.arange * 2.0 * Math.PI;
        for(var i = 0; i < bones.length; i++){
            twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [
                this.px,
                this.py + amp * 10.0 * Math.cos(arange * (i + di) / bones.length + di),
                this.pz + amp * Math.sin(+arange * i / bones.length + di)
            ], bones[i]);
            this.py += 0.0;
            this.pz += 0.00000;
            amp += this.scale * damp;
        }
        this.px += -this.forwardspeed; // * bones.length;      
    }
}
exports.FishV = FishV;
//----------------------------------------------------------------------------------------------------------
class FishHRotated extends Fish {
    prepareMesh(gl, dictpar, scale) {
        this.scale = scale;
        var cstride = this.numberDictPar(dictpar, "stride", 80);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 80);
        var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip");
        if (cmeshtype == "strip") {
            var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale);
            tsmesh.arrays.position = tsmesh.getFishPPositions();
            tsmesh.type = gl.TRIANGLE_STRIP;
            console.log("created triangle strip mesh. phase=" + this.phase0);
            return tsmesh;
        } else {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishPPositions();
            trmesh.type = gl.TRIANGLES;
            return trmesh;
        }
    }
    computeBoneMatrices(bones, di) {
        var amp = 0.0;
        var damp = this.ampl / bones.length;
        var arad = di * Math.PI / 180.0;
        var asin = this.ampl * di; //Math.sin( this.phase0+12.0*arad)*this.arange;
        var arange = this.arange;
        var cay = -180;
        var posay = 0.0;
        var bonesize = this.mesh.nsegments * this.mesh.segmentsize;
        var jointpos = 0.1;
        var jointpos2 = 0.3;
        for(var i = 0; i < bones.length; i++){
            var nnormx = i / bones.length;
            var nnormxal = 0.5 + 0.5 * Math.sin(7.0 * nnormx * asin * Math.PI * 2.0);
            //    if (nnormx>jointpos) posay = asin * nnormxal; else posay=0;
            posay = asin * nnormx;
            var m = twgl_js_1.m4.identity();
            m = twgl_js_1.m4.translate(m, [
                jointpos * bonesize + this.px,
                0,
                0
            ]);
            m = twgl_js_1.m4.rotateY(m, posay);
            m = twgl_js_1.m4.translate(m, [
                -(jointpos * bonesize + this.px),
                0,
                0,
                0
            ]);
            m = twgl_js_1.m4.translate(m, [
                this.px,
                0,
                0,
                0
            ]);
            //  m = m4.translate(m,[jointpos*bonesize,0,0]);
            //   m = m4.rotateY(m, posay );
            //   m = m4.translate(m,[this.px,0,0,0]);
            bones[i] = m;
        //  this.py+=0.0;
        //  this.pz+=0.00000;
        // amp+=this.size*damp;       
        }
        this.px += -this.forwardspeed; // * bones.length;    
    }
}
exports.FishHRotated = FishHRotated;
//----------------------------------------------------------------------------------------------------------
class FishOneJoint extends Fish {
    constructor(size, forwardspeed, phase0, deltaphase, arange, ampl, surfacetexturefile, jointpos, vaxis){
        super(size, forwardspeed, phase0, deltaphase, arange, ampl, surfacetexturefile);
        this.size = size;
        this.forwardspeed = forwardspeed;
        this.phase0 = phase0;
        this.deltaphase = deltaphase;
        this.arange = arange;
        this.ampl = ampl;
        this.surfacetexturefile = surfacetexturefile;
        this.jointpos = jointpos;
        this.vaxis = vaxis;
    }
    /*
       computeBone( time: number)
       {
         var aphase = this.mesh!.bonediv * 0.01 * time;
         aphase=aphase%360;
         this.computeBoneMatrices(this.bones,aphase );
       }
    */ prepareMesh(gl, dictpar, scale) {
        this.scale = scale;
        var cstride = this.numberDictPar(dictpar, "stride", 80);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 80);
        var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip");
        if (cmeshtype == "strip") {
            var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale);
            tsmesh.arrays.position = tsmesh.getFishVPositions();
            tsmesh.type = gl.TRIANGLE_STRIP;
            console.log("created triangle strip mesh. phase=" + this.phase0);
            return tsmesh;
        } else {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishVPositions();
            trmesh.type = gl.TRIANGLES;
            return trmesh;
        }
    }
    computeBoneMatrices(bones, di) {
        var amp = 0.0;
        var damp = this.ampl / bones.length;
        var arad = di * Math.PI / 180.0;
        var asin = di * this.ampl; //  Math.sin(this.phase0 + this.deltaphase*arad)*this.arange;
        var arange = this.arange;
        var cay = -180;
        var posay = 0.0;
        var bonesize = this.mesh.nsegments * this.mesh.segmentsize;
        //var jointpos = 0.6;
        //var jointpos2 = 0.3;
        for(var i = 0; i < bones.length; i++){
            var nnormx = i / bones.length;
            if (nnormx > this.jointpos) posay = asin;
            else posay = 0;
            var m = twgl_js_1.m4.identity();
            m = twgl_js_1.m4.translate(m, [
                this.jointpos * bonesize + this.px,
                0,
                0
            ]);
            m = twgl_js_1.m4.axisRotate(m, this.vaxis, posay);
            m = twgl_js_1.m4.translate(m, [
                -(this.jointpos * bonesize + this.px),
                0,
                0,
                0
            ]);
            m = twgl_js_1.m4.translate(m, [
                this.px,
                0,
                0,
                0
            ]);
            bones[i] = m;
            this.py += 0.0;
            this.pz += 0.00000;
            amp += this.size * damp;
        }
        this.px += -this.forwardspeed; // * bones.length;    
    }
}
exports.FishOneJoint = FishOneJoint;

},{"./../node_modules/twgl.js":"3uqAP","./stridedmesh":"8Kodn","./trianglesmesh":"a2gwM","./boneanimation":"aOyYs"}],"8Kodn":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StridedMesh = void 0;
const stridedmesh0 = __importStar(require("./stridedmesh0")); // mesh and bones data
class StridedMesh extends stridedmesh0.StridedMesh0 {
    constructor(cnrows, cnsegments, scale){
        super();
        this.segmentsize = scale * 0.18;
        this.nsegments = cnsegments;
        this.nrows = cnrows;
        this.arrays = {
            position: {
                numComponents: 0,
                data: new Float32Array()
            },
            boneNdx: this.buildBoneIndex(this.nsegments, this.nrows, this.nsegments),
            weight: this.buildBoneWeights(this.nsegments, this.nrows, this.nsegments),
            indices: this.buildIndicesStridedTriangleStrip(this.nsegments, this.nrows, this.nsegments),
            texcoord: this.buildTexCoords(this.nsegments, this.nrows, this.nsegments)
        };
    }
    buildPositions(n, nrows, stride) {
        var posdata = [];
        var cx = 0, cy = 0, cz = 0;
        for(var y = 0; y < nrows; y++)for(var x = 0; x < stride; x++){
            var d = Math.PI / 4.0 * (y - nrows / 2) / nrows;
            d = 1.0 - Math.cos(d);
            cx = x * this.segmentsize;
            cy = y * this.segmentsize;
            cz = 88.0 * d * this.segmentsize;
            posdata.push([
                cx,
                cy,
                cz
            ]);
        }
        var data = this.floatStraighten("Positions", 3, posdata); // this.floatStraighten4("BoneWeights",wdata);
        return {
            numComponents: 3,
            data
        };
    }
    buildCylPositions(n, nrows, stride) {
        var posdata = [];
        var cx = 0, cy = 0, cz = 0, a = 0, da = Math.PI * 2.0 / (nrows - 1), z = 0, r = 5;
        for(var y = 0; y < nrows; y++){
            for(var x = 0; x < stride; x++){
                var d = Math.PI / 4.0 * (y - nrows / 2) / nrows;
                d = 1.0 - Math.cos(d);
                cx = x * this.segmentsize;
                cy = this.segmentsize * Math.sin(a) * r;
                cz = this.segmentsize * Math.cos(a) * r;
                posdata.push([
                    cx,
                    cy,
                    cz
                ]);
            }
            a += da;
        }
        var data = this.floatStraighten("Positions", 3, posdata); // this.floatStraighten4("BoneWeights",wdata);
        return {
            numComponents: 3,
            data
        };
    }
    //-------------------------------------------------------------------------------------------------------------------------
    buildFishVPositions(n, nrows, stride) {
        var posdata = [];
        var cx = 0, cy = 0, cz = 0, a = 0, da = Math.PI * 2.0 / (nrows - 1), z = 0, r = 20;
        var dtail = stride / 4;
        var htail = stride * 3 / 4;
        var dr = r / dtail;
        for(var y = 0; y < nrows; y++){
            r = 1;
            for(var x = 0; x < stride; x++){
                var d = Math.PI / 4.0 * (y - nrows / 2) / nrows;
                d = 1.0 - Math.cos(d);
                cx = x * this.segmentsize;
                if (x < dtail) r = r + dr;
                var dtailr = x - htail;
                if (dtailr < 0) {
                    cy = this.segmentsize * Math.cos(a) * r;
                    cz = this.segmentsize * Math.sin(a) * r;
                } else {
                    var cdr = 1.0 - dtailr / dtail;
                    cy = this.segmentsize * Math.cos(a) * r * cdr;
                    cz = this.segmentsize * Math.sin(a) * r * (2.0 - cdr);
                }
                posdata.push([
                    cx,
                    cy,
                    cz
                ]);
            }
            a += da;
        }
        var data = this.floatStraighten("Positions", 3, posdata); // this.floatStraighten4("BoneWeights",wdata);
        return {
            numComponents: 3,
            data
        };
    }
    buildFishHPositions(n, nrows, stride) {
        var posdata = [];
        var cx = 0, cy = 0, cz = 0, a = 0, da = Math.PI * 2.0 / (nrows - 1), z = 0, r = 20;
        var dtail = stride / 4;
        var htail = stride * 3 / 4;
        var dr = r / dtail;
        for(var y = 0; y < nrows; y++){
            r = 1;
            for(var x = 0; x < stride; x++){
                var d = Math.PI / 4.0 * (y - nrows / 2) / nrows;
                d = 1.0 - Math.cos(d);
                cx = x * this.segmentsize;
                if (x < dtail) r = r + dr;
                var dtailr = x - htail;
                if (dtailr < 0) {
                    cy = this.segmentsize * Math.sin(a) * r;
                    cz = this.segmentsize * Math.cos(a) * r;
                } else {
                    var cdr = 1.0 - dtailr / dtail;
                    cy = this.segmentsize * Math.sin(a) * r * (2.0 - cdr);
                    cz = this.segmentsize * Math.cos(a) * r * cdr;
                }
                posdata.push([
                    cx,
                    cy,
                    cz
                ]);
            }
            a += da;
        }
        var data = this.floatStraighten("Positions", 3, posdata); // this.floatStraighten4("BoneWeights",wdata);
        return {
            numComponents: 3,
            data
        };
    }
    getFishHPositions() {
        var pos = this.buildFishHPositions(this.nsegments, this.nrows, this.nsegments);
        return pos;
    }
    getFishVPositions() {
        var pos = this.buildFishVPositions(this.nsegments, this.nrows, this.nsegments);
        return pos;
    }
    getFishPPositions() {
        var pos = this.buildCylPositions(this.nsegments, this.nrows, this.nsegments);
        return pos;
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    buildIndicesStridedTriangleStrip(n, nrows, stride) {
        var inxdata = [];
        var crow = 1;
        var ca1 = stride;
        while(crow < nrows){
            var i = 0;
            var val = 0;
            var ca0 = ca1 - stride;
            while(i < stride){
                val = ca0;
                if (this.degen) {
                    if (i == 0) inxdata.push(val);
                }
                inxdata.push(val);
                val = ca1;
                inxdata.push(val);
                ca1++;
                ca0++;
                i++;
            }
            if (this.degen) inxdata.push(val);
            crow++;
        }
        var data = this.intArray("Indices", inxdata);
        return {
            numComponents: 1,
            data
        };
    }
    buildBoneIndex(n, nrows, stride) {
        var ndxdata = [];
        var n1 = 0, n2 = 0;
        for(var y = 0; y < nrows; y++){
            for(var x = 0; x < stride; x++)if (x % 2 == 0) {
                if (this.bonediv == 2) {
                    n1 = x / this.bonediv;
                    n2 = 99999;
                    ndxdata.push([
                        n1,
                        n2,
                        99999,
                        99999
                    ]);
                    n2 = 1 + x / this.bonediv;
                    ndxdata.push([
                        n1,
                        n2,
                        99999,
                        99999
                    ]);
                } else {
                    n1 = x;
                    n2 = 99999;
                    ndxdata.push([
                        n1,
                        n2,
                        99999,
                        99999
                    ]);
                    n1 = x + 1;
                    n2 = 99999;
                    ndxdata.push([
                        n1,
                        n2,
                        99999,
                        99999
                    ]);
                }
            }
        }
        var data = this.intStraighten("BoneIndex", 4, ndxdata);
        return {
            numComponents: 4,
            data
        };
    }
    buildTexCoords(n, nrows, stride) {
        var i = 0, n1 = 1.0, n2 = 0.0;
        var wdata = [];
        var crow = 0;
        while(crow < nrows){
            for(var i = 0; i < stride; i++){
                var xt = i / +stride.toFixed(4);
                var yt = crow / +nrows.toFixed(4);
                wdata.push([
                    xt,
                    yt
                ]);
            }
            crow++;
        }
        var data = new Float32Array(wdata.length * 2);
        console.log("=>copy texcoords len=" + wdata.length + " stride=" + stride + " nrows=" + nrows);
        for(var i = 0; i < wdata.length; i++)for(var j = 0; j < 2; j++)data[i * 2 + j] = wdata[i][j];
        console.log("texcoords buffer: len=" + data.length);
        console.log(data);
        return {
            numComponents: 2,
            data
        };
    }
    buildBoneWeights(n, nrows, stride) {
        var wdata = [];
        var n1 = 1.0, n2 = 0.0;
        for(var y = 0; y < nrows; y++){
            for(var x = 0; x < stride; x++)if (x % 2 == 0) {
                if (this.bonediv == 2) {
                    wdata.push([
                        1.0,
                        0.0,
                        0,
                        0
                    ]);
                    wdata.push([
                        0.5,
                        0.5,
                        0,
                        0
                    ]);
                } else {
                    wdata.push([
                        n1,
                        n2,
                        0,
                        0
                    ]);
                    wdata.push([
                        n1,
                        n2,
                        0,
                        0
                    ]);
                }
            }
        }
        var data = this.floatStraighten("BoneWeights", 4, wdata); // this.floatStraighten4("BoneWeights",wdata);
        return {
            numComponents: 4,
            data
        };
    }
}
exports.StridedMesh = StridedMesh;

},{"./stridedmesh0":"l5gMp"}],"l5gMp":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StridedMesh0 = void 0;
class StridedMesh0 {
    constructor(){
        this.nrows = 0;
        this.nsegments = 0;
        this.arrays = {
            position: {
                numComponents: 0,
                data: new Float32Array()
            },
            boneNdx: {
                numComponents: 0,
                data: new Uint32Array()
            },
            weight: {
                numComponents: 0,
                data: new Float32Array()
            },
            texcoord: {
                numComponents: 0,
                data: new Float32Array()
            },
            indices: {
                numComponents: 0,
                data: new Uint32Array()
            }
        };
        this.degen = true;
        this.segmentsize = 1.0;
        this.bonediv = 2.0;
        this.type = 0;
    }
    floatStraighten(datatitle, w, wdata) {
        var data = new Float32Array(wdata.length * w);
        console.log(">floatstraighten" + w + " " + datatitle + " wdata.length=" + wdata.length);
        for(var i = 0; i < wdata.length; i++)for(var j = 0; j < w; j++)data[i * w + j] = wdata[i][j];
        console.log("<floatstraighten" + w + " " + datatitle + ": len=" + data.length);
        return data;
    }
    intStraighten(datatitle, w, wdata) {
        var data = new Uint32Array(wdata.length * w);
        console.log(">intstraighten" + w + " " + datatitle + " wdata.length=" + wdata.length);
        for(var i = 0; i < wdata.length; i++)for(var j = 0; j < w; j++)data[i * w + j] = wdata[i][j];
        console.log("<intstraighten" + w + " " + datatitle + ": len=" + data.length);
        return data;
    }
    intArray(datatitle, wdata) {
        var data = new Uint32Array(wdata.length);
        console.log(">intArray " + datatitle + " wdata.length=" + wdata.length);
        for(var i = 0; i < wdata.length; i++)data[i] = wdata[i];
        console.log("<intArray " + datatitle + ": len=" + data.length);
        return data;
    }
}
exports.StridedMesh0 = StridedMesh0;

},{}],"a2gwM":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StridedMesh = void 0;
const stridedmesh0 = __importStar(require("./stridedmesh0")); // mesh and bones data
//type number4 = number[];
//type number2 = number[];
class StridedMesh extends stridedmesh0.StridedMesh0 {
    getFishHPositions() {
        var pos = this.build3DTrianglesPositions(this.nsegments, this.nrows, this.nsegments);
        return pos;
    }
    getFishPPositions() {
        var pos = this.build3DTrianglesPositions(this.nsegments, this.nrows, this.nsegments);
        return pos;
    }
    getFishVPositions() {
        var pos = this.build3DTrianglesPositions(this.nsegments, this.nrows, this.nsegments);
        return pos;
    }
    constructor(cnrows, cnsegments){
        super();
        this.segmentsize = 0.1;
        this.nsegments = cnsegments;
        this.nrows = cnrows;
        this.arrays = {
            position: this.build3DTrianglesPositions(this.nsegments, this.nrows, this.nsegments),
            boneNdx: this.buildBoneTrianglesNDX(this.nsegments, this.nrows, this.nsegments),
            weight: this.buildWeightsTriangles(this.nsegments, this.nrows, this.nsegments),
            indices: this.buildIndicesTriangles(this.nsegments, this.nrows, this.nsegments),
            texcoord: this.buildTexCoordTriangles(this.nsegments, this.nrows, this.nsegments)
        };
    }
    buildWeightsTriangles(n, nrows, stride) {
        var i = 0, n1 = 1.0, n2 = 0.0;
        var wdata = [];
        var crow = 0;
        while(crow < nrows){
            for(var i = 0; i < stride; i++)for(var j = 0; j < 6; j++)wdata.push([
                n1,
                n2,
                0,
                0
            ]);
            crow++;
        }
        var data = new Float32Array(wdata.length * 4);
        console.log("=>copy weights len=" + wdata.length + " stride=" + stride + " nrows=" + nrows);
        for(var i = 0; i < wdata.length; i++)for(var j = 0; j < 4; j++)data[i * 4 + j] = wdata[i][j];
        console.log("NDX weights buffer: len=" + data.length);
        return {
            numComponents: 4,
            data
        };
    }
    buildTexCoordTriangles(n, nrows, stride) {
        var i = 0, n1 = 1.0, n2 = 0.0;
        var wdata = [];
        var crow = 0;
        while(crow < nrows){
            for(var i = 0; i < stride; i++){
                var xt = i / +stride.toFixed(4);
                var yt = crow / +nrows.toFixed(4);
                for(var j = 0; j < 6; j++)wdata.push([
                    xt,
                    yt
                ]);
            }
            crow++;
        }
        var data = new Float32Array(wdata.length * 2);
        console.log("=>copy texcoords len=" + wdata.length + " stride=" + stride + " nrows=" + nrows);
        for(var i = 0; i < wdata.length; i++)for(var j = 0; j < 2; j++)data[i * 2 + j] = wdata[i][j];
        console.log("texcoords buffer: len=" + data.length);
        console.log(data);
        return {
            numComponents: 2,
            data
        };
    }
    buildIndicesTriangles(n, nrows, stride) {
        var inxdata = [];
        var crow = 0;
        var cpos = 0;
        while(crow < nrows){
            for(var i = 0; i < stride; i++)for(var j = 0; j < 6; j++)inxdata.push(cpos++);
            crow++;
        }
        var data = new Uint32Array(inxdata.length);
        for(var i = 0; i < inxdata.length; i++)data[i] = inxdata[i];
        console.log("indices: len=" + data.length);
        console.log(data);
        return {
            numComponents: 1,
            data
        };
    }
    buildBoneTrianglesNDX(n, nrows, stride) {
        var ndxdata = [];
        var crow = 0;
        while(crow < nrows){
            for(var i = 0; i < stride; i++)for(var j = 0; j < 6; j++)ndxdata.push([
                i / this.bonediv,
                99999,
                99999,
                99999
            ]);
            crow++;
        }
        var data = new Uint32Array(ndxdata.length * 4);
        crow = 0;
        console.log("ndxdat4.len=" + ndxdata.length);
        console.log(ndxdata);
        for(var i = 0; i < ndxdata.length; i++)//console.log(i+"] "+ndxdata[i]);
        for(var j = 0; j < 4; j++)data[i * 4 + j] = ndxdata[i][j];
        console.log("NDX indices buffer: len=" + data.length);
        console.log(data);
        return {
            numComponents: 4,
            data
        };
    }
    build3DTrianglesPositions(n, nrows, stride) {
        var posdata = [];
        var z = 0, sz, cx, cy, cz = 0.0, dz = 0.0;
        sz = this.segmentsize;
        dz = sz * dz;
        for(var y = 0; y < nrows; y++){
            var d = Math.PI / 4.0 * (y - nrows / 2) / nrows;
            d = 1.0 - Math.cos(d);
            z = 8.0 * d;
            for(var x = 0; x < stride; x++){
                cx = sz * x;
                cy = sz * y;
                cz = sz * z;
                posdata.push(cx); //  |_\
                posdata.push(cy);
                posdata.push(cz);
                posdata.push(cx);
                posdata.push(cy + sz);
                posdata.push(cz + dz);
                posdata.push(cx + sz);
                posdata.push(cy + sz);
                posdata.push(cz + dz);
                posdata.push(cx + sz); //  \-|
                posdata.push(cy + sz);
                posdata.push(cz + dz);
                posdata.push(cx + sz);
                posdata.push(cy);
                posdata.push(cz);
                posdata.push(cx);
                posdata.push(cy);
                posdata.push(cz);
            }
            cz = cz + dz;
        }
        var data3d = new Float32Array(posdata.length);
        for(var i = 0; i < posdata.length; i++)data3d[i] = posdata[i];
        console.log("positions: len=" + data3d.length + " nvect=" + data3d.length / 3);
        console.log(data3d);
        return {
            numComponents: 3,
            data: data3d
        };
    }
}
exports.StridedMesh = StridedMesh;

},{"./stridedmesh0":"l5gMp"}],"jTKYD":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FishAnimation = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
const camhandler = __importStar(require("./camhandler")); // camera projection
const boneanimation = __importStar(require("./boneanimation"));
const fish = __importStar(require("./fish"));
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
class FishAnimation {
    constructor(cgl, capp, dictpar){
        this.fish = [
            new fish.FishHTranslated(1.0, 0.03, 0.8, 0.0016, 0.5, 2.25, "zelenskyy"),
            new fish.FishOneJoint(0.33, 0.03, 3.0, 0.0125, 0.3, 2.25, "gradient", 0.6, [
                0.0,
                0.0,
                1.0
            ]),
            new fish.FishHRotated(1.0, 0.03, 0.1, 0.0015, 1.3, 2.25, "gradient"),
            new fish.FishV(0.2, 0.03, 1.0, 0.0150, 0.5, 5.00, "flagofukraine"),
            new fish.FishHTranslated(0.3, 0.03, 0.8, 0.0085, 0.5, 2.50, "zelenskyy")
        ];
        this.fishcounts = [
            1,
            1,
            2,
            2,
            1
        ];
        this.fishpositions = [
            [
                [
                    20.0,
                    -20,
                    0.0
                ]
            ],
            [
                [
                    0.0,
                    0.0,
                    0.0
                ]
            ],
            [
                [
                    40.0,
                    -5,
                    -15
                ],
                [
                    40.0,
                    -2,
                    -5
                ]
            ],
            [
                [
                    10.0,
                    -5,
                    0.0
                ],
                [
                    15.0,
                    0.0,
                    -5
                ]
            ],
            [
                [
                    22.0,
                    0.0,
                    1.0
                ]
            ]
        ];
        this.vnow = new Date();
        this.tdt = 0;
        this.cntfr = 0;
        this.gl = cgl;
        this.app = capp;
        twgl.setAttributePrefix("a_");
        this.programInfo = twgl.createProgramInfo(this.gl, [
            boneanimation.vsSkeleton,
            boneanimation.fsSkeleton
        ]);
        var nFish = 0;
        this.fish.forEach((afish)=>{
            afish.prepareSurfaceTextures(this.gl, afish.surfacetexturefile);
            afish.mesh = afish.prepareMesh(this.gl, dictpar, afish.size);
            afish.setNumBones(this.gl);
            afish.createBoneTexture(this.gl, dictpar);
            afish.createSurfaceTexture(this.gl);
            afish.uniforms = afish.prepareUniforms(this.gl, dictpar);
            afish.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, afish.mesh.arrays);
            afish.skinVAO = twgl.createVAOFromBufferInfo(this.gl, this.programInfo, afish.bufferInfo);
            nFish++;
        });
        this.cam = camhandler.Camera.createZUpCamera(this.gl, dictpar, 50.0, this.app);
        this.cam.zoominVelocity = 0.5;
        requestAnimationFrame(()=>this.render((this.vnow = new Date()).getTime()));
    }
    getTime(nfr) {
        const now = new Date();
        const ctime = now.getTime();
        const dt = ctime - this.vnow.getTime();
        if (this.cntfr % 100 == 0) {
            console.log("nfr=" + nfr + " tdt=" + this.tdt + " ms, fr=" + 1000.0 / (this.tdt / 100.0));
            document.getElementById("app").innerHTML = "fr=" + 1000.0 / (this.tdt / 100.0);
            this.tdt = 0;
        }
        this.tdt += dt;
        this.vnow = now;
        return ctime;
    }
    render(time) {
        var gl = this.gl;
        gl.useProgram(this.programInfo.program);
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var cam = this.cam;
        cam.CamHandlingZUp(gl, this.app);
        for(var fishtype = 0; fishtype < this.fish.length; fishtype++){
            gl.bindVertexArray(this.fish[fishtype].skinVAO);
            this.fish[fishtype].computeBone(time);
            this.fish[fishtype].prepareBoneTexture(gl, this.fish[fishtype].bindPoseInv2);
            this.fish[fishtype].uniforms.worldviewprojection = cam.viewProjection;
            for(var i = 0; i < this.fishcounts[fishtype]; i++){
                this.fish[fishtype].uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), this.fishpositions[fishtype][i]); // draw a fish at some position
                twgl.setUniforms(this.programInfo, this.fish[fishtype].uniforms);
                twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo, this.fish[fishtype].mesh.type);
            }
        }
        requestAnimationFrame(()=>this.render(this.getTime(this.cntfr++)));
    }
}
exports.FishAnimation = FishAnimation;

},{"twgl.js":"3uqAP","./camhandler":"4jukU","./boneanimation":"aOyYs","./fish":"otYB7"}],"llxVM":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ManyTextures = exports.Tdrawitem = void 0;
const chroma_js_1 = __importDefault(require("chroma-js"));
const twgl = __importStar(require("./../node_modules/twgl.js")); // Greg's work
const twgl_js_1 = require("./../node_modules/twgl.js");
const camhandler = __importStar(require("./camhandler")); // camera projection
class Tdrawitem {
    constructor(cdo, cobj){
        this.do = cdo;
        this.obj = cobj;
    }
    static getTwglDrawObjects(a) {
        var ad = [];
        a.forEach((el)=>ad.push(el.do));
        return ad;
    }
}
exports.Tdrawitem = Tdrawitem;
class ManyTextures {
    constructor(cgl, capp, dictpar){
        // Publics
        this.baseHue = this.rand(300); // color of objects
        this.numObjects = 200; // object count
        this.spreadRadius = this.numObjects / 10.0; // random placement range for objects
        this.dtime = 0.02; // animation timer interval
        // Local
        this.drawItems = []; // resource
        this.textures = null; // resource
        this.ctx2D = null; // a 2D canvas to draw things on (used for dynamic circle texture)
        // Shaders
        this.one_point_vs = `    
    uniform mat4 u_worldViewProjection;

    attribute vec4 a_position;
    attribute vec2 a_texcoord;

    varying vec4 v_position;
    varying vec2 v_texCoord;

    void main() {
      v_texCoord = a_texcoord;
      gl_Position = u_worldViewProjection * a_position;
    }
    `;
        this.one_point_fs = `
    precision mediump float;

    varying vec4 v_position;
    varying vec2 v_texCoord;

    uniform vec4 u_diffuseMult;
    uniform sampler2D u_diffuse;

    void main() {
      vec4 diffuseColor = texture2D(u_diffuse, v_texCoord) * u_diffuseMult;
      if (diffuseColor.a < 0.1) {
        discard;
      }
      gl_FragColor = diffuseColor;
    }
    `;
        this.env_map_vs = `
    uniform mat4 u_viewInverse;
    uniform mat4 u_world;
    uniform mat4 u_worldViewProjection;
    uniform mat4 u_worldInverseTranspose;

    attribute vec4 a_position;
    attribute vec3 a_normal;

    varying vec3 v_normal;
    varying vec3 v_surfaceToView;

    void main() {
      v_normal = (u_worldInverseTranspose * vec4(a_normal, 0)).xyz;
      v_surfaceToView = (u_viewInverse[3] - (u_world * a_position)).xyz;
      gl_Position = u_worldViewProjection * a_position;
    }
    `;
        this.env_map_fs = `
    precision mediump float;

    uniform samplerCube u_texture;

    varying vec3 v_surfaceToView;
    varying vec3 v_normal;

    void main() {
      vec3 normal = normalize(v_normal);
      vec3 surfaceToView = normalize(v_surfaceToView);
      vec4 color = textureCube(u_texture, -reflect(surfaceToView, normal));
      gl_FragColor = color;
    }
    `;
        this.app = capp;
        this.gl = cgl;
        this.Prepare(dictpar);
        twgl.resizeCanvasToDisplaySize(this.gl.canvas);
        var szobj = 25.0;
        this.cam = camhandler.Camera.createYUpCamera(this.gl, dictpar, szobj, this.app);
        this.cam.zoominVelocity = szobj / 40.0;
        requestAnimationFrame(()=>this.render(0));
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------
    rand(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return min + Math.random() * (max - min);
    }
    drawCircle2D(time) {
        if (this.ctx2D != null) {
            this.ctx2D.fillStyle = "#00f";
            this.ctx2D.strokeStyle = "#ff0";
            this.ctx2D.lineWidth = 10; // changed to number in current version !
            this.ctx2D.fillRect(0, 0, this.ctx2D.canvas.width, this.ctx2D.canvas.height);
            this.ctx2D.beginPath();
            this.ctx2D.arc(this.ctx2D.canvas.width / 2, this.ctx2D.canvas.height / 2, this.ctx2D.canvas.width / 2.2 * Math.abs(Math.cos(time)), 0, Math.PI * 2);
            this.ctx2D.stroke();
        }
    }
    CreateAllTextures(gl, ctx, cubemapCtx, cubeFaceCvs) {
        var posxname = require("./images/yokohama/posx.jpg");
        var negxname = require("./images/yokohama/negx.jpg");
        var posyname = require("./images/yokohama/posy.jpg");
        var negyname = require("./images/yokohama/negy.jpg");
        var poszname = require("./images/yokohama/posz.jpg");
        var negzname = require("./images/yokohama/negz.jpg");
        var clovername = require("./images/clover.jpg");
        var hfticon16name = require("./images/hft-icon-16.png");
        var goldengatename = require("./images/goldengate.jpg");
        var textures = twgl.createTextures(gl, {
            // a power of 2 image
            hftIcon: {
                src: hfticon16name,
                mag: gl.NEAREST
            },
            // a non-power of 2 image
            clover: {
                src: clovername
            },
            // From a canvas
            fromCanvas: {
                src: ctx.canvas
            },
            // A cubemap from 6 images
            yokohama: {
                target: gl.TEXTURE_CUBE_MAP,
                src: [
                    posxname,
                    negxname,
                    posyname,
                    negyname,
                    poszname,
                    negzname, 
                ]
            },
            // A cubemap from 1 image (can be 1x6, 2x3, 3x2, 6x1)
            // twgl-full.js:1973 WebGL: INVALID_OPERATION: bindTexture: textures can not be used with multiple targets
            goldengate: {
                target: gl.TEXTURE_CUBE_MAP,
                src: goldengatename
            },
            // A 2x2 pixel texture from a JavaScript array
            checker: {
                mag: gl.NEAREST,
                min: gl.LINEAR,
                src: [
                    255,
                    255,
                    255,
                    255,
                    192,
                    192,
                    192,
                    255,
                    92,
                    92,
                    92,
                    255,
                    255,
                    255,
                    255,
                    255, 
                ]
            },
            // a 1x8 pixel texture from a typed array.
            stripe: {
                mag: gl.NEAREST,
                min: gl.LINEAR,
                format: gl.LUMINANCE,
                src: new Uint8Array([
                    255,
                    128,
                    255,
                    128,
                    255,
                    128,
                    255,
                    128, 
                ]),
                width: 1
            },
            // a cubemap from array
            cubemapFromArray: {
                target: gl.TEXTURE_CUBE_MAP,
                format: gl.RGBA,
                src: [
                    0xF0,
                    0x80,
                    0x80,
                    0xFF,
                    0x80,
                    0xE0,
                    0x80,
                    0xFF,
                    0x80,
                    0x80,
                    0xD0,
                    0xFF,
                    0xC0,
                    0x80,
                    0x80,
                    0xFF,
                    0x80,
                    0xB0,
                    0x80,
                    0xFF,
                    0x8F,
                    0x80,
                    0x00,
                    0xFF, 
                ]
            },
            cubemapFromCanvas: {
                target: gl.TEXTURE_CUBE_MAP,
                src: cubemapCtx === null || cubemapCtx === void 0 ? void 0 : cubemapCtx.canvas
            },
            //cubemapFrom6Canvases:  { target: gl.TEXTURE_CUBE_MAP, src: cubemapCtx?.canvas }, 
            cubemapFrom6Canvases: {
                target: gl.TEXTURE_CUBE_MAP,
                src: cubeFaceCvs
            }
        });
        return textures;
    }
    //=====================================================================================================================
    Prepare(dictpar) {
        twgl.setDefaults({
            attribPrefix: "a_"
        });
        const onePointProgramInfo = twgl.createProgramInfo(this.gl, [
            this.one_point_vs,
            this.one_point_fs
        ]);
        const envMapProgramInfo = twgl.createProgramInfo(this.gl, [
            this.env_map_vs,
            this.env_map_fs
        ]);
        const shapes = [
            twgl.primitives.createSphereBufferInfo(this.gl, 1, 24, 12),
            twgl.primitives.createCubeBufferInfo(this.gl, 2),
            twgl.primitives.createPlaneBufferInfo(this.gl, 2, 2),
            twgl.primitives.createTruncatedConeBufferInfo(this.gl, 1, 0, 2, 24, 1), 
        ];
        // A circle on a canvas
        this.ctx2D = document.createElement("canvas").getContext("2d");
        if (this.ctx2D) {
            this.ctx2D.canvas.width = 64;
            this.ctx2D.canvas.height = 64;
            this.drawCircle2D(0);
        }
        // A cubemap drawn to a canvas with a circle on each face.
        const cubemapCtx = document.createElement("canvas").getContext("2d");
        const size = 40;
        if (cubemapCtx) {
            cubemapCtx.canvas.width = size * 6;
            cubemapCtx.canvas.height = size;
            cubemapCtx.fillStyle = "#888";
            for(let ff = 0; ff < 6; ++ff){
                const color = chroma_js_1.default.hsv((this.baseHue + ff * 10) % 360, 1 - ff / 6, 1);
                cubemapCtx.fillStyle = color.darken().hex();
                cubemapCtx.fillRect(size * ff, 0, size, size);
                cubemapCtx.save();
                cubemapCtx.translate(size * (ff + 0.5), size * 0.5);
                cubemapCtx.beginPath();
                cubemapCtx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
                cubemapCtx.fillStyle = color.hex();
                cubemapCtx.fill();
                cubemapCtx.restore();
            }
        }
        var cubeFaceCanvases = new Array();
        // make 6 canvases to show loading from 6 element
        for(let ff1 = 0; ff1 < 6; ++ff1){
            const canvas = document.createElement("canvas");
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext("2d");
            const color1 = chroma_js_1.default.hsv((this.baseHue + ff1 * 10) % 360, 1 - ff1 / 6, 1);
            if (ctx != null) {
                ctx.fillStyle = color1.darken().hex();
                ctx.fillRect(0, 0, 128, 128);
                ctx.translate(64, 64);
                ctx.rotate(Math.PI * .05);
                ctx.fillStyle = color1.hex();
                ctx.fillRect(-40, -40, 80, 80);
                cubeFaceCanvases.push(canvas);
            }
        }
        if (this.gl && this.ctx2D && cubemapCtx) {
            this.textures = this.CreateAllTextures(this.gl, this.ctx2D, cubemapCtx, cubeFaceCanvases);
            console.log("All textures created.");
        }
        if (this.textures != null && this.textures != undefined) {
            // This is soley to make it easy to pick textures at random
            const twoDTextures = [
                this.textures.checker,
                this.textures.stripe,
                this.textures.hftIcon,
                this.textures.clover,
                this.textures.fromCanvas, 
            ];
            const cubeTextures = [
                this.textures.yokohama,
                this.textures.goldengate,
                this.textures.cubemapFromCanvas,
                this.textures.cubemapFrom6Canvases,
                this.textures.cubemapFromArray, 
            ];
            for(let ii = 0; ii < this.numObjects; ++ii){
                let uniforms;
                let programInfo;
                let shape;
                const renderType = this.rand(0, 2) | 0;
                switch(renderType){
                    case 0:
                        shape = shapes[ii % shapes.length];
                        programInfo = onePointProgramInfo;
                        uniforms = {
                            u_diffuseMult: chroma_js_1.default.hsv((this.baseHue + this.rand(0, 60)) % 360, 0.4, 0.8).gl(),
                            u_diffuse: twoDTextures[this.rand(0, twoDTextures.length) | 0],
                            u_viewInverse: twgl_js_1.m4.identity(),
                            u_world: twgl_js_1.m4.identity(),
                            u_worldInverseTranspose: twgl_js_1.m4.identity(),
                            u_worldViewProjection: twgl_js_1.m4.identity()
                        };
                        break;
                    case 1:
                        shape = this.rand(0, 2) < 1 ? shapes[1] : shapes[3];
                        programInfo = envMapProgramInfo;
                        uniforms = {
                            u_texture: cubeTextures[this.rand(0, cubeTextures.length) | 0],
                            u_viewInverse: twgl_js_1.m4.identity(),
                            u_world: twgl_js_1.m4.identity(),
                            u_worldInverseTranspose: twgl_js_1.m4.identity(),
                            u_worldViewProjection: twgl_js_1.m4.identity()
                        };
                        break;
                    default:
                        throw "wAT!";
                }
                this.drawItems.push(new Tdrawitem({
                    programInfo: programInfo,
                    bufferInfo: shape,
                    uniforms: uniforms
                }, {
                    translation: [
                        this.rand(-this.spreadRadius, this.spreadRadius),
                        this.rand(-this.spreadRadius, this.spreadRadius),
                        this.rand(-this.spreadRadius, this.spreadRadius)
                    ],
                    ySpeed: this.rand(1, 3),
                    zSpeed: this.rand(1, 3),
                    uniforms: uniforms
                }));
            /*   this.drawObjects.push( new Tdrawobject({
                     programInfo: programInfo,
                     bufferInfo: shape,
                     uniforms: uniforms,
                   }))    ;
                */ /*
                   this.drawObjects.push({
                       programInfo: programInfo,
                       bufferInfo: shape,
                       uniforms: uniforms,
                     } );
                     */ /*   this.objects.push({
                       translation: [this.rand(-this.spreadRadius, this.spreadRadius), this.rand(-this.spreadRadius, this.spreadRadius), this.rand(-this.spreadRadius, this.spreadRadius)],
                       ySpeed: this.rand(1, 3),
                       zSpeed: this.rand(1, 3),
                       uniforms: uniforms,
                     } ); */ } // for
        } // if textures!=null
    }
    //===========================================================================================================
    render(time) {
        if (this.gl == null || this.textures == null || this.ctx2D == null) return;
        // prepare window
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // update the dynamic texture canvas (grow circle)
        this.drawCircle2D(time);
        twgl.setTextureFromElement(this.gl, this.textures.fromCanvas, this.ctx2D.canvas);
        // refer camera to Identity world
        var world1 = twgl_js_1.m4.identity();
        //this.cam.invworldmat = m4.inverse(world1);
        this.cam.CamHandlingYUp(this.gl, this.app);
        // rotate the objects local worlds
        this.drawItems.forEach((obj)=>{
            const uni = obj.obj.uniforms;
            const world = twgl_js_1.m4.identity(); // local worlds turn
            twgl_js_1.m4.translate(world, obj.obj.translation, world);
            twgl_js_1.m4.rotateY(world, time * obj.obj.ySpeed, world);
            twgl_js_1.m4.rotateZ(world, time * obj.obj.zSpeed, world);
            uni.u_world = world; // this object's world     
            uni.u_worldInverseTranspose = twgl_js_1.m4.transpose(twgl_js_1.m4.inverse(world1));
            twgl_js_1.m4.multiply(this.cam.viewProjection, world, uni.u_worldViewProjection); // this object's matrix
        });
        // let twgl draw each drawObject
        twgl.drawObjectList(this.gl, Tdrawitem.getTwglDrawObjects(this.drawItems));
        // .. next
        requestAnimationFrame(()=>this.render(time + this.dtime));
    }
}
exports.ManyTextures = ManyTextures;

},{"chroma-js":"iVrwS","./../node_modules/twgl.js":"3uqAP","./camhandler":"4jukU","./images/yokohama/posx.jpg":"6MAhy","./images/yokohama/negx.jpg":"d4Kua","./images/yokohama/posy.jpg":"jQrDm","./images/yokohama/negy.jpg":"5tE9m","./images/yokohama/posz.jpg":"axQiE","./images/yokohama/negz.jpg":"10sgW","./images/clover.jpg":"iLTuo","./images/hft-icon-16.png":"5NVKv","./images/goldengate.jpg":"Cud2t"}],"iVrwS":[function(require,module,exports) {
/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */ (function(global, factory) {
    module.exports = factory();
})(this, function() {
    "use strict";
    var limit$2 = function(x, min, max) {
        if (min === void 0) min = 0;
        if (max === void 0) max = 1;
        return x < min ? min : x > max ? max : x;
    };
    var limit$1 = limit$2;
    var clip_rgb$3 = function(rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for(var i = 0; i <= 3; i++){
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) rgb._clipped = true;
                rgb[i] = limit$1(rgb[i], 0, 255);
            } else if (i === 3) rgb[i] = limit$1(rgb[i], 0, 1);
        }
        return rgb;
    };
    // ported from jQuery's $.type
    var classToType = {};
    for(var i$1 = 0, list$1 = [
        "Boolean",
        "Number",
        "String",
        "Function",
        "Array",
        "Date",
        "RegExp",
        "Undefined",
        "Null"
    ]; i$1 < list$1.length; i$1 += 1){
        var name = list$1[i$1];
        classToType["[object " + name + "]"] = name.toLowerCase();
    }
    var type$p = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };
    var type$o = type$p;
    var unpack$B = function(args, keyOrder) {
        if (keyOrder === void 0) keyOrder = null;
        // if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) return Array.prototype.slice.call(args);
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
        if (type$o(args[0]) == "object" && keyOrder) return keyOrder.split("").filter(function(k) {
            return args[0][k] !== undefined;
        }).map(function(k) {
            return args[0][k];
        });
        // otherwise we just return the first argument
        // (which we suppose is an array of args)
        return args[0];
    };
    var type$n = type$p;
    var last$4 = function(args) {
        if (args.length < 2) return null;
        var l = args.length - 1;
        if (type$n(args[l]) == "string") return args[l].toLowerCase();
        return null;
    };
    var PI$2 = Math.PI;
    var utils = {
        clip_rgb: clip_rgb$3,
        limit: limit$2,
        type: type$p,
        unpack: unpack$B,
        last: last$4,
        PI: PI$2,
        TWOPI: PI$2 * 2,
        PITHIRD: PI$2 / 3,
        DEG2RAD: PI$2 / 180,
        RAD2DEG: 180 / PI$2
    };
    var input$h = {
        format: {},
        autodetect: []
    };
    var last$3 = utils.last;
    var clip_rgb$2 = utils.clip_rgb;
    var type$m = utils.type;
    var _input = input$h;
    var Color$D = function Color() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var me = this;
        if (type$m(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) // the argument is already a Color instance
        return args[0];
        // last argument could be the mode
        var mode = last$3(args);
        var autodetect = false;
        if (!mode) {
            autodetect = true;
            if (!_input.sorted) {
                _input.autodetect = _input.autodetect.sort(function(a, b) {
                    return b.p - a.p;
                });
                _input.sorted = true;
            }
            // auto-detect format
            for(var i = 0, list = _input.autodetect; i < list.length; i += 1){
                var chk = list[i];
                mode = chk.test.apply(chk, args);
                if (mode) break;
            }
        }
        if (_input.format[mode]) {
            var rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
            me._rgb = clip_rgb$2(rgb);
        } else throw new Error("unknown format: " + args);
        // add alpha channel
        if (me._rgb.length === 3) me._rgb.push(1);
    };
    Color$D.prototype.toString = function toString() {
        if (type$m(this.hex) == "function") return this.hex();
        return "[" + this._rgb.join(",") + "]";
    };
    var Color_1 = Color$D;
    var chroma$k = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(chroma$k.Color, [
            null
        ].concat(args)));
    };
    chroma$k.Color = Color_1;
    chroma$k.version = "2.4.2";
    var chroma_1 = chroma$k;
    var unpack$A = utils.unpack;
    var max$2 = Math.max;
    var rgb2cmyk$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$A(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max$2(r, max$2(g, b));
        var f = k < 1 ? 1 / (1 - k) : 0;
        var c = (1 - r - k) * f;
        var m = (1 - g - k) * f;
        var y = (1 - b - k) * f;
        return [
            c,
            m,
            y,
            k
        ];
    };
    var rgb2cmyk_1 = rgb2cmyk$1;
    var unpack$z = utils.unpack;
    var cmyk2rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$z(args, "cmyk");
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) return [
            0,
            0,
            0,
            alpha
        ];
        return [
            c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
            m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
            y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
            alpha
        ];
    };
    var cmyk2rgb_1 = cmyk2rgb;
    var chroma$j = chroma_1;
    var Color$C = Color_1;
    var input$g = input$h;
    var unpack$y = utils.unpack;
    var type$l = utils.type;
    var rgb2cmyk = rgb2cmyk_1;
    Color$C.prototype.cmyk = function() {
        return rgb2cmyk(this._rgb);
    };
    chroma$j.cmyk = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$C, [
            null
        ].concat(args, [
            "cmyk"
        ])));
    };
    input$g.format.cmyk = cmyk2rgb_1;
    input$g.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$y(args, "cmyk");
            if (type$l(args) === "array" && args.length === 4) return "cmyk";
        }
    });
    var unpack$x = utils.unpack;
    var last$2 = utils.last;
    var rnd = function(a) {
        return Math.round(a * 100) / 100;
    };
    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */ var hsl2css$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var hsla = unpack$x(args, "hsla");
        var mode = last$2(args) || "lsa";
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1] * 100) + "%";
        hsla[2] = rnd(hsla[2] * 100) + "%";
        if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = "hsla";
        } else hsla.length = 3;
        return mode + "(" + hsla.join(",") + ")";
    };
    var hsl2css_1 = hsl2css$1;
    var unpack$w = utils.unpack;
    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */ var rgb2hsl$3 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$w(args, "rgba");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var l = (max + min) / 2;
        var s, h;
        if (max === min) {
            s = 0;
            h = Number.NaN;
        } else s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        if (r == max) h = (g - b) / (max - min);
        else if (g == max) h = 2 + (b - r) / (max - min);
        else if (b == max) h = 4 + (r - g) / (max - min);
        h *= 60;
        if (h < 0) h += 360;
        if (args.length > 3 && args[3] !== undefined) return [
            h,
            s,
            l,
            args[3]
        ];
        return [
            h,
            s,
            l
        ];
    };
    var rgb2hsl_1 = rgb2hsl$3;
    var unpack$v = utils.unpack;
    var last$1 = utils.last;
    var hsl2css = hsl2css_1;
    var rgb2hsl$2 = rgb2hsl_1;
    var round$6 = Math.round;
    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */ var rgb2css$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var rgba = unpack$v(args, "rgba");
        var mode = last$1(args) || "rgb";
        if (mode.substr(0, 3) == "hsl") return hsl2css(rgb2hsl$2(rgba), mode);
        rgba[0] = round$6(rgba[0]);
        rgba[1] = round$6(rgba[1]);
        rgba[2] = round$6(rgba[2]);
        if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = "rgba";
        }
        return mode + "(" + rgba.slice(0, mode === "rgb" ? 3 : 4).join(",") + ")";
    };
    var rgb2css_1 = rgb2css$1;
    var unpack$u = utils.unpack;
    var round$5 = Math.round;
    var hsl2rgb$1 = function() {
        var assign;
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$u(args, "hsl");
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r, g, b;
        if (s === 0) r = g = b = l * 255;
        else {
            var t3 = [
                0,
                0,
                0
            ];
            var c = [
                0,
                0,
                0
            ];
            var t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1 / 3;
            t3[1] = h_;
            t3[2] = h_ - 1 / 3;
            for(var i = 0; i < 3; i++){
                if (t3[i] < 0) t3[i] += 1;
                if (t3[i] > 1) t3[i] -= 1;
                if (6 * t3[i] < 1) c[i] = t1 + (t2 - t1) * 6 * t3[i];
                else if (2 * t3[i] < 1) c[i] = t2;
                else if (3 * t3[i] < 2) c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
                else c[i] = t1;
            }
            assign = [
                round$5(c[0] * 255),
                round$5(c[1] * 255),
                round$5(c[2] * 255)
            ], r = assign[0], g = assign[1], b = assign[2];
        }
        if (args.length > 3) // keep alpha channel
        return [
            r,
            g,
            b,
            args[3]
        ];
        return [
            r,
            g,
            b,
            1
        ];
    };
    var hsl2rgb_1 = hsl2rgb$1;
    var hsl2rgb = hsl2rgb_1;
    var input$f = input$h;
    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var round$4 = Math.round;
    var css2rgb$1 = function(css) {
        css = css.toLowerCase().trim();
        var m;
        if (input$f.format.named) try {
            return input$f.format.named(css);
        } catch (e) {
        // eslint-disable-next-line
        }
        // rgb(250,20,0)
        if (m = css.match(RE_RGB)) {
            var rgb = m.slice(1, 4);
            for(var i = 0; i < 3; i++)rgb[i] = +rgb[i];
            rgb[3] = 1; // default alpha
            return rgb;
        }
        // rgba(250,20,0,0.4)
        if (m = css.match(RE_RGBA)) {
            var rgb$1 = m.slice(1, 5);
            for(var i$1 = 0; i$1 < 4; i$1++)rgb$1[i$1] = +rgb$1[i$1];
            return rgb$1;
        }
        // rgb(100%,0%,0%)
        if (m = css.match(RE_RGB_PCT)) {
            var rgb$2 = m.slice(1, 4);
            for(var i$2 = 0; i$2 < 3; i$2++)rgb$2[i$2] = round$4(rgb$2[i$2] * 2.55);
            rgb$2[3] = 1; // default alpha
            return rgb$2;
        }
        // rgba(100%,0%,0%,0.4)
        if (m = css.match(RE_RGBA_PCT)) {
            var rgb$3 = m.slice(1, 5);
            for(var i$3 = 0; i$3 < 3; i$3++)rgb$3[i$3] = round$4(rgb$3[i$3] * 2.55);
            rgb$3[3] = +rgb$3[3];
            return rgb$3;
        }
        // hsl(0,100%,50%)
        if (m = css.match(RE_HSL)) {
            var hsl = m.slice(1, 4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }
        // hsla(0,100%,50%,0.5)
        if (m = css.match(RE_HSLA)) {
            var hsl$1 = m.slice(1, 4);
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb(hsl$1);
            rgb$5[3] = +m[4]; // default alpha = 1
            return rgb$5;
        }
    };
    css2rgb$1.test = function(s) {
        return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
    };
    var css2rgb_1 = css2rgb$1;
    var chroma$i = chroma_1;
    var Color$B = Color_1;
    var input$e = input$h;
    var type$k = utils.type;
    var rgb2css = rgb2css_1;
    var css2rgb = css2rgb_1;
    Color$B.prototype.css = function(mode) {
        return rgb2css(this._rgb, mode);
    };
    chroma$i.css = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$B, [
            null
        ].concat(args, [
            "css"
        ])));
    };
    input$e.format.css = css2rgb;
    input$e.autodetect.push({
        p: 5,
        test: function(h) {
            var rest = [], len = arguments.length - 1;
            while(len-- > 0)rest[len] = arguments[len + 1];
            if (!rest.length && type$k(h) === "string" && css2rgb.test(h)) return "css";
        }
    });
    var Color$A = Color_1;
    var chroma$h = chroma_1;
    var input$d = input$h;
    var unpack$t = utils.unpack;
    input$d.format.gl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var rgb = unpack$t(args, "rgba");
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };
    chroma$h.gl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$A, [
            null
        ].concat(args, [
            "gl"
        ])));
    };
    Color$A.prototype.gl = function() {
        var rgb = this._rgb;
        return [
            rgb[0] / 255,
            rgb[1] / 255,
            rgb[2] / 255,
            rgb[3]
        ];
    };
    var unpack$s = utils.unpack;
    var rgb2hcg$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$s(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var c = delta * 100 / 255;
        var _g = min / (255 - delta) * 100;
        var h;
        if (delta === 0) h = Number.NaN;
        else {
            if (r === max) h = (g - b) / delta;
            if (g === max) h = 2 + (b - r) / delta;
            if (b === max) h = 4 + (r - g) / delta;
            h *= 60;
            if (h < 0) h += 360;
        }
        return [
            h,
            c,
            _g
        ];
    };
    var rgb2hcg_1 = rgb2hcg$1;
    var unpack$r = utils.unpack;
    var floor$3 = Math.floor;
    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */ var hcg2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$r(args, "hcg");
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r, g, b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) r = g = b = _g;
        else {
            if (h === 360) h = 0;
            if (h > 360) h -= 360;
            if (h < 0) h += 360;
            h /= 60;
            var i = floor$3(h);
            var f = h - i;
            var p = _g * (1 - c);
            var q = p + _c * (1 - f);
            var t = p + _c * f;
            var v = p + _c;
            switch(i){
                case 0:
                    assign = [
                        v,
                        t,
                        p
                    ], r = assign[0], g = assign[1], b = assign[2];
                    break;
                case 1:
                    assign$1 = [
                        q,
                        v,
                        p
                    ], r = assign$1[0], g = assign$1[1], b = assign$1[2];
                    break;
                case 2:
                    assign$2 = [
                        p,
                        v,
                        t
                    ], r = assign$2[0], g = assign$2[1], b = assign$2[2];
                    break;
                case 3:
                    assign$3 = [
                        p,
                        q,
                        v
                    ], r = assign$3[0], g = assign$3[1], b = assign$3[2];
                    break;
                case 4:
                    assign$4 = [
                        t,
                        p,
                        v
                    ], r = assign$4[0], g = assign$4[1], b = assign$4[2];
                    break;
                case 5:
                    assign$5 = [
                        v,
                        p,
                        q
                    ], r = assign$5[0], g = assign$5[1], b = assign$5[2];
                    break;
            }
        }
        return [
            r,
            g,
            b,
            args.length > 3 ? args[3] : 1
        ];
    };
    var hcg2rgb_1 = hcg2rgb;
    var unpack$q = utils.unpack;
    var type$j = utils.type;
    var chroma$g = chroma_1;
    var Color$z = Color_1;
    var input$c = input$h;
    var rgb2hcg = rgb2hcg_1;
    Color$z.prototype.hcg = function() {
        return rgb2hcg(this._rgb);
    };
    chroma$g.hcg = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$z, [
            null
        ].concat(args, [
            "hcg"
        ])));
    };
    input$c.format.hcg = hcg2rgb_1;
    input$c.autodetect.push({
        p: 1,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$q(args, "hcg");
            if (type$j(args) === "array" && args.length === 3) return "hcg";
        }
    });
    var unpack$p = utils.unpack;
    var last = utils.last;
    var round$3 = Math.round;
    var rgb2hex$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$p(args, "rgba");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last(args) || "auto";
        if (a === undefined) a = 1;
        if (mode === "auto") mode = a < 1 ? "rgba" : "rgb";
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        var hxa = "0" + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch(mode.toLowerCase()){
            case "rgba":
                return "#" + str + hxa;
            case "argb":
                return "#" + hxa + str;
            default:
                return "#" + str;
        }
    };
    var rgb2hex_1 = rgb2hex$2;
    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
    var hex2rgb$1 = function(hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) hex = hex.substr(1);
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split("");
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [
                r,
                g,
                b,
                1
            ];
        }
        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) // remove optional leading #
            hex = hex.substr(1);
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split("");
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [
                r$1,
                g$1,
                b$1,
                a
            ];
        }
        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb
        throw new Error("unknown hex color: " + hex);
    };
    var hex2rgb_1 = hex2rgb$1;
    var chroma$f = chroma_1;
    var Color$y = Color_1;
    var type$i = utils.type;
    var input$b = input$h;
    var rgb2hex$1 = rgb2hex_1;
    Color$y.prototype.hex = function(mode) {
        return rgb2hex$1(this._rgb, mode);
    };
    chroma$f.hex = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$y, [
            null
        ].concat(args, [
            "hex"
        ])));
    };
    input$b.format.hex = hex2rgb_1;
    input$b.autodetect.push({
        p: 4,
        test: function(h) {
            var rest = [], len = arguments.length - 1;
            while(len-- > 0)rest[len] = arguments[len + 1];
            if (!rest.length && type$i(h) === "string" && [
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ].indexOf(h.length) >= 0) return "hex";
        }
    });
    var unpack$o = utils.unpack;
    var TWOPI$2 = utils.TWOPI;
    var min$2 = Math.min;
    var sqrt$4 = Math.sqrt;
    var acos = Math.acos;
    var rgb2hsi$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */ var ref = unpack$o(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min$2(r, g, b);
        var i = (r + g + b) / 3;
        var s = i > 0 ? 1 - min_ / i : 0;
        if (s === 0) h = NaN;
        else {
            h = (r - g + (r - b)) / 2;
            h /= sqrt$4((r - g) * (r - g) + (r - b) * (g - b));
            h = acos(h);
            if (b > g) h = TWOPI$2 - h;
            h /= TWOPI$2;
        }
        return [
            h * 360,
            s,
            i
        ];
    };
    var rgb2hsi_1 = rgb2hsi$1;
    var unpack$n = utils.unpack;
    var limit = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos$4 = Math.cos;
    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */ var hsi2rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */ args = unpack$n(args, "hsi");
        var h = args[0];
        var s = args[1];
        var i = args[2];
        var r, g, b;
        if (isNaN(h)) h = 0;
        if (isNaN(s)) s = 0;
        // normalize hue
        if (h > 360) h -= 360;
        if (h < 0) h += 360;
        h /= 360;
        if (h < 1 / 3) {
            b = (1 - s) / 3;
            r = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
            g = 1 - (b + r);
        } else if (h < 2 / 3) {
            h -= 1 / 3;
            r = (1 - s) / 3;
            g = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
            b = 1 - (r + g);
        } else {
            h -= 2 / 3;
            g = (1 - s) / 3;
            b = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
            r = 1 - (g + b);
        }
        r = limit(i * r * 3);
        g = limit(i * g * 3);
        b = limit(i * b * 3);
        return [
            r * 255,
            g * 255,
            b * 255,
            args.length > 3 ? args[3] : 1
        ];
    };
    var hsi2rgb_1 = hsi2rgb;
    var unpack$m = utils.unpack;
    var type$h = utils.type;
    var chroma$e = chroma_1;
    var Color$x = Color_1;
    var input$a = input$h;
    var rgb2hsi = rgb2hsi_1;
    Color$x.prototype.hsi = function() {
        return rgb2hsi(this._rgb);
    };
    chroma$e.hsi = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$x, [
            null
        ].concat(args, [
            "hsi"
        ])));
    };
    input$a.format.hsi = hsi2rgb_1;
    input$a.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$m(args, "hsi");
            if (type$h(args) === "array" && args.length === 3) return "hsi";
        }
    });
    var unpack$l = utils.unpack;
    var type$g = utils.type;
    var chroma$d = chroma_1;
    var Color$w = Color_1;
    var input$9 = input$h;
    var rgb2hsl$1 = rgb2hsl_1;
    Color$w.prototype.hsl = function() {
        return rgb2hsl$1(this._rgb);
    };
    chroma$d.hsl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$w, [
            null
        ].concat(args, [
            "hsl"
        ])));
    };
    input$9.format.hsl = hsl2rgb_1;
    input$9.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$l(args, "hsl");
            if (type$g(args) === "array" && args.length === 3) return "hsl";
        }
    });
    var unpack$k = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;
    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */ var rgb2hsl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$k(args, "rgb");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h, s, v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) h = (g - b) / delta;
            if (g === max_) h = 2 + (b - r) / delta;
            if (b === max_) h = 4 + (r - g) / delta;
            h *= 60;
            if (h < 0) h += 360;
        }
        return [
            h,
            s,
            v
        ];
    };
    var rgb2hsv$1 = rgb2hsl;
    var unpack$j = utils.unpack;
    var floor$2 = Math.floor;
    var hsv2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$j(args, "hsv");
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r, g, b;
        v *= 255;
        if (s === 0) r = g = b = v;
        else {
            if (h === 360) h = 0;
            if (h > 360) h -= 360;
            if (h < 0) h += 360;
            h /= 60;
            var i = floor$2(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));
            switch(i){
                case 0:
                    assign = [
                        v,
                        t,
                        p
                    ], r = assign[0], g = assign[1], b = assign[2];
                    break;
                case 1:
                    assign$1 = [
                        q,
                        v,
                        p
                    ], r = assign$1[0], g = assign$1[1], b = assign$1[2];
                    break;
                case 2:
                    assign$2 = [
                        p,
                        v,
                        t
                    ], r = assign$2[0], g = assign$2[1], b = assign$2[2];
                    break;
                case 3:
                    assign$3 = [
                        p,
                        q,
                        v
                    ], r = assign$3[0], g = assign$3[1], b = assign$3[2];
                    break;
                case 4:
                    assign$4 = [
                        t,
                        p,
                        v
                    ], r = assign$4[0], g = assign$4[1], b = assign$4[2];
                    break;
                case 5:
                    assign$5 = [
                        v,
                        p,
                        q
                    ], r = assign$5[0], g = assign$5[1], b = assign$5[2];
                    break;
            }
        }
        return [
            r,
            g,
            b,
            args.length > 3 ? args[3] : 1
        ];
    };
    var hsv2rgb_1 = hsv2rgb;
    var unpack$i = utils.unpack;
    var type$f = utils.type;
    var chroma$c = chroma_1;
    var Color$v = Color_1;
    var input$8 = input$h;
    var rgb2hsv = rgb2hsv$1;
    Color$v.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
    };
    chroma$c.hsv = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$v, [
            null
        ].concat(args, [
            "hsv"
        ])));
    };
    input$8.format.hsv = hsv2rgb_1;
    input$8.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$i(args, "hsv");
            if (type$f(args) === "array" && args.length === 3) return "hsv";
        }
    });
    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,
        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,
        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 0.008856452
    };
    var LAB_CONSTANTS$3 = labConstants;
    var unpack$h = utils.unpack;
    var pow$a = Math.pow;
    var rgb2lab$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$h(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r, g, b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [
            l < 0 ? 0 : l,
            500 * (x - y),
            200 * (y - z)
        ];
    };
    var rgb_xyz = function(r) {
        if ((r /= 255) <= 0.04045) return r / 12.92;
        return pow$a((r + 0.055) / 1.055, 2.4);
    };
    var xyz_lab = function(t) {
        if (t > LAB_CONSTANTS$3.t3) return pow$a(t, 1 / 3);
        return t / LAB_CONSTANTS$3.t2 + LAB_CONSTANTS$3.t0;
    };
    var rgb2xyz = function(r, g, b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS$3.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS$3.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS$3.Zn);
        return [
            x,
            y,
            z
        ];
    };
    var rgb2lab_1 = rgb2lab$2;
    var LAB_CONSTANTS$2 = labConstants;
    var unpack$g = utils.unpack;
    var pow$9 = Math.pow;
    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */ var lab2rgb$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$g(args, "lab");
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x, y, z, r, g, b_;
        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;
        y = LAB_CONSTANTS$2.Yn * lab_xyz(y);
        x = LAB_CONSTANTS$2.Xn * lab_xyz(x);
        z = LAB_CONSTANTS$2.Zn * lab_xyz(z);
        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z); // D65 -> sRGB
        g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
        return [
            r,
            g,
            b_,
            args.length > 3 ? args[3] : 1
        ];
    };
    var xyz_rgb = function(r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$9(r, 1 / 2.4) - 0.055);
    };
    var lab_xyz = function(t) {
        return t > LAB_CONSTANTS$2.t1 ? t * t * t : LAB_CONSTANTS$2.t2 * (t - LAB_CONSTANTS$2.t0);
    };
    var lab2rgb_1 = lab2rgb$1;
    var unpack$f = utils.unpack;
    var type$e = utils.type;
    var chroma$b = chroma_1;
    var Color$u = Color_1;
    var input$7 = input$h;
    var rgb2lab$1 = rgb2lab_1;
    Color$u.prototype.lab = function() {
        return rgb2lab$1(this._rgb);
    };
    chroma$b.lab = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$u, [
            null
        ].concat(args, [
            "lab"
        ])));
    };
    input$7.format.lab = lab2rgb_1;
    input$7.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$f(args, "lab");
            if (type$e(args) === "array" && args.length === 3) return "lab";
        }
    });
    var unpack$e = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$3 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var round$2 = Math.round;
    var lab2lch$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$e(args, "lab");
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$3(a * a + b * b);
        var h = (atan2$2(b, a) * RAD2DEG + 360) % 360;
        if (round$2(c * 10000) === 0) h = Number.NaN;
        return [
            l,
            c,
            h
        ];
    };
    var lab2lch_1 = lab2lch$2;
    var unpack$d = utils.unpack;
    var rgb2lab = rgb2lab_1;
    var lab2lch$1 = lab2lch_1;
    var rgb2lch$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$d(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch$1(l, a, b_);
    };
    var rgb2lch_1 = rgb2lch$1;
    var unpack$c = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin$3 = Math.sin;
    var cos$3 = Math.cos;
    var lch2lab$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */ var ref = unpack$c(args, "lch");
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) h = 0;
        h = h * DEG2RAD;
        return [
            l,
            cos$3(h) * c,
            sin$3(h) * c
        ];
    };
    var lch2lab_1 = lch2lab$2;
    var unpack$b = utils.unpack;
    var lch2lab$1 = lch2lab_1;
    var lab2rgb = lab2rgb_1;
    var lch2rgb$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$b(args, "lch");
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab$1(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [
            r,
            g,
            b,
            args.length > 3 ? args[3] : 1
        ];
    };
    var lch2rgb_1 = lch2rgb$1;
    var unpack$a = utils.unpack;
    var lch2rgb = lch2rgb_1;
    var hcl2rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var hcl = unpack$a(args, "hcl").reverse();
        return lch2rgb.apply(void 0, hcl);
    };
    var hcl2rgb_1 = hcl2rgb;
    var unpack$9 = utils.unpack;
    var type$d = utils.type;
    var chroma$a = chroma_1;
    var Color$t = Color_1;
    var input$6 = input$h;
    var rgb2lch = rgb2lch_1;
    Color$t.prototype.lch = function() {
        return rgb2lch(this._rgb);
    };
    Color$t.prototype.hcl = function() {
        return rgb2lch(this._rgb).reverse();
    };
    chroma$a.lch = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$t, [
            null
        ].concat(args, [
            "lch"
        ])));
    };
    chroma$a.hcl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$t, [
            null
        ].concat(args, [
            "hcl"
        ])));
    };
    input$6.format.lch = lch2rgb_1;
    input$6.format.hcl = hcl2rgb_1;
    [
        "lch",
        "hcl"
    ].forEach(function(m) {
        return input$6.autodetect.push({
            p: 2,
            test: function() {
                var args = [], len = arguments.length;
                while(len--)args[len] = arguments[len];
                args = unpack$9(args, m);
                if (type$d(args) === "array" && args.length === 3) return m;
            }
        });
    });
    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */ var w3cx11$1 = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflower: "#6495ed",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };
    var w3cx11_1 = w3cx11$1;
    var Color$s = Color_1;
    var input$5 = input$h;
    var type$c = utils.type;
    var w3cx11 = w3cx11_1;
    var hex2rgb = hex2rgb_1;
    var rgb2hex = rgb2hex_1;
    Color$s.prototype.name = function() {
        var hex = rgb2hex(this._rgb, "rgb");
        for(var i = 0, list = Object.keys(w3cx11); i < list.length; i += 1){
            var n = list[i];
            if (w3cx11[n] === hex) return n.toLowerCase();
        }
        return hex;
    };
    input$5.format.named = function(name) {
        name = name.toLowerCase();
        if (w3cx11[name]) return hex2rgb(w3cx11[name]);
        throw new Error("unknown color name: " + name);
    };
    input$5.autodetect.push({
        p: 5,
        test: function(h) {
            var rest = [], len = arguments.length - 1;
            while(len-- > 0)rest[len] = arguments[len + 1];
            if (!rest.length && type$c(h) === "string" && w3cx11[h.toLowerCase()]) return "named";
        }
    });
    var unpack$8 = utils.unpack;
    var rgb2num$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$8(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
    };
    var rgb2num_1 = rgb2num$1;
    var type$b = utils.type;
    var num2rgb = function(num) {
        if (type$b(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
            var r = num >> 16;
            var g = num >> 8 & 0xFF;
            var b = num & 0xFF;
            return [
                r,
                g,
                b,
                1
            ];
        }
        throw new Error("unknown num color: " + num);
    };
    var num2rgb_1 = num2rgb;
    var chroma$9 = chroma_1;
    var Color$r = Color_1;
    var input$4 = input$h;
    var type$a = utils.type;
    var rgb2num = rgb2num_1;
    Color$r.prototype.num = function() {
        return rgb2num(this._rgb);
    };
    chroma$9.num = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$r, [
            null
        ].concat(args, [
            "num"
        ])));
    };
    input$4.format.num = num2rgb_1;
    input$4.autodetect.push({
        p: 5,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            if (args.length === 1 && type$a(args[0]) === "number" && args[0] >= 0 && args[0] <= 0xFFFFFF) return "num";
        }
    });
    var chroma$8 = chroma_1;
    var Color$q = Color_1;
    var input$3 = input$h;
    var unpack$7 = utils.unpack;
    var type$9 = utils.type;
    var round$1 = Math.round;
    Color$q.prototype.rgb = function(rnd) {
        if (rnd === void 0) rnd = true;
        if (rnd === false) return this._rgb.slice(0, 3);
        return this._rgb.slice(0, 3).map(round$1);
    };
    Color$q.prototype.rgba = function(rnd) {
        if (rnd === void 0) rnd = true;
        return this._rgb.slice(0, 4).map(function(v, i) {
            return i < 3 ? rnd === false ? v : round$1(v) : v;
        });
    };
    chroma$8.rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$q, [
            null
        ].concat(args, [
            "rgb"
        ])));
    };
    input$3.format.rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var rgba = unpack$7(args, "rgba");
        if (rgba[3] === undefined) rgba[3] = 1;
        return rgba;
    };
    input$3.autodetect.push({
        p: 3,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$7(args, "rgba");
            if (type$9(args) === "array" && (args.length === 3 || args.length === 4 && type$9(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) return "rgb";
        }
    });
    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */ var log$1 = Math.log;
    var temperature2rgb$1 = function(kelvin) {
        var temp = kelvin / 100;
        var r, g, b;
        if (temp < 66) {
            r = 255;
            g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log$1(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log$1(b);
        } else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log$1(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log$1(g);
            b = 255;
        }
        return [
            r,
            g,
            b,
            1
        ];
    };
    var temperature2rgb_1 = temperature2rgb$1;
    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/ var temperature2rgb = temperature2rgb_1;
    var unpack$6 = utils.unpack;
    var round = Math.round;
    var rgb2temperature$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var rgb = unpack$6(args, "rgb");
        var r = rgb[0], b = rgb[2];
        var minTemp = 1000;
        var maxTemp = 40000;
        var eps = 0.4;
        var temp;
        while(maxTemp - minTemp > eps){
            temp = (maxTemp + minTemp) * 0.5;
            var rgb$1 = temperature2rgb(temp);
            if (rgb$1[2] / rgb$1[0] >= b / r) maxTemp = temp;
            else minTemp = temp;
        }
        return round(temp);
    };
    var rgb2temperature_1 = rgb2temperature$1;
    var chroma$7 = chroma_1;
    var Color$p = Color_1;
    var input$2 = input$h;
    var rgb2temperature = rgb2temperature_1;
    Color$p.prototype.temp = Color$p.prototype.kelvin = Color$p.prototype.temperature = function() {
        return rgb2temperature(this._rgb);
    };
    chroma$7.temp = chroma$7.kelvin = chroma$7.temperature = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$p, [
            null
        ].concat(args, [
            "temp"
        ])));
    };
    input$2.format.temp = input$2.format.kelvin = input$2.format.temperature = temperature2rgb_1;
    var unpack$5 = utils.unpack;
    var cbrt = Math.cbrt;
    var pow$8 = Math.pow;
    var sign$1 = Math.sign;
    var rgb2oklab$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        // OKLab color space implementation taken from
        // https://bottosson.github.io/posts/oklab/
        var ref = unpack$5(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = [
            rgb2lrgb(r / 255),
            rgb2lrgb(g / 255),
            rgb2lrgb(b / 255)
        ];
        var lr = ref$1[0];
        var lg = ref$1[1];
        var lb = ref$1[2];
        var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        var m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
        return [
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
        ];
    };
    var rgb2oklab_1 = rgb2oklab$2;
    function rgb2lrgb(c) {
        var abs = Math.abs(c);
        if (abs < 0.04045) return c / 12.92;
        return (sign$1(c) || 1) * pow$8((abs + 0.055) / 1.055, 2.4);
    }
    var unpack$4 = utils.unpack;
    var pow$7 = Math.pow;
    var sign = Math.sign;
    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */ var oklab2rgb$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$4(args, "lab");
        var L = args[0];
        var a = args[1];
        var b = args[2];
        var l = pow$7(L + 0.3963377774 * a + 0.2158037573 * b, 3);
        var m = pow$7(L - 0.1055613458 * a - 0.0638541728 * b, 3);
        var s = pow$7(L - 0.0894841775 * a - 1.291485548 * b, 3);
        return [
            255 * lrgb2rgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
            255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
            255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
            args.length > 3 ? args[3] : 1
        ];
    };
    var oklab2rgb_1 = oklab2rgb$1;
    function lrgb2rgb(c) {
        var abs = Math.abs(c);
        if (abs > 0.0031308) return (sign(c) || 1) * (1.055 * pow$7(abs, 1 / 2.4) - 0.055);
        return c * 12.92;
    }
    var unpack$3 = utils.unpack;
    var type$8 = utils.type;
    var chroma$6 = chroma_1;
    var Color$o = Color_1;
    var input$1 = input$h;
    var rgb2oklab$1 = rgb2oklab_1;
    Color$o.prototype.oklab = function() {
        return rgb2oklab$1(this._rgb);
    };
    chroma$6.oklab = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$o, [
            null
        ].concat(args, [
            "oklab"
        ])));
    };
    input$1.format.oklab = oklab2rgb_1;
    input$1.autodetect.push({
        p: 3,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$3(args, "oklab");
            if (type$8(args) === "array" && args.length === 3) return "oklab";
        }
    });
    var unpack$2 = utils.unpack;
    var rgb2oklab = rgb2oklab_1;
    var lab2lch = lab2lch_1;
    var rgb2oklch$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$2(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2oklab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch(l, a, b_);
    };
    var rgb2oklch_1 = rgb2oklch$1;
    var unpack$1 = utils.unpack;
    var lch2lab = lch2lab_1;
    var oklab2rgb = oklab2rgb_1;
    var oklch2rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$1(args, "lch");
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = oklab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [
            r,
            g,
            b,
            args.length > 3 ? args[3] : 1
        ];
    };
    var oklch2rgb_1 = oklch2rgb;
    var unpack = utils.unpack;
    var type$7 = utils.type;
    var chroma$5 = chroma_1;
    var Color$n = Color_1;
    var input = input$h;
    var rgb2oklch = rgb2oklch_1;
    Color$n.prototype.oklch = function() {
        return rgb2oklch(this._rgb);
    };
    chroma$5.oklch = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$n, [
            null
        ].concat(args, [
            "oklch"
        ])));
    };
    input.format.oklch = oklch2rgb_1;
    input.autodetect.push({
        p: 3,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack(args, "oklch");
            if (type$7(args) === "array" && args.length === 3) return "oklch";
        }
    });
    var Color$m = Color_1;
    var type$6 = utils.type;
    Color$m.prototype.alpha = function(a, mutate) {
        if (mutate === void 0) mutate = false;
        if (a !== undefined && type$6(a) === "number") {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color$m([
                this._rgb[0],
                this._rgb[1],
                this._rgb[2],
                a
            ], "rgb");
        }
        return this._rgb[3];
    };
    var Color$l = Color_1;
    Color$l.prototype.clipped = function() {
        return this._rgb._clipped || false;
    };
    var Color$k = Color_1;
    var LAB_CONSTANTS$1 = labConstants;
    Color$k.prototype.darken = function(amount) {
        if (amount === void 0) amount = 1;
        var me = this;
        var lab = me.lab();
        lab[0] -= LAB_CONSTANTS$1.Kn * amount;
        return new Color$k(lab, "lab").alpha(me.alpha(), true);
    };
    Color$k.prototype.brighten = function(amount) {
        if (amount === void 0) amount = 1;
        return this.darken(-amount);
    };
    Color$k.prototype.darker = Color$k.prototype.darken;
    Color$k.prototype.brighter = Color$k.prototype.brighten;
    var Color$j = Color_1;
    Color$j.prototype.get = function(mc) {
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
            if (i > -1) return src[i];
            throw new Error("unknown channel " + channel + " in mode " + mode);
        } else return src;
    };
    var Color$i = Color_1;
    var type$5 = utils.type;
    var pow$6 = Math.pow;
    var EPS = 1e-7;
    var MAX_ITER = 20;
    Color$i.prototype.luminance = function(lum) {
        if (lum !== undefined && type$5(lum) === "number") {
            if (lum === 0) // return pure black
            return new Color$i([
                0,
                0,
                0,
                this._rgb[3]
            ], "rgb");
            if (lum === 1) // return pure white
            return new Color$i([
                255,
                255,
                255,
                this._rgb[3]
            ], "rgb");
            // compute new color using...
            var cur_lum = this.luminance();
            var mode = "rgb";
            var max_iter = MAX_ITER;
            var test = function(low, high) {
                var mid = low.interpolate(high, 0.5, mode);
                var lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) // close enough
                return mid;
                return lm > lum ? test(low, mid) : test(mid, high);
            };
            var rgb = (cur_lum > lum ? test(new Color$i([
                0,
                0,
                0
            ]), this) : test(this, new Color$i([
                255,
                255,
                255
            ]))).rgb();
            return new Color$i(rgb.concat([
                this._rgb[3]
            ]));
        }
        return rgb2luminance.apply(void 0, this._rgb.slice(0, 3));
    };
    var rgb2luminance = function(r, g, b) {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    var luminance_x = function(x) {
        x /= 255;
        return x <= 0.03928 ? x / 12.92 : pow$6((x + 0.055) / 1.055, 2.4);
    };
    var interpolator$1 = {};
    var Color$h = Color_1;
    var type$4 = utils.type;
    var interpolator = interpolator$1;
    var mix$1 = function(col1, col2, f) {
        if (f === void 0) f = 0.5;
        var rest = [], len = arguments.length - 3;
        while(len-- > 0)rest[len] = arguments[len + 3];
        var mode = rest[0] || "lrgb";
        if (!interpolator[mode] && !rest.length) // fall back to the first supported mode
        mode = Object.keys(interpolator)[0];
        if (!interpolator[mode]) throw new Error("interpolation mode " + mode + " is not defined");
        if (type$4(col1) !== "object") col1 = new Color$h(col1);
        if (type$4(col2) !== "object") col2 = new Color$h(col2);
        return interpolator[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };
    var Color$g = Color_1;
    var mix = mix$1;
    Color$g.prototype.mix = Color$g.prototype.interpolate = function(col2, f) {
        if (f === void 0) f = 0.5;
        var rest = [], len = arguments.length - 2;
        while(len-- > 0)rest[len] = arguments[len + 2];
        return mix.apply(void 0, [
            this,
            col2,
            f
        ].concat(rest));
    };
    var Color$f = Color_1;
    Color$f.prototype.premultiply = function(mutate) {
        if (mutate === void 0) mutate = false;
        var rgb = this._rgb;
        var a = rgb[3];
        if (mutate) {
            this._rgb = [
                rgb[0] * a,
                rgb[1] * a,
                rgb[2] * a,
                a
            ];
            return this;
        } else return new Color$f([
            rgb[0] * a,
            rgb[1] * a,
            rgb[2] * a,
            a
        ], "rgb");
    };
    var Color$e = Color_1;
    var LAB_CONSTANTS = labConstants;
    Color$e.prototype.saturate = function(amount) {
        if (amount === void 0) amount = 1;
        var me = this;
        var lch = me.lch();
        lch[1] += LAB_CONSTANTS.Kn * amount;
        if (lch[1] < 0) lch[1] = 0;
        return new Color$e(lch, "lch").alpha(me.alpha(), true);
    };
    Color$e.prototype.desaturate = function(amount) {
        if (amount === void 0) amount = 1;
        return this.saturate(-amount);
    };
    var Color$d = Color_1;
    var type$3 = utils.type;
    Color$d.prototype.set = function(mc, value, mutate) {
        if (mutate === void 0) mutate = false;
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
            if (i > -1) {
                if (type$3(value) == "string") switch(value.charAt(0)){
                    case "+":
                        src[i] += +value;
                        break;
                    case "-":
                        src[i] += +value;
                        break;
                    case "*":
                        src[i] *= +value.substr(1);
                        break;
                    case "/":
                        src[i] /= +value.substr(1);
                        break;
                    default:
                        src[i] = +value;
                }
                else if (type$3(value) === "number") src[i] = value;
                else throw new Error("unsupported value for Color.set");
                var out = new Color$d(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error("unknown channel " + channel + " in mode " + mode);
        } else return src;
    };
    var Color$c = Color_1;
    var rgb = function(col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color$c(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "rgb");
    };
    // register interpolator
    interpolator$1.rgb = rgb;
    var Color$b = Color_1;
    var sqrt$2 = Math.sqrt;
    var pow$5 = Math.pow;
    var lrgb = function(col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color$b(sqrt$2(pow$5(x1, 2) * (1 - f) + pow$5(x2, 2) * f), sqrt$2(pow$5(y1, 2) * (1 - f) + pow$5(y2, 2) * f), sqrt$2(pow$5(z1, 2) * (1 - f) + pow$5(z2, 2) * f), "rgb");
    };
    // register interpolator
    interpolator$1.lrgb = lrgb;
    var Color$a = Color_1;
    var lab = function(col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color$a(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "lab");
    };
    // register interpolator
    interpolator$1.lab = lab;
    var Color$9 = Color_1;
    var _hsx = function(col1, col2, f, m) {
        var assign, assign$1;
        var xyz0, xyz1;
        if (m === "hsl") {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === "hsv") {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === "hcg") {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === "hsi") {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === "lch" || m === "hcl") {
            m = "hcl";
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        } else if (m === "oklch") {
            xyz0 = col1.oklch().reverse();
            xyz1 = col2.oklch().reverse();
        }
        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === "h" || m === "oklch") {
            assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2];
            assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2];
        }
        var sat, hue, lbv, dh;
        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) dh = hue1 - (hue0 + 360);
            else if (hue1 < hue0 && hue0 - hue1 > 180) dh = hue1 + 360 - hue0;
            else dh = hue1 - hue0;
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != "hsv") sat = sat0;
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != "hsv") sat = sat1;
        } else hue = Number.NaN;
        if (sat === undefined) sat = sat0 + f * (sat1 - sat0);
        lbv = lbv0 + f * (lbv1 - lbv0);
        return m === "oklch" ? new Color$9([
            lbv,
            sat,
            hue
        ], m) : new Color$9([
            hue,
            sat,
            lbv
        ], m);
    };
    var interpolate_hsx$5 = _hsx;
    var lch = function(col1, col2, f) {
        return interpolate_hsx$5(col1, col2, f, "lch");
    };
    // register interpolator
    interpolator$1.lch = lch;
    interpolator$1.hcl = lch;
    var Color$8 = Color_1;
    var num = function(col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color$8(c1 + f * (c2 - c1), "num");
    };
    // register interpolator
    interpolator$1.num = num;
    var interpolate_hsx$4 = _hsx;
    var hcg = function(col1, col2, f) {
        return interpolate_hsx$4(col1, col2, f, "hcg");
    };
    // register interpolator
    interpolator$1.hcg = hcg;
    var interpolate_hsx$3 = _hsx;
    var hsi = function(col1, col2, f) {
        return interpolate_hsx$3(col1, col2, f, "hsi");
    };
    // register interpolator
    interpolator$1.hsi = hsi;
    var interpolate_hsx$2 = _hsx;
    var hsl = function(col1, col2, f) {
        return interpolate_hsx$2(col1, col2, f, "hsl");
    };
    // register interpolator
    interpolator$1.hsl = hsl;
    var interpolate_hsx$1 = _hsx;
    var hsv = function(col1, col2, f) {
        return interpolate_hsx$1(col1, col2, f, "hsv");
    };
    // register interpolator
    interpolator$1.hsv = hsv;
    var Color$7 = Color_1;
    var oklab = function(col1, col2, f) {
        var xyz0 = col1.oklab();
        var xyz1 = col2.oklab();
        return new Color$7(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "oklab");
    };
    // register interpolator
    interpolator$1.oklab = oklab;
    var interpolate_hsx = _hsx;
    var oklch = function(col1, col2, f) {
        return interpolate_hsx(col1, col2, f, "oklch");
    };
    // register interpolator
    interpolator$1.oklch = oklch;
    var Color$6 = Color_1;
    var clip_rgb$1 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$1 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$2 = Math.sin;
    var atan2$1 = Math.atan2;
    var average = function(colors, mode, weights) {
        if (mode === void 0) mode = "lrgb";
        if (weights === void 0) weights = null;
        var l = colors.length;
        if (!weights) weights = Array.from(new Array(l)).map(function() {
            return 1;
        });
        // normalize weights
        var k = l / weights.reduce(function(a, b) {
            return a + b;
        });
        weights.forEach(function(w, i) {
            weights[i] *= k;
        });
        // convert colors to Color objects
        colors = colors.map(function(c) {
            return new Color$6(c);
        });
        if (mode === "lrgb") return _average_lrgb(colors, weights);
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        // initial color
        for(var i = 0; i < xyz.length; i++){
            xyz[i] = (xyz[i] || 0) * weights[0];
            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
            if (mode.charAt(i) === "h" && !isNaN(xyz[i])) {
                var A = xyz[i] / 180 * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$2(A) * weights[0];
            }
        }
        var alpha = first.alpha() * weights[0];
        colors.forEach(function(c, ci) {
            var xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci + 1];
            for(var i = 0; i < xyz.length; i++)if (!isNaN(xyz2[i])) {
                cnt[i] += weights[ci + 1];
                if (mode.charAt(i) === "h") {
                    var A = xyz2[i] / 180 * PI$1;
                    dx += cos$2(A) * weights[ci + 1];
                    dy += sin$2(A) * weights[ci + 1];
                } else xyz[i] += xyz2[i] * weights[ci + 1];
            }
        });
        for(var i$1 = 0; i$1 < xyz.length; i$1++)if (mode.charAt(i$1) === "h") {
            var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
            while(A$1 < 0)A$1 += 360;
            while(A$1 >= 360)A$1 -= 360;
            xyz[i$1] = A$1;
        } else xyz[i$1] = xyz[i$1] / cnt[i$1];
        alpha /= l;
        return new Color$6(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };
    var _average_lrgb = function(colors, weights) {
        var l = colors.length;
        var xyz = [
            0,
            0,
            0,
            0
        ];
        for(var i = 0; i < colors.length; i++){
            var col = colors[i];
            var f = weights[i] / l;
            var rgb = col._rgb;
            xyz[0] += pow$4(rgb[0], 2) * f;
            xyz[1] += pow$4(rgb[1], 2) * f;
            xyz[2] += pow$4(rgb[2], 2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$1(xyz[0]);
        xyz[1] = sqrt$1(xyz[1]);
        xyz[2] = sqrt$1(xyz[2]);
        if (xyz[3] > 0.9999999) xyz[3] = 1;
        return new Color$6(clip_rgb$1(xyz));
    };
    // minimal multi-purpose interface
    // @requires utils color analyze
    var chroma$4 = chroma_1;
    var type$2 = utils.type;
    var pow$3 = Math.pow;
    var scale$2 = function(colors) {
        // constructor
        var _mode = "rgb";
        var _nacol = chroma$4("#ccc");
        var _spread = 0;
        // const _fixed = false;
        var _domain = [
            0,
            1
        ];
        var _pos = [];
        var _padding = [
            0,
            0
        ];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;
        // private methods
        var setColors = function(colors) {
            colors = colors || [
                "#fff",
                "#000"
            ];
            if (colors && type$2(colors) === "string" && chroma$4.brewer && chroma$4.brewer[colors.toLowerCase()]) colors = chroma$4.brewer[colors.toLowerCase()];
            if (type$2(colors) === "array") {
                // handle single color
                if (colors.length === 1) colors = [
                    colors[0],
                    colors[0]
                ];
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for(var c = 0; c < colors.length; c++)colors[c] = chroma$4(colors[c]);
                // auto-fill color position
                _pos.length = 0;
                for(var c$1 = 0; c$1 < colors.length; c$1++)_pos.push(c$1 / (colors.length - 1));
            }
            resetCache();
            return _colors = colors;
        };
        var getClass = function(value) {
            if (_classes != null) {
                var n = _classes.length - 1;
                var i = 0;
                while(i < n && value >= _classes[i])i++;
                return i - 1;
            }
            return 0;
        };
        var tMapLightness = function(t) {
            return t;
        };
        var tMapDomain = function(t) {
            return t;
        };
        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };
        var getColor = function(val, bypassMap) {
            var col, t;
            if (bypassMap == null) bypassMap = false;
            if (isNaN(val) || val === null) return _nacol;
            if (!bypassMap) {
                if (_classes && _classes.length > 2) {
                    // find the class
                    var c = getClass(val);
                    t = c / (_classes.length - 2);
                } else if (_max !== _min) // just interpolate between min/max
                t = (val - _min) / (_max - _min);
                else t = 1;
            } else t = val;
            // domain map
            t = tMapDomain(t);
            if (!bypassMap) t = tMapLightness(t); // lightness correction
            if (_gamma !== 1) t = pow$3(t, _gamma);
            t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
            t = Math.min(1, Math.max(0, t));
            var k = Math.floor(t * 10000);
            if (_useCache && _colorCache[k]) col = _colorCache[k];
            else {
                if (type$2(_colors) === "array") //for i in [0.._pos.length-1]
                for(var i = 0; i < _pos.length; i++){
                    var p = _pos[i];
                    if (t <= p) {
                        col = _colors[i];
                        break;
                    }
                    if (t >= p && i === _pos.length - 1) {
                        col = _colors[i];
                        break;
                    }
                    if (t > p && t < _pos[i + 1]) {
                        t = (t - p) / (_pos[i + 1] - p);
                        col = chroma$4.interpolate(_colors[i], _colors[i + 1], t, _mode);
                        break;
                    }
                }
                else if (type$2(_colors) === "function") col = _colors(t);
                if (_useCache) _colorCache[k] = col;
            }
            return col;
        };
        var resetCache = function() {
            return _colorCache = {};
        };
        setColors(colors);
        // public interface
        var f = function(v) {
            var c = chroma$4(getColor(v));
            if (_out && c[_out]) return c[_out]();
            else return c;
        };
        f.classes = function(classes) {
            if (classes != null) {
                if (type$2(classes) === "array") {
                    _classes = classes;
                    _domain = [
                        classes[0],
                        classes[classes.length - 1]
                    ];
                } else {
                    var d = chroma$4.analyze(_domain);
                    if (classes === 0) _classes = [
                        d.min,
                        d.max
                    ];
                    else _classes = chroma$4.limits(d, "e", classes);
                }
                return f;
            }
            return _classes;
        };
        f.domain = function(domain) {
            if (!arguments.length) return _domain;
            _min = domain[0];
            _max = domain[domain.length - 1];
            _pos = [];
            var k = _colors.length;
            if (domain.length === k && _min !== _max) // update positions
            for(var i = 0, list = Array.from(domain); i < list.length; i += 1){
                var d = list[i];
                _pos.push((d - _min) / (_max - _min));
            }
            else {
                for(var c = 0; c < k; c++)_pos.push(c / (k - 1));
                if (domain.length > 2) {
                    // set domain map
                    var tOut = domain.map(function(d, i) {
                        return i / (domain.length - 1);
                    });
                    var tBreaks = domain.map(function(d) {
                        return (d - _min) / (_max - _min);
                    });
                    if (!tBreaks.every(function(val, i) {
                        return tOut[i] === val;
                    })) tMapDomain = function(t) {
                        if (t <= 0 || t >= 1) return t;
                        var i = 0;
                        while(t >= tBreaks[i + 1])i++;
                        var f = (t - tBreaks[i]) / (tBreaks[i + 1] - tBreaks[i]);
                        var out = tOut[i] + f * (tOut[i + 1] - tOut[i]);
                        return out;
                    };
                }
            }
            _domain = [
                _min,
                _max
            ];
            return f;
        };
        f.mode = function(_m) {
            if (!arguments.length) return _mode;
            _mode = _m;
            resetCache();
            return f;
        };
        f.range = function(colors, _pos) {
            setColors(colors);
            return f;
        };
        f.out = function(_o) {
            _out = _o;
            return f;
        };
        f.spread = function(val) {
            if (!arguments.length) return _spread;
            _spread = val;
            return f;
        };
        f.correctLightness = function(v) {
            if (v == null) v = true;
            _correctLightness = v;
            resetCache();
            if (_correctLightness) tMapLightness = function(t) {
                var L0 = getColor(0, true).lab()[0];
                var L1 = getColor(1, true).lab()[0];
                var pol = L0 > L1;
                var L_actual = getColor(t, true).lab()[0];
                var L_ideal = L0 + (L1 - L0) * t;
                var L_diff = L_actual - L_ideal;
                var t0 = 0;
                var t1 = 1;
                var max_iter = 20;
                while(Math.abs(L_diff) > 1e-2 && max_iter-- > 0)(function() {
                    if (pol) L_diff *= -1;
                    if (L_diff < 0) {
                        t0 = t;
                        t += (t1 - t) * 0.5;
                    } else {
                        t1 = t;
                        t += (t0 - t) * 0.5;
                    }
                    L_actual = getColor(t, true).lab()[0];
                    return L_diff = L_actual - L_ideal;
                })();
                return t;
            };
            else tMapLightness = function(t) {
                return t;
            };
            return f;
        };
        f.padding = function(p) {
            if (p != null) {
                if (type$2(p) === "number") p = [
                    p,
                    p
                ];
                _padding = p;
                return f;
            } else return _padding;
        };
        f.colors = function(numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) out = "hex";
            var result = [];
            if (arguments.length === 0) result = _colors.slice(0);
            else if (numColors === 1) result = [
                f(0.5)
            ];
            else if (numColors > 1) {
                var dm = _domain[0];
                var dd = _domain[1] - dm;
                result = __range__(0, numColors, false).map(function(i) {
                    return f(dm + i / (numColors - 1) * dd);
                });
            } else {
                colors = [];
                var samples = [];
                if (_classes && _classes.length > 2) for(var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--)samples.push((_classes[i - 1] + _classes[i]) * 0.5);
                else samples = _domain;
                result = samples.map(function(v) {
                    return f(v);
                });
            }
            if (chroma$4[out]) result = result.map(function(c) {
                return c[out]();
            });
            return result;
        };
        f.cache = function(c) {
            if (c != null) {
                _useCache = c;
                return f;
            } else return _useCache;
        };
        f.gamma = function(g) {
            if (g != null) {
                _gamma = g;
                return f;
            } else return _gamma;
        };
        f.nodata = function(d) {
            if (d != null) {
                _nacol = chroma$4(d);
                return f;
            } else return _nacol;
        };
        return f;
    };
    function __range__(left, right, inclusive) {
        var range = [];
        var ascending = left < right;
        var end = !inclusive ? right : ascending ? right + 1 : right - 1;
        for(var i = left; ascending ? i < end : i > end; ascending ? i++ : i--)range.push(i);
        return range;
    }
    //
    // interpolates between a set of colors uzing a bezier spline
    //
    // @requires utils lab
    var Color$5 = Color_1;
    var scale$1 = scale$2;
    // nth row of the pascal triangle
    var binom_row = function(n) {
        var row = [
            1,
            1
        ];
        for(var i = 1; i < n; i++){
            var newrow = [
                1
            ];
            for(var j = 1; j <= row.length; j++)newrow[j] = (row[j] || 0) + row[j - 1];
            row = newrow;
        }
        return row;
    };
    var bezier = function(colors) {
        var assign, assign$1, assign$2;
        var I, lab0, lab1, lab2;
        colors = colors.map(function(c) {
            return new Color$5(c);
        });
        if (colors.length === 2) {
            assign = colors.map(function(c) {
                return c.lab();
            }), lab0 = assign[0], lab1 = assign[1];
            I = function(t) {
                var lab = [
                    0,
                    1,
                    2
                ].map(function(i) {
                    return lab0[i] + t * (lab1[i] - lab0[i]);
                });
                return new Color$5(lab, "lab");
            };
        } else if (colors.length === 3) {
            assign$1 = colors.map(function(c) {
                return c.lab();
            }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2];
            I = function(t) {
                var lab = [
                    0,
                    1,
                    2
                ].map(function(i) {
                    return (1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i];
                });
                return new Color$5(lab, "lab");
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            var lab3;
            assign$2 = colors.map(function(c) {
                return c.lab();
            }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3];
            I = function(t) {
                var lab = [
                    0,
                    1,
                    2
                ].map(function(i) {
                    return (1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i];
                });
                return new Color$5(lab, "lab");
            };
        } else if (colors.length >= 5) {
            // general case (degree n bezier)
            var labs, row, n;
            labs = colors.map(function(c) {
                return c.lab();
            });
            n = colors.length - 1;
            row = binom_row(n);
            I = function(t) {
                var u = 1 - t;
                var lab = [
                    0,
                    1,
                    2
                ].map(function(i) {
                    return labs.reduce(function(sum, el, j) {
                        return sum + row[j] * Math.pow(u, n - j) * Math.pow(t, j) * el[i];
                    }, 0);
                });
                return new Color$5(lab, "lab");
            };
        } else throw new RangeError("No point in running bezier with only one color.");
        return I;
    };
    var bezier_1 = function(colors) {
        var f = bezier(colors);
        f.scale = function() {
            return scale$1(f);
        };
        return f;
    };
    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */ var chroma$3 = chroma_1;
    var blend = function(bottom, top, mode) {
        if (!blend[mode]) throw new Error("unknown blend mode " + mode);
        return blend[mode](bottom, top);
    };
    var blend_f = function(f) {
        return function(bottom, top) {
            var c0 = chroma$3(top).rgb();
            var c1 = chroma$3(bottom).rgb();
            return chroma$3.rgb(f(c0, c1));
        };
    };
    var each = function(f) {
        return function(c0, c1) {
            var out = [];
            out[0] = f(c0[0], c1[0]);
            out[1] = f(c0[1], c1[1]);
            out[2] = f(c0[2], c1[2]);
            return out;
        };
    };
    var normal = function(a) {
        return a;
    };
    var multiply = function(a, b) {
        return a * b / 255;
    };
    var darken = function(a, b) {
        return a > b ? b : a;
    };
    var lighten = function(a, b) {
        return a > b ? a : b;
    };
    var screen = function(a, b) {
        return 255 * (1 - (1 - a / 255) * (1 - b / 255));
    };
    var overlay = function(a, b) {
        return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
    };
    var burn = function(a, b) {
        return 255 * (1 - (1 - b / 255) / (a / 255));
    };
    var dodge = function(a, b) {
        if (a === 255) return 255;
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a;
    };
    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b
    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    // blend.add = blend_f(each(add));
    var blend_1 = blend;
    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf
    var type$1 = utils.type;
    var clip_rgb = utils.clip_rgb;
    var TWOPI = utils.TWOPI;
    var pow$2 = Math.pow;
    var sin$1 = Math.sin;
    var cos$1 = Math.cos;
    var chroma$2 = chroma_1;
    var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if (start === void 0) start = 300;
        if (rotations === void 0) rotations = -1.5;
        if (hue === void 0) hue = 1;
        if (gamma === void 0) gamma = 1;
        if (lightness === void 0) lightness = [
            0,
            1
        ];
        var dh = 0, dl;
        if (type$1(lightness) === "array") dl = lightness[1] - lightness[0];
        else {
            dl = 0;
            lightness = [
                lightness,
                lightness
            ];
        }
        var f = function(fract) {
            var a = TWOPI * ((start + 120) / 360 + rotations * fract);
            var l = pow$2(lightness[0] + dl * fract, gamma);
            var h = dh !== 0 ? hue[0] + fract * dh : hue;
            var amp = h * l * (1 - l) / 2;
            var cos_a = cos$1(a);
            var sin_a = sin$1(a);
            var r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
            var g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
            var b = l + amp * (1.97294 * cos_a);
            return chroma$2(clip_rgb([
                r * 255,
                g * 255,
                b * 255,
                1
            ]));
        };
        f.start = function(s) {
            if (s == null) return start;
            start = s;
            return f;
        };
        f.rotations = function(r) {
            if (r == null) return rotations;
            rotations = r;
            return f;
        };
        f.gamma = function(g) {
            if (g == null) return gamma;
            gamma = g;
            return f;
        };
        f.hue = function(h) {
            if (h == null) return hue;
            hue = h;
            if (type$1(hue) === "array") {
                dh = hue[1] - hue[0];
                if (dh === 0) hue = hue[1];
            } else dh = 0;
            return f;
        };
        f.lightness = function(h) {
            if (h == null) return lightness;
            if (type$1(h) === "array") {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [
                    h,
                    h
                ];
                dl = 0;
            }
            return f;
        };
        f.scale = function() {
            return chroma$2.scale(f);
        };
        f.hue(hue);
        return f;
    };
    var Color$4 = Color_1;
    var digits = "0123456789abcdef";
    var floor$1 = Math.floor;
    var random = Math.random;
    var random_1 = function() {
        var code = "#";
        for(var i = 0; i < 6; i++)code += digits.charAt(floor$1(random() * 16));
        return new Color$4(code, "hex");
    };
    var type = type$p;
    var log = Math.log;
    var pow$1 = Math.pow;
    var floor = Math.floor;
    var abs$1 = Math.abs;
    var analyze = function(data, key) {
        if (key === void 0) key = null;
        var r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE * -1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === "object") data = Object.values(data);
        data.forEach(function(val) {
            if (key && type(val) === "object") val = val[key];
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) r.min = val;
                if (val > r.max) r.max = val;
                r.count += 1;
            }
        });
        r.domain = [
            r.min,
            r.max
        ];
        r.limits = function(mode, num) {
            return limits(r, mode, num);
        };
        return r;
    };
    var limits = function(data, mode, num) {
        if (mode === void 0) mode = "equal";
        if (num === void 0) num = 7;
        if (type(data) == "array") data = analyze(data);
        var min = data.min;
        var max = data.max;
        var values = data.values.sort(function(a, b) {
            return a - b;
        });
        if (num === 1) return [
            min,
            max
        ];
        var limits = [];
        if (mode.substr(0, 1) === "c") {
            limits.push(min);
            limits.push(max);
        }
        if (mode.substr(0, 1) === "e") {
            limits.push(min);
            for(var i = 1; i < num; i++)limits.push(min + i / num * (max - min));
            limits.push(max);
        } else if (mode.substr(0, 1) === "l") {
            if (min <= 0) throw new Error("Logarithmic scales are only possible for values > 0");
            var min_log = Math.LOG10E * log(min);
            var max_log = Math.LOG10E * log(max);
            limits.push(min);
            for(var i$1 = 1; i$1 < num; i$1++)limits.push(pow$1(10, min_log + i$1 / num * (max_log - min_log)));
            limits.push(max);
        } else if (mode.substr(0, 1) === "q") {
            limits.push(min);
            for(var i$2 = 1; i$2 < num; i$2++){
                var p = (values.length - 1) * i$2 / num;
                var pb = floor(p);
                if (pb === p) limits.push(values[pb]);
                else {
                    var pr = p - pb;
                    limits.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
                }
            }
            limits.push(max);
        } else if (mode.substr(0, 1) === "k") {
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */ var cluster;
            var n = values.length;
            var assignments = new Array(n);
            var clusterSizes = new Array(num);
            var repeat = true;
            var nb_iters = 0;
            var centroids = null;
            // get seed values
            centroids = [];
            centroids.push(min);
            for(var i$3 = 1; i$3 < num; i$3++)centroids.push(min + i$3 / num * (max - min));
            centroids.push(max);
            while(repeat){
                // assignment step
                for(var j = 0; j < num; j++)clusterSizes[j] = 0;
                for(var i$4 = 0; i$4 < n; i$4++){
                    var value = values[i$4];
                    var mindist = Number.MAX_VALUE;
                    var best = void 0;
                    for(var j$1 = 0; j$1 < num; j$1++){
                        var dist = abs$1(centroids[j$1] - value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j$1;
                        }
                        clusterSizes[best]++;
                        assignments[i$4] = best;
                    }
                }
                // update centroids step
                var newCentroids = new Array(num);
                for(var j$2 = 0; j$2 < num; j$2++)newCentroids[j$2] = null;
                for(var i$5 = 0; i$5 < n; i$5++){
                    cluster = assignments[i$5];
                    if (newCentroids[cluster] === null) newCentroids[cluster] = values[i$5];
                    else newCentroids[cluster] += values[i$5];
                }
                for(var j$3 = 0; j$3 < num; j$3++)newCentroids[j$3] *= 1 / clusterSizes[j$3];
                // check convergence
                repeat = false;
                for(var j$4 = 0; j$4 < num; j$4++)if (newCentroids[j$4] !== centroids[j$4]) {
                    repeat = true;
                    break;
                }
                centroids = newCentroids;
                nb_iters++;
                if (nb_iters > 200) repeat = false;
            }
            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            var kClusters = {};
            for(var j$5 = 0; j$5 < num; j$5++)kClusters[j$5] = [];
            for(var i$6 = 0; i$6 < n; i$6++){
                cluster = assignments[i$6];
                kClusters[cluster].push(values[i$6]);
            }
            var tmpKMeansBreaks = [];
            for(var j$6 = 0; j$6 < num; j$6++){
                tmpKMeansBreaks.push(kClusters[j$6][0]);
                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length - 1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
                return a - b;
            });
            limits.push(tmpKMeansBreaks[0]);
            for(var i$7 = 1; i$7 < tmpKMeansBreaks.length; i$7 += 2){
                var v = tmpKMeansBreaks[i$7];
                if (!isNaN(v) && limits.indexOf(v) === -1) limits.push(v);
            }
        }
        return limits;
    };
    var analyze_1 = {
        analyze: analyze,
        limits: limits
    };
    var Color$3 = Color_1;
    var contrast = function(a, b) {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color$3(a);
        b = new Color$3(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };
    var Color$2 = Color_1;
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    var min = Math.min;
    var max = Math.max;
    var atan2 = Math.atan2;
    var abs = Math.abs;
    var cos = Math.cos;
    var sin = Math.sin;
    var exp = Math.exp;
    var PI = Math.PI;
    var deltaE = function(a, b, Kl, Kc, Kh) {
        if (Kl === void 0) Kl = 1;
        if (Kc === void 0) Kc = 1;
        if (Kh === void 0) Kh = 1;
        // Delta E (CIE 2000)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
        var rad2deg = function(rad) {
            return 360 * rad / (2 * PI);
        };
        var deg2rad = function(deg) {
            return 2 * PI * deg / 360;
        };
        a = new Color$2(a);
        b = new Color$2(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var avgL = (L1 + L2) / 2;
        var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
        var C2 = sqrt(pow(a2, 2) + pow(b2, 2));
        var avgC = (C1 + C2) / 2;
        var G = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
        var a1p = a1 * (1 + G);
        var a2p = a2 * (1 + G);
        var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
        var C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
        var avgCp = (C1p + C2p) / 2;
        var arctan1 = rad2deg(atan2(b1, a1p));
        var arctan2 = rad2deg(atan2(b2, a2p));
        var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
        var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
        var avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
        var T = 1 - 0.17 * cos(deg2rad(avgHp - 30)) + 0.24 * cos(deg2rad(2 * avgHp)) + 0.32 * cos(deg2rad(3 * avgHp + 6)) - 0.2 * cos(deg2rad(4 * avgHp - 63));
        var deltaHp = h2p - h1p;
        deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
        deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
        var deltaL = L2 - L1;
        var deltaCp = C2p - C1p;
        var sl = 1 + 0.015 * pow(avgL - 50, 2) / sqrt(20 + pow(avgL - 50, 2));
        var sc = 1 + 0.045 * avgCp;
        var sh = 1 + 0.015 * avgCp * T;
        var deltaTheta = 30 * exp(-pow((avgHp - 275) / 25, 2));
        var Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
        var Rt = -Rc * sin(2 * deg2rad(deltaTheta));
        var result = sqrt(pow(deltaL / (Kl * sl), 2) + pow(deltaCp / (Kc * sc), 2) + pow(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)));
        return max(0, min(100, result));
    };
    var Color$1 = Color_1;
    // simple Euclidean distance
    var distance = function(a, b, mode) {
        if (mode === void 0) mode = "lab";
        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color$1(a);
        b = new Color$1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for(var i in l1){
            var d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d * d;
        }
        return Math.sqrt(sum_sq);
    };
    var Color = Color_1;
    var valid = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        try {
            new (Function.prototype.bind.apply(Color, [
                null
            ].concat(args)));
            return true;
        } catch (e) {
            return false;
        }
    };
    // some pre-defined color scales:
    var chroma$1 = chroma_1;
    var scale = scale$2;
    var scales = {
        cool: function cool() {
            return scale([
                chroma$1.hsl(180, 1, .9),
                chroma$1.hsl(250, .7, .4)
            ]);
        },
        hot: function hot() {
            return scale([
                "#000",
                "#f00",
                "#ff0",
                "#fff"
            ]).mode("rgb");
        }
    };
    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */ var colorbrewer = {
        // sequential
        OrRd: [
            "#fff7ec",
            "#fee8c8",
            "#fdd49e",
            "#fdbb84",
            "#fc8d59",
            "#ef6548",
            "#d7301f",
            "#b30000",
            "#7f0000"
        ],
        PuBu: [
            "#fff7fb",
            "#ece7f2",
            "#d0d1e6",
            "#a6bddb",
            "#74a9cf",
            "#3690c0",
            "#0570b0",
            "#045a8d",
            "#023858"
        ],
        BuPu: [
            "#f7fcfd",
            "#e0ecf4",
            "#bfd3e6",
            "#9ebcda",
            "#8c96c6",
            "#8c6bb1",
            "#88419d",
            "#810f7c",
            "#4d004b"
        ],
        Oranges: [
            "#fff5eb",
            "#fee6ce",
            "#fdd0a2",
            "#fdae6b",
            "#fd8d3c",
            "#f16913",
            "#d94801",
            "#a63603",
            "#7f2704"
        ],
        BuGn: [
            "#f7fcfd",
            "#e5f5f9",
            "#ccece6",
            "#99d8c9",
            "#66c2a4",
            "#41ae76",
            "#238b45",
            "#006d2c",
            "#00441b"
        ],
        YlOrBr: [
            "#ffffe5",
            "#fff7bc",
            "#fee391",
            "#fec44f",
            "#fe9929",
            "#ec7014",
            "#cc4c02",
            "#993404",
            "#662506"
        ],
        YlGn: [
            "#ffffe5",
            "#f7fcb9",
            "#d9f0a3",
            "#addd8e",
            "#78c679",
            "#41ab5d",
            "#238443",
            "#006837",
            "#004529"
        ],
        Reds: [
            "#fff5f0",
            "#fee0d2",
            "#fcbba1",
            "#fc9272",
            "#fb6a4a",
            "#ef3b2c",
            "#cb181d",
            "#a50f15",
            "#67000d"
        ],
        RdPu: [
            "#fff7f3",
            "#fde0dd",
            "#fcc5c0",
            "#fa9fb5",
            "#f768a1",
            "#dd3497",
            "#ae017e",
            "#7a0177",
            "#49006a"
        ],
        Greens: [
            "#f7fcf5",
            "#e5f5e0",
            "#c7e9c0",
            "#a1d99b",
            "#74c476",
            "#41ab5d",
            "#238b45",
            "#006d2c",
            "#00441b"
        ],
        YlGnBu: [
            "#ffffd9",
            "#edf8b1",
            "#c7e9b4",
            "#7fcdbb",
            "#41b6c4",
            "#1d91c0",
            "#225ea8",
            "#253494",
            "#081d58"
        ],
        Purples: [
            "#fcfbfd",
            "#efedf5",
            "#dadaeb",
            "#bcbddc",
            "#9e9ac8",
            "#807dba",
            "#6a51a3",
            "#54278f",
            "#3f007d"
        ],
        GnBu: [
            "#f7fcf0",
            "#e0f3db",
            "#ccebc5",
            "#a8ddb5",
            "#7bccc4",
            "#4eb3d3",
            "#2b8cbe",
            "#0868ac",
            "#084081"
        ],
        Greys: [
            "#ffffff",
            "#f0f0f0",
            "#d9d9d9",
            "#bdbdbd",
            "#969696",
            "#737373",
            "#525252",
            "#252525",
            "#000000"
        ],
        YlOrRd: [
            "#ffffcc",
            "#ffeda0",
            "#fed976",
            "#feb24c",
            "#fd8d3c",
            "#fc4e2a",
            "#e31a1c",
            "#bd0026",
            "#800026"
        ],
        PuRd: [
            "#f7f4f9",
            "#e7e1ef",
            "#d4b9da",
            "#c994c7",
            "#df65b0",
            "#e7298a",
            "#ce1256",
            "#980043",
            "#67001f"
        ],
        Blues: [
            "#f7fbff",
            "#deebf7",
            "#c6dbef",
            "#9ecae1",
            "#6baed6",
            "#4292c6",
            "#2171b5",
            "#08519c",
            "#08306b"
        ],
        PuBuGn: [
            "#fff7fb",
            "#ece2f0",
            "#d0d1e6",
            "#a6bddb",
            "#67a9cf",
            "#3690c0",
            "#02818a",
            "#016c59",
            "#014636"
        ],
        Viridis: [
            "#440154",
            "#482777",
            "#3f4a8a",
            "#31678e",
            "#26838f",
            "#1f9d8a",
            "#6cce5a",
            "#b6de2b",
            "#fee825"
        ],
        // diverging
        Spectral: [
            "#9e0142",
            "#d53e4f",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#e6f598",
            "#abdda4",
            "#66c2a5",
            "#3288bd",
            "#5e4fa2"
        ],
        RdYlGn: [
            "#a50026",
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#d9ef8b",
            "#a6d96a",
            "#66bd63",
            "#1a9850",
            "#006837"
        ],
        RdBu: [
            "#67001f",
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#f7f7f7",
            "#d1e5f0",
            "#92c5de",
            "#4393c3",
            "#2166ac",
            "#053061"
        ],
        PiYG: [
            "#8e0152",
            "#c51b7d",
            "#de77ae",
            "#f1b6da",
            "#fde0ef",
            "#f7f7f7",
            "#e6f5d0",
            "#b8e186",
            "#7fbc41",
            "#4d9221",
            "#276419"
        ],
        PRGn: [
            "#40004b",
            "#762a83",
            "#9970ab",
            "#c2a5cf",
            "#e7d4e8",
            "#f7f7f7",
            "#d9f0d3",
            "#a6dba0",
            "#5aae61",
            "#1b7837",
            "#00441b"
        ],
        RdYlBu: [
            "#a50026",
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee090",
            "#ffffbf",
            "#e0f3f8",
            "#abd9e9",
            "#74add1",
            "#4575b4",
            "#313695"
        ],
        BrBG: [
            "#543005",
            "#8c510a",
            "#bf812d",
            "#dfc27d",
            "#f6e8c3",
            "#f5f5f5",
            "#c7eae5",
            "#80cdc1",
            "#35978f",
            "#01665e",
            "#003c30"
        ],
        RdGy: [
            "#67001f",
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#ffffff",
            "#e0e0e0",
            "#bababa",
            "#878787",
            "#4d4d4d",
            "#1a1a1a"
        ],
        PuOr: [
            "#7f3b08",
            "#b35806",
            "#e08214",
            "#fdb863",
            "#fee0b6",
            "#f7f7f7",
            "#d8daeb",
            "#b2abd2",
            "#8073ac",
            "#542788",
            "#2d004b"
        ],
        // qualitative
        Set2: [
            "#66c2a5",
            "#fc8d62",
            "#8da0cb",
            "#e78ac3",
            "#a6d854",
            "#ffd92f",
            "#e5c494",
            "#b3b3b3"
        ],
        Accent: [
            "#7fc97f",
            "#beaed4",
            "#fdc086",
            "#ffff99",
            "#386cb0",
            "#f0027f",
            "#bf5b17",
            "#666666"
        ],
        Set1: [
            "#e41a1c",
            "#377eb8",
            "#4daf4a",
            "#984ea3",
            "#ff7f00",
            "#ffff33",
            "#a65628",
            "#f781bf",
            "#999999"
        ],
        Set3: [
            "#8dd3c7",
            "#ffffb3",
            "#bebada",
            "#fb8072",
            "#80b1d3",
            "#fdb462",
            "#b3de69",
            "#fccde5",
            "#d9d9d9",
            "#bc80bd",
            "#ccebc5",
            "#ffed6f"
        ],
        Dark2: [
            "#1b9e77",
            "#d95f02",
            "#7570b3",
            "#e7298a",
            "#66a61e",
            "#e6ab02",
            "#a6761d",
            "#666666"
        ],
        Paired: [
            "#a6cee3",
            "#1f78b4",
            "#b2df8a",
            "#33a02c",
            "#fb9a99",
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#6a3d9a",
            "#ffff99",
            "#b15928"
        ],
        Pastel2: [
            "#b3e2cd",
            "#fdcdac",
            "#cbd5e8",
            "#f4cae4",
            "#e6f5c9",
            "#fff2ae",
            "#f1e2cc",
            "#cccccc"
        ],
        Pastel1: [
            "#fbb4ae",
            "#b3cde3",
            "#ccebc5",
            "#decbe4",
            "#fed9a6",
            "#ffffcc",
            "#e5d8bd",
            "#fddaec",
            "#f2f2f2"
        ]
    };
    // add lowercase aliases for case-insensitive matches
    for(var i = 0, list = Object.keys(colorbrewer); i < list.length; i += 1){
        var key = list[i];
        colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }
    var colorbrewer_1 = colorbrewer;
    var chroma = chroma_1;
    // feel free to comment out anything to rollup
    // a smaller chroma.js built
    // io --> convert colors
    // operators --> modify existing Colors
    // interpolators
    // generators -- > create new colors
    chroma.average = average;
    chroma.bezier = bezier_1;
    chroma.blend = blend_1;
    chroma.cubehelix = cubehelix;
    chroma.mix = chroma.interpolate = mix$1;
    chroma.random = random_1;
    chroma.scale = scale$2;
    // other utility methods
    chroma.analyze = analyze_1.analyze;
    chroma.contrast = contrast;
    chroma.deltaE = deltaE;
    chroma.distance = distance;
    chroma.limits = analyze_1.limits;
    chroma.valid = valid;
    // scale
    chroma.scales = scales;
    // colors
    chroma.colors = w3cx11_1;
    chroma.brewer = colorbrewer_1;
    var chroma_js = chroma;
    return chroma_js;
});

},{}],"6MAhy":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "posx.5d60cedc.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"d4Kua":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "negx.d20ed358.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"jQrDm":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "posy.5f0ee839.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"5tE9m":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "negy.5fc82de9.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"axQiE":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "posz.da75f2c4.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"10sgW":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "negz.2c4b4391.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"5NVKv":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "hft-icon-16.f167c61e.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"Cud2t":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "goldengate.1f6cbf46.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"46ggt":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ObjMtlImport = void 0;
const twgl = __importStar(require("./../node_modules/twgl.js")); // Greg's work (lib)
const twgl_js_1 = require("./../node_modules/twgl.js"); // Greg's work (lib)
const mobj = __importStar(require("./matobjreader")); // read geometry from .obj / .mtl files (interface)
const mobjfiles = __importStar(require("./matobjfiles")); // read geometry from .obj / .mtl files (resources)
const camhandler = __importStar(require("./camhandler")); // camera projection
class ObjMtlImport {
    constructor(cgl, capp, UrlPars){
        this.time = 0;
        this.dtime = 0.01;
        this.vertexPositionAttribute = 0; // address of positions buffer in shader
        this.normalAttribute = 0; // address of normals buffer in shader
        this.texCoordAttribute = 0; // address of texture coords in shader
        this.texs = [];
        this.uniforms = {
            u_lightWorldPos: [
                0,
                0,
                0
            ],
            u_ambient: [
                0,
                0,
                0,
                1
            ],
            u_specular: [
                0,
                0,
                0,
                1
            ],
            u_emissive: [
                0,
                0,
                0,
                1
            ],
            u_shininess: 0,
            u_specularFactor: 0.0,
            u_diffuse: this.texs[0],
            u_difflightintensity: 0,
            u_speclightintensity: 0
        };
        this.resolvedfilenames = new Map();
        this.resolvedtextures = new Map();
        this.imgs = [];
        this.imgsa = [];
        //--- SHADERS ------------------------------------------------------------------------------------------------------
        this.vs = `#version 300 es
uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPos;
uniform mat4 u_world;
uniform mat4 u_viewInverse;
uniform mat4 u_worldInverseTranspose;

// ES3 convention
//layout(location=0) in vec4 position;
//layout(location=1) in vec3 normal;
//layout(location=2) in vec2 texcoord;

in vec4 position;
in vec3 normal;
in vec2 texcoord;

// out, not varying
out vec4 v_position;
out  vec2 v_texCoord;
out  vec3 v_normal;
out  vec3 v_surfaceToLight;
out  vec3 v_surfaceToView;

void main() {
  v_texCoord = texcoord;
  v_position = u_worldViewProjection * position;
  v_normal = (u_worldInverseTranspose * vec4(normal, 0)).xyz;
  v_surfaceToLight = u_lightWorldPos - (u_world * position).xyz;
  v_surfaceToView = (u_viewInverse[3] - (u_world * position)).xyz;
  gl_Position = v_position;
}
`;
        this.fs = `#version 300 es
 precision mediump float;

 in vec4 v_position;
 in vec2 v_texCoord;
 in vec3 v_normal;
 in vec3 v_surfaceToLight;
 in vec3 v_surfaceToView;

 uniform vec3 u_lightDirection;
 uniform vec4 u_ambient;
 uniform sampler2D u_diffuse;
 uniform vec4 u_specular;
 uniform vec4 u_emissive;
 uniform float u_shininess;
 uniform float u_specularFactor;
 uniform float u_difflightintensity;
 uniform float u_speclightintensity;


 vec4 lit(float l ,float h, float m) {
   return vec4(1.0,
               max(l, 0.0),
               (l > 0.0) ? pow(max(0.0, h), m) : 0.0,
               1.0);
 }

 out vec4 glFragColor;

 void main() {
  
    vec3 normal = normalize(v_normal);
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(u_lightDirection + surfaceToViewDirection);

    float fakeLight = dot(u_lightDirection, normal) * .5 + .5;
    float specularLight = clamp(dot(normal, halfVector), 0.0, 1.0);


  vec4 diffuseColor = texture(u_diffuse, v_texCoord);
  float lightIntensity = dot(normalize(v_normal), normalize(v_surfaceToLight)); 
  lightIntensity = clamp( lightIntensity,0.0,u_difflightintensity);
  vec4 ambientColor = u_ambient * 0.25;
  diffuseColor = diffuseColor * lightIntensity;
  float shininess = clamp(u_shininess / 10.0, 0.,u_speclightintensity);
  vec4 emissiveColor = normalize(u_emissive) * shininess;
  vec4 specColor = specularLight * u_specular;
  vec4 outColor = diffuseColor + emissiveColor + specColor + ambientColor;
  outColor[3] = 1.0;
  glFragColor = outColor;
 }`;
        this.app = capp;
        this.gl = cgl;
        twgl.setAttributePrefix("a_");
        this.getFiles(UrlPars).then(()=>{
            if (mobj.mesh) {
                console.log("=> Constructor - create programInfo");
                this.programInfo = twgl.createProgramInfo(this.gl, [
                    this.vs,
                    this.fs
                ]);
                console.log("=> Constructor - register attributes");
                this.vertexPositionAttribute = this.gl.getAttribLocation(this.programInfo.program, "position");
                this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
                this.normalAttribute = this.gl.getAttribLocation(this.programInfo.program, "normal");
                this.gl.enableVertexAttribArray(this.normalAttribute);
                this.texCoordAttribute = this.gl.getAttribLocation(this.programInfo.program, "texcoord");
                this.gl.enableVertexAttribArray(this.texCoordAttribute);
                // Create a camera
                var szx = mobj.meshMinMax.maxx - mobj.meshMinMax.minx;
                var szy = mobj.meshMinMax.maxy - mobj.meshMinMax.miny;
                var szz = mobj.meshMinMax.maxz - mobj.meshMinMax.minz;
                var szobj = Math.sqrt(szx * szx + szy * szy + szz * szz);
                this.cam = camhandler.Camera.createYUpCamera(this.gl, UrlPars, szobj * 2, this.app);
                this.cam.translateTarget([
                    (mobj.meshMinMax.maxx + mobj.meshMinMax.minx) / 2,
                    (mobj.meshMinMax.maxy + mobj.meshMinMax.miny) / 2,
                    (mobj.meshMinMax.maxz + mobj.meshMinMax.minz) / 2
                ]);
                this.cam.zoominVelocity = szobj / 40.0;
                // Prepare obj mesh for display
                console.log("obj/mtl mesh read ok");
                mobj.CreateMeshWithBuffers(this.gl); // unpack index and positions
                mobj.PrepareIndexBuffers(this.gl); // for each material, set up an index buffer
                console.log("<= Prepare obj/mtl mesh <= buffers ok");
                // Fetch file texture content, start rendering when all textures read
                this.Prepare();
            } else console.log("ERROR: obj/mtl no mesh could be created.");
        }); // getfiles then({})
    }
    //------------------------------------------------------------------------
    async getFiles(UrlPars) {
        const useInMemoryObj = false;
        if (useInMemoryObj) mobj.GetDeclaredObjMtl();
        else {
            var cresolvedfilepair = mobjfiles.getFileNamesCube();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("koenigsegg")) != undefined) cresolvedfilepair = mobjfiles.getFileNamesKoenigsEgg();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("building")) != undefined) cresolvedfilepair = mobjfiles.getFileNamesBuilding();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("chair")) != undefined) cresolvedfilepair = mobjfiles.getFileNamesChair();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("chair2")) != undefined) cresolvedfilepair = mobjfiles.getFileNamesChair2();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("cat")) != undefined) cresolvedfilepair = mobjfiles.getFileNamesCat();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("plane")) != undefined) cresolvedfilepair = mobjfiles.getFileNamesPlane();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("rubik")) != undefined) cresolvedfilepair = mobjfiles.getFileNamesRubik();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("stone")) != undefined) cresolvedfilepair = mobjfiles.getFileNamesStone();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("greenhouse")) != undefined) cresolvedfilepair = mobjfiles.getFileNamesGreenhouse();
            console.log("=> await " + cresolvedfilepair.cobjname + " " + cresolvedfilepair.cmatname);
            await mobj.asyncFetchObjMtl(cresolvedfilepair.cobjname, cresolvedfilepair.cmatname);
            if (cresolvedfilepair.cfiles != undefined && cresolvedfilepair.cfiles.length > 0) {
                console.log("<= await result");
                console.log("see resolved files: " + cresolvedfilepair.cfiles.length);
                cresolvedfilepair.cfiles.forEach(({ fName , fNameResolved  })=>{
                    this.resolvedfilenames.set(fName, fNameResolved);
                    console.log("reg: " + fName + " => " + fNameResolved);
                });
            } else console.log("<= await no result");
        }
    }
    //--------------------------------------------------------------------
    LoadImage(gl, url, onload) {
        var img = new Image();
        img.src = url;
        img.onload = function() {
            onload(gl, img);
        };
        return img;
    }
    LoadImages(gl, istr, urls, onload) {
        var img = new Image();
        img.src = urls[istr];
        img.onload = ()=>{
            console.log("load image: [" + urls[istr]);
            istr = this.imgs.push(img);
            if (istr < urls.length) this.LoadImages(gl, istr, urls, onload);
            else onload(gl, istr);
        };
        return img;
    }
    //--------------------------------------------------------------------
    Prepare() {
        console.log("=> Prepare - get materials");
        this.mats = mobj.mesh.materialsByIndex;
        if (this.mats == null || this.mats == undefined) return;
        console.log("=> Prepare - found " + mobj.mesh.materialNames.length + " materials in mtl");
        for(var i = 0; i < mobj.mesh.materialNames.length; i++){
            var s1 = this.mats[i];
            if (s1 != undefined) {
                console.log("found  material i=" + i + " name=" + mobj.mesh.materialNames[i]);
                var nn = [];
                for(var j = 0; j < 4; j++){
                    nn.push(255 * this.mats[i].diffuse[0]); // create mini texture for diffuse color
                    nn.push(255 * this.mats[i].diffuse[1]);
                    nn.push(255 * this.mats[i].diffuse[2]);
                    nn.push(255);
                }
                this.texs.push(twgl.createTexture(this.gl, {
                    min: this.gl.NEAREST,
                    mag: this.gl.NEAREST,
                    src: nn
                }));
                var sfile = this.mats[i].mapDiffuse;
                if (sfile.filename != undefined && sfile.filename != "") console.log("Prepare - found material texture file reference: [" + sfile.filename + "]");
            }
        }
        var imageUrls = [];
        var imageUrlKeys = [];
        if (this.resolvedfilenames.keys != undefined) this.resolvedfilenames.forEach((value, key)=>{
            console.log("Prepare " + key + " set texture file load: " + value);
            imageUrls.push(value);
            imageUrlKeys.push(key);
        });
        if (imageUrls.length > 0) // ok await FetchImage(imageUrls[0]).then((value:ArrayBuffer)=>imgsa.push(value));
        // ok console.log("fetched image 0, byteLength="+imgsa[0].byteLength);
        this.LoadImages(this.gl, 0, imageUrls, (gl, istr)=>{
            console.log("Found " + istr + " file textures, expect " + imageUrls.length);
            for(var i = 0; i < istr; i++){
                var texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                //  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                //  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, this.imgs[i].width, this.imgs[i].height);
                gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, this.imgs[i]);
                this.resolvedtextures.set(imageUrlKeys[i], texture);
                console.log("Prepare - register resolved texture " + i + " " + imageUrlKeys[i] + " width=" + this.imgs[i].width + " height=" + this.imgs[i].height);
            }
            console.log("Prepare - texture itemSize=" + mobj.meshWithBuffers.textureBuffer.itemSize);
            console.log("Prepare - finish, there are " + istr + " file textures");
            this.time = 0;
            twgl.resizeCanvasToDisplaySize(this.gl.canvas);
            requestAnimationFrame(()=>this.render(0));
        }); // return from LoadImages()       
        else {
            console.log("Prepare - no textures, > requestAnimationFrame()");
            this.time = 0;
            twgl.resizeCanvasToDisplaySize(this.gl.canvas);
            requestAnimationFrame(()=>this.render(0));
        }
        console.log("Prepare - return");
    }
    //--- render function ------------------------------------------------------------
    prepareMaterial(i) {
        var ctexture = this.texs[i]; // for each material there is one preset diffuse texture
        var cmaterial = this.mats[i];
        var srep = "";
        if (cmaterial.mapDiffuse == undefined) {
            srep = "No file, use color texture i=" + i;
            this.uniforms.u_diffuse = ctexture;
        } else if (cmaterial.mapDiffuse.filename.length > 0) {
            var tx = this.resolvedtextures.get(cmaterial.mapDiffuse.filename);
            if (tx == undefined || tx == null) {
                this.uniforms.u_diffuse = ctexture;
                srep = "No resolve, use color texture i=" + i;
            } else {
                this.uniforms.u_diffuse = ctexture = tx; // file texture
                srep = "Resolve, use file texture i=" + i + " " + cmaterial.mapDiffuse.filename;
            }
        } else {
            this.uniforms.u_diffuse = ctexture = this.texs[i]; // diffuse color texture
            srep = "No filename, use color texture i=" + i;
        }
        this.uniforms.u_emissive = [
            cmaterial.emissive[0],
            cmaterial.emissive[1],
            cmaterial.emissive[2],
            1
        ];
        this.uniforms.u_ambient = [
            cmaterial.ambient[0],
            cmaterial.ambient[1],
            cmaterial.ambient[2],
            1
        ];
        this.uniforms.u_specular = [
            cmaterial.specular[0],
            cmaterial.specular[1],
            cmaterial.specular[2],
            1
        ];
        this.uniforms.u_shininess = cmaterial.illumination;
        this.uniforms.u_difflightintensity = 1.0;
        //  console.log(srep+", ambient="+uniforms.u_ambient.toString()+" specular="+uniforms.u_specular.toString()+" emissive="+uniforms.u_emissive.toString()+" shininess="+uniforms.u_shininess);
        return ctexture;
    }
    render(dtime) {
        this.time += dtime;
        if (this.cam == undefined || this.programInfo == undefined) return;
        this.uniforms.u_lightWorldPos = this.cam.lightpos;
        this.uniforms.u_difflightintensity = this.cam.difflightintensity;
        this.uniforms.u_speclightintensity = this.cam.speclightintensity;
        var world = twgl_js_1.m4.identity();
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.cam.CamHandlingYUp(this.gl, this.app);
        this.gl.useProgram(this.programInfo.program);
        for(var i = 0; i < this.texs.length; i++)if (this.mats[i] != undefined) {
            var ctexture = this.prepareMaterial(i);
            twgl.setUniforms(this.programInfo, this.uniforms);
            twgl.setUniforms(this.programInfo, {
                u_viewInverse: this.cam.lookAt,
                u_world: world,
                u_worldInverseTranspose: twgl_js_1.m4.transpose(twgl_js_1.m4.inverse(world)),
                u_worldViewProjection: twgl_js_1.m4.multiply(this.cam.viewProjection, world)
            });
            mobj.renderIndexBuffer(this.gl, this.vertexPositionAttribute, this.normalAttribute, this.texCoordAttribute, i, 2, ctexture);
        }
         // for
        requestAnimationFrame(()=>this.render(this.dtime));
    }
}
exports.ObjMtlImport = ObjMtlImport;

},{"./../node_modules/twgl.js":"3uqAP","./matobjreader":"l7kuN","./matobjfiles":"3eVMn","./camhandler":"4jukU"}],"l7kuN":[function(require,module,exports) {
"use strict";
// https://www.npmjs.com/package/webgl-obj-loader
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GetDeclaredObjMtl = exports.asyncFetchObjMtl = exports.FetchImage = exports.PrepareIndexBuffers = exports.renderIndexBuffer = exports.render = exports.NumElements = exports.CreateMeshWithBuffers = exports.meshWithBuffers = exports.meshMinMax = exports.mesh = void 0;
const OBJ = __importStar(require("webgl-obj-loader"));
const webgl_obj_loader_1 = require("webgl-obj-loader");
function CreateMeshWithBuffers(gl) {
    exports.meshWithBuffers = OBJ.initMeshBuffers(gl, exports.mesh);
    console.log("meshWithBuffers.vertexBuffer.numItems=" + exports.meshWithBuffers.vertexBuffer.numItems);
    console.log("meshWithBuffers.vertexBuffer.vertices.length=" + exports.meshWithBuffers.vertices.values.length);
    console.log("meshWithBuffers.vertexBuffer.vertices.values.length=" + exports.meshWithBuffers.vertices.values.length);
    console.log("meshWithBuffers.normalBuffer.numItems=" + exports.meshWithBuffers.normalBuffer.numItems);
    console.log("meshWithBuffers.indices.length=" + exports.meshWithBuffers.indices.length);
    console.log("meshWithBuffers.indexBuffer.numItems=" + exports.meshWithBuffers.indexBuffer.numItems);
    console.log("meshWithBuffers.textureBuffer.numItems=" + exports.meshWithBuffers.textureBuffer.numItems);
}
exports.CreateMeshWithBuffers = CreateMeshWithBuffers;
function NumElements() {
    return exports.meshWithBuffers === null || exports.meshWithBuffers === void 0 ? void 0 : exports.meshWithBuffers.indexBuffer.numItems;
}
exports.NumElements = NumElements;
function buildBuffer(gl, type, data, itemSize) {
    const buffer = gl.createBuffer();
    const arrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, new arrayView(data), gl.STATIC_DRAW);
    buffer.itemSize = itemSize;
    buffer.numItems = data.length / itemSize;
    return buffer;
}
function render(gl, vertexPositionAttribute, normalAttribute, texCoordAttribute, offset) {
    gl.bindBuffer(gl.ARRAY_BUFFER, exports.meshWithBuffers.vertexBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, exports.meshWithBuffers.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, exports.meshWithBuffers.normalBuffer);
    gl.vertexAttribPointer(normalAttribute, exports.meshWithBuffers.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    var cindexBuffer = buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, exports.mesh.indicesPerMaterial[offset], 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cindexBuffer);
    if (!exports.mesh.textures.length) gl.disableVertexAttribArray(texCoordAttribute);
    else {
        gl.enableVertexAttribArray(texCoordAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, exports.meshWithBuffers.textureBuffer);
        gl.vertexAttribPointer(texCoordAttribute, exports.meshWithBuffers.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }
    gl.drawElements(gl.TRIANGLES, exports.mesh.indicesPerMaterial[offset].length, gl.UNSIGNED_SHORT, 0);
}
exports.render = render;
//===============================================================================================================================================================
var matlib;
var indexBuffers = [];
function renderIndexBuffer(gl, vertexPositionAttribute, normalAttribute, texCoordAttribute, offset, texItemSize, tex) {
    gl.bindBuffer(gl.ARRAY_BUFFER, exports.meshWithBuffers.vertexBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, exports.meshWithBuffers.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, exports.meshWithBuffers.normalBuffer);
    gl.vertexAttribPointer(normalAttribute, exports.meshWithBuffers.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffers[offset]);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.enableVertexAttribArray(texCoordAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, exports.meshWithBuffers.textureBuffer);
    gl.vertexAttribPointer(texCoordAttribute, texItemSize, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.TRIANGLES, exports.mesh.indicesPerMaterial[offset].length, gl.UNSIGNED_SHORT, 0);
}
exports.renderIndexBuffer = renderIndexBuffer;
function PrepareIndexBuffers(gl) {
    for(var i = 0; i < exports.mesh.materialNames.length; i++)indexBuffers.push(buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, exports.mesh.indicesPerMaterial[i], 1));
}
exports.PrepareIndexBuffers = PrepareIndexBuffers;
function MeshMinMax() {
    var minx = 1e8;
    var maxx = -100000000;
    var miny = 1e8;
    var maxy = -100000000;
    var minz = 1e8;
    var maxz = -100000000;
    var i;
    for(i = 0; i < exports.mesh.vertices.length; i += 3){
        if (exports.mesh.vertices[i + 0] < minx) minx = exports.mesh.vertices[i + 0];
        if (exports.mesh.vertices[i + 1] < miny) miny = exports.mesh.vertices[i + 1];
        if (exports.mesh.vertices[i + 2] < minz) minz = exports.mesh.vertices[i + 2];
        if (exports.mesh.vertices[i + 0] > maxx) maxx = exports.mesh.vertices[i + 0];
        if (exports.mesh.vertices[i + 1] > maxy) maxy = exports.mesh.vertices[i + 1];
        if (exports.mesh.vertices[i + 2] > maxz) maxz = exports.mesh.vertices[i + 2];
    }
    return {
        minx,
        maxx,
        miny,
        maxy,
        minz,
        maxz
    };
}
function meshReport() {
    var rv = {
        smatreport: "",
        smeshreport: ""
    };
    rv.smeshreport += "mesh.indices.length=" + exports.mesh.indices.length + " mesh.vertices.length=" + exports.mesh.vertices.length + " mesh.vertexNormals.length=" + exports.mesh.vertexNormals.length + "<br />";
    rv.smeshreport += "mesh.vertexMaterialIndices.length=" + exports.mesh.vertexMaterialIndices.length; //+" vertices.length="+mesh.vertices.length+" vertexNormals.length="+mesh.vertexNormals.length);
    var mats = matlib.materials;
    for(let key in mats){
        var value = mats[key];
        rv.smatreport += value.name + " dif=" + value.diffuse + " amb=" + value.ambient + " emis=" + value.emissive + " spec=" + value.specular + " mapamb=" + value.mapDiffuse.filename + " ill=" + value.illumination + "<br/>";
    }
    exports.meshMinMax = MeshMinMax();
    rv.smeshreport += "<br/>";
    rv.smeshreport += "minx=" + exports.meshMinMax.minx + ", maxx=" + exports.meshMinMax.maxx + "<br />";
    rv.smeshreport += "miny=" + exports.meshMinMax.miny + ", maxy=" + exports.meshMinMax.maxy + "<br />";
    rv.smeshreport += "minz=" + exports.meshMinMax.minz + ", maxz=" + exports.meshMinMax.maxz + "<br />";
    return rv;
}
//--- FETCH OBJ+MTL --------------------------------------------------------------------------------------
async function FetchText(cparcelname) {
    const res = await fetch(cparcelname);
    var b = await res.arrayBuffer();
    var enc = new TextDecoder("utf-8");
    return enc.decode(b);
}
async function FetchImage(cparcelname) {
    const res = await fetch(cparcelname);
    return res.arrayBuffer();
}
exports.FetchImage = FetchImage;
async function asyncFetchObjMtl(cobjname, cmatname) {
    var abobj = await FetchText(cobjname);
    var abmtl = await FetchText(cmatname);
    matlib = new webgl_obj_loader_1.MaterialLibrary(abmtl);
    if (matlib) {
        var l = matlib.materials["Material"];
        if (l != undefined) console.log("ambient=" + l.ambient + " diffuse=" + l.diffuse + " specular=" + l.specular);
        var cMeshOptions = {
            enableWTextureCoord: false,
            calcTangentsAndBitangents: false,
            materials: matlib.materials
        };
        exports.mesh = new webgl_obj_loader_1.Mesh(abobj, cMeshOptions);
        if (exports.mesh) {
            exports.mesh.addMaterialLibrary(matlib);
            var rv = meshReport();
            const mydiv = document.querySelector("#cdiv");
            var cstyle = "<style> thead {color: green;} tbody {color: blue;}tfoot {color: red;}table, th, td { border: 1px solid black;}</style>";
            if (mydiv) mydiv.innerHTML = cstyle + "<table><thead><tr><th style='horizontal-align:left'>MTL Material</th><th>OBJ Mesh</th></tr></thead><tbody><tr><td style='vertical-align:top;width:600px'>" + rv.smatreport + "</td><td style='vertical-align:top'>" + rv.smeshreport + "</td></tr></tbody></table>";
        } else console.log("object file  " + cobjname + " could not be read.");
    } else console.log("materials file " + cmatname + " could not be read");
}
exports.asyncFetchObjMtl = asyncFetchObjMtl;
//===========================================================================================================================================
//===========================================================================================================================================
function GetDeclaredObjMtl() {
    console.log("strings fetched");
    var abobj = cubegeo;
    var abmtl = cubemat;
    //const arr = abobj.toString().replace(/\r\n/g,'\n').split('\n');
    if (OBJ) {
        matlib = new webgl_obj_loader_1.MaterialLibrary(abmtl);
        if (matlib) {
            var l = matlib.materials["Material"];
            console.log("Found material: " + l);
            if (l != undefined) console.log("ambient=" + l.ambient + " diffuse=" + l.diffuse + " specular=" + l.specular + " l.illum=" + l.illumination);
            var cMeshOptions = {
                enableWTextureCoord: false,
                calcTangentsAndBitangents: false,
                materials: matlib.materials
            };
            exports.mesh = new webgl_obj_loader_1.Mesh(abobj, cMeshOptions);
            if (exports.mesh) {
                exports.mesh.addMaterialLibrary(matlib);
                var rv = meshReport();
                const mydiv = document.querySelector("#cdiv");
                var cstyle = "<style> thead {color: green;} tbody {color: blue;}tfoot {color: red;}table, th, td { border: 1px solid black;}</style>";
                if (mydiv) mydiv.innerHTML = cstyle + "<table><thead><tr><th style='horizontal-align:left'>MTL Material</th><th>OBJ Mesh</th></tr></thead><tbody><tr><td style='vertical-align:top;width:auto'>" + rv.smatreport + "</td><td style='width:600px;vertical-align:top'>" + rv.smeshreport + "</td></tr></tbody></table>";
            } else console.log("Cube obj in memory could not be read.");
        } else console.log("Cube obj materials could not be read");
    } else console.log("OBJ import library not accessible");
}
exports.GetDeclaredObjMtl = GetDeclaredObjMtl;
//========================================================================================================================================================
/*
  function* triangulate(elements: string[]) {
    if (elements.length <= 3) {
        yield elements;
    } else if (elements.length === 4) {
        yield [elements[0], elements[1], elements[2]];
        yield [elements[2], elements[3], elements[0]];
    } else {
        for (let i = 1; i < elements.length - 1; i++) {
            yield [elements[0], elements[i], elements[i + 1]];
        }
    }
}
   //--- my own converter for  the obj
   const currentMaterialIndex = 0;
   const currentObjectByMaterialIndex = 0;
   const enableWTextureCoord=false;
   const verts = [];
   const vertNormals = [];
   const textures = [];
   const faces = [];
   const unpackedverts = [];
   const unpackedtextures = [];
   const unpackednorms = [];
   const unpackedhashindices: { [k: string]: number } = {}
   const unpackedindices: number[][] = [];
   var unpackedindex = 0;
   unpackedindices.push([]);
   for(let s of arr) {
    const elements = s.split(' ');
    elements.shift();
    if (s.startsWith('v '))
         verts.push(...elements);
       else
       if (s.startsWith('vt '))
         textures.push(...elements);
       else
       if (s.startsWith('vn '))
         vertNormals.push(...elements);
       else
       if (s.startsWith('f '))
       {
        const triangles = triangulate(elements);
        for (let e of elements) console.log("["+e+"] ");
        var ntr=0;
        for (const triangle of triangles) {
            var srep = "";
            for (const trianglepoint of triangle)
            {
              const hash = trianglepoint + "," + currentMaterialIndex;
              if (hash in unpackedhashindices) {
                unpackedindices[currentObjectByMaterialIndex].push(unpackedhashindices[hash]);
                srep+="{ Ref: "+hash+" },";
               } else
                  {
                   const vertex = trianglepoint.split("/");
                   var v1 = +verts[(+vertex[0] - 1) * 3 + 0];
                   var v2 = +verts[(+vertex[0] - 1) * 3 + 1];
                   var v3 = +verts[(+vertex[0] - 1) * 3 + 2];
                   unpackedverts.push(v1);
                   unpackedverts.push(v2);
                   unpackedverts.push(v3);
                   srep+="{ V["+v1+","+v2+","+v3+"], ";
                   if (textures.length) {
                     const stride = enableWTextureCoord ? 3 : 2;
                     var t1=+textures[(+vertex[1] - 1) * stride + 0];
                     var t2=+textures[(+vertex[1] - 1) * stride + 1];
                     unpackedtextures.push(t1);
                     unpackedtextures.push(t2);
                     srep+="T["+t1+","+t2+"], ";
                     if (enableWTextureCoord) {
                       unpackedtextures.push(+textures[(+vertex[1] - 1) * stride + 2]);
                      }
                   }
                   const normalIndex = vertex.length - 1;
                   var n1 = +vertNormals[(+vertex[normalIndex] - 1) * 3 + 0];
                   var n2 = +vertNormals[(+vertex[normalIndex] - 1) * 3 + 1];
                   var n3 = +vertNormals[(+vertex[normalIndex] - 1) * 3 + 2];
                   unpackednorms.push(n1);
                   unpackednorms.push(n2);
                   unpackednorms.push(n3);
                   srep+="N["+n1+","+n2+","+n3+"] }, ";
                   unpackedhashindices[hash] = unpackedindex;
                   unpackedindices[currentObjectByMaterialIndex].push(unpackedhashindices[hash]);
                   unpackedindex += 1;
                  }
            }
            console.log("Tr: { "+srep + "}") ;
            ntr+=triangle.length;
          }
        console.log("ntr="+ntr);
        faces.push(...elements);
       }
    
  }
*/ /*
  console.log("Indices found:");
  unpackedindices[currentObjectByMaterialIndex].forEach((num)=>{console.log(num+" "); });
  console.log("Norms found:");
  unpackednorms.forEach((num)=>{console.log(num+" "); });
  console.log("Vertices found:");
  unpackedverts.forEach((num)=>{console.log(num+" "); });
*/ //========================================================================================================================================================
const cubemat = `# Blender MTL File: 'None'
# Material Count: 11

newmtl Material
Ns 323.999994
Ka 1.000000 1.000000 0.000000
Kd 0.500000 0.500000 1.000000
Ks 0.500000 0.500000 1.000000
Ke 0.0 1.0 0.0
Ni 1.000000
d 1.000000
illum 6

newmtl Material2
Ns 323.999994
Ka 0.000000 1.000000 0.000000
Kd 1.000000 0.500000 1.000000
Ks 1.000000 1.000000 0.000000
Ke 0.0 1.0 0.0
Ni 1.000000
d 1.000000
illum 6
`;
const cubegeo = `# Blender v2.80 (sub 75) OBJ File: ''
# www.blender.org
mtllib cube2.mtl
o Cube
v 1.000000 1.000000 -1.000000
v 1.000000 -1.000000 -1.000000
v 1.000000 1.000000 1.000000
v 1.000000 -1.000000 1.000000
v -1.000000 1.000000 -1.000000
v -1.000000 -1.000000 -1.000000
v -1.000000 1.000000 1.000000
v -1.000000 -1.000000 1.000000
v 4.000000 1.000000 -1.000000
v 4.000000 -1.000000 -1.000000
v 4.000000 1.000000 1.000000
v 4.000000 -1.000000 1.000000
v 3.000000 1.000000 -1.000000
v 3.000000 -1.000000 -1.000000
v 3.000000 1.000000 1.000000
v 3.000000 -1.000000 1.000000
vt 0.375000 0.000000
vt 0.625000 0.000000
vt 0.625000 0.250000
vt 0.375000 0.250000
vt 0.375000 0.250000
vt 0.625000 0.250000
vt 0.625000 0.500000
vt 0.375000 0.500000
vt 0.625000 0.750000
vt 0.375000 0.750000
vt 0.625000 0.750000
vt 0.625000 1.000000
vt 0.375000 1.000000
vt 0.125000 0.500000
vt 0.375000 0.500000
vt 0.375000 0.750000
vt 0.125000 0.750000
vt 0.625000 0.500000
vt 0.875000 0.500000
vt 0.875000 0.750000
vn 0.0000 1.0000 0.0000
vn 0.0000 0.0000 1.0000
vn -1.0000 0.0000 0.0000
vn 0.0000 -1.0000 0.0000
vn 1.0000 0.0000 0.0000
vn 0.0000 0.0000 -1.0000
usemtl Material
s off
f 1/1/1 5/2/1 7/3/1 3/4/1
f 4/5/2 3/6/2 7/7/2 8/8/2
f 8/8/3 7/7/3 5/9/3 6/10/3
f 6/10/4 2/11/4 4/12/4 8/13/4
f 2/14/5 1/15/5 3/16/5 4/17/5
f 6/18/6 5/19/6 1/20/6 2/11/6
usemtl Material2
f 9/1/1 13/2/1 15/3/1 11/4/1
f 12/5/2 11/6/2 15/7/2 16/8/2
f 16/8/3 15/7/3 13/9/3 14/10/3
f 14/10/4 10/11/4 12/12/4 16/13/4
f 10/14/5 9/15/5 11/16/5 12/17/5
f 14/18/6 13/19/6 9/20/6 10/11/6
`;

},{"webgl-obj-loader":"d2ssq"}],"d2ssq":[function(require,module,exports) {
!function(e, t) {
    var n, a;
    module.exports = t();
}("undefined" != typeof self ? self : this, function() {
    return function(e) {
        var t = {};
        function n(a) {
            if (t[a]) return t[a].exports;
            var s = t[a] = {
                i: a,
                l: !1,
                exports: {}
            };
            return e[a].call(s.exports, s, s.exports, n), s.l = !0, s.exports;
        }
        return n.m = e, n.c = t, n.d = function(e, t, a) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: a
            });
        }, n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var a = Object.create(null);
            if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for(var s in e)n.d(a, s, (function(t) {
                return e[t];
            }).bind(null, s));
            return a;
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return n.d(t, "a", t), t;
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, n.p = "/", n(n.s = 0);
    }({
        "./src/index.ts": /*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/ /*! exports provided: OBJ, Attribute, DuplicateAttributeException, Layout, Material, MaterialLibrary, Mesh, TYPES, downloadModels, downloadMeshes, initMeshBuffers, deleteMeshBuffers, version */ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OBJ", function() { return OBJ; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });\n/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mesh */ "./src/mesh.ts");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return _mesh__WEBPACK_IMPORTED_MODULE_0__["default"]; });\n\n/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./material */ "./src/material.ts");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return _material__WEBPACK_IMPORTED_MODULE_1__["Material"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MaterialLibrary", function() { return _material__WEBPACK_IMPORTED_MODULE_1__["MaterialLibrary"]; });\n\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return _layout__WEBPACK_IMPORTED_MODULE_2__["Attribute"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DuplicateAttributeException", function() { return _layout__WEBPACK_IMPORTED_MODULE_2__["DuplicateAttributeException"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return _layout__WEBPACK_IMPORTED_MODULE_2__["Layout"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return _layout__WEBPACK_IMPORTED_MODULE_2__["TYPES"]; });\n\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "downloadModels", function() { return _utils__WEBPACK_IMPORTED_MODULE_3__["downloadModels"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "downloadMeshes", function() { return _utils__WEBPACK_IMPORTED_MODULE_3__["downloadMeshes"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initMeshBuffers", function() { return _utils__WEBPACK_IMPORTED_MODULE_3__["initMeshBuffers"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteMeshBuffers", function() { return _utils__WEBPACK_IMPORTED_MODULE_3__["deleteMeshBuffers"]; });\n\n\n\n\n\nconst version = "2.0.3";\nconst OBJ = {\n    Attribute: _layout__WEBPACK_IMPORTED_MODULE_2__["Attribute"],\n    DuplicateAttributeException: _layout__WEBPACK_IMPORTED_MODULE_2__["DuplicateAttributeException"],\n    Layout: _layout__WEBPACK_IMPORTED_MODULE_2__["Layout"],\n    Material: _material__WEBPACK_IMPORTED_MODULE_1__["Material"],\n    MaterialLibrary: _material__WEBPACK_IMPORTED_MODULE_1__["MaterialLibrary"],\n    Mesh: _mesh__WEBPACK_IMPORTED_MODULE_0__["default"],\n    TYPES: _layout__WEBPACK_IMPORTED_MODULE_2__["TYPES"],\n    downloadModels: _utils__WEBPACK_IMPORTED_MODULE_3__["downloadModels"],\n    downloadMeshes: _utils__WEBPACK_IMPORTED_MODULE_3__["downloadMeshes"],\n    initMeshBuffers: _utils__WEBPACK_IMPORTED_MODULE_3__["initMeshBuffers"],\n    deleteMeshBuffers: _utils__WEBPACK_IMPORTED_MODULE_3__["deleteMeshBuffers"],\n    version,\n};\n/**\n * @namespace\n */\n\n\n\n//# sourceURL=webpack:///./src/index.ts?');
        },
        "./src/layout.ts": /*!***********************!*\
  !*** ./src/layout.ts ***!
  \***********************/ /*! exports provided: TYPES, DuplicateAttributeException, Attribute, Layout */ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return TYPES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DuplicateAttributeException", function() { return DuplicateAttributeException; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return Attribute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });\nvar TYPES;\n(function (TYPES) {\n    TYPES["BYTE"] = "BYTE";\n    TYPES["UNSIGNED_BYTE"] = "UNSIGNED_BYTE";\n    TYPES["SHORT"] = "SHORT";\n    TYPES["UNSIGNED_SHORT"] = "UNSIGNED_SHORT";\n    TYPES["FLOAT"] = "FLOAT";\n})(TYPES || (TYPES = {}));\n/**\n * An exception for when two or more of the same attributes are found in the\n * same layout.\n * @private\n */\nclass DuplicateAttributeException extends Error {\n    /**\n     * Create a DuplicateAttributeException\n     * @param {Attribute} attribute - The attribute that was found more than\n     *        once in the {@link Layout}\n     */\n    constructor(attribute) {\n        super(`found duplicate attribute: ${attribute.key}`);\n    }\n}\n/**\n * Represents how a vertex attribute should be packed into an buffer.\n * @private\n */\nclass Attribute {\n    /**\n     * Create an attribute. Do not call this directly, use the predefined\n     * constants.\n     * @param {string} key - The name of this attribute as if it were a key in\n     *        an Object. Use the camel case version of the upper snake case\n     *        const name.\n     * @param {number} size - The number of components per vertex attribute.\n     *        Must be 1, 2, 3, or 4.\n     * @param {string} type - The data type of each component for this\n     *        attribute. Possible values:<br/>\n     *        "BYTE": signed 8-bit integer, with values in [-128, 127]<br/>\n     *        "SHORT": signed 16-bit integer, with values in\n     *            [-32768, 32767]<br/>\n     *        "UNSIGNED_BYTE": unsigned 8-bit integer, with values in\n     *            [0, 255]<br/>\n     *        "UNSIGNED_SHORT": unsigned 16-bit integer, with values in\n     *            [0, 65535]<br/>\n     *        "FLOAT": 32-bit floating point number\n     * @param {boolean} normalized - Whether integer data values should be\n     *        normalized when being casted to a float.<br/>\n     *        If true, signed integers are normalized to [-1, 1].<br/>\n     *        If true, unsigned integers are normalized to [0, 1].<br/>\n     *        For type "FLOAT", this parameter has no effect.\n     */\n    constructor(key, size, type, normalized = false) {\n        this.key = key;\n        this.size = size;\n        this.type = type;\n        this.normalized = normalized;\n        switch (type) {\n            case "BYTE":\n            case "UNSIGNED_BYTE":\n                this.sizeOfType = 1;\n                break;\n            case "SHORT":\n            case "UNSIGNED_SHORT":\n                this.sizeOfType = 2;\n                break;\n            case "FLOAT":\n                this.sizeOfType = 4;\n                break;\n            default:\n                throw new Error(`Unknown gl type: ${type}`);\n        }\n        this.sizeInBytes = this.sizeOfType * size;\n    }\n}\n/**\n * A class to represent the memory layout for a vertex attribute array. Used by\n * {@link Mesh}\'s TBD(...) method to generate a packed array from mesh data.\n * <p>\n * Layout can sort of be thought of as a C-style struct declaration.\n * {@link Mesh}\'s TBD(...) method will use the {@link Layout} instance to\n * pack an array in the given attribute order.\n * <p>\n * Layout also is very helpful when calling a WebGL context\'s\n * <code>vertexAttribPointer</code> method. If you\'ve created a buffer using\n * a Layout instance, then the same Layout instance can be used to determine\n * the size, type, normalized, stride, and offset parameters for\n * <code>vertexAttribPointer</code>.\n * <p>\n * For example:\n * <pre><code>\n *\n * const index = glctx.getAttribLocation(shaderProgram, "pos");\n * glctx.vertexAttribPointer(\n *   layout.position.size,\n *   glctx[layout.position.type],\n *   layout.position.normalized,\n *   layout.position.stride,\n *   layout.position.offset);\n * </code></pre>\n * @see {@link Mesh}\n */\nclass Layout {\n    /**\n     * Create a Layout object. This constructor will throw if any duplicate\n     * attributes are given.\n     * @param {Array} ...attributes - An ordered list of attributes that\n     *        describe the desired memory layout for each vertex attribute.\n     *        <p>\n     *\n     * @see {@link Mesh}\n     */\n    constructor(...attributes) {\n        this.attributes = attributes;\n        this.attributeMap = {};\n        let offset = 0;\n        let maxStrideMultiple = 0;\n        for (const attribute of attributes) {\n            if (this.attributeMap[attribute.key]) {\n                throw new DuplicateAttributeException(attribute);\n            }\n            // Add padding to satisfy WebGL\'s requirement that all\n            // vertexAttribPointer calls have an offset that is a multiple of\n            // the type size.\n            if (offset % attribute.sizeOfType !== 0) {\n                offset += attribute.sizeOfType - (offset % attribute.sizeOfType);\n                console.warn("Layout requires padding before " + attribute.key + " attribute");\n            }\n            this.attributeMap[attribute.key] = {\n                attribute: attribute,\n                size: attribute.size,\n                type: attribute.type,\n                normalized: attribute.normalized,\n                offset: offset,\n            };\n            offset += attribute.sizeInBytes;\n            maxStrideMultiple = Math.max(maxStrideMultiple, attribute.sizeOfType);\n        }\n        // Add padding to the end to satisfy WebGL\'s requirement that all\n        // vertexAttribPointer calls have a stride that is a multiple of the\n        // type size. Because we\'re putting differently sized attributes into\n        // the same buffer, it must be padded to a multiple of the largest\n        // type size.\n        if (offset % maxStrideMultiple !== 0) {\n            offset += maxStrideMultiple - (offset % maxStrideMultiple);\n            console.warn("Layout requires padding at the back");\n        }\n        this.stride = offset;\n        for (const attribute of attributes) {\n            this.attributeMap[attribute.key].stride = this.stride;\n        }\n    }\n}\n// Geometry attributes\n/**\n * Attribute layout to pack a vertex\'s x, y, & z as floats\n *\n * @see {@link Layout}\n */\nLayout.POSITION = new Attribute("position", 3, TYPES.FLOAT);\n/**\n * Attribute layout to pack a vertex\'s normal\'s x, y, & z as floats\n *\n * @see {@link Layout}\n */\nLayout.NORMAL = new Attribute("normal", 3, TYPES.FLOAT);\n/**\n * Attribute layout to pack a vertex\'s normal\'s x, y, & z as floats.\n * <p>\n * This value will be computed on-the-fly based on the texture coordinates.\n * If no texture coordinates are available, the generated value will default to\n * 0, 0, 0.\n *\n * @see {@link Layout}\n */\nLayout.TANGENT = new Attribute("tangent", 3, TYPES.FLOAT);\n/**\n * Attribute layout to pack a vertex\'s normal\'s bitangent x, y, & z as floats.\n * <p>\n * This value will be computed on-the-fly based on the texture coordinates.\n * If no texture coordinates are available, the generated value will default to\n * 0, 0, 0.\n * @see {@link Layout}\n */\nLayout.BITANGENT = new Attribute("bitangent", 3, TYPES.FLOAT);\n/**\n * Attribute layout to pack a vertex\'s texture coordinates\' u & v as floats\n *\n * @see {@link Layout}\n */\nLayout.UV = new Attribute("uv", 2, TYPES.FLOAT);\n// Material attributes\n/**\n * Attribute layout to pack an unsigned short to be interpreted as a the index\n * into a {@link Mesh}\'s materials list.\n * <p>\n * The intention of this value is to send all of the {@link Mesh}\'s materials\n * into multiple shader uniforms and then reference the current one by this\n * vertex attribute.\n * <p>\n * example glsl code:\n *\n * <pre><code>\n *  // this is bound using MATERIAL_INDEX\n *  attribute int materialIndex;\n *\n *  struct Material {\n *    vec3 diffuse;\n *    vec3 specular;\n *    vec3 specularExponent;\n *  };\n *\n *  uniform Material materials[MAX_MATERIALS];\n *\n *  // ...\n *\n *  vec3 diffuse = materials[materialIndex];\n *\n * </code></pre>\n * TODO: More description & test to make sure subscripting by attributes even\n * works for webgl\n *\n * @see {@link Layout}\n */\nLayout.MATERIAL_INDEX = new Attribute("materialIndex", 1, TYPES.SHORT);\nLayout.MATERIAL_ENABLED = new Attribute("materialEnabled", 1, TYPES.UNSIGNED_SHORT);\nLayout.AMBIENT = new Attribute("ambient", 3, TYPES.FLOAT);\nLayout.DIFFUSE = new Attribute("diffuse", 3, TYPES.FLOAT);\nLayout.SPECULAR = new Attribute("specular", 3, TYPES.FLOAT);\nLayout.SPECULAR_EXPONENT = new Attribute("specularExponent", 3, TYPES.FLOAT);\nLayout.EMISSIVE = new Attribute("emissive", 3, TYPES.FLOAT);\nLayout.TRANSMISSION_FILTER = new Attribute("transmissionFilter", 3, TYPES.FLOAT);\nLayout.DISSOLVE = new Attribute("dissolve", 1, TYPES.FLOAT);\nLayout.ILLUMINATION = new Attribute("illumination", 1, TYPES.UNSIGNED_SHORT);\nLayout.REFRACTION_INDEX = new Attribute("refractionIndex", 1, TYPES.FLOAT);\nLayout.SHARPNESS = new Attribute("sharpness", 1, TYPES.FLOAT);\nLayout.MAP_DIFFUSE = new Attribute("mapDiffuse", 1, TYPES.SHORT);\nLayout.MAP_AMBIENT = new Attribute("mapAmbient", 1, TYPES.SHORT);\nLayout.MAP_SPECULAR = new Attribute("mapSpecular", 1, TYPES.SHORT);\nLayout.MAP_SPECULAR_EXPONENT = new Attribute("mapSpecularExponent", 1, TYPES.SHORT);\nLayout.MAP_DISSOLVE = new Attribute("mapDissolve", 1, TYPES.SHORT);\nLayout.ANTI_ALIASING = new Attribute("antiAliasing", 1, TYPES.UNSIGNED_SHORT);\nLayout.MAP_BUMP = new Attribute("mapBump", 1, TYPES.SHORT);\nLayout.MAP_DISPLACEMENT = new Attribute("mapDisplacement", 1, TYPES.SHORT);\nLayout.MAP_DECAL = new Attribute("mapDecal", 1, TYPES.SHORT);\nLayout.MAP_EMISSIVE = new Attribute("mapEmissive", 1, TYPES.SHORT);\n\n\n//# sourceURL=webpack:///./src/layout.ts?');
        },
        "./src/material.ts": /*!*************************!*\
  !*** ./src/material.ts ***!
  \*************************/ /*! exports provided: Material, MaterialLibrary */ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return Material; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialLibrary", function() { return MaterialLibrary; });\n/**\n * The Material class.\n */\nclass Material {\n    constructor(name) {\n        this.name = name;\n        /**\n         * Constructor\n         * @param {String} name the unique name of the material\n         */\n        // The values for the following attibutes\n        // are an array of R, G, B normalized values.\n        // Ka - Ambient Reflectivity\n        this.ambient = [0, 0, 0];\n        // Kd - Defuse Reflectivity\n        this.diffuse = [0, 0, 0];\n        // Ks\n        this.specular = [0, 0, 0];\n        // Ke\n        this.emissive = [0, 0, 0];\n        // Tf\n        this.transmissionFilter = [0, 0, 0];\n        // d\n        this.dissolve = 0;\n        // valid range is between 0 and 1000\n        this.specularExponent = 0;\n        // either d or Tr; valid values are normalized\n        this.transparency = 0;\n        // illum - the enum of the illumination model to use\n        this.illumination = 0;\n        // Ni - Set to "normal" (air).\n        this.refractionIndex = 1;\n        // sharpness\n        this.sharpness = 0;\n        // map_Kd\n        this.mapDiffuse = emptyTextureOptions();\n        // map_Ka\n        this.mapAmbient = emptyTextureOptions();\n        // map_Ks\n        this.mapSpecular = emptyTextureOptions();\n        // map_Ns\n        this.mapSpecularExponent = emptyTextureOptions();\n        // map_d\n        this.mapDissolve = emptyTextureOptions();\n        // map_aat\n        this.antiAliasing = false;\n        // map_bump or bump\n        this.mapBump = emptyTextureOptions();\n        // disp\n        this.mapDisplacement = emptyTextureOptions();\n        // decal\n        this.mapDecal = emptyTextureOptions();\n        // map_Ke\n        this.mapEmissive = emptyTextureOptions();\n        // refl - when the reflection type is a cube, there will be multiple refl\n        //        statements for each side of the cube. If it\'s a spherical\n        //        reflection, there should only ever be one.\n        this.mapReflections = [];\n    }\n}\nconst SENTINEL_MATERIAL = new Material("sentinel");\n/**\n * https://en.wikipedia.org/wiki/Wavefront_.obj_file\n * http://paulbourke.net/dataformats/mtl/\n */\nclass MaterialLibrary {\n    constructor(data) {\n        this.data = data;\n        /**\n         * Constructs the Material Parser\n         * @param mtlData the MTL file contents\n         */\n        this.currentMaterial = SENTINEL_MATERIAL;\n        this.materials = {};\n        this.parse();\n    }\n    /* eslint-disable camelcase */\n    /* the function names here disobey camelCase conventions\n     to make parsing/routing easier. see the parse function\n     documentation for more information. */\n    /**\n     * Creates a new Material object and adds to the registry.\n     * @param tokens the tokens associated with the directive\n     */\n    parse_newmtl(tokens) {\n        const name = tokens[0];\n        // console.info(\'Parsing new Material:\', name);\n        this.currentMaterial = new Material(name);\n        this.materials[name] = this.currentMaterial;\n    }\n    /**\n     * See the documenation for parse_Ka below for a better understanding.\n     *\n     * Given a list of possible color tokens, returns an array of R, G, and B\n     * color values.\n     *\n     * @param tokens the tokens associated with the directive\n     * @return {*} a 3 element array containing the R, G, and B values\n     * of the color.\n     */\n    parseColor(tokens) {\n        if (tokens[0] == "spectral") {\n            throw new Error("The MTL parser does not support spectral curve files. You will " +\n                "need to convert the MTL colors to either RGB or CIEXYZ.");\n        }\n        if (tokens[0] == "xyz") {\n            throw new Error("The MTL parser does not currently support XYZ colors. Either convert the " +\n                "XYZ values to RGB or create an issue to add support for XYZ");\n        }\n        // from my understanding of the spec, RGB values at this point\n        // will either be 3 floats or exactly 1 float, so that\'s the check\n        // that i\'m going to perform here\n        if (tokens.length == 3) {\n            const [x, y, z] = tokens;\n            return [parseFloat(x), parseFloat(y), parseFloat(z)];\n        }\n        // Since tokens at this point has a length of 3, we\'re going to assume\n        // it\'s exactly 1, skipping the check for 2.\n        const value = parseFloat(tokens[0]);\n        // in this case, all values are equivalent\n        return [value, value, value];\n    }\n    /**\n     * Parse the ambient reflectivity\n     *\n     * A Ka directive can take one of three forms:\n     *   - Ka r g b\n     *   - Ka spectral file.rfl\n     *   - Ka xyz x y z\n     * These three forms are mutually exclusive in that only one\n     * declaration can exist per material. It is considered a syntax\n     * error otherwise.\n     *\n     * The "Ka" form specifies the ambient reflectivity using RGB values.\n     * The "g" and "b" values are optional. If only the "r" value is\n     * specified, then the "g" and "b" values are assigned the value of\n     * "r". Values are normally in the range 0.0 to 1.0. Values outside\n     * of this range increase or decrease the reflectivity accordingly.\n     *\n     * The "Ka spectral" form specifies the ambient reflectivity using a\n     * spectral curve. "file.rfl" is the name of the ".rfl" file containing\n     * the curve data. "factor" is an optional argument which is a multiplier\n     * for the values in the .rfl file and defaults to 1.0 if not specified.\n     *\n     * The "Ka xyz" form specifies the ambient reflectivity using CIEXYZ values.\n     * "x y z" are the values of the CIEXYZ color space. The "y" and "z" arguments\n     * are optional and take on the value of the "x" component if only "x" is\n     * specified. The "x y z" values are normally in the range of 0.0 to 1.0 and\n     * increase or decrease ambient reflectivity accordingly outside of that\n     * range.\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ka(tokens) {\n        this.currentMaterial.ambient = this.parseColor(tokens);\n    }\n    /**\n     * Diffuse Reflectivity\n     *\n     * Similar to the Ka directive. Simply replace "Ka" with "Kd" and the rules\n     * are the same\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Kd(tokens) {\n        this.currentMaterial.diffuse = this.parseColor(tokens);\n    }\n    /**\n     * Spectral Reflectivity\n     *\n     * Similar to the Ka directive. Simply replace "Ks" with "Kd" and the rules\n     * are the same\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ks(tokens) {\n        this.currentMaterial.specular = this.parseColor(tokens);\n    }\n    /**\n     * Emissive\n     *\n     * The amount and color of light emitted by the object.\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ke(tokens) {\n        this.currentMaterial.emissive = this.parseColor(tokens);\n    }\n    /**\n     * Transmission Filter\n     *\n     * Any light passing through the object is filtered by the transmission\n     * filter, which only allows specific colors to pass through. For example, Tf\n     * 0 1 0 allows all of the green to pass through and filters out all of the\n     * red and blue.\n     *\n     * Similar to the Ka directive. Simply replace "Ks" with "Tf" and the rules\n     * are the same\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Tf(tokens) {\n        this.currentMaterial.transmissionFilter = this.parseColor(tokens);\n    }\n    /**\n     * Specifies the dissolve for the current material.\n     *\n     * Statement: d [-halo] `factor`\n     *\n     * Example: "d 0.5"\n     *\n     * The factor is the amount this material dissolves into the background. A\n     * factor of 1.0 is fully opaque. This is the default when a new material is\n     * created. A factor of 0.0 is fully dissolved (completely transparent).\n     *\n     * Unlike a real transparent material, the dissolve does not depend upon\n     * material thickness nor does it have any spectral character. Dissolve works\n     * on all illumination models.\n     *\n     * The dissolve statement allows for an optional "-halo" flag which indicates\n     * that a dissolve is dependent on the surface orientation relative to the\n     * viewer. For example, a sphere with the following dissolve, "d -halo 0.0",\n     * will be fully dissolved at its center and will appear gradually more opaque\n     * toward its edge.\n     *\n     * "factor" is the minimum amount of dissolve applied to the material. The\n     * amount of dissolve will vary between 1.0 (fully opaque) and the specified\n     * "factor". The formula is:\n     *\n     *    dissolve = 1.0 - (N*v)(1.0-factor)\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_d(tokens) {\n        // this ignores the -halo option as I can\'t find any documentation on what\n        // it\'s supposed to be.\n        this.currentMaterial.dissolve = parseFloat(tokens.pop() || "0");\n    }\n    /**\n     * The "illum" statement specifies the illumination model to use in the\n     * material. Illumination models are mathematical equations that represent\n     * various material lighting and shading effects.\n     *\n     * The illumination number can be a number from 0 to 10. The following are\n     * the list of illumination enumerations and their summaries:\n     * 0. Color on and Ambient off\n     * 1. Color on and Ambient on\n     * 2. Highlight on\n     * 3. Reflection on and Ray trace on\n     * 4. Transparency: Glass on, Reflection: Ray trace on\n     * 5. Reflection: Fresnel on and Ray trace on\n     * 6. Transparency: Refraction on, Reflection: Fresnel off and Ray trace on\n     * 7. Transparency: Refraction on, Reflection: Fresnel on and Ray trace on\n     * 8. Reflection on and Ray trace off\n     * 9. Transparency: Glass on, Reflection: Ray trace off\n     * 10. Casts shadows onto invisible surfaces\n     *\n     * Example: "illum 2" to specify the "Highlight on" model\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_illum(tokens) {\n        this.currentMaterial.illumination = parseInt(tokens[0]);\n    }\n    /**\n     * Optical Density (AKA Index of Refraction)\n     *\n     * Statement: Ni `index`\n     *\n     * Example: Ni 1.0\n     *\n     * Specifies the optical density for the surface. `index` is the value\n     * for the optical density. The values can range from 0.001 to 10.  A value of\n     * 1.0 means that light does not bend as it passes through an object.\n     * Increasing the optical_density increases the amount of bending. Glass has\n     * an index of refraction of about 1.5. Values of less than 1.0 produce\n     * bizarre results and are not recommended\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ni(tokens) {\n        this.currentMaterial.refractionIndex = parseFloat(tokens[0]);\n    }\n    /**\n     * Specifies the specular exponent for the current material. This defines the\n     * focus of the specular highlight.\n     *\n     * Statement: Ns `exponent`\n     *\n     * Example: "Ns 250"\n     *\n     * `exponent` is the value for the specular exponent. A high exponent results\n     * in a tight, concentrated highlight. Ns Values normally range from 0 to\n     * 1000.\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ns(tokens) {\n        this.currentMaterial.specularExponent = parseInt(tokens[0]);\n    }\n    /**\n     * Specifies the sharpness of the reflections from the local reflection map.\n     *\n     * Statement: sharpness `value`\n     *\n     * Example: "sharpness 100"\n     *\n     * If a material does not have a local reflection map defined in its material\n     * defintions, sharpness will apply to the global reflection map defined in\n     * PreView.\n     *\n     * `value` can be a number from 0 to 1000. The default is 60. A high value\n     * results in a clear reflection of objects in the reflection map.\n     *\n     * Tip: sharpness values greater than 100 introduce aliasing effects in\n     * flat surfaces that are viewed at a sharp angle.\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_sharpness(tokens) {\n        this.currentMaterial.sharpness = parseInt(tokens[0]);\n    }\n    /**\n     * Parses the -cc flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -cc flag\n     * @param options the Object of all image options\n     */\n    parse_cc(values, options) {\n        options.colorCorrection = values[0] == "on";\n    }\n    /**\n     * Parses the -blendu flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -blendu flag\n     * @param options the Object of all image options\n     */\n    parse_blendu(values, options) {\n        options.horizontalBlending = values[0] == "on";\n    }\n    /**\n     * Parses the -blendv flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -blendv flag\n     * @param options the Object of all image options\n     */\n    parse_blendv(values, options) {\n        options.verticalBlending = values[0] == "on";\n    }\n    /**\n     * Parses the -boost flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -boost flag\n     * @param options the Object of all image options\n     */\n    parse_boost(values, options) {\n        options.boostMipMapSharpness = parseFloat(values[0]);\n    }\n    /**\n     * Parses the -mm flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -mm flag\n     * @param options the Object of all image options\n     */\n    parse_mm(values, options) {\n        options.modifyTextureMap.brightness = parseFloat(values[0]);\n        options.modifyTextureMap.contrast = parseFloat(values[1]);\n    }\n    /**\n     * Parses and sets the -o, -s, and -t  u, v, and w values\n     *\n     * @param values the values passed to the -o, -s, -t flag\n     * @param {Object} option the Object of either the -o, -s, -t option\n     * @param {Integer} defaultValue the Object of all image options\n     */\n    parse_ost(values, option, defaultValue) {\n        while (values.length < 3) {\n            values.push(defaultValue.toString());\n        }\n        option.u = parseFloat(values[0]);\n        option.v = parseFloat(values[1]);\n        option.w = parseFloat(values[2]);\n    }\n    /**\n     * Parses the -o flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -o flag\n     * @param options the Object of all image options\n     */\n    parse_o(values, options) {\n        this.parse_ost(values, options.offset, 0);\n    }\n    /**\n     * Parses the -s flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -s flag\n     * @param options the Object of all image options\n     */\n    parse_s(values, options) {\n        this.parse_ost(values, options.scale, 1);\n    }\n    /**\n     * Parses the -t flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -t flag\n     * @param options the Object of all image options\n     */\n    parse_t(values, options) {\n        this.parse_ost(values, options.turbulence, 0);\n    }\n    /**\n     * Parses the -texres flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -texres flag\n     * @param options the Object of all image options\n     */\n    parse_texres(values, options) {\n        options.textureResolution = parseFloat(values[0]);\n    }\n    /**\n     * Parses the -clamp flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -clamp flag\n     * @param options the Object of all image options\n     */\n    parse_clamp(values, options) {\n        options.clamp = values[0] == "on";\n    }\n    /**\n     * Parses the -bm flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -bm flag\n     * @param options the Object of all image options\n     */\n    parse_bm(values, options) {\n        options.bumpMultiplier = parseFloat(values[0]);\n    }\n    /**\n     * Parses the -imfchan flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -imfchan flag\n     * @param options the Object of all image options\n     */\n    parse_imfchan(values, options) {\n        options.imfChan = values[0];\n    }\n    /**\n     * This only exists for relection maps and denotes the type of reflection.\n     *\n     * @param values the values passed to the -type flag\n     * @param options the Object of all image options\n     */\n    parse_type(values, options) {\n        options.reflectionType = values[0];\n    }\n    /**\n     * Parses the texture\'s options and returns an options object with the info\n     *\n     * @param tokens all of the option tokens to pass to the texture\n     * @return {Object} a complete object of objects to apply to the texture\n     */\n    parseOptions(tokens) {\n        const options = emptyTextureOptions();\n        let option;\n        let values;\n        const optionsToValues = {};\n        tokens.reverse();\n        while (tokens.length) {\n            // token is guaranteed to exists here, hence the explicit "as"\n            const token = tokens.pop();\n            if (token.startsWith("-")) {\n                option = token.substr(1);\n                optionsToValues[option] = [];\n            }\n            else if (option) {\n                optionsToValues[option].push(token);\n            }\n        }\n        for (option in optionsToValues) {\n            if (!optionsToValues.hasOwnProperty(option)) {\n                continue;\n            }\n            values = optionsToValues[option];\n            const optionMethod = this[`parse_${option}`];\n            if (optionMethod) {\n                optionMethod.bind(this)(values, options);\n            }\n        }\n        return options;\n    }\n    /**\n     * Parses the given texture map line.\n     *\n     * @param tokens all of the tokens representing the texture\n     * @return a complete object of objects to apply to the texture\n     */\n    parseMap(tokens) {\n        // according to wikipedia:\n        // (https://en.wikipedia.org/wiki/Wavefront_.obj_file#Vendor_specific_alterations)\n        // there is at least one vendor that places the filename before the options\n        // rather than after (which is to spec). All options start with a \'-\'\n        // so if the first token doesn\'t start with a \'-\', we\'re going to assume\n        // it\'s the name of the map file.\n        let optionsString;\n        let filename = "";\n        if (!tokens[0].startsWith("-")) {\n            [filename, ...optionsString] = tokens;\n        }\n        else {\n            filename = tokens.pop();\n            optionsString = tokens;\n        }\n        const options = this.parseOptions(optionsString);\n        options.filename = filename.replace(/\\\\/g, "/");\n        return options;\n    }\n    /**\n     * Parses the ambient map.\n     *\n     * @param tokens list of tokens for the map_Ka direcive\n     */\n    parse_map_Ka(tokens) {\n        this.currentMaterial.mapAmbient = this.parseMap(tokens);\n    }\n    /**\n     * Parses the diffuse map.\n     *\n     * @param tokens list of tokens for the map_Kd direcive\n     */\n    parse_map_Kd(tokens) {\n        this.currentMaterial.mapDiffuse = this.parseMap(tokens);\n    }\n    /**\n     * Parses the specular map.\n     *\n     * @param tokens list of tokens for the map_Ks direcive\n     */\n    parse_map_Ks(tokens) {\n        this.currentMaterial.mapSpecular = this.parseMap(tokens);\n    }\n    /**\n     * Parses the emissive map.\n     *\n     * @param tokens list of tokens for the map_Ke direcive\n     */\n    parse_map_Ke(tokens) {\n        this.currentMaterial.mapEmissive = this.parseMap(tokens);\n    }\n    /**\n     * Parses the specular exponent map.\n     *\n     * @param tokens list of tokens for the map_Ns direcive\n     */\n    parse_map_Ns(tokens) {\n        this.currentMaterial.mapSpecularExponent = this.parseMap(tokens);\n    }\n    /**\n     * Parses the dissolve map.\n     *\n     * @param tokens list of tokens for the map_d direcive\n     */\n    parse_map_d(tokens) {\n        this.currentMaterial.mapDissolve = this.parseMap(tokens);\n    }\n    /**\n     * Parses the anti-aliasing option.\n     *\n     * @param tokens list of tokens for the map_aat direcive\n     */\n    parse_map_aat(tokens) {\n        this.currentMaterial.antiAliasing = tokens[0] == "on";\n    }\n    /**\n     * Parses the bump map.\n     *\n     * @param tokens list of tokens for the map_bump direcive\n     */\n    parse_map_bump(tokens) {\n        this.currentMaterial.mapBump = this.parseMap(tokens);\n    }\n    /**\n     * Parses the bump map.\n     *\n     * @param tokens list of tokens for the bump direcive\n     */\n    parse_bump(tokens) {\n        this.parse_map_bump(tokens);\n    }\n    /**\n     * Parses the disp map.\n     *\n     * @param tokens list of tokens for the disp direcive\n     */\n    parse_disp(tokens) {\n        this.currentMaterial.mapDisplacement = this.parseMap(tokens);\n    }\n    /**\n     * Parses the decal map.\n     *\n     * @param tokens list of tokens for the map_decal direcive\n     */\n    parse_decal(tokens) {\n        this.currentMaterial.mapDecal = this.parseMap(tokens);\n    }\n    /**\n     * Parses the refl map.\n     *\n     * @param tokens list of tokens for the refl direcive\n     */\n    parse_refl(tokens) {\n        this.currentMaterial.mapReflections.push(this.parseMap(tokens));\n    }\n    /**\n     * Parses the MTL file.\n     *\n     * Iterates line by line parsing each MTL directive.\n     *\n     * This function expects the first token in the line\n     * to be a valid MTL directive. That token is then used\n     * to try and run a method on this class. parse_[directive]\n     * E.g., the `newmtl` directive would try to call the method\n     * parse_newmtl. Each parsing function takes in the remaining\n     * list of tokens and updates the currentMaterial class with\n     * the attributes provided.\n     */\n    parse() {\n        const lines = this.data.split(/\\r?\\n/);\n        for (let line of lines) {\n            line = line.trim();\n            if (!line || line.startsWith("#")) {\n                continue;\n            }\n            const [directive, ...tokens] = line.split(/\\s/);\n            const parseMethod = this[`parse_${directive}`];\n            if (!parseMethod) {\n                console.warn(`Don\'t know how to parse the directive: "${directive}"`);\n                continue;\n            }\n            // console.log(`Parsing "${directive}" with tokens: ${tokens}`);\n            parseMethod.bind(this)(tokens);\n        }\n        // some cleanup. These don\'t need to be exposed as public data.\n        delete this.data;\n        this.currentMaterial = SENTINEL_MATERIAL;\n    }\n}\nfunction emptyTextureOptions() {\n    return {\n        colorCorrection: false,\n        horizontalBlending: true,\n        verticalBlending: true,\n        boostMipMapSharpness: 0,\n        modifyTextureMap: {\n            brightness: 0,\n            contrast: 1,\n        },\n        offset: { u: 0, v: 0, w: 0 },\n        scale: { u: 1, v: 1, w: 1 },\n        turbulence: { u: 0, v: 0, w: 0 },\n        clamp: false,\n        textureResolution: null,\n        bumpMultiplier: 1,\n        imfChan: null,\n        filename: "",\n    };\n}\n\n\n//# sourceURL=webpack:///./src/material.ts?');
        },
        "./src/mesh.ts": /*!*********************!*\
  !*** ./src/mesh.ts ***!
  \*********************/ /*! exports provided: default */ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mesh; });\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");\n\n/**\n * The main Mesh class. The constructor will parse through the OBJ file data\n * and collect the vertex, vertex normal, texture, and face information. This\n * information can then be used later on when creating your VBOs. See\n * OBJ.initMeshBuffers for an example of how to use the newly created Mesh\n */\nclass Mesh {\n    /**\n     * Create a Mesh\n     * @param {String} objectData - a string representation of an OBJ file with\n     *     newlines preserved.\n     * @param {Object} options - a JS object containing valid options. See class\n     *     documentation for options.\n     * @param {bool} options.enableWTextureCoord - Texture coordinates can have\n     *     an optional "w" coordinate after the u and v coordinates. This extra\n     *     value can be used in order to perform fancy transformations on the\n     *     textures themselves. Default is to truncate to only the u an v\n     *     coordinates. Passing true will provide a default value of 0 in the\n     *     event that any or all texture coordinates don\'t provide a w value.\n     *     Always use the textureStride attribute in order to determine the\n     *     stride length of the texture coordinates when rendering the element\n     *     array.\n     * @param {bool} options.calcTangentsAndBitangents - Calculate the tangents\n     *     and bitangents when loading of the OBJ is completed. This adds two new\n     *     attributes to the Mesh instance: `tangents` and `bitangents`.\n     */\n    constructor(objectData, options) {\n        this.name = "";\n        this.indicesPerMaterial = [];\n        this.materialsByIndex = {};\n        this.tangents = [];\n        this.bitangents = [];\n        options = options || {};\n        options.materials = options.materials || {};\n        options.enableWTextureCoord = !!options.enableWTextureCoord;\n        // the list of unique vertex, normal, texture, attributes\n        this.vertexNormals = [];\n        this.textures = [];\n        // the indicies to draw the faces\n        this.indices = [];\n        this.textureStride = options.enableWTextureCoord ? 3 : 2;\n        /*\n        The OBJ file format does a sort of compression when saving a model in a\n        program like Blender. There are at least 3 sections (4 including textures)\n        within the file. Each line in a section begins with the same string:\n          * \'v\': indicates vertex section\n          * \'vn\': indicates vertex normal section\n          * \'f\': indicates the faces section\n          * \'vt\': indicates vertex texture section (if textures were used on the model)\n        Each of the above sections (except for the faces section) is a list/set of\n        unique vertices.\n\n        Each line of the faces section contains a list of\n        (vertex, [texture], normal) groups.\n\n        **Note:** The following documentation will use a capital "V" Vertex to\n        denote the above (vertex, [texture], normal) groups whereas a lowercase\n        "v" vertex is used to denote an X, Y, Z coordinate.\n\n        Some examples:\n            // the texture index is optional, both formats are possible for models\n            // without a texture applied\n            f 1/25 18/46 12/31\n            f 1//25 18//46 12//31\n\n            // A 3 vertex face with texture indices\n            f 16/92/11 14/101/22 1/69/1\n\n            // A 4 vertex face\n            f 16/92/11 40/109/40 38/114/38 14/101/22\n\n        The first two lines are examples of a 3 vertex face without a texture applied.\n        The second is an example of a 3 vertex face with a texture applied.\n        The third is an example of a 4 vertex face. Note: a face can contain N\n        number of vertices.\n\n        Each number that appears in one of the groups is a 1-based index\n        corresponding to an item from the other sections (meaning that indexing\n        starts at one and *not* zero).\n\n        For example:\n            `f 16/92/11` is saying to\n              - take the 16th element from the [v] vertex array\n              - take the 92nd element from the [vt] texture array\n              - take the 11th element from the [vn] normal array\n            and together they make a unique vertex.\n        Using all 3+ unique Vertices from the face line will produce a polygon.\n\n        Now, you could just go through the OBJ file and create a new vertex for\n        each face line and WebGL will draw what appears to be the same model.\n        However, vertices will be overlapped and duplicated all over the place.\n\n        Consider a cube in 3D space centered about the origin and each side is\n        2 units long. The front face (with the positive Z-axis pointing towards\n        you) would have a Top Right vertex (looking orthogonal to its normal)\n        mapped at (1,1,1) The right face would have a Top Left vertex (looking\n        orthogonal to its normal) at (1,1,1) and the top face would have a Bottom\n        Right vertex (looking orthogonal to its normal) at (1,1,1). Each face\n        has a vertex at the same coordinates, however, three distinct vertices\n        will be drawn at the same spot.\n\n        To solve the issue of duplicate Vertices (the `(vertex, [texture], normal)`\n        groups), while iterating through the face lines, when a group is encountered\n        the whole group string (\'16/92/11\') is checked to see if it exists in the\n        packed.hashindices object, and if it doesn\'t, the indices it specifies\n        are used to look up each attribute in the corresponding attribute arrays\n        already created. The values are then copied to the corresponding unpacked\n        array (flattened to play nice with WebGL\'s ELEMENT_ARRAY_BUFFER indexing),\n        the group string is added to the hashindices set and the current unpacked\n        index is used as this hashindices value so that the group of elements can\n        be reused. The unpacked index is incremented. If the group string already\n        exists in the hashindices object, its corresponding value is the index of\n        that group and is appended to the unpacked indices array.\n       */\n        const verts = [];\n        const vertNormals = [];\n        const textures = [];\n        const materialNamesByIndex = [];\n        const materialIndicesByName = {};\n        // keep track of what material we\'ve seen last\n        let currentMaterialIndex = -1;\n        let currentObjectByMaterialIndex = 0;\n        // unpacking stuff\n        const unpacked = {\n            verts: [],\n            norms: [],\n            textures: [],\n            hashindices: {},\n            indices: [[]],\n            materialIndices: [],\n            index: 0,\n        };\n        const VERTEX_RE = /^v\\s/;\n        const NORMAL_RE = /^vn\\s/;\n        const TEXTURE_RE = /^vt\\s/;\n        const FACE_RE = /^f\\s/;\n        const WHITESPACE_RE = /\\s+/;\n        const USE_MATERIAL_RE = /^usemtl/;\n        // array of lines separated by the newline\n        const lines = objectData.split("\\n");\n        for (let line of lines) {\n            line = line.trim();\n            if (!line || line.startsWith("#")) {\n                continue;\n            }\n            const elements = line.split(WHITESPACE_RE);\n            elements.shift();\n            if (VERTEX_RE.test(line)) {\n                // if this is a vertex\n                verts.push(...elements);\n            }\n            else if (NORMAL_RE.test(line)) {\n                // if this is a vertex normal\n                vertNormals.push(...elements);\n            }\n            else if (TEXTURE_RE.test(line)) {\n                let coords = elements;\n                // by default, the loader will only look at the U and V\n                // coordinates of the vt declaration. So, this truncates the\n                // elements to only those 2 values. If W texture coordinate\n                // support is enabled, then the texture coordinate is\n                // expected to have three values in it.\n                if (elements.length > 2 && !options.enableWTextureCoord) {\n                    coords = elements.slice(0, 2);\n                }\n                else if (elements.length === 2 && options.enableWTextureCoord) {\n                    // If for some reason W texture coordinate support is enabled\n                    // and only the U and V coordinates are given, then we supply\n                    // the default value of 0 so that the stride length is correct\n                    // when the textures are unpacked below.\n                    coords.push("0");\n                }\n                textures.push(...coords);\n            }\n            else if (USE_MATERIAL_RE.test(line)) {\n                const materialName = elements[0];\n                // check to see if we\'ve ever seen it before\n                if (!(materialName in materialIndicesByName)) {\n                    // new material we\'ve never seen\n                    materialNamesByIndex.push(materialName);\n                    materialIndicesByName[materialName] = materialNamesByIndex.length - 1;\n                    // push new array into indices\n                    // already contains an array at index zero, don\'t add\n                    if (materialIndicesByName[materialName] > 0) {\n                        unpacked.indices.push([]);\n                    }\n                }\n                // keep track of the current material index\n                currentMaterialIndex = materialIndicesByName[materialName];\n                // update current index array\n                currentObjectByMaterialIndex = currentMaterialIndex;\n            }\n            else if (FACE_RE.test(line)) {\n                // if this is a face\n                /*\n                split this face into an array of Vertex groups\n                for example:\n                   f 16/92/11 14/101/22 1/69/1\n                becomes:\n                  [\'16/92/11\', \'14/101/22\', \'1/69/1\'];\n                */\n                const triangles = triangulate(elements);\n                for (const triangle of triangles) {\n                    for (let j = 0, eleLen = triangle.length; j < eleLen; j++) {\n                        const hash = triangle[j] + "," + currentMaterialIndex;\n                        if (hash in unpacked.hashindices) {\n                            unpacked.indices[currentObjectByMaterialIndex].push(unpacked.hashindices[hash]);\n                        }\n                        else {\n                            /*\n                        Each element of the face line array is a Vertex which has its\n                        attributes delimited by a forward slash. This will separate\n                        each attribute into another array:\n                            \'19/92/11\'\n                        becomes:\n                            Vertex = [\'19\', \'92\', \'11\'];\n                        where\n                            Vertex[0] is the vertex index\n                            Vertex[1] is the texture index\n                            Vertex[2] is the normal index\n                         Think of faces having Vertices which are comprised of the\n                         attributes location (v), texture (vt), and normal (vn).\n                         */\n                            const vertex = triangle[j].split("/");\n                            // it\'s possible for faces to only specify the vertex\n                            // and the normal. In this case, vertex will only have\n                            // a length of 2 and not 3 and the normal will be the\n                            // second item in the list with an index of 1.\n                            const normalIndex = vertex.length - 1;\n                            /*\n                         The verts, textures, and vertNormals arrays each contain a\n                         flattend array of coordinates.\n\n                         Because it gets confusing by referring to Vertex and then\n                         vertex (both are different in my descriptions) I will explain\n                         what\'s going on using the vertexNormals array:\n\n                         vertex[2] will contain the one-based index of the vertexNormals\n                         section (vn). One is subtracted from this index number to play\n                         nice with javascript\'s zero-based array indexing.\n\n                         Because vertexNormal is a flattened array of x, y, z values,\n                         simple pointer arithmetic is used to skip to the start of the\n                         vertexNormal, then the offset is added to get the correct\n                         component: +0 is x, +1 is y, +2 is z.\n\n                         This same process is repeated for verts and textures.\n                         */\n                            // Vertex position\n                            unpacked.verts.push(+verts[(+vertex[0] - 1) * 3 + 0]);\n                            unpacked.verts.push(+verts[(+vertex[0] - 1) * 3 + 1]);\n                            unpacked.verts.push(+verts[(+vertex[0] - 1) * 3 + 2]);\n                            // Vertex textures\n                            if (textures.length) {\n                                const stride = options.enableWTextureCoord ? 3 : 2;\n                                unpacked.textures.push(+textures[(+vertex[1] - 1) * stride + 0]);\n                                unpacked.textures.push(+textures[(+vertex[1] - 1) * stride + 1]);\n                                if (options.enableWTextureCoord) {\n                                    unpacked.textures.push(+textures[(+vertex[1] - 1) * stride + 2]);\n                                }\n                            }\n                            // Vertex normals\n                            unpacked.norms.push(+vertNormals[(+vertex[normalIndex] - 1) * 3 + 0]);\n                            unpacked.norms.push(+vertNormals[(+vertex[normalIndex] - 1) * 3 + 1]);\n                            unpacked.norms.push(+vertNormals[(+vertex[normalIndex] - 1) * 3 + 2]);\n                            // Vertex material indices\n                            unpacked.materialIndices.push(currentMaterialIndex);\n                            // add the newly created Vertex to the list of indices\n                            unpacked.hashindices[hash] = unpacked.index;\n                            unpacked.indices[currentObjectByMaterialIndex].push(unpacked.hashindices[hash]);\n                            // increment the counter\n                            unpacked.index += 1;\n                        }\n                    }\n                }\n            }\n        }\n        this.vertices = unpacked.verts;\n        this.vertexNormals = unpacked.norms;\n        this.textures = unpacked.textures;\n        this.vertexMaterialIndices = unpacked.materialIndices;\n        this.indices = unpacked.indices[currentObjectByMaterialIndex];\n        this.indicesPerMaterial = unpacked.indices;\n        this.materialNames = materialNamesByIndex;\n        this.materialIndices = materialIndicesByName;\n        this.materialsByIndex = {};\n        if (options.calcTangentsAndBitangents) {\n            this.calculateTangentsAndBitangents();\n        }\n    }\n    /**\n     * Calculates the tangents and bitangents of the mesh that forms an orthogonal basis together with the\n     * normal in the direction of the texture coordinates. These are useful for setting up the TBN matrix\n     * when distorting the normals through normal maps.\n     * Method derived from: http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-13-normal-mapping/\n     *\n     * This method requires the normals and texture coordinates to be parsed and set up correctly.\n     * Adds the tangents and bitangents as members of the class instance.\n     */\n    calculateTangentsAndBitangents() {\n        console.assert(!!(this.vertices &&\n            this.vertices.length &&\n            this.vertexNormals &&\n            this.vertexNormals.length &&\n            this.textures &&\n            this.textures.length), "Missing attributes for calculating tangents and bitangents");\n        const unpacked = {\n            tangents: [...new Array(this.vertices.length)].map(_ => 0),\n            bitangents: [...new Array(this.vertices.length)].map(_ => 0),\n        };\n        // Loop through all faces in the whole mesh\n        const indices = this.indices;\n        const vertices = this.vertices;\n        const normals = this.vertexNormals;\n        const uvs = this.textures;\n        for (let i = 0; i < indices.length; i += 3) {\n            const i0 = indices[i + 0];\n            const i1 = indices[i + 1];\n            const i2 = indices[i + 2];\n            const x_v0 = vertices[i0 * 3 + 0];\n            const y_v0 = vertices[i0 * 3 + 1];\n            const z_v0 = vertices[i0 * 3 + 2];\n            const x_uv0 = uvs[i0 * 2 + 0];\n            const y_uv0 = uvs[i0 * 2 + 1];\n            const x_v1 = vertices[i1 * 3 + 0];\n            const y_v1 = vertices[i1 * 3 + 1];\n            const z_v1 = vertices[i1 * 3 + 2];\n            const x_uv1 = uvs[i1 * 2 + 0];\n            const y_uv1 = uvs[i1 * 2 + 1];\n            const x_v2 = vertices[i2 * 3 + 0];\n            const y_v2 = vertices[i2 * 3 + 1];\n            const z_v2 = vertices[i2 * 3 + 2];\n            const x_uv2 = uvs[i2 * 2 + 0];\n            const y_uv2 = uvs[i2 * 2 + 1];\n            const x_deltaPos1 = x_v1 - x_v0;\n            const y_deltaPos1 = y_v1 - y_v0;\n            const z_deltaPos1 = z_v1 - z_v0;\n            const x_deltaPos2 = x_v2 - x_v0;\n            const y_deltaPos2 = y_v2 - y_v0;\n            const z_deltaPos2 = z_v2 - z_v0;\n            const x_uvDeltaPos1 = x_uv1 - x_uv0;\n            const y_uvDeltaPos1 = y_uv1 - y_uv0;\n            const x_uvDeltaPos2 = x_uv2 - x_uv0;\n            const y_uvDeltaPos2 = y_uv2 - y_uv0;\n            const rInv = x_uvDeltaPos1 * y_uvDeltaPos2 - y_uvDeltaPos1 * x_uvDeltaPos2;\n            const r = 1.0 / Math.abs(rInv < 0.0001 ? 1.0 : rInv);\n            // Tangent\n            const x_tangent = (x_deltaPos1 * y_uvDeltaPos2 - x_deltaPos2 * y_uvDeltaPos1) * r;\n            const y_tangent = (y_deltaPos1 * y_uvDeltaPos2 - y_deltaPos2 * y_uvDeltaPos1) * r;\n            const z_tangent = (z_deltaPos1 * y_uvDeltaPos2 - z_deltaPos2 * y_uvDeltaPos1) * r;\n            // Bitangent\n            const x_bitangent = (x_deltaPos2 * x_uvDeltaPos1 - x_deltaPos1 * x_uvDeltaPos2) * r;\n            const y_bitangent = (y_deltaPos2 * x_uvDeltaPos1 - y_deltaPos1 * x_uvDeltaPos2) * r;\n            const z_bitangent = (z_deltaPos2 * x_uvDeltaPos1 - z_deltaPos1 * x_uvDeltaPos2) * r;\n            // Gram-Schmidt orthogonalize\n            //t = glm::normalize(t - n * glm:: dot(n, t));\n            const x_n0 = normals[i0 * 3 + 0];\n            const y_n0 = normals[i0 * 3 + 1];\n            const z_n0 = normals[i0 * 3 + 2];\n            const x_n1 = normals[i1 * 3 + 0];\n            const y_n1 = normals[i1 * 3 + 1];\n            const z_n1 = normals[i1 * 3 + 2];\n            const x_n2 = normals[i2 * 3 + 0];\n            const y_n2 = normals[i2 * 3 + 1];\n            const z_n2 = normals[i2 * 3 + 2];\n            // Tangent\n            const n0_dot_t = x_tangent * x_n0 + y_tangent * y_n0 + z_tangent * z_n0;\n            const n1_dot_t = x_tangent * x_n1 + y_tangent * y_n1 + z_tangent * z_n1;\n            const n2_dot_t = x_tangent * x_n2 + y_tangent * y_n2 + z_tangent * z_n2;\n            const x_resTangent0 = x_tangent - x_n0 * n0_dot_t;\n            const y_resTangent0 = y_tangent - y_n0 * n0_dot_t;\n            const z_resTangent0 = z_tangent - z_n0 * n0_dot_t;\n            const x_resTangent1 = x_tangent - x_n1 * n1_dot_t;\n            const y_resTangent1 = y_tangent - y_n1 * n1_dot_t;\n            const z_resTangent1 = z_tangent - z_n1 * n1_dot_t;\n            const x_resTangent2 = x_tangent - x_n2 * n2_dot_t;\n            const y_resTangent2 = y_tangent - y_n2 * n2_dot_t;\n            const z_resTangent2 = z_tangent - z_n2 * n2_dot_t;\n            const magTangent0 = Math.sqrt(x_resTangent0 * x_resTangent0 + y_resTangent0 * y_resTangent0 + z_resTangent0 * z_resTangent0);\n            const magTangent1 = Math.sqrt(x_resTangent1 * x_resTangent1 + y_resTangent1 * y_resTangent1 + z_resTangent1 * z_resTangent1);\n            const magTangent2 = Math.sqrt(x_resTangent2 * x_resTangent2 + y_resTangent2 * y_resTangent2 + z_resTangent2 * z_resTangent2);\n            // Bitangent\n            const n0_dot_bt = x_bitangent * x_n0 + y_bitangent * y_n0 + z_bitangent * z_n0;\n            const n1_dot_bt = x_bitangent * x_n1 + y_bitangent * y_n1 + z_bitangent * z_n1;\n            const n2_dot_bt = x_bitangent * x_n2 + y_bitangent * y_n2 + z_bitangent * z_n2;\n            const x_resBitangent0 = x_bitangent - x_n0 * n0_dot_bt;\n            const y_resBitangent0 = y_bitangent - y_n0 * n0_dot_bt;\n            const z_resBitangent0 = z_bitangent - z_n0 * n0_dot_bt;\n            const x_resBitangent1 = x_bitangent - x_n1 * n1_dot_bt;\n            const y_resBitangent1 = y_bitangent - y_n1 * n1_dot_bt;\n            const z_resBitangent1 = z_bitangent - z_n1 * n1_dot_bt;\n            const x_resBitangent2 = x_bitangent - x_n2 * n2_dot_bt;\n            const y_resBitangent2 = y_bitangent - y_n2 * n2_dot_bt;\n            const z_resBitangent2 = z_bitangent - z_n2 * n2_dot_bt;\n            const magBitangent0 = Math.sqrt(x_resBitangent0 * x_resBitangent0 +\n                y_resBitangent0 * y_resBitangent0 +\n                z_resBitangent0 * z_resBitangent0);\n            const magBitangent1 = Math.sqrt(x_resBitangent1 * x_resBitangent1 +\n                y_resBitangent1 * y_resBitangent1 +\n                z_resBitangent1 * z_resBitangent1);\n            const magBitangent2 = Math.sqrt(x_resBitangent2 * x_resBitangent2 +\n                y_resBitangent2 * y_resBitangent2 +\n                z_resBitangent2 * z_resBitangent2);\n            unpacked.tangents[i0 * 3 + 0] += x_resTangent0 / magTangent0;\n            unpacked.tangents[i0 * 3 + 1] += y_resTangent0 / magTangent0;\n            unpacked.tangents[i0 * 3 + 2] += z_resTangent0 / magTangent0;\n            unpacked.tangents[i1 * 3 + 0] += x_resTangent1 / magTangent1;\n            unpacked.tangents[i1 * 3 + 1] += y_resTangent1 / magTangent1;\n            unpacked.tangents[i1 * 3 + 2] += z_resTangent1 / magTangent1;\n            unpacked.tangents[i2 * 3 + 0] += x_resTangent2 / magTangent2;\n            unpacked.tangents[i2 * 3 + 1] += y_resTangent2 / magTangent2;\n            unpacked.tangents[i2 * 3 + 2] += z_resTangent2 / magTangent2;\n            unpacked.bitangents[i0 * 3 + 0] += x_resBitangent0 / magBitangent0;\n            unpacked.bitangents[i0 * 3 + 1] += y_resBitangent0 / magBitangent0;\n            unpacked.bitangents[i0 * 3 + 2] += z_resBitangent0 / magBitangent0;\n            unpacked.bitangents[i1 * 3 + 0] += x_resBitangent1 / magBitangent1;\n            unpacked.bitangents[i1 * 3 + 1] += y_resBitangent1 / magBitangent1;\n            unpacked.bitangents[i1 * 3 + 2] += z_resBitangent1 / magBitangent1;\n            unpacked.bitangents[i2 * 3 + 0] += x_resBitangent2 / magBitangent2;\n            unpacked.bitangents[i2 * 3 + 1] += y_resBitangent2 / magBitangent2;\n            unpacked.bitangents[i2 * 3 + 2] += z_resBitangent2 / magBitangent2;\n            // TODO: check handedness\n        }\n        this.tangents = unpacked.tangents;\n        this.bitangents = unpacked.bitangents;\n    }\n    /**\n     * @param layout - A {@link Layout} object that describes the\n     * desired memory layout of the generated buffer\n     * @return The packed array in the ... TODO\n     */\n    makeBufferData(layout) {\n        const numItems = this.vertices.length / 3;\n        const buffer = new ArrayBuffer(layout.stride * numItems);\n        buffer.numItems = numItems;\n        const dataView = new DataView(buffer);\n        for (let i = 0, vertexOffset = 0; i < numItems; i++) {\n            vertexOffset = i * layout.stride;\n            // copy in the vertex data in the order and format given by the\n            // layout param\n            for (const attribute of layout.attributes) {\n                const offset = vertexOffset + layout.attributeMap[attribute.key].offset;\n                switch (attribute.key) {\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].POSITION.key:\n                        dataView.setFloat32(offset, this.vertices[i * 3], true);\n                        dataView.setFloat32(offset + 4, this.vertices[i * 3 + 1], true);\n                        dataView.setFloat32(offset + 8, this.vertices[i * 3 + 2], true);\n                        break;\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].UV.key:\n                        dataView.setFloat32(offset, this.textures[i * 2], true);\n                        dataView.setFloat32(offset + 4, this.textures[i * 2 + 1], true);\n                        break;\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].NORMAL.key:\n                        dataView.setFloat32(offset, this.vertexNormals[i * 3], true);\n                        dataView.setFloat32(offset + 4, this.vertexNormals[i * 3 + 1], true);\n                        dataView.setFloat32(offset + 8, this.vertexNormals[i * 3 + 2], true);\n                        break;\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].MATERIAL_INDEX.key:\n                        dataView.setInt16(offset, this.vertexMaterialIndices[i], true);\n                        break;\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].AMBIENT.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.ambient[0], true);\n                        dataView.setFloat32(offset + 4, material.ambient[1], true);\n                        dataView.setFloat32(offset + 8, material.ambient[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].DIFFUSE.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.diffuse[0], true);\n                        dataView.setFloat32(offset + 4, material.diffuse[1], true);\n                        dataView.setFloat32(offset + 8, material.diffuse[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].SPECULAR.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.specular[0], true);\n                        dataView.setFloat32(offset + 4, material.specular[1], true);\n                        dataView.setFloat32(offset + 8, material.specular[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].SPECULAR_EXPONENT.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.specularExponent, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].EMISSIVE.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.emissive[0], true);\n                        dataView.setFloat32(offset + 4, material.emissive[1], true);\n                        dataView.setFloat32(offset + 8, material.emissive[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].TRANSMISSION_FILTER.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.transmissionFilter[0], true);\n                        dataView.setFloat32(offset + 4, material.transmissionFilter[1], true);\n                        dataView.setFloat32(offset + 8, material.transmissionFilter[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].DISSOLVE.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.dissolve, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].ILLUMINATION.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setInt16(offset, material.illumination, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].REFRACTION_INDEX.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.refractionIndex, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].SHARPNESS.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.sharpness, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].ANTI_ALIASING.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setInt16(offset, material.antiAliasing ? 1 : 0, true);\n                        break;\n                    }\n                }\n            }\n        }\n        return buffer;\n    }\n    makeIndexBufferData() {\n        const buffer = new Uint16Array(this.indices);\n        buffer.numItems = this.indices.length;\n        return buffer;\n    }\n    makeIndexBufferDataForMaterials(...materialIndices) {\n        const indices = new Array().concat(...materialIndices.map(mtlIdx => this.indicesPerMaterial[mtlIdx]));\n        const buffer = new Uint16Array(indices);\n        buffer.numItems = indices.length;\n        return buffer;\n    }\n    addMaterialLibrary(mtl) {\n        for (const name in mtl.materials) {\n            if (!(name in this.materialIndices)) {\n                // This material is not referenced by the mesh\n                continue;\n            }\n            const material = mtl.materials[name];\n            // Find the material index for this material\n            const materialIndex = this.materialIndices[material.name];\n            // Put the material into the materialsByIndex object at the right\n            // spot as determined when the obj file was parsed\n            this.materialsByIndex[materialIndex] = material;\n        }\n    }\n}\nfunction* triangulate(elements) {\n    if (elements.length <= 3) {\n        yield elements;\n    }\n    else if (elements.length === 4) {\n        yield [elements[0], elements[1], elements[2]];\n        yield [elements[2], elements[3], elements[0]];\n    }\n    else {\n        for (let i = 1; i < elements.length - 1; i++) {\n            yield [elements[0], elements[i], elements[i + 1]];\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/mesh.ts?');
        },
        "./src/utils.ts": /*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/ /*! exports provided: downloadModels, downloadMeshes, initMeshBuffers, deleteMeshBuffers */ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadModels", function() { return downloadModels; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadMeshes", function() { return downloadMeshes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initMeshBuffers", function() { return initMeshBuffers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteMeshBuffers", function() { return deleteMeshBuffers; });\n/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mesh */ "./src/mesh.ts");\n/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./material */ "./src/material.ts");\n\n\nfunction downloadMtlTextures(mtl, root) {\n    const mapAttributes = [\n        "mapDiffuse",\n        "mapAmbient",\n        "mapSpecular",\n        "mapDissolve",\n        "mapBump",\n        "mapDisplacement",\n        "mapDecal",\n        "mapEmissive",\n    ];\n    if (!root.endsWith("/")) {\n        root += "/";\n    }\n    const textures = [];\n    for (const materialName in mtl.materials) {\n        if (!mtl.materials.hasOwnProperty(materialName)) {\n            continue;\n        }\n        const material = mtl.materials[materialName];\n        for (const attr of mapAttributes) {\n            const mapData = material[attr];\n            if (!mapData || !mapData.filename) {\n                continue;\n            }\n            const url = root + mapData.filename;\n            textures.push(fetch(url)\n                .then(response => {\n                if (!response.ok) {\n                    throw new Error();\n                }\n                return response.blob();\n            })\n                .then(function (data) {\n                const image = new Image();\n                image.src = URL.createObjectURL(data);\n                mapData.texture = image;\n                return new Promise(resolve => (image.onload = resolve));\n            })\n                .catch(() => {\n                console.error(`Unable to download texture: ${url}`);\n            }));\n        }\n    }\n    return Promise.all(textures);\n}\nfunction getMtl(modelOptions) {\n    if (!(typeof modelOptions.mtl === "string")) {\n        return modelOptions.obj.replace(/\\.obj$/, ".mtl");\n    }\n    return modelOptions.mtl;\n}\n/**\n * Accepts a list of model request objects and returns a Promise that\n * resolves when all models have been downloaded and parsed.\n *\n * The list of model objects follow this interface:\n * {\n *  obj: \'path/to/model.obj\',\n *  mtl: true | \'path/to/model.mtl\',\n *  downloadMtlTextures: true | false\n *  mtlTextureRoot: \'/models/suzanne/maps\'\n *  name: \'suzanne\'\n * }\n *\n * The `obj` attribute is required and should be the path to the\n * model\'s .obj file relative to the current repo (absolute URLs are\n * suggested).\n *\n * The `mtl` attribute is optional and can either be a boolean or\n * a path to the model\'s .mtl file relative to the current URL. If\n * the value is `true`, then the path and basename given for the `obj`\n * attribute is used replacing the .obj suffix for .mtl\n * E.g.: {obj: \'models/foo.obj\', mtl: true} would search for \'models/foo.mtl\'\n *\n * The `name` attribute is optional and is a human friendly name to be\n * included with the parsed OBJ and MTL files. If not given, the base .obj\n * filename will be used.\n *\n * The `downloadMtlTextures` attribute is a flag for automatically downloading\n * any images found in the MTL file and attaching them to each Material\n * created from that file. For example, if material.mapDiffuse is set (there\n * was data in the MTL file), then material.mapDiffuse.texture will contain\n * the downloaded image. This option defaults to `true`. By default, the MTL\'s\n * URL will be used to determine the location of the images.\n *\n * The `mtlTextureRoot` attribute is optional and should point to the location\n * on the server that this MTL\'s texture files are located. The default is to\n * use the MTL file\'s location.\n *\n * @returns {Promise} the result of downloading the given list of models. The\n * promise will resolve with an object whose keys are the names of the models\n * and the value is its Mesh object. Each Mesh object will automatically\n * have its addMaterialLibrary() method called to set the given MTL data (if given).\n */\nfunction downloadModels(models) {\n    const finished = [];\n    for (const model of models) {\n        if (!model.obj) {\n            throw new Error(\'"obj" attribute of model object not set. The .obj file is required to be set \' +\n                "in order to use downloadModels()");\n        }\n        const options = {\n            indicesPerMaterial: !!model.indicesPerMaterial,\n            calcTangentsAndBitangents: !!model.calcTangentsAndBitangents,\n        };\n        // if the name is not provided, dervive it from the given OBJ\n        let name = model.name;\n        if (!name) {\n            const parts = model.obj.split("/");\n            name = parts[parts.length - 1].replace(".obj", "");\n        }\n        const namePromise = Promise.resolve(name);\n        const meshPromise = fetch(model.obj)\n            .then(response => response.text())\n            .then(data => {\n            return new _mesh__WEBPACK_IMPORTED_MODULE_0__["default"](data, options);\n        });\n        let mtlPromise;\n        // Download MaterialLibrary file?\n        if (model.mtl) {\n            const mtl = getMtl(model);\n            mtlPromise = fetch(mtl)\n                .then(response => response.text())\n                .then((data) => {\n                const material = new _material__WEBPACK_IMPORTED_MODULE_1__["MaterialLibrary"](data);\n                if (model.downloadMtlTextures !== false) {\n                    let root = model.mtlTextureRoot;\n                    if (!root) {\n                        // get the directory of the MTL file as default\n                        root = mtl.substr(0, mtl.lastIndexOf("/"));\n                    }\n                    // downloadMtlTextures returns a Promise that\n                    // is resolved once all of the images it\n                    // contains are downloaded. These are then\n                    // attached to the map data objects\n                    return Promise.all([Promise.resolve(material), downloadMtlTextures(material, root)]);\n                }\n                return Promise.all([Promise.resolve(material), undefined]);\n            })\n                .then((value) => {\n                return value[0];\n            });\n        }\n        const parsed = [namePromise, meshPromise, mtlPromise];\n        finished.push(Promise.all(parsed));\n    }\n    return Promise.all(finished).then(ms => {\n        // the "finished" promise is a list of name, Mesh instance,\n        // and MaterialLibary instance. This unpacks and returns an\n        // object mapping name to Mesh (Mesh points to MTL).\n        const models = {};\n        for (const model of ms) {\n            const [name, mesh, mtl] = model;\n            mesh.name = name;\n            if (mtl) {\n                mesh.addMaterialLibrary(mtl);\n            }\n            models[name] = mesh;\n        }\n        return models;\n    });\n}\n/**\n * Takes in an object of `mesh_name`, `\'/url/to/OBJ/file\'` pairs and a callback\n * function. Each OBJ file will be ajaxed in and automatically converted to\n * an OBJ.Mesh. When all files have successfully downloaded the callback\n * function provided will be called and passed in an object containing\n * the newly created meshes.\n *\n * **Note:** In order to use this function as a way to download meshes, a\n * webserver of some sort must be used.\n *\n * @param {Object} nameAndAttrs an object where the key is the name of the mesh and the value is the url to that mesh\'s OBJ file\n *\n * @param {Function} completionCallback should contain a function that will take one parameter: an object array where the keys will be the unique object name and the value will be a Mesh object\n *\n * @param {Object} meshes In case other meshes are loaded separately or if a previously declared variable is desired to be used, pass in a (possibly empty) json object of the pattern: { \'<mesh_name>\': OBJ.Mesh }\n *\n */\nfunction downloadMeshes(nameAndURLs, completionCallback, meshes) {\n    if (meshes === undefined) {\n        meshes = {};\n    }\n    const completed = [];\n    for (const mesh_name in nameAndURLs) {\n        if (!nameAndURLs.hasOwnProperty(mesh_name)) {\n            continue;\n        }\n        const url = nameAndURLs[mesh_name];\n        completed.push(fetch(url)\n            .then(response => response.text())\n            .then(data => {\n            return [mesh_name, new _mesh__WEBPACK_IMPORTED_MODULE_0__["default"](data)];\n        }));\n    }\n    Promise.all(completed).then(ms => {\n        for (const [name, mesh] of ms) {\n            meshes[name] = mesh;\n        }\n        return completionCallback(meshes);\n    });\n}\nfunction _buildBuffer(gl, type, data, itemSize) {\n    const buffer = gl.createBuffer();\n    const arrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;\n    gl.bindBuffer(type, buffer);\n    gl.bufferData(type, new arrayView(data), gl.STATIC_DRAW);\n    buffer.itemSize = itemSize;\n    buffer.numItems = data.length / itemSize;\n    return buffer;\n}\n/**\n * Takes in the WebGL context and a Mesh, then creates and appends the buffers\n * to the mesh object as attributes.\n *\n * @param {WebGLRenderingContext} gl the `canvas.getContext(\'webgl\')` context instance\n * @param {Mesh} mesh a single `OBJ.Mesh` instance\n *\n * The newly created mesh attributes are:\n *\n * Attrbute | Description\n * :--- | ---\n * **normalBuffer**       |contains the model&#39;s Vertex Normals\n * normalBuffer.itemSize  |set to 3 items\n * normalBuffer.numItems  |the total number of vertex normals\n * |\n * **textureBuffer**      |contains the model&#39;s Texture Coordinates\n * textureBuffer.itemSize |set to 2 items\n * textureBuffer.numItems |the number of texture coordinates\n * |\n * **vertexBuffer**       |contains the model&#39;s Vertex Position Coordinates (does not include w)\n * vertexBuffer.itemSize  |set to 3 items\n * vertexBuffer.numItems  |the total number of vertices\n * |\n * **indexBuffer**        |contains the indices of the faces\n * indexBuffer.itemSize   |is set to 1\n * indexBuffer.numItems   |the total number of indices\n *\n * A simple example (a lot of steps are missing, so don\'t copy and paste):\n *\n *     const gl   = canvas.getContext(\'webgl\'),\n *         mesh = OBJ.Mesh(obj_file_data);\n *     // compile the shaders and create a shader program\n *     const shaderProgram = gl.createProgram();\n *     // compilation stuff here\n *     ...\n *     // make sure you have vertex, vertex normal, and texture coordinate\n *     // attributes located in your shaders and attach them to the shader program\n *     shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");\n *     gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);\n *\n *     shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");\n *     gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);\n *\n *     shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");\n *     gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);\n *\n *     // create and initialize the vertex, vertex normal, and texture coordinate buffers\n *     // and save on to the mesh object\n *     OBJ.initMeshBuffers(gl, mesh);\n *\n *     // now to render the mesh\n *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);\n *     gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);\n *     // it\'s possible that the mesh doesn\'t contain\n *     // any texture coordinates (e.g. suzanne.obj in the development branch).\n *     // in this case, the texture vertexAttribArray will need to be disabled\n *     // before the call to drawElements\n *     if(!mesh.textures.length){\n *       gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);\n *     }\n *     else{\n *       // if the texture vertexAttribArray has been previously\n *       // disabled, then it needs to be re-enabled\n *       gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);\n *       gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureBuffer);\n *       gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);\n *     }\n *\n *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);\n *     gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);\n *\n *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.mesh.indexBuffer);\n *     gl.drawElements(gl.TRIANGLES, model.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);\n */\nfunction initMeshBuffers(gl, mesh) {\n    mesh.normalBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertexNormals, 3);\n    mesh.textureBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.textures, mesh.textureStride);\n    mesh.vertexBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertices, 3);\n    mesh.indexBuffer = _buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indices, 1);\n    return mesh;\n}\nfunction deleteMeshBuffers(gl, mesh) {\n    gl.deleteBuffer(mesh.normalBuffer);\n    gl.deleteBuffer(mesh.textureBuffer);\n    gl.deleteBuffer(mesh.vertexBuffer);\n    gl.deleteBuffer(mesh.indexBuffer);\n}\n\n\n//# sourceURL=webpack:///./src/utils.ts?');
        },
        0: /*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/ /*! no static exports found */ function(module, exports, __webpack_require__) {
            eval('module.exports = __webpack_require__(/*! /home/aaron/google_drive/projects/webgl-obj-loader/src/index.ts */"./src/index.ts");\n\n\n//# sourceURL=webpack:///multi_./src/index.ts?');
        }
    });
});

},{}],"3eVMn":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFileNamesChair = exports.getFileNamesChair2 = exports.getFileNamesPlane = exports.getFileNamesCube = exports.getFileNamesRubik = exports.getFileNamesCat = exports.getFileNamesGreenhouse = exports.getFileNamesBuilding = exports.getFileNamesStone = exports.getFileNamesKoenigsEgg = void 0;
function getFileNamesKoenigsEgg() {
    var cfiles = [];
    console.log("Resolve: ./resources/models/koenigsegg/koenigsegg.obj");
    var cobjname = require("./resources/models/koenigsegg/koenigsegg.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/koenigsegg/koenigsegg.mtl");
    var cmatname = require("./resources/models/koenigsegg/koenigsegg.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesKoenigsEgg = getFileNamesKoenigsEgg;
function getFileNamesStone() {
    // var cfiles: {fName:string, fNameResolved:string}[] = [];
    // cfiles.push({fName:'stone12021_01.png',fNameResolved:require('./resources/models/stone/stone12021_01.png')});
    // cfiles.push({fName:'Material.001_diffuse.png',fNameResolved:require('./resources/models/stone/Material.001_diffuse.png')});
    var cfiles = [];
    cfiles.push({
        fName: "stone12021_01.jpg",
        fNameResolved: require("./resources/models/stone/stone12021_01.jpg")
    });
    console.log("Resolve: ./resources/models/stone/stone12021_01.obj");
    var cobjname = require("./resources/models/stone/stone12021_01.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/stone/stone12021_01.mtl");
    var cmatname = require("./resources/models/stone/stone12021_01.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesStone = getFileNamesStone;
function getFileNamesBuilding() {
    var cfiles = [];
    cfiles.push({
        fName: "stone12021_01.png",
        fNameResolved: require("./resources/models/stone/stone12021_01.png")
    });
    console.log("Resolve: ./resources/models/building/building_04a.obj");
    var cobjname = require("./resources/models/building/building_04a.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/building/building_04.mtl");
    var cmatname = require("./resources/models/building/building_04.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesBuilding = getFileNamesBuilding;
function getFileNamesGreenhouse() {
    var cfiles = [];
    cfiles.push({
        fName: "greenhouse_flooring.png",
        fNameResolved: require("./resources/models/greenhouse/greenhouse_flooring.png")
    });
    console.log("Resolve: ./resources/models/greenhouse/greenhouse.obj");
    var cobjname = require("./resources/models/greenhouse/greenhouse.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/greenhouse/greenhouse.mtl");
    var cmatname = require("./resources/models/greenhouse/greenhouse.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesGreenhouse = getFileNamesGreenhouse;
function getFileNamesCat() {
    var cfiles = [];
    console.log("Resolve: ./resources/models/cat/12221_Cat_v1_l3.obj");
    var cobjname = require("./resources/models/cat/12221_Cat_v1_l3.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/cat/12221_Cat_v1_l3.mtl");
    var cmatname = require("./resources/models/cat/12221_Cat_v1_l3.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesCat = getFileNamesCat;
function getFileNamesRubik() {
    var cfiles = [];
    console.log("Resolve: ./resources/models/rubik/xrubik.obj");
    var cobjname = require("./resources/models/rubik/xrubik.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/rubik/xrubik.mtl");
    var cmatname = require("./resources/models/rubik/xrubik.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesRubik = getFileNamesRubik;
function getFileNamesCube() {
    var cfiles = [];
    cfiles.push({
        fName: "clover.jpg",
        fNameResolved: require("./resources/models/stone/clover.jpg")
    });
    cfiles.push({
        fName: "Di-3d.png",
        fNameResolved: require("./resources/models/stone/Di-3d.png")
    });
    cfiles.push({
        fName: "stone12021_01.png",
        fNameResolved: require("./resources/models/stone/stone12021_01.png")
    });
    cfiles.push({
        fName: "zelenskyycube.jpg",
        fNameResolved: require("./resources/models/stone/zelenskyycube.jpg")
    });
    console.log("Resolve: ./resources/models/cube/cube2.obj");
    var cobjname = require("./resources/models/cube/cube2.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/cube/cube2.mtl");
    var cmatname = require("./resources/models/cube/cube2.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesCube = getFileNamesCube;
/*
export function getFileNamesBike(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/bike/bike.obj");
  var cobjname = require('./resources/models/bike/bike.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/bike/bike.mtl");
  var cmatname = require('./resources/models/bike/bike.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}
*/ function getFileNamesPlane() {
    var cfiles = [];
    console.log("Resolve: ./resources/models/plane/plane.obj");
    var cobjname = require("./resources/models/plane/plane.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/plane/plane.mtl");
    var cmatname = require("./resources/models/plane/plane.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesPlane = getFileNamesPlane;
/*
export function getFileNamesMario(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/mario/mario-sculpture.obj");
  var cobjname = require('./resources/models/mario/mario-sculpture.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/mario/mario-sculpture.mtl");
  var cmatname = require('./resources/models/mario/mario-sculpture.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}
*/ function getFileNamesChair2() {
    var cfiles = [];
    console.log("Resolve: ./resources/models/chair/willisau_riale.obj");
    var cobjname = require("./resources/models/chair/willisau_riale.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/chair/willisau_riale.mtl");
    var cmatname = require("./resources/models/chair/willisau_riale.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesChair2 = getFileNamesChair2;
function getFileNamesChair() {
    var cfiles = [];
    console.log("Resolve: ./resources/models/chair/chair.obj");
    var cobjname = require("./resources/models/chair/chair.obj");
    console.log("Resolved: cparcelname=" + cobjname);
    console.log("Resolve: ./resources/models/chair/chair.mtl");
    var cmatname = require("./resources/models/chair/chair.mtl");
    console.log("Resolved: cparcelname=" + cmatname);
    return {
        cobjname,
        cmatname,
        cfiles
    };
}
exports.getFileNamesChair = getFileNamesChair;

},{"./resources/models/koenigsegg/koenigsegg.obj":"1rHyt","./resources/models/koenigsegg/koenigsegg.mtl":"bdHKE","./resources/models/stone/stone12021_01.jpg":"79uTs","./resources/models/stone/stone12021_01.obj":"hcHAM","./resources/models/stone/stone12021_01.mtl":"kYlFi","./resources/models/stone/stone12021_01.png":"gabeV","./resources/models/building/building_04a.obj":"ejemh","./resources/models/building/building_04.mtl":"chLKe","./resources/models/greenhouse/greenhouse_flooring.png":"jmouO","./resources/models/greenhouse/greenhouse.obj":"h8dVb","./resources/models/greenhouse/greenhouse.mtl":"ke38u","./resources/models/cat/12221_Cat_v1_l3.obj":"9xQtz","./resources/models/cat/12221_Cat_v1_l3.mtl":"kYhKc","./resources/models/rubik/xrubik.obj":"8pyvI","./resources/models/rubik/xrubik.mtl":"qNPWh","./resources/models/stone/clover.jpg":"hSlfy","./resources/models/stone/Di-3d.png":"7xuFS","./resources/models/stone/zelenskyycube.jpg":"kfPyg","./resources/models/cube/cube2.obj":"2OwEf","./resources/models/cube/cube2.mtl":"3xSSQ","./resources/models/plane/plane.obj":"kHBdN","./resources/models/plane/plane.mtl":"en77H","./resources/models/chair/willisau_riale.obj":"6IBWt","./resources/models/chair/willisau_riale.mtl":"7BoCY","./resources/models/chair/chair.obj":"dNB1y","./resources/models/chair/chair.mtl":"3kSEq"}],"1rHyt":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "koenigsegg.551b58eb.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"bdHKE":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "koenigsegg.d37e8707.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"79uTs":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "stone12021_01.a78720f3.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"hcHAM":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "stone12021_01.44d0fbe0.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"kYlFi":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "stone12021_01.3cb81356.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"gabeV":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "stone12021_01.78afeac0.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"ejemh":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "building_04a.71b1527a.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"chLKe":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "building_04.9c45643c.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"jmouO":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "greenhouse_flooring.e7aae741.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"h8dVb":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "greenhouse.99847e95.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"ke38u":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "greenhouse.35793745.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"9xQtz":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "12221_Cat_v1_l3.553c92a2.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"kYhKc":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "12221_Cat_v1_l3.0bc61995.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"8pyvI":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "xrubik.77a38852.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"qNPWh":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "xrubik.f01b8af1.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"hSlfy":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "clover.0da21259.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"7xuFS":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "Di-3d.ab5d1a68.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"kfPyg":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "zelenskyycube.d98da9c1.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"2OwEf":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "cube2.8c63359a.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"3xSSQ":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "cube2.5d66a165.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"kHBdN":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "plane.20cdb81a.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"en77H":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "plane.2ea8e87c.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"6IBWt":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "willisau_riale.ac5452da.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"7BoCY":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "willisau_riale.c31a390c.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"dNB1y":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "chair.05726ad2.obj" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"3kSEq":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ayEn8") + "chair.a0644976.mtl" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}]},["1pQXO","3CPcP"], "3CPcP", "parcelRequire19e8")

//# sourceMappingURL=index.73eb0017.js.map
