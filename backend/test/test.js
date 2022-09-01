let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

chai.should();

chai.use(chaiHttp);

describe('API', () => {
    

    /*
    * Students
    */

    /*
    * Test the students get routes
    */
    describe("GET /api/students/grand-hallet", () => {
        it("IT SHOULD GET ALL THE STUDENTS", (done) => {
            //login first
            chai.request(server)
            .post('/api/teachers/login')  
            .send({
                'email': process.env.EMAIL_FOR_TEST,
                'password': process.env.PASSWORD_FOR_TEST,
                'school': 'grand-hallet',
            })
            .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.have.property('token');
            var token = res.body.token;

            chai.request(server)
            .get("/api/students/grand-hallet")
            .set('Authorization', 'JWT ' + token)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        });
        })

        it("IT SHOULD NOT GET ALL STUDENTS", (done) => {
            chai.request(server)
            .get("/api/students/grand-hallet/")
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })

        it("IT SHOULD NOT GET STUDENT BY ID", (done) => {
            const sid = 1;
            chai.request(server)
            .get("/api/students/id/" + sid)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })
    })



    /*
    * Teachers
    */

    /*
    * Test the teachers get routes
    */
    describe("GET /api/teachers/grand-hallet", () => {
        it("IT SHOULD GET ALL THE TEACHER", (done) => {
            //login first
            chai.request(server)
            .post('/api/teachers/login')  
            .send({
                'email': process.env.EMAIL_FOR_TEST,
                'password': process.env.PASSWORD_FOR_TEST,
                'school': 'grand-hallet',
            })
            .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.have.property('token');
            var token = res.body.token;

            chai.request(server)
            .get("/api/teachers/grand-hallet")
            .set('Authorization', 'JWT ' + token)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        });
        })

        it("IT SHOULD NOT GET ALL THE TEACHER", (done) => {
            chai.request(server)
            .get("/api/students/grand-hallet")
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        });

        it("IT SHOULD NOT GET TEACHER BY ID", (done) => {
            const tid = 2;
            chai.request(server)
            .get("/api/teachers/id/" + tid)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })
    })



    /*
    * Trusted Students
    */

    /*
    * Test the Trusted Students get routes
    */
    describe("GET /api/trusted-students/grand-hallet", () => {
        it("IT SHOULD GET ALL THE TRUSTED STUDENTS", (done) => {
            //login first
            chai.request(server)
            .post('/api/teachers/login')  
            .send({
                'email': process.env.EMAIL_FOR_TEST,
                'password': process.env.PASSWORD_FOR_TEST,
                'school': 'grand-hallet',
            })
            .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.have.property('token');
            var token = res.body.token;

            chai.request(server)
            .get("/api/trusted-students/grand-hallet")
            .set('Authorization', 'JWT ' + token)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        });
        })

        it("IT SHOULD NOT GET ALL THE TRUSTED STUDENTS", (done) => {
            chai.request(server)
            .get("/api/trusted-students/grand-hallet")
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        });

        it("IT SHOULD NOT GET TRUSTED STUDENT BY ID", (done) => {
            const tsid = 30;
            chai.request(server)
            .get("/api/trusted-students/id/" + tsid)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })
    })



    /*
    * Trusted Teachers
    */

    /*
    * Test the Trusted Teachers get routes
    */
    describe("GET /api/trusted-teachers/grand-hallet", () => {
        it("IT SHOULD GET ALL THE TRUSTED TEACHERS", (done) => {
            //login first
            chai.request(server)
            .post('/api/teachers/login')  
            .send({
                'email': process.env.EMAIL_FOR_TEST,
                'password': process.env.PASSWORD_FOR_TEST,
                'school': 'grand-hallet',
            })
            .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.have.property('token');
            var token = res.body.token;

            chai.request(server)
            .get("/api/trusted-teachers/grand-hallet")
            .set('Authorization', 'JWT ' + token)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        });
        })

        it("IT SHOULD NOT GET ALL THE TRUSTED TEACHERS", (done) => {
            chai.request(server)
            .get("/api/trusted-teachers/grand-hallet")
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        });

        it("IT SHOULD NOT GET TRUSTED TEACHER BY ID", (done) => {
            const ttid = 410;
            chai.request(server)
            .get("/api/trusted-teachers/id/" + ttid)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })
    })


    /*
    * News
    */

    /*
    * Test the News get routes
    */
    describe("GET /api/news/grand-hallet", () => {
        it("IT SHOULD GET ALL THE NEWS", (done) => {
            chai.request(server)
            .get("/api/news/grand-hallet")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        });

        it("IT SHOULD NOT GET NEWS BY ID", (done) => {
            const nid = 102;
            chai.request(server)
            .get("/api/news/id/" + nid)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })
    })



    /*
    * Calendar Events
    */

    /*
    * Test the Calendar get routes
    */
    describe("GET /api/calendar/grand-hallet", () => {
        it("IT SHOULD GET ALL THE EVENTS", (done) => {
            chai.request(server)
            .get("/api/calendar/grand-hallet")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        });

        it("IT SHOULD NOT GET EVENT BY TARGET", (done) => {
            const target = "p2";
            chai.request(server)
            .get("/api/calendar/target/" + target)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })

        it("IT SHOULD NOT GET EVENT BY ID", (done) => {
            const eid = 478;
            chai.request(server)
            .get("/api/calendar/id/" + eid)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })
    })


    /*
    * Outings
    */

    /*
    * Test the Outings get routes
    */
    describe("GET /api/outings/grand-hallet", () => {
        it("IT SHOULD GET ALL THE OUTINGS", (done) => {
            //login first
            chai.request(server)
            .post('/api/teachers/login')  
            .send({
                'email': process.env.EMAIL_FOR_TEST,
                'password': process.env.PASSWORD_FOR_TEST,
                'school': 'grand-hallet',
            })
            .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.have.property('token');
            var token = res.body.token;

            const target = "m0";
            chai.request(server)
            .get("/api/outings/grand-hallet/target/" + target)
            .set('Authorization', 'JWT ' + token)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        });
        })

        it("IT SHOULD NOT GET ALL THE OUTINGS", (done) => {
            const target = "m0";
            chai.request(server)
            .get("/api/outings/grand-hallet/target/" + target)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        });

        it("IT SHOULD NOT GET OUTING BY ID", (done) => {
            const oid = 102;
            chai.request(server)
            .get("/api/outings/id/" + oid)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })
    })



    /*
    * Documents
    */

    /*
    * Test the Documents get routes
    */
    describe("GET /api/documents/grand-hallet", () => {
        it("IT SHOULD GET ALL THE DOCUMENTS", (done) => {
            //login first
            chai.request(server)
            .post('/api/teachers/login')  
            .send({
                'email': process.env.EMAIL_FOR_TEST,
                'password': process.env.PASSWORD_FOR_TEST,
                'school': 'grand-hallet',
            })
            .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.have.property('token');
            var token = res.body.token;

            target = "p2";
            chai.request(server)
            .get("/api/documents/grand-hallet/target/" + target)
            .set('Authorization', 'JWT ' + token)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        });
        })

        it("IT SHOULD NOT GET DOCUMENTS BY TARGET", (done) => {
            const target = "m0";
            chai.request(server)
            .get("/api/documents/grand-hallet/target/" + target)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })

        it("IT SHOULD NOT GET DOCUMENT BY ID", (done) => {
            const did = 1254;
            chai.request(server)
            .get("/api/documents/id/" + did)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })
    })



    /*
    * Announcements
    */

    /*
    * Test the Announcements get routes
    */
    describe("GET /api/announcements/grand-hallet", () => {
        it("IT SHOULD GET ALL THE ANNOUNCEMENTS", (done) => {
            //login first
            chai.request(server)
            .post('/api/teachers/login')  
            .send({
                'email': process.env.EMAIL_FOR_TEST,
                'password': process.env.PASSWORD_FOR_TEST,
                'school': 'grand-hallet',
            })
            .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.have.property('token');
            var token = res.body.token;

            const target = "p5";
            chai.request(server)
            .get("/api/announcements/grand-hallet/target/" + target)
            .set('Authorization', 'JWT ' + token)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        });
        })
        
        it("IT SHOULD NOT GET ANNOUNCEMENTS BY TARGET", (done) => {
            const target = "p5";
            chai.request(server)
            .get("/api/announcements/target/" + target)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })

        it("IT SHOULD NOT GET ANNOUNCEMENT BY ID", (done) => {
            const aid = 1254;
            chai.request(server)
            .get("/api/announcements/id/" + aid)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            })
        })
    })



});


