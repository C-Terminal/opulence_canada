<script context="module">
	// Define a type for the error response for better type safety.
	interface ErrorResponse {
		message: string;
		status?: number; // Make status optional since it might not always be present
		title?: string; // Add an optional title for more descriptive errors
	}

	// This function centralizes error handling and allows for consistent styling and behavior.
	export function load({
		error,
		status
	}: {
		error: Error | string;
		status: number;
	}): ErrorResponse {
		let message: string;
		let title: string | undefined; // Use undefined instead of null
		let statusCode = status; // Use the provided status code

		// Handle string errors and ensure error is always treated as an object.
		if (typeof error === 'string') {
			message = error;
			// Attempt to infer status from common string errors, default to 500
			if (message.includes('Not Found')) {
				statusCode = 404;
			} else if (message.includes('Unauthorized')) {
				statusCode = 401;
			} else {
				statusCode = 500; // Default server error
			}
		} else if (error instanceof Error) {
			message = error.message || 'An unexpected error occurred.';
		} else {
			message = 'An unexpected error occurred.';
			statusCode = 500;
		}

		// Customize error messages and titles based on status code.
		switch (statusCode) {
			case 400:
				title = 'Bad Request';
				message = message || 'The server could not understand the request.';
				break;
			case 401:
				title = 'Unauthorized';
				message = message || 'You are not authorized to access this resource.';
				break;
			case 403:
				title = 'Forbidden';
				message = message || 'You do not have permission to access this resource.';
				break;
			case 404:
				title = 'Not Found';
				message = message || 'The requested resource could not be found.';
				break;
			case 405:
				title = 'Method Not Allowed';
				message = message || 'The requested method is not allowed for this resource.';
				break;
			case 409:
				title = 'Conflict';
				message = message || 'The request could not be completed due to a conflict.';
				break;
			case 429:
				title = 'Too Many Requests';
				message = message || 'You have sent too many requests in a given amount of time.';
				break;
			case 500:
				title = 'Internal Server Error';
				message = message || 'An unexpected error occurred on the server.';
				break;
			case 502:
				title = 'Bad Gateway';
				message = message || 'The server received an invalid response from another server.';
				break;
			case 503:
				title = 'Service Unavailable';
				message = message || 'The server is currently unavailable.';
				break;
			case 504:
				title = 'Gateway Timeout';
				message = message || 'The server timed out waiting for a response from another server.';
				break;
			default:
				if (!title) {
					title = 'Error'; // Generic title
				}
				if (!message) {
					message = 'An unknown error occurred.';
				}
		}

		return {
			message,
			status: statusCode,
			title // Include the title in the returned object
		};
	}
</script>

