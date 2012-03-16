var kue = require('kue')
  , jobs = kue.createQueue();

var sequence = 0;

setInterval(
  function(){
    sequence += 1;
    (function(sequence){
      var job = jobs.create('email', {
      title: 'hello #' + sequence
    , to: 'mleveton@gmail.com'
    , body: 'hello from node tuts'
  }).attempts(5).priority('high').delay(1000).save();

  job.on('complete', function(){
 	console.log( 'job' + sequence + 'completed!');
 })

   job.on('failed', function(){
 	console.log( 'job' + sequence + 'failed!' )
 });

    job.on('progress', function(percentComplete){
 	console.log( 'job' + sequence + 'is' + percentComplete )
 });

})(sequence);  //this causes the sequence to be frozen
}
, 1000
);