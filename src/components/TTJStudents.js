import React from 'react';
import {Select} from "antd";


const {Option} = Select;

function TtjStudents(props) {
    return (
        <div>
            <label htmlFor="Student">Sartirofka</label> <br/>
            <Select className='my-2 w-25' id='Student'>
                <Option  value=''>Arizasi bekor qilingan talabalar</Option>
                <Option  value=''>TTJ da turuvchi talabalar</Option>
            </Select>
        </div>
    );
}

export default TtjStudents;