<script lang="ts">
	import { LampEffect404 } from '$lib/components/ui/LampEffect';
	import { page } from '$app/state';
	import type { Component } from 'svelte';
	import { goto } from '$app/navigation';
	// Use the ErrorResponse interface
	let errorData: ErrorResponse | null = page.error;
	$: errorData = page.error;

	// Helper function to get a consistent error code, defaulting to 500
	function getErrorCode(): number {
		return page.status;
	}

	// Get the error code
	const errorCode = getErrorCode();
	let title = errorData?.title || 'Error'; // Fallback to "Error"
	let message = errorData?.message || 'An unknown error occurred.'; // Fallback

	// Function to get styles based on error code
	function getStyles(code: number, component?: Component) {
		switch (code) {
			case 400: // Bad Request
				return {
					bg: 'bg-red-100 dark:bg-red-900',
					text: 'text-red-800 dark:text-red-200',
					border: 'border-red-300 dark:border-red-700',
					accent: 'bg-red-500 dark:bg-red-400' // Added accent color
				};
			case 401: // Unauthorized
				return {
					bg: 'bg-yellow-100 dark:bg-yellow-900',
					text: 'text-yellow-800 dark:text-yellow-200',
					border: 'border-yellow-300 dark:border-yellow-700',
					accent: 'bg-yellow-500 dark:bg-yellow-400'
				};
			case 403: // Forbidden
				return {
					bg: 'bg-purple-100 dark:bg-purple-900',
					text: 'text-purple-800 dark:text-purple-200',
					border: 'border-purple-300 dark:border-purple-700',
					accent: 'bg-purple-500 dark:bg-purple-400'
				};
			case 404: // Not Found
				if (component) {
					return {
						styles: {
							bg: 'bg-blue-100 dark:bg-blue-900',
							text: 'text-blue-800 dark:text-blue-200',
							border: 'border-blue-300 dark:border-blue-700',
							accent: 'bg-blue-500 dark:bg-blue-400'
						},
						component
					};
				} else {
					return {
						bg: 'bg-blue-100 dark:bg-blue-900',
						text: 'text-blue-800 dark:text-blue-200',
						border: 'border-blue-300 dark:border-blue-700',
						accent: 'bg-blue-500 dark:bg-blue-400'
					};
				}
			case 405: // Method Not Allowed
				return {
					bg: 'bg-indigo-100 dark:bg-indigo-900',
					text: 'text-indigo-800 dark:text-indigo-200',
					border: 'border-indigo-300 dark:border-indigo-700',
					accent: 'bg-indigo-500 dark:bg-indigo-400'
				};
			case 409: // Conflict
				return {
					bg: 'bg-pink-100 dark:bg-pink-900',
					text: 'text-pink-800 dark:text-pink-200',
					border: 'border-pink-300 dark:border-pink-700',
					accent: 'bg-pink-500 dark:bg-pink-400'
				};
			case 429: // Too Many Requests
				return {
					bg: 'bg-gray-100 dark:bg-gray-900',
					text: 'text-gray-800 dark:text-gray-200',
					border: 'border-gray-300 dark:border-gray-700',
					accent: 'bg-gray-500 dark:bg-gray-400'
				};
			case 500: // Internal Server Error
				return {
					bg: 'bg-gray-900 dark:bg-gray-100',
					text: 'text-white dark:text-gray-900',
					border: 'border-gray-700 dark:border-gray-300',
					accent: 'bg-gray-800 dark:bg-gray-200'
				};
			case 502: // Bad Gateway
				return {
					bg: 'bg-orange-100 dark:bg-orange-900',
					text: 'text-orange-800 dark:text-orange-200',
					border: 'border-orange-300 dark:border-orange-700',
					accent: 'bg-orange-500 dark:bg-orange-400'
				};
			case 503: // Service Unavailable
				return {
					bg: 'bg-teal-100 dark:bg-teal-900',
					text: 'text-teal-800 dark:text-teal-200',
					border: 'border-teal-300 dark:border-teal-700',
					accent: 'bg-teal-500 dark:bg-teal-400'
				};
			case 504: // Gateway Timeout
				return {
					bg: 'bg-cyan-100 dark:bg-cyan-900',
					text: 'text-cyan-800 dark:text-cyan-200',
					border: 'border-cyan-300 dark:border-cyan-700',
					accent: 'bg-cyan-500 dark:bg-cyan-400'
				};
			default: // Generic error
				return {
					bg: 'bg-gray-100 dark:bg-gray-900',
					text: 'text-gray-800 dark:text-gray-200',
					border: 'border-gray-300 dark:border-gray-700',
					accent: 'bg-gray-500 dark:bg-gray-400'
				};
		}
	}

	// Apply styles based on the error code.
	// const { styles, component } = getStyles(errorCode, LampEffect404 as Component);
	const styles = getStyles(errorCode);
</script>

<div
	class={`px-4  flex min-h-screen flex-col items-center justify-start ${styles.bg} transition-colors duration-500`}
>
	<div
		class={`rounded-lg border p-8 shadow-xl ${styles.border} w-full max-w-md transition-all duration-500 mt-32`}
	>
		<div class="mb-6 flex items-center">
			<div
				class={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${styles.accent} text-white transition-colors duration-500`}
			>
				<h1 class="text-2xl font-bold">{errorCode}</h1>
			</div>
			<div>
				<h2 class={`text-3xl font-semibold ${styles.text} transition-colors duration-500`}>
					{title}
				</h2>
			</div>
		</div>
		<p class={`mb-8 text-lg ${styles.text} transition-colors duration-500`}>{message}</p>
		<div class="flex justify-center">
			<button
				class="focus:ring-opacity-50 rounded-md bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				on:click={() => goto('/')}
			>
				Go Back
			</button>
		</div>
	</div>
</div>
