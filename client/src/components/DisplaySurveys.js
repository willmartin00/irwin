import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';
import exportFromJSON from 'export-from-json'

function DisplaySurveys() {
    const { user, isAuthenticated } = useAuth0();
    const [surveys, setSurveys] = useState([]);

    let submit = async () => {
        fetch('http://localhost:7000/formresponses', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: user.email }),
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            setSurveys(data)
            console.log(data)
        })
    };

    let download = async (index) => {

        let responses_arr = []

        await fetch('http://localhost:7000/dlresponses', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ code: surveys[index].code }),
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
            responses_arr = data
        })

        for (let i = 0; i < responses_arr.length; i++) {
            responses_arr[i].prompts = JSON.parse(responses_arr[i].prompts)
            console.log('prompts')
            console.log(responses_arr[i].prompts)
        }

        for (let i = 0; i < responses_arr.length; i++) {
            let temp_prompts = responses_arr[i].prompts
            for (let j = 0; j < temp_prompts.length; j++) {
                responses_arr[i][temp_prompts[j][0]] = temp_prompts[j][2]
            }
        }

        for (let i = 0; i < responses_arr.length; i++) {
            delete responses_arr[i].prompts
            delete responses_arr[i].__v
            delete responses_arr[i]._id
            responses_arr[i].survey_title = eval(surveys[index].form)[0].title
        }

        console.log('responses_arr')
        console.log(responses_arr)

        const fileName = "responses_" + eval(surveys[index].form)[0].title
        const exportType = 'csv'

        exportFromJSON({ data: responses_arr, fileName, exportType })

    }

    if (isAuthenticated) {
        return (
            <div className="form-builder">
                <button className="surveyor-button" onClick={submit}>Load Surveys</button>
                <div>
                    <br></br>
                    <h1>Surveys</h1>
                    <br></br>
                </div>
                {surveys.map((survey, index) => {
                    return (
                        <div key={index} className="field">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{eval(survey.form)[0].title}</Card.Title>
                                </Card.Body>
                                <button onClick={() => download(index)}>Download Responses</button>
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default DisplaySurveys;