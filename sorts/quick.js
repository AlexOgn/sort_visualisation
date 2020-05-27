//queck_pause() / quick_resume() for pausing/resuming
//quick_reset() for resetting (please give parameters)
let quick_stop = false;
let quick_pauses = 1;
var quick_target_array=[];
function partition(left, right) {
	var pivot   = quick_target_array[Math.floor((right + left) / 2)], //middle element
		i	   = left, //left pointer
		j	   = right; //right pointer
	while (i < j) {
		while (quick_target_array[i].value < pivot.value) {
			i++;
		}
		while (quick_target_array[j].value > pivot.value) {
			j--;
		}
		if (i < j) {
			let buff = clone(quick_target_array[i]);
			quick_target_array[i] = clone(quick_target_array[j]);
			quick_target_array[j] = buff;
			i++;
			j--;
		}
	}
	return i;
}

async function quick_sort_util(left, right, target_canvas, delay, palette) {
	var index;
	index = partition(left, right);
	if (left < index - 1){
		if(index>0){
			quick_target_array[index-1].id=0
		}
		quick_target_array[index].id=1
		
		if(left>0){
			quick_target_array[left-1].id=0
		}
		/////
		quick_target_array[left].id=1
		drawArray(target_canvas, quick_target_array, palette);
		do{
			await sleep(delay);
			if(quick_stop) return quick_stop=false;
		}while(quick_pauses > 0)
		await quick_sort_util(left, index - 1, target_canvas, delay, palette);
		////
	}
	if (index < right){
		if(index>0){
			quick_target_array[index-1].id=0
		}
		quick_target_array[index].id=1
		
		if(right>0){
			quick_target_array[right-1].id=0
		}
		////
		quick_target_array[right].id=1;
		drawArray(target_canvas, quick_target_array, palette);
		do{
			await sleep(delay);
			if(quick_stop) return quick_stop=false;
		}while(quick_pauses > 0)
		await quick_sort_util(index, right, target_canvas, delay, palette);
		////
		
	}
}
async function quick_sort(target_canvas, n, delay, palette){
	for(let i = 0 ; i < n ; i++){
		quick_target_array[i] = new Pilon(i+1);
	}
	quick_target_array.sort(() => Math.random() - 0.5);
	quick_sort_util(0, n-1, target_canvas, delay, palette);
	while(!quick_stop)await sleep(delay);
	return quick_stop=false;
}
async function quick_reset(target_canvas, n, delay, palette){
	quick_stop=true;
	while(quick_stop) await sleep(10);
	
	quick_sort(target_canvas, n, delay, palette);
}

function quick_pause(){
	quick_pauses++;
}

function quick_resume(){
	quick_pauses--;
	quick_pauses = Math.max(quick_pauses, 0);
}
