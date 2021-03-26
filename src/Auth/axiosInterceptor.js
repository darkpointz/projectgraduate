import React, { Component } from 'react';
import axios from "axios";
import { auth } from "./firebase";

axios.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("FBIdToken")
    if (token != null) {
        config.headers = { 'Authorization': token }
    }
    return config;
})
export const httpClient = axios