<script>
	import { onMount } from "svelte";

	// Reactive current year
	let currentYear = $state(new Date().getFullYear());

	// Reactive time for Toronto
	let currentTime = $state(new Date().toLocaleTimeString('en-US', { timeZone: 'America/Toronto' }));

	// Update time every second
	onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Toronto' });
		}, 1000);
		return () => clearInterval(interval);
	});

	// Placeholder data - replace with actual links/structure as needed
	const linkSections = [
		{
			title: 'Company',
			links: [
				{ name: 'About Us', href: '/about' },
				{ name: 'Careers', href: '/careers' },
				{ name: 'Press', href: '/press' }
			]
		},
		{
			title: 'Services',
			links: [
				{ name: 'Foreign Exchange', href: '/forex' },
				{ name: 'Remittance', href: '/remittance' },
				{ name: 'Money Orders', href: '/money-orders' },
				{ name: 'Virtual Currency', href: '/crypto' }
			]
		},
		{
			title: 'Legal',
			links: [
				{ name: 'Privacy Policy', href: '/privacy' },
				{ name: 'Terms of Service', href: '/terms' },
				{ name: 'Cookie Policy', href: '/cookies' }
			]
		},
		{
			title: 'Support',
			links: [
				{ name: 'Contact Us', href: '/contact' },
				{ name: 'Help Center', href: '/help' },
				{ name: 'FAQs', href: '/faq' }
			]
		}
	];
</script>

<footer
  class="bg-fintech-white font-sans dark:bg-fintech-dark border-t border-fintech-light-gray dark:border-fintech-muted text-gray-900 dark:text-gray-200"
>
  <div class="container mx-auto px-4 py-12 md:py-16">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
      <!-- Branding Section -->
      <div class="col-span-2 lg:col-span-1 mb-6 lg:mb-0">
        <a
          href="/"
          class="flex items-center space-x-2 mb-4"
          aria-label="Opulence Canada Homepage"
        >
          <span
            class="text-lg font-semibold text-fintech-red-canadian dark:text-fintech-red-canadian"
          >
            Opulence Canada
          </span>
        </a>
        <p class="text-sm text-gray-600 dark:text-gray-200">
          Innovating the future of financial services.
        </p>
      </div>

      <!-- Link Sections -->
      {#each linkSections as section}
        <div>
          <h3
            class="text-sm font-semibold uppercase tracking-wider text-fintech-red-canadian dark:text-fintech-red-canadian mb-4"
          >
            {section.title}
          </h3>
          <ul class="space-y-3">
            {#each section.links as link}
              <li>
                <a
                  href={link.href}
                  class="text-md text-gray-600 dark:text-gray-200 hover:text-fintech-red-canadian dark:hover:text-fintech-red-canadian transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-fintech-red-canadian focus:ring-offset-2 dark:focus:ring-offset-fintech-dark"
                >
                  {link.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <!-- Bottom Section -->
    <div
      class="mt-10 pt-8 border-t border-fintech-light-gray dark:border-fintech-muted flex flex-col md:flex-row items-center justify-between text-sm"
    >
      <div class="text-center md:text-left mb-4 md:mb-0">
        <p class="text-gray-600 dark:text-gray-200">
          © {currentYear} Opulence Canada Inc. All rights reserved.
        </p>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-200 opacity-80">
          Financial services involve risk. Please read our full disclosures and terms. Not investment advice.
        </p>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-200 opacity-80">
          Based in Mississauga, ON, Canada. Current time: {currentTime} EDT.
        </p>
      </div>

      <!-- <div class="flex space-x-5">
        <a
          href="https://twitter.com"
          aria-label="Twitter"
          class="text-gray-600 dark:text-gray-200 hover:text-fintech-red-canadian dark:hover:text-fintech-red-canadian transition-colors focus:outline-none focus:ring-2 focus:ring-fintech-red-canadian focus:ring-offset-2 dark:focus:ring-offset-fintech-dark rounded-sm"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878a4.675 4.675 0 0 1-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568a4.68 4.68 0 0 1-2.103.08c.592 1.847 2.313 3.192 4.353 3.228A9.394 9.394 0 0 1 0 19.822a13.175 13.175 0 0 0 7.141 2.094c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.322-2.41l-.063-.03z"
            />
          </svg>
        </a>
        <a
          href="https://linkedin.com"
          aria-label="LinkedIn"
          class="text-gray-600 dark:text-gray-200 hover:text-fintech-red-canadian dark:hover:text-fintech-red-canadian transition-colors focus:outline-none focus:ring-2 focus:ring-fintech-red-canadian focus:ring-offset-2 dark:focus:ring-offset-fintech-dark rounded-sm"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.351V9.006h3.414v1.561h.048c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.28zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9.006h3.564v11.446zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"
            />
          </svg>
        </a>
        <a
          href="https://facebook.com"
          aria-label="Facebook"
          class="text-gray-600 dark:text-gray-200 hover:text-fintech-red-canadian dark:hover:text-fintech-red-canadian transition-colors focus:outline-none focus:ring-2 focus:ring-fintech-red-canadian focus:ring-offset-2 dark:focus:ring-offset-fintech-dark rounded-sm"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
        </a>
      </div> -->
    </div>
  </div>
</footer>