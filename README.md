# page_speed

Google Lighthouse page speed scores

## Installation

``` gh repo clone GlennChon/page_speed ```

``` npm install ```

## Page Speed
[Getting Started with PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/get-started)

### Steps
- Enable Page Speed API
    - Create API key

- Enable Secret Manager API
    - Create secret using page speed API key

### Requirements
| Environment Variables | Value |
| --------------------- | ----- |
| PROJECT_ID | CLOUD PROJECT ID |
| SECRET_ID | GOOGLE PAGE SPEED APIKEY |
| SECRET_VERSION | SECRET VERSION NUMBER |

## Scripts
Build:

``` npm run build ```

Local run:

``` npm run dev ```

Use:
``` gcloud auth print-identity-token ```
Pass as bearer token for ThunderClient cloudFunction production deployment test
token is valid for 1 hour


## Deployment
- Create repo on github
    - Push to main
    - Create deployment branch: e.g. gcp_deploy
    - Merge main into deployment branch and push
- Create cloud build trigger
    - Name the trigger: pageSpeedTrigger
    - Link previously created repo to invoke on deployment branch push event
    - Push to repo to trigger build or run from GCP interface
- Cloud Functions
    - Assign appropriate runtime service account
    - Add runtime env vars (if applicable)
    - Egress settings: assign VPC Connector (if applicable)
    - Redeploy or push a new version

## Usage

Send the following to your cloud function trigger url:
```javascript
// url: https://example.com
// strategy: 'desktop' | 'mobile'
// category: ["accessibility", "best-practices", "performance", "pwa", "seo"]  
type PageSpeedModel {
    url:string
    strategy: string 
    category?: string[]  
}

```

## Cloud Function

- Built via GCP Cloud Build trigger: pageSpeedTrigger
- Function Name: pageSpeed

## License

[MIT](https://choosealicense.com/licenses/mit/)

