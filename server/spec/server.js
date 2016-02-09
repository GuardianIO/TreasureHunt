var Q = require('q');
var post = Q.denodeify(require('request').post);

describe('treasureHunt server', function(){
  describe('POST /games', function(){
    it('returns a status code 200', function(){
      post('http://127.0.0.1:3000/games')
        .then(function(res){
          expect(res.statusCode).toBe(200);
        })
    });
  });
});
