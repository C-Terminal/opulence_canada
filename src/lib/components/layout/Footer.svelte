<script>
	const currentYear = new Date().getFullYear();

	// Placeholder data - replace with actual links/structure as needed
	const linkSections = [
		{
			title: 'Company',
			links: [
				{ name: 'About Us', href: '/about' },
				{ name: 'Careers', href: '/careers' },
				{ name: 'Press', href: '/press' },
			]
		},
		{
			title: 'Services',
			links: [
				{ name: 'Foreign Exchange', href: '/forex' },
				{ name: 'Remittance', href: '/remittance' },
				{ name: 'Money Orders', href: '/money-orders' },
				{ name: 'Virtual Currency', href: '/crypto' },
			]
		},
		{
			title: 'Legal',
			links: [
				{ name: 'Privacy Policy', href: '/privacy' },
				{ name: 'Terms of Service', href: '/terms' },
				{ name: 'Cookie Policy', href: '/cookies' },
			]
		},
		{
			title: 'Support',
			links: [
				{ name: 'Contact Us', href: '/contact' },
				{ name: 'Help Center', href: '/help' },
				{ name: 'FAQs', href: '/faq' },
			]
		}
	];

</script>


<footer class="bg-background-dark-secondary/50 dark:bg-background-dark-secondary border-t border-gray-200 dark:border-gray-700/50 text-text-light dark:text-text-dark-muted">
	<!-- TODO: change grib layout -->
	<div class="container mx-auto px-4 py-12 md:py-16">
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
			<div class="col-span-2 md:col-span-4 lg:col-span-1 mb-6 lg:mb-0">
                 <a href="/" class="flex items-center space-x-2 mb-4" aria-label="Homepage">
                    <span class="text-lg font-semibold text-text-dark">Opulent Canada</span>
                </a>
                <p class="text-sm">
                    Innovating the future of financial services.
                </p>
            </div>

			{#each linkSections as section}
				<div>
					<h3 class="text-sm font-semibold uppercase tracking-wider text-text-dark mb-4">{section.title}</h3>
					<ul class="space-y-3">
						{#each section.links as link}
							<li>
								<a href={link.href} class="text-sm hover:text-primary-light dark:hover:text-secondary transition-colors duration-200">
									{link.name}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700/50 flex flex-col md:flex-row items-center justify-between text-sm">
			<div class="text-center md:text-left mb-4 md:mb-0">
				<p>&copy; {currentYear} Opulent Canada Inc. All rights reserved.</p>
                <p class="mt-1 text-xs opacity-80">
                    Financial services involve risk. Please read our full disclosures and terms. Not investment advice.
                </p>
                <p class="mt-1 text-xs opacity-80">
                    Based in Mississauga, ON, Canada. Current time: {new Date().toLocaleTimeString('en-US', { timeZone: 'America/Toronto' })} EDT.
                </p>
			</div>

			<div class="flex space-x-5">
				<a href="#" aria-label="Twitter" class="hover:text-primary-light dark:hover:text-secondary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary dark:focus-visible:ring-offset-background-dark-secondary rounded-sm">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M... (Twitter path) ..."/></svg>
				</a>
				<a href="#" aria-label="LinkedIn" class="hover:text-primary-light dark:hover:text-secondary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary dark:focus-visible:ring-offset-background-dark-secondary rounded-sm">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M... (LinkedIn path) ..."/></svg>
				</a>
				<a href="#" aria-label="Facebook" class="hover:text-primary-light dark:hover:text-secondary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary dark:focus-visible:ring-offset-background-dark-secondary rounded-sm">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M... (Facebook path) ..."/></svg>
				</a>
			</div>
		</div>
	</div>
</footer>

<style >
	/* Add specific styles if needed, e.g., for icons */

</style>