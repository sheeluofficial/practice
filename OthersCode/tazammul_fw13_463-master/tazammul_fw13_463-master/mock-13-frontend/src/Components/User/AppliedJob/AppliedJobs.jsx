import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import "./AppliedJobs.style.css"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"

TimeAgo.addDefaultLocale(en)


var url = "https://moc-13.herokuapp.com";

function AppliedJobs() {

    const data = useSelector((state) => state.appliedData)

    const timeAgo = new TimeAgo('en-US')

  return (
    <div id={"job-listing"}>
        <h1>Applied Jobs</h1>
        <div id='jobs'>
            {data.map((el, i)=>{
                return <div className='card' key={i}>
                    <img src='https://s3.amazonaws.com/cdn.designcrowd.com/blog/2017/April/35-Famous-Square-Logos/1_400.png' />
                    <div>{timeAgo.format(Date.now() -  new Date(el.createdAt) )} . {el.contract}</div>
                    <h3>{el.position}</h3>
                    <p>{el.company}</p>
                    <h4>{el.location}</h4>
                </div>
            })}
        </div>
    </div>
  )
}

export default AppliedJobs