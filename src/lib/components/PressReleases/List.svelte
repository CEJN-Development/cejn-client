<script lang="ts">
	import type { PressRelease } from '$lib/types/PressReleases';

	export let pressReleases: PressRelease[] = [];
</script>

<h1 class="text-strong text-large stack-48">Press Releases</h1>
{#if pressReleases?.length > 0}
	{#each pressReleases as pressRelease}
		<section class="flex-reactive gap-16 stack-48">
			<div>
				<p class="text-strong text-normal stack-8">{pressRelease.title}</p>
				<div class="text-medium text-normal">
					{#each pressRelease.summary.split('\n\n') as paragraph}
						<p class="stack-8">{@html paragraph}</p>
					{/each}
					<a href={`/press/${pressRelease.slug}`}>Read full press release &gt;&gt;</a>
				</div>
			</div>
		</section>
		<hr class="separator stack-48" />
	{/each}
{:else}
	<p class="text-medium text-normal stack-48">There are currently no published press releases.</p>
	<hr class="separator stack-48" />
{/if}

<style>
	.separator {
		width: 80%;
		margin-left: auto;
		margin-right: auto;
	}

	.separator:last-child {
		width: 100%;
	}
</style>
