import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { FormGroup, Label, Input, Col, Button } from 'reactstrap';
import './login.css';
import { Alert } from 'reactstrap';
import fire from './config/fire';

const useStyles = makeStyles({
    root: {
        maxWidth: 370,
        height: 270,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    },
    eroot: {
        maxWidth: 370,
        height: 310,
        boxShadow: '0 3px 5px 2px rgba(255, 30, 145, .3)'
    },
    signup: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',

    },
    login: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',

    },
});

export default function MCard() {
    const [password, setpassword] = useState<string>('');
    const [email, setemail] = useState<string>('');
    const [pass, setpass] = useState<string>('');
    const [status, setstatus] = useState<string>('');
    const [col, setcol] = useState<string>('');
    const [Lpassword, setLpassword] = useState<string>('');
    const [Lemail, setLemail] = useState<string>('');
    const [stat, setstat] = useState<string>('');
    const [co, setco] = useState<string>('');


    const classes = useStyles();
    const handleChange = (e: any) => {
        e.preventDefault();
        if (password !== '' && email !== '' && pass !== '') {
            console.log('in1')
            if (password.length > 6) {
                console.log('in')
                if (pass !== password) {
                    setstatus("Your passwords do not match");
                    setcol("danger");
                }
                else {
                    fire.auth().createUserWithEmailAndPassword(email, password).then((u) => {
                    }).then((u) => {
                        console.log(u)
                        setstatus("Your submission have been confirmed");
                        setcol("success");
                    })
                        .catch((error) => {
                            console.log(error);
                            setstatus(error.message);
                            setcol("danger");
                        })
                }
            }
            else {
                setstatus("Please provide a stronger password with minimum length of password being 7");
                setcol("danger");
            }
        }
        else {
            setstatus("Please fill all the details in the form");
            setcol("danger");
        }
    }
    const handleLog = (e: any) => {
        e.preventDefault();
        if (Lpassword !== '' && Lemail !== '') {
            fire.auth().signInWithEmailAndPassword(Lemail, Lpassword)
                .then((u) => {
                    console.log(u);
                    // setstat(u);
                    //setco("success");
                })
                .catch((error) => {
                    console.log(error);
                    setstat(error.message);
                    setco("danger");
                });
        }
        else {
            setstat("Please fill all the credentials");
            setco("danger");
        }
    }
    return (
        <>
            <div className="m100r">
                <Card className={classes.root}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <h3><strong><div className="p10">Log In</div></strong></h3>
                        </div>
                        <div className="row p-2 m20">
                            <div className="col-12">
                                <FormGroup row>
                                    <Label md={4} htmlFor="email">Email</Label>
                                    <Col md={8}>
                                        <Input type="email" id="emailL" name="emailL" placeholder="Email" value={Lemail} onChange={(e) => { setLemail(e.target.value) }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={4} htmlFor="password">Password</Label>
                                    <Col md={8}>
                                        <Input type="password" id="passwordL" name="passwordL" placeholder="Password" value={Lpassword} onChange={(e) => { setLpassword(e.target.value) }} />
                                    </Col>
                                </FormGroup>
                                <div className="bmar m20"><Button className={classes.login} onClick={handleLog} >Log In</Button></div>
                            </div>
                        </div>
                    </div>
                </Card>
                <br />
                {stat !== "" ? <Alert color={co} fade={true}>
                    {stat}
                </Alert> : null}
            </div>

            <div className="m100l">
                <Card className={classes.eroot}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <h3><strong><div className="p10">Sign Up</div></strong></h3>
                        </div>
                        <div className="row p-2 m10">
                            <div className="col-12">
                                <FormGroup row>
                                    <Label md={4} htmlFor="email">Email</Label>
                                    <Col md={8}>
                                        <Input type="email" id="emailS" name="emailS" placeholder="Email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={4} htmlFor="password">Password</Label>
                                    <Col md={8}>
                                        <Input type="password" id="passwordS" name="passwordS" placeholder="Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={4} htmlFor="password">Confirm Password</Label>
                                    <Col md={8}>
                                        <Input type="password" id="passwordC" name="passwordC" placeholder="Confirm Password" value={pass} onChange={(e) => { setpass(e.target.value) }} />
                                    </Col>
                                </FormGroup>
                                <div className="bmar"><Button className={classes.signup} onClick={handleChange} >Sign Up</Button></div>
                            </div>
                        </div>
                    </div>
                </Card>
                <br />
                {status !== "" ? <Alert color={col} fade={true}>
                    {status}
                </Alert> : null}
            </div>
        </>
    )
}