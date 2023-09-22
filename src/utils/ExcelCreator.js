import React from 'react';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {get} from "lodash";

const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);

    const wb = {Sheets: {data: ws}, SheetNames: ["data"]};

    const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});

    const data = new Blob([excelBuffer], {type: fileType});

    FileSaver.saveAs(data, fileName + fileExtension);
};

export const exportToCSVStudentDormitory = (headerData, apiData, fileName) => {
    const studentList = apiData.map((item) => {
        let student = {};
        const reasons = item?.reasons && JSON.parse(item?.reasons) || [];
        student["faculty"] = get(item, 'faculty');
        student["course"] = get(item, 'course') || '';
        student["date"] = get(item, 'createdDate') || '';
        student["studentSpecialty"] = get(item, 'studentSpecialty') || ''
        student["phone"] = get(item, 'studentPhone') || '';
        student["login"] = get(item, 'studentLogin') || '';
        student["name"] = get(item, 'Student ismi') || '';
        student["gender"] = get(item, 'gender') || '';
        student["studentBirthDate"] = get(item, 'birthDate') || '';
        student["dormitory"] = get(item, 'yotoqxona nomi') || '';
        student["group"] = get(item, 'studentGroup') || '';
        for (let i = 0; i < headerData.length; i++) {
            if (reasons?.filter(item => {
                return item === headerData[i].key
            }).length > 0) {
                student[headerData[i].key] = '+';
            }else {
                student[headerData[i].key] = '-';
            }
        }
        return student;
    });

    const worksheet = XLSX.utils.json_to_sheet(studentList);

    const datas = ["Fakultet", "Kurs", "Yaratilgan vaqt", "Yonalish", "Tefon raqam", "Login", "Ismi","Jinsi","Tug'ilgan sana","Yotoqxona","Guruhi"];

    headerData.forEach((item) => {
        datas.push(item?.key);
    });


    XLSX.utils.sheet_add_aoa(worksheet, [datas], {origin: "A1"});

    const wb = {Sheets: {data: worksheet}, SheetNames: ["data"]};

    // Write the workbook to an Excel buffer
    const excelBuffer = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'array',
        sheetFormat: {
            baseColWidth: 30,
            defaultRowHeight: 30,
        },
    });

    // Create a Blob from the Excel buffer
    const data = new Blob([excelBuffer], {type: fileType});

    // Save the Blob as a file
    FileSaver.saveAs(data, fileName + fileExtension);
};
export const exportToCSVAriza = (headerData, apiData, fileName) => {
    const studentList = apiData.map((item) => {
        let student = {};
        const reasons = item?.reasons ? JSON.parse(item?.reasons) : [];
        student["faculty"] = get(item, 'faculty');

        student["course"] = get(item, 'course') || '';
        student["date"] = get(item, 'createdDate') || '';
        student["studentSpecialty"] = get(item, 'specialty') || ''
        student["group"] = get(item, 'group') || ''
        student["phone"] = get(item, 'phone') || '';
        student["login"] = get(item, 'login') || '';
        student["name"] = get(item, 'name') || '';
        student["gender"] = get(item, 'gender') || '';
        student["studentBirthDate"] = get(item, 'birthDate') || '';
        for (let i = 0; i < headerData.length; i++) {
            if (reasons?.filter(item => {
                return item === headerData[i].key
            }).length > 0) {
                student[headerData[i].key] = '+';
            }else {
                student[headerData[i].key] = '-';
            }
        }
        return student;
    });

    const worksheet = XLSX.utils.json_to_sheet(studentList);

    const datas = ["Fakultet", "Kurs", "Yaratilgan vaqt", "Yonalish", "Guruh", "Tefon raqam", "Login", "Ismi","Jinsi","Tug'ilgan sana"];

    headerData.forEach((item) => {
        datas.push(item?.key);
    });


    XLSX.utils.sheet_add_aoa(worksheet, [datas], {origin: "A1"});

    const wb = {Sheets: {data: worksheet}, SheetNames: ["data"]};

    // Write the workbook to an Excel buffer
    const excelBuffer = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'array',
        sheetFormat: {
            baseColWidth: 30,
            defaultRowHeight: 30,
        },
    });

    // Create a Blob from the Excel buffer
    const data = new Blob([excelBuffer], {type: fileType});

    // Save the Blob as a file
    FileSaver.saveAs(data, fileName + fileExtension);
};