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

