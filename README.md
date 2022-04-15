# page_speed

Description: google lighthouse page speed scores

## Installation

```sh gh repo clone GlennChon/page_speed ```
```sh npm install ```

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
```sh npm run build ```

Local run:
```sh npm run dev ```

## Deployment
- Create repo on github
    - Push to main
    - Create deployment branch: e.g. gcp_deploy
    - Merge main into deployment branch
- Create cloud trigger
    - Name the trigger: pageSpeedTrigger
    - Link previously created repo to build on deployment branch push
    - Push to repo to trigger build
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
type PageSpeedParams {
    url:string
    strategy: string 
    category: string[]  
}

```

## Cloud Function

- Built via GCP Cloud Build trigger: pageSpeedTrigger
- Function Name: pageSpeed

## License

[MIT](https://choosealicense.com/licenses/mit/)

