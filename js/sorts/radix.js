//radix_pause() / radix_resume() for pausing/resuming
//radix_reset() for resetting (please give parameters)
let radix_stop = false;
let radix_pauses = 1;
var radix_delay = document.getElementById("radix_delay");
let radix_base = 2;

async function getMax(array){
	let max = 0;
	for (let i in array) {
		num = array[i];
		max = (max < num.toString().length) ? num.toString().length : max;
	}
	return max;
}

function getPosition(num,place){
	return Math.floor(num / Math.pow(radix_base,place)) % radix_base;
}

async function radix_sort_util(array, target_canvas, palette){
	var max = await getMax(array);
	for (let i = 0; i < max; i++) {
		let sorted = true;
		/*Makes an array of empty arrays with length radix_base*/
		let buckets = Array.from({length:radix_base}, () => []);
		for (let j = 0; j < array.length; j++){
			buckets[getPosition(array[j].value, i)].push(array[j]);
			array[j].id=1;
			drawArray(target_canvas, array, palette);
			do{
				radix_delay = document.getElementById("radix_delay");
				await sleep(radix_delay.value);
				if(radix_stop) return radix_stop=false;
			}while(radix_pauses > 0)
			array[j].id=0;
			if(j<array.length-1)sorted = sorted && array[j].value < array[j+1].value;
		}
		if(sorted)break;
		let g=0;
		for(let i=0;i<buckets.length;i++){
			for(let j=0;j<buckets[i].length;j++){
				array[g] = clone(buckets[i][j]);
				array[g].id=1;
				drawArray(target_canvas, array, palette);
				do{
					radix_delay = document.getElementById("radix_delay");
					await sleep(radix_delay.value);
					if(radix_stop) return radix_stop=false;
				}while(radix_pauses > 0)
				array[g].id=0;
				g++;
			}
		}
	}
	while(!radix_stop)await sleep(radix_delay.value);
	return radix_stop=false;
}
function radix_sort(target_canvas, n, palette){
	radix_base = Number(document.getElementById("radix_base").value);
	radix_base = radix_base < 2 ? 2 : radix_base;
	let target_array=make_shuffeled_piloni(n);
	radix_sort_util(target_array, target_canvas, palette);
}
async function radix_reset(target_canvas, n, palette){
	if(radix_stop)return;
	//console.log("entered");
	radix_stop=true;
	while(radix_stop) await sleep(1);
	//console.log("exited");
	
	radix_sort(target_canvas, n, palette);
}

function radix_pause(){
	radix_pauses++;
}

function radix_resume(){
	radix_pauses--;
	radix_pauses = Math.max(radix_pauses, 0);
}
