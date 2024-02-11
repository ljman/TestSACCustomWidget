(() => {
    var __webpack_modules__ = {
        648: function() {
            var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
                if (kind === "m") throw new TypeError("Private method is not writable");
                if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
                if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
                value;
            };
            var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
                if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
                if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
            var _AdminControl_oauthHasBeenInitialised, _AdminControl_clientId, _AdminControl_clientSecret, _AdminControl_currentAccessToken, _AdminControl_tokenUrl, _AdminControl_baseApiUrl;
            class AdminControl extends HTMLElement {
                connectedCallback() {
                    console.log("Connected callback called!");
                    this.innerHTML = "<h1>Hello World.</h1>";
                    console.log("testing *");
                }
                constructor() {
                    debugger;
                    console.log("Constructor called");
                    super();
                    _AdminControl_oauthHasBeenInitialised.set(this, void 0);
                    _AdminControl_clientId.set(this, void 0);
                    _AdminControl_clientSecret.set(this, void 0);
                    _AdminControl_currentAccessToken.set(this, void 0);
                    _AdminControl_tokenUrl.set(this, void 0);
                    _AdminControl_baseApiUrl.set(this, void 0);
                    __classPrivateFieldSet(this, _AdminControl_oauthHasBeenInitialised, false, "f");
                }
                async InitializeOauth() {
                    console.log("InitializeOauth called");
                    debugger;
                    try {
                        var oauthResponse = await fetch(__classPrivateFieldGet(this, _AdminControl_tokenUrl, "f"), {
                            method: "POST",
                            body: "grant_type=client_credentials&client_id=" + __classPrivateFieldGet(this, _AdminControl_clientId, "f") + "&client_secret=" + __classPrivateFieldGet(this, _AdminControl_clientSecret, "f"),
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        });
                        var oauthResult = await oauthResponse.json();
                        return oauthResult.access_token;
                    } catch (e) {
                        console.log("Exception when trying to get OAuth: " + e);
                        throw e;
                    }
                }
                async InitializeApi(baseApiUrl, tokenUrl, clientId, clientSecret) {
                    debugger;
                    if (__classPrivateFieldGet(this, _AdminControl_oauthHasBeenInitialised, "f")) return;
                    __classPrivateFieldSet(this, _AdminControl_oauthHasBeenInitialised, false, "f");
                    __classPrivateFieldSet(this, _AdminControl_baseApiUrl, baseApiUrl, "f");
                    __classPrivateFieldSet(this, _AdminControl_tokenUrl, tokenUrl, "f");
                    __classPrivateFieldSet(this, _AdminControl_clientId, clientId, "f");
                    __classPrivateFieldSet(this, _AdminControl_clientSecret, clientSecret, "f");
                    __classPrivateFieldSet(this, _AdminControl_currentAccessToken, "", "f");
                    try {
                        __classPrivateFieldSet(this, _AdminControl_currentAccessToken, await this.InitializeOauth(), "f");
                        console.log("OAuth successful");
                        __classPrivateFieldSet(this, _AdminControl_oauthHasBeenInitialised, true, "f");
                    } catch (e) {
                        console.log("Could not initialize the connection " + e);
                    }
                }
                async RunApiQuery(resourceUrl) {
                    debugger;
                    try {
                        if (!__classPrivateFieldGet(this, _AdminControl_oauthHasBeenInitialised, "f")) {
                            throw new Error("Please Initialize before using RunApiQuery using InitializeApi function");
                        }
                        var fullUrlAddress = __classPrivateFieldGet(this, _AdminControl_baseApiUrl, "f") + resourceUrl;
                        const response = await fetch(fullUrlAddress, {
                            method: "GET",
                            headers: {
                                Authorization: "Bearer " + __classPrivateFieldGet(this, _AdminControl_currentAccessToken, "f"),
                                "x-sap-sac-custom-auth": "true",
                                "x-csrf-token": "fetch"
                            }
                        });
                        const data = await response.json();
                        return JSON.stringify(data, null, "\t");
                    } catch (error) {
                        console.log(error);
                        return "";
                    }
                }
            }
            _AdminControl_oauthHasBeenInitialised = new WeakMap, _AdminControl_clientId = new WeakMap, 
            _AdminControl_clientSecret = new WeakMap, _AdminControl_currentAccessToken = new WeakMap, 
            _AdminControl_tokenUrl = new WeakMap, _AdminControl_baseApiUrl = new WeakMap;
            customElements.define("corr-admin-control", AdminControl);
        }
    };
    var __webpack_exports__ = {};
    __webpack_modules__[648]();
})();