<script context="module">
	export const prerender = true
</script>

<script>
	import Project from '$lib/components/Project.svelte'
	import ButtonLink from '$lib/components/ButtonLink.svelte'
</script>

<svelte:head>

<title>Matt Jennings | Projects</title>
</svelte:head>

<div class="space-y-8">
	<Project
		title="Tradebreaker"
		img="/tradebreaker.png"
		web="https://tradebreaker.io"
		iOS="https://apps.apple.com/us/app/tradebreaker/id1471192218"
		android="https://play.google.com/store/apps/details?id=xyz.appmaker.szwfyz&hl=en_CA"
	>
	Aggregates NHL news on Twitter and notifies you when they are added. It uses Natural Language
	Processing to parse the tweets from select NHL insiders and detect whether or not it's actual
	news. While it's not perfect, it is still a reliable way to be notified within seconds of news
	breaking on Twitter.
	</Project>
	<Project
		title="Megaman X Eclipse"
		web="http://mmxeclipse.blogspot.com"
		download="https://sites.google.com/site/mmxeclipse/home/Megaman%20X%20Eclipse%20Demo%20v1.02.zip?attredirects=0&d=1"
		video="https://www.youtube.com/embed/ZdOGiwa5c7E"
	>
	A Megaman X fan game that my brother and I worked on while I was in high school. I spent many,
	many hours on trying to imitate the physics of the original game. We were able to release a demo
	in 2013 with 1 complete level, but we decided to take an indefinite break after that and
	unfortunately never came back to it. However, it's still one of my most proud accomplishments.

    It was originally written in GameMaker, but I'd like to remake it in another engine someday. The video is a fan playing through the level.
    </Project>

    <Project
    	title="svelte-phaser"
    	web="https://svelte-phaser.com"
    	github="https://github.com/mattjennings/svelte-phaser"
    	img="/svelte-phaser.png">
    A Svelte framework to write Phaser games. It's fairly experimental, but I've been able to make a
    few example games and it's showing promise. I'm currently working on a companion build tool
    similar to Sapper/SvelteKit as well.
    </Project>

    <Project
    	title="Rooster Teeth Nextjs"
    	web="https://rt.mattjennings.vercel.app"
    	github="https://github.com/mattjennings/roosterteeth-nextjs"
    	img="/rt-nextjs.png">
    An alternative to roosterteeth.com built with Nextjs. Supports logging in with RT account.
    </Project>

    <div class="flex justify-center sm:justify-end pb-8">
    		<ButtonLink href="https://github.com/mattjennings" rel="external">
    		Check out the rest on GitHub
    		</ButtonLink>
    </div>

</div>
