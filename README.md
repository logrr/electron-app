# electron-app

electron-app is sample Electron application using Logrr for authentication.

This app requires to get settings from your app config from our [portal]

If you don't have access to it, request your trial [here](http://info.logrr.com/logrr-trial-sign-up).

## Install

First, clone this repository or download a zip file out of it, your choice.

Install then required dependencies by running the usual:

```
$ npm install
```

## Configuration

Once done, head to your Logrr tenant by accessing the Logrr [Portal].

Go to your Electron configured app, and grab the following value info from the settings tab:
- Sign In Url field value (e.g. *"https://connect.logrr.com/login/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"*)
- Public certificate (a veeeeeeeeeeery long base64 encoded version of your public key. e.g. *"MIIDOjCCAiKgAwIBAgIQAI3...."*)

Have a look at the image below to find the corresponding values on the Logrr Portal:

![Logrr settings](https://logrrcontent.blob.core.windows.net/images/appSetupProperties.png)

Place these values by editing the **index.js** file replacing values as follows:

Before:
```
var samlSettings = {
  validateInResponseTo: false,
  issuer: 'logrr-saml',
  entryPoint: '-- Logrr auth application specific here --',
  cert: '-- base64 public key to validate assertions --'
};
```
After:
```
var samlSettings = {
  validateInResponseTo: false,
  issuer: 'logrr-saml',
  entryPoint: 'https://connect.logrr.com/login/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  cert: 'MIIDOjCCAiKgAwIBAgIQAI3....'
};
```

Just now run the app by running the following command in the app folder:
After:
```
npm start
```
[Logrr]: http://www.logrr.com
[Portal]: https://portal.logrr.com/