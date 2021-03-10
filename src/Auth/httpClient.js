import React, { Component } from "react";
import axios from "axios";

axios.interceptors.request.use(async (config) => {});
export const httpClient = axios;
