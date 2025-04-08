<svelte:head>
	<title>Admin Dashboard | FinFuture</title>
</svelte:head>

<div class="space-y-6">
    <h2 class="text-2xl font-semibold">Dashboard Overview</h2>
    <p class="text-text-light dark:text-text-dark-muted">Welcome to the administrative area.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="p-6 rounded-lg bg-white dark:bg-background-dark-secondary shadow">
            <h3 class="font-semibold text-lg">Users</h3>
            <p class="text-3xl font-bold mt-2">1,234</p>
            <p class="text-sm text-gray-500 dark:text-text-dark-muted">Registered Users</p>
        </div>
         <div class="p-6 rounded-lg bg-white dark:bg-background-dark-secondary shadow">
            <h3 class="font-semibold text-lg">Transactions</h3>
            <p class="text-3xl font-bold mt-2">5,678</p>
            <p class="text-sm text-gray-500 dark:text-text-dark-muted">Completed Today</p>
        </div>
         <div class="p-6 rounded-lg bg-white dark:bg-background-dark-secondary shadow">
            <h3 class="font-semibold text-lg">Revenue</h3>
            <p class="text-3xl font-bold mt-2">$15,8 K</p>
            <p class="text-sm text-gray-500 dark:text-text-dark-muted">Today's Estimate</p>
        </div>
    </div>

    <div class="mt-8 p-6 rounded-lg bg-white dark:bg-background-dark-secondary shadow">
        <h3 class="font-semibold text-lg mb-4">Recent Activity</h3>
        <p class="text-text-light dark:text-text-dark-muted">Activity feed or charts will be displayed here.</p>
    </div>
</div>