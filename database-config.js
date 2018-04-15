let client = redis.createClient({host : 'localhost', port : 6379});


client.on('connect',function(){
    console.log('Connected to Reddis')
});