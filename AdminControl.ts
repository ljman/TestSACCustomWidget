class AdminControl extends HTMLElement {

  #oauthHasBeenInitialised: boolean;
  #clientId: string;
  #clientSecret: string;
  #currentAccessToken: string;
  #tokenUrl: string;
  #baseApiUrl: string;

  connectedCallback() {
    console.log("Connected callback called!");
    this.innerHTML = '<h1>Hello World.</h1>'
    console.log("testing *");
  }

  constructor() {
    debugger;
    console.log("Constructor called");

    super();
    this.#oauthHasBeenInitialised = false;
  }

  async InitializeOauth(): Promise<string> {
    console.log("InitializeOauth called");
    debugger;
    try {

      var oauthResponse = await fetch(this.#tokenUrl, {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + this.#clientId + '&client_secret=' + this.#clientSecret,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      var oauthResult = await oauthResponse.json();
      return oauthResult.access_token;

    }
    catch (e) {
      console.log("Exception when trying to get OAuth: " + e);
      throw (e);
    }
  }

  async InitializeApi(baseApiUrl: string, tokenUrl: string, clientId: string, clientSecret: string) {
    debugger;
    if(this.#oauthHasBeenInitialised)return;
    this.#oauthHasBeenInitialised = false;    
    this.#baseApiUrl = baseApiUrl;
    this.#tokenUrl = tokenUrl;
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
    this.#currentAccessToken = "";

    try {
      this.#currentAccessToken = await this.InitializeOauth();
      console.log("OAuth successful");
      this.#oauthHasBeenInitialised = true;
    }
    catch (e) {
      console.log("Could not initialize the connection " + e);
    }
  }

  //currently defaults to GET method
  async RunApiQuery(resourceUrl: string): Promise<string> {
    debugger;
    try {

      if (!this.#oauthHasBeenInitialised) {
        throw new Error("Please Initialize before using RunApiQuery using InitializeApi function");
      }

      var fullUrlAddress = this.#baseApiUrl + resourceUrl;

      const response = await fetch(fullUrlAddress, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.#currentAccessToken,
          'x-sap-sac-custom-auth': 'true',
          'x-csrf-token': 'fetch'
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
customElements.define('corr-admin-control', AdminControl);
