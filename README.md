# cloud-function-template

Description: ...
Template setup for google cloud functions

## Installation

``` gh repo clone GlennChon/cloud-function-template ```
- Replace all function_name or functionName with a given name
    - Locations: package.json: name & scripts.dev, cloudbuild.yaml
- npm install to install all dependencies
- Develop the function
- Create repo on github
    - Push to main
    - Create deployment branch: e.g. gcp_deploy
    - Merge main into deployment branch
- Create cloud trigger
    - Link previously created repo
    - Push to repo to trigger build
- In Cloud Functions
    - Assign appropriate runtime service account.
    - Add runtime env vars (if applicable)
    - Egress settings: assign VPC Connector (if applicable)
    - Redeploy or push a new version

## Usage

How to use info: ...

```javascript
// Types
// Interfaces
// Other info...

```

## Cloud Function

- Built via GCP Cloud Build trigger: triggerName
- Function Name: functionName

## License

[MIT](https://choosealicense.com/licenses/mit/)

