<script lang="ts">
	import {
		PUBLIC_EMAIL_SECURE_TOKEN,
		PUBLIC_EMAIL_TO,
		PUBLIC_EMAIL_FROM,
		PUBLIC_EMAIL_SUBJECT
	} from '$env/static/public'
	import { error, type HttpError } from '@sveltejs/kit'
	import { page } from '$app/stores'

	import { onMount } from 'svelte'

	const rows = 5
	let sendEmail: () => Promise<void | HttpError>
	let name: string
	let email: string
	let message: string
	let buttonDisabled = false
	let showProgress = false

	function resetForm() {
		name = ''
		email = ''
		message = ''
		buttonDisabled = false
		showProgress = false
	}

	onMount(async () => {
		sendEmail = async () => {
			showProgress = true
			buttonDisabled = true
			try {
				await Email.send({
					SecureToken: PUBLIC_EMAIL_SECURE_TOKEN,
					To: PUBLIC_EMAIL_TO,
					From: PUBLIC_EMAIL_FROM,
					Subject: PUBLIC_EMAIL_SUBJECT,
					Body: `${name}<br/>${email}<br/>${message}`
				})

				resetForm()
			} catch (err) {
				error(400, 'Email failed 😬')
			}
		}
	})
</script>

<div>
	<div class="flex flex-col items-center">
		<div class="w-full max-w-screen-xs">
			<h2 class="mb-8 text-center">Contact Me</h2>
			<div>{$page.url.pathname}</div>
			<form class="flex flex-col items-stretch gap-6" on:submit|preventDefault={sendEmail}>
				<p class="!text-lg">
					You can contact me via this contact form or through my <a href="mailto:cmejia@gmail.com"
						>personal email</a
					> and I will get back to you as soon as I can.
				</p>
				<label class="input-label" for="name">
					<div class="mb-2 font-semibold">Your name</div>
					<input
						class="input italic"
						id="name"
						type="text"
						name="name"
						required
						bind:value={name}
						placeholder="What should I call you?"
					/>
				</label>
				<label class="input-label" for="email">
					<div class="mb-2 font-semibold">Your email or phone number</div>
					<input
						class="input italic"
						id="email"
						type="email"
						name="email"
						required
						bind:value={email}
						placeholder="Where can I send my response?"
					/>
				</label>
				<label class="input-label" for="message">
					<div class="mb-2 font-semibold">What's on your mind?</div>
					<textarea
						class="textarea italic"
						id="mesage"
						name="message"
						bind:value={message}
						{rows}
						required
						placeholder="What would you like to talk about?"
					/>
				</label>
				<button
					class="btn btn-lg variant-filled-primary w-full"
					type="submit"
					disabled={buttonDisabled}
				>
					<div>Send</div>
				</button>
			</form>
		</div>
	</div>
	<script src="/js/smtp.js">
	</script>
</div>
