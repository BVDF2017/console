// This file is part of MinIO Design System
// Copyright (c) 2023 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { SVGProps } from "react";

const UploadFile = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      className={`min-icon`}
      fill={"currentcolor"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1 -37.9 256 256"
    >
      <defs>
        <clipPath id="a">
          <path
            d="M53.548,94.912v44.816c.43-.22.737-.378,1.517-.759a20.07,20.07,0,0,1,27.673,15.21c.1.677.115.688.163,1.1.063.567.084.968.108,1.463.01.21.068,1.914.072,2,.2,2.214.363,4.336.452,6.449.269,6.381.536,11,.957,15.5.6,6.412.964,12.128,1.066,17.7a19.838,19.838,0,0,1-.976,6.231c.683,6.455,1.592,14.938,1.752,16.438.014.128.023.253.036.38,3.927-.511,5.969-.716,8.382-.813,8.553-.344,16.809-.382,29.335-.235,1.42.017,2.559.021,5.094.054,10.044.13,14.46.163,19.906.127.93-.007,1.643,0,3.234,0,7.429.005,10.477-.237,12.174-.958-.178-1.123-.351-2.228-.614-3.558-.313-1.589-.586-2.862-1.264-5.979-2.292-10.53-3.161-15.585-3.414-22.508a68.539,68.539,0,0,1,2.764-23.067A29.713,29.713,0,0,1,164.278,159c.461-.922.889-1.737,1.372-2.547a22.021,22.021,0,0,1,1.987-2.836,19.87,19.87,0,0,1,3.776-3.5A19.984,19.984,0,0,1,192.33,125.6a20.223,20.223,0,0,1,9.195,3V94.912Z"
            fill="none"
          />
        </clipPath>
        <clipPath id="b">
          <path
            d="M204.03,236.91c-.393.722-.717,1.447-1.156,2.168-.795,1.3-1.66,2.592-2.547,3.811h3.7Z"
            fill="none"
          />
        </clipPath>
      </defs>
      <g transform="translate(-0.036 -24.789)">
        <path d="M239.185,72.637A29.456,29.456,0,0,0,209.767,43.6H128.581l-1.119-1.512c-5.078-6.886-12.756-17.3-26.1-17.3H49.394A29.455,29.455,0,0,0,19.972,54.21a19.778,19.778,0,0,0,.236,3.081V70.763A29.818,29.818,0,0,0,.036,98.947c0,.6.023,1.205.076,1.806L9.8,207.577A29.8,29.8,0,0,0,39.545,236.2h175.73A29.8,29.8,0,0,0,245.021,207.6L254.947,100.8q.088-.928.09-1.852A29.792,29.792,0,0,0,239.185,72.637ZM49.394,44.808h51.963c6.586,0,13.645,18.813,20.7,18.813h87.709a9.429,9.429,0,0,1,9.4,9.4v4.7H40.213V54.206h-.229A9.431,9.431,0,0,1,49.394,44.808ZM225.031,206.43a9.781,9.781,0,0,1-9.754,9.748H39.547a9.779,9.779,0,0,1-9.75-9.748L20.051,98.947A9.782,9.782,0,0,1,29.8,89.192H225.268a9.788,9.788,0,0,1,9.758,9.755Z" />
        <g transform="translate(-351.512 467)">
          <g transform="translate(352 -469)" clipPath="url(#a)">
            <path d="M118.046,203.4c0,12.123,18.976,12.123,18.976,0V126.379l10.748,10.443c8.823,8.569,22.236-4.465,13.415-13.034L134.3,97.665a9.685,9.685,0,0,0-13.526,0L93.89,123.788c-8.82,8.568,4.592,21.6,13.415,13.034l10.745-10.443V203.4Z" />
          </g>
        </g>
        <g clipPath="url(#b)">
          <path d="M56.052,158.235c0-12.121,18.978-12.121,18.978,0v66.218H185.056V158.235c0-12.121,18.973-12.121,18.973,0v75.436a9.357,9.357,0,0,1-9.486,9.217h-129a9.357,9.357,0,0,1-9.486-9.217V158.235Zm64.5,45.162c0,12.123,18.976,12.123,18.976,0V126.379l10.748,10.443c8.823,8.569,22.236-4.465,13.415-13.034L136.8,97.665a9.685,9.685,0,0,0-13.526,0L96.394,123.788c-8.82,8.568,4.593,21.6,13.415,13.034l10.745-10.443V203.4Z" />
        </g>
      </g>
    </svg>
  );
};

export default UploadFile;
