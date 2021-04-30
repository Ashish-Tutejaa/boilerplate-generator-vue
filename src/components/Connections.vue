<template>
	<div :key="i" v-for="(connection, i) in connections">
		<div
			class="line"
			:style="{
				height: `${connection.ht}px`,
				top: `${connection.top + 40}px`,
				left: `${connection.left + 40}px`,
				transform: `rotate(${connection.rotate}deg)`,
			}"
		>
			<div class="color"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["comps", "update"],
	methods: {},
	computed: {
		connections: {
			get: function () {
				let ToAllowUpdates = this.update;
				(() => ToAllowUpdates)();

				let transf = {};
				this.comps.forEach((ele) => (transf[ele.name] = ele.id));
				let connections = [];
				this.comps.forEach((u) => {
					u.components.forEach((v) => {
						connections.push({ [transf[u.name]]: transf[v] });
					});
				});

				connections = connections.map((x_) => {
					let main = document.querySelector(".main");
					let first = document.getElementById(Object.keys(x_)[0]);
					let second = document.getElementById(
						x_[Object.keys(x_)[0]]
					);
					let first_c = first.getBoundingClientRect();
					let second_c = second.getBoundingClientRect();
					let y = Math.abs(first_c.left - second_c.left);
					let x = Math.abs(first_c.top - second_c.top);
					let ht = Math.sqrt(x * x + y * y),
						rotate = -1;
					if (first_c.left <= second_c.left) {
						//first is left
						if (second_c.top <= first_c.top)
							rotate =
								-1 * Math.atan(x / y) * (180 / Math.PI) - 90;
						else rotate = -1 * (Math.atan(y / x) * (180 / Math.PI));
					} else {
						//second is left
						if (second_c.top <= first_c.top)
							rotate = Math.atan(x / y) * (180 / Math.PI) + 90;
						else rotate = Math.atan(y / x) * (180 / Math.PI);
					}
					return {
						top: first_c.top + main.scrollTop,
						left: first_c.left,
						ht,
						rotate,
					};
				});
				// console.log(connections);
				return connections;
			},
		},
	},
};
</script>

<style scoped>
.line {
	width: 3px;
	background: black;
	position: absolute;
	transform-origin: left top;
}
.color {
	width: 3px;
	position: absolute;
	top: 0px;
	left: 0px;
	height: 80px;
	background: rgb(69, 197, 155);
	display: inline;
	margin: 0px;
	padding: 0px;
}
</style>