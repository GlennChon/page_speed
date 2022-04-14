/* eslint-disable import/first */
import 'dotenv/config'
import { Request, Response } from 'express'

/**
 * Responds to any HTTP request.
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 **/

interface FunctionModel {
	name: string
}

export const functionName = async (
	req: Request<{}, {}, FunctionModel>,
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
		const { name } = req.body
		console.log(name)
		
		// Return success response 
		return res.status(201).send(`success ${name}`)
	} catch (err) {
		console.error(err)
		statusCode = err.errno || 500
		responseBody = err.message || 'Unknown error'
		return
	} finally {
		return res.status(statusCode).send(responseBody)
	}
}