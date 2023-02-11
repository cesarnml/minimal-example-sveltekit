/* eslint-disable vars-on-top */
/* eslint-disable no-var */

type EmailParams = {
	SecureToken: string
	To: string
	From: string
	Subject: string
	Body: string
}

// declare var Email: {
// 	// eslint-disable-next-line no-unused-vars
// 	send: (params: EmailParams) => Promise<void>
// }

declare global {
	interface Email {
		send: () => Promise<void>
	}
}
