var collected = {}

exports.collect = function(measure, time){
  if(!collected[measure]){ 
  	collected[measure] = [];
    collected[measure].push(time);
}};

exports.summarize = function(){
  Object.keys(collected).forEach(function(key){
    var samples = collected[key];
	var sum = 0, average = 0;
	samples.forEach(function(sample) { sum += sample; });

    if (samples.length > 0){ 
		average = sum/samples.length
	}
	    console.log(key + ' average:' + average + 'ms')
	});
};