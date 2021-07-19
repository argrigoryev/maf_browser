// Copyright (c) 2020 Alexandr Grigoryev. All rights reserved.

let heading = `
ISO-10303-21;
HEADER;

/******************************************************************************************
* STEP Physical File produced by: The EXPRESS Data Manager Version 5.02.0100.07 : 28 Aug 2013
* Module:                         EDMstepFileFactory/EDMstandAlone
* Creation date:                  Mon Jun 08 19:52:37 2020
* Host:                           ASK-W41
* Database:                       C:\Users\STANIS~1\AppData\Local\Temp\{6BC90897-ED32-4644-9F0A-BF59F4E0034D}\ifc
* Database version:               5507
* Database creation date:         Mon Jun 08 19:50:49 2020
* Schema:                         IFC2X3
* Model:                          DataRepository.ifc
* Model creation date:            Mon Jun 08 19:50:50 2020
* Header model:                   DataRepository.ifc_HeaderModel
* Header model creation date:     Mon Jun 08 19:50:50 2020
* EDMuser:                        sdai-user
* EDMgroup:                       sdai-group
* License ID and type:            5605 : Permanent license. Expiry date: 
* EDMstepFileFactory options:     020000
******************************************************************************************/
FILE_DESCRIPTION(('ViewDefinition [CoordinationView_V2.0]'),'2;1');
FILE_NAME('43466','2020-06-08T19:52:37',(''),(''),'The EXPRESS Data Manager Version 5.02.0100.07 : 28 Aug 2013','20190808_0900(x64) - Exporter 19.3.0.0 - Alternate UI 19.3.0.0','');
FILE_SCHEMA(('IFC2X3'));
ENDSEC; 

DATA;
`;
let footer = ` 
ENDSEC;

END-ISO-10303-21;`;
let button = document.querySelector("#btn");
let result = document.getElementById('result');
button.addEventListener("click", () => {
    let files = document.getElementById("file").files;
    let mergeData = '';
    for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let contents = e.target.result;
            let start = contents.search(/ENDSEC;/i) + 7;
            let startIndex = contents.indexOf("DATA;", start) + 7;
            let endIndex = contents.indexOf("ENDSEC;", start) - 1;
            let data = contents.slice(startIndex, endIndex);
            let changed = data.replace(/#/g, `#${i + 1}`);
            mergeData += changed;
            mergeData += '\n';
            let type = 'data:application/octet-stream;base64, ';
            let base = btoa(`${heading} ${mergeData} ${footer}`);
            let res = type + base;
            result.href = res;
        }
        reader.readAsText(files[i]);
    }
    result.hidden = false;
});