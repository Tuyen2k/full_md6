import axios from "axios";
import {Link} from "react-router-dom";
import React from "react";
import data from "bootstrap/js/src/dom/data";

export const saveMerchant = (merchant) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/merchants/register", merchant)
                .then(response => {
                    alert("Success")
                    }
                ).catch(() => {
                    alert("error save")
            })
        )
    })
}
export function findCity() {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/address")
                .then(response => {
                        return response.data;
                    }
                ).catch(() => {
                alert("error city data")
            })
        )
    })
}
    export function findDistrict(id_city) {
        return new Promise((resolve) => {
            resolve(
                axios.get("http://localhost:8080/api/address/district/" + id_city)
                    .then(response => {
                            return response.data;
                        }
                    ).catch(() => {
                    alert("error")
                })
            )
        })
    }
        export function findWard(id_district) {
            return new Promise((resolve) => {
                resolve(
                    axios.get("http://localhost:8080/api/address/ward/" + id_district)
                        .then(response => {
                                return response.data;
                            }
                        ).catch(() => {
                        alert("error ward")
                    })
                )
            })
        }
//     $.ajax({
//         type: "GET",
//         url: "http://localhost:8080/api/address/city",
//         success: function (data) {
//             let content = `<select id="city" onchange="findDistrict()"  class="select">`;
//             content += '<option value="">Choice a city...</option>';
//             for (let i = 0; i < data.length; i++) {
//                 content += '<option value="' + data[i].id_city + '">' + data[i].name + '</option>';
//             }
//             content += "</select>";
//             document.getElementById("select_city").innerHTML = content;
//         }
//     })
// }

// function findDistrict() {
//     let id_city = document.getElementById("city").value;
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8080/api/address/district${id_city}`,
//         success: function (data) {
//             let content = `<select class="select" onchange="findWard()" id="district">`;
//             content += '<option>Choice a district...</option>';
//             for (let i = 0; i < data.length; i++) {
//                 content += '<option value="' + data[i].id_district + '">' + data[i].name + '</option>';
//             }
//             content += "</select>";
//             document.getElementById("select_district").innerHTML = content;
//         }
//     })
// }

// function findWard() {
//     let id_district = document.getElementById("district").value;
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8080/api/address/ward${id_district}`,
//         success: function (data) {
//             let content = '<select class="select" id="ward">';
//             content += '<option>Choice a ward...</option>';
//             for (let i = 0; i < data.length; i++) {
//                 content += '<option value="' + data[i].id_ward + '">' + data[i].name + '</option>';
//             }
//             content += "</select>";
//             document.getElementById("select_ward").innerHTML = content;
//         }
//     })
// }
