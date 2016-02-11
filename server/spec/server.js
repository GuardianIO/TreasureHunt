var request = require('request-promise');

var server = {
  url:'http://127.0.0.1',
  port:3000
};

describe('treasureHunt server', function(){
  describe('POST /games', function(){

    var opts = {
          method:'POST',
          url:server.url + ':' + server.port + '/games',
          resolveWithFullResponse: true,
          json:true
        };

    it('should return a 200 status code', function(done){
      request(opts)
      .then(function(res){
          expect(res.statusCode).toBe(200);
          done();
        })
      .catch(function(err){
          done.fail('request error: ', err);
        })
    });

    it('should return a list', function(done){
      request(opts)
      .then(function(res){
          expect(Array.isArray(res.body)).toEqual(true);
          done();
        })
      .catch(function(err){
          done.fail('request err: ', err);
        });
    });
  });
});
