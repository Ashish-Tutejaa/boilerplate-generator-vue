<template>
	<div class="sidebar">
		<div class="items">
			<div>
				<svg
					@click="$emit('download')"
					xmlns="http://www.w3.org/2000/svg"
					enable-background="new 0 0 24 24"
					height="24px"
					viewBox="0 0 24 24"
					width="24px"
					fill="#fff"
				>
					<g><rect fill="none" height="24" width="24" /></g>
					<g>
						<path
							d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"
						/>
					</g>
				</svg>
				<svg
					@click="makeComp"
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 0 24 24"
					width="24px"
					fill="#fff"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
					/>
				</svg>
			</div>
			<p v-if="current">
				{{ current.name }}
			</p>
		</div>
		<div v-if="current" class="details">
			<div
				@click="currentKey = key"
				class="keys"
				v-for="(i, key, index) in current"
				:key="index"
			>
				<template v-if="key != 'id'">
					<svg
						:class="{
							rotate90: key === currentKey,
						}"
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						:fill="key === currentKey ? '#fff' : '#888'"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M8 5v14l11-7z" />
					</svg>
					<p>{{ key }}</p>
				</template>
			</div>
		</div>
		<div class="panel" v-if="current">
			<div
				v-if="
					current &&
					[
						'props',
						'methods',
						'emits',
						'components',
						'computed',
					].includes(currentKey)
				"
			>
				<array-panel :comp="current" :thingFor="currentKey" />
			</div>
			<div v-else-if="current && currentKey === 'watch'">
				<watch-panel :comp="current" />
			</div>
			<div v-else-if="current && currentKey === 'data'">
				<data-panel :comp="current" />
			</div>
			<div v-else-if="current && currentKey === 'name'">
				<name-panel :comp="current" />
			</div>
		</div>
	</div>
</template>

<script>
import ArrayPanel from "./ArrayPanel";
import WatchPanel from "./WatchPanel";
import DataPanel from "./DataPanel";
import NamePanel from "./NamePanel";

export default {
	components: {
		ArrayPanel,
		WatchPanel,
		DataPanel,
		NamePanel,
	},
	props: ["current"],
	data() {
		return {
			currentKey: "props",
			propInput: "",
		};
	},
	methods: {
		makeComp() {
			this.$emit("makeComp");
		},
	},
	watch: {
		current(cur, prev) {
			console.log(cur, prev);
		},
	},
};
</script>

<style scoped>
.sidebar {
	height: 100%;
	width: 30%;
	flex: 0 0 auto;
	background: var(--secondary-black);
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
}
.items {
	width: 100%;
	height: 50px;
	border-bottom: 1px solid gray;
	color: white;
	display: flex;
	align-items: center;
	flex-flow: row-reverse nowrap;
	justify-content: space-between;
}

.items p {
	margin: 0px 20px;
	padding: 3px;
	background: rgba(97, 131, 150, 0.616);
	border-radius: 3px;
	cursor: pointer;
}

.items svg {
	margin: 0px 20px;
	cursor: pointer;
	padding: 2px;
	border-radius: 3px;
	transition-duration: 100ms;
}
.items svg:hover {
	background: rgb(101, 134, 153);
}
.details {
	color: white;
	height: fit-content;
	width: 100%;
	box-sizing: border-box;
}
.keys {
	width: 100%;
	margin: 5px 0px;
	padding: 2px 10px;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.keys:hover {
	background: rgba(101, 134, 153, 0.246);
}
.keys p {
	margin: 0px 6px;
	cursor: pointer;
	color: rgb(218, 131, 218);
	font-weight: bold;
}
.keys svg {
	width: 17px;
	height: 17px;
	cursor: pointer;
}
.panel {
	width: 100%;
	padding: 0px;
	margin: 0px;
	margin-top: 20px;
	height: fit-content;
	border-top: 1px solid rgba(128, 128, 128, 0.438);
}
.rotate90 {
	transition-duration: 250ms;
	transform: rotate(90deg);
}
</style>