var kue = require('kue')
  , jobs = kue.createQueue();

jobs.process('email', 10, function(job, done){
	console.log(job.data)
    setTimeout(function(){
      try{
      	throw new Error('something went wrong');
      	done();
      } catch(err){
      	done(err);
      }
    },3000)
    
});