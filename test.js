const request = require('supertest');
const app = require('./server').app;

it('home page should return 302 redirect status', (done) => {
    request(app)
        .get('/')
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
        .end(done);
})

it('callback page should return 302 redirect status', (done) => {
    request(app)
        .get('/callback')
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
        .end(done);
})

it('data page should return 302 redirect status', (done) => {
    request(app)
        .get('/data')
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
        .end(done);
})

it('download page should return 302 redirect status', (done) => {
    request(app)
        .get('/download')
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
        .end(done);
})

