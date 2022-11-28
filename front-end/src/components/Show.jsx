import React from "react";
import { NavLink,Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Show = (params) => {
    const data = params.data;

    return(
        <div>
            <h1>{data.status}</h1>
        </div>
    )
};
export default Show;