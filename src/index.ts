/* eslint-disable import/first */
import 'dotenv/config'
import { Request, Response } from 'express'
import { accessSecret } from '@/services'
import { google } from 'googleapis'
/**
 * Responds to any HTTP request.
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 **/

//https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed
interface PageSpeedModel {
	url: string
	strategy: string //desktop || mobile
	category?: string[] // accessibility, best-practices, performance, pwa, seo
}
  
export const pageSpeed = async (
	req: Request<{}, {}, PageSpeedModel>,
	res: Response,
) => {
	let statusCode:number
	let responseBody:any
	res.set('Access-Control-Allow-Origin', '*')
	if (req.method === 'OPTIONS') {
	  // Send response to OPTIONS requests
		res.set({
		  'Access-Control-Allow-Methods': 'GET, POST',
		  'Access-Control-Allow-Headers': 'Content-Type',
		  'Content-Type': 'application/json',
		  'Access-Control-Max-Age': '3600',
		})
		statusCode = 204
		responseBody = ''	  
		return res.status(statusCode).send(responseBody)
	}
	try {	
		// cloud function code
		const {category="performance", strategy, url } = req.body
		const { PROJECT_ID, SECRET_ID, SECRET_VERSION } = process.env
		const APIKey = await accessSecret(`projects/${PROJECT_ID}/secrets/${SECRET_ID}/versions/${SECRET_VERSION}`)
		if (!APIKey) throw new Error('API Key not found')
		const pagespeedonline = google.pagespeedonline('v5')
		const options = {
			url: url,
			key: APIKey,
			strategy: strategy,
			category: category
		}
		/* @ts-ignore */
		const { data } = await pagespeedonline.pagespeedapi.runpagespeed(options)
		statusCode = 201
		responseBody = data
	} catch (err) {
		console.error(err)
		statusCode = err.errno || 500
		responseBody = err.message || 'Unknown error'
	} finally {
		return res.status(statusCode).send(responseBody)
	}
}

process.on('unhandledRejection', (err: Error): void => {
	console.error(err.message)
	process.exitCode = 1
})